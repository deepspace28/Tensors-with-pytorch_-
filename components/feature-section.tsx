"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { motion } from "framer-motion"

// Custom SVG components for each technology
const ScientificLLMIcon = () => (
  <svg viewBox="0 0 24 24" className="h-5 w-5 text-gray-100">
    <defs>
      <linearGradient id="llm-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="currentColor" stopOpacity="0.6" />
        <stop offset="100%" stopColor="currentColor" stopOpacity="1" />
      </linearGradient>
    </defs>
    <g fill="none" stroke="url(#llm-gradient)" strokeWidth="1">
      {/* Brain structure */}
      <path d="M12,3 C16.5,3 20,6.5 20,11 C20,15.5 16.5,19 12,19 C7.5,19 4,15.5 4,11 C4,6.5 7.5,3 12,3 Z" />

      {/* Neural connections */}
      <path d="M8,8 C10,6 14,6 16,8" />
      <path d="M8,14 C10,16 14,16 16,14" />
      <path d="M8,8 C6,10 6,14 8,14" />
      <path d="M16,8 C18,10 18,14 16,14" />

      {/* Text representation */}
      <path d="M10,11 L14,11" strokeWidth="0.75" />
      <path d="M9,13 L15,13" strokeWidth="0.75" />
      <path d="M11,9 L13,9" strokeWidth="0.75" />
    </g>
    <circle cx="12" cy="11" r="1" fill="currentColor" />
  </svg>
)

const QuantumSimulationsIcon = () => (
  <svg viewBox="0 0 24 24" className="h-5 w-5 text-gray-100">
    <defs>
      <linearGradient id="quantum-sim-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="currentColor" stopOpacity="0.6" />
        <stop offset="100%" stopColor="currentColor" stopOpacity="1" />
      </linearGradient>
    </defs>
    <g fill="none" stroke="url(#quantum-sim-gradient)" strokeWidth="1">
      {/* Quantum orbit */}
      <ellipse cx="12" cy="12" rx="8" ry="5" transform="rotate(30, 12, 12)" />
      <ellipse cx="12" cy="12" rx="8" ry="5" transform="rotate(90, 12, 12)" />
      <ellipse cx="12" cy="12" rx="8" ry="5" transform="rotate(150, 12, 12)" />

      {/* Quantum particles */}
      <circle cx="12" cy="12" r="2" fill="currentColor" opacity="0.8" />
      <circle cx="12" cy="7" r="1" fill="currentColor" />
      <circle cx="17" cy="14" r="1" fill="currentColor" />
      <circle cx="7" cy="14" r="1" fill="currentColor" />
    </g>
  </svg>
)

const ScientificValidationIcon = () => (
  <svg viewBox="0 0 24 24" className="h-5 w-5 text-gray-100">
    <defs>
      <linearGradient id="validation-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="currentColor" stopOpacity="0.6" />
        <stop offset="100%" stopColor="currentColor" stopOpacity="1" />
      </linearGradient>
    </defs>
    <g fill="none" stroke="url(#validation-gradient)" strokeWidth="1">
      {/* Microscope base */}
      <path d="M8,20 L16,20" />
      <path d="M12,20 L12,16" />

      {/* Microscope body */}
      <path d="M10,16 L14,16" />
      <path d="M9,14 L15,14" />
      <path d="M10,12 L14,12" />
      <path d="M11,10 L13,10" />
      <path d="M12,10 L12,8" />

      {/* Lens */}
      <circle cx="12" cy="6" r="2" />

      {/* Validation checkmark */}
      <path d="M18,4 L20,6 L16,10" strokeWidth="1.5" stroke="currentColor" />
    </g>
  </svg>
)

const APIAccessIcon = () => (
  <svg viewBox="0 0 24 24" className="h-5 w-5 text-gray-100">
    <defs>
      <linearGradient id="api-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="currentColor" stopOpacity="0.6" />
        <stop offset="100%" stopColor="currentColor" stopOpacity="1" />
      </linearGradient>
    </defs>
    <g fill="none" stroke="url(#api-gradient)" strokeWidth="1">
      {/* API brackets */}
      <path d="M8,6 L4,12 L8,18" strokeWidth="1.5" />
      <path d="M16,6 L20,12 L16,18" strokeWidth="1.5" />

      {/* Connection lines */}
      <path d="M10,8 L14,16" strokeWidth="1.5" />

      {/* Data points */}
      <circle cx="4" cy="12" r="0.5" fill="currentColor" />
      <circle cx="8" cy="6" r="0.5" fill="currentColor" />
      <circle cx="8" cy="18" r="0.5" fill="currentColor" />
      <circle cx="16" cy="6" r="0.5" fill="currentColor" />
      <circle cx="16" cy="18" r="0.5" fill="currentColor" />
      <circle cx="20" cy="12" r="0.5" fill="currentColor" />
    </g>
  </svg>
)

const MathematicalModelingIcon = () => (
  <svg viewBox="0 0 24 24" className="h-5 w-5 text-gray-100">
    <defs>
      <linearGradient id="math-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="currentColor" stopOpacity="0.6" />
        <stop offset="100%" stopColor="currentColor" stopOpacity="1" />
      </linearGradient>
    </defs>
    <g fill="none" stroke="url(#math-gradient)" strokeWidth="1">
      {/* Graph axes */}
      <path d="M4,18 L20,18" />
      <path d="M4,18 L4,4" />

      {/* Function curve */}
      <path d="M4,14 C8,4 12,20 20,8" strokeWidth="1.5" />

      {/* Mathematical symbols */}
      <path d="M8,10 L12,10" strokeWidth="0.75" />
      <path d="M10,8 L10,12" strokeWidth="0.75" />
      <path d="M16,10 L20,10" strokeWidth="0.75" />
      <path d="M8,16 L12,16" strokeWidth="0.75" />
    </g>
    <circle cx="14" cy="12" r="1" fill="currentColor" />
  </svg>
)

const ResearchDatabaseIcon = () => (
  <svg viewBox="0 0 24 24" className="h-5 w-5 text-gray-100">
    <defs>
      <linearGradient id="db-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="currentColor" stopOpacity="0.6" />
        <stop offset="100%" stopColor="currentColor" stopOpacity="1" />
      </linearGradient>
    </defs>
    <g fill="none" stroke="url(#db-gradient)" strokeWidth="1">
      {/* Database cylinders */}
      <ellipse cx="12" cy="6" rx="8" ry="2" />
      <path d="M4,6 L4,18" />
      <path d="M20,6 L20,18" />
      <ellipse cx="12" cy="18" rx="8" ry="2" />

      {/* Connection lines */}
      <path d="M8,10 L16,10" strokeWidth="0.5" strokeDasharray="1,1" />
      <path d="M8,14" strokeWidth="0.5" strokeDasharray="1,1" />
      <path d="M16,14" strokeWidth="0.5" strokeDasharray="1,1" />

      {/* Data points */}
      <circle cx="8" cy="10" r="0.5" fill="currentColor" />
      <circle cx="16" cy="10" r="0.5" fill="currentColor" />
      <circle cx="8" cy="14" r="0.5" fill="currentColor" />
      <circle cx="16" cy="14" r="0.5" fill="currentColor" />
      <circle cx="12" cy="12" r="0.5" fill="currentColor" />
    </g>
  </svg>
)

// Feature items with their respective icons
const features = [
  {
    title: "Scientific LLM",
    description: "Specialized language model trained on scientific literature.",
    content:
      "Our LLM understands complex scientific concepts, can generate hypotheses, and assist with literature reviews.",
    icon: <ScientificLLMIcon />,
  },
  {
    title: "Quantum Simulations",
    description: "Run complex quantum simulations with unprecedented accuracy.",
    content:
      "Simulate quantum systems, test theories, and explore quantum phenomena with our advanced simulation tools.",
    icon: <QuantumSimulationsIcon />,
  },
  {
    title: "Scientific Validation",
    description: "Rigorous validation by leading researchers.",
    content:
      "All our models and algorithms undergo extensive peer review and validation by experts in physics and mathematics.",
    icon: <ScientificValidationIcon />,
  },
  {
    title: "API Access",
    description: "Integrate with your existing research workflow.",
    content:
      "Our comprehensive API allows seamless integration with Python, MATLAB, R, and other research environments.",
    icon: <APIAccessIcon />,
  },
  {
    title: "Mathematical Modeling",
    description: "Advanced mathematical modeling and analysis.",
    content:
      "Solve complex mathematical problems, verify proofs, and explore mathematical concepts with our specialized tools.",
    icon: <MathematicalModelingIcon />,
  },
  {
    title: "Research Database",
    description: "Access to a vast database of scientific knowledge.",
    content:
      "Our platform is trained on millions of scientific papers, textbooks, and research data to provide comprehensive insights.",
    icon: <ResearchDatabaseIcon />,
  },
]

export function FeatureSection() {
  return (
    <section className="w-full py-12 md:py-24 lg:py-32 bg-gradient-to-b from-background to-muted/30">
      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-center justify-center space-y-4 text-center">
          <div className="space-y-2">
            <div className="inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2">
              <span>Powered by Advanced AI</span>
            </div>
            <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">Scientific Research, Accelerated</h2>
            <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
              Synaptiq combines cutting-edge AI with rigorous scientific validation to provide researchers with powerful
              tools for discovery.
            </p>
          </div>
        </div>
        <div className="mx-auto grid max-w-5xl grid-cols-1 gap-6 py-12 md:grid-cols-2 lg:grid-cols-3">
          {features.map((feature, index) => (
            <motion.div key={index} whileHover={{ y: -5 }} transition={{ type: "spring", stiffness: 300 }}>
              <Card className="border border-zinc-800 bg-zinc-900 text-white hover:border-zinc-700 transition-all duration-300 h-full">
                <CardHeader className="pb-2">
                  <motion.div
                    className="rounded-full bg-zinc-800 p-2 ring-1 ring-zinc-700"
                    whileHover={{ rotate: 5, scale: 1.05 }}
                    transition={{ type: "spring", stiffness: 300 }}
                  >
                    {feature.icon}
                  </motion.div>
                  <CardTitle className="mt-2">{feature.title}</CardTitle>
                  <CardDescription className="text-zinc-400">{feature.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-zinc-400">{feature.content}</p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
