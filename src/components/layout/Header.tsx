import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

export function Header() {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 max-w-7xl mx-auto items-center justify-between px-4 sm:px-6 lg:px-8">
        <div className="flex items-center gap-8">
          <Link href="/" className="flex items-center space-x-2">
            {/* MITO Logo Placeholder - stylized 'M' or 'R' from the screenshot */}
            <div className="bg-primary text-primary-foreground p-1.5 rounded-md font-bold text-xl leading-none flex items-center justify-center w-8 h-8">
              M
            </div>
            <span className="font-bold text-xl hidden sm:inline-block">MITO</span>
          </Link>
          <nav className="hidden md:flex items-center space-x-6 text-sm font-medium">
            <Link href="https://mito.money" className="transition-colors hover:text-foreground/80 text-foreground/60">
              Solutions
            </Link>
            <Link href="https://mito.money/about-us" className="transition-colors hover:text-foreground/80 text-foreground/60">
              About us
            </Link>
            <Link href="/developers" className="transition-colors hover:text-foreground/80 text-foreground font-semibold">
              Developers
            </Link>
          </nav>
        </div>
        <div className="flex items-center space-x-4">
          <Button asChild className="bg-primary hover:bg-primary/90 text-white rounded-md px-6 font-semibold">
            <Link href="https://mito.money/login" target="_blank">
              Login <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </div>
      </div>
    </header>
  );
}
