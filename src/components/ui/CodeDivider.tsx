import { cn } from "@/lib/utils";
import DecryptedText from "@/components/DecryptedText";

interface CodeDividerProps {
  label: string;
  className?: string;
}

export function CodeDivider({ label, className }: CodeDividerProps) {
  return (
    <div className={cn("flex items-center gap-4 py-8", className)}>
      <span className="font-mono text-sm text-primary">//</span>
      <span className="font-mono text-sm text-muted-foreground">
        <DecryptedText
          text={label}
          animateOn="view"
          sequential
          revealDirection="start"
          speed={45}
          maxIterations={12}
          className="text-muted-foreground"
          encryptedClassName="text-primary/70"
        />
      </span>
      <div className="flex-1 h-px bg-border" />
    </div>
  );
}
