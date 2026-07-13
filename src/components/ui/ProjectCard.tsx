import { Link } from "react-router-dom";
import { TechTag } from "./TechTag";
import { cn } from "@/lib/utils";
import { ArrowRight } from "lucide-react";

interface ProjectCardProps {
  name: string;
  description: string;
  stack: string[];
  impact: string;
  slug: string;
  className?: string;
}

export function ProjectCard({
  name,
  description,
  stack,
  impact,
  slug,
  className,
}: ProjectCardProps) {
  return (
    <Link to={`/work/${slug}`}>
      <article
        className={cn(
          "group cursor-pointer rounded-lg border border-border bg-card p-6 transition-all hover:border-primary/50 hover:bg-card/80",
          className
        )}
      >
        {/* Project Name */}
        <div className="mb-2 flex items-center justify-between">
          <h3 className="font-mono text-lg font-medium text-foreground transition-colors group-hover:text-primary">
            {name}
          </h3>
          <ArrowRight className="h-4 w-4 text-muted-foreground transition-all group-hover:translate-x-1 group-hover:text-primary" />
        </div>

        {/* Description */}
        <p className="mb-4 text-sm leading-relaxed text-muted-foreground">{description}</p>

        {/* Tech Stack */}
        <div className="mb-4 flex flex-wrap gap-2">
          {stack.map((tech) => (
            <TechTag key={tech}>{tech}</TechTag>
          ))}
        </div>

        {/* Impact */}
        <div className="border-t border-border pt-4">
          <span className="font-mono text-xs text-primary">
            <span className="text-muted-foreground">{"//"}</span> {impact}
          </span>
        </div>
      </article>
    </Link>
  );
}
