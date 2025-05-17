import Link from "next/link"
import { ArrowLeft } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { ScientificLogo } from "@/components/scientific-logo"

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-black text-white">
      {/* Header */}
      <header className="border-b border-gray-800 bg-black">
        <div className="container flex h-16 items-center px-4">
          <Link href="/" className="flex items-center space-x-2">
            <Button variant="ghost" size="icon" className="mr-2">
              <ArrowLeft className="h-5 w-5" />
              <span className="sr-only">Back</span>
            </Button>
            <ScientificLogo className="h-8 w-8 text-white" />
            <span className="font-bold">Synaptiq</span>
          </Link>
        </div>
      </header>

      {/* Main Content */}
      <main className="container px-4 py-12">
        <div className="mx-auto max-w-4xl space-y-12">
          {/* Hero Section */}
          <section className="text-center">
            <h1 className="mb-6 text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl">About Synaptiq</h1>
          </section>

          {/* Mission Section */}
          <Card className="border-gray-800 bg-gray-900">
            <CardContent className="p-6 sm:p-8">
              <div className="prose prose-invert max-w-none">
                <p className="text-xl font-light leading-relaxed text-gray-300">
                  At Synaptiq, we stand at the frontier where artificial intelligence meets scientific discovery. Our
                  mission is singular yet profound: to harness the generative power of AI to formulate new, legitimate
                  theories in quantum mechanics and space science—theories that expand our understanding of the
                  universe's fundamental workings.
                </p>

                <p className="mt-6 text-xl font-light leading-relaxed text-gray-300">
                  We've created a unique synthesis where advanced neural architectures don't merely process scientific
                  data—they engage with it through the rigorous lens of established scientific methodology. This isn't
                  AI as a tool; it's AI as a collaborative theorist, bound by the same principles of falsifiability,
                  reproducibility, and empirical validation that have guided scientific progress for centuries.
                </p>

                <p className="mt-6 text-xl font-light leading-relaxed text-gray-300">
                  Synaptiq serves as more than a platform—it's a collaborative nexus where researchers, engineers, and
                  visionaries converge. Here, human intuition and machine intelligence form an unprecedented alliance,
                  working in concert to navigate the vast possibility spaces of theoretical physics and cosmology that
                  remain unexplored.
                </p>

                <p className="mt-6 text-xl font-light leading-relaxed text-gray-300">
                  Our commitment extends beyond incremental advances. We're dedicated to accelerating the pace of
                  scientific discovery, challenging established paradigms, and illuminating paths toward knowledge that
                  might otherwise remain in darkness for decades. In the space between what is known and what is
                  possible, Synaptiq creates the conditions for breakthrough.
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Call to Action */}
          <div className="flex justify-center">
            <Button asChild className="bg-white text-black hover:bg-gray-200">
              <Link href="/demo">Experience Synaptiq</Link>
            </Button>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-gray-800 bg-black py-8">
        <div className="container px-4 text-center text-gray-400">
          <p>© {new Date().getFullYear()} Synaptiq. All rights reserved.</p>
          <div className="mt-4 flex justify-center space-x-4">
            <Link href="/terms" className="hover:text-white">
              Terms
            </Link>
            <Link href="/privacy" className="hover:text-white">
              Privacy
            </Link>
            <Link href="/cookies" className="hover:text-white">
              Cookies
            </Link>
          </div>
        </div>
      </footer>
    </div>
  )
}
