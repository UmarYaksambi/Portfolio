import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, FileText } from "lucide-react";
import { cn } from "@/lib/utils";
import { Sheet, SheetContent, SheetTrigger, SheetClose } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";

const navItems = [
  { href: "/", label: "Home" },
  { href: "/work", label: "Work" },
  { href: "/experience", label: "Experience" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
];

export function Header() {
  const location = useLocation();
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="fixed left-0 right-0 top-0 z-50 border-b border-border bg-background/80 backdrop-blur-md">
      <div className="container flex h-16 items-center justify-between">
        <Link
          to="/"
          className="font-mono text-sm font-medium text-primary transition-opacity hover:opacity-80"
        >
          {"umar@portfolio:~$"}
        </Link>

        <nav className="hidden items-center gap-8 md:flex">
          {navItems.map((item) => (
            <Link
              key={item.href}
              to={item.href}
              className={cn(
                "link-underline font-mono text-sm transition-colors hover:text-primary",
                location.pathname === item.href ? "text-primary" : "text-muted-foreground"
              )}
            >
              {item.label}
            </Link>
          ))}
          <a
            href="/assets/resume.pdf"
            target="_blank"
            rel="noreferrer"
            aria-label="Open resume"
            title="Resume"
            className="inline-flex h-9 w-9 items-center justify-center rounded-md border border-primary/40 bg-primary/10 text-primary transition-all hover:scale-105 hover:border-primary hover:bg-primary/20 hover:shadow-[0_0_16px_hsl(var(--primary)/0.4)]"
          >
            <FileText className="h-4 w-4" />
          </a>
        </nav>

        <div className="flex items-center gap-2 md:hidden">
          <a
            href="/assets/resume.pdf"
            target="_blank"
            rel="noreferrer"
            aria-label="Open resume"
            className="inline-flex h-9 w-9 items-center justify-center rounded-md border border-primary/40 bg-primary/10 text-primary"
          >
            <FileText className="h-4 w-4" />
          </a>
          <Sheet open={isOpen} onOpenChange={setIsOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="text-foreground">
                <Menu className="h-5 w-5" />
                <span className="sr-only">Toggle menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-72 border-border bg-background">
              <div className="mt-8 flex flex-col gap-6">
                <div className="mb-4 font-mono text-sm text-primary">{"// Navigation"}</div>
                {navItems.map((item) => (
                  <SheetClose asChild key={item.href}>
                    <Link
                      to={item.href}
                      className={cn(
                        "py-2 font-mono text-lg transition-colors hover:text-primary",
                        location.pathname === item.href ? "text-primary" : "text-muted-foreground"
                      )}
                      onClick={() => setIsOpen(false)}
                    >
                      <span className="mr-2 text-primary">→</span>
                      {item.label}
                    </Link>
                  </SheetClose>
                ))}
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
