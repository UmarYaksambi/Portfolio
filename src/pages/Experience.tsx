import { Layout } from "@/components/layout/Layout";
import { CodeDivider } from "@/components/ui/CodeDivider";
import { Brain, Cpu, LaptopMinimal, Award, Users, Trophy, Calendar, MapPin } from "lucide-react";

const experience = [
  {
    role: "Product Developer Intern",
    company: "SpikedAI",
    period: "Jun 2024 – present",
    location: "Palo Alto, CA (Remote)",
    description:
      "Building an AI-powered Sales Copilot that assists sales teams in real time during client interactions, combining live Q&A with contextual insight generation.",
    icon: Brain,
  },
  {
    role: "PRISM Intern",
    company: "Samsung R&D Institute",
    period: "May 2025 – present",
    location: "Bengaluru, KA",
    description:
      "Working on advanced computer graphics techniques including Gaussian splatting for 3D scene rendering and enhancement.",
    icon: LaptopMinimal,
  },
  {
    role: "Project Intern",
    company: "Wirin (Wipro IISc Innovation Network)",
    period: "Apr 2024 – Dec 2024",
    location: "RVCE, Bengaluru, KA",
    description:
      "Developed a cross-platform app for the WiPod autonomous car and contributed to an AI-driven chatbot built on Llama3 60B.",
    icon: Cpu,
  },
];

const certifications = [
  { name: "Data Science for Engineers", org: "NPTEL", achievement: "Gold — Top 5%ile" },
  { name: "Machine Learning Specialization", org: "Stanford & DeepLearning.AI", achievement: "Completed" },
  { name: "CS50X", org: "Harvard University", achievement: "Completed" },
];

const societies = [
  {
    icon: Users,
    role: "Jr Core Member",
    org: "The Coding Club of RVCE",
    period: "Feb 2025 – present",
    description:
      "Organizing coding events and workshops, mentoring juniors in C++, Python, and ML. Ran workshops on APIs, LLMs, and competitive programming.",
  },
  {
    icon: Trophy,
    role: "Club Representative",
    org: "Rotaract Club of RVCE",
    period: "Oct 2023 – present",
    description:
      "Coordinated initiatives like the Alzheimer's Awareness Walkathon and Fistful food distribution project.",
  },
];

export default function Experience() {
  return (
    <Layout>
      <section className="py-20">
        <div className="container">
          <div className="max-w-2xl mb-12 opacity-0 animate-fade-in-up">
            <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              Experience
            </h1>
            <p className="text-muted-foreground leading-relaxed">
              Internships, research, certifications, and community work. A running log of
              where I've been shipping and learning.
            </p>
          </div>

          {/* Experience Timeline */}
          <div className="opacity-0 animate-fade-in-up stagger-1">
            <CodeDivider label="Work" />
          </div>
          <div className="space-y-6 mb-16">
            {experience.map((exp) => (
              <article
                key={exp.company}
                className="p-6 rounded-lg border border-border bg-card/60 hover:border-primary/40 transition-colors"
              >
                <div className="flex items-start gap-5">
                  <div className="flex-shrink-0 w-12 h-12 rounded-md border border-primary/30 bg-primary/10 flex items-center justify-center">
                    <exp.icon className="w-5 h-5 text-primary" />
                  </div>
                  <div className="flex-1">
                    <div className="flex flex-col md:flex-row md:items-baseline md:justify-between gap-2 mb-2">
                      <div>
                        <h3 className="font-mono text-base font-semibold text-primary">
                          {exp.role}
                        </h3>
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
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      {exp.description}
                    </p>
                  </div>
                </div>
              </article>
            ))}
          </div>

          {/* Certifications */}
          <div className="opacity-0 animate-fade-in-up stagger-1">
            <CodeDivider label="Certifications" />
          </div>
          <div className="grid gap-4 md:grid-cols-3 mb-16">
            {certifications.map((c) => (
              <div
                key={c.name}
                className="p-5 rounded-lg border border-border bg-card/60 hover:border-primary/40 transition-colors"
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

          {/* Societies */}
          <div className="opacity-0 animate-fade-in-up stagger-1">
            <CodeDivider label="Leadership & Societies" />
          </div>
          <div className="grid gap-6 md:grid-cols-2">
            {societies.map((s) => (
              <article
                key={s.org}
                className="p-6 rounded-lg border border-border bg-card/60 hover:border-primary/40 transition-colors"
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
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {s.description}
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>
    </Layout>
  );
}
