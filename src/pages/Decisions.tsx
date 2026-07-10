import { useState } from "react";
import { Layout } from "@/components/layout/Layout";
import { CodeDivider } from "@/components/ui/CodeDivider";
import { CodeLabel } from "@/components/ui/CodeLabel";
import { ChevronDown } from "lucide-react";

type ADRStatus = "Accepted" | "Superseded" | "Deprecated" | "Proposed";

const STATUS_STYLE: Record<ADRStatus, string> = {
  Accepted: "text-primary border-primary/30 bg-primary/10",
  Superseded: "text-yellow-500 border-yellow-500/30 bg-yellow-500/10",
  Deprecated: "text-muted-foreground border-border bg-secondary/40",
  Proposed: "text-blue-400 border-blue-400/30 bg-blue-400/10",
};

interface ADR {
  id: string;
  title: string;
  status: ADRStatus;
  date: string;
  context: string;
  decision: string;
  consequences: string;
}

const ADRS: ADR[] = [
  {
    id: "ADR-001",
    title: "Choose RVCE for undergrad",
    status: "Accepted",
    date: "2022-06",
    context:
      "Needed a CS program with strong industry placements, a real research culture, and a campus I could actually picture surviving four years in.",
    decision:
      "Enrolled in Computer Science and Engineering (Data Sciences) at RV College of Engineering, Bengaluru.",
    consequences:
      "Gained access to internships at HPE, SpikedAI, and Samsung R&D, plus a coding club to run. Tradeoff: Bengaluru traffic is now a permanent character in my life.",
  },
  {
    id: "ADR-002",
    title: "FastAPI over Flask for backend services",
    status: "Accepted",
    date: "2025-01",
    context:
      "Needed async support, automatic OpenAPI docs, and Pydantic validation without hand-rolling boilerplate for every new service.",
    decision: "Standardized on FastAPI for backend APIs and internal tooling going forward.",
    consequences:
      "Faster iteration and self-documenting endpoints. Tradeoff: occasionally fighting Pydantic's opinions on what a valid float is.",
  },
  {
    id: "ADR-003",
    title: "Keep using Vim keybindings, badly",
    status: "Accepted",
    date: "2023-09",
    context:
      "Watched a senior engineer edit a file at incomprehensible speed and decided that could be me, actually.",
    decision:
      "Committed to Vim motions in every editor, despite a measurable and ongoing decline in typing speed.",
    consequences:
      "Can technically delete a paragraph in four keystrokes. Also still occasionally opens a file and just... types ':wq' into the document itself.",
  },
  {
    id: "ADR-004",
    title: "Build a terminal-themed portfolio instead of a template",
    status: "Accepted",
    date: "2026-05",
    context:
      "Every portfolio template starts to look the same after the tenth recruiter tab. Wanted something that signaled 'this person actually likes building things' on first glance.",
    decision:
      "Built a custom React/TypeScript site with a terminal hero, Matrix rain, Konami code, and a live status page for good measure.",
    consequences:
      "Higher build cost up front, but memorable in a stack of identical resumes. Risk: recruiters may now expect every future project to have an easter egg.",
  },
  {
    id: "ADR-005",
    title: "Use TypeScript over plain JavaScript",
    status: "Accepted",
    date: "2024-03",
    context:
      "Kept shipping bugs that a type checker would have caught in under a second, and kept promising to 'be more careful' instead of fixing the actual problem.",
    decision: "Migrated all new frontend and Node projects to TypeScript by default.",
    consequences:
      "Fewer 3AM 'undefined is not a function' incidents. Tradeoff: occasionally spends 20 minutes satisfying a generic type instead of just writing the feature.",
  },
  {
    id: "ADR-006",
    title: "Optimize for internships over a fifth side-project",
    status: "Superseded",
    date: "2024-11",
    context:
      "Had four half-finished side projects and zero real production experience. Something had to give.",
    decision:
      "Prioritized internship applications (HPE, SpikedAI, Samsung R&D) over starting new personal projects for a full year.",
    consequences:
      "Landed three internships back to back and learned more about production systems than any tutorial could teach. Superseded once placement season shifted focus back to research output.",
  },
];

function ADRCard({ adr, index }: { adr: ADR; index: number }) {
  const [open, setOpen] = useState(index === 0);

  return (
    <div
      className="rounded-lg border border-border bg-card/60 overflow-hidden opacity-0 animate-fade-in-up"
      style={{ animationDelay: `${0.05 + index * 0.07}s` }}
    >
      <button
        onClick={() => setOpen((v) => !v)}
        className="w-full flex items-center justify-between gap-4 px-5 py-4 text-left hover:bg-secondary/30 transition-colors"
      >
        <div className="flex items-center gap-3 min-w-0">
          <span className="font-mono text-xs text-primary shrink-0">{adr.id}</span>
          <span className="font-medium text-foreground truncate">{adr.title}</span>
        </div>
        <div className="flex items-center gap-3 shrink-0">
          <span
            className={`text-xs font-mono px-2 py-0.5 rounded-full border ${STATUS_STYLE[adr.status]}`}
          >
            {adr.status}
          </span>
          <ChevronDown
            className={`w-4 h-4 text-muted-foreground transition-transform ${
              open ? "rotate-180" : ""
            }`}
          />
        </div>
      </button>

      {open && (
        <div className="px-5 pb-5 pt-1 space-y-3 border-t border-border">
          <p className="font-mono text-xs text-muted-foreground mt-3">{adr.date}</p>
          <div>
            <p className="font-mono text-xs text-primary mb-1">Context</p>
            <p className="text-sm text-muted-foreground leading-relaxed">{adr.context}</p>
          </div>
          <div>
            <p className="font-mono text-xs text-primary mb-1">Decision</p>
            <p className="text-sm text-muted-foreground leading-relaxed">{adr.decision}</p>
          </div>
          <div>
            <p className="font-mono text-xs text-primary mb-1">Consequences</p>
            <p className="text-sm text-muted-foreground leading-relaxed">{adr.consequences}</p>
          </div>
        </div>
      )}
    </div>
  );
}

export default function Decisions() {
  return (
    <Layout>
      <section className="py-20">
        <div className="container max-w-3xl">
          <div className="opacity-0 animate-fade-in-up">
            <CodeLabel className="mb-4">/decisions</CodeLabel>
            <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-3">
              Architecture Decision Records, for a life.
            </h1>
            <p className="text-muted-foreground mb-10">
              The big decisions, documented the way I'd document a system design choice —
              context, decision, consequences. No regrets section because that's what
              "Superseded" is for.
            </p>
          </div>

          <div className="opacity-0 animate-fade-in-up">
            <CodeDivider label={`${ADRS.length} records`} />
          </div>

          <div className="space-y-3">
            {ADRS.map((adr, i) => (
              <ADRCard adr={adr} index={i} key={adr.id} />
            ))}
          </div>
        </div>
      </section>
    </Layout>
  );
}