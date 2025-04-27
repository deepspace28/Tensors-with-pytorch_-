import { ScientificLogo } from "@/components/scientific-logo"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

export function FeatureSection() {
  return (
    <section className="w-full py-12 md:py-24 lg:py-32 bg-gradient-to-b from-background to-muted/30">
      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-center justify-center space-y-4 text-center">
          <div className="space-y-2">
            <div className="inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2">
              <span>Powered by Advanced AI</span>
            </div>
            <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">Scientific Research, Accelerated</h2>
            <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
              Synaptiq combines cutting-edge AI with rigorous scientific validation to provide researchers with powerful
              tools for discovery.
            </p>
          </div>
        </div>
        <div className="mx-auto grid max-w-5xl grid-cols-1 gap-6 py-12 md:grid-cols-2 lg:grid-cols-3">
          <Card className="border border-primary/10 bg-card/60 backdrop-blur-sm hover:border-primary/30 transition-all duration-300">
            <CardHeader className="pb-2">
              <div className="rounded-full bg-primary/10 p-2 ring-1 ring-primary/20">
                <ScientificLogo variant="simple" className="h-5 w-5 text-primary" />
              </div>
              <CardTitle className="mt-2">Scientific LLM</CardTitle>
              <CardDescription>Specialized language model trained on scientific literature.</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                Our LLM understands complex scientific concepts, can generate hypotheses, and assist with literature
                reviews.
              </p>
            </CardContent>
          </Card>
          <Card className="border border-primary/10 bg-card/60 backdrop-blur-sm hover:border-primary/30 transition-all duration-300">
            <CardHeader className="pb-2">
              <div className="rounded-full bg-primary/10 p-2 ring-1 ring-primary/20">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="h-5 w-5 text-primary"
                >
                  <circle cx="12" cy="12" r="8" />
                  <path d="M12 2v4" />
                  <path d="M12 18v4" />
                  <path d="M4.93 4.93l2.83 2.83" />
                  <path d="M16.24 16.24l2.83 2.83" />
                </svg>
              </div>
              <CardTitle className="mt-2">Quantum Simulations</CardTitle>
              <CardDescription>Run complex quantum simulations with unprecedented accuracy.</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                Simulate quantum systems, test theories, and explore quantum phenomena with our advanced simulation
                tools.
              </p>
            </CardContent>
          </Card>
          <Card className="border border-primary/10 bg-card/60 backdrop-blur-sm hover:border-primary/30 transition-all duration-300">
            <CardHeader className="pb-2">
              <div className="rounded-full bg-primary/10 p-2 ring-1 ring-primary/20">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="h-5 w-5 text-primary"
                >
                  <path d="M15 3h4a2 2 0 0 1 2 2v4" />
                  <path d="M9 3H5a2 2 0 0 0-2 2v4" />
                  <path d="M15 21h4a2 2 0 0 0 2-2v-4" />
                  <path d="M9 21H5a2 2 0 0 1-2-2v-4" />
                  <circle cx="12" cy="12" r="4" />
                </svg>
              </div>
              <CardTitle className="mt-2">Scientific Validation</CardTitle>
              <CardDescription>Rigorous validation by leading researchers.</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                All our models and algorithms undergo extensive peer review and validation by experts in physics and
                mathematics.
              </p>
            </CardContent>
          </Card>
          <Card className="border border-primary/10 bg-card/60 backdrop-blur-sm hover:border-primary/30 transition-all duration-300">
            <CardHeader className="pb-2">
              <div className="rounded-full bg-primary/10 p-2 ring-1 ring-primary/20">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="h-5 w-5 text-primary"
                >
                  <path d="M18 16.98h-5.99c-1.1 0-1.95.5-2.38 1.52m0 0c-.43 1.02-.17 2.19.59 2.94m-.59-2.94c.38.9 1.28 1.5 2.38 1.5h5.99c1.1 0 2-.9 2-2v-2c0-1.1-.9-2-2-2h-6c-1.1 0-2-.9-2-2V9" />
                  <path d="M18 5H7C5.9 5 5 5.9 5 7v2c0 1.1.9 2 2 2h6c1.1 0 2 .9 2 2v1" />
                </svg>
              </div>
              <CardTitle className="mt-2">API Access</CardTitle>
              <CardDescription>Integrate with your existing research workflow.</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                Our comprehensive API allows seamless integration with Python, MATLAB, R, and other research
                environments.
              </p>
            </CardContent>
          </Card>
          <Card className="border border-primary/10 bg-card/60 backdrop-blur-sm hover:border-primary/30 transition-all duration-300">
            <CardHeader className="pb-2">
              <div className="rounded-full bg-primary/10 p-2 ring-1 ring-primary/20">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="h-5 w-5 text-primary"
                >
                  <path d="M14 11c5.333 1.333 5.333 12 0 12" />
                  <path d="M10 11c-5.333 1.333-5.333 12 0 12" />
                  <path d="M12 2a2 2 0 0 0-2 2v8a2 2 0 0 0 4 0V4a2 2 0 0 0-2-2Z" />
                </svg>
              </div>
              <CardTitle className="mt-2">Mathematical Modeling</CardTitle>
              <CardDescription>Advanced mathematical modeling and analysis.</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                Solve complex mathematical problems, verify proofs, and explore mathematical concepts with our
                specialized tools.
              </p>
            </CardContent>
          </Card>
          <Card className="border border-primary/10 bg-card/60 backdrop-blur-sm hover:border-primary/30 transition-all duration-300">
            <CardHeader className="pb-2">
              <div className="rounded-full bg-primary/10 p-2 ring-1 ring-primary/20">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="h-5 w-5 text-primary"
                >
                  <path d="M21 8v13H3V8" />
                  <path d="M1 3h22v5H1z" />
                  <path d="M10 12h4" />
                </svg>
              </div>
              <CardTitle className="mt-2">Research Database</CardTitle>
              <CardDescription>Access to a vast database of scientific knowledge.</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                Our platform is trained on millions of scientific papers, textbooks, and research data to provide
                comprehensive insights.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  )
}
