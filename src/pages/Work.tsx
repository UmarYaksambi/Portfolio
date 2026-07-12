import { Layout } from "@/components/layout/Layout";
import { CodeDivider } from "@/components/ui/CodeDivider";
import { ProjectCard } from "@/components/ui/ProjectCard";
import DecryptedText from "@/components/DecryptedText";

const projects = [
  {
    name: "Thrive Learning Platform",
    slug: "thrive-learning-platform",
    description:
      "Offline-first educational PWA integrating OpenAI and Gemini to deliver dynamic curricula, 3D visuals, and a context-aware tutor with local caching and RBAC.",
    stack: ["Next.js", "TypeScript", "Supabase", "OpenAI", "Gemini", "PWA"],
    impact: "Offline-capable AI tutor with RBAC",
  },
  {
    name: "Adaptive-ECC Watermarking for AI Images",
    slug: "adaptive-ecc-watermarking",
    description:
      "Invisible adaptive watermarking algorithm for AI-generated images using Error Correction Codes that scales intensity by local complexity, preserving visual fidelity.",
    stack: ["Python", "OpenCV", "Cryptography"],
    impact: "Under review at MTAP, Springer",
  },
  {
    name: "MedQuery",
    slug: "medquery",
    description:
      "Full-stack clinical platform using LLMs to let healthcare professionals query the MIMIC-IV dataset via natural language, with secure RBAC and interactive analytics.",
    stack: ["React", "TypeScript", "FastAPI", "LLMs", "Tailwind"],
    impact: "Natural-language access to MIMIC-IV",
  },
  {
    name: "Adaptive Defenses for Wireless IoT Networks",
    slug: "adaptive-defenses-wireless-iot",
    description:
      "Dynamic defense strategies for IoT networks using game-theoretic models and Q-learning to counter adaptive jamming attacks.",
    stack: ["Python", "Game Theory", "Q-Learning", "NumPy"],
    impact: "7% performance gain over baseline defenses",
  },
  {
    name: "Federated Learning Healthcare Chatbot (Vital)",
    slug: "federated-healthcare-chatbot",
    description:
      "Privacy-preserving healthcare chatbot combining federated learning with differential privacy so patient data never leaves the source hospital.",
    stack: ["Flower", "TF Federated", "PyTorch", "Llama 7B"],
    impact: "End-to-end differential privacy",
  },
  {
    name: "Disaster Communication Framework",
    slug: "disaster-communication-framework",
    description:
      "ESP32-based mesh network for disaster-resilient communication without internet dependency, integrating 5 sensors for early disaster prediction.",
    stack: ["Embedded C", "ESP32", "ESP-NOW", "IoT"],
    impact: "Offline mesh + 5-sensor prediction",
  },
  {
    name: "Invisibility Cloak",
    slug: "invisibility-cloak",
    description:
      "Computer vision system that creates an invisibility illusion by capturing a static background and compositing it over cloaked objects in real time.",
    stack: ["OpenCV", "YOLO", "Python"],
    impact: "Real-time segmentation & compositing",
  },
];

export default function Work() {
  return (
    <Layout>
      <section className="py-20">
        <div className="container">
          <div className="max-w-2xl mb-12 opacity-0 animate-fade-in-up">
            <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              <DecryptedText text="Work" animateOn="view" sequential speed={60} />
            </h1>
            <p className="text-muted-foreground leading-relaxed">
              A selection of projects across AI systems, machine learning research, embedded
              networks, and full-stack platforms. Each one ships against real constraints.
            </p>
          </div>

          <div className="opacity-0 animate-fade-in-up stagger-1">
            <CodeDivider label="Projects" />
          </div>

          <div className="grid gap-6 md:grid-cols-2">
            {projects.map((project, index) => (
              <div
                key={project.slug}
                className="opacity-0 animate-fade-in-up"
                style={{ animationDelay: `${Math.min(index, 6) * 0.08}s` }}
              >
                <ProjectCard {...project} className="hover-lift h-full" />
              </div>
            ))}
          </div>

          <div className="mt-16 p-6 rounded-lg border border-border bg-card/60 text-center opacity-0 animate-fade-in-up stagger-4">
            <p className="font-mono text-sm text-primary mb-2">
              {"//"} More projects coming soon
            </p>
            <p className="text-sm text-muted-foreground">
              Currently building at HPE on defect intelligence pipelines and exploring
              federated fine-tuning.
            </p>
          </div>
        </div>
      </section>
    </Layout>
  );
}
