"use client";

import { DocsLayout } from "@/components/layout/DocsLayout";
import { WebhookEventCard } from "@/components/developers/WebhookEventCard";
import { CodeBlock } from "@/components/developers/CodeBlocks";

export default function WebhooksPage() {
    const signatureCheckCode = `const crypto = require('crypto');

// The raw request body as a string
const payload = req.rawBody; 
const signatureHeader = req.headers['x-mito-signature'];
const webhookSecret = process.env.MITO_WEBHOOK_SECRET;

const expectedSignature = crypto
  .createHmac('sha256', webhookSecret)
  .update(payload)
  .digest('hex');

if (signatureHeader === expectedSignature) {
  // Signature is valid, process event
  res.status(200).send('OK');
} else {
  // Invalid signature!
  res.status(401).send('Invalid signature');
}`;

    return (
        <DocsLayout>
            <div className="max-w-4xl">
                <h1 className="text-4xl font-extrabold tracking-tight mb-4">Webhooks & Callbacks</h1>
                <p className="text-xl text-muted-foreground mb-12">
                    Listen for asynchronous events from MITO. Webhooks are the primary way to receive real-time updates on transfers, collections, and compliance cases.
                </p>

                <section className="mb-16">
                    <h2 className="text-2xl font-bold mb-4">Core Concepts</h2>
                    <div className="grid md:grid-cols-2 gap-6">
                        <div className="bg-card border rounded-lg p-6">
                            <h3 className="font-semibold text-lg mb-2">Delivery & Retries</h3>
                            <p className="text-sm text-muted-foreground leading-relaxed">
                                MITO expects your webhook endpoint to return a <code className="bg-muted px-1.5 py-0.5 rounded text-foreground">2xx</code> HTTP status code within 5 seconds. If we receive a timeout or a <code className="bg-muted px-1.5 py-0.5 rounded text-foreground">5xx</code> error, we will retry delivery 5 times with exponential backoff over 24 hours.
                            </p>
                        </div>
                        <div className="bg-card border rounded-lg p-6">
                            <h3 className="font-semibold text-lg mb-2">Idempotency</h3>
                            <p className="text-sm text-muted-foreground leading-relaxed">
                                Network errors can cause duplicate webhook deliveries. You should always use the <code className="bg-muted px-1.5 py-0.5 rounded text-foreground">event_id</code> included in the payload to ensure you only process an event once.
                            </p>
                        </div>
                    </div>
                </section>

                <section className="mb-16 scroll-mt-24" id="security">
                    <h2 className="text-2xl font-bold mb-4">Signature Verification</h2>
                    <p className="text-muted-foreground mb-6">
                        To ensure the webhook was actually sent by MITO, verify the HMAC signature included in the <code className="bg-muted px-1.5 py-0.5 rounded text-foreground font-mono">X-Mito-Signature</code> header using your Endpoint Secret.
                    </p>
                    <CodeBlock code={signatureCheckCode} language="javascript" />
                </section>

                <section className="mb-16 scroll-mt-24" id="events">
                    <h2 className="text-2xl font-bold mb-6">Event Catalog</h2>

                    <h3 className="text-xl font-semibold mb-4 text-foreground/80 border-b pb-2">Transfers</h3>
                    <WebhookEventCard
                        event="transfer.completed"
                        description="Sent when an outwards transfer has successfully reached the recipient's bank account or mobile wallet."
                        payload={`{
  "event_id": "evt_abc123def456",
  "type": "transfer.completed",
  "created_at": "2024-05-15T14:26:05Z",
  "data": {
    "transfer_id": "trf_123456789",
    "reference": "TXN-001",
    "status": "completed",
    "completed_at": "2024-05-15T14:26:00Z"
  }
}`}
                    />
                    <WebhookEventCard
                        event="transfer.failed"
                        description="Sent when a transfer is permanently rejected by the receiving network."
                        payload={`{
  "event_id": "evt_def456ghi789",
  "type": "transfer.failed",
  "created_at": "2024-05-15T14:30:10Z",
  "data": {
    "transfer_id": "trf_987654321",
    "reference": "TXN-002",
    "status": "failed",
    "failure_reason": "account_closed"
  }
}`}
                    />

                    <h3 className="text-xl font-semibold mb-4 mt-12 text-foreground/80 border-b pb-2">Collections</h3>
                    <WebhookEventCard
                        event="collection.completed"
                        description="Sent when a customer has successfully paid a collection request."
                        payload={`{
  "event_id": "evt_jkl012mno345",
  "type": "collection.completed",
  "created_at": "2024-05-15T15:05:22Z",
  "data": {
    "collection_id": "col_987654321",
    "reference": "INV-2024-001",
    "amount": 50000,
    "currency": "KES"
  }
}`}
                    />

                    <h3 className="text-xl font-semibold mb-4 mt-12 text-foreground/80 border-b pb-2">Compliance</h3>
                    <WebhookEventCard
                        event="compliance.case.approved"
                        description="Sent when a user's KYC submission has been approved manually or by AI."
                        payload={`{
  "event_id": "evt_pqr678stu901",
  "type": "compliance.case.approved",
  "created_at": "2024-05-15T10:15:00Z",
  "data": {
    "individual_id": "ind_555666777",
    "status": "approved"
  }
}`}
                    />
                </section>

            </div>
        </DocsLayout>
    );
}
