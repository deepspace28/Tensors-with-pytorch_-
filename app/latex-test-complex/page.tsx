import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"
import { LatexTestComplex } from "@/components/latex-test-complex"

export const metadata = {
  title: "Complex LaTeX Rendering Test",
  description: "Test page for complex LaTeX equation rendering",
}

export default function LatexTestComplexPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <SiteHeader />
      <main className="flex-1 container py-12">
        <div className="mx-auto max-w-4xl">
          <h1 className="text-3xl font-bold mb-8">Complex LaTeX Rendering Test</h1>
          <LatexTestComplex />
        </div>
      </main>
      <SiteFooter />
    </div>
  )
}
