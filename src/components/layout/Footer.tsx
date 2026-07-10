import { Link } from "react-router-dom";
import { Github, Linkedin, Mail } from "lucide-react";

const socialLinks = [
  { href: "https://github.com/UmarYaksambi", icon: Github, label: "GitHub" },
  { href: "https://www.linkedin.com/in/umaryaksambi", icon: Linkedin, label: "LinkedIn" },
  { href: "mailto:umaryaksambi@gmail.com", icon: Mail, label: "Email" },
];

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t border-border bg-background">
      <div className="container py-8">
        <div className="flex flex-col items-center justify-between gap-6 md:flex-row">
          <p className="font-mono text-sm text-muted-foreground">
            <span className="text-primary">//</span> © {currentYear} Umar Yaksambi
          </p>

          <nav className="flex items-center gap-x-4 gap-y-2 flex-wrap justify-center font-mono text-sm text-muted-foreground">
            <Link to="/now" className="hover:text-primary transition-colors">
              Now
            </Link>
            <span className="text-border">·</span>
            <Link to="/uptime" className="hover:text-primary transition-colors">
              Uptime
            </Link>
            <span className="text-border">·</span>
            <Link to="/decisions" className="hover:text-primary transition-colors">
              Decisions
            </Link>
            <span className="text-border">·</span>
            <Link to="/styleguide" className="hover:text-primary transition-colors">
              Styleguide
            </Link>
          </nav>

          <div className="flex items-center gap-4">
            {socialLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground hover:text-primary transition-colors"
                aria-label={link.label}
              >
                <link.icon className="h-5 w-5" />
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}