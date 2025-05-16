"use client"

import { motion } from "framer-motion"
import { Card, CardContent } from "@/components/ui/card"
import { FadeInUp, StaggerChildren, StaggerItem } from "@/components/motion"

// Custom SVG components for each technology
const QuantumAttentionIcon = () => (
  <svg viewBox="0 0 100 100" className="h-16 w-16 text-white">
    <defs>
      <linearGradient id="quantum-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="currentColor" stopOpacity="0.2" />
        <stop offset="100%" stopColor="currentColor" stopOpacity="0.8" />
      </linearGradient>
    </defs>
    <g fill="none" stroke="url(#quantum-gradient)" strokeWidth="1.5">
      {/* Quantum nodes and connections */}
      <circle cx="50" cy="50" r="20" opacity="0.7" />
      <circle cx="50" cy="50" r="30" opacity="0.5" />
      <circle cx="50" cy="50" r="40" opacity="0.3" />

      {/* Neural connections */}
      <path d="M30,30 Q50,10 70,30" />
      <path d="M30,70 Q50,90 70,70" />
      <path d="M30,30 Q50,50 30,70" />
      <path d="M70,30 Q50,50 70,70" />

      {/* Quantum particles */}
      <circle cx="30" cy="30" r="4" fill="currentColor" />
      <circle cx="70" cy="30" r="4" fill="currentColor" />
      <circle cx="30" cy="70" r="4" fill="currentColor" />
      <circle cx="70" cy="70" r="4" fill="currentColor" />
      <circle cx="50" cy="50" r="6" fill="currentColor" />
    </g>
  </svg>
)

const SymbolicMathIcon = () => (
  <svg viewBox="0 0 100 100" className="h-16 w-16 text-white">
    <defs>
      <linearGradient id="math-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="currentColor" stopOpacity="0.2" />
        <stop offset="100%" stopColor="currentColor" stopOpacity="0.8" />
      </linearGradient>
    </defs>
    <g fill="none" stroke="url(#math-gradient)" strokeWidth="1.5">
      {/* Circular data flow */}
      <circle cx="50" cy="50" r="35" opacity="0.4" />
      {/* Mathematical symbols */}
      <path d="M40,30 L60,30" strokeWidth="2" /> {/* Plus horizontal */}
      <path d="M50,20 L50,40" strokeWidth="2" /> {/* Plus vertical */}
      <path d="M30,60 L45,60" strokeWidth="2" /> {/* Minus */}
      <path d="M65,50 L75,70" strokeWidth="2" /> {/* Division */}
      <path d="M75,50 L65,70" strokeWidth="2" />
      <path d="M25,50 C25,40 35,40 35,50 C35,60 25,60 25,50" strokeWidth="2" /> {/* Infinity */}
      {/* Data points */}
      <circle cx="50" cy="30" r="2" fill="currentColor" />
      <circle cx="30" cy="60" r="2" fill="currentColor" />
      <circle cx="70" cy="60" r="2" fill="currentColor" />
      <circle cx="30" cy="50" r="2" fill="currentColor" />
      <circle cx="70" cy="50" r="2" fill="currentColor" />
    </g>
    <text x="50" y="80" textAnchor="middle" fill="currentColor" fontSize="12">
      ∫∂Σ
    </text>
  </svg>
)

const QuantumSimulationIcon = () => (
  <svg viewBox="0 0 100 100" className="h-16 w-16 text-white">
    <defs>
      <linearGradient id="quantum-sim-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="currentColor" stopOpacity="0.2" />
        <stop offset="100%" stopColor="currentColor" stopOpacity="0.8" />
      </linearGradient>
    </defs>
    <g fill="none" stroke="url(#quantum-sim-gradient)" strokeWidth="1.5">
      {/* Quantum wave function */}
      <path d="M10,50 C20,20 30,80 40,50 C50,20 60,80 70,50 C80,20 90,80 100,50" />

      {/* Quantum circuit */}
      <rect x="25" y="30" width="10" height="10" fill="currentColor" opacity="0.6" />
      <rect x="45" y="30" width="10" height="10" fill="currentColor" opacity="0.6" />
      <rect x="65" y="30" width="10" height="10" fill="currentColor" opacity="0.6" />

      <line x1="30" y1="35" x2="50" y2="35" />
      <line x1="50" y1="35" x2="70" y2="35" />

      {/* Quantum states */}
      <circle cx="30" cy="65" r="5" stroke="currentColor" fill="none" />
      <circle cx="50" cy="65" r="5" stroke="currentColor" fill="none" />
      <circle cx="70" cy="65" r="5" stroke="currentColor" fill="none" />

      <path d="M30,65 L50,65" />
      <path d="M50,65 L70,65" />
    </g>
    <text x="50" y="75" textAnchor="middle" fill="currentColor" fontSize="8">
      |ψ⟩
    </text>
  </svg>
)

const AIPeerReviewIcon = () => (
  <svg viewBox="0 0 100 100" className="h-16 w-16 text-white">
    <defs>
      <linearGradient id="review-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="currentColor" stopOpacity="0.2" />
        <stop offset="100%" stopColor="currentColor" stopOpacity="0.8" />
      </linearGradient>
    </defs>
    <g fill="none" stroke="url(#review-gradient)" strokeWidth="1.5">
      {/* Document */}
      <rect x="25" y="20" width="30" height="40" rx="2" />
      <path d="M30,30 L50,30" strokeWidth="1" />
      <path d="M30,35 L50,35" strokeWidth="1" />
      <path d="M30,40 L45,40" strokeWidth="1" />
      <path d="M30,45 L50,45" strokeWidth="1" />
      <path d="M30,50 L40,50" strokeWidth="1" />

      {/* AI review system */}
      <circle cx="70" cy="40" r="15" />
      <path d="M60,35 L80,35" strokeWidth="1" />
      <path d="M60,40 L80,40" strokeWidth="1" />
      <path d="M60,45 L80,45" strokeWidth="1" />

      {/* Connection between document and AI */}
      <path d="M55,40 L60,40" strokeDasharray="2,2" />

      {/* Checkmark */}
      <path d="M65,70 L70,75 L80,65" strokeWidth="2" stroke="currentColor" />
      <circle cx="70" cy="70" r="10" opacity="0.3" />
    </g>
  </svg>
)

const technologyItems = [
  {
    title: "Quantum-Attention Neural Networks",
    description:
      "Our proprietary QANN architecture combines quantum computing principles with attention mechanisms to process complex scientific data with unprecedented accuracy and efficiency.",
    icon: <QuantumAttentionIcon />,
    features: [
      "Quantum-inspired tensor networks",
      "Multi-head scientific attention",
      "Entanglement-based information processing",
    ],
  },
  {
    title: "Scientific Datasets & Symbolic Math Engines",
    description:
      "Trained on petabytes of peer-reviewed scientific literature and integrated with symbolic mathematics engines for rigorous mathematical reasoning and derivation capabilities.",
    icon: <SymbolicMathIcon />,
    features: [
      "10+ million scientific papers analyzed",
      "Symbolic integration with SymPy and Mathematica",
      "Automated theorem proving capabilities",
    ],
  },
  {
    title: "Quantum Simulation Frameworks",
    description:
      "Seamless integration with Qiskit and PennyLane enables high-fidelity quantum simulations, allowing researchers to model complex quantum systems without specialized hardware.",
    icon: <QuantumSimulationIcon />,
    features: ["Qiskit & PennyLane integration", "Quantum circuit optimization", "Error mitigation techniques"],
  },
  {
    title: "AI Peer Review & Validation",
    description:
      "Our AI-driven scientific integrity system continuously validates outputs against established scientific knowledge, ensuring accuracy and reliability in all results and recommendations.",
    icon: <AIPeerReviewIcon />,
    features: ["Automated consistency checking", "Citation verification system", "Uncertainty quantification"],
  },
]

export function TechnologyHighlightsEnhanced() {
  return (
    <section className="w-full py-12 md:py-24 lg:py-32 bg-gradient-to-b from-background to-muted/30">
      <div className="container px-4 md:px-6">
        <FadeInUp>
          <div className="flex flex-col items-center justify-center space-y-4 text-center">
            <div className="space-y-2">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
                Advanced Scientific AI Capabilities
              </h2>
              <p className="max-w-[85%] mx-auto leading-normal text-muted-foreground sm:text-lg sm:leading-7">
                Cutting-edge technology powering scientific discovery and innovation
              </p>
            </div>
          </div>
        </FadeInUp>
        <StaggerChildren className="mx-auto grid gap-8 py-12 md:grid-cols-2">
          {technologyItems.map((item, index) => (
            <StaggerItem key={index}>
              <motion.div whileHover={{ y: -5 }} className="h-full">
                <Card className="overflow-hidden border-border/40 bg-background/60 backdrop-blur-sm hover-glow h-full">
                  <CardContent className="p-0 h-full">
                    <div className="flex flex-col md:flex-row h-full">
                      <div className="flex items-center justify-center bg-foreground/5 p-8 md:w-1/3">
                        <motion.div
                          whileHover={{ rotate: 5, scale: 1.05 }}
                          transition={{ type: "spring", stiffness: 300 }}
                          className="flex items-center justify-center bg-black/30 dark:bg-white/5 rounded-xl p-4"
                        >
                          {item.icon}
                        </motion.div>
                      </div>
                      <div className="space-y-2 p-6 md:w-2/3">
                        <h3 className="text-xl font-bold">{item.title}</h3>
                        <p className="text-muted-foreground">{item.description}</p>
                        <ul className="mt-4 space-y-1 text-sm text-muted-foreground">
                          {item.features.map((feature, i) => (
                            <li key={i} className="flex items-center">
                              <span className="mr-2 h-1 w-1 rounded-full bg-foreground"></span>
                              {feature}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            </StaggerItem>
          ))}
        </StaggerChildren>
      </div>
    </section>
  )
}
