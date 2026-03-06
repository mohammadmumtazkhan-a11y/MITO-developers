import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { ReactNode } from "react";

type HttpMethod = "GET" | "POST" | "PUT" | "PATCH" | "DELETE";

const methodColors: Record<HttpMethod, string> = {
    GET: "bg-blue-500/10 text-blue-700 dark:bg-blue-500/20 dark:text-blue-400 hover:bg-blue-500/20",
    POST: "bg-green-500/10 text-green-700 dark:bg-green-500/20 dark:text-green-400 hover:bg-green-500/20",
    PUT: "bg-yellow-500/10 text-yellow-700 dark:bg-yellow-500/20 dark:text-yellow-400 hover:bg-yellow-500/20",
    PATCH: "bg-orange-500/10 text-orange-700 dark:bg-orange-500/20 dark:text-orange-400 hover:bg-orange-500/20",
    DELETE: "bg-red-500/10 text-red-700 dark:bg-red-500/20 dark:text-red-400 hover:bg-red-500/20",
};

export function StatusBadge({ status }: { status: "Live" | "Sandbox" | "Beta" | "Deprecated" }) {
    return (
        <Badge
            variant="outline"
            className={cn(
                "font-medium border shadow-sm",
                status === "Live" && "bg-green-50 text-green-700 border-green-200 dark:bg-green-950 dark:text-green-400 dark:border-green-900",
                status === "Sandbox" && "bg-blue-50 text-blue-700 border-blue-200 dark:bg-blue-950 dark:text-blue-400 dark:border-blue-900",
                status === "Beta" && "bg-purple-50 text-purple-700 border-purple-200 dark:bg-purple-950 dark:text-purple-400 dark:border-purple-900",
                status === "Deprecated" && "bg-red-50 text-red-700 border-red-200 dark:bg-red-950 dark:text-red-400 dark:border-red-900"
            )}
        >
            {status}
        </Badge>
    );
}

export function EndpointBlock({
    method,
    path,
    title,
    description,
    status = "Live",
    children,
    exampleResponse
}: {
    method: HttpMethod;
    path: string;
    title: string;
    description: string;
    status?: "Live" | "Sandbox" | "Beta" | "Deprecated";
    children?: ReactNode;
    exampleResponse?: ReactNode;
}) {
    return (
        <div className="mb-16 scroll-mt-24 pb-12 border-b last:border-0" id={path.replace(/\//g, "-").replace(/^-/, "")}>
            <div className="flex items-center gap-4 mb-3">
                <h2 className="text-2xl font-bold tracking-tight">{title}</h2>
                <StatusBadge status={status} />
            </div>

            <p className="text-muted-foreground mb-6 text-lg">{description}</p>

            <div className="flex items-center gap-3 p-3 rounded-md bg-muted/50 border font-mono text-sm mb-8 overflow-x-auto">
                <Badge variant="secondary" className={cn("text-xs px-2 py-0.5", methodColors[method])}>
                    {method}
                </Badge>
                <span className="text-foreground">{path}</span>
            </div>

            {exampleResponse ? (
                <div className="flex flex-col xl:flex-row gap-8 items-start">
                    {/* Left: Request body / params */}
                    <div className="flex-1 min-w-0 space-y-6">
                        {children}
                    </div>
                    {/* Right: Example response */}
                    <div className="xl:w-[420px] shrink-0 space-y-4">
                        <h3 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground">
                            Example Response
                        </h3>
                        {exampleResponse}
                    </div>
                </div>
            ) : (
                <div className="space-y-6">
                    {children}
                </div>
            )}
        </div>
    );
}
