"use client";

import { DocsLayout } from "@/components/layout/DocsLayout";
import { CodeTabs } from "@/components/developers/CodeBlocks";
import { SchemaTable } from "@/components/developers/SchemaTable";
import { FileUp, FileDown, FolderSync } from "lucide-react";

export default function MtoFtpGuide() {
    return (
        <DocsLayout>
            <div className="mb-10">
                <h1 className="text-4xl font-extrabold tracking-tight lg:text-5xl mb-4">MTO FTP Business Gateway</h1>
                <p className="text-xl text-muted-foreground">Process transactions in bulk and exchange static data via our secure SFTP protocol.</p>
            </div>
            <div className="prose prose-slate max-w-none mb-12">
                <p className="text-lg text-muted-foreground">
                    This specification describes the FTP methods and general flow of all bulk transactions for the MITO MTO FTP Business Gateway. This interface is strictly designed for MTO partners to use MITO for bulk remittance operations.
                </p>

                <div className="mt-12 mb-8">
                    <h2 className="text-2xl font-bold tracking-tight border-b pb-2">FTP Architecture</h2>
                    <p className="text-muted-foreground mt-4">
                        The partner must provision a Secure FTP (SFTP) host, providing MITO with the Host address, username, and password. The FTP server must contain three specific directories to manage the data exchange lifecycle.
                    </p>
                </div>

                <div className="grid md:grid-cols-3 gap-6 mb-12">
                    <div className="bg-muted/40 border border-border rounded-xl p-6 relative overflow-hidden group">
                        <div className="w-12 h-12 rounded-lg bg-green-500/10 text-green-600 flex items-center justify-center mb-4">
                            <FileUp className="w-6 h-6" />
                        </div>
                        <h3 className="font-bold text-lg mb-2">/Inbound</h3>
                        <p className="text-sm text-muted-foreground">
                            Data sent from the Partner to MITO. Only transaction <code>.csv</code> files belong in this folder.
                        </p>
                    </div>

                    <div className="bg-muted/40 border border-border rounded-xl p-6 relative overflow-hidden group">
                        <div className="w-12 h-12 rounded-lg bg-blue-500/10 text-blue-600 flex items-center justify-center mb-4">
                            <FolderSync className="w-6 h-6" />
                        </div>
                        <h3 className="font-bold text-lg mb-2">/Upload</h3>
                        <p className="text-sm text-muted-foreground">
                            Compliance and document uploads sent from the Partner to MITO (e.g., physical ID images + CSV manifest).
                        </p>
                    </div>

                    <div className="bg-muted/40 border border-border rounded-xl p-6 relative overflow-hidden group">
                        <div className="w-12 h-12 rounded-lg bg-primary/10 text-primary flex items-center justify-center mb-4">
                            <FileDown className="w-6 h-6" />
                        </div>
                        <h3 className="font-bold text-lg mb-2">/Outbound</h3>
                        <p className="text-sm text-muted-foreground">
                            Data sent from MITO to the Partner. Contains transaction updates, rates, and static Service Provider data.
                        </p>
                    </div>
                </div>

                <div className="bg-primary/5 p-6 rounded-lg border border-primary/20 mb-12">
                    <h3 className="text-xl font-bold mt-0 mb-4 text-primary">General File Rules</h3>
                    <ul className="text-muted-foreground space-y-2 mt-0">
                        <li>All files must be strict <strong>.csv</strong> format.</li>
                        <li><strong>No header row</strong> is permitted in the files.</li>
                        <li>Columns must be pipe delimited: <code>|</code></li>
                        <li>Maximum of <strong>200 rows</strong> in a single file per upload.</li>
                        <li>Decimal values must be explicitly represented (e.g., <code>100.00</code>). Implied decimals are not supported. All decimals are strictly 2 decimal places.</li>
                        <li>Empty columns must retain their pipe delimiters (e.g., <code>val1||val3</code>).</li>
                    </ul>
                </div>
            </div>

            <div className="space-y-16">
                <section id="transaction-file">
                    <h2 className="text-2xl font-bold tracking-tight mb-4 border-b pb-2">1. Inbound Transaction File</h2>
                    <p className="text-muted-foreground mb-6">
                        This file allows partners to send transactions to MITO for processing. MITO polls this directory every 15 minutes.
                        <br /><br />
                        <strong>Naming Convention:</strong> <code>FURPACCOUNTNOddMMyyyyHHmmss.csv</code>
                    </p>

                    <h4 className="text-lg font-semibold mt-8 mb-4">Required Columns (Sample of 60+ fields)</h4>
                    <SchemaTable
                        fields={[
                            { name: "0. FurpAccountNo", type: "string", required: true, description: "Your MITO assigned account number." },
                            { name: "1. TransactionCreationDate", type: "date", required: true, description: "yyyy-MM-dd (ISO-8601)." },
                            { name: "3. MTN", type: "string", required: true, description: "Money Transfer Number (internal ref)." },
                            { name: "5. SettlementCurrency", type: "string", required: true, description: "3-letter ISO code (e.g. USD)." },
                            { name: "6. SettlementAmount", type: "decimal", required: true, description: "Sending amount." },
                            { name: "7. PayoutCurrency", type: "string", required: true, description: "3-letter ISO code (e.g. NGN)." },
                            { name: "11. TransactionType", type: "string", required: true, description: "MONEYTRANSFER, MOBILETOPUP, BILLPAYMENT" },
                            { name: "12. CollectionMode", type: "string", required: true, description: "BANKACCOUNT, CASH, MOBILEMONEY" },
                            { name: "19. BeneficiaryFirstName", type: "string", required: true, description: "First name of recipient." },
                            { name: "37. SenderFirstName", type: "string", required: true, description: "First name of sender." },
                            { name: "63. BeneficiaryAccountNumber", type: "string", required: true, description: "Bank Account No or Mobile Wallet No." }
                        ]}
                    />

                    <h4 className="text-lg font-semibold mt-8 mb-4">Example Structure</h4>
                    <CodeTabs
                        tabs={[
                            {
                                label: "CSV Output",
                                language: "csv",
                                code: `1062|2024-05-15|14:30:00|EXT-123|1150.00|USD|50.00|NGN|57500.00|0|50.00|MONEYTRANSFER|BANKACCOUNT|...`
                            }
                        ]}
                    />
                </section>

                <section id="document-upload">
                    <h2 className="text-2xl font-bold tracking-tight mb-4 border-b pb-2">2. Document Reference File (Uploads)</h2>
                    <p className="text-muted-foreground mb-6">
                        Before uploading document references, the transactions must have already been uploaded. The physical files (e.g. <code>10001.jpg</code>) must be uploaded to the <code>/Upload</code> folder FIRST, before the CSV manifest is uploaded.
                        <br /><br />
                        <strong>Naming Convention:</strong> <code>DocumentddMMyyyyHHmmss.csv</code>
                    </p>

                    <SchemaTable
                        fields={[
                            { name: "0. FurpAccountNo", type: "string", required: true, description: "Your MITO assigned account number." },
                            { name: "1. MTN", type: "string", required: true, description: "Money transfer number this file relates to." },
                            { name: "2. DocumentNo", type: "string", required: true, description: "Unique identifier for this upload (matches physical file)." },
                            { name: "3. DocumentExt", type: "string", required: true, description: "Extension (e.g., jpg, pdf)." },
                            { name: "4. Title", type: "string", required: true, description: "Document title (e.g., Sender Passport)." }
                        ]}
                    />
                </section>

                <section id="outbound-updates">
                    <h2 className="text-2xl font-bold tracking-tight mb-4 border-b pb-2">3. Outbound Data Updates</h2>
                    <p className="text-muted-foreground mb-6">
                        MITO deposits several files into the <code>/Outbound</code> directory. The most critical is the Transaction Update file, providing asynchronous status updates for submitted files.
                    </p>

                    <h3 className="text-lg font-bold mt-8 mb-2">Transaction Updates</h3>
                    <p className="text-muted-foreground text-sm mb-4"><strong>Name:</strong> <code>statusddMMyyyyHHmmss.csv</code> (Every 15 mins)</p>
                    <SchemaTable
                        fields={[
                            { name: "0. FurpAccountNo", type: "string", required: true, description: "" },
                            { name: "1. TransactionUpdateDate", type: "date", required: true, description: "yyyy-MM-dd" },
                            { name: "3. MTN", type: "string", required: true, description: "Your original reference number." },
                            { name: "4. TransactionStatusCode", type: "string", required: true, description: "INPROGRESS, PROCESSED, AWAITINGAFFILIATEUPDATE, FAILED" }
                        ]}
                    />

                    <h3 className="text-lg font-bold mt-12 mb-2">Service Provider & Rate Updates</h3>
                    <p className="text-muted-foreground text-sm mb-4">You will also receive static sync files containing bank networks, relationships, occupations, and rate tables.</p>
                    <ul className="list-disc list-inside text-muted-foreground space-y-2">
                        <li><code>StaticServiceProvider.csv</code> — Master list of Banks, Telcos, and Billers.</li>
                        <li><code>StaticProviderCashbranches.csv</code> — Branch codes for cash pickups.</li>
                        <li><code>rateddMMyyyyHHmmss.csv</code> — Current live FX conversion rates (varies, default 15m polling).</li>
                        <li><code>staticIdTypes.csv</code> — Available identification document codes.</li>
                    </ul>
                </section>
            </div>
        </DocsLayout>
    );
}
