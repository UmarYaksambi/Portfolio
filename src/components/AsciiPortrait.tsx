import { useEffect, useState } from "react";

interface AsciiPortraitProps {
  /** Precomputed character grid (array of equal-length row strings) from generate-ascii-portrait.html */
  data: string[];
  /** Total time to type the whole portrait in, in ms. Higher = slower, more visibly character-by-character. */
  typeDurationMs?: number;
  /** Character size, e.g. "6px", "8px". Controls overall rendered size. */
  fontSize?: string;
  className?: string;
}

// Sparse -> dense glyph ramp. Denser glyphs = brighter original pixel.
// Must match generate-ascii-portrait.html exactly.
const RAMP = " .:-=+*#%@";

function charBrightness(char: string) {
  const idx = RAMP.indexOf(char);
  return idx === -1 ? 0 : idx / (RAMP.length - 1);
}

export function AsciiPortrait({
  data,
  typeDurationMs = 6000,
  fontSize = "8px",
  className = "",
}: AsciiPortraitProps) {
  const totalChars = data.reduce((sum, row) => sum + row.length, 0);
  const [revealed, setRevealed] = useState(0);

  useEffect(() => {
    setRevealed(0);
    let raf = 0;
    const start = performance.now();

    const tick = (now: number) => {
      const elapsed = now - start;
      const progress = Math.min(1, elapsed / typeDurationMs);
      setRevealed(Math.floor(progress * totalChars));
      if (progress < 1) {
        raf = requestAnimationFrame(tick);
      }
    };

    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [data, typeDurationMs, totalChars]);

  // Only rows/characters actually "typed" so far get rendered at all —
  // nothing beyond the reveal point exists in the DOM yet. That means the
  // block's height grows as it types, which pushes everything below it
  // (Languages, Frameworks, etc.) down along with it, like real terminal
  // output printing line by line.
  const visibleRows: string[] = [];
  let remaining = revealed;
  for (const row of data) {
    if (remaining <= 0) break;
    if (remaining >= row.length) {
      visibleRows.push(row);
      remaining -= row.length;
    } else {
      visibleRows.push(row.slice(0, remaining));
      remaining = 0;
    }
  }

  const columnWidth = data[0]?.length ?? 0;

  return (
    <div className={`flex justify-center ${className}`}>
      <pre
        className="select-none whitespace-pre font-mono leading-[0.85]"
        style={{ fontSize, width: `${columnWidth}ch` }}
      >
        {visibleRows.map((row, y) => (
          <div key={y}>
            {row.split("").map((char, x) => (
              <span key={x} style={{ color: `hsl(130 100% ${28 + charBrightness(char) * 55}%)` }}>
                {char}
              </span>
            ))}
          </div>
        ))}
      </pre>
    </div>
  );
}
