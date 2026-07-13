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
          <div className="mb-12 max-w-2xl animate-fade-in-up opacity-0">
            <h1 className="mb-4 text-3xl font-bold text-foreground md:text-4xl">
              <DecryptedText text="Work" animateOn="view" sequential speed={60} />
            </h1>
            <p className="leading-relaxed text-muted-foreground">
              A selection of projects across AI systems, machine learning research, embedded
              networks, and full-stack platforms. Each one ships against real constraints.
            </p>
          </div>

          <div className="stagger-1 animate-fade-in-up opacity-0">
            <CodeDivider label="Projects" />
          </div>

          <div className="grid gap-6 md:grid-cols-2">
            {projects.map((project, index) => (
              <div
                key={project.slug}
                className="animate-fade-in-up opacity-0"
                style={{ animationDelay: `${Math.min(index, 6) * 0.08}s` }}
              >
                <ProjectCard {...project} className="hover-lift h-full" />
              </div>
            ))}
          </div>

          <div className="stagger-4 mt-16 animate-fade-in-up rounded-lg border border-border bg-card/60 p-6 text-center opacity-0">
            <p className="mb-2 font-mono text-sm text-primary">{"//"} More projects coming soon</p>
            <p className="text-sm text-muted-foreground">
              Currently building at HPE on defect intelligence pipelines and exploring federated
              fine-tuning.
            </p>
          </div>
        </div>
      </section>
    </Layout>
  );
}
