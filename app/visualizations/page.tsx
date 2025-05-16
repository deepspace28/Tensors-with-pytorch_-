import Link from "next/link"
import { ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"

export default function VisualizationsPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <SiteHeader />
      <main className="flex-1">
        <section className="w-full py-12 md:py-24 lg:py-32 bg-[#282a36]">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center mb-12">
              <h1 className="text-3xl font-bold tracking-tighter text-[#f8f8f2] sm:text-4xl md:text-5xl lg:text-6xl">
                Scientific Visualizations
              </h1>
              <p className="max-w-[700px] text-[#bd93f9] md:text-xl">
                Explore complex scientific phenomena through our interactive visualizations
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <Card className="bg-[#44475a] border-[#6272a4] overflow-hidden">
                <div className="aspect-video relative">
                  <img
                    src="/Quantum Neural Web.png"
                    alt="Quantum Neural Network Visualization"
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#282a36] to-transparent opacity-60"></div>
                  <div className="absolute bottom-4 left-4 right-4">
                    <h3 className="text-xl font-bold text-white">Quantum Neural Networks</h3>
                    <p className="text-[#8be9fd] text-sm mt-1">
                      Visualize how quantum information flows through neural pathways
                    </p>
                  </div>
                </div>
                <CardContent className="p-6">
                  <p className="text-[#f8f8f2] mb-4">
                    Our advanced 3D visualization engine renders complex quantum neural networks in real-time, allowing
                    researchers to observe quantum information processing at unprecedented detail.
                  </p>
                  <Button asChild className="w-full bg-[#ff79c6] hover:bg-[#ff92d0] text-[#282a36]">
                    <Link href="/visualizations/quantum-neural-networks">Explore Visualization</Link>
                  </Button>
                </CardContent>
              </Card>
              <Card className="bg-[#44475a] border-[#6272a4] overflow-hidden">
                <div className="aspect-video relative">
                  <img src="/cosmic-flow.png" alt="Cosmic Flow Simulation" className="w-full h-full object-cover" />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#282a36] to-transparent opacity-60"></div>
                  <div className="absolute bottom-4 left-4 right-4">
                    <h3 className="text-xl font-bold text-white">Cosmic Flow Simulation</h3>
                    <p className="text-[#8be9fd] text-sm mt-1">Witness the evolution of galaxies and dark matter</p>
                  </div>
                </div>
                <CardContent className="p-6">
                  <p className="text-[#f8f8f2] mb-4">
                    Our cosmic flow simulator models the complex interactions between dark matter, galaxies, and the
                    expansion of space-time, providing insights into the large-scale structure of the universe.
                  </p>
                  <Button asChild className="w-full bg-[#ff79c6] hover:bg-[#ff92d0] text-[#282a36]">
                    <Link href="/visualizations/cosmic-flow">Explore Simulation</Link>
                  </Button>
                </CardContent>
              </Card>
            </div>
            <div className="mt-12 text-center">
              <p className="text-[#f8f8f2] mb-6">
                More visualizations are currently in development. Check back soon for updates!
              </p>
              <Button asChild variant="outline" className="border-[#6272a4] text-[#f8f8f2]">
                <Link href="/">
                  Return to Home <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </div>
          </div>
        </section>
      </main>
      <SiteFooter />
    </div>
  )
}
