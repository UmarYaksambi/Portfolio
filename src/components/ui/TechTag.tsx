import { cn } from "@/lib/utils";

interface TechTagProps {
  children: string;
  className?: string;
}

export function TechTag({ children, className }: TechTagProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-sm border border-border bg-secondary px-2 py-1 font-mono text-xs text-muted-foreground",
        className
      )}
    >
      {children}
    </span>
  );
}
