import GHZStateSimulation from "@/components/quantum-simulations/ghz-state-simulation"

export const metadata = {
  title: "GHZ State Simulation | Synaptiq",
  description: "Explore the Greenberger-Horne-Zeilinger (GHZ) quantum state simulation",
}

export default function GHZStatePage() {
  return (
    <div className="container mx-auto py-8 px-4">
      <h1 className="text-3xl font-bold mb-6">GHZ State Simulation</h1>
      <p className="text-lg mb-8">
        The Greenberger-Horne-Zeilinger (GHZ) state is a special type of entangled quantum state that demonstrates
        non-classical correlations between three or more particles.
      </p>

      <GHZStateSimulation />

      <div className="mt-8">
        <h2 className="text-2xl font-bold mb-4">About GHZ States</h2>
        <p className="mb-4">
          GHZ states are important in quantum information theory and have applications in quantum communication
          protocols, quantum cryptography, and tests of quantum mechanics.
        </p>
        <p>The general form of an n-qubit GHZ state is: (|00...0⟩ + |11...1⟩)/√2</p>
      </div>
    </div>
  )
}
