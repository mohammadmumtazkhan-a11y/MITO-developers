"use client";

import { DocsLayout } from "@/components/layout/DocsLayout";
import { EndpointBlock } from "@/components/developers/ApiBlocks";

export default function HostedFlowsPage() {
    return (
        <DocsLayout>
            <div className="max-w-4xl">
                <h1 className="text-4xl font-extrabold tracking-tight mb-4">Hosted Payment Flows</h1>
                <p className="text-xl text-muted-foreground mb-12">
                    Offload PCI compliance, 3D Secure authentication, and KYC document collection by using MITO's secure Hosted Payment Pages.
                </p>

                <section className="mb-16">
                    <h2 className="text-2xl font-bold mb-6">How it works</h2>
                    <div className="space-y-4 text-muted-foreground leading-relaxed">
                        <p>1. Your server makes an API call to create a Checkout Session.</p>
                        <p>2. You receive a unique MITO URL and redirect your user to it.</p>
                        <p>3. MITO displays your customized payment form, handling card input and bank authentication.</p>
                        <p>4. Upon completion (success or failure), the user is redirected back to your website.</p>
                        <p>5. MITO sends a secure webhook to your server confirming the payment status.</p>
                    </div>
                </section>

                <EndpointBlock
                    method="POST"
                    path="/v1/checkout/sessions"
                    title="Create a Session"
                    description="Generate a secure URL to accept payments."
                />
            </div>
        </DocsLayout>
    );
}
