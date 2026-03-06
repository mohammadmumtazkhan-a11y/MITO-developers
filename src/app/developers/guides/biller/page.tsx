"use client";

import { DocsLayout } from "@/components/layout/DocsLayout";
import { FlowDiagram, FlowNode, FlowArrow, StepFlow } from "@/components/developers/Flows";

export default function BillerAffiliateGuidePage() {
    return (
        <DocsLayout>
            <div className="max-w-4xl">
                <h1 className="text-4xl font-extrabold tracking-tight mb-4">Biller Affiliate Guide</h1>
                <p className="text-xl text-muted-foreground mb-12">
                    As a Biller Affiliate, you sell goods or services and use MITO to collect funds and settle them to your local bank account.
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
            </div>
        </DocsLayout>
    );
}
