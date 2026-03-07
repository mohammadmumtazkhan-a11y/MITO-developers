"use client";

import { ApiReferenceLayout } from "@/components/layout/ApiReferenceLayout";
import { EndpointBlock } from "@/components/developers/ApiBlocks";
import { CodeTabs } from "@/components/developers/CodeBlocks";
import { SchemaTable } from "@/components/developers/SchemaTable";

export default function TransfersApiPage() {
    return (
        <ApiReferenceLayout>
            <div className="flex flex-col w-full">
                <div className="py-12 px-4 sm:px-6 lg:px-8 max-w-4xl border-b">
                    <h1 className="text-4xl font-extrabold tracking-tight mb-4">Transfers API</h1>
                    <p className="text-xl text-muted-foreground">
                        The Transfers API allows you to send money internationally to bank accounts, mobile wallets, and cash pickup locations via MITO&apos;s network.
                    </p>
                </div>

                <EndpointBlock
                    method="POST"
                    path="/v1/transfers/quote"
                    title="Create a Quote"
                    description="Generates a guaranteed FX rate quote for a specific source and destination currency pair. Quotes are valid for 15 minutes."
                    requestSamples={
                        <CodeTabs
                            tabs={[
                                {
                                    label: "JSON",
                                    language: "json",
                                    code: `{
  "source_currency": "GBP",
  "target_currency": "KES",
  "source_amount": 10000
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
  "id": "qte_123456789",
  "status": "active",
  "source_currency": "GBP",
  "target_currency": "KES",
  "source_amount": 10000,
  "target_amount": 1850000,
  "rate": "185.00",
  "fee_amount": 250,
  "total_source_amount": 10250,
  "expires_at": "2024-05-15T14:30:00Z"
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
                                { name: "source_currency", type: "string", required: true, description: "The ISO 4217 code of the currency you are sending from.", example: "GBP" },
                                { name: "target_currency", type: "string", required: true, description: "The ISO 4217 code of the currency you are sending to.", example: "KES" },
                                { name: "source_amount", type: "integer", description: "The amount you want to send, in minor units (e.g., pence, cents). Provide either source_amount OR target_amount.", example: "10000" },
                                { name: "target_amount", type: "integer", description: "The exact amount you want the receiver to get, in minor units.", example: "1850000" },
                            ]}
                        />
                        <h3 className="text-lg font-semibold mb-3 mt-6">Response Fields</h3>
                        <SchemaTable
                            fields={[
                                { name: "id", type: "string", description: "Unique identifier for this quote.", example: "qte_123456789" },
                                { name: "rate", type: "decimal", description: "The guaranteed exchange rate.", example: "185.00" },
                                { name: "expires_at", type: "datetime", description: "When this quote expires (ISO 8601).", example: "2024-05-15T14:30:00Z" },
                                { name: "fee_amount", type: "integer", description: "The MITO fee for this corridor in source currency minor units.", example: "250" },
                                { name: "total_source_amount", type: "integer", description: "Source amount + fee amount.", example: "10250" },
                            ]}
                        />
                    </div>
                </EndpointBlock>

                <EndpointBlock
                    method="POST"
                    path="/v1/transfers"
                    title="Create a Transfer"
                    description="Initiates a new money transfer using a previously generated quote ID and recipient bank details."
                    requestSamples={
                        <CodeTabs
                            tabs={[
                                {
                                    label: "JSON",
                                    language: "json",
                                    code: `{
  "quote_id": "qte_123456789",
  "sender_id": "snd_987654",
  "recipient": {
    "type": "bank_account",
    "bank_code": "011",
    "account_number": "1234567890"
  },
  "purpose_code": "family_support"
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
  "id": "trf_123456789",
  "status": "processing",
  "quote_id": "qte_123456789",
  "reference": "TXN-001",
  "created_at": "2024-05-15T14:20:00Z",
  "estimated_delivery": "2024-05-15T14:25:00Z"
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
                                { name: "quote_id", type: "string", required: true, description: "The ID of the quote to use for this transfer." },
                                { name: "sender_id", type: "string", required: true, description: "The ID of the verified sender from the Compliance API." },
                                { name: "recipient", type: "object", required: true, description: "Recipient account details mapping." },
                                { name: "recipient.type", type: "string", required: true, description: "'bank_account' or 'mobile_wallet'." },
                                { name: "recipient.bank_code", type: "string", description: "Required if type is bank_account." },
                                { name: "recipient.account_number", type: "string", description: "Required if type is bank_account." },
                                { name: "purpose_code", type: "string", required: true, description: "Regulatory purpose code (e.g., 'family_support')." },
                                { name: "reference", type: "string", description: "Your internal reference ID." },
                            ]}
                        />
                    </div>
                </EndpointBlock>

            </div>
        </ApiReferenceLayout>
    );
}
