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
      "Every senior swore campus culture mattered more than ranking. Also needed a place that wouldn't make me question my life choices before 9AM lectures even started.",
    decision:
      "Enrolled in CSE (Data Sciences) at RV College of Engineering, Bengaluru. Committed to the bit for four years.",
    consequences:
      "Landed internships at HPE, SpikedAI, and Samsung R&D. Also landed in Bengaluru traffic, which now has emotional damage rights over every morning of my life.",
  },
  {
    id: "ADR-002",
    title: "Amendment: the real reason I 'chose' RVCE",
    status: "Accepted",
    date: "2022-07",
    context:
      "Applied to every IIT and NIT on the list like a good pre-engineer. The results came back and gently, firmly disagreed.",
    decision:
      "Ended up at RVCE. Have since rebranded this as 'strategic' in literally every interview since.",
    consequences:
      "Nobody's called the bluff yet. Also, turns out RVCE was genuinely great, so the cope required zero maintenance.",
  },
  {
    id: "ADR-003",
    title: "FastAPI over any other backend framework",
    status: "Accepted",
    date: "2025-01",
    context:
      "Tired of re-litigating Flask vs. Django vs. Express like a group project nobody asked for, every single time a new repo got created.",
    decision: "FastAPI. Always. No further discussion accepted at standup.",
    consequences:
      "Faster iteration, self-documenting endpoints, and a permanent argument-ender. Tradeoff: Pydantic occasionally acts like it personally knows what counts as a valid float.",
  },
  {
    id: "ADR-004",
    title: "Build a terminal-themed portfolio instead of a template",
    status: "Accepted",
    date: "2026-05",
    context:
      "Every portfolio template looks like it was built by the same guy in 2019. Needed mine to at least pretend otherwise.",
    decision:
      "Built a custom site with a terminal hero, Matrix rain, a Konami code, and a fake status page nobody asked for but everybody clicks.",
    consequences:
      "Recruiters actually remember it. Also now under permanent, self-imposed pressure to ship an easter egg with every future project or it'll feel like a regression.",
  },
  {
    id: "ADR-005",
    title: "Slice over any other UPI app",
    status: "Accepted",
    date: "2025-08",
    context:
      "Was running four separate apps for UPI, credit, and FDs — each one somehow uglier than the last, each demanding its own login ritual.",
    decision:
      "Switched to Slice. Clean UI, actual Gen-Z-brained design sense, and it quietly does everything the other four apps did combined.",
    consequences:
      "One login instead of four. Unreasonably likely to bring up its onboarding flow in conversations that have nothing to do with banking — this document being Exhibit A.",
  },
  {
    id: "ADR-006",
    title: "Arc + Brave as the daily browser stack",
    status: "Accepted",
    date: "2025-04",
    context:
      "No single browser does both 'organize 40 tabs into Spaces without a breakdown' and 'don't let every ad network fingerprint me into oblivion.'",
    decision:
      "Arc for daily driving — Spaces, aesthetics, general vibes. Brave for dev — because it is, obviously, brave enough to survive localhost.",
    consequences:
      "Two browsers open at all times, RAM usage be damned. Consolidating into one was considered for about four seconds and rejected.",
  },
  {
    id: "ADR-007",
    title: "WSL over a native Linux distro",
    status: "Accepted",
    date: "2024-06",
    context:
      "Wanted real Linux tooling. Also refuse to give up the Windows UI I grew up on — despite hating the actual machine it's bolted to with my whole chest.",
    decision: "WSL. Unpopular opinion. Not backing down. Fight me in the comments.",
    consequences:
      "Best of both worlds, mostly — minus the part where the underlying hardware still personally offends me on a daily basis. Funding the actual fix: buymeacoffee.com/UmarYaksambi, unofficially a MacBook fund.",
  },
  {
    id: "ADR-008",
    title: "Coding Club over other CS technical clubs",
    status: "Accepted",
    date: "2024-08",
    context: "Are you kidding me. Next.",
    decision: "Coding Club. Became Vice President. Every other technical club can fight for scraps.",
    consequences: "Zero regrets. This entry took longer to format than the actual decision took to make.",
  },
  {
    id: "ADR-009",
    title: "Primary sidebar on the right in VS Code",
    status: "Accepted",
    date: "2023-11",
    context:
      "Every time the file explorer toggles, the whole editor viewport lurches sideways like it's dodging a punch. Unacceptable mid-debug.",
    decision:
      "Moved the primary sidebar to the right. Code stays exactly where it is. The file tree can do gymnastics over there instead.",
    consequences:
      "Breaks every pair-programming session for the first five confused minutes. Worth it. Every time. No notes.",
  },
  {
    id: "ADR-010",
    title: "C++ over Java",
    status: "Accepted",
    date: "2021-12",
    context: "Oh, so now you want this explained too?",
    decision: "C++. For everything that mattered — systems work, competitive programming, self-respect.",
    consequences:
      "Manages its own memory and its own consequences. Never once missed a garbage collector holding my hand. Case, once again, closed.",
  },
  {
    id: "ADR-011",
    title: "Backend over frontend",
    status: "Accepted",
    date: "2024-02",
    context:
      "Option A: lose an afternoon to CSS specificity deciding it hates you personally. Option B: lose an afternoon to a queue quietly backing up until prod notices.",
    decision: "Backend. Every time. At least the bugs there make logical sense before 2AM.",
    consequences:
      "Trades pixel-alignment anxiety for race-condition anxiety. Strictly better anxiety, in my professional opinion.",
  },
  {
    id: "ADR-012",
    title: "Optimize for internships over a fifth side-project",
    status: "Superseded",
    date: "2024-11",
    context: "Four half-finished side projects, zero real production scars. The math wasn't mathing.",
    decision:
      "Paused every personal project for a full year. Went all in on internships — HPE, SpikedAI, Samsung R&D.",
    consequences:
      "Three internships back to back, and more real lessons than any tutorial series was ever going to teach. Superseded the moment placement season pivoted back to research output — but zero notes on the ROI.",
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