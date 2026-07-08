import { useParams, Link } from "react-router-dom";
import { Layout } from "@/components/layout/Layout";
import { CodeDivider } from "@/components/ui/CodeDivider";
import { TechTag } from "@/components/ui/TechTag";
import { ArrowLeft, ExternalLink, Github } from "lucide-react";
import { Button } from "@/components/ui/button";

const projectsData: Record<
  string,
  {
    name: string;
    fullDescription: string;
    stack: string[];
    impact: string;
    challenges: string[];
    features: string[];
    repo?: string;
  }
> = {
  "adaptive-defenses-wireless-iot": {
    name: "Adaptive Defenses for Wireless IoT Networks",
    fullDescription:
      "A research-driven simulation of jamming attacks on wireless IoT networks, using game-theoretic modeling combined with Q-learning to derive adaptive defense strategies that outperform static countermeasures.",
    stack: ["Python", "Game Theory", "Q-Learning", "NumPy", "Matplotlib"],
    impact: "7% performance improvement over static defenses",
    challenges: [
      "Modeling attacker–defender interactions as a repeated stochastic game",
      "Balancing exploration vs exploitation in the defender policy",
      "Simulating realistic jamming patterns at scale",
      "Comparing against multiple static and heuristic baselines",
    ],
    features: [
      "Q-learning defender agent with tunable reward shaping",
      "Multi-strategy jammer models (constant, random, reactive)",
      "Comparative benchmarking harness with reproducible seeds",
      "Publication-ready plots and metrics export",
    ],
    repo: "https://github.com/UmarYaksambi/Adaptive-Defense-Wireless-Networks",
  },
  "federated-healthcare-chatbot": {
    name: "Federated Learning Healthcare Chatbot (Vital)",
    fullDescription:
      "Vital is a privacy-preserving healthcare chatbot that trains across multiple simulated hospitals using federated learning, layered with differential privacy so raw patient data never leaves the source.",
    stack: ["Flower", "TensorFlow Federated", "PyTorch", "Llama 7B"],
    impact: "End-to-end differential privacy across federated nodes",
    challenges: [
      "Fine-tuning a 7B LLM in a federated setting under memory constraints",
      "Applying differential privacy without collapsing utility",
      "Handling non-IID data distributions across simulated hospitals",
      "Designing a clinician-friendly conversational UX on top of the model",
    ],
    features: [
      "Federated fine-tuning pipeline with Flower + PyTorch",
      "Differential privacy noise injection at aggregation",
      "Domain-adapted medical Q&A prompts",
      "Reproducible multi-client simulation harness",
    ],
    repo: "https://github.com/UmarYaksambi/Vital",
  },
  "disaster-communication-framework": {
    name: "Disaster Communication Framework",
    fullDescription:
      "An ESP32-based mesh network built with ESP-NOW that keeps communities connected during disasters when internet infrastructure is down, and integrates 5 environmental sensors to predict and warn about impending hazards.",
    stack: ["Embedded C", "ESP32", "ESP-NOW", "IoT", "Sensor Fusion"],
    impact: "Offline mesh comms + 5-sensor disaster prediction",
    challenges: [
      "Building a resilient mesh routing layer on constrained hardware",
      "Fusing readings from 5 heterogeneous sensors reliably",
      "Managing power on battery-only nodes",
      "Designing a fallback protocol for node loss",
    ],
    features: [
      "Peer-to-peer ESP-NOW mesh with auto-discovery",
      "Sensor fusion pipeline for disaster event prediction",
      "Low-power sleep cycling for extended field runtime",
      "Simple broadcast messaging for last-mile alerts",
    ],
    repo: "https://github.com/UmarYaksambi/Disaster-Resilience-Using-ESP_NOW",
  },
  "invisibility-cloak": {
    name: "Invisibility Cloak",
    fullDescription:
      "A classic computer vision toy taken further with modern segmentation. Captures a clean background, then in real time masks out a specific colored cloak and composites the background over it — making the wearer 'disappear' on video.",
    stack: ["OpenCV", "YOLO", "Python", "NumPy"],
    impact: "Real-time segmentation & background compositing",
    challenges: [
      "Robust color segmentation under varying lighting",
      "Reducing edge flicker between frames",
      "Keeping the pipeline real-time on commodity webcams",
      "Handling non-static backgrounds gracefully",
    ],
    features: [
      "HSV-based color masking with morphological cleanup",
      "Optional YOLO-assisted object detection",
      "Webcam-realtime compositing pipeline",
      "Configurable cloak color and sensitivity",
    ],
    repo: "https://github.com/UmarYaksambi/The_Invisiblity_Cloak",
  },
};

export default function ProjectDetail() {
  const { slug } = useParams<{ slug: string }>();
  const project = slug ? projectsData[slug] : null;

  if (!project) {
    return (
      <Layout>
        <section className="py-20">
          <div className="container text-center">
            <h1 className="text-3xl font-bold text-foreground mb-4">Project Not Found</h1>
            <p className="text-muted-foreground mb-8">
              The project you're looking for doesn't exist.
            </p>
            <Button asChild>
              <Link to="/work">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back to Work
              </Link>
            </Button>
          </div>
        </section>
      </Layout>
    );
  }

  return (
    <Layout>
      <section className="py-20">
        <div className="container max-w-4xl">
          <Link
            to="/work"
            className="inline-flex items-center font-mono text-sm text-muted-foreground hover:text-primary transition-colors mb-8 opacity-0 animate-fade-in-up"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Work
          </Link>

          <div className="mb-12 opacity-0 animate-fade-in-up stagger-1">
            <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              {project.name}
            </h1>
            <p className="text-lg text-muted-foreground leading-relaxed mb-6">
              {project.fullDescription}
            </p>

            <div className="flex flex-wrap gap-2 mb-6">
              {project.stack.map((tech) => (
                <TechTag key={tech}>{tech}</TechTag>
              ))}
            </div>

            <div className="p-4 bg-primary/5 border border-primary/20 rounded-lg">
              <span className="font-mono text-sm text-primary">
                <span className="text-muted-foreground">{"//"}</span> Impact: {project.impact}
              </span>
            </div>
          </div>

          <div className="opacity-0 animate-fade-in-up stagger-2">
            <CodeDivider label="Challenges" />
          </div>
          <div className="mb-12 opacity-0 animate-fade-in-up stagger-3">
            <ul className="space-y-3">
              {project.challenges.map((c, i) => (
                <li key={i} className="flex items-start gap-3">
                  <span className="font-mono text-primary mt-1">→</span>
                  <span className="text-muted-foreground">{c}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="opacity-0 animate-fade-in-up stagger-3">
            <CodeDivider label="Features" />
          </div>
          <div className="mb-12 opacity-0 animate-fade-in-up stagger-4">
            <ul className="space-y-3">
              {project.features.map((f, i) => (
                <li key={i} className="flex items-start gap-3">
                  <span className="font-mono text-primary mt-1">✓</span>
                  <span className="text-muted-foreground">{f}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="flex flex-wrap gap-4 pt-8 border-t border-border opacity-0 animate-fade-in-up stagger-4">
            {project.repo && (
              <Button asChild variant="outline" className="font-mono">
                <a href={project.repo} target="_blank" rel="noreferrer">
                  <Github className="mr-2 h-4 w-4" />
                  View Code
                </a>
              </Button>
            )}
            <Button variant="outline" className="font-mono" disabled>
              <ExternalLink className="mr-2 h-4 w-4" />
              Live Demo
            </Button>
          </div>
        </div>
      </section>
    </Layout>
  );
}
