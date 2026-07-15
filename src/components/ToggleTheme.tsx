import { useCallback, useEffect, useRef, useState } from "react";
import { flushSync } from "react-dom";
import { cn } from "@/lib/utils";

type AnimationType = "none" | "split-vertical" | "circle-spread";

interface ToggleThemeProps extends React.ComponentPropsWithoutRef<"button"> {
  duration?: number;
  animationType?: AnimationType;
}

/**
 * A terminal-style theme toggle. Reads like a monospace boolean flag:
 *
 *   theme := [ dark | light ]
 *
 * The active token glows in the primary color; the whole pill flips with a
 * split-vertical View Transition so the page appears to reconstruct itself.
 */
export const ToggleTheme = ({
  className,
  duration = 550,
  animationType = "split-vertical",
  ...props
}: ToggleThemeProps) => {
  const [isDark, setIsDark] = useState(() =>
    typeof document !== "undefined" &&
    document.documentElement.classList.contains("dark"),
  );
  const buttonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const update = () =>
      setIsDark(document.documentElement.classList.contains("dark"));
    const observer = new MutationObserver(update);
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["class"],
    });
    return () => observer.disconnect();
  }, []);

  const applyTheme = useCallback(() => {
    const newIsDark = !document.documentElement.classList.contains("dark");
    document.documentElement.classList.toggle("dark", newIsDark);
    localStorage.setItem("theme", newIsDark ? "dark" : "light");
    setIsDark(newIsDark);
  }, []);

  const toggleTheme = useCallback(async () => {
    const doc = document as Document & {
      startViewTransition?: (cb: () => void) => { ready: Promise<void> };
    };
    if (!doc.startViewTransition || animationType === "none") {
      applyTheme();
      return;
    }

    const transition = doc.startViewTransition(() => {
      flushSync(() => {
        applyTheme();
      });
    });

    await transition.ready;

    if (animationType === "split-vertical") {
      document.documentElement.animate(
        [{ opacity: 0 }, { opacity: 1 }],
        {
          duration: duration * 0.8,
          easing: "ease-in",
          pseudoElement: "::view-transition-new(root)",
        },
      );
      document.documentElement.animate(
        [
          { clipPath: "inset(0 0 0 0)", transform: "none" },
          { clipPath: "inset(0 40% 0 40%)", transform: "scale(1.15)" },
          { clipPath: "inset(0 50% 0 50%)", transform: "scale(1)" },
        ],
        {
          duration: duration * 1.4,
          easing: "cubic-bezier(0.68, -0.55, 0.265, 1.55)",
          pseudoElement: "::view-transition-old(root)",
        },
      );
    } else if (animationType === "circle-spread" && buttonRef.current) {
      const { top, left, width, height } =
        buttonRef.current.getBoundingClientRect();
      const x = left + width / 2;
      const y = top + height / 2;
      const maxRadius = Math.hypot(
        Math.max(left, window.innerWidth - left),
        Math.max(top, window.innerHeight - top),
      );
      document.documentElement.animate(
        {
          clipPath: [
            `circle(0px at ${x}px ${y}px)`,
            `circle(${maxRadius}px at ${x}px ${y}px)`,
          ],
        },
        {
          duration,
          easing: "ease-in-out",
          pseudoElement: "::view-transition-new(root)",
        },
      );
    }
  }, [animationType, duration, applyTheme]);

  return (
    <>
      <button
        ref={buttonRef}
        onClick={toggleTheme}
        aria-label={`Switch to ${isDark ? "light" : "dark"} theme`}
        title={`theme := ${isDark ? "dark" : "light"}`}
        className={cn(
          "group relative inline-flex select-none items-center gap-1.5 rounded-md",
          "border border-border/70 bg-background/40 px-2.5 py-1 font-mono text-[11px] leading-none",
          "text-muted-foreground transition-all duration-300",
          "hover:border-primary/50 hover:bg-background/70 hover:text-foreground",
          "focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-primary/60",
          className,
        )}
        {...props}
      >
        <span className="text-primary/70">$</span>
        <span className="text-muted-foreground/80">theme</span>
        <span className="text-primary/60">:=</span>

        {/* dark token */}
        <span
          className={cn(
            "transition-all duration-300",
            isDark
              ? "text-primary [text-shadow:0_0_8px_hsl(var(--primary)/0.6)]"
              : "text-muted-foreground/50",
          )}
        >
          dark
        </span>

        <span className="text-muted-foreground/40">|</span>

        {/* light token */}
        <span
          className={cn(
            "transition-all duration-300",
            !isDark
              ? "text-primary [text-shadow:0_0_8px_hsl(var(--primary)/0.6)]"
              : "text-muted-foreground/50",
          )}
        >
          light
        </span>

        {/* blinking caret next to active */}
        <span
          aria-hidden
          className="ml-0.5 inline-block h-3 w-[2px] animate-blink bg-primary/80"
        />
      </button>
      <style
        dangerouslySetInnerHTML={{
          __html: `
            ::view-transition-old(root),
            ::view-transition-new(root) {
              animation: none;
              mix-blend-mode: normal;
            }
          `,
        }}
      />
    </>
  );
};

export default ToggleTheme;
