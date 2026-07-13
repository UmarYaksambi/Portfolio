import { useEffect, useRef, useState, useCallback } from "react";
import { Link } from "react-router-dom";
import { Layout } from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Trophy, Zap } from "lucide-react";

/* ---------------- Game constants ---------------- */
const CANVAS_W = 800;
const CANVAS_H = 260;
const GROUND_Y = 210;
const GRAVITY = 0.9;
const JUMP_VELOCITY = -15;
const DUCK_HEIGHT = 22;
const RUN_HEIGHT = 40;
const RUN_WIDTH = 28;
const BASE_SPEED = 6;
const MAX_SPEED = 15;
const SPEED_RAMP = 0.0015;
const SPAWN_MIN = 55; // frames
const SPAWN_MAX = 110;

type ObstacleKind = "bug" | "log" | "tag";
interface Obstacle {
  x: number;
  w: number;
  h: number;
  kind: ObstacleKind;
  label: string;
}

const OBSTACLE_LABELS: Record<ObstacleKind, string[]> = {
  bug: ["🐛"],
  log: ["500", "404", "NaN", "null"],
  tag: ["</>", "{ }", ";;", "==="],
};

function randRange(a: number, b: number) {
  return a + Math.random() * (b - a);
}

/* ---------------- Component ---------------- */
export default function NotFound() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const rafRef = useRef(0);

  const stateRef = useRef({
    running: false,
    gameOver: false,
    started: false,
    y: 0,
    vy: 0,
    ducking: false,
    frame: 0,
    speed: BASE_SPEED,
    nextSpawn: 60,
    obstacles: [] as Obstacle[],
    score: 0,
    glitchTimer: 0,
  });

  const [uiScore, setUiScore] = useState(0);
  const [uiHigh, setUiHigh] = useState(0);
  const [uiGameOver, setUiGameOver] = useState(false);
  const [uiStarted, setUiStarted] = useState(false);

  useEffect(() => {
    const stored = Number(localStorage.getItem("404-runner-highscore") || 0);
    setUiHigh(stored);
  }, []);

  const resetGame = useCallback(() => {
    const s = stateRef.current;
    s.running = true;
    s.gameOver = false;
    s.started = true;
    s.y = 0;
    s.vy = 0;
    s.ducking = false;
    s.frame = 0;
    s.speed = BASE_SPEED;
    s.nextSpawn = 60;
    s.obstacles = [];
    s.score = 0;
    s.glitchTimer = 0;
    setUiGameOver(false);
    setUiStarted(true);
    setUiScore(0);
  }, []);

  const jump = useCallback(() => {
    const s = stateRef.current;
    if (!s.started || s.gameOver) {
      resetGame();
      return;
    }
    if (s.y === 0 && !s.ducking) {
      s.vy = JUMP_VELOCITY;
    }
  }, [resetGame]);

  const setDuck = useCallback((v: boolean) => {
    const s = stateRef.current;
    if (s.y === 0) s.ducking = v;
  }, []);

  /* ---- input ---- */
  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === " " || e.key === "ArrowUp") {
        e.preventDefault();
        jump();
      } else if (e.key === "ArrowDown") {
        e.preventDefault();
        setDuck(true);
      }
    };
    const onKeyUp = (e: KeyboardEvent) => {
      if (e.key === "ArrowDown") setDuck(false);
    };
    window.addEventListener("keydown", onKeyDown);
    window.addEventListener("keyup", onKeyUp);
    return () => {
      window.removeEventListener("keydown", onKeyDown);
      window.removeEventListener("keyup", onKeyUp);
    };
  }, [jump, setDuck]);

  /* ---- game loop ---- */
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const styles = getComputedStyle(document.documentElement);
    const primary = `hsl(${styles.getPropertyValue("--primary").trim() || "130 100% 50%"})`;
    const foreground = `hsl(${styles.getPropertyValue("--foreground").trim() || "0 0% 95%"})`;
    const muted = `hsl(${styles.getPropertyValue("--muted-foreground").trim() || "0 0% 60%"})`;

    const loop = () => {
      const s = stateRef.current;
      ctx.clearRect(0, 0, CANVAS_W, CANVAS_H);

      // ground
      ctx.strokeStyle = muted;
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.moveTo(0, GROUND_Y);
      ctx.lineTo(CANVAS_W, GROUND_Y);
      ctx.stroke();

      if (s.running && !s.gameOver) {
        // physics
        s.vy += GRAVITY;
        s.y += s.vy;
        if (s.y > 0) s.y = 0;
        if (s.y === 0) s.vy = 0;

        s.speed = Math.min(MAX_SPEED, BASE_SPEED + s.frame * SPEED_RAMP);
        s.frame++;
        s.score += s.speed * 0.05;

        // spawn obstacles
        s.nextSpawn -= 1;
        if (s.nextSpawn <= 0) {
          const kinds: ObstacleKind[] = ["bug", "log", "tag"];
          const kind = kinds[Math.floor(Math.random() * kinds.length)];
          const labels = OBSTACLE_LABELS[kind];
          const label = labels[Math.floor(Math.random() * labels.length)];
          const isTall = kind !== "log";
          s.obstacles.push({
            x: CANVAS_W + 20,
            w: kind === "log" ? 46 : 30,
            h: isTall ? RUN_HEIGHT : 24,
            kind,
            label,
          });
          s.nextSpawn = randRange(SPAWN_MIN, SPAWN_MAX) - s.speed * 2;
          if (s.nextSpawn < 30) s.nextSpawn = 30;
        }

        // move + collide
        const playerX = 80;
        const playerH = s.ducking ? DUCK_HEIGHT : RUN_HEIGHT;
        const playerY = GROUND_Y - playerH + s.y;

        for (const o of s.obstacles) {
          o.x -= s.speed;
        }
        s.obstacles = s.obstacles.filter((o) => o.x + o.w > -10);

        for (const o of s.obstacles) {
          const oy = GROUND_Y - o.h;
          const overlapX = playerX + RUN_WIDTH > o.x && playerX < o.x + o.w;
          const overlapY = playerY + playerH > oy;
          if (overlapX && overlapY) {
            s.gameOver = true;
            s.running = false;
            s.glitchTimer = 18;
            const high = Number(localStorage.getItem("404-runner-highscore") || 0);
            const finalScore = Math.floor(s.score);
            if (finalScore > high) {
              localStorage.setItem("404-runner-highscore", String(finalScore));
              setUiHigh(finalScore);
            }
            setUiScore(finalScore);
            setUiGameOver(true);
          }
        }

        setUiScore(Math.floor(s.score));
      }

      // glitch shake on death
      let shakeX = 0;
      let shakeY = 0;
      if (stateRef.current.glitchTimer > 0) {
        stateRef.current.glitchTimer--;
        shakeX = randRange(-4, 4);
        shakeY = randRange(-4, 4);
      }
      ctx.save();
      ctx.translate(shakeX, shakeY);

      // player
      const s2 = stateRef.current;
      const playerH2 = s2.ducking ? DUCK_HEIGHT : RUN_HEIGHT;
      const playerY2 = GROUND_Y - playerH2 + s2.y;
      ctx.fillStyle = s2.gameOver ? "hsl(0 84% 60%)" : primary;
      ctx.fillRect(80, playerY2, RUN_WIDTH, playerH2);
      ctx.fillStyle = "#0a0a0a";
      ctx.font = "10px 'JetBrains Mono', monospace";
      ctx.fillText(s2.gameOver ? ">.<" : s2.ducking ? "_o_" : "o_o", 84, playerY2 + 14);

      // obstacles
      ctx.font = "16px 'JetBrains Mono', monospace";
      for (const o of s2.obstacles) {
        const oy = GROUND_Y - o.h;
        ctx.strokeStyle = o.kind === "log" ? "hsl(0 84% 60%)" : foreground;
        ctx.strokeRect(o.x, oy, o.w, o.h);
        ctx.fillStyle = o.kind === "log" ? "hsl(0 84% 60%)" : foreground;
        ctx.font = "11px 'JetBrains Mono', monospace";
        ctx.fillText(o.label, o.x + 3, oy + o.h / 2 + 4);
      }

      ctx.restore();

      rafRef.current = requestAnimationFrame(loop);
    };

    rafRef.current = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(rafRef.current);
  }, []);

  const onCanvasTap = () => {
    jump();
  };

  return (
    <Layout>
      <section className="py-16 md:py-24">
        <div className="container max-w-3xl">
          <div className="mb-8 animate-fade-in-up text-center opacity-0">
            <p className="mb-3 font-mono text-xs text-primary">{"// 404 — route not found"}</p>
            <h1 className="mb-3 text-3xl font-bold text-foreground md:text-5xl">
              This page doesn't exist. <br className="hidden md:block" />
              But this game does.
            </h1>
            <p className="text-muted-foreground">
              At least something's broken on purpose now. Jump the bugs, dodge the logs.{" "}
              <span className="text-primary">Space</span> or{" "}
              <span className="text-primary">tap</span> to jump,{" "}
              <span className="text-primary">↓</span> to duck.
            </p>
          </div>

          <div className="stagger-1 animate-fade-in-up opacity-0">
            <div className="mb-2 flex items-center justify-between px-1">
              <span className="flex items-center gap-1.5 font-mono text-xs text-muted-foreground">
                <Zap className="h-3.5 w-3.5 text-primary" />
                score: <span className="tabular-nums text-foreground">{uiScore}</span>
              </span>
              <span className="flex items-center gap-1.5 font-mono text-xs text-muted-foreground">
                <Trophy className="h-3.5 w-3.5 text-primary" />
                best: <span className="tabular-nums text-foreground">{uiHigh}</span>
              </span>
            </div>

            <div
              className="relative cursor-pointer select-none overflow-hidden rounded-lg border border-border bg-card/60"
              onClick={onCanvasTap}
            >
              <canvas
                ref={canvasRef}
                width={CANVAS_W}
                height={CANVAS_H}
                className="block h-auto w-full"
              />

              {!uiStarted && (
                <div className="absolute inset-0 flex items-center justify-center bg-background/80 backdrop-blur-sm">
                  <div className="px-6 text-center">
                    <p className="mb-3 font-mono text-sm text-foreground">
                      Press Space, ↑, or tap to start
                    </p>
                    <Button onClick={jump} className="font-mono">
                      Start
                    </Button>
                  </div>
                </div>
              )}

              {uiGameOver && (
                <div className="absolute inset-0 flex animate-fade-in items-center justify-center bg-background/85 backdrop-blur-sm">
                  <div className="px-6 text-center">
                    <p className="mb-1 font-mono text-lg text-destructive">Game over.</p>
                    <p className="mb-4 font-mono text-xs text-muted-foreground">
                      score: {uiScore} {uiScore >= uiHigh && uiScore > 0 ? "— new best 🎉" : ""}
                    </p>
                    <Button onClick={jump} className="font-mono">
                      Try again
                    </Button>
                  </div>
                </div>
              )}
            </div>
          </div>

          <div className="stagger-2 mt-10 animate-fade-in-up text-center opacity-0">
            <Button asChild variant="outline" className="font-mono">
              <Link to="/">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back to something that exists
              </Link>
            </Button>
          </div>
        </div>
      </section>
    </Layout>
  );
}
