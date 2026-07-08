import React, { useEffect, useRef, useState, KeyboardEvent } from "react";
import { FileJson2, FileCode2, TerminalSquare } from "lucide-react";

/* ------------------------------------------------------------------ */
/*  DATA — sourced from resume                                         */
/* ------------------------------------------------------------------ */

const PROFILE = {
  name: "Muhammad Umar Yaksambi",
  location: "Bengaluru, IN",
  email: "umaryaksambi@gmail.com",
  phone: "+91 99025 78332",
  linkedin: "linkedin.com/in/UmarYaksambi",
  github: "github.com/umaryaksambi",
  site: "umaryaksambi.vercel.app",
  role: "ML Engineer + Backend + Full-Stack",
  college: "RV College of Engineering, Bengaluru",
  degree: "BE, Computer Science & Engineering (Data Sciences)",
  cgpa: "9.12 / 10",
  grad: "Expected May 2027",
  status: "Ready to innovate & collaborate.",
};

const EXPERIENCE = [
  {
    role: "HPE CPP3 Intern",
    org: "Hewlett Packard Enterprise",
    time: "Mar 2026 – Present",
    bullets: [
      "Hybrid lexical+semantic (BAAI/bge-small-en-v1.5) engine linking CI failures to Jira issues",
      "0.90 cosine-similarity duplicate-detection layer within 7-day windows",
      "SQLite WAL + 32MB cache tuning to kill dashboard lockups under load",
    ],
  },
  {
    role: "Product Developer Intern",
    org: "SpikedAI",
    time: "Jun 2025 – Mar 2026",
    bullets: [
      "FastAPI + Node.js event-driven services at 500 RPS / 500+ concurrent users",
      "RAG + GraphQL pipeline: 750ms e2e over 100M+ token knowledge base",
      "Multi-cloud (AWS/GCP) infra, GitHub Actions CI/CD, Nginx — 99.9% uptime",
    ],
  },
  {
    role: "PRISM Research Intern",
    org: "Samsung R&D Institute",
    time: "May 2025 – Jan 2026",
    bullets: [
      "Real-time 3D Gaussian Splatting PLY viewer (Filament engine) — 30 FPS @1080p on Dimensity 9000",
      "Rendered 3M+ Gaussian scenes on mobile via optimized spherical-harmonics + material compilation",
    ],
  },
];

const PROJECTS = [
  {
    name: "Thrive Learning Platform",
    stack: "Next.js, TypeScript, Supabase, OpenAI, Gemini API, PWA",
    desc: "Offline-first educational PWA with dynamic curricula, 3D visuals, context-aware tutor.",
  },
  {
    name: "Adaptive-ECC Watermarking for AI Images",
    stack: "Python, OpenCV, Cryptography",
    desc: "Invisible adaptive ECC watermarking, intensity-scaled by local complexity. Under review @ MTAP, Springer.",
  },
  {
    name: "MedQuery",
    stack: "React, TypeScript, FastAPI, LLMs",
    desc: "Clinical platform to query MIMIC-IV via natural language, secure RBAC, interactive analytics.",
  },
];

const SKILLS = {
  Languages: ["Python", "C++", "TypeScript", "SQL", "Embedded C"],
  "Frameworks & Libraries": ["PyTorch", "TensorFlow", "FastAPI", "Node.js", "React", "Next.js", "LangChain", "GraphQL"],
  "Cloud & DevOps": ["AWS", "GCP", "Kubernetes", "Docker", "GitHub Actions", "Nginx"],
  Databases: ["PostgreSQL", "MongoDB", "Redis", "Qdrant", "ChromaDB"],
};

const LEADERSHIP = {
  role: "Vice President",
  org: "The Coding Club of RVCE",
  time: "Feb 2025 – Present",
  bullets: [
    "Led 300+ member community, ran 15+ events (hackathons, workshops) for 1,000+ participants",
    "Mentored students in software dev, AI, and competitive programming",
  ],
};

/* ------------------------------------------------------------------ */
/*  SHARED SYNTAX-COLOR HELPERS                                        */
/* ------------------------------------------------------------------ */

const c = {
  punct: "text-pink-400",
  key: "text-sky-300",
  str: "text-emerald-400",
  num: "text-orange-400",
  kw: "text-purple-400",
  fn: "text-yellow-300",
  comment: "text-muted-foreground/70 italic",
  fg: "text-foreground",
  muted: "text-muted-foreground",
  primary: "text-primary",
};

/* ------------------------------------------------------------------ */
/*  bio.json TAB                                                       */
/* ------------------------------------------------------------------ */

function BioJsonView() {
  const [visibleLines, setVisibleLines] = useState(0);

  const lines: { indent: number; node: React.ReactNode }[] = [
    { indent: 0, node: <span className={c.punct}>{"{"}</span> },
    { indent: 1, node: <><span className={c.key}>"name"</span><span className={c.punct}>: </span><span className={c.str}>"{PROFILE.name}"</span><span className={c.punct}>,</span></> },
    { indent: 1, node: <><span className={c.key}>"role"</span><span className={c.punct}>: </span><span className={c.str}>"{PROFILE.role}"</span><span className={c.punct}>,</span></> },
    { indent: 1, node: <><span className={c.key}>"college"</span><span className={c.punct}>: </span><span className={c.str}>"{PROFILE.college}"</span><span className={c.punct}>,</span></> },
    { indent: 1, node: <><span className={c.key}>"degree"</span><span className={c.punct}>: </span><span className={c.str}>"{PROFILE.degree}"</span><span className={c.punct}>,</span></> },
    { indent: 1, node: <><span className={c.key}>"cgpa"</span><span className={c.punct}>: </span><span className={c.num}>{PROFILE.cgpa}</span><span className={c.punct}>,</span></> },
    { indent: 1, node: <><span className={c.key}>"currentRole"</span><span className={c.punct}>: </span><span className={c.str}>"HPE CPP3 Intern"</span><span className={c.punct}>,</span></> },
    { indent: 1, node: <><span className={c.key}>"skills"</span><span className={c.punct}>: [</span></> },
    ...Object.values(SKILLS).flat().slice(0, 6).map((s, i, arr) => ({
      indent: 2,
      node: <><span className={c.str}>"{s}"</span>{i < arr.length - 1 ? <span className={c.punct}>,</span> : null}</>,
    })),
    { indent: 1, node: <span className={c.punct}>{"],"}</span> },
    { indent: 1, node: <><span className={c.key}>"location"</span><span className={c.punct}>: </span><span className={c.str}>"{PROFILE.location}"</span><span className={c.punct}>,</span></> },
    { indent: 1, node: <><span className={c.key}>"status"</span><span className={c.punct}>: </span><span className={c.str}>"{PROFILE.status}"</span></> },
    { indent: 0, node: <span className={c.punct}>{"}"}</span> },
  ];

  useEffect(() => {
    setVisibleLines(0);
    const id = setInterval(() => {
      setVisibleLines((v) => {
        if (v >= lines.length) {
          clearInterval(id);
          return v;
        }
        return v + 1;
      });
    }, 55);
    return () => clearInterval(id);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="space-y-[3px]">
      {lines.slice(0, visibleLines).map((l, i) => (
        <div key={i} style={{ paddingLeft: l.indent * 16 }}>
          {l.node}
        </div>
      ))}
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  agent.py TAB                                                       */
/* ------------------------------------------------------------------ */

function AgentPyView() {
  return (
    <div className="space-y-[3px] whitespace-pre">
      <div><span className={c.kw}>class</span> <span className={c.fn}>Umar</span><span className={c.punct}>(</span><span className={c.fn}>Engineer</span><span className={c.punct}>):</span></div>
      <div className="pl-4"><span className={c.comment}># {PROFILE.degree}, CGPA {PROFILE.cgpa}</span></div>
      <div className="pl-4"><span className={c.kw}>def</span> <span className={c.fn}>__init__</span><span className={c.punct}>(</span><span className={c.primary}>self</span><span className={c.punct}>):</span></div>
      <div className="pl-8"><span className={c.primary}>self</span><span className={c.punct}>.</span><span className={c.key}>name</span> <span className={c.punct}>=</span> <span className={c.str}>"{PROFILE.name}"</span></div>
      <div className="pl-8"><span className={c.primary}>self</span><span className={c.punct}>.</span><span className={c.key}>role</span> <span className={c.punct}>=</span> <span className={c.str}>"{PROFILE.role}"</span></div>
      <div className="pl-8"><span className={c.primary}>self</span><span className={c.punct}>.</span><span className={c.key}>stack</span> <span className={c.punct}>=</span> <span className={c.punct}>[</span><span className={c.str}>"PyTorch"</span><span className={c.punct}>,</span> <span className={c.str}>"FastAPI"</span><span className={c.punct}>,</span> <span className={c.str}>"React"</span><span className={c.punct}>,</span> <span className={c.str}>"AWS"</span><span className={c.punct}>]</span></div>
      <div className="pl-8"><span className={c.primary}>self</span><span className={c.punct}>.</span><span className={c.key}>focus</span> <span className={c.punct}>=</span> <span className={c.punct}>(</span><span className={c.str}>"backend"</span><span className={c.punct}>,</span> <span className={c.str}>"ml"</span><span className={c.punct}>,</span> <span className={c.str}>"systems"</span><span className={c.punct}>)</span></div>
      <div>&nbsp;</div>
      <div className="pl-4"><span className={c.kw}>def</span> <span className={c.fn}>ship</span><span className={c.punct}>(</span><span className={c.primary}>self</span><span className={c.punct}>,</span> <span className={c.key}>idea</span><span className={c.punct}>:</span> <span className={c.fn}>str</span><span className={c.punct}>) -&gt;</span> <span className={c.fn}>Product</span><span className={c.punct}>:</span></div>
      <div className="pl-8"><span className={c.comment}># builds fast, benchmarks harder</span></div>
      <div className="pl-8"><span className={c.kw}>return</span> <span className={c.fn}>Product</span><span className={c.punct}>(</span><span className={c.key}>working</span><span className={c.punct}>=</span><span className={c.kw}>True</span><span className={c.punct}>,</span> <span className={c.key}>documented</span><span className={c.punct}>=</span><span className={c.kw}>True</span><span className={c.punct}>)</span></div>
      <div>&nbsp;</div>
      <div className="pl-4"><span className={c.kw}>def</span> <span className={c.fn}>status</span><span className={c.punct}>(</span><span className={c.primary}>self</span><span className={c.punct}>):</span></div>
      <div className="pl-8"><span className={c.kw}>return</span> <span className={c.str}>"{PROFILE.status}"</span></div>
      <div>&nbsp;</div>
      <div><span className={c.primary}>umar</span> <span className={c.punct}>=</span> <span className={c.fn}>Umar</span><span className={c.punct}>()</span></div>
      <div><span className={c.fn}>print</span><span className={c.punct}>(</span><span className={c.primary}>umar</span><span className={c.punct}>.</span><span className={c.fn}>status</span><span className={c.punct}>())</span></div>
      <div className={c.muted}>&gt;&gt;&gt; {PROFILE.status}</div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  zsh TAB — actual interactive shell                                  */
/* ------------------------------------------------------------------ */

type HistItem = { type: "input" | "output"; node: React.ReactNode };

const FILES: Record<string, React.ReactNode> = {
  "about.txt": (
    <div>
      {PROFILE.name} — {PROFILE.role}.{" "}
      {PROFILE.degree} @ {PROFILE.college}, CGPA {PROFILE.cgpa} ({PROFILE.grad}).
    </div>
  ),
  "skills.txt": (
    <div className="space-y-1">
      {Object.entries(SKILLS).map(([k, v]) => (
        <div key={k}>
          <span className={c.primary}>{k}:</span> <span className={c.muted}>{v.join(", ")}</span>
        </div>
      ))}
    </div>
  ),
};

const SUGGESTIONS = ["whoami", "skills", "experience", "projects", "contact", "resume"];

function HelpOutput() {
  const cmds: [string, string][] = [
    ["help", "show this list"],
    ["whoami", "who you're talking to"],
    ["about", "quick bio"],
    ["skills", "tech stack breakdown"],
    ["experience", "work history"],
    ["projects", "things I've built"],
    ["education", "academic background"],
    ["leadership", "clubs & mentoring"],
    ["contact", "how to reach me"],
    ["resume", "open/download resume"],
    ["ls", "list files in this dir"],
    ["cat <file>", "print a file, e.g. cat skills.txt"],
    ["clear", "clear the terminal"],
  ];
  return (
    <div>
      <div className={c.muted}>Available commands:</div>
      <div className="mt-1 grid grid-cols-[110px_1fr] gap-y-0.5">
        {cmds.map(([k, v]) => (
          <React.Fragment key={k}>
            <span className={c.primary}>{k}</span>
            <span className={c.muted}>{v}</span>
          </React.Fragment>
        ))}
      </div>
    </div>
  );
}

function ExperienceOutput() {
  return (
    <div className="space-y-3">
      {EXPERIENCE.map((e) => (
        <div key={e.role}>
          <div>
            <span className={c.primary}>{e.role}</span>
            <span className={c.muted}> @ {e.org} </span>
            <span className="text-xs text-muted-foreground/70">({e.time})</span>
          </div>
          <ul className="mt-0.5 space-y-0.5">
            {e.bullets.map((b) => (
              <li key={b} className={c.muted}>
                <span className={c.primary}>·</span> {b}
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
}

function ProjectsOutput() {
  return (
    <div className="space-y-2">
      {PROJECTS.map((p) => (
        <div key={p.name}>
          <span className={c.primary}>{p.name}</span>
          <span className="text-xs text-muted-foreground/70"> — {p.stack}</span>
          <div className={c.muted}>{p.desc}</div>
        </div>
      ))}
    </div>
  );
}

function ContactOutput() {
  return (
    <div className="space-y-0.5">
      <div><span className={c.primary}>email</span>   <span className={c.muted}>{PROFILE.email}</span></div>
      <div><span className={c.primary}>phone</span>   <span className={c.muted}>{PROFILE.phone}</span></div>
      <div><span className={c.primary}>github</span>  <span className={c.muted}>{PROFILE.github}</span></div>
      <div><span className={c.primary}>linkedin</span><span className={c.muted}> {PROFILE.linkedin}</span></div>
      <div><span className={c.primary}>site</span>    <span className={c.muted}>{PROFILE.site}</span></div>
    </div>
  );
}

function ZshView() {
  const [booted, setBooted] = useState(false);
  const [bootLine, setBootLine] = useState(0);
  const [typed, setTyped] = useState("");
  const [history, setHistory] = useState<HistItem[]>([]);
  const [input, setInput] = useState("");
  const [cmdLog, setCmdLog] = useState<string[]>([]);
  const [cmdPtr, setCmdPtr] = useState<number | null>(null);
  const [animating, setAnimating] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const bottomRef = useRef<HTMLDivElement>(null);
  const typingTimer = useRef<ReturnType<typeof setInterval> | null>(null);

  const boot = [
    `whoami`,
    PROFILE.name,
    `echo "type 'help' to explore"`,
  ];

  useEffect(() => {
    if (bootLine >= boot.length) {
      setBooted(true);
      return;
    }
    const line = boot[bootLine];
    let i = 0;
    setTyped("");
    const id = setInterval(() => {
      i++;
      setTyped(line.slice(0, i));
      if (i >= line.length) {
        clearInterval(id);
        setTimeout(() => setBootLine((v) => v + 1), 280);
      }
    }, 20);
    return () => clearInterval(id);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [bootLine]);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ block: "end" });
  }, [history, typed, booted]);

  const run = (raw: string) => {
    const trimmed = raw.trim();
    if (!trimmed) return;
    const [cmd, ...rest] = trimmed.split(/\s+/);
    const arg = rest.join(" ");
    const lc = cmd.toLowerCase();

    setHistory((h) => [...h, { type: "input", node: trimmed }]);
    setCmdLog((l) => [...l, trimmed]);
    setCmdPtr(null);

    const push = (node: React.ReactNode) => setHistory((h) => [...h, { type: "output", node }]);

    switch (lc) {
      case "help":
        push(<HelpOutput />);
        break;
      case "whoami":
        push(<span>{PROFILE.name}</span>);
        break;
      case "about":
        push(FILES["about.txt"]);
        break;
      case "skills":
        push(FILES["skills.txt"]);
        break;
      case "experience":
      case "exp":
        push(<ExperienceOutput />);
        break;
      case "projects":
        push(<ProjectsOutput />);
        break;
      case "education":
        push(
          <div>
            {PROFILE.degree} — <span className={c.primary}>{PROFILE.college}</span>
            <div className={c.muted}>CGPA {PROFILE.cgpa} · {PROFILE.grad}</div>
          </div>
        );
        break;
      case "leadership":
        push(
          <div>
            <span className={c.primary}>{LEADERSHIP.role}</span>
            <span className={c.muted}> @ {LEADERSHIP.org} ({LEADERSHIP.time})</span>
            <ul className="mt-0.5">
              {LEADERSHIP.bullets.map((b) => (
                <li key={b} className={c.muted}><span className={c.primary}>·</span> {b}</li>
              ))}
            </ul>
          </div>
        );
        break;
      case "contact":
        push(<ContactOutput />);
        break;
      case "resume":
        push(<span className={c.muted}>Opening resume…</span>);
        window.open("/resume.pdf", "_blank");
        break;
      case "ls":
        push(<span className={c.primary}>about.txt  skills.txt  experience/  projects/  contact.md</span>);
        break;
      case "cat":
        if (FILES[arg]) push(FILES[arg]);
        else push(<span className="text-destructive">cat: {arg || "(missing operand)"}: No such file</span>);
        break;
      case "echo":
        push(<span>{arg}</span>);
        break;
      case "date":
        push(<span>{new Date().toString()}</span>);
        break;
      case "sudo":
        push(<span className="text-destructive">Nice try. Permission denied.</span>);
        break;
      case "clear":
        setHistory([]);
        return;
      default:
        push(
          <span>
            zsh: command not found: <span className="text-destructive">{cmd}</span>
            <span className={c.muted}> — try `help`</span>
          </span>
        );
    }
  };

  const typeAndRun = (cmdStr: string) => {
    if (animating) return;
    setAnimating(true);
    setInput("");
    inputRef.current?.blur();
    let i = 0;
    typingTimer.current = setInterval(() => {
      i++;
      setInput(cmdStr.slice(0, i));
      if (i >= cmdStr.length) {
        if (typingTimer.current) clearInterval(typingTimer.current);
        setTimeout(() => {
          run(cmdStr);
          setInput("");
          setAnimating(false);
          inputRef.current?.focus();
        }, 260);
      }
    }, 45);
  };

  useEffect(() => {
    return () => {
      if (typingTimer.current) clearInterval(typingTimer.current);
    };
  }, []);

  const onKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (animating) {
      e.preventDefault();
      return;
    }
    if (e.key === "Enter") {
      run(input);
      setInput("");
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      if (!cmdLog.length) return;
      const nextPtr = cmdPtr === null ? cmdLog.length - 1 : Math.max(0, cmdPtr - 1);
      setCmdPtr(nextPtr);
      setInput(cmdLog[nextPtr]);
    } else if (e.key === "ArrowDown") {
      e.preventDefault();
      if (cmdPtr === null) return;
      const nextPtr = cmdPtr + 1;
      if (nextPtr >= cmdLog.length) {
        setCmdPtr(null);
        setInput("");
      } else {
        setCmdPtr(nextPtr);
        setInput(cmdLog[nextPtr]);
      }
    }
  };

  return (
    <div
      className="space-y-1.5 min-h-[260px] max-h-[420px] overflow-y-auto cursor-text"
      onClick={() => inputRef.current?.focus()}
    >
      {!booted ? (
        <>
          {boot.slice(0, bootLine).map((l, i) => (
            <div key={i} className={i % 2 === 0 ? c.primary : c.fg}>
              {i % 2 === 0 ? "$ " : ""}
              {l}
            </div>
          ))}
          {bootLine < boot.length && (
            <div className={bootLine % 2 === 0 ? c.primary : c.fg}>
              {bootLine % 2 === 0 ? "$ " : ""}
              {typed}
              <span className="animate-blink text-primary">▍</span>
            </div>
          )}
        </>
      ) : (
        <>
          {history.map((h, i) =>
            h.type === "input" ? (
              <div key={i} className={c.primary}>
                <span className="text-muted-foreground">umar@portfolio</span>
                <span className={c.muted}>:~$ </span>
                <span className={c.fg}>{h.node}</span>
              </div>
            ) : (
              <div key={i} className="pl-0">{h.node}</div>
            )
          )}
          {!animating && (
            <div className="flex flex-wrap gap-1.5 pt-1 pb-0.5">
              {SUGGESTIONS.map((s) => (
                <button
                  key={s}
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    typeAndRun(s);
                  }}
                  className="text-[11px] leading-none px-2 py-1 rounded border border-border text-muted-foreground hover:text-foreground hover:border-primary/60 transition-colors"
                >
                  {s}
                </button>
              ))}
            </div>
          )}

          <div className="flex items-center relative">
            <span className="text-muted-foreground shrink-0">umar@portfolio</span>
            <span className={`${c.muted} shrink-0`}>:~$&nbsp;</span>

            {/* Visible line: reflects exactly what's in the input, cursor sits right after it */}
            <span className="relative inline-flex items-center whitespace-pre">
              <span className={c.fg}>{input}</span>
              <span className="inline-block w-[7px] h-[15px] bg-primary/90 animate-blink ml-[1px] align-middle" />
            </span>

            {/* Invisible input capturing all keystrokes, overlaid on the full row */}
            <input
              ref={inputRef}
              autoFocus
              value={input}
              onChange={(e) => !animating && setInput(e.target.value)}
              onKeyDown={onKeyDown}
              disabled={animating}
              spellCheck={false}
              autoComplete="off"
              autoCorrect="off"
              autoCapitalize="off"
              aria-label="terminal input"
              className="absolute inset-0 w-full h-full opacity-0 cursor-text"
            />
          </div>
          <div ref={bottomRef} />
        </>
      )}
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  ROOT COMPONENT                                                     */
/* ------------------------------------------------------------------ */

type Tab = "bio" | "agent" | "zsh";

const TABS: { id: Tab; label: string; icon: typeof FileJson2; iconClass: string }[] = [
  { id: "bio", label: "bio.json", icon: FileJson2, iconClass: "text-orange-400" },
  { id: "agent", label: "agent.py", icon: FileCode2, iconClass: "text-sky-400" },
  { id: "zsh", label: "zsh", icon: TerminalSquare, iconClass: "text-emerald-400" },
];

export function TerminalHero() {
  const [tab, setTab] = useState<Tab>("zsh");

  return (
    <div className="bg-card/90 backdrop-blur-sm rounded-lg border border-border shadow-2xl overflow-hidden font-mono text-sm">
      {/* Title bar */}
      <div className="flex items-center gap-2 px-4 py-3 border-b border-border">
        <div className="w-3 h-3 rounded-full bg-destructive/70" />
        <div className="w-3 h-3 rounded-full bg-muted-foreground/60" />
        <div className="w-3 h-3 rounded-full bg-primary/80" />
        <span className="text-muted-foreground text-xs ml-3">umar-portfolio</span>
      </div>

      {/* Tab bar */}
      <div className="flex items-center border-b border-border px-1">
        {TABS.map(({ id, label, icon: Icon, iconClass }) => (
          <button
            key={id}
            onClick={() => setTab(id)}
            className={`flex items-center gap-2 px-3 py-2 text-xs border-b-2 transition-colors ${
              tab === id
                ? "border-primary text-foreground bg-card"
                : "border-transparent text-muted-foreground hover:text-foreground"
            }`}
          >
            <Icon className={`w-3.5 h-3.5 ${iconClass}`} />
            {label}
          </button>
        ))}
      </div>

      {/* Content */}
      <div className="p-5 md:p-6 min-h-[300px]">
        {tab === "bio" && <BioJsonView />}
        {tab === "agent" && <AgentPyView />}
        {tab === "zsh" && <ZshView />}
      </div>
    </div>
  );
}