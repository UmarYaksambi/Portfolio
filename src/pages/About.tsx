import { Layout } from "@/components/layout/Layout";
import { CodeDivider } from "@/components/ui/CodeDivider";
import { TechTag } from "@/components/ui/TechTag";
import { AsciiPortrait } from "@/components/AsciiPortrait";
import { portraitAscii } from "@/data/portraitAscii";
import { BookOpen, Award, School } from "lucide-react";
import DecryptedText from "@/components/DecryptedText";

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
    detail: "CGPA: 9.13 · Sep 2023 – Jul 2027",
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
          <div className="mb-12 max-w-3xl animate-fade-in-up opacity-0">
            <h1 className="mb-4 text-3xl font-bold text-foreground md:text-4xl">
              <DecryptedText text="About" animateOn="view" sequential speed={60} />
            </h1>
          </div>

          <div className="grid gap-16 lg:grid-cols-3">
            {/* Main */}
            <div className="space-y-6 lg:col-span-2">
              <div className="stagger-1 animate-fade-in-up opacity-0">
                <p className="text-lg leading-relaxed text-foreground">
                  I'm <span className="font-medium text-primary">Muhammad Umar Yaksambi</span> — CS
                  student at RVCE, currently a CPP-3 intern at{" "}
                  <span className="text-primary">Hewlett Packard Enterprise</span> building an
                  AI-powered defect intelligence system that maps CI/CD failures to Jira issues.
                </p>
              </div>

              <div className="stagger-2 animate-fade-in-up opacity-0">
                <p className="leading-relaxed text-muted-foreground">
                  Before HPE I spent 10 months as a Product Developer Intern at SpikedAI shipping a
                  real-time AI Sales Copilot — FastAPI + Node backend at 500 RPS, RAG pipelines over
                  a 100M+ token knowledge base, and multi-cloud infra across AWS and GCP. Before
                  that, I worked on real-time 3D Gaussian Splatting on mobile at Samsung R&D's PRISM
                  programme.
                </p>
              </div>

              <div className="stagger-3 animate-fade-in-up opacity-0">
                <p className="leading-relaxed text-muted-foreground">
                  I like scalable systems that don't panic when real people actually use them, AI
                  that tries to understand human context, and the occasional rogue Python script.
                  Outside of shipping I'm Vice President of the Coding Club at RVCE, running events
                  for 1,000+ participants and mentoring juniors across dev, AI, and competitive
                  programming.
                </p>
              </div>

              <div className="stagger-4 animate-fade-in-up opacity-0">
                <CodeDivider label="Philosophy" />
              </div>

              <div className="stagger-4 animate-fade-in-up space-y-4 font-mono text-sm opacity-0">
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

              <div className="stagger-4 animate-fade-in-up pt-4 opacity-0">
                <CodeDivider label="Education" />
                <div className="space-y-4">
                  {education.map((e) => (
                    <div
                      key={e.title}
                      className="flex items-start gap-4 rounded-lg border border-border bg-card/60 p-4 transition-all hover:-translate-y-0.5 hover:border-primary/40"
                    >
                      <e.icon className="mt-1 h-5 w-5 flex-shrink-0 text-primary" />
                      <div>
                        <h4 className="font-semibold text-foreground">{e.title}</h4>
                        <p className="text-sm text-muted-foreground">{e.org}</p>
                        <p className="mt-1 font-mono text-xs text-primary">{e.detail}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Sidebar */}
            <div className="space-y-8">
              {/* <div className="-mt-6 animate-fade-in-up opacity-0">
                <AsciiPortrait data={portraitAscii} fontSize="8px" className="w-full" />
              </div> */}

              {[
                { title: "Languages", items: skills.languages },
                { title: "Frameworks", items: skills.frameworks },
                { title: "Cloud & DevOps", items: skills.cloud },
                { title: "Databases", items: skills.databases },
              ].map((group, i) => (
                <div
                  key={group.title}
                  className="animate-fade-in-up opacity-0"
                  style={{ animationDelay: `${0.15 + i * 0.1}s` }}
                >
                  <h2 className="mb-4 font-mono text-sm text-primary">
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

              <div className="stagger-4 animate-fade-in-up rounded-lg border border-border bg-card/60 p-4 opacity-0">
                <p className="mb-2 font-mono text-xs text-primary">
                  <span className="text-muted-foreground">/*</span> Quick Stats{" "}
                  <span className="text-muted-foreground">*/</span>
                </p>
                <div className="mt-3 grid grid-cols-2 gap-4 text-center">
                  <div>
                    <div className="font-mono text-2xl font-bold text-primary">9.13</div>
                    <div className="text-xs text-muted-foreground">CGPA</div>
                  </div>
                  <div>
                    <div className="font-mono text-2xl font-bold text-primary">500</div>
                    <div className="text-xs text-muted-foreground">RPS @ SpikedAI</div>
                  </div>
                  <div>
                    <div className="font-mono text-2xl font-bold text-primary">4</div>
                    <div className="text-xs text-muted-foreground">Internships</div>
                  </div>
                  <div>
                    <div className="font-mono text-2xl font-bold text-primary">300+</div>
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
