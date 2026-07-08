import { Link } from "react-router-dom";
import { Layout } from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { CodeDivider } from "@/components/ui/CodeDivider";
import { CodeLabel } from "@/components/ui/CodeLabel";
import { ProjectCard } from "@/components/ui/ProjectCard";
import { TerminalHero } from "@/components/TerminalHero";
import { CodeSnippetsBackdrop } from "@/components/CodeSnippetsBackdrop";
import { ArrowRight, Github, Linkedin, Mail } from "lucide-react";

const featuredProjects = [
  {
    name: "Adaptive Defenses for Wireless IoT Networks",
    slug: "adaptive-defenses-wireless-iot",
    description:
      "Dynamic defense strategies for IoT networks using game-theoretic models and Q-learning to counter jamming attacks.",
    stack: ["Python", "Game Theory", "Q-Learning"],
    impact: "7% performance improvement over baseline",
  },
  {
    name: "Federated Learning Healthcare Chatbot",
    slug: "federated-healthcare-chatbot",
    description:
      "Privacy-preserving healthcare chatbot with federated learning and differential privacy for secure patient data.",
    stack: ["Flower", "TF Federated", "PyTorch", "Llama 7B"],
    impact: "End-to-end differential privacy across nodes",
  },
  {
    name: "Disaster Communication Framework",
    slug: "disaster-communication-framework",
    description:
      "ESP32 mesh network for disaster-resilient communication without internet dependency, integrating 5 sensors for prediction.",
    stack: ["Embedded C", "ESP32", "IoT"],
    impact: "Offline mesh, 5-sensor disaster prediction",
  },
  {
    name: "Invisibility Cloak",
    slug: "invisibility-cloak",
    description:
      "Computer vision system that creates an invisibility illusion by capturing static background and overlaying it on cloaked objects.",
    stack: ["OpenCV", "YOLO", "Python"],
    impact: "Real-time segmentation & background compositing",
  },
];

export default function Home() {
  return (
    <Layout>
      {/* Hero */}
      <section className="relative min-h-[calc(100vh-4rem)] flex items-center overflow-hidden bg-background">
        <CodeSnippetsBackdrop />

        <div className="container relative z-10 py-16">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Terminal */}
            <div className="opacity-0 animate-fade-in-up order-2 lg:order-1">
              <TerminalHero />

              <div className="grid grid-cols-2 gap-4 mt-6">
                <div className="p-4 rounded-lg border border-border bg-card/60 backdrop-blur-sm hover:border-primary/50 transition-colors">
                  <div className="font-mono text-2xl font-bold text-primary">9.12</div>
                  <div className="text-xs text-muted-foreground font-mono mt-1">CGPA</div>
                </div>
                <div className="p-4 rounded-lg border border-border bg-card/60 backdrop-blur-sm hover:border-primary/50 transition-colors">
                  <div className="font-mono text-2xl font-bold text-primary">15+</div>
                  <div className="text-xs text-muted-foreground font-mono mt-1">Projects Shipped</div>
                </div>
              </div>
            </div>

            {/* Intro */}
            <div className="opacity-0 animate-fade-in-up stagger-1 order-1 lg:order-2">
              <CodeLabel className="mb-6">ML Engineer · CS Student · Builder</CodeLabel>

              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-6 leading-tight">
                Hi, I'm{" "}
                <span className="text-primary">Umar</span>.
                <br />
                <span className="text-muted-foreground text-3xl md:text-4xl lg:text-5xl">
                  I build intelligent, resilient systems
                </span>
                <span className="animate-blink text-primary ml-1">▍</span>
              </h1>

              <p className="text-base md:text-lg text-muted-foreground mb-8 max-w-xl leading-relaxed">
                CS student at RVCE, currently building Gaussian splatting pipelines at
                Samsung R&D and AI sales copilots at SpikedAI. I work at the intersection
                of machine learning, embedded systems, and full-stack engineering.
              </p>

              <div className="flex flex-wrap gap-3 mb-8">
                {["Python", "TensorFlow", "PyTorch", "C++", "React"].map((tech) => (
                  <span
                    key={tech}
                    className="px-3 py-1 rounded-full font-mono text-xs bg-secondary border border-border text-muted-foreground hover:border-primary/60 hover:text-primary transition-colors"
                  >
                    {tech}
                  </span>
                ))}
              </div>

              <div className="flex flex-wrap gap-4 mb-8">
                <Button asChild size="lg" className="font-mono transition-transform hover:scale-105">
                  <Link to="/work">
                    View Work
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
                <Button asChild size="lg" variant="outline" className="font-mono">
                  <Link to="/contact">Let's Connect</Link>
                </Button>
              </div>

              <div className="flex items-center gap-3">
                <a
                  href="mailto:umaryaksambi@gmail.com"
                  aria-label="Email"
                  className="p-2.5 rounded-md border border-border bg-card/60 text-muted-foreground hover:text-primary hover:border-primary/50 transition-colors"
                >
                  <Mail className="w-4 h-4" />
                </a>
                <a
                  href="https://github.com/UmarYaksambi"
                  target="_blank"
                  rel="noreferrer"
                  aria-label="GitHub"
                  className="p-2.5 rounded-md border border-border bg-card/60 text-muted-foreground hover:text-primary hover:border-primary/50 transition-colors"
                >
                  <Github className="w-4 h-4" />
                </a>
                <a
                  href="https://www.linkedin.com/in/umaryaksambi"
                  target="_blank"
                  rel="noreferrer"
                  aria-label="LinkedIn"
                  className="p-2.5 rounded-md border border-border bg-card/60 text-muted-foreground hover:text-primary hover:border-primary/50 transition-colors"
                >
                  <Linkedin className="w-4 h-4" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Projects */}
      <section className="py-20">
        <div className="container">
          <div className="opacity-0 animate-fade-in-up">
            <CodeDivider label="Featured Work" />
          </div>

          <div className="grid gap-6 md:grid-cols-2">
            {featuredProjects.map((project, index) => (
              <div
                key={project.name}
                className={`opacity-0 animate-fade-in-up stagger-${index + 1}`}
              >
                <ProjectCard {...project} className="hover-lift" />
              </div>
            ))}
          </div>

          <div className="mt-12 text-center opacity-0 animate-fade-in-up stagger-4">
            <Link
              to="/work"
              className="inline-flex items-center font-mono text-sm text-muted-foreground hover:text-primary transition-colors link-underline"
            >
              <span className="text-primary mr-2">{"//"}</span>
              View all projects
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>
    </Layout>
  );
}
