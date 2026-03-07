"use client";

import Link from "next/link";
import { ArrowUp } from "lucide-react";

export function Footer() {
    const scrollToTop = () => {
        window.scrollTo({ top: 0, behavior: "smooth" });
    };

    return (
        <footer className="w-full bg-[#E14918] text-white py-12 px-6 sm:px-12 lg:px-24 mt-auto">
            <div>
                <div className="flex flex-col md:flex-row justify-between gap-8 mb-12">
                    {/* Solutions Column */}
                    <div className="space-y-4">
                        <h3 className="font-bold text-lg mb-6">Solutions</h3>
                        <ul className="space-y-3">
                            <li><Link href="https://mito.money/solutions/make-payment" className="hover:underline opacity-90">Make payment</Link></li>
                            <li><Link href="https://mito.money/solutions/receive-payment" className="hover:underline opacity-90">Request payment</Link></li>
                            <li><Link href="https://mito.money/solutions/forex" className="hover:underline opacity-90">Forex</Link></li>
                            <li><Link href="https://mito.money/solutions/verification" className="hover:underline opacity-90">Verification</Link></li>
                            <li><Link href="https://mito.money/solutions/affiliate" className="hover:underline opacity-90">Affiliate</Link></li>
                        </ul>
                    </div>

                    {/* About Column */}
                    <div className="space-y-4">
                        <h3 className="font-bold text-lg mb-6">About</h3>
                        <ul className="space-y-3">
                            <li><Link href="https://mito.money/about-us" className="hover:underline opacity-90">About us</Link></li>
                            <li><Link href="/developers" className="hover:underline opacity-90 font-semibold">Developers</Link></li>
                        </ul>
                    </div>

                    {/* Help Column */}
                    <div className="space-y-4">
                        <h3 className="font-bold text-lg mb-6">Help</h3>
                        <ul className="space-y-3">
                            <li><Link href="https://mito.money/contact-us" className="hover:underline opacity-90">Contact us</Link></li>
                            <li><Link href="https://mito.money/customer-support" className="hover:underline opacity-90">Support</Link></li>
                            <li><Link href="https://mito.money/terms" className="hover:underline opacity-90">Terms</Link></li>
                            <li><Link href="https://mito.money/privacy-policy" className="hover:underline opacity-90">Privacy Policy</Link></li>
                        </ul>
                    </div>
                </div>

                {/* Bottom Section */}
                <div className="pt-8 border-t border-white/20 flex flex-col md:flex-row justify-between items-center text-sm opacity-90 gap-4">
                    <p className="max-w-3xl">
                        © 2026 Mito.money is a trademark owned by Funtech Global Communications Ltd. Devonshire House, Manor way, Borehamwood, Herts. WD6 1QQ, United Kingdom. A registered Payment institution in the UK with registration details FRN: 815146 MLR NO: 12803115
                    </p>
                    <button
                        onClick={scrollToTop}
                        className="p-2 bg-white/20 hover:bg-white/30 rounded-full transition-colors shrink-0"
                        aria-label="Back to top"
                    >
                        <ArrowUp className="h-5 w-5" />
                    </button>
                </div>
            </div>
        </footer >
    );
}
