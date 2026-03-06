"use client";

import { DocsLayout } from "@/components/layout/DocsLayout";
import { IntegrationTypeCard } from "@/components/developers/HeroCards";

export default function GuidesIndexPage() {
    return (
        <DocsLayout>
            <div className="max-w-4xl">
                <h1 className="text-4xl font-extrabold tracking-tight mb-4">Integration Guides</h1>
                <p className="text-xl text-muted-foreground mb-12">
                    Step-by-step instructions on how to integrate MITO's services depending on your business model and partnership type.
                </p>

                <div className="grid md:grid-cols-2 gap-6">
                    <IntegrationTypeCard
                        title="MTO Affiliate"
                        description="Use MITO for direct money transfer capabilities. You own the customer UI, we handle the rails."
                        href="/developers/guides/mto"
                    />
                    <IntegrationTypeCard
                        title="Retail Affiliate"
                        description="Resell MITO money transfer services directly to end customers for commission using our UI."
                        href="/developers/guides/retail"
                    />
                    <IntegrationTypeCard
                        title="Biller Affiliate"
                        description="Sell goods/services and use MITO to collect funds and settle to your bank account."
                        href="/developers/guides/biller"
                    />
                    <IntegrationTypeCard
                        title="Wholesale Biller"
                        description="Onboard multiple merchants and collect money on their behalf with complex pooled settlements."
                        href="/developers/guides/wholesale"
                    />
                </div>
            </div>
        </DocsLayout>
    );
}
