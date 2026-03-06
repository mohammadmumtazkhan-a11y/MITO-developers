"use client";

import { useState } from "react";
import { Check, Copy } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export function CodeBlock({
    code,
    language = "json"
}: {
    code: string;
    language?: string
}) {
    const [copied, setCopied] = useState(false);

    const copyToClipboard = () => {
        navigator.clipboard.writeText(code);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    return (
        <div className="relative group flex flex-col h-full max-w-full overflow-hidden rounded-lg bg-[#0d1117] border border-border">
            <div className="flex items-center justify-between px-4 py-2 bg-muted/20 border-b border-border text-xs text-muted-foreground font-mono shrink-0">
                <span>{language}</span>
                <button
                    onClick={copyToClipboard}
                    className="flex items-center gap-1.5 hover:text-foreground transition-colors p-1"
                    aria-label="Copy code"
                >
                    {copied ? <Check className="w-3.5 h-3.5 text-green-500" /> : <Copy className="w-3.5 h-3.5" />}
                </button>
            </div>
            <pre className="flex-1 p-4 overflow-x-auto overflow-y-auto text-sm font-mono leading-relaxed text-[#c9d1d9]">
                <code>{code}</code>
            </pre>
        </div>
    );
}

export interface CodeTab {
    language: string;
    label: string;
    code: string;
}

export function CodeTabs({ tabs, height = "220px" }: { tabs: CodeTab[]; height?: string }) {
    if (!tabs || tabs.length === 0) return null;

    return (
        <Tabs defaultValue={tabs[0].language} className="w-full flex flex-col">
            <TabsList className="w-full justify-start rounded-b-none border-b bg-transparent p-0 shrink-0">
                {tabs.map((tab) => (
                    <TabsTrigger
                        key={tab.language}
                        value={tab.language}
                        className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent px-4 py-2 text-sm font-medium"
                    >
                        {tab.label}
                    </TabsTrigger>
                ))}
            </TabsList>
            {tabs.map((tab) => (
                <TabsContent
                    key={tab.language}
                    value={tab.language}
                    className="mt-0 border-x border-b rounded-b-lg overflow-hidden"
                    style={{ height }}
                >
                    <CodeBlock code={tab.code} language={tab.language} />
                </TabsContent>
            ))}
        </Tabs>
    );
}
