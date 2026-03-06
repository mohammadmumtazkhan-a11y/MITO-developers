"use client";

import { DocsLayout } from "@/components/layout/DocsLayout";
import { EndpointBlock } from "@/components/developers/ApiBlocks";
import { CodeTabs } from "@/components/developers/CodeBlocks";
import { SchemaTable } from "@/components/developers/SchemaTable";

export default function PayoutsApiPage() {
    return (
        <DocsLayout>
            <div className="max-w-5xl">
                <h1 className="text-4xl font-extrabold tracking-tight mb-4">Payouts API</h1>
                <p className="text-xl text-muted-foreground mb-12">
                    Programmatically withdraw settled funds from your MITO wallets to your corporate bank accounts.
                </p>

                <EndpointBlock
                    method="POST"
                    path="/v1/payouts"
                    title="Create Payout"
                    description="Initiate a payout to an approved linked bank account."
                    exampleResponse={
                        <CodeTabs
                            tabs={[
                                {
                                    label: "201 Created",
                                    language: "json",
                                    code: `{
  "id": "po_1122334455",
  "status": "submitted",
  "amount": 500000,
  "currency": "GBP",
  "estimated_arrival": "2024-05-16T09:00:00Z"
}`
                                }
                            ]}
                        />
                    }
                >
                    <div>
                        <h3 className="text-lg font-semibold mb-3">Request Body</h3>
                        <SchemaTable
                            fields={[
                                { name: "amount", type: "integer", required: true, description: "Amount in minor units." },
                                { name: "currency", type: "string", required: true, description: "Wallet currency." },
                                { name: "destination_account_id", type: "string", required: true, description: "ID of your corporate account." },
                                { name: "reference", type: "string", description: "Statement reference." },
                            ]}
                        />
                    </div>
                </EndpointBlock>
            </div>
        </DocsLayout>
    );
}
