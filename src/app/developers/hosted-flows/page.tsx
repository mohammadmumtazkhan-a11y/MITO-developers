"use client";

import { ApiReferenceLayout } from "@/components/layout/ApiReferenceLayout";
import { EndpointBlock } from "@/components/developers/ApiBlocks";
import { CodeTabs } from "@/components/developers/CodeBlocks";

export default function HostedFlowsPage() {
    return (
        <ApiReferenceLayout>
            <div className="flex flex-col w-full">
                <div className="py-12 px-4 sm:px-6 lg:px-8 max-w-4xl border-b">
                    <h1 className="text-4xl font-extrabold tracking-tight mb-4">Hosted Payment Flows</h1>
                    <p className="text-xl text-muted-foreground">
                        Offload PCI compliance, 3D Secure authentication, and KYC document collection by using MITO&apos;s secure Hosted Payment Pages.
                    </p>
                </div>

                <div className="py-12 px-4 sm:px-6 lg:px-8 max-w-4xl">
                    <section className="mb-0">
                        <h2 className="text-2xl font-bold mb-6">How it works</h2>
                        <div className="space-y-4 text-muted-foreground leading-relaxed">
                            <p>1. Your server makes an API call to create a Checkout Session.</p>
                            <p>2. You receive a unique MITO URL and redirect your user to it.</p>
                            <p>3. MITO displays your customized payment form, handling card input and bank authentication.</p>
                            <p>4. Upon completion (success or failure), the user is redirected back to your website.</p>
                            <p>5. MITO sends a secure webhook to your server confirming the payment status.</p>
                        </div>
                    </section>
                </div>

                <EndpointBlock
                    method="POST"
                    path="/v1/checkout/sessions"
                    title="Create a Session"
                    description="Generate a secure URL to accept payments."
                    requestSamples={
                        <CodeTabs
                            tabs={[
                                {
                                    label: "JSON",
                                    language: "json",
                                    code: `{
  "amount": 5000,
  "currency": "USD",
  "success_url": "https://example.com/success",
  "cancel_url": "https://example.com/cancel"
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
  "id": "cs_test_123",
  "url": "https://checkout.mito.com/pay/cs_test_123"
}`
                                }
                            ]}
                        />
                    }
                />
            </div>
        </ApiReferenceLayout>
    );
}
