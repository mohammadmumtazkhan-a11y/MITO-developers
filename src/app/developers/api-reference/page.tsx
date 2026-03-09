"use client";

import { DocsLayout } from "@/components/layout/DocsLayout";
import { IntegrationTypeCard } from "@/components/developers/HeroCards";

export default function ApiReferenceLandingPage() {
    return (
        <DocsLayout>
            <div className="max-w-4xl">
                <h1 className="text-4xl font-extrabold tracking-tight mb-4">API Reference</h1>
                <p className="text-xl text-muted-foreground mb-12">
                    Explore MITO&apos;s RESTful API endpoints. Our APIs are organized around REST, have predictable resource-oriented URLs, accept JSON-encoded request bodies, and return JSON-encoded responses.
                </p>

                <div className="grid md:grid-cols-2 gap-6">
                    <IntegrationTypeCard
                        title="Transfers API"
                        description="Fetch FX quotes and initiate cross-border money transfers to bank accounts or mobile wallets."
                        href="/developers/api-reference/transfers"
                    />
                    <IntegrationTypeCard
                        title="Collections API"
                        description="Request payments from customers via Mobile Money STK push or bank transfer."
                        href="/developers/api-reference/collections"
                    />
                    <IntegrationTypeCard
                        title="FX API"
                        description="Perform instant currency conversions between your MITO wallet balances."
                        href="/developers/api-reference/fx"
                    />
                    <IntegrationTypeCard
                        title="Payouts API"
                        description="Withdraw settled funds from your MITO wallets to your external bank accounts."
                        href="/developers/api-reference/payouts"
                    />
                    <IntegrationTypeCard
                        title="Compliance API"
                        description="Submit user details and documents to satisfy AML, KYC, and sanctions screening requirements."
                        href="/developers/api-reference/compliance"
                    />
                    <IntegrationTypeCard
                        title="Webhooks"
                        description="Listen for asynchronous events like transfer completions or compliance approvals."
                        href="/developers/webhooks"
                    />
                </div>
            </div>
        </DocsLayout>
    );
}
