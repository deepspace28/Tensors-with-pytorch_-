import Link from "next/link"
import { ArrowLeft } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"

export const metadata = {
  title: "Quantum Mechanics Demo",
  description: "Experience Synaptiq's quantum mechanics reasoning capabilities.",
}

export default function QuantumDemoPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <SiteHeader />
      <main className="flex-1">
        <section className="container py-12 md:py-24 lg:py-32">
          <div className="mx-auto flex max-w-[58rem] flex-col items-center justify-center gap-4 text-center">
            <h1 className="text-3xl font-bold leading-tight tracking-tighter md:text-5xl lg:text-6xl lg:leading-[1.1]">
              Quantum Mechanics Demo
            </h1>
            <p className="max-w-[85%] leading-normal text-muted-foreground sm:text-lg sm:leading-7 md:text-xl">
              Experience how Synaptiq explains complex quantum mechanics concepts with clarity and accuracy.
            </p>
          </div>
          <div className="mx-auto mt-12 max-w-3xl">
            <Card className="border-border/40">
              <CardHeader>
                <CardTitle>Quantum Entanglement Explanation</CardTitle>
                <CardDescription>Ask Synaptiq to explain quantum entanglement in clear terms</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="rounded-md border border-border/40 bg-muted/30 p-4">
                  <p className="font-medium">Query: Explain quantum entanglement clearly.</p>
                </div>
                <div className="rounded-md border border-border/40 bg-muted/30 p-6 space-y-4">
                  <p className="font-medium">Synaptiq Response:</p>
                  <div className="space-y-3 text-sm">
                    <p>
                      Quantum entanglement is when two or more particles become connected in such a way that the quantum
                      state of each particle cannot be described independently of the others, regardless of the distance
                      separating them.
                    </p>
                    <p>
                      Think of it like this: Imagine you have two coins that are "entangled." When you flip them, they
                      always show opposite results—if one is heads, the other is always tails—even if they're miles
                      apart. The strange part is that neither coin "decides" its state until it's observed, but somehow
                      they coordinate instantaneously.
                    </p>
                    <p>
                      This phenomenon troubled Einstein, who called it "spooky action at a distance." It seems to
                      violate the principle that information can't travel faster than light. However, no actual
                      information is transmitted faster than light—the correlation was established when the particles
                      first interacted.
                    </p>
                    <p>
                      Entanglement has been repeatedly confirmed in experiments and is a fundamental principle used in
                      quantum computing and quantum cryptography.
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
