"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { Eye, EyeOff } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent } from "@/components/ui/card";

export default function LoginPage() {
    const router = useRouter();
    const [showPassword, setShowPassword] = useState(false);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!email || !password) return;

        setIsSubmitting(true);
        // Simulate successful login
        setTimeout(() => {
            // Set cookie for middleware (simple client-side set)
            document.cookie = "isLoggedIn=true; path=/; max-age=3600"; // 1 hour
            
            toast.success("Welcome back! Redirecting...");
            router.push("/developers/api-reference");
        }, 800);
    };

    return (
        <div className="min-h-screen w-full flex flex-col items-center justify-center bg-[#FAF9F8] p-4">
            {/* Logo */}
            <div className="mb-8">
                <Link href="/">
                    <svg width="40" height="52" viewBox="0 0 37 48" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <g clipPath="url(#clip0_logo_login)">
                            <path d="M36.5911 44.4182C36.5495 43.9758 36.419 43.5462 36.2072 43.1552L24.6276 21.1158L36.2468 5.22962C36.7606 4.5267 36.9733 3.64903 36.8382 2.78969C36.7032 1.93034 36.2313 1.1597 35.5266 0.647289C34.9544 0.23274 34.2669 0.0064727 33.5597 5.95182e-07H3.28473C2.8533 -0.000258839 2.42605 0.0842981 2.02741 0.248836C1.62877 0.413374 1.26656 0.654666 0.961496 0.958914C0.656429 1.26316 0.414487 1.6244 0.249506 2.02197C0.084525 2.41954 -0.000259536 2.84564 5.96784e-07 3.27591V44.7182C0.00306492 45.2333 0.126658 45.7406 0.360941 46.1997C0.595225 46.6588 0.93373 47.057 1.34951 47.3626C2.01805 47.8427 2.84222 48.0566 3.66061 47.9624C4.479 47.8682 5.23266 47.4728 5.77401 46.8534C5.83337 46.7863 5.88482 46.7153 5.94022 46.6561L15.0742 34.1603L31.205 47.2363C31.4606 47.4467 31.746 47.6183 32.0519 47.7454C34.2958 48.7006 36.8405 46.8416 36.5911 44.4182ZM13.8513 24.7154L6.57738 34.6615V6.55972H27.1366L16.9065 20.5435L22.9892 32.1197L13.8513 24.7154Z" fill="#FE3B1F"/>
                        </g>
                        <defs>
                            <clipPath id="clip0_logo_login">
                                <rect width="36.878" height="48" fill="white"/>
                            </clipPath>
                        </defs>
                    </svg>
                </Link>
            </div>

            <Card className="w-full max-w-[440px] border-none shadow-xl shadow-black/5 bg-white">
                <CardContent className="p-8 md:p-10">
                    <h1 className="text-3xl font-bold text-[#1A1A1A] mb-8">Login to your account</h1>

                    <form className="space-y-6" onSubmit={handleSubmit}>
                        <div className="space-y-2">
                            <Label htmlFor="email" className="text-sm font-semibold text-[#1A1A1A]">
                                Email <span className="text-red-500">*</span>
                            </Label>
                            <Input
                                id="email"
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                placeholder="Enter Email"
                                className="bg-[#FAF9F8] border-[#E5E7EB] h-12"
                                required
                            />
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="password" className="text-sm font-semibold text-[#1A1A1A]">
                                Password <span className="text-red-500">*</span>
                            </Label>
                            <div className="relative">
                                <Input
                                    id="password"
                                    type={showPassword ? "text" : "password"}
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    placeholder="Enter Password"
                                    className="bg-[#FAF9F8] border-[#E5E7EB] h-12 pr-10"
                                    required
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowPassword(!showPassword)}
                                    className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                                >
                                    {showPassword ? (
                                        <EyeOff className="h-5 w-5" />
                                    ) : (
                                        <Eye className="h-5 w-5" />
                                    )}
                                </button>
                            </div>
                        </div>

                        <div>
                            <Link
                                href="/forgot-password"
                                className="text-[#3B82F6] hover:underline text-sm font-medium"
                            >
                                Forgot password?
                            </Link>
                        </div>

                        <Button
                            type="submit"
                            disabled={isSubmitting}
                            className="w-full bg-[#FE3B1F] hover:bg-[#E14918] text-white h-12 text-base font-bold rounded-md"
                        >
                            {isSubmitting ? "Logging in..." : "Log in"}
                        </Button>
                    </form>
                </CardContent>
            </Card>
        </div>
    );
}
