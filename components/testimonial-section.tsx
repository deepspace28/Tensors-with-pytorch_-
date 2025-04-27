import Image from "next/image"

import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

export function TestimonialSection() {
  return (
    <section className="w-full py-12 md:py-24 lg:py-32 bg-gradient-to-b from-muted/30 to-background">
      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-center justify-center space-y-4 text-center">
          <div className="space-y-2">
            <Badge variant="outline" className="px-3 py-1">
              Testimonials
            </Badge>
            <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">Trusted by Leading Researchers</h2>
            <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
              See what scientists and institutions are saying about Synaptiq.
            </p>
          </div>
        </div>
        <div className="mx-auto grid max-w-5xl grid-cols-1 gap-6 py-12 md:grid-cols-2 lg:grid-cols-3">
          <Card className="border border-primary/10 bg-card/60 backdrop-blur-sm shadow-md hover:shadow-lg hover:shadow-primary/5 transition-all duration-300">
            <CardContent className="p-6">
              <div className="flex flex-col gap-4">
                <div className="flex items-center gap-4">
                  <Image
                    src="/thoughtful-scientist.png"
                    width={50}
                    height={50}
                    alt="Dr. James Wilson"
                    className="rounded-full"
                  />
                  <div>
                    <h3 className="font-bold">Dr. James Wilson</h3>
                    <p className="text-sm text-muted-foreground">Quantum Physics, MIT</p>
                  </div>
                </div>
                <p className="text-sm text-muted-foreground">
                  "Synaptiq has revolutionized our quantum research. The simulation capabilities are unmatched, allowing
                  us to explore complex quantum systems with unprecedented accuracy."
                </p>
              </div>
            </CardContent>
          </Card>
          <Card className="border border-primary/10 bg-card/60 backdrop-blur-sm shadow-md hover:shadow-lg hover:shadow-primary/5 transition-all duration-300">
            <CardContent className="p-6">
              <div className="flex flex-col gap-4">
                <div className="flex items-center gap-4">
                  <Image
                    src="/confident-scientist.png"
                    width={50}
                    height={50}
                    alt="Dr. Maria Rodriguez"
                    className="rounded-full"
                  />
                  <div>
                    <h3 className="font-bold">Dr. Maria Rodriguez</h3>
                    <p className="text-sm text-muted-foreground">Mathematics, Stanford University</p>
                  </div>
                </div>
                <p className="text-sm text-muted-foreground">
                  "As a mathematician, I've been impressed by Synaptiq's ability to understand and assist with complex
                  mathematical proofs. It's become an essential tool in my research workflow."
                </p>
              </div>
            </CardContent>
          </Card>
          <Card className="border border-primary/10 bg-card/60 backdrop-blur-sm shadow-md hover:shadow-lg hover:shadow-primary/5 transition-all duration-300">
            <CardContent className="p-6">
              <div className="flex flex-col gap-4">
                <div className="flex items-center gap-4">
                  <Image
                    src="/confident-tech-leader.png"
                    width={50}
                    height={50}
                    alt="Dr. Robert Chen"
                    className="rounded-full"
                  />
                  <div>
                    <h3 className="font-bold">Dr. Robert Chen</h3>
                    <p className="text-sm text-muted-foreground">Research Director, CERN</p>
                  </div>
                </div>
                <p className="text-sm text-muted-foreground">
                  "The integration of Synaptiq into our research infrastructure has accelerated our particle physics
                  simulations by 60%. It's a game-changer for large-scale scientific computing."
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  )
}
