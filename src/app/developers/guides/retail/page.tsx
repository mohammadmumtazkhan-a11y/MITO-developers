"use client";

import { DocsLayout } from "@/components/layout/DocsLayout";
import { FlowDiagram, FlowNode, FlowArrow, StepFlow } from "@/components/developers/Flows";
import { CodeBlock } from "@/components/developers/CodeBlocks";

export default function RetailAffiliateGuidePage() {
    return (
        <DocsLayout>
            <div className="max-w-4xl">
                <h1 className="text-4xl font-extrabold tracking-tight mb-4">Retail Submission Guide</h1>
                <p className="text-xl text-muted-foreground mb-12">
                    As a Retail Submission, you resell MITO&apos;s money transfer services directly to your own customers, earning commission. You can choose to build your own UI or use our Hosted Payment Pages.
                </p>

                <section className="mb-16">
                    <h2 className="text-2xl font-bold mb-6">Integration Architecture</h2>
                    <FlowDiagram title="Retail Submission Flow (Hosted UI)">
                        <div className="flex flex-col md:flex-row items-center justify-center">
                            <FlowNode label="Your Website" sublabel="Generate Session" type="user" />
                            <FlowArrow direction="right" label="Redirect" />
                            <FlowNode label="MITO Pay Page" sublabel="KYC & Card Capture" type="MITO" />
                            <FlowArrow direction="right" label="Return" />
                            <FlowNode label="Your Success Page" sublabel="Commission Earned" type="secondary" />
                        </div>
                    </FlowDiagram>
                </section>

                <section className="mb-16">
                    <h2 className="text-2xl font-bold mb-6">Step-by-Step Implementation</h2>
                    <StepFlow
                        steps={[
                            {
                                title: "1. Generate a Checkout Session",
                                description: "Call POST /v1/checkout/sessions with the transfer amount and destination logic. Receive a secure redirect URL."
                            },
                            {
                                title: "2. Redirect the Customer",
                                description: "Redirect the user's browser to the MITO-hosted page. MITO will securely collect their card details and handle 3D Secure authentication."
                            },
                            {
                                title: "3. MITO Processes KYC",
                                description: "If the customer is new, MITO will automatically prompt them to upload ID documents within the hosted flow before completing the transfer."
                            },
                            {
                                title: "4. Return to Submission",
                                description: "Once payment is successful, the user is redirected back to your configured return_url. Commission is automatically credited to your submission wallet."
                            }
                        ]}
                    />
                </section>

                <section className="mb-16">
                    <div className="bg-primary/5 border border-primary/20 rounded-xl p-8">
                        <h2 className="text-2xl font-bold mb-4">Native Experience: MITO SDK</h2>
                        <p className="text-muted-foreground mb-6">
                            Instead of a full-page redirect, use the MITO Link SDK to provide a seamless, modal-based checkout experience that keeps users on your site.
                        </p>
                        
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                            <div className="space-y-4">
                                <h3 className="text-lg font-semibold">1. Integration</h3>
                                <CodeBlock 
                                    code={`import { useMitoLink } from '@mito-money/mito-link';

const { open } = useMitoLink({
  linkToken: 'token_from_your_backend',
  publishableKey: 'pk_live_...',
  environment: 'production',
  linkType: 'retail-payment'
});`} 
                                    language="javascript" 
                                />
                            </div>
                            <div className="space-y-4">
                                <h3 className="text-lg font-semibold">2. Server-Side Initiation</h3>
                                <CodeBlock 
                                    code={`POST /api/v1/transactions
{
  "sendAmount": 50,
  "sendCurrency": "GBP",
  "serviceCode": "retail-payment",
  "receiveCountryIso3": "NGA"
}`} 
                                    language="json" 
                                />
                            </div>
                        </div>
                    </div>
                </section>
            </div>
        </DocsLayout>
    );
}
