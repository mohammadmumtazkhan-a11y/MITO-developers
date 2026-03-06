"use client";

import { DocsLayout } from "@/components/layout/DocsLayout";

export default function FileIntegrationPage() {
    return (
        <DocsLayout>
            <div className="max-w-4xl">
                <h1 className="text-4xl font-extrabold tracking-tight mb-4">File / FTP Integration</h1>
                <p className="text-xl text-muted-foreground mb-12">
                    For legacy systems or high-volume batch processing, MITO supports secure SFTP file exchanges.
                </p>

                <section className="mb-16">
                    <h2 className="text-2xl font-bold mb-6">Overview</h2>
                    <p className="text-muted-foreground leading-relaxed mb-6">
                        If your systems cannot support real-time REST APIs, you can drop CSV or XML files into a securely provisioned MITO SFTP folder. Our engine polls this folder every 15 minutes, processes the batch, and drops a reconciliation result file back into your Outbox.
                    </p>

                    <div className="bg-[#0d1117] text-[#c9d1d9] p-6 rounded-lg font-mono text-sm">
                        <div className="font-bold text-white mb-2">Folder Structure:</div>
                        <div className="pl-4 text-green-400">/inbox</div>
                        <div className="pl-8 text-muted-foreground">Drop your transfer request files here.</div>
                        <div className="pl-4 text-blue-400 mt-2">/outbox</div>
                        <div className="pl-8 text-muted-foreground">Retrieve status reports and settlement files here.</div>
                        <div className="pl-4 text-red-400 mt-2">/error</div>
                        <div className="pl-8 text-muted-foreground">Files with structural validation errors are moved here.</div>
                    </div>
                </section>
            </div>
        </DocsLayout>
    );
}
