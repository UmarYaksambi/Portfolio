import { useEffect, useState } from "react";
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

interface NowPlayingData {
  isPlaying: boolean;
  configured?: boolean;
  title?: string;
  artist?: string;
  albumArt?: string | null;
  songUrl?: string | null;
}

function useNowPlaying() {
  const [data, setData] = useState<NowPlayingData | null>(null);

  useEffect(() => {
    let cancelled = false;

    const fetchNowPlaying = async () => {
      try {
        const res = await fetch("/api/now-playing");
        const json = await res.json();
        if (!cancelled) setData(json);
      } catch {
        if (!cancelled) setData({ isPlaying: false, configured: false });
      }
    };

    fetchNowPlaying();
    const interval = setInterval(fetchNowPlaying, 30000);
    return () => {
      cancelled = true;
      clearInterval(interval);
    };
  }, []);

  return data;
}

function SpotifyNowPlaying() {
  const data = useNowPlaying();

  // Not yet configured (no env vars set) or endpoint unreachable — fall back
  // to the static line so the page never looks broken.
  if (!data || data.configured === false) {
    return (
      <p className="text-muted-foreground leading-relaxed">
        Whatever survives three consecutive "skip" presses at 1AM.
      </p>
    );
  }

  if (!data.title) {
    return <p className="text-muted-foreground leading-relaxed">Nothing on deck right now.</p>;
  }

  return (
    <a
      href={data.songUrl ?? undefined}
      target="_blank"
      rel="noreferrer"
      className="group flex items-center gap-3 p-3 -m-3 rounded-lg hover:bg-card/60 transition-colors"
    >
      {data.albumArt ? (
        <img
          src={data.albumArt}
          alt={data.title}
          className="w-12 h-12 rounded-md border border-border object-cover shrink-0"
        />
      ) : (
        <div className="w-12 h-12 rounded-md border border-border bg-secondary/50 flex items-center justify-center shrink-0">
          <Music2 className="w-4 h-4 text-muted-foreground" />
        </div>
      )}
      <div className="min-w-0">
        <div className="flex items-center gap-2">
          {data.isPlaying && (
            <span className="flex items-end gap-0.5 h-3 shrink-0">
              <span className="w-0.5 bg-primary now-eq-1" />
              <span className="w-0.5 bg-primary now-eq-2" />
              <span className="w-0.5 bg-primary now-eq-3" />
            </span>
          )}
          <span className="text-foreground font-medium truncate group-hover:text-primary transition-colors">
            {data.title}
          </span>
        </div>
        <p className="text-xs text-muted-foreground truncate mt-0.5">
          {data.isPlaying ? "Playing now" : "Last played"}
          {data.artist ? ` — ${data.artist}` : ""}
        </p>
      </div>
    </a>
  );
}

export default function Now() {
  return (
    <Layout>
      <section className="py-20 min-h-[70vh]">
        <div className="container max-w-2xl">
          <style>{`
            @keyframes now-eq-bounce-1 { 0%, 100% { height: 4px; } 50% { height: 12px; } }
            @keyframes now-eq-bounce-2 { 0%, 100% { height: 12px; } 50% { height: 5px; } }
            @keyframes now-eq-bounce-3 { 0%, 100% { height: 7px; } 50% { height: 12px; } }
            .now-eq-1 { animation: now-eq-bounce-1 0.9s ease-in-out infinite; }
            .now-eq-2 { animation: now-eq-bounce-2 0.9s ease-in-out infinite 0.15s; }
            .now-eq-3 { animation: now-eq-bounce-3 0.9s ease-in-out infinite 0.3s; }
          `}</style>

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
                  {s.label === "On repeat" ? (
                    <li className="pl-2 -ml-px">
                      <SpotifyNowPlaying />
                    </li>
                  ) : (
                    s.items.map((item) => (
                      <li key={item} className="text-muted-foreground leading-relaxed pl-2 -ml-px">
                        {item}
                      </li>
                    ))
                  )}
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