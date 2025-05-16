import { ArrowLeft } from "lucide-react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"

export default function CosmicFlowPage() {
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
                Cosmic Flow Simulation
              </h1>
              <p className="max-w-[700px] text-[#bd93f9] md:text-xl">
                Witness the evolution of galaxies and dark matter
              </p>
            </div>
            <div className="mx-auto mt-16 max-w-5xl">
              <Card className="bg-[#44475a] border-[#6272a4]">
                <CardContent className="p-6">
                  <div className="aspect-video relative rounded-lg overflow-hidden bg-[#282a36] mb-6">
                    <img src="/cosmic-flow.png" alt="Cosmic Flow Simulation" className="w-full h-full object-cover" />
                  </div>
                  <div className="space-y-6 text-[#f8f8f2]">
                    <h2 className="text-2xl font-bold">Exploring Cosmic Structure Formation</h2>
                    <p>
                      Our Cosmic Flow Simulator models the complex interactions between dark matter, galaxies, and the
                      expansion of space-time, providing insights into the large-scale structure of the universe. This
                      simulation tracks billions of particles representing dark matter and visible matter as they evolve
                      over cosmic time.
                    </p>
                    <h3 className="text-xl font-bold">Simulation Features</h3>
                    <ul className="list-disc pl-6 space-y-2">
                      <li>
                        <span className="font-semibold">N-body Dynamics:</span> Accurate gravitational interactions
                        between billions of particles
                      </li>
                      <li>
                        <span className="font-semibold">Dark Matter Modeling:</span> Visualization of dark matter halos
                        and their influence on galaxy formation
                      </li>
                      <li>
                        <span className="font-semibold">Cosmic Web:</span> Formation of filaments, voids, and clusters
                        that make up the cosmic web
                      </li>
                      <li>
                        <span className="font-semibold">Time Evolution:</span> Track the universe from shortly after the
                        Big Bang to the present day
                      </li>
                    </ul>
                    <div className="bg-[#282a36] p-4 rounded-md">
                      <p className="text-[#50fa7b] font-mono text-sm">
                        This interactive simulation is currently in development. Check back soon for the full
                        interactive experience.
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
              <div className="mt-12 space-y-8">
                <h2 className="text-2xl font-bold text-[#f8f8f2]">The Science Behind the Simulation</h2>
                <div className="grid gap-6 md:grid-cols-2">
                  <Card className="bg-[#44475a] border-[#6272a4]">
                    <CardContent className="p-6">
                      <h3 className="text-xl font-bold text-[#f8f8f2] mb-4">Lambda-CDM Model</h3>
                      <p className="text-[#f8f8f2]">
                        Our simulation is based on the Lambda-CDM (Cold Dark Matter) model, the current standard model
                        of Big Bang cosmology. It incorporates dark energy (represented by the cosmological constant
                        Lambda) and cold dark matter.
                      </p>
                    </CardContent>
                  </Card>
                  <Card className="bg-[#44475a] border-[#6272a4]">
                    <CardContent className="p-6">
                      <h3 className="text-xl font-bold text-[#f8f8f2] mb-4">Computational Methods</h3>
                      <p className="text-[#f8f8f2]">
                        We use adaptive mesh refinement and tree-code algorithms to efficiently calculate gravitational
                        forces between particles, allowing us to simulate cosmic structures across a wide range of
                        scales.
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
