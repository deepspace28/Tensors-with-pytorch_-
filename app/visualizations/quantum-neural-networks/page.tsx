import { ArrowLeft } from "lucide-react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"

export default function QuantumNeuralNetworksPage() {
  return (
    <div className="flex min-h-screen flex-col bg-[#282a36]">
      <header className="sticky top-0 z-40 w-full border-b border-[#44475a] bg-[#282a36]">
        <div className="container flex h-16 items-center space-x-4 sm:justify-between sm:space-x-0">
          <div className="flex gap-6 md:gap-10">
            <Button variant="ghost" size="sm" className="text-[#f8f8f2]" asChild>
              <Link href="/">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back to Home
              </Link>
            </Button>
          </div>
        </div>
      </header>
      <main className="flex-1">
        <section className="w-full py-12 md:py-24 lg:py-32">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <h1 className="text-3xl font-bold tracking-tighter text-[#f8f8f2] sm:text-4xl md:text-5xl lg:text-6xl">
                Quantum Neural Networks
              </h1>
              <p className="max-w-[700px] text-[#bd93f9] md:text-xl">
                Visualize how quantum information flows through neural pathways
              </p>
            </div>
            <div className="mx-auto mt-16 max-w-5xl">
              <Card className="bg-[#44475a] border-[#6272a4]">
                <CardContent className="p-6">
                  <div className="aspect-video relative rounded-lg overflow-hidden bg-[#282a36] mb-6">
                    <img
                      src="/Quantum Neural Web.png"
                      alt="Quantum Neural Network Visualization"
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="space-y-6 text-[#f8f8f2]">
                    <h2 className="text-2xl font-bold">Understanding Quantum Neural Networks</h2>
                    <p>
                      Quantum Neural Networks (QNNs) represent a fusion of quantum computing and neural network
                      architectures. Unlike classical neural networks, QNNs leverage quantum mechanical phenomena such
                      as superposition and entanglement to process information in ways that classical systems cannot.
                    </p>
                    <h3 className="text-xl font-bold">Key Features of Our Visualization</h3>
                    <ul className="list-disc pl-6 space-y-2">
                      <li>
                        <span className="font-semibold">Quantum State Representation:</span> Visualize quantum states as
                        they propagate through the network
                      </li>
                      <li>
                        <span className="font-semibold">Entanglement Mapping:</span> See how quantum bits become
                        entangled across different layers
                      </li>
                      <li>
                        <span className="font-semibold">Interference Patterns:</span> Observe quantum interference
                        effects that enable computational advantages
                      </li>
                      <li>
                        <span className="font-semibold">Real-time Parameter Tuning:</span> Adjust quantum gate
                        parameters and observe their effects
                      </li>
                    </ul>
                    <div className="bg-[#282a36] p-4 rounded-md">
                      <p className="text-[#50fa7b] font-mono text-sm">
                        This interactive visualization is currently in development. Check back soon for the full
                        interactive experience.
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
              <div className="mt-12 space-y-8">
                <h2 className="text-2xl font-bold text-[#f8f8f2]">Technical Background</h2>
                <div className="grid gap-6 md:grid-cols-2">
                  <Card className="bg-[#44475a] border-[#6272a4]">
                    <CardContent className="p-6">
                      <h3 className="text-xl font-bold text-[#f8f8f2] mb-4">Quantum Layers</h3>
                      <p className="text-[#f8f8f2]">
                        Our quantum neural networks implement parameterized quantum circuits as layers, where each layer
                        consists of a series of quantum gates whose parameters are optimized during training.
                      </p>
                    </CardContent>
                  </Card>
                  <Card className="bg-[#44475a] border-[#6272a4]">
                    <CardContent className="p-6">
                      <h3 className="text-xl font-bold text-[#f8f8f2] mb-4">Hybrid Architecture</h3>
                      <p className="text-[#f8f8f2]">
                        We employ a hybrid quantum-classical approach, where quantum circuits handle specific
                        computations that benefit from quantum advantages, while classical components manage other
                        aspects of the network.
                      </p>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  )
}
