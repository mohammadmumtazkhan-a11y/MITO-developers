"use client";

import { DocsLayout } from "@/components/layout/DocsLayout";
import { EndpointBlock } from "@/components/developers/ApiBlocks";
import { CodeTabs } from "@/components/developers/CodeBlocks";
import { SchemaTable } from "@/components/developers/SchemaTable";

export default function FxApiPage() {
    return (
        <DocsLayout>
            <div className="max-w-5xl">
                <h1 className="text-4xl font-extrabold tracking-tight mb-4">FX API</h1>
                <p className="text-xl text-muted-foreground mb-12">
                    Execute standalone foreign exchange conversions between your MITO wallet balances.
                </p>

                <EndpointBlock
                    method="POST"
                    path="/v1/fx/convert"
                    title="Execute Conversion"
                    description="Instantly convert funds from one currency wallet to another at the current spot rate."
                    exampleResponse={
                        <CodeTabs
                            tabs={[
                                {
                                    label: "200 OK",
                                    language: "json",
                                    code: `{
  "id": "fx_aabbccdd",
  "status": "completed",
  "source_currency": "USD",
  "target_currency": "EUR",
  "source_amount": 1000000,
  "target_amount": 921500,
  "rate": "0.9215",
  "executed_at": "2024-05-15T16:00:00Z"
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
                                { name: "source_currency", type: "string", required: true, description: "Currency to sell." },
                                { name: "target_currency", type: "string", required: true, description: "Currency to buy." },
                                { name: "amount", type: "integer", required: true, description: "Amount of source currency to sell, in minor units." },
                                { name: "rate_id", type: "string", description: "Optional guaranteed rate ID from GET /fx/rates." },
                            ]}
                        />
                    </div>
                </EndpointBlock>
            </div>
        </DocsLayout>
    );
}
