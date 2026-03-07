"use client";

import { ApiReferenceLayout } from "@/components/layout/ApiReferenceLayout";
import { EndpointBlock } from "@/components/developers/ApiBlocks";
import { CodeTabs } from "@/components/developers/CodeBlocks";
import { SchemaTable } from "@/components/developers/SchemaTable";

export default function CollectionsApiPage() {
    return (
        <ApiReferenceLayout>
            <div className="flex flex-col w-full">
                <div className="py-12 px-4 sm:px-6 lg:px-8 max-w-4xl border-b">
                    <h1 className="text-4xl font-extrabold tracking-tight mb-4">Collections API</h1>
                    <p className="text-xl text-muted-foreground">
                        Use the Collections API to collect funds from customers or partners. Supports mobile money prompts (STK Push), bank transfers, and direct debit.
                    </p>
                </div>

                <EndpointBlock
                    method="POST"
                    path="/v1/collections/request"
                    title="Initiate a Collection"
                    description="Send a payment request to a customer's phone or generate bank details for them to transfer to."
                    requestSamples={
                        <CodeTabs
                            tabs={[
                                {
                                    label: "JSON",
                                    language: "json",
                                    code: `{
  "amount": 50000,
  "currency": "KES",
  "method": "mobile_money",
  "customer": {
    "msisdn": "+254712345678"
  },
  "reference": "INV-2024-001"
}`
                                }
                            ]}
                        />
                    }
                    responseSamples={
                        <CodeTabs
                            tabs={[
                                {
                                    label: "201 Created",
                                    language: "json",
                                    code: `{
  "id": "col_987654321",
  "status": "pending",
  "method": "mobile_money",
  "amount": 50000,
  "currency": "KES",
  "reference": "INV-2024-001",
  "created_at": "2024-05-15T15:00:00Z"
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
                                { name: "amount", type: "integer", required: true, description: "The amount to collect, in minor units.", example: "50000" },
                                { name: "currency", type: "string", required: true, description: "ISO 4217 currency code.", example: "KES" },
                                { name: "method", type: "string", required: true, description: "'mobile_money' or 'bank_transfer'.", example: "mobile_money" },
                                { name: "customer", type: "object", required: true, description: "Customer details object." },
                                { name: "customer.msisdn", type: "string", description: "Required for mobile money. E.164 format.", example: "+254712345678" },
                                { name: "reference", type: "string", required: true, description: "Your internal reference ID.", example: "INV-2024-001" },
                            ]}
                        />
                    </div>
                </EndpointBlock>
            </div>
        </ApiReferenceLayout>
    );
}
