"use client";

import { ApiReferenceLayout } from "@/components/layout/ApiReferenceLayout";
import { EndpointBlock } from "@/components/developers/ApiBlocks";
import { CodeTabs } from "@/components/developers/CodeBlocks";
import { SchemaTable } from "@/components/developers/SchemaTable";

export default function FxApiPage() {
    return (
        <ApiReferenceLayout>
            <div className="flex flex-col w-full">
                <div className="py-12 px-4 sm:px-6 lg:px-8 max-w-4xl border-b">
                    <h1 className="text-4xl font-extrabold tracking-tight mb-4">FX API</h1>
                    <p className="text-xl text-muted-foreground">
                        Execute standalone foreign exchange conversions between your MITO wallet balances.
                    </p>
                </div>

                <EndpointBlock
                    method="POST"
                    path="/v1/fx/convert"
                    title="Execute Conversion"
                    description="Instantly convert funds from one currency wallet to another at the current spot rate."
                    requestSamples={
                        <CodeTabs
                            tabs={[
                                {
                                    label: "JSON",
                                    language: "json",
                                    code: `{
  "source_currency": "USD",
  "target_currency": "EUR",
  "amount": 1000000
}`
                                }
                            ]}
                        />
                    }
                    responseSamples={
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
        </ApiReferenceLayout>
    );
}
