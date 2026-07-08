const snippets = [
  { code: 'console.log("Hello World")', top: "6%", left: "8%" },
  { code: "import tensorflow as tf", top: "3%", left: "72%" },
  { code: "while(!awake) meditate();", top: "4%", left: "42%" },
  { code: 'echo "Code is poetry"', top: "92%", left: "60%" },
  { code: "sudo launch singularity", top: "95%", left: "20%" },
  { code: "const ai = new Brain()", top: "30%", left: "2%" },
  { code: "#include <neural_net>", top: "58%", left: "1%" },
  { code: "SELECT * FROM future", top: "14%", left: "88%" },
  { code: "npm install innovation", top: "50%", left: "90%" },
  { code: "function becomeLegend() {}", top: "74%", left: "86%" },
  { code: "def dream(): pass", top: "48%", left: "50%" },
  { code: "let code = breathe();", top: "66%", left: "38%" },
  { code: "<AI selfAware={true} />", top: "22%", left: "58%" },
  { code: "git push origin main", top: "36%", left: "70%" },
  { code: "for i in range(42): think()", top: "70%", left: "55%" },
  { code: "export GPT_LEVEL=∞", top: "82%", left: "45%" },
];

export function CodeSnippetsBackdrop() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none select-none">
      {/* animated grid */}
      <div
        className="absolute inset-0 opacity-40"
        style={{
          backgroundImage: `
            linear-gradient(hsl(var(--primary) / 0.06) 1px, transparent 1px),
            linear-gradient(90deg, hsl(var(--primary) / 0.06) 1px, transparent 1px)
          `,
          backgroundSize: "50px 50px",
          animation: "grid-move 20s linear infinite",
        }}
      />
      {/* radial fade */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-background/40 to-background" />
      {/* code snippets */}
      {snippets.map((s, i) => (
        <div
          key={i}
          className="absolute font-mono text-xs md:text-sm text-primary/15 whitespace-nowrap"
          style={{ top: s.top, left: s.left }}
        >
          {s.code}
        </div>
      ))}
      <style>{`
        @keyframes grid-move {
          0% { transform: translate(0, 0); }
          100% { transform: translate(50px, 50px); }
        }
      `}</style>
    </div>
  );
}
