import { useCallback, useEffect, useRef, useState } from "react";
import { Moon, Sun } from "lucide-react";
import { flushSync } from "react-dom";
import { cn } from "@/lib/utils";

type AnimationType = "none" | "split-vertical" | "circle-spread";

interface ToggleThemeProps extends React.ComponentPropsWithoutRef<"button"> {
  duration?: number;
  animationType?: AnimationType;
}

export const ToggleTheme = ({
  className,
  duration = 500,
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
      // Reveal: new theme fades in
      document.documentElement.animate(
        [{ opacity: 0 }, { opacity: 1 }],
        {
          duration: duration * 0.75,
          easing: "ease-in",
          pseudoElement: "::view-transition-new(root)",
        },
      );
      // Old theme splits apart down the middle (reconstruction effect)
      document.documentElement.animate(
        [
          { clipPath: "inset(0 0 0 0)", transform: "none" },
          { clipPath: "inset(0 40% 0 40%)", transform: "scale(1.2)" },
          { clipPath: "inset(0 50% 0 50%)", transform: "scale(1)" },
        ],
        {
          duration: duration * 1.5,
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
        aria-label="Toggle theme"
        title="Toggle theme"
        className={cn(
          "inline-flex h-9 w-9 items-center justify-center rounded-md border border-border bg-secondary/60 text-muted-foreground transition-all hover:border-primary/60 hover:text-primary",
          className,
        )}
        {...props}
      >
        {isDark ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
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
