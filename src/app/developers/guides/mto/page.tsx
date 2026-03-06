"use client";

import { DocsLayout } from "@/components/layout/DocsLayout";
import { FlowDiagram, FlowNode, FlowArrow, StepFlow } from "@/components/developers/Flows";

export default function MtoGuidePage() {
    return (
        <DocsLayout>
            <div className="max-w-4xl">
                <h1 className="text-4xl font-extrabold tracking-tight mb-4">MTO Affiliate Guide</h1>
                <p className="text-xl text-muted-foreground mb-12">
                    As a Money Transfer Operator (MTO), you own the customer relationship and UI. You use MITO's APIs strictly for backend remittance execution, KYC compliance, and FX.
                </p>

                <section className="mb-16">
                    <h2 className="text-2xl font-bold mb-6">Integration Architecture</h2>
                    <FlowDiagram title="MTO Remittance Flow">
                        <div className="flex flex-col md:flex-row items-center justify-center">
                            <FlowNode label="Your App" sublabel="Customer UI" type="user" />
                            <FlowArrow direction="both" label="REST APIs" />
                            <FlowNode label="MITO Engine" sublabel="FX, Routing & Compliance" type="MITO" />
                            <FlowArrow direction="right" label="Settlement" />
                            <FlowNode label="Destination Bank" sublabel="Payout Network" type="secondary" />
                        </div>
                    </FlowDiagram>
                </section>

                <section className="mb-16">
                    <h2 className="text-2xl font-bold mb-6">Step-by-Step Implementation</h2>
                    <StepFlow
                        steps={[
                            {
                                title: "1. Onboard Send & Receive Corridors",
                                description: "Work with your MITO account manager to ensure your required source and destination countries are active on your partner profile."
                            },
                            {
                                title: "2. Fetch FX Rates",
                                description: "Before a customer starts a transfer, call POST /v1/transfers/quote to get a live, guaranteed exchange rate and fee structure."
                            },
                            {
                                title: "3. Verify the Sender (KYC)",
                                description: "Call POST /v1/compliance/individuals to submit sender ID docs. Standard SLA for automatic verification is under 2 minutes."
                            },
                            {
                                title: "4. Create the Transfer",
                                description: "Submit the quote ID, sender ID, and recipient bank details to POST /v1/transfers. MITO will instantly attempt to process the payout."
                            },
                            {
                                title: "5. Listen for Webhooks",
                                description: "Your backend must listen for transfer.completed or transfer.failed webhooks to update the status in your own database and UI."
                            }
                        ]}
                    />
                </section>

                <section className="mb-16">
                    <h2 className="text-2xl font-bold mb-4">Prerequisites</h2>
                    <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
                        <li>A signed MTO Affiliate contract with MITO.</li>
                        <li>A pre-funded MITO operational wallet (or a direct debit mandate depending on jurisdiction).</li>
                        <li>PCI-compliant architecture if capturing card payments directly from users.</li>
                    </ul>
                </section>
            </div>
        </DocsLayout>
    );
}
