"use client";

import { DocsLayout } from "@/components/layout/DocsLayout";
import { FlowDiagram, FlowNode, FlowArrow } from "@/components/developers/Flows";

export default function MerchantBillerGuidePage() {
    return (
        <DocsLayout>
            <div className="max-w-4xl">
                <h1 className="text-4xl font-extrabold tracking-tight mb-4">Merchant Biller Guide</h1>
                <p className="text-xl text-muted-foreground mb-12">
                    As a Merchant Biller, you integrate MITO directly into your checkout flow to accept payments from customers. MITO provides the infrastructure for secure, real-time transaction processing.
                </p>

                <section className="mb-16">
                    <h2 className="text-2xl font-bold mb-6">Standard Merchant Flow</h2>
                    <FlowDiagram title="Direct Merchant Integration">
                        <div className="flex flex-col items-center gap-4">
                            <div className="flex gap-4">
                                <FlowNode label="End Customer" type="user" />
                            </div>
                            <FlowArrow direction="down" label="Payment Request" />
                            <div className="flex items-center gap-4">
                                <FlowNode label="Your Website" sublabel="API Client" type="secondary" />
                                <FlowArrow direction="right" label="Checkout Redirect" />
                                <FlowNode label="MITO Engine" sublabel="Payment Processor" type="MITO" />
                            </div>
                        </div>
                    </FlowDiagram>
                </section>
            </div>
        </DocsLayout>
    );
}
