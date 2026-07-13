import { Layout } from "@/components/layout/Layout";
import { CodeDivider } from "@/components/ui/CodeDivider";
import { CodeLabel } from "@/components/ui/CodeLabel";
import { TechTag } from "@/components/ui/TechTag";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function Styleguide() {
  return (
    <Layout>
      <section className="py-20">
        <div className="container">
          {/* Page Header */}
          <div className="mb-12 max-w-2xl">
            <h1 className="mb-4 text-3xl font-bold text-foreground md:text-4xl">Styleguide</h1>
            <p className="leading-relaxed text-muted-foreground">
              Design system documentation. A reference for colors, typography, and reusable
              components that make up this portfolio.
            </p>
          </div>

          {/* Colors */}
          <CodeDivider label="Colors" />
          <div className="mb-16 grid gap-4 md:grid-cols-4">
            <div className="space-y-2">
              <div className="h-20 rounded-lg border border-border bg-background" />
              <p className="font-mono text-xs text-muted-foreground">--background</p>
              <p className="font-mono text-xs text-foreground">Deep Black</p>
            </div>
            <div className="space-y-2">
              <div className="h-20 rounded-lg border border-border bg-card" />
              <p className="font-mono text-xs text-muted-foreground">--card</p>
              <p className="font-mono text-xs text-foreground">Graphite</p>
            </div>
            <div className="space-y-2">
              <div className="h-20 rounded-lg bg-primary" />
              <p className="font-mono text-xs text-muted-foreground">--primary</p>
              <p className="font-mono text-xs text-foreground">Neon Green</p>
            </div>
            <div className="space-y-2">
              <div className="h-20 rounded-lg border border-border bg-muted" />
              <p className="font-mono text-xs text-muted-foreground">--muted</p>
              <p className="font-mono text-xs text-foreground">Subtle Gray</p>
            </div>
          </div>

          {/* Typography */}
          <CodeDivider label="Typography" />
          <div className="mb-16 space-y-8">
            <div className="space-y-4">
              <p className="font-mono text-xs text-primary">/* Headings - Inter */</p>
              <h1 className="text-4xl font-bold">Heading 1</h1>
              <h2 className="text-3xl font-bold">Heading 2</h2>
              <h3 className="text-2xl font-semibold">Heading 3</h3>
              <h4 className="text-xl font-semibold">Heading 4</h4>
            </div>
            <div className="space-y-4">
              <p className="font-mono text-xs text-primary">/* Body - Inter */</p>
              <p className="text-base text-foreground">
                Body text in regular weight. Used for paragraphs and main content.
              </p>
              <p className="text-sm text-muted-foreground">
                Smaller muted text for secondary information and descriptions.
              </p>
            </div>
            <div className="space-y-4">
              <p className="font-mono text-xs text-primary">/* Mono - JetBrains Mono */</p>
              <p className="font-mono text-base">Monospace text for code and technical details.</p>
              <p className="font-mono text-sm text-muted-foreground">
                {"// Comments and syntax-style elements"}
              </p>
            </div>
          </div>

          {/* Buttons */}
          <CodeDivider label="Buttons" />
          <div className="mb-16 flex flex-wrap gap-4">
            <Button>Primary Button</Button>
            <Button variant="secondary">Secondary</Button>
            <Button variant="outline">Outline</Button>
            <Button variant="ghost">Ghost</Button>
            <Button variant="link">Link</Button>
          </div>

          {/* Cards */}
          <CodeDivider label="Cards" />
          <div className="mb-16 grid gap-4 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Card Title</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  Card content with muted text for descriptions and supporting information.
                </p>
              </CardContent>
            </Card>
            <Card className="border-primary/50">
              <CardHeader>
                <CardTitle>Highlighted Card</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  Card with accent border for emphasis and interactive states.
                </p>
              </CardContent>
            </Card>
          </div>

          {/* Labels & Tags */}
          <CodeDivider label="Labels & Tags" />
          <div className="space-y-6">
            <div className="space-y-2">
              <p className="font-mono text-xs text-muted-foreground">Code Labels</p>
              <div className="flex flex-wrap gap-4">
                <CodeLabel>Featured</CodeLabel>
                <CodeLabel>New</CodeLabel>
                <CodeLabel>In Progress</CodeLabel>
              </div>
            </div>
            <div className="space-y-2">
              <p className="font-mono text-xs text-muted-foreground">Tech Tags</p>
              <div className="flex flex-wrap gap-2">
                <TechTag>React</TechTag>
                <TechTag>TypeScript</TechTag>
                <TechTag>Node.js</TechTag>
                <TechTag>PostgreSQL</TechTag>
              </div>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
}
