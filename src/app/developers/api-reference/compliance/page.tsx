"use client";

import { ApiReferenceLayout } from "@/components/layout/ApiReferenceLayout";
import { EndpointBlock } from "@/components/developers/ApiBlocks";
import { CodeTabs } from "@/components/developers/CodeBlocks";
import { SchemaTable } from "@/components/developers/SchemaTable";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { ShieldAlert } from "lucide-react";

export default function ComplianceApiPage() {
    return (
        <ApiReferenceLayout>
            <div className="flex flex-col w-full">
                <div className="py-12 px-4 sm:px-6 lg:px-8 max-w-4xl border-b">
                    <h1 className="text-4xl font-extrabold tracking-tight mb-4">Compliance API</h1>
                    <p className="text-xl text-muted-foreground mb-6">
                        Submit customer details for KYC (Know Your Customer), AML (Anti-Money Laundering), and sanctions screening.
                    </p>
                </div>

                <Alert className="mb-12 border-primary/20 bg-primary/5 text-primary">
                    <ShieldAlert className="h-4 w-4" />
                    <AlertTitle>Strict Regulatory Requirement</AlertTitle>
                    <AlertDescription>
                        You must have an approved compliance profile before MITO will process outward transfers for your end users.
                    </AlertDescription>
                </Alert>

                <EndpointBlock
                    method="POST"
                    path="/v1/compliance/individuals"
                    title="Onboard Individual"
                    description="Submit an individual's personal details and documents for KYC and PEP/Sanctions screening."
                    requestSamples={
                        <CodeTabs
                            tabs={[
                                {
                                    label: "JSON",
                                    language: "json",
                                    code: `{
  "first_name": "Jane",
  "last_name": "Smith",
  "date_of_birth": "1990-01-01",
  "nationality": "GB",
  "address": {
    "line1": "123 High St",
    "city": "London",
    "postal_code": "SW1A 1AA",
    "country": "GB"
  }
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
  "id": "ind_555666777",
  "status": "pending_review",
  "first_name": "Jane",
  "last_name": "Smith",
  "created_at": "2024-05-15T10:00:00Z",
  "review_reasons": ["manual_id_verification_required"]
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
                                { name: "first_name", type: "string", required: true, description: "Legal first name." },
                                { name: "last_name", type: "string", required: true, description: "Legal last name." },
                                { name: "date_of_birth", type: "string", required: true, description: "YYYY-MM-DD format." },
                                { name: "nationality", type: "string", required: true, description: "ISO 3166-1 alpha-2 country code.", example: "GB" },
                                { name: "address", type: "object", required: true, description: "Residential address." },
                                { name: "document", type: "object", description: "Identity document base64 payload." },
                            ]}
                        />
                    </div>
                </EndpointBlock>
            </div>
        </ApiReferenceLayout>
    );
}
