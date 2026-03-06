"use client";

import { DocsLayout } from "@/components/layout/DocsLayout";
import { EndpointBlock } from "@/components/developers/ApiBlocks";
import { CodeTabs } from "@/components/developers/CodeBlocks";
import { SchemaTable } from "@/components/developers/SchemaTable";

export default function MtoApiReference() {
    return (
        <DocsLayout>
            <div className="mb-10">
                <h1 className="text-4xl font-extrabold tracking-tight lg:text-5xl mb-4">MTO Gateway API</h1>
                <p className="text-xl text-muted-foreground">REST API for Money Transfer Operators integrating directly into the MITO funtech network.</p>
            </div>
            <div className="prose prose-slate max-w-none mb-12">
                <p className="text-lg text-muted-foreground">
                    This specification describes the web methods and general flow of all transactions for the MITO MTO Business Gateway interface. This is designed for MTO partners that use MITO for remittance payout.
                </p>

                <div className="bg-muted p-6 rounded-lg mt-8 border border-border">
                    <h3 className="text-xl font-bold mt-0 mb-4 text-foreground">Basic Authentication</h3>
                    <p className="text-muted-foreground mb-4">
                        The MTO API uses Basic Authentication to secure access to its services. Combine your API username and password into a single string separated by a colon (<code>username:password</code>), encode it in Base64, and include it in the Authorization header.
                    </p>
                    <div className="bg-background border rounded font-mono text-sm p-3 mb-4">
                        Authorization: Basic QWxhZGRpbjpvcGVuIHNlc2FtZQ==
                    </div>
                    <p className="text-muted-foreground mb-2">Additionally, every request requires two custom headers:</p>
                    <ul className="text-muted-foreground text-sm space-y-2 mt-0">
                        <li><code>AccessAffiliateNumber</code>: Your assigned affiliate number.</li>
                        <li><code>AccessServiceNumber</code>: The specific service identifier for the request.</li>
                    </ul>
                </div>
            </div>

            <div className="space-y-24">
                {/* Initiate Transactions */}
                <section id="initiate-transactions">
                    <EndpointBlock
                        method="POST"
                        path="/Mto/TransactionCreate"
                        title="Initiate Transactions"
                        description="Initiate a new money transfer, mobile top-up, or bill payment transaction."
                        status="Live"
                    />

                    <h4 className="text-lg font-semibold mt-8 mb-4">Headers</h4>
                    <SchemaTable
                        fields={[
                            { name: "Authorization", type: "string", required: true, description: "Base64 encoded Basic Auth credentials." },
                            { name: "AccessAffiliateNumber", type: "string", required: true, description: "Provided affiliate number." },
                            { name: "AccessServiceNumber", type: "string", required: true, description: "Provided service number." }
                        ]}
                    />

                    <h4 className="text-lg font-semibold mt-8 mb-4">Example Request (MTO payload)</h4>
                    <CodeTabs
                        tabs={[
                            {
                                label: "cURL",
                                language: "bash",
                                code: `curl -X POST "https://api.sandbox.mito.money/v1/Mto/TransactionCreate" \\
  -H "Authorization: Basic QUUwMDAwMDAwMTpBQkMxMjM6…" \\
  -H "AccessAffiliateNumber: 1062" \\
  -H "AccessServiceNumber: 21012" \\
  -H "Content-Type: application/json" \\
  -d '{
    "transactionType": "MONEYTRANSFER",
    "mtn": "EXT-12345678",
    "settlementAmount": 500.00,
    "payoutCurrency": "NGN",
    "beneficiary": {
        "accountNumber": "0123456789",
        "firstName": "John",
        "lastName": "Doe"
    }
}'`
                            }
                        ]}
                    />
                </section>

                {/* Get Types */}
                <hr className="my-12 border-border" />
                <section id="get-types">
                    <EndpointBlock
                        method="GET"
                        path="/Mto/types"
                        title="Retrieve Static Data Types"
                        description="Retrieve various static configurations required for creating transactions (e.g., transaction-types, purposes, occupations)."
                    />

                    <h4 className="text-lg font-semibold mt-8 mb-4">Query Parameters</h4>
                    <SchemaTable
                        fields={[
                            { name: "filter", type: "string", required: false, description: "Comma-separated list of types to retrieve (e.g., purposes, source-of-funds). Returns all if omitted." }
                        ]}
                    />

                    <h4 className="text-lg font-semibold mt-8 mb-4">Example Configuration Response</h4>
                    <CodeTabs
                        tabs={[
                            {
                                label: "JSON",
                                language: "json",
                                code: `{
  "responseCode": "10000",
  "responseMessage": "Successful",
  "data": {
    "transactionType": [{"name": "Money Transfer", "code": "MT"}],
    "collectionMode": [{"name": "Bank Account", "code": "BA"}],
    "idDocumentTypes": [{"name": "Passport", "code": "PASS"}]
  }
}`
                            }
                        ]}
                    />
                </section>

                {/* Get Providers */}
                <hr className="my-12 border-border" />
                <section id="get-providers">
                    <EndpointBlock
                        method="GET"
                        path="/Mto/GetProviders"
                        title="Get Service Providers"
                        description="Retrieves available service providers (banks, billers, telcos) for a specific country and service."
                    />

                    <h4 className="text-lg font-semibold mt-8 mb-4">Query Parameters</h4>
                    <SchemaTable
                        fields={[
                            { name: "CountryIso3", type: "string", required: true, description: "3-letter ISO-3166 country code." },
                            { name: "ServiceCode", type: "string", required: true, description: "E.g., MONEYTRANSFER, MOBILETOPUP" },
                            { name: "CollectionMode", type: "string", required: false, description: "E.g., BANKACCOUNT, MOBILEMONEY, CASH" }
                        ]}
                    />

                    <CodeTabs
                        tabs={[
                            {
                                label: "JSON",
                                language: "json",
                                code: `{
  "responseCode": "10000",
  "responseMessage": "Successfully retrieved providers",
  "data": [
    {
      "serviceProviderCode": "2643",
      "serviceProviderName": "INDIA BANKS",
      "type": "MONEYTRANSFER",
      "collectionModes": "BANKACCOUNT",
      "branches": []
    }
  ]
}`
                            }
                        ]}
                    />
                </section>

                {/* Validate Bank Account */}
                <hr className="my-12 border-border" />
                <section id="validate-bank">
                    <EndpointBlock
                        method="POST"
                        path="/Mto/BankAccountValidate"
                        title="Validate Bank Account"
                        description="Validates a beneficiary bank account and returns the associated account holder name details."
                    />

                    <h4 className="text-lg font-semibold mt-8 mb-4">Request Body</h4>
                    <SchemaTable
                        fields={[
                            { name: "serviceProviderCode", type: "string", required: true, description: "Provider code of the destination bank." },
                            { name: "beneficiaryAccountNumber", type: "string", required: true, description: "The account number to validate." }
                        ]}
                    />

                    <CodeTabs
                        tabs={[
                            {
                                label: "JSON Response",
                                language: "json",
                                code: `{
  "responseCode": "10000",
  "responseMessage": "Successful",
  "data": {
    "message": "Success",
    "firstName": "John",
    "middleName": "Paul",
    "lastName": "Doe"
  }
}`
                            }
                        ]}
                    />
                </section>

                {/* Get Transaction */}
                <hr className="my-12 border-border" />
                <section id="get-transaction">
                    <EndpointBlock
                        method="GET"
                        path="/Mto/GetTransaction"
                        title="Get Transaction Details"
                        description="Fetch the status and details of an existing transaction using the Money Transfer Number (MTN)."
                    />

                    <h4 className="text-lg font-semibold mt-8 mb-4">Query Parameters</h4>
                    <SchemaTable
                        fields={[
                            { name: "Mtn", type: "string", required: true, description: "The Money Transfer Number provided during initiation." }
                        ]}
                    />
                </section>

            </div>
        </DocsLayout>
    );
}
