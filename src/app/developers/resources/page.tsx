"use client";

import { DocsLayout } from "@/components/layout/DocsLayout";

// Placeholder for custom DownloadCard if we didn't explicitly implement it in HeroCards - using standard Card
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Download } from "lucide-react";

export default function ResourcesPage() {
    return (
        <DocsLayout>
            <div className="max-w-4xl">
                <h1 className="text-4xl font-extrabold tracking-tight mb-4">Developer Tools & Downloads</h1>
                <p className="text-xl text-muted-foreground mb-12">
                    Download our OpenAPI specifications, Postman collections, and official SDKs.
                </p>

                <section className="mb-16">
                    <div className="grid md:grid-cols-2 gap-6">
                        <Card className="hover:shadow-md transition-shadow">
                            <CardHeader>
                                <CardTitle>OpenAPI Specification</CardTitle>
                                <CardDescription>
                                    The complete OpenAPI 3.0 YAML file describing all MITO v1 endpoints.
                                </CardDescription>
                            </CardHeader>
                            <CardContent>
                                <Button variant="outline" className="w-full">
                                    <Download className="mr-2 h-4 w-4" /> Download YAML
                                </Button>
                            </CardContent>
                        </Card>

                        <Card className="hover:shadow-md transition-shadow">
                            <CardHeader>
                                <CardTitle>Postman Collection</CardTitle>
                                <CardDescription>
                                    Ready-to-use Postman collection with Sandbox environment variables.
                                </CardDescription>
                            </CardHeader>
                            <CardContent>
                                <Button variant="outline" className="w-full">
                                    <Download className="mr-2 h-4 w-4" /> Download JSON
                                </Button>
                            </CardContent>
                        </Card>
                    </div>
                </section>
            </div>
        </DocsLayout>
    );
}
