import { Layout } from "@/components/layout/Layout";
import { CodeLabel } from "@/components/ui/CodeLabel";
import { Server, BookOpen, GraduationCap, Music2, Target } from "lucide-react";

const LAST_UPDATED = "July 2026";

const SECTIONS = [
  {
    icon: Server,
    label: "Working on",
    items: [
      "CPP-3 internship at HPE — AI-powered defect intelligence, routing CI failures to Jira via hybrid lexical + semantic retrieval.",
      "ColdVault — a decentralized file-sharing system with ML-driven cryptography and blockchain access control, targeting IEEE CSITSS.",
      "Rebuilding this portfolio site, one terminal-themed easter egg at a time.",
    ],
  },
  {
    icon: GraduationCap,
    label: "Researching",
    items: [
      "A watermarking pipeline for AI-generated images — DCT-domain QIM, adaptive Reed-Solomon ECC, Fourier-Mellin sync tones — aiming for a Q1/Q2 journal.",
      "A dual-domain adversarial robust watermarking framework (DD-ARW) for generative AI copyright attribution.",
    ],
  },
  {
    icon: BookOpen,
    label: "Reading",
    items: [
      "Designing Data-Intensive Applications — again, because it keeps being relevant.",
      "Whatever paper got linked in the last research group Slack thread.",
    ],
  },
  {
    icon: Target,
    label: "Learning",
    items: [
      "Getting faster at reading unfamiliar codebases under interview pressure.",
      "Distributed systems failure modes — the ones that only show up past 500 RPS.",
    ],
  },
  {
    icon: Music2,
    label: "On repeat",
    items: ["Whatever survives three consecutive 'skip' presses at 1AM."],
  },
];

export default function Now() {
  return (
    <Layout>
      <section className="py-20 min-h-[70vh]">
        <div className="container max-w-2xl">
          <div className="opacity-0 animate-fade-in-up">
            <CodeLabel className="mb-4">/now</CodeLabel>
            <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-2">
              What I'm doing right now.
            </h1>
            <p className="font-mono text-xs text-muted-foreground mb-10">
              Last updated: {LAST_UPDATED} —{" "}
              <a
                href="https://nownownow.com/about"
                target="_blank"
                rel="noreferrer"
                className="text-primary hover:underline"
              >
                what's a now page?
              </a>
            </p>
          </div>

          <div className="space-y-10">
            {SECTIONS.map((s, i) => (
              <div
                key={s.label}
                className="opacity-0 animate-fade-in-up"
                style={{ animationDelay: `${0.08 + i * 0.08}s` }}
              >
                <div className="flex items-center gap-2 mb-3">
                  <s.icon className="w-4 h-4 text-primary" />
                  <h2 className="font-mono text-sm font-semibold text-primary uppercase tracking-wide">
                    {s.label}
                  </h2>
                </div>
                <ul className="space-y-2 pl-6 border-l border-border">
                  {s.items.map((item) => (
                    <li key={item} className="text-muted-foreground leading-relaxed pl-2 -ml-px">
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          <p className="mt-14 text-xs text-muted-foreground font-mono opacity-0 animate-fade-in-up stagger-4">
            {"// this page changes more often than my resume does."}
          </p>
        </div>
      </section>
    </Layout>
  );
}