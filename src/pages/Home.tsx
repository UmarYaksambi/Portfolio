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

export default function Home() {
  return (
    <Layout>
      {/* Hero */}
      <section
        id="hero"
        className="relative min-h-[calc(100vh-4rem)] flex items-center overflow-hidden bg-background scroll-mt-16"
      >
        <CodeSnippetsBackdrop />

        <div className="container relative z-10 py-16">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="opacity-0 animate-fade-in-up order-2 lg:order-1">
              <TerminalHero />

              <div className="grid grid-cols-3 gap-3 mt-6">
                <div className="p-4 rounded-lg border border-border bg-card/60 backdrop-blur-sm hover:border-primary/50 hover:-translate-y-0.5 transition-all">
                  <div className="font-mono text-2xl font-bold text-primary">9.12</div>
                  <div className="text-xs text-muted-foreground font-mono mt-1">CGPA</div>
                </div>
                <div className="p-4 rounded-lg border border-border bg-card/60 backdrop-blur-sm hover:border-primary/50 hover:-translate-y-0.5 transition-all">
                  <div className="font-mono text-2xl font-bold text-primary">500</div>
                  <div className="text-xs text-muted-foreground font-mono mt-1">RPS @ SpikedAI</div>
                </div>
                <div className="p-4 rounded-lg border border-border bg-card/60 backdrop-blur-sm hover:border-primary/50 hover:-translate-y-0.5 transition-all">
                  <div className="font-mono text-2xl font-bold text-primary">4</div>
                  <div className="text-xs text-muted-foreground font-mono mt-1">Internships</div>
                </div>
              </div>
            </div>

            <div className="opacity-0 animate-fade-in-up stagger-1 order-1 lg:order-2">
              <CodeLabel className="mb-6">Backend · ML · Full-Stack Engineer</CodeLabel>

              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-6 leading-tight">
                Hi, I'm <span className="text-primary">Umar</span>.
                <br />
                <span className="text-muted-foreground text-3xl md:text-4xl lg:text-5xl">
                  I build systems that don't panic in production
                </span>
                <span className="animate-blink text-primary ml-1">▍</span>
              </h1>

              <p className="text-base md:text-lg text-muted-foreground mb-8 max-w-xl leading-relaxed">
                CS student at RVCE, currently a CPP-3 intern at{" "}
                <span className="text-primary">Hewlett Packard Enterprise</span> building AI-powered
                defect intelligence. Previously at SpikedAI and Samsung R&D — scalable backends,
                RAG pipelines, and real-time 3D on mobile.
              </p>

              <div className="flex flex-wrap gap-3 mb-8">
                {["Python", "FastAPI", "PyTorch", "React", "AWS"].map((tech) => (
                  <span
                    key={tech}
                    className="px-3 py-1 rounded-full font-mono text-xs bg-secondary border border-border text-muted-foreground hover:border-primary/60 hover:text-primary hover:-translate-y-0.5 transition-all"
                  >
                    {tech}
                  </span>
                ))}
              </div>

              <div className="flex flex-wrap gap-4 mb-8">
                <Button asChild size="lg" className="font-mono transition-transform hover:scale-105">
                  <Link to="/work">
                    View Work
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
                <Button asChild size="lg" variant="outline" className="font-mono hover:border-primary/60 transition-colors">
                  <a href="/assets/resume.pdf" target="_blank" rel="noreferrer">
                    <FileText className="mr-2 h-4 w-4" />
                    Resume
                  </a>
                </Button>
              </div>

              <div className="flex items-center gap-3">
                <a href="mailto:umaryaksambi@gmail.com" aria-label="Email" className="p-2.5 rounded-md border border-border bg-card/60 text-muted-foreground hover:text-primary hover:border-primary/50 hover:-translate-y-0.5 transition-all">
                  <Mail className="w-4 h-4" />
                </a>
                <a href="https://github.com/UmarYaksambi" target="_blank" rel="noreferrer" aria-label="GitHub" className="p-2.5 rounded-md border border-border bg-card/60 text-muted-foreground hover:text-primary hover:border-primary/50 hover:-translate-y-0.5 transition-all">
                  <Github className="w-4 h-4" />
                </a>
                <a href="https://www.linkedin.com/in/umaryaksambi" target="_blank" rel="noreferrer" aria-label="LinkedIn" className="p-2.5 rounded-md border border-border bg-card/60 text-muted-foreground hover:text-primary hover:border-primary/50 hover:-translate-y-0.5 transition-all">
                  <Linkedin className="w-4 h-4" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Work */}
      <section id="work" className="py-20 scroll-mt-16">
        <div className="container">
          <div className="opacity-0 animate-fade-in-up">
            <CodeDivider label="Featured Work" />
          </div>

          <div className="grid gap-6 md:grid-cols-2">
            {featuredProjects.map((project, index) => (
              <div
                key={project.slug}
                className="opacity-0 animate-fade-in-up"
                style={{ animationDelay: `${0.1 + index * 0.08}s` }}
              >
                <ProjectCard {...project} className="hover-lift h-full" />
              </div>
            ))}
          </div>

          <div className="mt-12 text-center opacity-0 animate-fade-in-up stagger-4">
            <Link
              to="/work"
              className="inline-flex items-center font-mono text-sm text-muted-foreground hover:text-primary transition-colors link-underline"
            >
              <span className="text-primary mr-2">{"//"}</span>
              View all projects
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* Experience preview */}
      <section id="experience" className="py-20 border-t border-border scroll-mt-16">
        <div className="container">
          <div className="opacity-0 animate-fade-in-up">
            <CodeDivider label="Currently Shipping" />
          </div>
          <div className="grid gap-4 md:grid-cols-3">
            {timelinePreview.map((e, i) => (
              <article
                key={e.org}
                className="p-6 rounded-lg border border-border bg-card/60 hover:border-primary/40 hover:-translate-y-1 transition-all opacity-0 animate-fade-in-up"
                style={{ animationDelay: `${0.1 + i * 0.1}s` }}
              >
                <e.icon className="w-5 h-5 text-primary mb-3" />
                <h3 className="font-mono text-sm font-semibold text-primary">{e.role}</h3>
                <p className="text-foreground font-medium">{e.org}</p>
                <p className="font-mono text-xs text-muted-foreground mt-1 mb-3">{e.time}</p>
                <p className="text-sm text-muted-foreground leading-relaxed">{e.note}</p>
              </article>
            ))}
          </div>
          <div className="mt-10 text-center opacity-0 animate-fade-in-up stagger-3">
            <Link to="/experience" className="inline-flex items-center font-mono text-sm text-muted-foreground hover:text-primary transition-colors link-underline">
              <span className="text-primary mr-2">{"//"}</span>
              Full experience & certifications
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* About snippet */}
      <section id="about" className="py-20 border-t border-border scroll-mt-16">
        <div className="container">
          <div className="opacity-0 animate-fade-in-up">
            <CodeDivider label="About" />
          </div>
          <div className="grid gap-10 lg:grid-cols-[2fr_1fr]">
            <div className="opacity-0 animate-fade-in-up stagger-1 space-y-4 text-muted-foreground leading-relaxed">
              <p>
                I like building things with unrhythmic keystrokes, occasional caffeine spills,
                and a slight obsession with making machines learn. Scalable systems that don't
                panic under real traffic. AI integrations that try to understand human context.
                Backends and infra that stay boring in a good way.
              </p>
              <p>
                Right now I'm exploring how to make learning models smarter without leaking
                secrets, and keeping microservices breathing steadily under massive spikes. If
                it's weird, genuinely useful, or sounds like a terrible idea at first — I
                probably want to build it.
              </p>
              <div className="pt-2">
                <Button asChild variant="outline" className="font-mono">
                  <Link to="/about">
                    More about me <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-3 opacity-0 animate-fade-in-up stagger-2">
              {[
                { k: "9.12", v: "CGPA" },
                { k: "300+", v: "Coding Club" },
                { k: "15+", v: "Events led" },
                { k: "1000+", v: "Reached" },
              ].map((s) => (
                <div key={s.v} className="p-4 rounded-lg border border-border bg-card/60 text-center hover:border-primary/40 hover:-translate-y-0.5 transition-all">
                  <div className="text-2xl font-bold text-primary font-mono">{s.k}</div>
                  <div className="text-xs text-muted-foreground mt-1">{s.v}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Fun teaser */}
      <section className="py-20 border-t border-border">
        <div className="container">
          <div className="p-8 md:p-12 rounded-2xl border border-primary/30 bg-gradient-to-br from-primary/10 via-card/60 to-transparent relative overflow-hidden opacity-0 animate-fade-in-up">
            <Sparkles className="absolute top-6 right-6 w-8 h-8 text-primary/40 animate-pulse" />
            <p className="font-mono text-xs text-primary mb-3">{"// off the clock"}</p>
            <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-3">
              There's a room in here I don't put on my resume.
            </h2>
            <p className="text-muted-foreground max-w-xl mb-6">
              Konami codes, terminal easter eggs, a matrix rain and things I built purely for
              fun. Take a peek.
            </p>
            <Button asChild className="font-mono">
              <Link to="/fun">
                Enter the fun zone
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Contact CTA */}
      <section id="contact" className="py-20 border-t border-border scroll-mt-16">
        <div className="container text-center max-w-2xl opacity-0 animate-fade-in-up">
          <CodeLabel className="mb-4">Let's build</CodeLabel>
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Got something weird, useful, or genuinely hard?
          </h2>
          <p className="text-muted-foreground mb-8">
            I'm open to internships, research collaborations, and the occasional side project
            that starts as a bad idea and ends up shipping.
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
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
