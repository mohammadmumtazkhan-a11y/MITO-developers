"use client";

import { ApiReferenceLayout } from "@/components/layout/ApiReferenceLayout";
import { EndpointBlock } from "@/components/developers/ApiBlocks";
import { CodeTabs } from "@/components/developers/CodeBlocks";
import { FlowDiagram, FlowNode, FlowArrow, StepFlow } from "@/components/developers/Flows";

export default function MtoGuidePage() {
    return (
        <ApiReferenceLayout>
            <div className="flex flex-col w-full">
                <div className="py-12 px-4 sm:px-6 lg:px-8 max-w-4xl border-b">
                    <h1 className="text-4xl font-extrabold tracking-tight mb-4">MTO Affiliate Guide</h1>
                    <p className="text-xl text-muted-foreground">
                        As a Money Transfer Operator (MTO), you own the customer relationship and UI. You use MITO&apos;s APIs strictly for backend remittance execution, KYC compliance, and FX.
                    </p>
                </div>

                <div className="py-12 px-4 sm:px-6 lg:px-8 max-w-4xl">
                    <section className="mb-0">
                        <h2 className="text-2xl font-bold mb-6">Integration Architecture</h2>
                        <FlowDiagram title="MTO Remittance Flow">
                            <div className="flex flex-col md:flex-row items-center justify-center">
                                <FlowNode label="Your App" sublabel="Customer UI" type="user" />
                                <FlowArrow direction="both" label="REST APIs" />
                                <FlowNode label="MITO Engine" sublabel="FX, Routing & Compliance" type="MITO" />
                                <FlowArrow direction="right" label="Settlement" />
                                <FlowNode label="Destination Bank" sublabel="Payout Network" type="secondary" />
                            </div>
                        </FlowDiagram>
                    </section>
                </div>

                <EndpointBlock
                    method="POST"
                    path="/v1/transfers"
                    title="Implementation Pipeline"
                    description="Follow these steps to integrate the MTO remittance flow into your application."
                    requestSamples={
                        <CodeTabs
                            tabs={[
                                {
                                    label: "JSON",
                                    language: "json",
                                    code: `{
  "quote_id": "qte_778899",
  "recipient": { ... }
}`
                                }
                            ]}
                        />
                    }
                >
                    <div className="space-y-8">
                        <StepFlow
                            steps={[
                                {
                                    title: "1. Onboard Corridors",
                                    description: "Work with MITO to activate your required source and destination countries."
                                },
                                {
                                    title: "2. Fetch FX Rates",
                                    description: "Call POST /v1/transfers/quote to get live rates."
                                },
                                {
                                    title: "3. Verify Sender (KYC)",
                                    description: "Submit ID docs via POST /v1/compliance/individuals."
                                },
                                {
                                    title: "4. Create Transfer",
                                    description: "Submit legacy payout details to /v1/transfers."
                                },
                                {
                                    title: "5. Webhooks",
                                    description: "Listen for asynchronous status updates."
                                }
                            ]}
                        />

                        <div className="pt-8 border-t">
                            <h2 className="text-2xl font-bold mb-4">Prerequisites</h2>
                            <ul className="list-disc pl-6 space-y-2 text-muted-foreground text-sm">
                                <li>A signed MTO Affiliate contract.</li>
                                <li>A pre-funded MITO operational wallet.</li>
                                <li>PCI-compliant architecture for card payments.</li>
                            </ul>
                        </div>
                    </div>
                </EndpointBlock>
            </div>
        </ApiReferenceLayout>
    );
}
