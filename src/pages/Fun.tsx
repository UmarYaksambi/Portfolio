import { useEffect, useRef, useState } from "react";
import { Layout } from "@/components/layout/Layout";
import { CodeDivider } from "@/components/ui/CodeDivider";
import { Button } from "@/components/ui/button";
import { Sparkles, Gamepad2, Terminal, Trophy, Coffee, Music } from "lucide-react";

/* -------- Matrix rain -------- */
function MatrixRain() {
  const ref = useRef<HTMLCanvasElement>(null);
  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let raf = 0;
    const resize = () => {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
    };
    resize();
    window.addEventListener("resize", resize);

    const chars = "アイウエオカキクケコサシスセソタチツテトナニヌネノ0123456789<>{}[]/;:.=+".split("");
    const fontSize = 14;
    let columns = Math.floor(canvas.width / fontSize);
    let drops = Array(columns).fill(1);

    let lastResize = 0;
    const draw = (t: number) => {
      if (t - lastResize > 500) {
        const nextCols = Math.floor(canvas.width / fontSize);
        if (nextCols !== columns) {
          columns = nextCols;
          drops = Array(columns).fill(1);
        }
        lastResize = t;
      }
      ctx.fillStyle = "rgba(10, 10, 10, 0.08)";
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      ctx.fillStyle = "hsl(130 100% 50%)";
      ctx.font = `${fontSize}px "JetBrains Mono", monospace`;
      for (let i = 0; i < drops.length; i++) {
        const text = chars[Math.floor(Math.random() * chars.length)];
        ctx.fillText(text, i * fontSize, drops[i] * fontSize);
        if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) drops[i] = 0;
        drops[i]++;
      }
      raf = requestAnimationFrame(draw);
    };
    raf = requestAnimationFrame(draw);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return <canvas ref={ref} className="absolute inset-0 w-full h-full" />;
}

/* -------- Konami code detector -------- */
const KONAMI = [
  "ArrowUp", "ArrowUp", "ArrowDown", "ArrowDown",
  "ArrowLeft", "ArrowRight", "ArrowLeft", "ArrowRight",
  "b", "a",
];
function useKonami(onUnlock: () => void) {
  const bufRef = useRef<string[]>([]);
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      bufRef.current = [...bufRef.current, e.key].slice(-KONAMI.length);
      const match = bufRef.current.every((k, i) => k.toLowerCase() === KONAMI[i].toLowerCase());
      if (match && bufRef.current.length === KONAMI.length) onUnlock();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onUnlock]);
}

/* -------- Guess-the-log game -------- */
const LOG_RIDDLES = [
  { log: "TypeError: Cannot read properties of undefined (reading 'map')", tag: "You forgot to check if the array exists. Classic 3am bug." },
  { log: "CORS policy: No 'Access-Control-Allow-Origin' header", tag: "Every fullstack dev has cried at this at least once." },
  { log: "npm ERR! peer dep missing", tag: "Delete node_modules. Say a prayer. Reinstall." },
  { log: "Segmentation fault (core dumped)", tag: "Somewhere, a pointer just went sightseeing." },
  { log: "429 Too Many Requests", tag: "The API is asking you to please, please stop." },
];

const FACTS = [
  { icon: Coffee, text: "Runs on 3 espresso shots and one existential question per day." },
  { icon: Terminal, text: "Uses `git commit -m 'stuff'` more than a senior engineer should." },
  { icon: Music, text: "Best code is written between 1AM and 3AM. Second best while a train passes." },
  { icon: Trophy, text: "Once debugged a race condition by unplugging the router. It worked. Still don't know why." },
  { icon: Gamepad2, text: "Believes competitive programming ruined and improved his life in equal measure." },
  { icon: Sparkles, text: "If a project sounds like a bad idea at first, it's probably next on the list." },
];

export default function Fun() {
  const [egg, setEgg] = useState(false);
  const [logIdx, setLogIdx] = useState(0);
  useKonami(() => setEgg(true));

  return (
    <Layout>
      {/* Hero */}
      <section className="relative py-20 overflow-hidden border-b border-border">
        <div className="absolute inset-0 opacity-20 pointer-events-none">
          <MatrixRain />
        </div>
        <div className="container relative z-10">
          <div className="max-w-2xl opacity-0 animate-fade-in-up">
            <p className="font-mono text-xs text-primary mb-3">{"// /fun.zone"}</p>
            <h1 className="text-3xl md:text-5xl font-bold text-foreground mb-4">
              The <span className="text-primary">off-the-clock</span> room.
            </h1>
            <p className="text-muted-foreground leading-relaxed">
              Konami codes, terminal muscle memory, and the parts of engineering that only
              make sense if you've stared at logs at 2AM.{" "}
              <span className="text-primary">Try the Konami code.</span> Seriously.
            </p>
          </div>
        </div>
      </section>

      {/* Konami reveal */}
      {egg && (
        <section className="py-8 bg-primary/10 border-b border-primary/30 animate-fade-in">
          <div className="container text-center font-mono text-primary">
            🎮 Konami code unlocked. You get one internet cookie 🍪. And my respect.
          </div>
        </section>
      )}

      {/* Fun facts */}
      <section className="py-20">
        <div className="container">
          <div className="opacity-0 animate-fade-in-up">
            <CodeDivider label="Unverified Facts" />
          </div>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {FACTS.map((f, i) => (
              <div
                key={f.text}
                className="p-6 rounded-lg border border-border bg-card/60 hover:border-primary/40 hover:-translate-y-1 transition-all opacity-0 animate-fade-in-up"
                style={{ animationDelay: `${0.1 + i * 0.08}s` }}
              >
                <f.icon className="w-5 h-5 text-primary mb-3" />
                <p className="text-sm text-muted-foreground leading-relaxed">{f.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Log guesser */}
      <section className="py-20 border-t border-border">
        <div className="container max-w-3xl">
          <div className="opacity-0 animate-fade-in-up">
            <CodeDivider label="Guess the pain" />
          </div>
          <p className="text-muted-foreground mb-6">
            Every dev has seen these logs. Read the message. Nod knowingly. Reveal the truth.
          </p>

          <div className="rounded-lg border border-border bg-card overflow-hidden opacity-0 animate-fade-in-up stagger-1">
            <div className="flex items-center gap-2 px-4 py-2 border-b border-border bg-secondary/50">
              <span className="w-3 h-3 rounded-full bg-destructive/70" />
              <span className="w-3 h-3 rounded-full bg-yellow-500/70" />
              <span className="w-3 h-3 rounded-full bg-primary/70" />
              <span className="font-mono text-xs text-muted-foreground ml-2">
                stderr — log #{logIdx + 1}/{LOG_RIDDLES.length}
              </span>
            </div>
            <div className="p-6 font-mono text-sm">
              <div className="text-destructive break-all">
                <span className="text-muted-foreground">$</span> {LOG_RIDDLES[logIdx].log}
              </div>
              <div className="mt-4 text-primary">
                <span className="text-muted-foreground">{"//"}</span> {LOG_RIDDLES[logIdx].tag}
              </div>
            </div>
            <div className="flex items-center justify-between px-4 py-3 border-t border-border bg-background/50">
              <span className="font-mono text-xs text-muted-foreground">
                been there, cried that.
              </span>
              <Button
                size="sm"
                variant="outline"
                className="font-mono"
                onClick={() => setLogIdx((v) => (v + 1) % LOG_RIDDLES.length)}
              >
                Next log →
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Stack trace poem */}
      <section className="py-20 border-t border-border">
        <div className="container max-w-3xl">
          <div className="opacity-0 animate-fade-in-up">
            <CodeDivider label="A haiku, in Python" />
          </div>
          <pre className="p-6 rounded-lg border border-border bg-card/60 font-mono text-sm text-foreground overflow-x-auto opacity-0 animate-fade-in-up stagger-1">
{`def life():
    while True:
        try:
            ship_it()
        except Exception as e:
            learn(e)
            coffee()`}
          </pre>
          <p className="text-center text-xs text-muted-foreground font-mono mt-6 opacity-0 animate-fade-in-up stagger-2">
            {"// end of /fun.zone — thanks for scrolling."}
          </p>
        </div>
      </section>
    </Layout>
  );
}
