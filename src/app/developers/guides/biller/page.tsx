"use client";

import { DocsLayout } from "@/components/layout/DocsLayout";
import { FlowDiagram, FlowNode, FlowArrow, StepFlow } from "@/components/developers/Flows";
import { CodeBlock } from "@/components/developers/CodeBlocks";

export default function BillerAffiliateGuidePage() {
    return (
        <DocsLayout>
            <div className="max-w-4xl">
                <h1 className="text-4xl font-extrabold tracking-tight mb-4">Biller Submission Guide</h1>
                <p className="text-xl text-muted-foreground mb-12">
                    As a Biller Submission, you sell goods or services and use MITO to collect funds and settle them to your local bank account.
                </p>

                <section className="mb-16">
                    <h2 className="text-2xl font-bold mb-6">Integration Architecture</h2>
                    <FlowDiagram title="Biller Collection & Settlement">
                        <div className="flex flex-col md:flex-row items-center justify-center">
                            <FlowNode label="Customer Phone" sublabel="Mobile Money Push" type="user" />
                            <FlowArrow direction="right" label="Pay" />
                            <FlowNode label="MITO Engine" sublabel="Collections API" type="MITO" />
                            <FlowArrow direction="right" label="Settlement" />
                            <FlowNode label="Your Corporate Bank" sublabel="Daily Payout" type="secondary" />
                        </div>
                    </FlowDiagram>
                </section>

                <section className="mb-16">
                    <h2 className="text-2xl font-bold mb-6">Step-by-Step Implementation</h2>
                    <StepFlow
                        steps={[
                            {
                                title: "1. Trigger Collection",
                                description: "When a customer checks out, call POST /v1/collections/request with their MSISDN and amount to trigger an STK Push to their phone."
                            },
                            {
                                title: "2. Listen for Confirmation",
                                description: "Wait for the collection.completed webhook. Do not release goods before receiving this event."
                            },
                            {
                                title: "3. Reconcile Balance",
                                description: "The collected funds (minus MITO fees) will instantly reflect in your MITO Collection Wallet balance."
                            },
                            {
                                title: "4. Settle / Payout",
                                description: "Use the POST /v1/payouts endpoint to withdraw your aggregated wallet balance to your approved external bank account."
                            }
                        ]}
                    />
                </section>

                <section className="mb-16">
                    <div className="bg-primary/5 border border-primary/20 rounded-xl p-8">
                        <h2 className="text-2xl font-bold mb-4">New: MITO SDK Integration</h2>
                        <p className="text-muted-foreground mb-6">
                            Streamline your checkout with the MITO Link SDK. Perfect for embedding a native-feel checkout experience directly into your web application.
                        </p>
                        
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                            <div className="space-y-4">
                                <h3 className="text-lg font-semibold">1. Install Package</h3>
                                <CodeBlock code="npm install @mito-money/mito-link" language="bash" />
                                
                                <h3 className="text-lg font-semibold mt-6">2. Initialize on Frontend</h3>
                                <CodeBlock 
                                    code={`import { useMitoLink } from '@mito-money/mito-link';

const { open } = useMitoLink({
  linkToken: 'token_from_your_backend',
  publishableKey: 'pk_test_...',
  environment: 'sandbox',
  linkType: 'bill-payment'
});`} 
                                    language="javascript" 
                                />
                            </div>
                            <div className="space-y-4">
                                <h3 className="text-lg font-semibold">Backend Initiation</h3>
                                <p className="text-sm text-muted-foreground">First, call our API from your server to get a linkToken:</p>
                                <CodeBlock 
                                    code={`POST /api/v1/transactions
{
  "sendAmount": 100,
  "sendCurrency": "USD",
  "serviceCode": "bill-payment",
  "beneficiary": { ... }
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
