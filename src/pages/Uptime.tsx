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
    <svg viewBox="0 0 220 40" className="w-full h-10">
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

const STATUS_META: Record<
  Status,
  { label: string; color: string; icon: typeof CheckCircle2 }
> = {
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
      <section className="py-16 border-b border-border">
        <div className="container">
          <div className="opacity-0 animate-fade-in-up">
            <CodeLabel className="mb-4">status.umar.dev</CodeLabel>
            <div className="flex flex-wrap items-center gap-3 mb-2">
              <span className="relative flex h-3 w-3">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75" />
                <span className="relative inline-flex rounded-full h-3 w-3 bg-primary" />
              </span>
              <h1 className="text-2xl md:text-4xl font-bold text-foreground">
                {overallOperational ? "All Systems Operational*" : "Partial System Outage"}
              </h1>
            </div>
            <p className="text-xs text-muted-foreground font-mono ml-6">
              *terms and conditions (sleep schedule) may vary
            </p>
          </div>

          {/* Live uptime counter */}
          <div className="mt-10 grid grid-cols-2 sm:grid-cols-4 gap-3 opacity-0 animate-fade-in-up stagger-1">
            {[
              { v: years, l: "years" },
              { v: days, l: "days" },
              { v: hours, l: "hours" },
              { v: minutes, l: "min" },
              { v: seconds, l: "sec" },
            ].map((u, i) => (
              <div
                key={u.l}
                className={`p-4 rounded-lg border border-border bg-card/60 text-center ${
                  i === 4 ? "col-span-2 sm:col-span-1" : ""
                }`}
              >
                <div className="font-mono text-2xl md:text-3xl font-bold text-primary tabular-nums">
                  {u.v}
                </div>
                <div className="text-xs text-muted-foreground font-mono mt-1">{u.l}</div>
              </div>
            ))}
          </div>
          <p className="text-xs text-muted-foreground font-mono mt-3 opacity-0 animate-fade-in-up stagger-2">
            {"// up since Nov 22, 2004 — 0 planned downtime, several unplanned naps"}
          </p>
        </div>
      </section>

      {/* Uptime % + subscribe */}
      <section className="py-14 border-b border-border">
        <div className="container grid gap-6 md:grid-cols-3">
          <div className="p-6 rounded-lg border border-border bg-card/60 opacity-0 animate-fade-in-up">
            <div className="font-mono text-3xl font-bold text-primary">99.97%</div>
            <div className="text-sm text-muted-foreground mt-1">Uptime (last 90 days)</div>
          </div>
          <div className="p-6 rounded-lg border border-border bg-card/60 opacity-0 animate-fade-in-up stagger-1">
            <div className="font-mono text-3xl font-bold text-primary">142ms</div>
            <div className="text-sm text-muted-foreground mt-1">Avg. response time (coffee-adjusted)</div>
          </div>
          <div className="p-6 rounded-lg border border-border bg-card/60 flex flex-col justify-between opacity-0 animate-fade-in-up stagger-2">
            <div>
              <div className="flex items-center gap-2 text-sm font-medium text-foreground mb-1">
                <Bell className="w-4 h-4 text-primary" /> Subscribe to updates
              </div>
              <p className="text-xs text-muted-foreground mb-3">
                Get notified when something breaks. It will.
              </p>
            </div>
            {subscribed ? (
              <p className="text-xs font-mono text-primary">
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
                  className="flex-1 min-w-0 px-3 py-2 rounded-md border border-border bg-background text-xs font-mono text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary/60"
                />
                <Button type="submit" size="sm" className="font-mono shrink-0">
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
          <div className="opacity-0 animate-fade-in-up">
            <CodeDivider label="Component Status" />
          </div>
          <div className="grid gap-4 md:grid-cols-2">
            {SERVICES.map((s, i) => {
              const meta = STATUS_META[s.status];
              return (
                <div
                  key={s.name}
                  className="p-5 rounded-lg border border-border bg-card/60 hover:border-primary/40 transition-all opacity-0 animate-fade-in-up"
                  style={{ animationDelay: `${0.05 + i * 0.06}s` }}
                >
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-2">
                      <s.icon className="w-4 h-4 text-primary" />
                      <span className="text-sm font-medium text-foreground">{s.name}</span>
                    </div>
                    <span className={`flex items-center gap-1 text-xs font-mono ${meta.color}`}>
                      <meta.icon className="w-3.5 h-3.5" />
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
      <section className="py-20 border-t border-border">
        <div className="container max-w-3xl">
          <div className="opacity-0 animate-fade-in-up">
            <CodeDivider label="Incident History" />
          </div>
          <div className="space-y-4">
            {INCIDENTS.map((inc, i) => (
              <div
                key={inc.title}
                className="rounded-lg border border-border bg-card/60 overflow-hidden opacity-0 animate-fade-in-up"
                style={{ animationDelay: `${0.05 + i * 0.08}s` }}
              >
                <div className="flex flex-wrap items-center justify-between gap-2 px-5 py-3 border-b border-border bg-secondary/30">
                  <span className="font-mono text-xs text-muted-foreground">{inc.date}</span>
                  <span
                    className={`text-xs font-mono px-2 py-0.5 rounded-full border ${
                      SEVERITY_COLOR[inc.severity]
                    }`}
                  >
                    {inc.severity}
                  </span>
                </div>
                <div className="p-5">
                  <h3 className="font-semibold text-foreground mb-2">{inc.title}</h3>
                  <p className="text-sm text-muted-foreground mb-2">
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