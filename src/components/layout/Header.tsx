import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, FileText } from "lucide-react";
import { cn } from "@/lib/utils";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
  SheetClose,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";

const navItems = [
  { href: "/", label: "Home" },
  { href: "/work", label: "Work" },
  { href: "/experience", label: "Experience" },
  { href: "/about", label: "About" },
  { href: "/fun", label: "Fun" },
  { href: "/contact", label: "Contact" },
];

export function Header() {
  const location = useLocation();
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 border-b border-border bg-background/80 backdrop-blur-md">
      <div className="container flex h-16 items-center justify-between">
        <Link
          to="/"
          className="font-mono text-sm font-medium text-primary hover:opacity-80 transition-opacity"
        >
          {"umar@portfolio:~$"}
        </Link>

        <nav className="hidden md:flex items-center gap-8">
          {navItems.map((item) => (
            <Link
              key={item.href}
              to={item.href}
              className={cn(
                "font-mono text-sm transition-colors hover:text-primary link-underline",
                location.pathname === item.href
                  ? "text-primary"
                  : "text-muted-foreground"
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
            className="inline-flex items-center justify-center h-9 w-9 rounded-md border border-primary/40 bg-primary/10 text-primary hover:bg-primary/20 hover:border-primary transition-all hover:scale-105 hover:shadow-[0_0_16px_hsl(var(--primary)/0.4)]"
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
            className="inline-flex items-center justify-center h-9 w-9 rounded-md border border-primary/40 bg-primary/10 text-primary"
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
            <SheetContent side="right" className="w-72 bg-background border-border">
              <div className="flex flex-col gap-6 mt-8">
                <div className="font-mono text-sm text-primary mb-4">
                  {"// Navigation"}
                </div>
                {navItems.map((item) => (
                  <SheetClose asChild key={item.href}>
                    <Link
                      to={item.href}
                      className={cn(
                        "font-mono text-lg transition-colors hover:text-primary py-2",
                        location.pathname === item.href
                          ? "text-primary"
                          : "text-muted-foreground"
                      )}
                      onClick={() => setIsOpen(false)}
                    >
                      <span className="text-primary mr-2">→</span>
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
