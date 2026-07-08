import { Layout } from "@/components/layout/Layout";
import { CodeDivider } from "@/components/ui/CodeDivider";
import { ProjectCard } from "@/components/ui/ProjectCard";

const projects = [
  {
    name: "Adaptive Defenses for Wireless IoT Networks",
    slug: "adaptive-defenses-wireless-iot",
    description:
      "Dynamic defense strategies for IoT networks using game-theoretic models and Q-learning to counter adaptive jamming attacks, benchmarked against static defenses.",
    stack: ["Python", "Game Theory", "Q-Learning", "NumPy"],
    impact: "7% performance improvement over baseline defenses",
  },
  {
    name: "Federated Learning Healthcare Chatbot (Vital)",
    slug: "federated-healthcare-chatbot",
    description:
      "Privacy-preserving healthcare chatbot combining federated learning with differential privacy so patient data never leaves the source hospital.",
    stack: ["Flower", "TF Federated", "PyTorch", "Llama 7B"],
    impact: "End-to-end differential privacy across federated nodes",
  },
  {
    name: "Disaster Communication Framework",
    slug: "disaster-communication-framework",
    description:
      "ESP32-based mesh network for disaster-resilient communication without internet dependency, integrating 5 sensors for early disaster prediction.",
    stack: ["Embedded C", "ESP32", "ESP-NOW", "IoT"],
    impact: "Offline mesh comms + 5-sensor disaster prediction",
  },
  {
    name: "Invisibility Cloak",
    slug: "invisibility-cloak",
    description:
      "Computer vision system that creates an invisibility illusion by capturing a static background and compositing it over cloaked objects in real time.",
    stack: ["OpenCV", "YOLO", "Python"],
    impact: "Real-time segmentation & background compositing",
  },
];

export default function Work() {
  return (
    <Layout>
      <section className="py-20">
        <div className="container">
          <div className="max-w-2xl mb-12 opacity-0 animate-fade-in-up">
            <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              Work
            </h1>
            <p className="text-muted-foreground leading-relaxed">
              A selection of projects across machine learning, embedded systems, and
              computer vision. Each one solves a real problem — from network security
              to disaster response — with measurable results.
            </p>
          </div>

          <div className="opacity-0 animate-fade-in-up stagger-1">
            <CodeDivider label="Projects" />
          </div>

          <div className="grid gap-8">
            {projects.map((project, index) => (
              <div
                key={project.name}
                className={`opacity-0 animate-fade-in-up stagger-${Math.min(index + 2, 4)}`}
              >
                <ProjectCard {...project} className="hover-lift" />
              </div>
            ))}
          </div>

          <div className="mt-16 p-6 rounded-lg border border-border bg-card/60 text-center opacity-0 animate-fade-in-up stagger-4">
            <p className="font-mono text-sm text-primary mb-2">
              {"//"} More projects coming soon
            </p>
            <p className="text-sm text-muted-foreground">
              Currently working on Gaussian splatting research and new autonomous systems experiments.
            </p>
          </div>
        </div>
      </section>
    </Layout>
  );
}
