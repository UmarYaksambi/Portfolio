import { useState } from "react";
import { Layout } from "@/components/layout/Layout";
import { CodeDivider } from "@/components/ui/CodeDivider";
import DecryptedText from "@/components/DecryptedText";
import {
  Brain,
  Cpu,
  LaptopMinimal,
  Award,
  Users,
  Trophy,
  Calendar,
  MapPin,
  ChevronDown,
  Server,
} from "lucide-react";
import { cn } from "@/lib/utils";

const experience = [
  {
    role: "CPP-3 Intern",
    company: "Hewlett Packard Enterprise",
    period: "Mar 2026 – Present",
    location: "Remote",
    summary:
      "Building an AI-powered defect intelligence system that maps CI/CD pipeline failures to historical Jira issues.",
    icon: Server,
    highlights: [
      "Hybrid defect-mapping engine — 50/50 lexical + semantic scoring using BAAI/bge-small-en-v1.5 embeddings",
      "0.90 cosine-similarity duplicate-detection layer within 7-day proximity windows",
      "SQLite WAL + 32MB cache tuning to eliminate dashboard lockups under concurrent pipeline ingestion",
      "Fault-tolerant Atlassian REST integration with idempotent writes + exponential backoff",
    ],
  },
  {
    role: "Product Developer Intern",
    company: "SpikedAI",
    period: "Jun 2025 – Mar 2026",
    location: "Bengaluru, KA",
    summary:
      "Architected the backend and AI pipelines for an AI Sales Copilot delivering real-time meeting intelligence.",
    icon: Brain,
    highlights: [
      "Event-driven FastAPI + Node.js services sustaining 500 RPS / 500+ concurrent users",
      "RAG + GraphQL pipeline with 750ms end-to-end response over a 100M+ token knowledge base",
      "Multi-cloud (AWS + GCP) infra with GitHub Actions CI/CD and Nginx load balancing — 99.9% uptime",
      "React + TypeScript + Tailwind UIs with Redis caching for live transcript-driven insights",
    ],
  },
  {
    role: "PRISM Research Intern",
    company: "Samsung R&D Institute",
    period: "May 2025 – Jan 2026",
    location: "Bengaluru, KA",
    summary:
      "Built a real-time mobile 3D Gaussian Splatting viewer for large-scale scenes with dynamic lighting.",
    icon: LaptopMinimal,
    highlights: [
      "Real-time volumetric rendering pipeline on the Filament engine",
      "30 FPS @ 1080p on Dimensity 9000 mobile hardware",
      "Rendered 3M+ Gaussian scenes via optimised spherical harmonics + material compilation",
      "Replaced heavy ray-marching with a 3D Gaussian Splatting approach",
    ],
  },
  {
    role: "Project Intern",
    company: "Wirin (Wipro – IISc Innovation Network)",
    period: "Apr 2024 – Oct 2024",
    location: "RVCE, Bengaluru, KA",
    summary:
      "Contributed to the WiPod autonomous vehicle platform — dashboard app plus an AI-powered assistant.",
    icon: Cpu,
    highlights: [
      "Designed wireframes and user flows for the WiPod vehicle dashboard",
      "Built the cross-platform dashboard app in Flutter",
      "Contributed to an AI chatbot on Llama 3 70B for in-vehicle assistance",
    ],
  },
];

const certifications = [
  { name: "Data Science for Engineers", org: "NPTEL", achievement: "Gold — Top 5%ile" },
  { name: "Machine Learning Specialization", org: "Stanford & DeepLearning.AI", achievement: "Completed" },
  { name: "CS50x", org: "Harvard University", achievement: "Completed" },
  { name: "AWS Academy — Data Engineering", org: "AWS Academy", achievement: "Graduate" },
];

const societies = [
  {
    icon: Trophy,
    role: "Vice President",
    org: "The Coding Club of RVCE",
    period: "Oct 2025 – Present",
    description:
      "Leading a 300+ member community. Organising 15+ technical events including hackathons, workshops, and coding competitions reaching 1,000+ participants. Working with faculty and industry partners to grow the campus dev community.",
  },
  {
    icon: Users,
    role: "Junior Core Member",
    org: "The Coding Club of RVCE",
    period: "Feb 2025 – Oct 2025",
    description:
      "Ran GenAI + ML workshops reaching 400+ students, led a national-level 24-hour hackathon at RVCE, and mentored juniors in C++, Python, and ML.",
  },
];

function ExperienceCard({
  exp,
  defaultOpen,
}: {
  exp: (typeof experience)[number];
  defaultOpen?: boolean;
}) {
  const [open, setOpen] = useState(defaultOpen ?? false);
  const Icon = exp.icon;
  return (
    <article
      className={cn(
        "rounded-lg border border-border bg-card/60 transition-all",
        open ? "border-primary/40 shadow-[0_0_24px_hsl(var(--primary)/0.08)]" : "hover:border-primary/40"
      )}
    >
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        className="w-full text-left p-6 flex items-start gap-5"
      >
        <div className="flex-shrink-0 w-12 h-12 rounded-md border border-primary/30 bg-primary/10 flex items-center justify-center">
          <Icon className="w-5 h-5 text-primary" />
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex flex-col md:flex-row md:items-baseline md:justify-between gap-2 mb-2">
            <div>
              <h3 className="font-mono text-base font-semibold text-primary">{exp.role}</h3>
              <p className="text-foreground font-medium">{exp.company}</p>
            </div>
            <div className="flex flex-col md:items-end gap-1 font-mono text-xs text-muted-foreground">
              <span className="inline-flex items-center gap-1.5">
                <Calendar className="w-3.5 h-3.5" />
                {exp.period}
              </span>
              <span className="inline-flex items-center gap-1.5">
                <MapPin className="w-3.5 h-3.5" />
                {exp.location}
              </span>
            </div>
          </div>
          <p className="text-sm text-muted-foreground leading-relaxed">{exp.summary}</p>
        </div>
        <ChevronDown
          className={cn(
            "w-5 h-5 text-muted-foreground flex-shrink-0 mt-1 transition-transform duration-300",
            open && "rotate-180 text-primary"
          )}
        />
      </button>
      <div
        className={cn(
          "grid transition-all duration-300 ease-out",
          open ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
        )}
      >
        <div className="overflow-hidden">
          <div className="px-6 pb-6 pl-[92px]">
            <div className="border-t border-border pt-4">
              <p className="font-mono text-xs text-primary mb-3">
                <span className="text-muted-foreground">/*</span> Highlights{" "}
                <span className="text-muted-foreground">*/</span>
              </p>
              <ul className="space-y-2">
                {exp.highlights.map((h) => (
                  <li key={h} className="flex items-start gap-3 text-sm text-muted-foreground">
                    <span className="font-mono text-primary mt-0.5">→</span>
                    <span>{h}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </article>
  );
}

export default function Experience() {
  return (
    <Layout>
      <section className="py-20">
        <div className="container">
          <div className="max-w-2xl mb-12 opacity-0 animate-fade-in-up">
            <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-4">Experience</h1>
            <p className="text-muted-foreground leading-relaxed">
              Internships, research, certifications, and community work. Tap any card to
              expand highlights.
            </p>
          </div>

          <div className="opacity-0 animate-fade-in-up stagger-1">
            <CodeDivider label="Work" />
          </div>
          <div className="space-y-4 mb-16">
            {experience.map((exp, i) => (
              <div
                key={exp.company + exp.role}
                className="opacity-0 animate-fade-in-up"
                style={{ animationDelay: `${0.1 + i * 0.08}s` }}
              >
                <ExperienceCard exp={exp} defaultOpen={i === 0} />
              </div>
            ))}
          </div>

          <div className="opacity-0 animate-fade-in-up stagger-1">
            <CodeDivider label="Certifications" />
          </div>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4 mb-16">
            {certifications.map((c, i) => (
              <div
                key={c.name}
                className="p-5 rounded-lg border border-border bg-card/60 hover:border-primary/40 hover:-translate-y-1 transition-all opacity-0 animate-fade-in-up"
                style={{ animationDelay: `${0.1 + i * 0.08}s` }}
              >
                <Award className="w-5 h-5 text-primary mb-3" />
                <h4 className="text-foreground font-semibold mb-1">{c.name}</h4>
                <p className="text-sm text-muted-foreground mb-2">{c.org}</p>
                <p className="font-mono text-xs text-primary">
                  <span className="text-muted-foreground">{"//"}</span> {c.achievement}
                </p>
              </div>
            ))}
          </div>

          <div className="opacity-0 animate-fade-in-up stagger-1">
            <CodeDivider label="Leadership & Societies" />
          </div>
          <div className="grid gap-6 md:grid-cols-2">
            {societies.map((s, i) => (
              <article
                key={s.role + s.period}
                className="p-6 rounded-lg border border-border bg-card/60 hover:border-primary/40 transition-colors opacity-0 animate-fade-in-up"
                style={{ animationDelay: `${0.1 + i * 0.1}s` }}
              >
                <div className="flex items-start justify-between mb-3">
                  <div className="flex items-center gap-3">
                    <s.icon className="w-5 h-5 text-primary" />
                    <div>
                      <h4 className="font-mono text-sm font-semibold text-primary">{s.role}</h4>
                      <p className="text-foreground">{s.org}</p>
                    </div>
                  </div>
                  <span className="font-mono text-xs text-muted-foreground inline-flex items-center gap-1.5 whitespace-nowrap">
                    <Calendar className="w-3.5 h-3.5" />
                    {s.period}
                  </span>
                </div>
                <p className="text-sm text-muted-foreground leading-relaxed">{s.description}</p>
              </article>
            ))}
          </div>
        </div>
      </section>
    </Layout>
  );
}
