import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { CodeBlock } from "./CodeBlocks";

export function WebhookEventCard({
    event,
    description,
    payload,
}: {
    event: string;
    description: string;
    payload: string;
}) {
    return (
        <Card className="mb-8 border-border/50 bg-card overflow-hidden">
            <CardHeader className="bg-muted/30 border-b pb-4">
                <div className="flex items-center gap-3 mb-2">
                    <Badge variant="outline" className="font-mono bg-background text-foreground tracking-tight py-1">
                        {event}
                    </Badge>
                </div>
                <CardDescription className="text-base text-foreground/80">
                    {description}
                </CardDescription>
            </CardHeader>
            <CardContent className="p-0">
                <div className="bg-[#0d1117] p-2 text-xs font-medium text-muted-foreground border-b border-border/30 pl-4">
                    Example Payload
                </div>
                <div className="[&>div]:rounded-none [&>div]:border-0">
                    <CodeBlock code={payload} language="json" />
                </div>
            </CardContent>
        </Card>
    );
}
