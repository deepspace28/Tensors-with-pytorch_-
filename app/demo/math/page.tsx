import Link from "next/link"
import { ArrowLeft } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"

export const metadata = {
  title: "Mathematical Proof Generator",
  description: "Experience Synaptiq's mathematical proof generation capabilities.",
}

export default function MathDemoPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <SiteHeader />
      <main className="flex-1">
        <section className="container py-12 md:py-24 lg:py-32">
          <div className="mx-auto flex max-w-[58rem] flex-col items-center justify-center gap-4 text-center">
            <h1 className="text-3xl font-bold leading-tight tracking-tighter md:text-5xl lg:text-6xl lg:leading-[1.1]">
              Mathematical Proof Generator
            </h1>
            <p className="max-w-[85%] leading-normal text-muted-foreground sm:text-lg sm:leading-7 md:text-xl">
              Generate step-by-step mathematical proofs with Synaptiq's advanced reasoning.
            </p>
          </div>
          <div className="mx-auto mt-12 max-w-3xl">
            <Card className="border-border/40">
              <CardHeader>
                <CardTitle>Proof of the Pythagorean Theorem</CardTitle>
                <CardDescription>Step-by-step proof generation</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="rounded-md border border-border/40 bg-muted/30 p-4">
                  <p className="font-medium">Query: Prove the Pythagorean theorem step by step.</p>
                </div>
                <div className="rounded-md border border-border/40 bg-muted/30 p-6 space-y-4">
                  <p className="font-medium">Synaptiq Proof:</p>
                  <div className="space-y-3 text-sm">
                    <p>
                      <strong>Step 1:</strong> Consider a right triangle with sides a, b, and hypotenuse c.
                    </p>
                    <p>
                      <strong>Step 2:</strong> Construct a square with side length a + b.
                    </p>
                    <p>
                      <strong>Step 3:</strong> Inside this square, place four copies of our right triangle to form an
                      inner square.
                    </p>
                    <p>
                      <strong>Step 4:</strong> The area of the large square is (a + b)² = a² + 2ab + b²
                    </p>
                    <p>
                      <strong>Step 5:</strong> The area can also be calculated as the sum of the inner square and the
                      four triangles:
                    </p>
                    <p>Area = c² + 4(½ab) = c² + 2ab</p>
                    <p>
                      <strong>Step 6:</strong> Equating these two expressions:
                    </p>
                    <p>a² + 2ab + b² = c² + 2ab</p>
                    <p>
                      <strong>Step 7:</strong> Simplifying:
                    </p>
                    <p>a² + b² = c²</p>
                    <p>
                      <strong>Conclusion:</strong> Thus, in a right triangle, the square of the hypotenuse equals the
                      sum of the squares of the other two sides.
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
