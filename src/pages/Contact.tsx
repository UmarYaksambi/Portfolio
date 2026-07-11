import { useState } from "react";
import { Layout } from "@/components/layout/Layout";
import { CodeDivider } from "@/components/ui/CodeDivider";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Github, Linkedin, Mail, Phone, MapPin, Send, Globe } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const socialLinks = [
  {
    href: "mailto:umaryaksambi@gmail.com",
    icon: Mail,
    label: "Email",
    handle: "umaryaksambi@gmail.com",
  },
  {
    href: "https://github.com/UmarYaksambi",
    icon: Github,
    label: "GitHub",
    handle: "@UmarYaksambi",
  },
  {
    href: "https://www.linkedin.com/in/umaryaksambi",
    icon: Linkedin,
    label: "LinkedIn",
    handle: "/in/umaryaksambi",
  },
  {
    href: "https://umaryaksambi.vercel.app",
    icon: Globe,
    label: "Portfolio",
    handle: "umaryaksambi.vercel.app",
  },
];

export default function Contact() {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);

    const form = e.currentTarget;
    const formData = new FormData(form);
    const payload = {
      name: formData.get("name"),
      email: formData.get("email"),
      message: formData.get("message"),
      botcheck: formData.get("botcheck"),
    };

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const result = await res.json();

      if (result.success) {
        toast({
          title: "Message sent",
          description: "Thanks for reaching out — I'll get back to you soon.",
        });
        form.reset();
      } else {
        throw new Error(result.message || "Submission failed");
      }
    } catch (err) {
      toast({
        title: "Something went wrong",
        description: "Please try again, or email me directly at umaryaksambi@gmail.com.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Layout>
      <section className="py-20">
        <div className="container">
          <div className="max-w-2xl mb-12 opacity-0 animate-fade-in-up">
            <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-4">Contact</h1>
            <p className="text-muted-foreground leading-relaxed">
              Building something weird, genuinely useful, or that sounds like a terrible idea
              at first? I probably want to hear about it.
            </p>
          </div>

          <div className="grid gap-16 lg:grid-cols-2">
            <div className="opacity-0 animate-fade-in-up stagger-1">
              <CodeDivider label="Send a Message" />
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Honeypot — invisible to real users, catches bots. Our
                    /api/contact function silently drops any submission
                    where this field is filled. */}
                <input
                  type="checkbox"
                  name="botcheck"
                  className="hidden"
                  style={{ display: "none" }}
                  tabIndex={-1}
                  autoComplete="off"
                />
                <div className="space-y-2">
                  <Label htmlFor="name" className="font-mono text-sm">
                    <span className="text-primary">//</span> Name
                  </Label>
                  <Input id="name" name="name" placeholder="Your name" required className="bg-card border-border font-mono text-sm" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email" className="font-mono text-sm">
                    <span className="text-primary">//</span> Email
                  </Label>
                  <Input id="email" name="email" type="email" placeholder="your@email.com" required className="bg-card border-border font-mono text-sm" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="message" className="font-mono text-sm">
                    <span className="text-primary">//</span> Message
                  </Label>
                  <Textarea id="message" name="message" placeholder="Tell me about your project..." rows={6} required className="bg-card border-border font-mono text-sm resize-none" />
                </div>
                <Button type="submit" disabled={isSubmitting} className="font-mono">
                  {isSubmitting ? "Sending..." : (<>Send Message<Send className="ml-2 h-4 w-4" /></>)}
                </Button>
              </form>
            </div>

            <div className="opacity-0 animate-fade-in-up stagger-2">
              <CodeDivider label="Connect" />
              <div className="space-y-4">
                {socialLinks.map((link, i) => (
                  <a
                    key={link.label}
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-4 p-4 bg-card border border-border rounded-lg hover:border-primary/50 hover:-translate-y-0.5 transition-all group opacity-0 animate-fade-in-up"
                    style={{ animationDelay: `${0.25 + i * 0.08}s` }}
                  >
                    <div className="flex items-center justify-center w-12 h-12 bg-secondary rounded-lg group-hover:bg-primary/10 transition-colors">
                      <link.icon className="h-5 w-5 text-muted-foreground group-hover:text-primary transition-colors" />
                    </div>
                    <div>
                      <p className="font-mono text-sm text-foreground group-hover:text-primary transition-colors">
                        {link.label}
                      </p>
                      <p className="font-mono text-xs text-muted-foreground">{link.handle}</p>
                    </div>
                  </a>
                ))}
              </div>

              <div className="mt-8 p-4 bg-card border border-border rounded-lg space-y-3">
                <p className="font-mono text-xs text-muted-foreground">
                  <span className="text-primary">/*</span> Based in <span className="text-primary">*/</span>
                </p>
                <p className="text-sm text-foreground flex items-center gap-2">
                  <MapPin className="w-4 h-4 text-primary" /> Bengaluru, Karnataka, India
                </p>
                <p className="text-sm text-foreground flex items-center gap-2">
                  <Phone className="w-4 h-4 text-primary" /> +91 99025 78332
                </p>
                <p className="font-mono text-xs text-primary pt-2 border-t border-border">
                  {"//"} Open to internships, research collabs & weird side projects
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
}