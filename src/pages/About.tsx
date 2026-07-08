import { Layout } from "@/components/layout/Layout";
import { CodeDivider } from "@/components/ui/CodeDivider";
import { TechTag } from "@/components/ui/TechTag";
import { BookOpen, Award, School } from "lucide-react";

const skills = {
  languages: ["Python", "C++", "Embedded C", "SQL", "JavaScript", "TypeScript", "R"],
  frameworks: [
    "TensorFlow",
    "PyTorch",
    "LangChain",
    "OpenCV",
    "YOLO",
    "FastAPI",
    "Flask",
    "Flutter",
    "React",
  ],
  tools: [
    "Git",
    "GitHub",
    "Supabase",
    "Firebase",
    "Android Studio",
    "Linux",
    "Figma",
    "Docker",
  ],
};

const education = [
  {
    icon: BookOpen,
    title: "BE Computer Science & Engineering (Data Sciences)",
    org: "RV College of Engineering, Bengaluru",
    detail: "CGPA: 9.12 · Expected Sep 2027",
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
    detail: "Grade: 88.45% · 2010 – 2021",
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
                  I'm <span className="text-primary font-medium">Muhammad Umar Yaksambi</span>, a
                  Computer Science student at RV College of Engineering, focused on machine
                  learning, autonomous systems, and building things that ship. Currently maintaining
                  a 9.12 CGPA while working on Gaussian splatting research at Samsung R&D and an AI
                  sales copilot at SpikedAI.
                </p>
              </div>

              <div className="opacity-0 animate-fade-in-up stagger-2">
                <p className="text-muted-foreground leading-relaxed">
                  My work spans federated learning, embedded IoT mesh networks, computer vision,
                  and full-stack product engineering. I care about systems that hold up under real
                  constraints — privacy, low power, unreliable networks — not just demo-friendly
                  models.
                </p>
              </div>

              <div className="opacity-0 animate-fade-in-up stagger-3">
                <p className="text-muted-foreground leading-relaxed">
                  Outside of shipping code, I mentor juniors at the RVCE Coding Club, run
                  workshops on APIs, LLMs, and competitive programming, and coordinate community
                  initiatives with the Rotaract Club.
                </p>
              </div>

              <div className="opacity-0 animate-fade-in-up stagger-4">
                <CodeDivider label="Philosophy" />
              </div>

              <div className="space-y-4 font-mono text-sm opacity-0 animate-fade-in-up stagger-4">
                {[
                  "Build for constraints — privacy, latency, power",
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
                      className="flex items-start gap-4 p-4 rounded-lg border border-border bg-card/60 hover:border-primary/40 transition-colors"
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
              <div className="opacity-0 animate-fade-in-up stagger-2">
                <h2 className="font-mono text-sm text-primary mb-4">
                  <span className="text-muted-foreground">/*</span> Languages{" "}
                  <span className="text-muted-foreground">*/</span>
                </h2>
                <div className="flex flex-wrap gap-2">
                  {skills.languages.map((t) => (
                    <TechTag key={t}>{t}</TechTag>
                  ))}
                </div>
              </div>

              <div className="opacity-0 animate-fade-in-up stagger-3">
                <h2 className="font-mono text-sm text-primary mb-4">
                  <span className="text-muted-foreground">/*</span> Frameworks{" "}
                  <span className="text-muted-foreground">*/</span>
                </h2>
                <div className="flex flex-wrap gap-2">
                  {skills.frameworks.map((t) => (
                    <TechTag key={t}>{t}</TechTag>
                  ))}
                </div>
              </div>

              <div className="opacity-0 animate-fade-in-up stagger-4">
                <h2 className="font-mono text-sm text-primary mb-4">
                  <span className="text-muted-foreground">/*</span> Tools{" "}
                  <span className="text-muted-foreground">*/</span>
                </h2>
                <div className="flex flex-wrap gap-2">
                  {skills.tools.map((t) => (
                    <TechTag key={t}>{t}</TechTag>
                  ))}
                </div>
              </div>

              <div className="opacity-0 animate-fade-in-up stagger-4 p-4 rounded-lg border border-border bg-card/60">
                <p className="font-mono text-xs text-primary mb-2">
                  <span className="text-muted-foreground">/*</span> Quick Stats{" "}
                  <span className="text-muted-foreground">*/</span>
                </p>
                <div className="grid grid-cols-2 gap-4 mt-3 text-center">
                  <div>
                    <div className="text-2xl font-bold text-primary font-mono">15+</div>
                    <div className="text-xs text-muted-foreground">Projects</div>
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-primary font-mono">3</div>
                    <div className="text-xs text-muted-foreground">Internships</div>
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-primary font-mono">3</div>
                    <div className="text-xs text-muted-foreground">Certifications</div>
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-primary font-mono">Top 5%</div>
                    <div className="text-xs text-muted-foreground">NPTEL Rank</div>
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
