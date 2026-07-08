import { useEffect, useState } from "react";

const lines = [
  { text: "$ whoami", tone: "primary" as const },
  { text: "Muhammad Umar Yaksambi", tone: "fg" as const },
  { text: "$ cat skills.txt", tone: "primary" as const },
  { text: "→ Machine Learning Engineer", tone: "muted" as const },
  { text: "→ Autonomous Vehicle Developer", tone: "muted" as const },
  { text: "→ Full-Stack Engineer", tone: "muted" as const },
  { text: "→ AI Research Intern @ Samsung R&D", tone: "muted" as const },
  { text: "$ ls achievements/", tone: "primary" as const },
  { text: "CGPA_9.12.txt  Samsung_Intern.log  NPTEL_Gold.cert", tone: "muted" as const },
  { text: "$ echo $STATUS", tone: "primary" as const },
  { text: "Ready to innovate & collaborate.", tone: "primary" as const },
  { text: "$ _", tone: "primary" as const },
];

const toneClass = {
  primary: "text-primary",
  fg: "text-foreground",
  muted: "text-muted-foreground",
};

export function TerminalHero() {
  const [displayed, setDisplayed] = useState<number[]>([]);
  const [current, setCurrent] = useState(0);
  const [typed, setTyped] = useState("");

  useEffect(() => {
    if (current >= lines.length) return;
    const line = lines[current].text;
    let i = 0;
    setTyped("");
    const id = setInterval(() => {
      i++;
      setTyped(line.slice(0, i));
      if (i >= line.length) {
        clearInterval(id);
        setTimeout(() => {
          setDisplayed((prev) => [...prev, current]);
          setCurrent((prev) => prev + 1);
        }, 350);
      }
    }, 22);
    return () => clearInterval(id);
  }, [current]);

  return (
    <div className="bg-card/90 backdrop-blur-sm rounded-lg border border-border p-5 md:p-6 font-mono text-sm shadow-2xl">
      {/* Terminal chrome */}
      <div className="flex items-center gap-2 mb-4 pb-3 border-b border-border">
        <div className="w-3 h-3 rounded-full bg-destructive/70" />
        <div className="w-3 h-3 rounded-full bg-muted-foreground/60" />
        <div className="w-3 h-3 rounded-full bg-primary/80" />
        <span className="text-muted-foreground text-xs ml-3">umar@portfolio:~</span>
      </div>

      {/* Lines */}
      <div className="space-y-2 min-h-[260px]">
        {displayed.map((idx) => (
          <div key={idx} className={toneClass[lines[idx].tone]}>
            {lines[idx].text}
          </div>
        ))}
        {current < lines.length && (
          <div className={toneClass[lines[current].tone]}>
            {typed}
            <span className="animate-blink text-primary">▍</span>
          </div>
        )}
      </div>
    </div>
  );
}
