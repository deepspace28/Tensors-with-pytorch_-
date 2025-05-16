import Image from "next/image"
import { Card, CardContent } from "@/components/ui/card"

interface VisualCardProps {
  title: string
  description: string
  imageSrc: string
}

function VisualCard({ title, description, imageSrc }: VisualCardProps) {
  return (
    <Card className="bg-black border-gray-800 overflow-hidden">
      <div className="aspect-video relative">
        <Image src={imageSrc || "/placeholder.svg"} alt={title} fill className="object-cover" />
      </div>
      <CardContent className="p-4">
        <h4 className="text-white font-medium mb-1">{title}</h4>
        <p className="text-gray-400 text-sm">{description}</p>
      </CardContent>
    </Card>
  )
}

export function VisualGallery() {
  return (
    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-2">
      <VisualCard
        title="NeuroSymbolic Architecture"
        description="Quantum-informed neural architecture integrating symbolic reasoning with deep learning for hypothesis generation."
        imageSrc="/diagrams/neurosymbolic-architecture.png"
      />
      <VisualCard
        title="Theory Graph Visualization"
        description="Multi-dimensional representation of hypothesis space showing causal relationships and theoretical derivations."
        imageSrc="/diagrams/theory-graph-visualization.png"
      />
      <VisualCard
        title="Quantum Simulation Output"
        description="Probability density visualization of entangled quantum states with interference patterns from a multi-particle system."
        imageSrc="/diagrams/quantum-simulation.png"
      />
      <VisualCard
        title="Spacetime Curvature Model"
        description="Tensor field visualization of spacetime curvature near a black hole, generated from Synaptiq's relativistic gravity equations."
        imageSrc="/diagrams/spacetime-curvature.png"
      />
    </div>
  )
}
