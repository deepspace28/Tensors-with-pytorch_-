import Link from "next/link"
import { ArrowLeft } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"

export const metadata = {
  title: "Black Hole Entropy Demo",
  description: "Experience Synaptiq's black hole entropy simulation capabilities.",
}

export default function BlackHoleDemoPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <SiteHeader />
      <main className="flex-1">
        <section className="container py-12 md:py-24 lg:py-32">
          <div className="mx-auto flex max-w-[58rem] flex-col items-center justify-center gap-4 text-center">
            <h1 className="text-3xl font-bold leading-tight tracking-tighter md:text-5xl lg:text-6xl lg:leading-[1.1]">
              Black Hole Entropy Simulation
            </h1>
            <p className="max-w-[85%] leading-normal text-muted-foreground sm:text-lg sm:leading-7 md:text-xl">
              Visualize how entropy changes during black hole formation and evolution.
            </p>
          </div>
          <div className="mx-auto mt-12 max-w-3xl">
            <Card className="border-border/40">
              <CardHeader>
                <CardTitle>Black Hole Entropy Visualization</CardTitle>
                <CardDescription>Simulation of entropy changes in a forming black hole</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="aspect-video rounded-md border border-border/40 bg-muted/30 flex items-center justify-center">
                  <p className="text-muted-foreground">Black hole entropy simulation would appear here</p>
                </div>
                <div className="rounded-md border border-border/40 bg-muted/30 p-6 space-y-4">
                  <p className="font-medium">Key Insights:</p>
                  <div className="space-y-3 text-sm">
                    <p>
                      Black hole entropy is proportional to the area of the event horizon, not the volume as might be
                      expected. This is known as the Bekenstein-Hawking entropy formula: S = kA/4ℓₚ², where k is
                      Boltzmann's constant, A is the area of the horizon, and ℓₚ is the Planck length.
                    </p>
                    <p>
                      As matter falls into a black hole, the total entropy of the universe increases. This is consistent
                      with the second law of thermodynamics.
                    </p>
                    <p>
                      Hawking radiation causes black holes to slowly evaporate over time, returning their entropy to the
                      universe. For a solar mass black hole, this process would take approximately 10^67 years.
                    </p>
                    <p>
                      The simulation demonstrates how information paradoxes arise when considering quantum mechanics and
                      general relativity together in black hole physics.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
            <div className="mt-8 flex justify-center">
              <Button asChild variant="outline">
                <Link href="/">
                  <ArrowLeft className="mr-2 h-4 w-4" /> Back to Home
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
