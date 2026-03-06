import { ReactNode } from "react";
import { cn } from "@/lib/utils";

export function StepFlow({ steps }: { steps: { title: string; description: string | ReactNode }[] }) {
    return (
        <div className="space-y-8 my-8 relative before:absolute before:inset-0 before:ml-5 before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-transparent before:via-border before:to-transparent">
            {steps.map((step, index) => (
                <div key={index} className="relative flex items-start justify-center md:justify-normal md:odd:flex-row-reverse group is-active">
                    {/* Timeline Marker */}
                    <div className="flex items-center justify-center w-10 h-10 rounded-full border-4 border-background bg-primary text-primary-foreground font-bold shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 z-10 shadow">
                        {index + 1}
                    </div>

                    {/* Content Card */}
                    <div className="w-[calc(100%-4rem)] md:w-[calc(50%-2.5rem)] pl-4 md:pl-0 md:group-odd:pr-8 md:group-even:pl-8">
                        <div className="p-5 rounded-lg border bg-card text-card-foreground shadow-sm hover:shadow-md transition-shadow">
                            <h3 className="font-bold text-lg mb-2">{step.title}</h3>
                            <div className="text-muted-foreground leading-relaxed text-sm">
                                {step.description}
                            </div>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
}

export function FlowDiagram({
    title,
    description,
    children
}: {
    title?: string;
    description?: string;
    children: ReactNode;
}) {
    return (
        <div className="my-10 border rounded-xl overflow-hidden bg-card">
            {(title || description) && (
                <div className="p-6 border-b bg-muted/20">
                    {title && <h3 className="font-bold text-xl mb-2">{title}</h3>}
                    {description && <p className="text-muted-foreground">{description}</p>}
                </div>
            )}
            <div className="p-8 flex items-center justify-center bg-background min-h-[300px] relative overflow-hidden">
                {/* Placeholder background pattern */}
                <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]"></div>

                {/* Diagram Content */}
                <div className="relative z-10 w-full max-w-3xl">
                    {children}
                </div>
            </div>
        </div>
    );
}

export function FlowNode({
    label,
    sublabel,
    type = "default",
    className
}: {
    label: string;
    sublabel?: string;
    type?: "default" | "primary" | "secondary" | "user" | "MITO";
    className?: string;
}) {
    const typeStyles = {
        default: "bg-background border-border text-foreground",
        primary: "bg-primary/10 border-primary/30 text-primary",
        secondary: "bg-secondary text-secondary-foreground border-border",
        user: "bg-blue-50 border-blue-200 text-blue-700 dark:bg-blue-950 dark:border-blue-800 dark:text-blue-300",
        MITO: "bg-primary border-primary text-primary-foreground shadow-md",
    };

    return (
        <div className={cn(
            "px-6 py-4 rounded-lg border-2 text-center shadow-sm w-[180px] shrink-0 font-medium transition-all hover:shadow-md",
            typeStyles[type] || typeStyles.default,
            className
        )}>
            {label}
            {sublabel && <div className="text-xs mt-1 opacity-80 font-normal">{sublabel}</div>}
        </div>
    );
}

export function FlowArrow({
    label,
    direction = "right",
    className
}: {
    label?: string;
    direction?: "right" | "left" | "down" | "up" | "both";
    className?: string;
}) {
    return (
        <div className={cn("flex flex-col items-center justify-center shrink-0 min-w-[100px] px-2", className)}>
            {label && <span className="text-xs text-muted-foreground font-medium mb-1 text-center bg-background px-2">{label}</span>}
            <div className="relative w-full h-0.5 bg-border/80">
                {(direction === "right" || direction === "both") && (
                    <div className="absolute -right-1 top-1/2 -translate-y-1/2 w-3 h-3 border-t-2 border-r-2 border-border/80 rotate-45 transform origin-center"></div>
                )}
                {(direction === "left" || direction === "both") && (
                    <div className="absolute -left-1 top-1/2 -translate-y-1/2 w-3 h-3 border-b-2 border-l-2 border-border/80 rotate-45 transform origin-center"></div>
                )}
            </div>
        </div>
    );
}
