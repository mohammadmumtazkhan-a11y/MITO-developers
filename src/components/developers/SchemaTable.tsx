
export interface SchemaField {
    name: string;
    type: string;
    required?: boolean;
    description: string;
    example?: string;
}

export function SchemaTable({ fields }: { fields: SchemaField[] }) {
    return (
        <div className="w-full overflow-x-auto rounded-lg border bg-card text-card-foreground shadow-sm mb-12">
            <table className="w-full text-sm text-left">
                <thead className="bg-muted/50 text-muted-foreground border-b uppercase text-xs">
                    <tr>
                        <th className="px-4 py-3 font-medium w-1/4">Field</th>
                        <th className="px-4 py-3 font-medium w-1/6">Type</th>
                        <th className="px-4 py-3 font-medium w-[10%]">Status</th>
                        <th className="px-4 py-3 font-medium w-auto">Description</th>
                    </tr>
                </thead>
                <tbody className="divide-y relative">
                    {fields.map((field) => (
                        <tr key={field.name} className="hover:bg-muted/30 transition-colors">
                            <td className="px-4 py-3 font-mono text-foreground font-semibold">
                                {field.name}
                            </td>
                            <td className="px-4 py-3 font-mono text-muted-foreground text-xs">
                                {field.type}
                            </td>
                            <td className="px-4 py-3">
                                {field.required ? (
                                    <span className="text-red-500 font-medium text-xs">Required</span>
                                ) : (
                                    <span className="text-muted-foreground text-xs">Optional</span>
                                )}
                            </td>
                            <td className="px-4 py-3 text-muted-foreground">
                                <span className="block mb-2">{field.description}</span>
                                {field.example && (
                                    <div className="pt-1 flex flex-wrap items-center gap-2 text-xs">
                                        <span className="text-muted-foreground font-medium">Example:</span>
                                        <code className="bg-muted px-1.5 py-0.5 rounded text-foreground font-mono break-all whitespace-pre-wrap max-w-full">
                                            {field.example}
                                        </code>
                                    </div>
                                )}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}
