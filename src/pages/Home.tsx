import { useState } from "react";
import { Link } from "react-router-dom";
import { Layout } from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { CodeDivider } from "@/components/ui/CodeDivider";
import { CodeLabel } from "@/components/ui/CodeLabel";
import { ProjectCard } from "@/components/ui/ProjectCard";
import { TerminalHero } from "@/components/TerminalHero";
import { CodeSnippetsBackdrop } from "@/components/CodeSnippetsBackdrop";
import {
  ArrowRight,
  Github,
  Linkedin,
  Mail,
  FileText,
  Server,
  Brain,
  LaptopMinimal,
  Sparkles,
} from "lucide-react";

const featuredProjects = [
  {
    name: "Thrive Learning Platform",
    slug: "thrive-learning-platform",
    description:
      "Offline-first educational PWA with OpenAI + Gemini delivering dynamic curricula, 3D visuals, and a context-aware tutor.",
    stack: ["Next.js", "Supabase", "OpenAI", "Gemini"],
    impact: "Offline-capable AI tutor with RBAC",
  },
  {
    name: "Adaptive-ECC Watermarking",
    slug: "adaptive-ecc-watermarking",
    description:
      "Invisible watermarking for AI images using ECC that scales intensity by local complexity — recoverable under transformations.",
    stack: ["Python", "OpenCV", "Cryptography"],
    impact: "Under review at MTAP, Springer",
  },
  {
    name: "MedQuery",
    slug: "medquery",
    description:
      "Clinical platform letting healthcare professionals query MIMIC-IV via natural language with secure RBAC and analytics.",
    stack: ["React", "FastAPI", "LLMs"],
    impact: "Natural-language over MIMIC-IV",
  },
  {
    name: "Adaptive Defenses for IoT",
    slug: "adaptive-defenses-wireless-iot",
    description:
      "Game-theoretic + Q-learning defense strategies against adaptive jamming, benchmarked at 7% over baseline.",
    stack: ["Python", "Game Theory", "Q-Learning"],
    impact: "+7% over baseline defenses",
  },
];

const timelinePreview = [
  {
    icon: Server,
    role: "CPP-3 Intern",
    org: "Hewlett Packard Enterprise",
    time: "Mar 2026 – Present",
    note: "AI-powered defect intelligence: CI failures → Jira via hybrid lexical + semantic retrieval.",
  },
  {
    icon: Brain,
    role: "Product Developer Intern",
    org: "SpikedAI",
    time: "Jun 2025 – Mar 2026",
    note: "AI Sales Copilot backend at 500 RPS. RAG over 100M+ tokens with 750ms end-to-end.",
  },
  {
    icon: LaptopMinimal,
    role: "PRISM Research Intern",
    org: "Samsung R&D",
    time: "May 2025 – Jan 2026",
    note: "Real-time mobile 3D Gaussian Splatting viewer, 30 FPS @ 1080p on Dimensity 9000.",
  },
];

const taglines = [
  "I build systems that don't panic in production",
  "I write code that stays calm under load",
  "I ship backends that don't blink at 3am",
  "I build things that fail gracefully, not loudly",
  "I turn spaghetti requirements into stable systems",
  "I make machines learn without losing their minds",
  "I build APIs that don't flinch at traffic spikes",
  "I debug in production so you don't have to",
  "I build systems, not just Kanban tickets",
  "I make sure the pager stays quiet",
  "I build pipelines that don't clog under pressure",
  "I turn edge cases into non-issues",
  "I build software that behaves — mostly",
];

export default function Home() {
  // Pick one random tagline per page load/mount — stays fixed until reload
  const [taglineIndex] = useState(() => Math.floor(Math.random() * taglines.length));

  return (
    <Layout>
      <style>{`
        @font-face {
          font-family: "Segoe Script Web";
          src: url("/fonts/SegoeScript.ttf") format("truetype");
          font-weight: normal;
          font-style: normal;
          font-display: swap;
        }

        .signature-name {
          font-family: "Segoe Script Web", cursive;
        }
      `}</style>
      {/* Hero */}
      <section
        id="hero"
        className="relative flex min-h-[calc(100vh-4rem)] scroll-mt-16 items-center overflow-hidden bg-background"
      >
        <CodeSnippetsBackdrop />

        <div className="container relative z-10 py-16">
          <div className="grid items-center gap-12 lg:grid-cols-2">
            <div className="order-2 animate-fade-in-up opacity-0 lg:order-1">
              <TerminalHero />

              <div className="mt-6 grid grid-cols-3 gap-3">
                <div className="rounded-lg border border-border bg-card/60 p-4 backdrop-blur-sm transition-all hover:-translate-y-0.5 hover:border-primary/50">
                  <div className="font-mono text-2xl font-bold text-primary">9.13</div>
                  <div className="mt-1 font-mono text-xs text-muted-foreground">CGPA</div>
                </div>
                <div className="rounded-lg border border-border bg-card/60 p-4 backdrop-blur-sm transition-all hover:-translate-y-0.5 hover:border-primary/50">
                  <div className="font-mono text-2xl font-bold text-primary">500</div>
                  <div className="mt-1 font-mono text-xs text-muted-foreground">RPS @ SpikedAI</div>
                </div>
                <div className="rounded-lg border border-border bg-card/60 p-4 backdrop-blur-sm transition-all hover:-translate-y-0.5 hover:border-primary/50">
                  <div className="font-mono text-2xl font-bold text-primary">4</div>
                  <div className="mt-1 font-mono text-xs text-muted-foreground">Internships</div>
                </div>
              </div>
            </div>

            <div className="stagger-1 order-1 animate-fade-in-up opacity-0 lg:order-2">
              <CodeLabel className="mb-6">Backend · ML · Full-Stack Engineer</CodeLabel>

              <h1 className="mb-6 text-4xl font-bold leading-tight text-foreground md:text-5xl lg:text-6xl">
                Hi, I'm{" "}
                <span className="signature-name -my-2 inline-block align-middle text-5xl font-normal text-primary md:-my-4 md:text-7xl lg:text-8xl">
                  Umar
                </span>
                .
                <br />
                <span className="text-3xl text-muted-foreground md:text-4xl lg:text-5xl">
                  {taglines[taglineIndex]}
                </span>
                <span className="ml-1 animate-blink text-primary">▍</span>
              </h1>

              <p className="mb-8 max-w-xl text-base leading-relaxed text-muted-foreground md:text-lg">
                CS student at RVCE, currently a CPP-3 intern at{" "}
                <span className="text-primary">Hewlett Packard Enterprise</span> building AI-powered
                defect intelligence. Previously at SpikedAI and Samsung R&D — scalable backends, RAG
                pipelines, and real-time 3D on mobile.
              </p>

              <div className="mb-8 flex flex-wrap gap-3">
                {["Python", "FastAPI", "PyTorch", "React", "AWS"].map((tech) => (
                  <span
                    key={tech}
                    className="rounded-full border border-border bg-secondary px-3 py-1 font-mono text-xs text-muted-foreground transition-all hover:-translate-y-0.5 hover:border-primary/60 hover:text-primary"
                  >
                    {tech}
                  </span>
                ))}
              </div>

              <div className="mb-8 flex flex-wrap gap-4">
                <Button
                  asChild
                  size="lg"
                  className="font-mono transition-transform hover:scale-105"
                >
                  <Link to="/work">
                    View Work
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
                <Button
                  asChild
                  size="lg"
                  variant="outline"
                  className="font-mono transition-colors hover:border-primary/60"
                >
                  <a href="/assets/resume.pdf" target="_blank" rel="noreferrer">
                    <FileText className="mr-2 h-4 w-4" />
                    Resume
                  </a>
                </Button>
              </div>

              <div className="flex items-center gap-3">
                <a
                  href="mailto:umaryaksambi@gmail.com"
                  aria-label="Email"
                  className="rounded-md border border-border bg-card/60 p-2.5 text-muted-foreground transition-all hover:-translate-y-0.5 hover:border-primary/50 hover:text-primary"
                >
                  <Mail className="h-4 w-4" />
                </a>
                <a
                  href="https://github.com/UmarYaksambi"
                  target="_blank"
                  rel="noreferrer"
                  aria-label="GitHub"
                  className="rounded-md border border-border bg-card/60 p-2.5 text-muted-foreground transition-all hover:-translate-y-0.5 hover:border-primary/50 hover:text-primary"
                >
                  <Github className="h-4 w-4" />
                </a>
                <a
                  href="https://www.linkedin.com/in/umaryaksambi"
                  target="_blank"
                  rel="noreferrer"
                  aria-label="LinkedIn"
                  className="rounded-md border border-border bg-card/60 p-2.5 text-muted-foreground transition-all hover:-translate-y-0.5 hover:border-primary/50 hover:text-primary"
                >
                  <Linkedin className="h-4 w-4" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Work */}
      <section id="work" className="scroll-mt-16 py-20">
        <div className="container">
          <div className="animate-fade-in-up opacity-0">
            <CodeDivider label="Featured Work" />
          </div>

          <div className="grid gap-6 md:grid-cols-2">
            {featuredProjects.map((project, index) => (
              <div
                key={project.slug}
                className="animate-fade-in-up opacity-0"
                style={{ animationDelay: `${0.1 + index * 0.08}s` }}
              >
                <ProjectCard {...project} className="hover-lift h-full" />
              </div>
            ))}
          </div>

          <div className="stagger-4 mt-12 animate-fade-in-up text-center opacity-0">
            <Link
              to="/work"
              className="link-underline inline-flex items-center font-mono text-sm text-muted-foreground transition-colors hover:text-primary"
            >
              <span className="mr-2 text-primary">{"//"}</span>
              View all projects
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* Experience preview */}
      <section id="experience" className="scroll-mt-16 border-t border-border py-20">
        <div className="container">
          <div className="animate-fade-in-up opacity-0">
            <CodeDivider label="Currently Shipping" />
          </div>
          <div className="grid gap-4 md:grid-cols-3">
            {timelinePreview.map((e, i) => (
              <article
                key={e.org}
                className="animate-fade-in-up rounded-lg border border-border bg-card/60 p-6 opacity-0 transition-all hover:-translate-y-1 hover:border-primary/40"
                style={{ animationDelay: `${0.1 + i * 0.1}s` }}
              >
                <e.icon className="mb-3 h-5 w-5 text-primary" />
                <h3 className="font-mono text-sm font-semibold text-primary">{e.role}</h3>
                <p className="font-medium text-foreground">{e.org}</p>
                <p className="mb-3 mt-1 font-mono text-xs text-muted-foreground">{e.time}</p>
                <p className="text-sm leading-relaxed text-muted-foreground">{e.note}</p>
              </article>
            ))}
          </div>
          <div className="stagger-3 mt-10 animate-fade-in-up text-center opacity-0">
            <Link
              to="/experience"
              className="link-underline inline-flex items-center font-mono text-sm text-muted-foreground transition-colors hover:text-primary"
            >
              <span className="mr-2 text-primary">{"//"}</span>
              Full experience & certifications
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* About snippet */}
      <section id="about" className="scroll-mt-16 border-t border-border py-20">
        <div className="container">
          <div className="animate-fade-in-up opacity-0">
            <CodeDivider label="About" />
          </div>
          <div className="grid gap-10 lg:grid-cols-[2fr_1fr]">
            <div className="stagger-1 animate-fade-in-up space-y-4 leading-relaxed text-muted-foreground opacity-0">
              <p>
                I like building things with unrhythmic keystrokes, occasional caffeine spills, and a
                slight obsession with making machines learn. Scalable systems that don't panic under
                real traffic. AI integrations that try to understand human context. Backends and
                infra that stay boring in a good way.
              </p>
              <p>
                Right now I'm exploring how to make learning models smarter without leaking secrets,
                and keeping microservices breathing steadily under massive spikes. If it's weird,
                genuinely useful, or sounds like a terrible idea at first — I probably want to build
                it.
              </p>
              <div className="pt-2">
                <Button asChild variant="outline" className="font-mono">
                  <Link to="/about">
                    More about me <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              </div>
            </div>
            <div className="stagger-2 grid animate-fade-in-up grid-cols-2 gap-3 opacity-0">
              {[
                { k: "9.13", v: "CGPA" },
                { k: "300+", v: "Coding Club" },
                { k: "15+", v: "Events led" },
                { k: "1000+", v: "Reached" },
              ].map((s) => (
                <div
                  key={s.v}
                  className="rounded-lg border border-border bg-card/60 p-4 text-center transition-all hover:-translate-y-0.5 hover:border-primary/40"
                >
                  <div className="font-mono text-2xl font-bold text-primary">{s.k}</div>
                  <div className="mt-1 text-xs text-muted-foreground">{s.v}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Contact CTA */}
      <section id="contact" className="scroll-mt-16 border-t border-border py-20">
        <div className="container max-w-2xl animate-fade-in-up text-center opacity-0">
          <CodeLabel className="mb-4">Let's build</CodeLabel>
          <h2 className="mb-4 text-3xl font-bold text-foreground md:text-4xl">
            Got something weird, useful, or genuinely hard?
          </h2>
          <p className="mb-8 text-muted-foreground">
            I'm open to internships, research collaborations, and the occasional side project that
            starts as a bad idea and ends up shipping.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Button asChild size="lg" className="font-mono">
              <Link to="/contact">
                Get in touch <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
            <Button asChild size="lg" variant="outline" className="font-mono">
              <a href="/assets/resume.pdf" target="_blank" rel="noreferrer">
                <FileText className="mr-2 h-4 w-4" />
                View Resume
              </a>
            </Button>
          </div>
        </div>
      </section>
    </Layout>
  );
}
