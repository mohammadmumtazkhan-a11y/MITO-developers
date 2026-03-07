"use client";

import { ApiReferenceLayout } from "@/components/layout/ApiReferenceLayout";
import { EndpointBlock } from "@/components/developers/ApiBlocks";
import { CodeTabs } from "@/components/developers/CodeBlocks";
import { SchemaTable } from "@/components/developers/SchemaTable";
import { FileUp, FileDown, FolderSync } from "lucide-react";

export default function MtoFtpGuide() {
    return (
        <ApiReferenceLayout>
            <div className="flex flex-col w-full">
                <div className="py-12 px-4 sm:px-6 lg:px-8 max-w-4xl border-b">
                    <h1 className="text-4xl font-extrabold tracking-tight lg:text-5xl mb-4">MTO FTP Gateway</h1>
                    <p className="text-xl text-muted-foreground">Process transactions in bulk and exchange static data via our secure SFTP protocol.</p>
                </div>

                <div className="py-12 px-4 sm:px-6 lg:px-8 max-w-4xl">
                    <div className="prose prose-slate dark:prose-invert max-w-none">
                        <p className="text-lg text-muted-foreground">
                            This specification describes the FTP methods and general flow of all bulk transactions for the MITO MTO FTP Business Gateway.
                        </p>
                    </div>
                </div>

                <div className="py-12 px-4 sm:px-6 lg:px-8 max-w-4xl border-t">
                    <h2 className="text-2xl font-bold tracking-tight mb-8">FTP Architecture</h2>
                    <div className="grid md:grid-cols-3 gap-6 mb-12">
                        <div className="bg-muted/40 border border-border rounded-xl p-6 relative overflow-hidden group">
                            <div className="w-12 h-12 rounded-lg bg-green-500/10 text-green-600 flex items-center justify-center mb-4">
                                <FileUp className="w-6 h-6" />
                            </div>
                            <h3 className="font-bold text-lg mb-2">/Inbound</h3>
                            <p className="text-sm text-muted-foreground">
                                Data sent to MITO. Only transaction <code>.csv</code> files belong here.
                            </p>
                        </div>

                        <div className="bg-muted/40 border border-border rounded-xl p-6 relative overflow-hidden group">
                            <div className="w-12 h-12 rounded-lg bg-blue-500/10 text-blue-600 flex items-center justify-center mb-4">
                                <FolderSync className="w-6 h-6" />
                            </div>
                            <h3 className="font-bold text-lg mb-2">/Upload</h3>
                            <p className="text-sm text-muted-foreground">
                                Compliance and document uploads sent from the Partner.
                            </p>
                        </div>

                        <div className="bg-muted/40 border border-border rounded-xl p-6 relative overflow-hidden group">
                            <div className="w-12 h-12 rounded-lg bg-primary/10 text-primary flex items-center justify-center mb-4">
                                <FileDown className="w-6 h-6" />
                            </div>
                            <h3 className="font-bold text-lg mb-2">/Outbound</h3>
                            <p className="text-sm text-muted-foreground">
                                Data sent from MITO. Contains updates, rates, and static data.
                            </p>
                        </div>
                    </div>

                    <div className="bg-primary/5 p-6 rounded-lg border border-primary/20">
                        <h3 className="text-xl font-bold mt-0 mb-4 text-primary">General File Rules</h3>
                        <ul className="text-muted-foreground space-y-2 text-sm mt-0 list-disc list-inside">
                            <li>All files must be strict <strong>.csv</strong> format.</li>
                            <li><strong>No header row</strong> is permitted.</li>
                            <li>Columns must be pipe delimited: <code>|</code></li>
                            <li>Maximum of <strong>200 rows</strong> in a single file logic.</li>
                            <li>Decimal values must be explicitly represented (e.g., <code>100.00</code>).</li>
                        </ul>
                    </div>
                </div>

                <div className="space-y-0">
                    <EndpointBlock
                        method="POST"
                        path="/Inbound"
                        title="1. Inbound Transaction File"
                        description="This file allows partners to send transactions to MITO for processing. MITO polls this directory every 15 minutes."
                        requestSamples={
                            <CodeTabs
                                tabs={[
                                    {
                                        label: "CSV Example",
                                        language: "csv",
                                        code: `1062|2024-05-15|14:30:00|EXT-123|1150.00|USD|50.00|NGN|57500.00|0|50.00|MONEYTRANSFER|BANKACCOUNT|...`
                                    }
                                ]}
                            />
                        }
                    >
                        <div className="space-y-4 text-sm">
                            <p className="font-semibold">Naming Convention:</p>
                            <code>FURPACCOUNTNOddMMyyyyHHmmss.csv</code>

                            <h4 className="font-semibold pt-4">Field definitions</h4>
                            <SchemaTable
                                fields={[
                                    { name: "0. FurpAccountNo", type: "string", required: true, description: "Your MITO assigned account number." },
                                    { name: "1. TransactionDate", type: "date", required: true, description: "yyyy-MM-dd." },
                                    { name: "3. MTN", type: "string", required: true, description: "Money Transfer Number (internal ref)." },
                                    { name: "5. SettlementCurrency", type: "string", required: true, description: "3-letter ISO code." },
                                    { name: "6. SettlementAmount", type: "decimal", required: true, description: "Sending amount." }
                                ]}
                            />
                        </div>
                    </EndpointBlock>

                    <EndpointBlock
                        method="POST"
                        path="/Upload"
                        title="2. Document Reference File"
                        description="Upload identification documents (JPG/PDF) followed by a CSV manifest to link them to transactions."
                        requestSamples={
                            <CodeTabs
                                tabs={[
                                    {
                                        label: "CSV Manifest",
                                        language: "csv",
                                        code: `1062|EXT-123|ID_FRONT|jpg\n1062|EXT-123|ID_BACK|jpg`
                                    }
                                ]}
                            />
                        }
                    >
                        <div className="space-y-4 text-sm">
                            <p className="font-semibold">Naming Convention:</p>
                            <code>DocumentddMMyyyyHHmmss.csv</code>

                            <SchemaTable
                                fields={[
                                    { name: "0. FurpAccountNo", type: "string", required: true, description: "Your MITO account number." },
                                    { name: "1. MTN", type: "string", required: true, description: "Money transfer number." },
                                    { name: "2. DocumentNo", type: "string", required: true, description: "Matches physical file name." },
                                    { name: "3. DocumentExt", type: "string", required: true, description: "e.g., jpg, pdf." }
                                ]}
                            />
                        </div>
                    </EndpointBlock>

                    <EndpointBlock
                        method="GET"
                        path="/Outbound"
                        title="3. Outbound Data Updates"
                        description="MITO deposits several files into the /Outbound directory including transaction status and FX rates."
                        responseSamples={
                            <CodeTabs
                                tabs={[
                                    {
                                        label: "Status CSV",
                                        language: "csv",
                                        code: `1062|2024-05-15|EXT-123|PROCESSED\n1062|2024-05-15|EXT-124|FAILED`
                                    }
                                ]}
                            />
                        }
                    >
                        <div className="space-y-6 text-sm text-muted-foreground">
                            <div className="bg-muted p-4 rounded border">
                                <h3 className="font-bold text-foreground mb-2">Transaction Status Updates</h3>
                                <p className="mb-2"><strong>Name:</strong> <code>statusddMMyyyyHHmmss.csv</code></p>
                                <SchemaTable
                                    fields={[
                                        { name: "0. FurpAccountNo", type: "string", required: true, description: "" },
                                        { name: "1. UpdateDate", type: "date", required: true, description: "yyyy-MM-dd" },
                                        { name: "3. MTN", type: "string", required: true, description: "Your original reference." },
                                        { name: "4. Status", type: "string", required: true, description: "INPROGRESS, PROCESSED, FAILED" }
                                    ]}
                                />
                            </div>

                            <ul className="list-disc list-inside space-y-1">
                                <li><code>StaticServiceProvider.csv</code> — Banks and Billers.</li>
                                <li><code>rateddMMyyyyHHmmss.csv</code> — Live FX rates.</li>
                                <li><code>staticIdTypes.csv</code> — Identification codes.</li>
                            </ul>
                        </div>
                    </EndpointBlock>
                </div>
            </div>
        </ApiReferenceLayout>
    );
}
