import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowRight } from "lucide-react"

export default function AboutPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <SiteHeader />
      <main className="flex-1">
        {/* Hero Section */}
        <section className="w-full py-12 md:py-24 lg:py-32 bg-gradient-to-b from-background to-muted/30">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <div className="inline-block rounded-lg bg-muted px-3 py-1 text-sm">About Us</div>
                <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl">
                  About Synaptiq
                </h1>
                <p className="mx-auto max-w-[700px] text-muted-foreground md:text-xl">
                  A frontier intelligence lab building the future of scientific discovery
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Introduction */}
        <section className="w-full py-12 md:py-24 lg:py-32">
          <div className="container px-4 md:px-6">
            <div className="mx-auto grid max-w-5xl gap-10">
              <div className="space-y-6">
                <div className="space-y-4">
                  <p className="text-xl leading-relaxed text-muted-foreground">
                    Synaptiq is a frontier intelligence lab building the future of scientific discovery. We engineer AI
                    systems that don't just simulate knowledge—they generate it. Our mission is to rethink the
                    scientific method by fusing deep learning with the rigor of quantum theory, enabling AI to craft
                    new, testable theories about the fabric of the universe.
                  </p>
                  <p className="text-xl leading-relaxed text-muted-foreground">
                    Rooted in first-principles design, Synaptiq is building a platform where advanced machine
                    intelligence can explore, simulate, and hypothesize across the full spectrum of modern physics. From
                    quantum mechanics to cosmology, we are creating an autonomous research partner for the age of AI.
                  </p>
                  <div className="flex flex-col space-y-2 md:flex-row md:space-x-4 md:space-y-0">
                    <div className="rounded-lg border border-primary/10 bg-primary/5 px-4 py-2 text-center font-medium">
                      We do not merely digitize labs—we rethink them.
                    </div>
                    <div className="rounded-lg border border-primary/10 bg-primary/5 px-4 py-2 text-center font-medium">
                      We are not another LLM wrapper—we are the co-authors of the next paradigm shift.
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Our Vision */}
        <section className="w-full py-12 md:py-24 lg:py-32 bg-muted/50">
          <div className="container px-4 md:px-6">
            <div className="mx-auto grid max-w-5xl gap-10">
              <div className="space-y-6">
                <h2 className="text-3xl font-bold tracking-tighter md:text-4xl/tight">Our Vision</h2>
                <p className="text-xl leading-relaxed text-muted-foreground">
                  To create the first AI-native scientific research environment capable of producing original insights,
                  derivations, and theoretical frameworks across quantum, classical, and emerging domains of physics.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* What We're Building */}
        <section className="w-full py-12 md:py-24 lg:py-32">
          <div className="container px-4 md:px-6">
            <div className="mx-auto grid max-w-5xl gap-10">
              <div className="space-y-6">
                <h2 className="text-3xl font-bold tracking-tighter md:text-4xl/tight">What We're Building</h2>
                <div className="grid gap-8 md:grid-cols-2">
                  <div className="space-y-4">
                    <h3 className="text-xl font-bold">The Synaptiq Engine</h3>
                    <p className="text-muted-foreground">
                      A custom intelligence stack designed for deep scientific reasoning, mathematical derivation, and
                      symbolic abstraction.
                    </p>
                  </div>
                  <div className="space-y-4">
                    <h3 className="text-xl font-bold">Virtual Research Labs</h3>
                    <p className="text-muted-foreground">
                      Interactive environments where users can collaborate with AI to run experiments, test hypotheses,
                      and visualize quantum behavior from first principles.
                    </p>
                  </div>
                  <div className="space-y-4">
                    <h3 className="text-xl font-bold">Autonomous Theory Generation</h3>
                    <p className="text-muted-foreground">
                      A system where AI doesn't just simulate known equations—it proposes new ones, derived from
                      evidence, logic, and learned physical laws.
                    </p>
                  </div>
                  <div className="space-y-4">
                    <h3 className="text-xl font-bold">Human-AI Collaboration Tools</h3>
                    <p className="text-muted-foreground">
                      Interfaces, notebooks, and simulations where scientists can explore, correct, and co-develop ideas
                      with machine intelligence.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Our Belief */}
        <section className="w-full py-12 md:py-24 lg:py-32 bg-muted/50">
          <div className="container px-4 md:px-6">
            <div className="mx-auto grid max-w-5xl gap-10">
              <div className="space-y-6">
                <h2 className="text-3xl font-bold tracking-tighter md:text-4xl/tight">Our Belief</h2>
                <p className="text-xl leading-relaxed text-muted-foreground">
                  The future of physics is post-disciplinary, AI-native, and simulation-first. Synaptiq exists to
                  empower a new era of discovery, where intuition is augmented by intelligence, and where machines do
                  more than calculate—they theorize.
                </p>
                <div className="flex flex-col space-y-2 md:flex-row md:space-x-4 md:space-y-0">
                  <div className="rounded-lg border border-primary/10 bg-primary/5 px-4 py-2 text-center font-medium">
                    We are scientists, engineers, and artists of the unknown.
                  </div>
                  <div className="rounded-lg border border-primary/10 bg-primary/5 px-4 py-2 text-center font-medium">
                    We build for the bold, the curious, and the impossible.
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Closing Section */}
        <section className="w-full py-12 md:py-24 lg:py-32">
          <div className="container px-4 md:px-6">
            <div className="mx-auto grid max-w-5xl gap-10">
              <div className="space-y-6">
                <h2 className="text-3xl font-bold tracking-tighter md:text-4xl/tight">
                  Backed by Vision, Built with Precision.
                </h2>
                <p className="text-xl leading-relaxed text-muted-foreground">
                  Synaptiq is currently in active development. Simulations are in closed beta, and APIs will be made
                  available in a future release.
                </p>
                <div className="space-y-2">
                  <p className="text-xl font-semibold">Stay curious.</p>
                  <p className="text-xl font-semibold">Stay tuned.</p>
                </div>
                <div className="flex flex-col gap-2 min-[400px]:flex-row">
                  <Button asChild size="lg">
                    <Link href="/beta">
                      Join the Beta <ArrowRight className="ml-2 h-4 w-4" />
                    </Link>
                  </Button>
                  <Button asChild variant="outline" size="lg">
                    <Link href="/contact">Contact Us</Link>
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
      <SiteFooter />
    </div>
  )
}
