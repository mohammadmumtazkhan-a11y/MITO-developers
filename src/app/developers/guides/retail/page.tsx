"use client";

import { DocsLayout } from "@/components/layout/DocsLayout";
import { FlowDiagram, FlowNode, FlowArrow, StepFlow } from "@/components/developers/Flows";

export default function RetailAffiliateGuidePage() {
    return (
        <DocsLayout>
            <div className="max-w-4xl">
                <h1 className="text-4xl font-extrabold tracking-tight mb-4">Retail Affiliate Guide</h1>
                <p className="text-xl text-muted-foreground mb-12">
                    As a Retail Affiliate, you resell MITO's money transfer services directly to your own customers, earning commission. You can choose to build your own UI or use our Hosted Payment Pages.
                </p>

                <section className="mb-16">
                    <h2 className="text-2xl font-bold mb-6">Integration Architecture</h2>
                    <FlowDiagram title="Retail Affiliate Flow (Hosted UI)">
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
                                title: "4. Return to Affiliate",
                                description: "Once payment is successful, the user is redirected back to your configured return_url. Commission is automatically credited to your affiliate wallet."
                            }
                        ]}
                    />
                </section>
            </div>
        </DocsLayout>
    );
}
