import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"
import { MultilineEquationTest } from "@/components/multiline-equation-test"

export const metadata = {
  title: "Multi-line Equation Test",
  description: "Test page for complex multi-line LaTeX equation environments",
}

export default function MultilineEquationTestPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <SiteHeader />
      <main className="flex-1 container py-12">
        <div className="mx-auto max-w-4xl">
          <h1 className="text-3xl font-bold mb-8">Multi-line Equation Environment Test</h1>
          <MultilineEquationTest />
        </div>
      </main>
      <SiteFooter />
    </div>
  )
}
