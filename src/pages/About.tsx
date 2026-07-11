import { Layout } from "@/components/layout/Layout";
import { CodeDivider } from "@/components/ui/CodeDivider";
import { TechTag } from "@/components/ui/TechTag";
import { AsciiPortrait } from "@/components/AsciiPortrait";
import { portraitAscii } from "@/data/portraitAscii";
import { BookOpen, Award, School } from "lucide-react";

const skills = {
  languages: ["Python", "C++", "TypeScript", "SQL", "Embedded C"],
  frameworks: [
    "PyTorch",
    "TensorFlow",
    "FastAPI",
    "Node.js",
    "React",
    "Next.js",
    "LangChain",
    "GraphQL",
  ],
  cloud: ["AWS", "GCP", "Kubernetes", "Docker", "GitHub Actions", "Nginx"],
  databases: ["PostgreSQL", "MongoDB", "Redis", "Qdrant", "ChromaDB", "SQLite"],
};

const education = [
  {
    icon: BookOpen,
    title: "BE Computer Science & Engineering (Data Sciences)",
    org: "RV College of Engineering, Bengaluru",
    detail: "CGPA: 9.12 · Sep 2023 – Jul 2027",
  },
  {
    icon: Award,
    title: "Pre-University",
    org: "Narayana PU College",
    detail: "PCMC: 98.75% · 2021 – 2023",
  },
  {
    icon: School,
    title: "School",
    org: "St Paul's High School",
    detail: "Grade: 88.45% · 2011 – 2021",
  },
];

export default function About() {
  return (
    <Layout>
      <section className="py-20">
        <div className="container">
          <div className="max-w-3xl mb-12 opacity-0 animate-fade-in-up">
            <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-4">About</h1>
          </div>

          <div className="grid gap-16 lg:grid-cols-3">
            {/* Main */}
            <div className="lg:col-span-2 space-y-6">
              <div className="opacity-0 animate-fade-in-up stagger-1">
                <p className="text-lg text-foreground leading-relaxed">
                  I'm <span className="text-primary font-medium">Muhammad Umar Yaksambi</span> —
                  CS student at RVCE, currently a CPP-3 intern at{" "}
                  <span className="text-primary">Hewlett Packard Enterprise</span> building an
                  AI-powered defect intelligence system that maps CI/CD failures to Jira issues.
                </p>
              </div>

              <div className="opacity-0 animate-fade-in-up stagger-2">
                <p className="text-muted-foreground leading-relaxed">
                  Before HPE I spent 10 months as a Product Developer Intern at SpikedAI shipping
                  a real-time AI Sales Copilot — FastAPI + Node backend at 500 RPS, RAG pipelines
                  over a 100M+ token knowledge base, and multi-cloud infra across AWS and GCP.
                  Before that, I worked on real-time 3D Gaussian Splatting on mobile at Samsung
                  R&D's PRISM programme.
                </p>
              </div>

              <div className="opacity-0 animate-fade-in-up stagger-3">
                <p className="text-muted-foreground leading-relaxed">
                  I like scalable systems that don't panic when real people actually use them,
                  AI that tries to understand human context, and the occasional rogue Python
                  script. Outside of shipping I'm Vice President of the Coding Club at RVCE,
                  running events for 1,000+ participants and mentoring juniors across dev, AI,
                  and competitive programming.
                </p>
              </div>

              <div className="opacity-0 animate-fade-in-up stagger-4">
                <CodeDivider label="Philosophy" />
              </div>

              <div className="space-y-4 font-mono text-sm opacity-0 animate-fade-in-up stagger-4">
                {[
                  "Build for the messy real world — scale, latency, failure modes",
                  "Prototype fast, then engineer for reliability",
                  "Measure impact, not lines of code",
                  "Ship, document, teach — in that order",
                ].map((line) => (
                  <p
                    key={line}
                    className="text-muted-foreground transition-colors hover:text-foreground"
                  >
                    <span className="text-primary">{"//"}</span> {line}
                  </p>
                ))}
              </div>

              <div className="opacity-0 animate-fade-in-up stagger-4 pt-4">
                <CodeDivider label="Education" />
                <div className="space-y-4">
                  {education.map((e) => (
                    <div
                      key={e.title}
                      className="flex items-start gap-4 p-4 rounded-lg border border-border bg-card/60 hover:border-primary/40 hover:-translate-y-0.5 transition-all"
                    >
                      <e.icon className="w-5 h-5 text-primary mt-1 flex-shrink-0" />
                      <div>
                        <h4 className="text-foreground font-semibold">{e.title}</h4>
                        <p className="text-sm text-muted-foreground">{e.org}</p>
                        <p className="font-mono text-xs text-primary mt-1">{e.detail}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Sidebar */}
            <div className="space-y-8">
              <div className="opacity-0 animate-fade-in-up -mt-6">
                <AsciiPortrait data={portraitAscii} fontSize="8px" className="w-full" />
              </div>

              {[
                { title: "Languages", items: skills.languages },
                { title: "Frameworks", items: skills.frameworks },
                { title: "Cloud & DevOps", items: skills.cloud },
                { title: "Databases", items: skills.databases },
              ].map((group, i) => (
                <div
                  key={group.title}
                  className="opacity-0 animate-fade-in-up"
                  style={{ animationDelay: `${0.15 + i * 0.1}s` }}
                >
                  <h2 className="font-mono text-sm text-primary mb-4">
                    <span className="text-muted-foreground">/*</span> {group.title}{" "}
                    <span className="text-muted-foreground">*/</span>
                  </h2>
                  <div className="flex flex-wrap gap-2">
                    {group.items.map((t) => (
                      <TechTag key={t}>{t}</TechTag>
                    ))}
                  </div>
                </div>
              ))}

              <div className="opacity-0 animate-fade-in-up stagger-4 p-4 rounded-lg border border-border bg-card/60">
                <p className="font-mono text-xs text-primary mb-2">
                  <span className="text-muted-foreground">/*</span> Quick Stats{" "}
                  <span className="text-muted-foreground">*/</span>
                </p>
                <div className="grid grid-cols-2 gap-4 mt-3 text-center">
                  <div>
                    <div className="text-2xl font-bold text-primary font-mono">9.12</div>
                    <div className="text-xs text-muted-foreground">CGPA</div>
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-primary font-mono">500</div>
                    <div className="text-xs text-muted-foreground">RPS @ SpikedAI</div>
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-primary font-mono">4</div>
                    <div className="text-xs text-muted-foreground">Internships</div>
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-primary font-mono">300+</div>
                    <div className="text-xs text-muted-foreground">Club Community</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
}