import { useEffect, useMemo, useState } from "react";
import { Layout } from "@/components/layout/Layout";
import { CodeDivider } from "@/components/ui/CodeDivider";
import { CodeLabel } from "@/components/ui/CodeLabel";
import { Button } from "@/components/ui/button";
import {
  Activity,
  Bell,
  CheckCircle2,
  AlertTriangle,
  XCircle,
  Coffee,
  Brain,
  BatteryCharging,
  Gauge,
  Bug,
} from "lucide-react";

/* ---------------- Uptime clock ---------------- */
const LAUNCH_DATE = new Date("2004-11-22T00:00:00");

function useUptime() {
  const [now, setNow] = useState(new Date());
  useEffect(() => {
    const id = setInterval(() => setNow(new Date()), 1000);
    return () => clearInterval(id);
  }, []);

  const diffMs = now.getTime() - LAUNCH_DATE.getTime();
  const totalSeconds = Math.floor(diffMs / 1000);

  const years = Math.floor(totalSeconds / (365.25 * 24 * 3600));
  const remAfterYears = totalSeconds - Math.floor(years * 365.25 * 24 * 3600);
  const days = Math.floor(remAfterYears / (24 * 3600));
  const hours = Math.floor((remAfterYears % (24 * 3600)) / 3600);
  const minutes = Math.floor((remAfterYears % 3600) / 60);
  const seconds = remAfterYears % 60;

  return { years, days, hours, minutes, seconds };
}

/* ---------------- Squiggly latency sparkline ---------------- */
function seededRandom(seed: number) {
  let s = seed;
  return () => {
    s = (s * 9301 + 49297) % 233280;
    return s / 233280;
  };
}

function Sparkline({ seed, colorClass }: { seed: number; colorClass: string }) {
  const points = useMemo(() => {
    const rand = seededRandom(seed);
    const w = 220;
    const h = 40;
    const n = 24;
    const pts: string[] = [];
    for (let i = 0; i < n; i++) {
      const x = (i / (n - 1)) * w;
      const y = h / 2 + (rand() - 0.5) * h * 0.8;
      pts.push(`${x.toFixed(1)},${y.toFixed(1)}`);
    }
    return pts.join(" ");
  }, [seed]);

  return (
    <svg viewBox="0 0 220 40" className="h-10 w-full">
      <polyline
        points={points}
        fill="none"
        strokeWidth="1.5"
        className={colorClass}
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

/* ---------------- Data ---------------- */
type Status = "operational" | "degraded" | "outage";

const STATUS_META: Record<Status, { label: string; color: string; icon: typeof CheckCircle2 }> = {
  operational: { label: "Operational", color: "text-primary", icon: CheckCircle2 },
  degraded: { label: "Degraded Performance", color: "text-yellow-500", icon: AlertTriangle },
  outage: { label: "Partial Outage", color: "text-destructive", icon: XCircle },
};

const SERVICES: { name: string; icon: typeof Coffee; status: Status; seed: number }[] = [
  { name: "Caffeine Ingestion Service", icon: Coffee, status: "operational", seed: 1 },
  { name: "Motivation API", icon: BatteryCharging, status: "degraded", seed: 2 },
  { name: "Focus Engine", icon: Brain, status: "operational", seed: 3 },
  { name: "Sleep Schedule Daemon", icon: Gauge, status: "outage", seed: 4 },
  { name: "Bug Tolerance Threshold", icon: Bug, status: "operational", seed: 5 },
  { name: "General Vibe Cluster", icon: Activity, status: "operational", seed: 6 },
];

const INCIDENTS = [
  {
    date: "Jul 2, 2026",
    severity: "Minor" as const,
    title: "2AM deploy caused mood degradation",
    root_cause:
      "A last-minute refactor was shipped directly to prod (i.e., real life) without a code review or a second opinion.",
    resolution:
      "Rolled back with a large coffee and 20 minutes of doom-scrolling Hacker News. Mood restored to baseline by 9AM.",
  },
  {
    date: "Jun 14, 2026",
    severity: "Major" as const,
    title: "Full outage during CSITSS paper deadline",
    root_cause:
      "Unbounded LaTeX compile loop consumed all available patience. Reviewer comments arrived faster than fixes could ship.",
    resolution:
      "Emergency scaling via extra monitor and instant noodles. Service restored after a 6-hour maintenance window (nap).",
  },
  {
    date: "May 30, 2026",
    severity: "Minor" as const,
    title: "Degraded performance on 'Focus Engine'",
    root_cause: "Someone opened 34 browser tabs and left one on autoplay.",
    resolution: "Manual intervention. Tabs closed. One (1) tab kept open out of spite.",
  },
  {
    date: "Mar 3, 2026",
    severity: "Resolved" as const,
    title: "Unplugging the router fixed a race condition",
    root_cause: "Unknown. Still under investigation. Possibly always will be.",
    resolution:
      "Router unplugged and replugged. Race condition disappeared. Root cause analysis inconclusive but service remains stable.",
  },
];

const SEVERITY_COLOR: Record<string, string> = {
  Minor: "text-yellow-500 border-yellow-500/30 bg-yellow-500/10",
  Major: "text-destructive border-destructive/30 bg-destructive/10",
  Resolved: "text-primary border-primary/30 bg-primary/10",
};

/* ---------------- Page ---------------- */
export default function Uptime() {
  const { years, days, hours, minutes, seconds } = useUptime();
  const [subscribed, setSubscribed] = useState(false);
  const [email, setEmail] = useState("");

  const overallOperational = SERVICES.every((s) => s.status !== "outage");

  return (
    <Layout>
      <section className="border-b border-border py-16">
        <div className="container">
          <div className="animate-fade-in-up opacity-0">
            <CodeLabel className="mb-4">status.umar.dev</CodeLabel>
            <div className="mb-2 flex flex-wrap items-center gap-3">
              <span className="relative flex h-3 w-3">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-primary opacity-75" />
                <span className="relative inline-flex h-3 w-3 rounded-full bg-primary" />
              </span>
              <h1 className="text-2xl font-bold text-foreground md:text-4xl">
                {overallOperational ? "All Systems Operational*" : "Partial System Outage"}
              </h1>
            </div>
            <p className="ml-6 font-mono text-xs text-muted-foreground">
              *terms and conditions (sleep schedule) may vary
            </p>
          </div>

          {/* Live uptime counter */}
          <div className="stagger-1 mt-10 grid animate-fade-in-up grid-cols-2 gap-3 opacity-0 sm:grid-cols-4">
            {[
              { v: years, l: "years" },
              { v: days, l: "days" },
              { v: hours, l: "hours" },
              { v: minutes, l: "min" },
              { v: seconds, l: "sec" },
            ].map((u, i) => (
              <div
                key={u.l}
                className={`rounded-lg border border-border bg-card/60 p-4 text-center ${
                  i === 4 ? "col-span-2 sm:col-span-1" : ""
                }`}
              >
                <div className="font-mono text-2xl font-bold tabular-nums text-primary md:text-3xl">
                  {u.v}
                </div>
                <div className="mt-1 font-mono text-xs text-muted-foreground">{u.l}</div>
              </div>
            ))}
          </div>
          <p className="stagger-2 mt-3 animate-fade-in-up font-mono text-xs text-muted-foreground opacity-0">
            {"// up since Nov 22, 2004 — 0 planned downtime, several unplanned naps"}
          </p>
        </div>
      </section>

      {/* Uptime % + subscribe */}
      <section className="border-b border-border py-14">
        <div className="container grid gap-6 md:grid-cols-3">
          <div className="animate-fade-in-up rounded-lg border border-border bg-card/60 p-6 opacity-0">
            <div className="font-mono text-3xl font-bold text-primary">99.97%</div>
            <div className="mt-1 text-sm text-muted-foreground">Uptime (last 90 days)</div>
          </div>
          <div className="stagger-1 animate-fade-in-up rounded-lg border border-border bg-card/60 p-6 opacity-0">
            <div className="font-mono text-3xl font-bold text-primary">142ms</div>
            <div className="mt-1 text-sm text-muted-foreground">
              Avg. response time (coffee-adjusted)
            </div>
          </div>
          <div className="stagger-2 flex animate-fade-in-up flex-col justify-between rounded-lg border border-border bg-card/60 p-6 opacity-0">
            <div>
              <div className="mb-1 flex items-center gap-2 text-sm font-medium text-foreground">
                <Bell className="h-4 w-4 text-primary" /> Subscribe to updates
              </div>
              <p className="mb-3 text-xs text-muted-foreground">
                Get notified when something breaks. It will.
              </p>
            </div>
            {subscribed ? (
              <p className="font-mono text-xs text-primary">
                ✓ subscribed (jk, this button doesn't do anything)
              </p>
            ) : (
              <form
                className="flex gap-2"
                onSubmit={(e) => {
                  e.preventDefault();
                  setSubscribed(true);
                }}
              >
                <input
                  type="email"
                  required
                  placeholder="you@example.com"
                  value={email}
                  onChange={(ev) => setEmail(ev.target.value)}
                  className="min-w-0 flex-1 rounded-md border border-border bg-background px-3 py-2 font-mono text-xs text-foreground placeholder:text-muted-foreground focus:border-primary/60 focus:outline-none"
                />
                <Button type="submit" size="sm" className="shrink-0 font-mono">
                  Subscribe
                </Button>
              </form>
            )}
          </div>
        </div>
      </section>

      {/* Components / services */}
      <section className="py-20">
        <div className="container">
          <div className="animate-fade-in-up opacity-0">
            <CodeDivider label="Component Status" />
          </div>
          <div className="grid gap-4 md:grid-cols-2">
            {SERVICES.map((s, i) => {
              const meta = STATUS_META[s.status];
              return (
                <div
                  key={s.name}
                  className="animate-fade-in-up rounded-lg border border-border bg-card/60 p-5 opacity-0 transition-all hover:border-primary/40"
                  style={{ animationDelay: `${0.05 + i * 0.06}s` }}
                >
                  <div className="mb-3 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <s.icon className="h-4 w-4 text-primary" />
                      <span className="text-sm font-medium text-foreground">{s.name}</span>
                    </div>
                    <span className={`flex items-center gap-1 font-mono text-xs ${meta.color}`}>
                      <meta.icon className="h-3.5 w-3.5" />
                      {meta.label}
                    </span>
                  </div>
                  <Sparkline seed={s.seed} colorClass={meta.color} />
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Incident history / postmortems */}
      <section className="border-t border-border py-20">
        <div className="container max-w-3xl">
          <div className="animate-fade-in-up opacity-0">
            <CodeDivider label="Incident History" />
          </div>
          <div className="space-y-4">
            {INCIDENTS.map((inc, i) => (
              <div
                key={inc.title}
                className="animate-fade-in-up overflow-hidden rounded-lg border border-border bg-card/60 opacity-0"
                style={{ animationDelay: `${0.05 + i * 0.08}s` }}
              >
                <div className="flex flex-wrap items-center justify-between gap-2 border-b border-border bg-secondary/30 px-5 py-3">
                  <span className="font-mono text-xs text-muted-foreground">{inc.date}</span>
                  <span
                    className={`rounded-full border px-2 py-0.5 font-mono text-xs ${
                      SEVERITY_COLOR[inc.severity]
                    }`}
                  >
                    {inc.severity}
                  </span>
                </div>
                <div className="p-5">
                  <h3 className="mb-2 font-semibold text-foreground">{inc.title}</h3>
                  <p className="mb-2 text-sm text-muted-foreground">
                    <span className="font-mono text-xs text-primary">root cause — </span>
                    {inc.root_cause}
                  </p>
                  <p className="text-sm text-muted-foreground">
                    <span className="font-mono text-xs text-primary">resolution — </span>
                    {inc.resolution}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </Layout>
  );
}
