"use client";

import { DocsLayout } from "@/components/layout/DocsLayout";
import { FlowDiagram, FlowNode, FlowArrow } from "@/components/developers/Flows";

export default function WholesaleBillerGuidePage() {
    return (
        <DocsLayout>
            <div className="max-w-4xl">
                <h1 className="text-4xl font-extrabold tracking-tight mb-4">Wholesale Biller Guide</h1>
                <p className="text-xl text-muted-foreground mb-12">
                    As a Wholesale Biller or Super-Merchant, you use MITO to act as a payment aggregator for your own sub-merchants. MITO handles the pooled collection and settlement engine.
                </p>

                <section className="mb-16">
                    <h2 className="text-2xl font-bold mb-6">Integration Architecture</h2>
                    <FlowDiagram title="Wholesale Aggregation Model">
                        <div className="flex flex-col items-center gap-4">
                            <div className="flex gap-4">
                                <FlowNode label="Sub-Merchant A" type="user" />
                                <FlowNode label="Sub-Merchant B" type="user" />
                            </div>
                            <FlowArrow direction="both" label="MITO Payframe" />
                            <div className="flex items-center gap-4">
                                <FlowNode label="MITO Engine" sublabel="Aggregated Wallet" type="MITO" />
                                <FlowArrow direction="right" label="Reconciliation File" />
                                <FlowNode label="Your System" sublabel="FTP Server" type="secondary" />
                            </div>
                        </div>
                    </FlowDiagram>
                </section>
            </div>
        </DocsLayout>
    );
}
