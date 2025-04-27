import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"
import { LatexTest } from "@/components/latex-test"

export const metadata = {
  title: "LaTeX Rendering Test",
  description: "Test page for LaTeX equation rendering",
}

export default function LatexTestPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <SiteHeader />
      <main className="flex-1 container py-12">
        <div className="mx-auto max-w-3xl">
          <h1 className="text-3xl font-bold mb-8">LaTeX Rendering Test</h1>
          <LatexTest />
        </div>
      </main>
      <SiteFooter />
    </div>
  )
}
