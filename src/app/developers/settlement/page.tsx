"use client";

import { DocsLayout } from "@/components/layout/DocsLayout";
import { FlowDiagram, FlowNode, FlowArrow } from "@/components/developers/Flows";

export default function SettlementPage() {
    return (
        <DocsLayout>
            <div className="max-w-4xl">
                <h1 className="text-4xl font-extrabold tracking-tight mb-4">Settlement & Reconciliation</h1>
                <p className="text-xl text-muted-foreground mb-12">
                    Understand how funds flow through your MITO wallets, how fees are deducted, and how to reconcile your daily payouts.
                </p>

                <section className="mb-16">
                    <h2 className="text-2xl font-bold mb-6">Wallet Architecture</h2>
                    <p className="text-muted-foreground mb-6">
                        When you integrate with MITO as an Affiliate or Biller, you are assigned virtual wallets for each currency you operate in (e.g., GBP, EUR, KES).
                    </p>

                    <FlowDiagram title="Typical Settlement Flow">
                        <div className="flex flex-col md:flex-row items-center justify-center">
                            <FlowNode label="Customer Payment" sublabel="£100.00" type="secondary" />
                            <FlowArrow direction="right" label="Platform fee 1%" />
                            <FlowNode label="GBP Wallet" sublabel="Balance: £99.00" type="MITO" />
                            <FlowArrow direction="right" label="Auto Payout" />
                            <FlowNode label="Your Bank UK" sublabel="Received: £99.00" type="secondary" />
                        </div>
                    </FlowDiagram>
                </section>
            </div>
        </DocsLayout>
    );
}
