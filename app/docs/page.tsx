import Link from "next/link"
import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Server, Database, Network, IterationCcw, LineChart } from "lucide-react"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { SearchBar } from "@/components/docs/search-bar"
import { GlossaryTooltip } from "@/components/docs/glossary-tooltip"
import { ApiConsole } from "@/components/docs/api-console"
import { UserRoles } from "@/components/docs/user-roles"
import { PerformanceBenchmarks } from "@/components/docs/performance-benchmarks"
import { VisualGallery } from "@/components/docs/visual-gallery"
import Image from "next/image"

export const metadata = {
  title: "Synaptiq Documentation | Scientific AI Platform",
  description: "Comprehensive documentation for the Synaptiq scientific AI platform.",
}

export default function DocsPage() {
  const hypothesis = {
    title: "Quantum Entanglement Decay Model",
    description:
      "A model proposing that quantum entanglement between particles decays logarithmically with distance in curved spacetime.",
    confidence: 0.72,
    novelty_score: 0.85,
  }

  // Define refined_theory to fix the reference in the code example
  const refined_theory = {
    confidence: 0.89,
    formalization: "mathematical",
    consistency: true,
    predictions: ["Entanglement decay rate proportional to spacetime curvature", "Threshold effect at event horizons"],
  }

  return (
    <div className="flex min-h-screen flex-col bg-black">
      <SiteHeader />
      <main className="flex-1">
        {/* Hero Section */}
        <section className="w-full py-12 md:py-24 lg:py-32">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <Badge className="px-4 py-1 text-sm bg-white text-black" variant="outline">
                Documentation
              </Badge>
              <h1 className="text-3xl font-bold tracking-tighter text-white sm:text-5xl md:text-6xl">
                Synaptiq Platform Docs
              </h1>
              <p className="max-w-[700px] text-lg text-gray-400 md:text-xl">
                Comprehensive guides and references to help you leverage the full power of Synaptiq's scientific AI.
              </p>
              <div className="w-full max-w-md">
                <SearchBar />
              </div>
              <div className="mt-4">
                <Button asChild variant="outline" className="border-gray-700 text-white hover:bg-gray-800">
                  <Link href="/docs/internal">Internal Documentation →</Link>
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* Introduction / Overview */}
        <section className="w-full py-12 md:py-24 bg-black border-t border-b border-gray-900">
          <div className="container px-4 md:px-6">
            <div className="grid gap-10 lg:grid-cols-2 lg:gap-16 items-center">
              <div>
                <h2 className="text-3xl font-bold tracking-tighter text-white mb-4">1. Introduction</h2>
                <div className="space-y-6">
                  <div>
                    <h3 className="text-xl font-bold text-white mb-2">What is Synaptiq?</h3>
                    <p className="text-gray-300">
                      Synaptiq is an AI system that formulates and evaluates original theories in quantum mechanics and
                      space science, blending symbolic reasoning with neural inference.
                    </p>
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-white mb-2">Why it matters</h3>
                    <p className="text-gray-300">
                      We accelerate fundamental discovery by empowering machines to ask meaningful questions, not just
                      answer them.
                    </p>
                  </div>
                  <div className="mt-6">
                    <Button asChild className="bg-white text-black hover:bg-gray-200">
                      <Link href="/docs/introduction">Learn More About Synaptiq</Link>
                    </Button>
                  </div>
                </div>
              </div>
              <div className="bg-black rounded-lg p-6 border border-gray-800">
                <div className="aspect-video relative rounded-md overflow-hidden border border-gray-800">
                  <Image
                    src="/placeholder-3ufi1.png"
                    alt="Synaptiq Neural Network Visualization"
                    width={600}
                    height={400}
                    className="object-cover"
                  />
                </div>
                <div className="mt-4">
                  <p className="text-sm text-gray-400 italic">
                    Visualization of Synaptiq's NeuroSymbolic architecture, showing the integration of symbolic
                    reasoning and neural networks.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* User Roles & Use Cases */}
        <section className="w-full py-12 md:py-24 bg-black">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center mb-12">
              <h2 className="text-3xl font-bold tracking-tighter text-white">Who is Synaptiq For?</h2>
              <p className="max-w-[700px] text-gray-400">
                Discover how different types of users leverage Synaptiq for scientific discovery.
              </p>
            </div>
            <UserRoles />
          </div>
        </section>

        {/* Generated Hypothesis Section */}
        <section className="w-full py-12 md:py-24 bg-black border-t border-gray-900">
          <div className="container px-4 md:px-6">
            <h2 className="text-3xl font-bold tracking-tighter text-white mb-4">Generated Hypothesis</h2>
            <div className="bg-black rounded-lg p-6 border border-gray-800">
              <p className="text-white mb-2">
                <strong>Title:</strong> {hypothesis.title}
              </p>
              <p className="text-gray-300 mb-2">{hypothesis.description}</p>
              <p className="text-sm text-gray-400 italic">
                Confidence: {hypothesis.confidence}, Novelty Score: {hypothesis.novelty_score}
              </p>
            </div>
          </div>
        </section>

        {/* Core Concepts */}
        <section className="w-full py-12 md:py-24 bg-black border-t border-gray-900">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center mb-12">
              <h2 className="text-3xl font-bold tracking-tighter text-white">2. Core Concepts</h2>
              <p className="max-w-[700px] text-gray-400">
                Understanding the fundamental building blocks of the Synaptiq platform.
              </p>
            </div>
            <div className="mb-12">
              <h3 className="text-xl font-bold text-white mb-6 text-center">Key Visualizations</h3>
              <VisualGallery />
            </div>
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              <Card className="bg-black border-gray-800 text-white hover:bg-gray-950 transition-colors">
                <CardHeader className="flex flex-row items-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-gray-800 flex items-center justify-center">
                    <svg
                      className="h-6 w-6 text-white"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M18 16.98h-6m6-3.99h-6m6-3.99h-6M7 16.99a2 2 0 100-4 2 2 0 000 4zM7 9a2 2 0 100-4 2 2 0 000 4z" />
                      <path d="M9 9l5 2-5 2" />
                    </svg>
                  </div>
                  <div>
                    <CardTitle>
                      <GlossaryTooltip
                        term="NeuroSymbolic Engine"
                        definition="A hybrid AI architecture that combines neural networks with symbolic reasoning systems to leverage the strengths of both approaches for scientific discovery."
                      >
                        NeuroSymbolic Engine
                      </GlossaryTooltip>
                    </CardTitle>
                    <CardDescription className="text-gray-400">Integration of reasoning and ML</CardDescription>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="mb-4 aspect-video relative rounded-md overflow-hidden border border-gray-800">
                    <Image
                      src="/placeholder-0j1mc.png"
                      alt="NeuroSymbolic Engine Visualization"
                      width={400}
                      height={200}
                      className="object-cover"
                    />
                  </div>
                  <p className="text-gray-300 mb-4">
                    The NeuroSymbolic Engine combines symbolic reasoning with neural networks to generate and validate
                    scientific theories.
                  </p>
                  <Button asChild variant="outline" className="w-full border-gray-700 text-white hover:bg-gray-800">
                    <Link href="/docs/core-concepts/neurosymbolic-engine" target="_blank">
                      Learn more →
                    </Link>
                  </Button>
                </CardContent>
              </Card>
              <Card className="bg-black border-gray-800 text-white hover:bg-gray-950 transition-colors">
                <CardHeader className="flex flex-row items-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-gray-800 flex items-center justify-center">
                    <Network className="h-6 w-6 text-white" />
                  </div>
                  <div>
                    <CardTitle>
                      <GlossaryTooltip
                        term="Theory Graphs"
                        definition="A structured representation of scientific hypotheses and their relationships, allowing for systematic exploration and refinement through a graph-based approach."
                      >
                        Theory Graphs
                      </GlossaryTooltip>
                    </CardTitle>
                    <CardDescription className="text-gray-400">Representation of evolving hypotheses</CardDescription>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="mb-4 aspect-video relative rounded-md overflow-hidden border border-gray-800">
                    <Image
                      src="/placeholder-sio6u.png"
                      alt="Theory Graphs Visualization"
                      width={400}
                      height={200}
                      className="object-cover"
                    />
                  </div>
                  <p className="text-gray-300 mb-4">
                    Theory Graphs provide a structured representation of scientific hypotheses and their relationships,
                    allowing for systematic exploration.
                  </p>
                  <Button asChild variant="outline" className="w-full border-gray-700 text-white hover:bg-gray-800">
                    <Link href="/docs/core-concepts/theory-graphs" target="_blank">
                      Learn more →
                    </Link>
                  </Button>
                </CardContent>
              </Card>
              <Card className="bg-black border-gray-800 text-white hover:bg-gray-950 transition-colors">
                <CardHeader className="flex flex-row items-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-gray-800 flex items-center justify-center">
                    <svg
                      className="h-6 w-6 text-white"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <circle cx="12" cy="12" r="10" />
                      <path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83" />
                    </svg>
                  </div>
                  <div>
                    <CardTitle>Inference Layer</CardTitle>
                    <CardDescription className="text-gray-400">How predictions and validations work</CardDescription>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="mb-4 aspect-video relative rounded-md overflow-hidden border border-gray-800">
                    <Image
                      src="/placeholder-fbdad.png"
                      alt="Inference Layer Visualization"
                      width={400}
                      height={200}
                      className="object-cover"
                    />
                  </div>
                  <p className="text-gray-300 mb-4">
                    The Inference Layer translates theoretical constructs into testable predictions and validates them
                    against known data.
                  </p>
                  <Button asChild variant="outline" className="w-full border-gray-700 text-white hover:bg-gray-800">
                    <Link href="/docs/core-concepts/inference-layer" target="_blank">
                      Learn more →
                    </Link>
                  </Button>
                </CardContent>
              </Card>
              <Card className="bg-black border-gray-800 text-white hover:bg-gray-950 transition-colors">
                <CardHeader className="flex flex-row items-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-gray-800 flex items-center justify-center">
                    <IterationCcw className="h-6 w-6 text-white" />
                  </div>
                  <div>
                    <CardTitle>Critique & Feedback Loop</CardTitle>
                    <CardDescription className="text-gray-400">Metacognitive logic</CardDescription>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="mb-4 aspect-video relative rounded-md overflow-hidden border border-gray-800">
                    <Image
                      src="/placeholder-0hbrw.png"
                      alt="Critique & Feedback Loop Visualization"
                      width={400}
                      height={200}
                      className="object-cover"
                    />
                  </div>
                  <p className="text-gray-300 mb-4">
                    The Critique & Feedback Loop enables Synaptiq to evaluate and refine its own theories through
                    iterative improvement.
                  </p>
                  <Button asChild variant="outline" className="w-full border-gray-700 text-white hover:bg-gray-800">
                    <Link href="/docs/core-concepts/critique-feedback" target="_blank">
                      Learn more →
                    </Link>
                  </Button>
                </CardContent>
              </Card>
              <Card className="bg-black border-gray-800 text-white hover:bg-gray-950 transition-colors">
                <CardHeader className="flex flex-row items-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-gray-800 flex items-center justify-center">
                    <svg
                      className="h-6 w-6 text-white"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M12 2a10 10 0 1 0 10 10H2A10 10 0 0 0 12 2Z" />
                      <path d="M5 10a7 7 0 0 0 14 0" />
                    </svg>
                  </div>
                  <div>
                    <CardTitle>Frontier Mode</CardTitle>
                    <CardDescription className="text-gray-400">High-risk, novel idea generator</CardDescription>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="mb-4 aspect-video relative rounded-md overflow-hidden border border-gray-800">
                    <Image
                      src="/placeholder-n9z7y.png"
                      alt="Frontier Mode Visualization"
                      width={400}
                      height={200}
                      className="object-cover"
                    />
                  </div>
                  <p className="text-gray-300 mb-4">
                    Frontier Mode pushes the boundaries of conventional thinking to generate high-risk, potentially
                    groundbreaking scientific theories.
                  </p>
                  <Button asChild variant="outline" className="w-full border-gray-700 text-white hover:bg-gray-800">
                    <Link href="/docs/core-concepts/frontier-mode" target="_blank">
                      Learn more →
                    </Link>
                  </Button>
                </CardContent>
              </Card>
              <Card className="bg-black border-gray-800 text-white hover:bg-gray-950 transition-colors">
                <CardHeader className="flex flex-row items-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-gray-800 flex items-center justify-center">
                    <svg
                      className="h-6 w-6 text-white"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <circle cx="18" cy="18" r="3" />
                      <circle cx="6" cy="6" r="3" />
                      <path d="M13 6h3a2 2 0 0 1 2 2v7" />
                      <path d="M11 18H8a2 2 0 0 1-2-2V9" />
                    </svg>
                  </div>
                  <div>
                    <CardTitle>Core Concepts Overview</CardTitle>
                    <CardDescription className="text-gray-400">Complete documentation</CardDescription>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="mb-4 aspect-video relative rounded-md overflow-hidden border border-gray-800">
                    <Image
                      src="/placeholder-9d1gu.png"
                      alt="Core Concepts Overview"
                      width={400}
                      height={200}
                      className="object-cover"
                    />
                  </div>
                  <p className="text-gray-300 mb-4">
                    Explore all core concepts in detail, including visuals and pseudocode examples to help you
                    understand Synaptiq's architecture.
                  </p>
                  <Button asChild variant="outline" className="w-full border-gray-700 text-white hover:bg-gray-800">
                    <Link href="/docs/core-concepts" target="_blank">
                      View All Core Concepts
                    </Link>
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Architecture Deep Dive */}
        <section className="w-full py-12 md:py-24 bg-black border-t border-gray-900">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center mb-12">
              <h2 className="text-3xl font-bold tracking-tighter text-white">3. Architecture Deep Dive</h2>
              <p className="max-w-[700px] text-gray-400">
                Explore the technical architecture of Synaptiq and understand how the components work together.
              </p>
            </div>
            <div className="grid gap-8 md:grid-cols-2">
              <div>
                <div className="bg-black rounded-lg p-6 border border-gray-800 mb-8">
                  <h3 className="text-xl font-bold text-white mb-4">Modular Overview</h3>
                  <div className="aspect-square relative rounded-md overflow-hidden border border-gray-800">
                    <Image
                      src="/system-architecture-diagram.png"
                      alt="Synaptiq Architecture Diagram"
                      width={500}
                      height={500}
                      className="object-cover"
                    />
                  </div>
                  <p className="mt-4 text-gray-300 text-sm">
                    Synaptiq's modular architecture allows for flexible integration of different components and easy
                    extension.
                  </p>
                </div>
                <Card className="bg-black border-gray-800 text-white">
                  <CardHeader>
                    <CardTitle>ML Models</CardTitle>
                    <CardDescription className="text-gray-400">
                      Types, training regimes, and integration
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Accordion type="single" collapsible className="w-full">
                      <AccordionItem value="item-1" className="border-gray-800">
                        <AccordionTrigger className="text-white">Foundation Models</AccordionTrigger>
                        <AccordionContent className="text-gray-300">
                          Synaptiq uses specialized foundation models fine-tuned on scientific literature and
                          mathematical reasoning tasks.
                        </AccordionContent>
                      </AccordionItem>
                      <AccordionItem value="item-2" className="border-gray-800">
                        <AccordionTrigger className="text-white">Domain-Specific Models</AccordionTrigger>
                        <AccordionContent className="text-gray-300">
                          Custom models trained for specific scientific domains like quantum mechanics, astrophysics,
                          and particle physics.
                        </AccordionContent>
                      </AccordionItem>
                      <AccordionItem value="item-3" className="border-gray-800">
                        <AccordionTrigger className="text-white">Training Methodology</AccordionTrigger>
                        <AccordionContent className="text-gray-300">
                          Our models are trained using a combination of supervised learning, reinforcement learning from
                          scientific feedback, and self-supervised learning on vast scientific corpora.
                        </AccordionContent>
                      </AccordionItem>
                    </Accordion>
                  </CardContent>
                </Card>
              </div>
              <div className="space-y-8">
                <Card className="bg-black border-gray-800 text-white">
                  <CardHeader>
                    <CardTitle>Inter-process Communication</CardTitle>
                    <CardDescription className="text-gray-400">
                      Memory, caching, and data flow strategies
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-300 mb-4">
                      Synaptiq uses a distributed architecture with efficient inter-process communication protocols to
                      handle complex scientific computations.
                    </p>
                    <div className="bg-black text-white border border-gray-800 rounded-md p-4 font-mono text-sm">
                      <p className="text-gray-300"># Example IPC configuration</p>
                      <p className="text-white">ipc_config = {"{"}</p>
                      <p className="text-white ml-4">"protocol": "grpc",</p>
                      <p className="text-white ml-4">"memory_model": "shared",</p>
                      <p className="text-white ml-4">"cache_strategy": "distributed_lru",</p>
                      <p className="text-white ml-4">"timeout_ms": 5000</p>
                      <p className="text-white">{"}"}</p>
                    </div>
                  </CardContent>
                </Card>
                <Card className="bg-black border-gray-800 text-white">
                  <CardHeader>
                    <CardTitle>Logic Engine Architecture</CardTitle>
                    <CardDescription className="text-gray-400">Theorem prover and reasoning system</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-300 mb-4">
                      The Logic Engine combines automated theorem proving with probabilistic reasoning to validate
                      scientific theories.
                    </p>
                    <div className="bg-black text-white border border-gray-800 rounded-md p-4 font-mono text-sm">
                      <p className="text-gray-300"># Pseudocode for theory validation</p>
                      <p className="text-white">def validate_theory(theory, evidence):</p>
                      <p className="text-white ml-4">axioms = extract_axioms(theory)</p>
                      <p className="text-white ml-4">theorems = derive_theorems(axioms)</p>
                      <p className="text-white ml-4">predictions = generate_predictions(theorems)</p>
                      <p className="text-white ml-4">return compare_with_evidence(predictions, evidence)</p>
                    </div>
                  </CardContent>
                </Card>
                <div className="bg-black rounded-lg p-6 border border-gray-800">
                  <h3 className="text-xl font-bold text-white mb-4">Extension Points</h3>
                  <p className="text-gray-300 mb-4">
                    Synaptiq is designed to be extensible. Here's where you can plug in your own components:
                  </p>
                  <ul className="space-y-2 text-gray-300">
                    <li className="flex items-start gap-2">
                      <div className="rounded-full bg-white/10 p-1 mt-0.5">
                        <span className="text-white text-xs">→</span>
                      </div>
                      <span>Custom logic engines via the LogicEngineInterface</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <div className="rounded-full bg-white/10 p-1 mt-0.5">
                        <span className="text-white text-xs">→</span>
                      </div>
                      <span>Domain-specific validators using the ValidationPlugin API</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <div className="rounded-full bg-white/10 p-1 mt-0.5">
                        <span className="text-white text-xs">→</span>
                      </div>
                      <span>Custom ML models through the ModelRegistry</span>
                    </li>
                  </ul>
                  <div className="mt-4">
                    <Button asChild className="bg-white text-black hover:bg-gray-200">
                      <Link href="/docs/architecture/extension-guide">Extension Guide</Link>
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* API Reference */}
        <section className="w-full py-12 md:py-24 bg-black border-t border-gray-900">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center mb-12">
              <h2 className="text-3xl font-bold tracking-tighter text-white">4. API Reference</h2>
              <p className="max-w-[700px] text-gray-400">
                Comprehensive documentation of Synaptiq's APIs, including REST, GraphQL, and CLI interfaces.
              </p>
            </div>
            <Tabs defaultValue="rest" className="w-full">
              <TabsList className="w-full max-w-md mx-auto bg-black border border-gray-800">
                <TabsTrigger value="rest" className="data-[state=active]:bg-white data-[state=active]:text-black">
                  REST API
                </TabsTrigger>
                <TabsTrigger value="graphql" className="data-[state=active]:bg-white data-[state=active]:text-black">
                  GraphQL
                </TabsTrigger>
                <TabsTrigger value="cli" className="data-[state=active]:bg-white data-[state=active]:text-black">
                  CLI
                </TabsTrigger>
                <TabsTrigger value="python" className="data-[state=active]:bg-white data-[state=active]:text-black">
                  Python SDK
                </TabsTrigger>
              </TabsList>
              <TabsContent value="rest" className="mt-6">
                <ApiConsole />
              </TabsContent>
              <TabsContent value="graphql" className="mt-6">
                <Card className="bg-black border-gray-800">
                  <CardHeader>
                    <CardTitle className="text-white">GraphQL API</CardTitle>
                    <CardDescription className="text-gray-400">
                      Flexible GraphQL interface for complex queries and mutations
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="bg-black p-4 rounded-md border border-gray-800">
                      <p className="text-sm text-white font-mono mb-2">GraphQL Schema Excerpt</p>
                      <div className="bg-black text-white border border-gray-800 rounded-md p-3 font-mono text-xs">
                        <p className="text-white">type Theory {"{"}</p>
                        <p className="text-white ml-4">id: ID!</p>
                        <p className="text-white ml-4">title: String!</p>
                        <p className="text-white ml-4">description: String!</p>
                        <p className="text-white ml-4">domain: Domain!</p>
                        <p className="text-white ml-4">axioms: [Axiom!]!</p>
                        <p className="text-white ml-4">predictions: [Prediction!]!</p>
                        <p className="text-white ml-4">evaluations: [Evaluation!]</p>
                        <p className="text-white ml-4">createdAt: DateTime!</p>
                        <p className="text-white ml-4">updatedAt: DateTime!</p>
                        <p className="text-white">{"}"}</p>
                        <p className="text-white mt-2">type Query {"{"}</p>
                        <p className="text-white ml-4">theory(id: ID!): Theory</p>
                        <p className="text-white ml-4">theories(domain: Domain, limit: Int, offset: Int): [Theory!]!</p>
                        <p className="text-white">{"}"}</p>
                        <p className="text-white mt-2">type Mutation {"{"}</p>
                        <p className="text-white ml-4">generateTheory(input: GenerateTheoryInput!): Theory!</p>
                        <p className="text-white ml-4">
                          evaluateTheory(id: ID!, input: EvaluateTheoryInput!): Evaluation!
                        </p>
                        <p className="text-white">{"}"}</p>
                      </div>
                    </div>
                    <div className="mt-6">
                      <Button asChild variant="outline" className="w-full border-gray-700 text-white hover:bg-gray-800">
                        <Link href="/docs/api/graphql">View Complete GraphQL Documentation</Link>
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
              <TabsContent value="cli" className="mt-6">
                <Card className="bg-black border-gray-800">
                  <CardHeader>
                    <CardTitle className="text-white">Command Line Interface</CardTitle>
                    <CardDescription className="text-gray-400">
                      Interact with Synaptiq directly from your terminal
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="bg-black p-4 rounded-md border border-gray-800">
                        <p className="text-sm text-white font-mono mb-2">Generate a Theory</p>
                        <div className="bg-black text-white border border-gray-800 rounded-md p-3 font-mono text-xs">
                          <p className="text-white">synaptiq theories generate \</p>
                          <p className="text-white ml-4">--domain quantum_mechanics \</p>
                          <p className="text-white ml-4">--constraints conservation_of_energy \</p>
                          <p className="text-white ml-4">--creativity-level 0.8 \</p>
                          <p className="text-white ml-4">--output-format json</p>
                        </div>
                      </div>
                      <div className="bg-black p-4 rounded-md border border-gray-800">
                        <p className="text-sm text-white font-mono mb-2">Evaluate a Theory</p>
                        <div className="bg-black text-white border border-gray-800 rounded-md p-3 font-mono text-xs">
                          <p className="text-white">synaptiq theories evaluate \</p>
                          <p className="text-white ml-4">--theory-id th_1234abcd \</p>
                          <p className="text-white ml-4">--criteria logical_consistency empirical_evidence \</p>
                          <p className="text-white ml-4">--evidence-datasets CERN_2022 quantum_experiments_2023 \</p>
                          <p className="text-white ml-4">--detail-level comprehensive</p>
                        </div>
                      </div>
                    </div>
                    <div className="mt-6">
                      <Button asChild variant="outline" className="w-full border-gray-700 text-white hover:bg-gray-800">
                        <Link href="/docs/api/cli">View Complete CLI Documentation</Link>
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
              <TabsContent value="python" className="mt-6">
                <Card className="bg-black border-gray-800">
                  <CardHeader>
                    <CardTitle className="text-white">Python SDK</CardTitle>
                    <CardDescription className="text-gray-400">
                      Integrate Synaptiq directly into your Python workflows
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="bg-black p-4 rounded-md border border-gray-800">
                      <p className="text-sm text-white font-mono mb-2">Python SDK Example</p>
                      <div className="bg-black text-white border border-gray-800 rounded-md p-3 font-mono text-xs">
                        <p className="text-white">from synaptiq import SynaptiqClient</p>
                        <p className="text-white">from synaptiq.domains import QuantumMechanics</p>
                        <p className="text-white">from synaptiq.constraints import ConservationOfEnergy</p>
                        <p className="text-white mt-2"># Initialize the client</p>
                        <p className="text-white">client = SynaptiqClient(api_key="your_api_key")</p>
                        <p className="text-white mt-2"># Create a domain with constraints</p>
                        <p className="text-white">domain = QuantumMechanics(constraints=[ConservationOfEnergy()])</p>
                        <p className="text-white mt-2"># Generate a theory</p>
                        <p className="text-white">theory = client.theories.generate(</p>
                        <p className="text-white ml-4">domain=domain,</p>
                        <p className="text-white ml-4">creativity_level=0.8,</p>
                        <p className="text-white ml-4">max_complexity=3</p>
                        <p className="text-white">)</p>
                        <p className="text-white mt-2"># Evaluate the theory</p>
                        <p className="text-white">theory.evaluate(</p>
                        <p className="text-white ml-4">criteria=["logical_consistency", "empirical_evidence"],</p>
                        <p className="text-white ml-4">evidence_datasets=["CERN_2022", "quantum_experiments_2023"],</p>
                        <p className="text-white ml-4">detail_level="comprehensive"</p>
                        <p className="text-white">)</p>
                        <p className="text-white mt-2"># Print the evaluation summary</p>
                        <p className="text-white">print(theory.summary())</p>
                      </div>
                    </div>
                    <div className="mt-6">
                      <Button asChild variant="outline" className="w-full border-gray-700 text-white hover:bg-gray-800">
                        <Link href="/docs/api/python-sdk">View Complete Python SDK Documentation</Link>
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        </section>

        {/* Theory Lifecycle */}
        <section className="w-full py-12 md:py-24 bg-black border-t border-gray-900">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center mb-12">
              <h2 className="text-3xl font-bold tracking-tighter text-white">5. Theory Lifecycle</h2>
              <p className="max-w-[700px] text-gray-400">
                From hypothesis generation to peer review, understand how theories evolve in Synaptiq.
              </p>
            </div>
            <div className="relative">
              <div className="absolute left-1/2 -translate-x-1/2 h-full w-1 bg-gray-800"></div>
              <div className="space-y-12 relative">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 relative">
                  <div className="md:text-right">
                    <div className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-white text-black font-bold absolute right-[-20px] md:right-[-5px] top-0 z-10">
                      1
                    </div>
                    <h3 className="text-xl font-bold text-white mb-2">Hypothesis Generation</h3>
                    <p className="text-gray-300">
                      Synaptiq generates initial hypotheses based on domain knowledge, constraints, and creative
                      exploration of the solution space.
                    </p>
                  </div>
                  <div className="bg-black rounded-lg p-6 border border-gray-800">
                    <div className="bg-black text-white border border-gray-800 rounded-md p-3 font-mono text-xs mb-4">
                      <p className="text-gray-300"># Example hypothesis generation</p>
                      <p className="text-white">hypothesis = {"{"}</p>
                      <p className="text-white ml-4">"title": "Quantum Entanglement Decay Model",</p>
                      <p className="text-white ml-4">
                        "description": "A model proposing that quantum entanglement between particles decays
                        logarithmically with distance in curved spacetime.",
                      </p>
                      <p className="text-white ml-4">"confidence": 0.72,</p>
                      <p className="text-white ml-4">"novelty_score": 0.85</p>
                      <p className="text-white">{"}"}</p>
                    </div>
                    <p className="text-sm text-gray-400 italic">
                      Initial hypotheses are assigned confidence and novelty scores to prioritize further investigation.
                    </p>
                  </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 relative">
                  <div className="md:order-2 md:text-left">
                    <div className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-white text-black font-bold absolute left-[-20px] md:left-[-5px] top-0 z-10">
                      2
                    </div>
                    <h3 className="text-xl font-bold text-white mb-2">Refinement</h3>
                    <p className="text-gray-300">
                      Promising hypotheses undergo refinement through logical analysis, mathematical formalization, and
                      consistency checking.
                    </p>
                  </div>
                  <div className="md:order-1 bg-black rounded-lg p-6 border border-gray-800">
                    <div className="bg-black text-white border border-gray-800 rounded-md p-3 font-mono text-xs mb-4">
                      <p className="text-gray-300"># Refinement process</p>
                      <p className="text-white">refined_theory = refine_hypothesis(hypothesis, {"{"}</p>
                      <p className="text-white ml-4">"formalization_level": "mathematical",</p>
                      <p className="text-white ml-4">"consistency_check": True,</p>
                      <p className="text-white ml-4">
                        "existing_theories": ["quantum_field_theory", "general_relativity"]
                      </p>
                      <p className="text-white">{"}"}</p>
                      <p className="text-white mt-2">
                        print(f"Refinement improved confidence from {hypothesis["confidence"]} to{" "}
                        {refined_theory.confidence}")
                      </p>
                    </div>
                    <p className="text-sm text-gray-400 italic">
                      Refinement typically increases confidence scores and produces mathematically formalized theories.
                    </p>
                  </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 relative">
                  <div className="md:text-right">
                    <div className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-white text-black font-bold absolute right-[-20px] md:right-[-5px] top-0 z-10">
                      3
                    </div>
                    <h3 className="text-xl font-bold text-white mb-2">Simulation</h3>
                    <p className="text-gray-300">
                      Refined theories are tested through computational simulations to generate predictions and compare
                      with known data.
                    </p>
                  </div>
                  <div className="bg-black rounded-lg p-6 border border-gray-800">
                    <div className="aspect-video relative rounded-md overflow-hidden border border-gray-800 mb-4">
                      <Image
                        src="/placeholder-9mk01.png"
                        alt="Quantum Simulation Visualization"
                        width={500}
                        height={300}
                        className="object-cover"
                      />
                    </div>
                    <p className="text-sm text-gray-400 italic">
                      Simulations produce visualizations and quantitative predictions that can be compared with
                      experimental data.
                    </p>
                  </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 relative">
                  <div className="md:order-2 md:text-left">
                    <div className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-white text-black font-bold absolute left-[-20px] md:left-[-5px] top-0 z-10">
                      4
                    </div>
                    <h3 className="text-xl font-bold text-white mb-2">Peer Review</h3>
                    <p className="text-gray-300">
                      Theories that pass simulation are subjected to rigorous peer review against established scientific
                      knowledge.
                    </p>
                  </div>
                  <div className="md:order-1 bg-black rounded-lg p-6 border border-gray-800">
                    <div className="bg-black text-white border border-gray-800 rounded-md p-3 font-mono text-xs mb-4">
                      <p className="text-gray-300"># Peer review results</p>
                      <p className="text-white">review_results = {"{"}</p>
                      <p className="text-white ml-4">"logical_consistency": 0.92,</p>
                      <p className="text-white ml-4">"empirical_support": 0.78,</p>
                      <p className="text-white ml-4">"novelty": 0.85,</p>
                      <p className="text-white ml-4">"explanatory_power": 0.81,</p>
                      <p className="text-white ml-4">"overall_score": 0.84,</p>
                      <p className="text-white ml-4">"critiques": [</p>
                      <p className="text-white ml-8">"Needs more experimental validation in high-energy scenarios",</p>
                      <p className="text-white ml-8">"Boundary conditions require further specification"</p>
                      <p className="text-white ml-4">],</p>
                      <p className="text-white ml-4">"status": "ACCEPTED_WITH_REVISIONS"</p>
                      <p className="text-white">{"}"}</p>
                    </div>
                    <p className="text-sm text-gray-400 italic">
                      Peer review provides quantitative and qualitative feedback to further improve theories.
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div className="mt-12 text-center">
              <Button asChild className="bg-white text-black hover:bg-gray-200">
                <Link href="/docs/theory-lifecycle/case-study">View Complete Case Study</Link>
              </Button>
            </div>
          </div>
        </section>

        {/* Plugins & Extensions */}
        <section className="w-full py-12 md:py-24 bg-black border-t border-gray-900">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center mb-12">
              <h2 className="text-3xl font-bold tracking-tighter text-white">6. Plugins & Extensions</h2>
              <p className="max-w-[700px] text-gray-400">
                Extend Synaptiq with custom logic, physics engines, domain constraints, and more.
              </p>
            </div>
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              <Card className="bg-black border-gray-800 text-white hover:bg-gray-950 transition-colors">
                <CardHeader>
                  <CardTitle>Custom Logic Engines</CardTitle>
                  <CardDescription className="text-gray-400">Integrate your own reasoning systems</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-300 mb-4">
                    Implement the LogicEngineInterface to integrate custom theorem provers, SMT solvers, or other
                    reasoning systems.
                  </p>
                  <div className="bg-black rounded-md p-3 font-mono text-xs mb-4 border border-gray-800">
                    <p className="text-white">from synaptiq.extensions import LogicEngineInterface</p>
                    <p className="text-white mt-2">class MyCustomLogicEngine(LogicEngineInterface):</p>
                    <p className="text-white ml-4">def validate_theory(self, theory, context):</p>
                    <p className="text-white ml-8"># Your custom validation logic</p>
                    <p className="text-white ml-8">return validation_result</p>
                  </div>
                  <Link href="/docs/plugins/logic-engines" className="text-white underline text-sm">
                    Learn more →
                  </Link>
                </CardContent>
              </Card>
              <Card className="bg-black border-gray-800 text-white hover:bg-gray-950 transition-colors">
                <CardHeader>
                  <CardTitle>Physics Engines</CardTitle>
                  <CardDescription className="text-gray-400">Add specialized simulation capabilities</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-300 mb-4">
                    Connect domain-specific physics engines to enable advanced simulations for theory validation.
                  </p>
                  <div className="bg-black rounded-md p-3 font-mono text-xs mb-4 border border-gray-800">
                    <p className="text-white">from synaptiq.extensions import PhysicsEngineConnector</p>
                    <p className="text-white mt-2">class QuantumSimulatorConnector(PhysicsEngineConnector):</p>
                    <p className="text-white ml-4">def simulate(self, theory, parameters):</p>
                    <p className="text-white ml-8"># Connect to your quantum simulator</p>
                    <p className="text-white ml-8">return simulation_results</p>
                  </div>
                  <Link href="/docs/plugins/physics-engines" className="text-white underline text-sm">
                    Learn more →
                  </Link>
                </CardContent>
              </Card>
              <Card className="bg-black border-gray-800 text-white hover:bg-gray-950 transition-colors">
                <CardHeader>
                  <CardTitle>Domain Constraints</CardTitle>
                  <CardDescription className="text-gray-400">Define custom scientific constraints</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-300 mb-4">
                    Create domain-specific constraints to guide theory generation and validation in your field.
                  </p>
                  <div className="bg-black rounded-md p-3 font-mono text-xs mb-4 border border-gray-800">
                    <p className="text-white">from synaptiq.extensions import ConstraintDefinition</p>
                    <p className="text-white mt-2">class DarkMatterConstraint(ConstraintDefinition):</p>
                    <p className="text-white ml-4">def check_compliance(self, theory):</p>
                    <p className="text-white ml-8"># Check if theory complies with dark matter observations</p>
                    <p className="text-white ml-8">return compliance_result</p>
                  </div>
                  <Link href="/docs/plugins/constraints" className="text-white underline text-sm">
                    Learn more →
                  </Link>
                </CardContent>
              </Card>
              <Card className="bg-black border-gray-800 text-white hover:bg-gray-950 transition-colors">
                <CardHeader>
                  <CardTitle>Visualization Plugins</CardTitle>
                  <CardDescription className="text-gray-400">Create custom visualizations</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-300 mb-4">
                    Develop specialized visualization tools for your scientific domain to better understand theory
                    implications.
                  </p>
                  <div className="aspect-video relative rounded-md overflow-hidden border border-gray-800 mb-4">
                    <Image
                      src="/placeholder-hwf5d.png"
                      alt="Visualization Plugin Example"
                      width={300}
                      height={150}
                      className="object-cover"
                    />
                  </div>
                  <Link href="/docs/plugins/visualizations" className="text-white underline text-sm">
                    Learn more →
                  </Link>
                </CardContent>
              </Card>
              <Card className="bg-black border-gray-800 text-white hover:bg-gray-950 transition-colors">
                <CardHeader>
                  <CardTitle>Data Connectors</CardTitle>
                  <CardDescription className="text-gray-400">Connect to external data sources</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-300 mb-4">
                    Integrate with external scientific databases, experimental results, or observational data.
                  </p>
                  <div className="bg-black rounded-md p-3 font-mono text-xs mb-4 border border-gray-800">
                    <p className="text-white">from synaptiq.extensions import DataConnector</p>
                    <p className="text-white mt-2">class AstronomicalDataConnector(DataConnector):</p>
                    <p className="text-white ml-4">def fetch_data(self, query_parameters):</p>
                    <p className="text-white ml-8"># Connect to astronomical database</p>
                    <p className="text-white ml-8">return observational_data</p>
                  </div>
                  <Link href="/docs/plugins/data-connectors" className="text-white underline text-sm">
                    Learn more →
                  </Link>
                </CardContent>
              </Card>
              <Card className="bg-black border-gray-800 text-white hover:bg-gray-950 transition-colors">
                <CardHeader>
                  <CardTitle>Plugin Registry</CardTitle>
                  <CardDescription className="text-gray-400">Discover and share extensions</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-300 mb-4">
                    Browse the registry of community-developed plugins and extensions for Synaptiq.
                  </p>
                  <ul className="space-y-2 text-gray-300">
                    <li className="flex items-start gap-2">
                      <div className="rounded-full bg-white/10 p-1 mt-0.5">
                        <span className="text-white text-xs">→</span>
                      </div>
                      <span>Quantum Circuit Simulator (by CERN)</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <div className="rounded-full bg-white/10 p-1 mt-0.5">
                        <span className="text-white text-xs">→</span>
                      </div>
                      <span>Astrophysical Data Connector (by NASA)</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <div className="rounded-full bg-white/10 p-1 mt-0.5">
                        <span className="text-white text-xs">→</span>
                      </div>
                      <span>Particle Physics Constraint Set (by MIT)</span>
                    </li>
                  </ul>
                  <div className="mt-4">
                    <Button asChild variant="outline" className="w-full border-gray-700 text-white hover:bg-gray-800">
                      <Link href="/docs/plugins/registry">Browse Plugin Registry</Link>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Deployment & Ops */}
        <section className="w-full py-12 md:py-24 bg-black border-t border-gray-900">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center mb-12">
              <h2 className="text-3xl font-bold tracking-tighter text-white">7. Deployment & Operations</h2>
              <p className="max-w-[700px] text-gray-400">
                Learn how to deploy, scale, and operate Synaptiq in various environments.
              </p>
            </div>
            <div className="grid gap-8 md:grid-cols-2">
              <Card className="bg-black border-gray-800 text-white">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Server className="h-5 w-5" /> Deployment Options
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <Tabs defaultValue="cloud" className="w-full">
                    <TabsList className="w-full bg-black border border-gray-800">
                      <TabsTrigger
                        value="cloud"
                        className="data-[state=active]:bg-white data-[state=active]:text-black"
                      >
                        Cloud
                      </TabsTrigger>
                      <TabsTrigger
                        value="self-hosted"
                        className="data-[state=active]:bg-white data-[state=active]:text-black"
                      >
                        Self-Hosted
                      </TabsTrigger>
                      <TabsTrigger
                        value="hybrid"
                        className="data-[state=active]:bg-white data-[state=active]:text-black"
                      >
                        Hybrid
                      </TabsTrigger>
                    </TabsList>
                    <TabsContent value="cloud" className="mt-4">
                      <div className="space-y-4">
                        <p className="text-gray-300">
                          Deploy Synaptiq on our managed cloud infrastructure for the easiest setup and maintenance.
                        </p>
                        <ul className="space-y-2 text-gray-300">
                          <li className="flex items-start gap-2">
                            <div className="rounded-full bg-white/10 p-1 mt-0.5">
                              <span className="text-white text-xs">✓</span>
                            </div>
                            <span>Automatic scaling based on workload</span>
                          </li>
                          <li className="flex items-start gap-2">
                            <div className="rounded-full bg-white/10 p-1 mt-0.5">
                              <span className="text-white text-xs">✓</span>
                            </div>
                            <span>99.9% uptime SLA</span>
                          </li>
                          <li className="flex items-start gap-2">
                            <div className="rounded-full bg-white/10 p-1 mt-0.5">
                              <span className="text-white text-xs">✓</span>
                            </div>
                            <span>Managed updates and maintenance</span>
                          </li>
                        </ul>
                        <Button asChild className="bg-white text-black hover:bg-gray-200">
                          <Link href="/docs/deployment/cloud">Cloud Deployment Guide</Link>
                        </Button>
                      </div>
                    </TabsContent>
                    <TabsContent value="self-hosted" className="mt-4">
                      <div className="space-y-4">
                        <p className="text-gray-300">
                          Deploy Synaptiq on your own infrastructure for maximum control and data privacy.
                        </p>
                        <ul className="space-y-2 text-gray-300">
                          <li className="flex items-start gap-2">
                            <div className="rounded-full bg-white/10 p-1 mt-0.5">
                              <span className="text-white text-xs">✓</span>
                            </div>
                            <span>Complete data sovereignty</span>
                          </li>
                          <li className="flex items-start gap-2">
                            <div className="rounded-full bg-white/10 p-1 mt-0.5">
                              <span className="text-white text-xs">✓</span>
                            </div>
                            <span>Customizable hardware configuration</span>
                          </li>
                          <li className="flex items-start gap-2">
                            <div className="rounded-full bg-white/10 p-1 mt-0.5">
                              <span className="text-white text-xs">✓</span>
                            </div>
                            <span>Integration with existing infrastructure</span>
                          </li>
                        </ul>
                        <Button asChild className="bg-white text-black hover:bg-gray-200">
                          <Link href="/docs/deployment/self-hosted">Self-Hosted Deployment Guide</Link>
                        </Button>
                      </div>
                    </TabsContent>
                    <TabsContent value="hybrid" className="mt-4">
                      <div className="space-y-4">
                        <p className="text-gray-300">
                          Combine cloud and on-premises components for a balanced approach.
                        </p>
                        <ul className="space-y-2 text-gray-300">
                          <li className="flex items-start gap-2">
                            <div className="rounded-full bg-white/10 p-1 mt-0.5">
                              <span className="text-white text-xs">✓</span>
                            </div>
                            <span>Keep sensitive data on-premises</span>
                          </li>
                          <li className="flex items-start gap-2">
                            <div className="rounded-full bg-white/10 p-1 mt-0.5">
                              <span className="text-white text-xs">✓</span>
                            </div>
                            <span>Offload compute-intensive tasks to the cloud</span>
                          </li>
                          <li className="flex items-start gap-2">
                            <div className="rounded-full bg-white/10 p-1 mt-0.5">
                              <span className="text-white text-xs">✓</span>
                            </div>
                            <span>Flexible resource allocation</span>
                          </li>
                        </ul>
                        <Button asChild className="bg-white text-black hover:bg-gray-200">
                          <Link href="/docs/deployment/hybrid">Hybrid Deployment Guide</Link>
                        </Button>
                      </div>
                    </TabsContent>
                  </Tabs>
                </CardContent>
              </Card>
              <div className="space-y-8">
                <Card className="bg-black border-gray-800 text-white">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <LineChart className="h-5 w-5" /> Scaling Strategies
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-300 mb-4">
                      Optimize Synaptiq's performance as your usage grows with these scaling strategies.
                    </p>
                    <ul className="space-y-2 text-gray-300">
                      <li className="flex items-start gap-2">
                        <div className="rounded-full bg-white/10 p-1 mt-0.5">
                          <span className="text-white text-xs">→</span>
                        </div>
                        <span>
                          <strong>Horizontal Scaling:</strong> Add more nodes to distribute computational load
                        </span>
                      </li>
                      <li className="flex items-start gap-2">
                        <div className="rounded-full bg-white/10 p-1 mt-0.5">
                          <span className="text-white text-xs">→</span>
                        </div>
                        <span>
                          <strong>Vertical Scaling:</strong> Increase resources (CPU, GPU, memory) on existing nodes
                        </span>
                      </li>
                      <li className="flex items-start gap-2">
                        <div className="rounded-full bg-white/10 p-1 mt-0.5">
                          <span className="text-white text-xs">→</span>
                        </div>
                        <span>
                          <strong>Distributed Processing:</strong> Parallelize theory generation and evaluation
                        </span>
                      </li>
                    </ul>
                    <div className="mt-4">
                      <Button asChild variant="outline" className="w-full border-gray-700 text-white hover:bg-gray-800">
                        <Link href="/docs/operations/scaling">Scaling Guide</Link>
                      </Button>
                    </div>
                  </CardContent>
                </Card>
                <Card className="bg-black border-gray-800 text-white">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Database className="h-5 w-5" /> Caching & Optimization
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-300 mb-4">
                      Reduce computational costs and improve response times with effective caching strategies.
                    </p>
                    <div className="bg-black text-white border border-gray-800 rounded-md p-3 font-mono text-xs mb-4">
                      <p className="text-gray-300"># Example caching configuration</p>
                      <p className="text-white">cache_config = {"{"}</p>
                      <p className="text-white ml-4">"theory_cache": {"{"}</p>
                      <p className="text-white ml-8">"type": "redis",</p>
                      <p className="text-white ml-8">"ttl": 86400, # 24 hours</p>
                      <p className="text-white ml-8">"max_size": "10GB"</p>
                      <p className="text-white ml-4">{"}"},</p>
                      <p className="text-white ml-4">"simulation_cache": {"{"}</p>
                      <p className="text-white ml-8">"type": "local",</p>
                      <p className="text-white ml-8">"ttl": 3600, # 1 hour</p>
                      <p className="text-white ml-8">"max_size": "50GB"</p>
                      <p className="text-white ml-4">{"}"}</p>
                      <p className="text-white">{"}"}</p>
                    </div>
                    <div className="mt-4">
                      <Button asChild variant="outline" className="w-full border-gray-700 text-white hover:bg-gray-800">
                        <Link href="/docs/operations/caching">Caching Guide</Link>
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </section>

        {/* Performance Benchmarks */}
        <section className="w-full py-12 md:py-24 bg-black border-t border-gray-900">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center mb-12">
              <h2 className="text-3xl font-bold tracking-tighter text-white">Performance & Case Studies</h2>
              <p className="max-w-[700px] text-gray-400">
                See how Synaptiq performs in real-world scientific scenarios.
              </p>
            </div>
            <PerformanceBenchmarks />
          </div>
        </section>

        {/* Changelog & Roadmap */}
        <section className="w-full py-12 md:py-24 bg-black border-t border-gray-900">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center mb-12">
              <h2 className="text-3xl font-bold tracking-tighter text-white">8. Changelog & Roadmap</h2>
              <p className="max-w-[700px] text-gray-400">Track Synaptiq's evolution and upcoming features.</p>
            </div>
            <div className="grid gap-8 md:grid-cols-2">
              <Card className="bg-black border-gray-800 text-white">
                <CardHeader>
                  <CardTitle>Changelog</CardTitle>
                  <CardDescription className="text-gray-400">Recent updates and improvements</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    <div>
                      <div className="flex items-center gap-2 mb-2">
                        <Badge className="bg-white text-black">v2.3.0</Badge>
                        <span className="text-sm text-gray-400">Released May 1, 2025</span>
                      </div>
                      <ul className="space-y-2 text-gray-300 text-sm">
                        <li className="flex items-start gap-2">
                          <div className="rounded-full bg-gray-700 p-1 mt-0.5">
                            <span className="text-white text-xs">+</span>
                          </div>
                          <span>Added support for multi-dimensional theory spaces</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <div className="rounded-full bg-gray-700 p-1 mt-0.5">
                            <span className="text-white text-xs">↑</span>
                          </div>
                          <span>Improved quantum simulation accuracy by 27%</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <div className="rounded-full bg-gray-900 p-1 mt-0.5">
                            <span className="text-white text-xs">-</span>
                          </div>
                          <span>Fixed inconsistency in relativistic calculations</span>
                        </li>
                      </ul>
                    </div>
                    <div>
                      <div className="flex items-center gap-2 mb-2">
                        <Badge className="bg-white text-black">v2.2.0</Badge>
                        <span className="text-sm text-gray-400">Released March 15, 2025</span>
                      </div>
                      <ul className="space-y-2 text-gray-300 text-sm">
                        <li className="flex items-start gap-2">
                          <div className="rounded-full bg-gray-800 p-1 mt-0.5">
                            <span className="text-white text-xs">+</span>
                          </div>
                          <span>Added GraphQL API for more flexible queries</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <div className="rounded-full bg-gray-800 p-1 mt-0.5">
                            <span className="text-white text-xs">↑</span>
                          </div>
                          <span>Enhanced theory refinement with new mathematical formalisms</span>
                        </li>
                      </ul>
                    </div>
                    <div className="mt-4">
                      <Button asChild variant="outline" className="w-full border-gray-700 text-white hover:bg-gray-800">
                        <Link href="/docs/changelog">View Full Changelog</Link>
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
              <Card className="bg-black border-gray-800 text-white">
                <CardHeader>
                  <CardTitle>Roadmap</CardTitle>
                  <CardDescription className="text-gray-400">Upcoming features and improvements</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    <div>
                      <div className="flex items-center gap-2 mb-2">
                        <Badge className="bg-white text-black">Q3 2025</Badge>
                        <span className="text-sm text-gray-400">Planned Release</span>
                      </div>
                      <ul className="space-y-2 text-gray-300 text-sm">
                        <li className="flex items-start gap-2">
                          <div className="rounded-full bg-white/10 p-1 mt-0.5">
                            <span className="text-white text-xs">→</span>
                          </div>
                          <span>
                            <strong>Quantum Field Theory Module:</strong> Specialized support for QFT calculations
                          </span>
                        </li>
                        <li className="flex items-start gap-2">
                          <div className="rounded-full bg-white/10 p-1 mt-0.5">
                            <span className="text-white text-xs">→</span>
                          </div>
                          <span>
                            <strong>Collaborative Theory Building:</strong> Multi-user theory development
                          </span>
                        </li>
                      </ul>
                    </div>
                    <div>
                      <div className="flex items-center gap-2 mb-2">
                        <Badge className="bg-white text-black">Q4 2025</Badge>
                        <span className="text-sm text-gray-400">Planned Release</span>
                      </div>
                      <ul className="space-y-2 text-gray-300 text-sm">
                        <li className="flex items-start gap-2">
                          <div className="rounded-full bg-white/10 p-1 mt-0.5">
                            <span className="text-white text-xs">→</span>
                          </div>
                          <span>
                            <strong>Experimental Design Generator:</strong> Propose experiments to validate theories
                          </span>
                        </li>
                        <li className="flex items-start gap-2">
                          <div className="rounded-full bg-white/10 p-1 mt-0.5">
                            <span className="text-white text-xs">→</span>
                          </div>
                          <span>
                            <strong>Advanced Visualization Suite:</strong> 4D and higher-dimensional visualizations
                          </span>
                        </li>
                      </ul>
                    </div>
                    <div>
                      <div className="flex items-center gap-2 mb-2">
                        <Badge className="bg-white text-black">2026</Badge>
                        <span className="text-sm text-gray-400">Future Vision</span>
                      </div>
                      <ul className="space-y-2 text-gray-300 text-sm">
                        <li className="flex items-start gap-2">
                          <div className="rounded-full bg-white/10 p-1 mt-0.5">
                            <span className="text-white text-xs">→</span>
                          </div>
                          <span>
                            <strong>Unified Theory Explorer:</strong> Cross-domain theory integration
                          </span>
                        </li>
                        <li className="flex items-start gap-2">
                          <div className="rounded-full bg-white/10 p-1 mt-0.5">
                            <span className="text-white text-xs">→</span>
                          </div>
                          <span>
                            <strong>Real-time Experimental Integration:</strong> Direct connection to lab equipment
                          </span>
                        </li>
                      </ul>
                    </div>
                    <div className="mt-4">
                      <Button asChild variant="outline" className="w-full border-gray-700 text-white hover:bg-gray-800">
                        <Link href="/docs/roadmap">View Detailed Roadmap</Link>
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
            <div className="mt-12 text-center">
              <p className="text-gray-300 mb-4">Want to contribute to the future of Synaptiq?</p>
              <Button asChild className="bg-white text-black hover:bg-gray-200">
                <Link href="/docs/contribute">Join the Frontier</Link>
              </Button>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="w-full py-12 md:py-24 bg-black border-t border-gray-900">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <h2 className="text-3xl font-bold tracking-tighter text-white">
                Ready to Accelerate Scientific Discovery?
              </h2>
              <p className="max-w-[700px] text-gray-300">
                Join researchers worldwide who are using Synaptiq to push the boundaries of scientific knowledge.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 mt-4">
                <Button asChild className="bg-white text-black hover:bg-gray-200">
                  <Link href="/signup">Create an Account</Link>
                </Button>
                <Button asChild variant="outline" className="border-gray-700 text-white hover:bg-gray-800">
                  <Link href="/demo">Try Interactive Demo</Link>
                </Button>
              </div>
            </div>
          </div>
        </section>
      </main>
      <SiteFooter />
    </div>
  )
}
