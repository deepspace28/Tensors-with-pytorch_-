import Link from "next/link"
import { ArrowRight, Code, FileText, Lightbulb, Rocket } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"
import { DocsSidebar } from "@/components/docs-sidebar"
import { DocsSearch } from "@/components/docs-search"

export const metadata = {
  title: "Documentation",
  description: "Comprehensive guides and API references for the Synaptiq platform.",
}

export default function DocsPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <SiteHeader />
      <div className="container flex-1 items-start md:grid md:grid-cols-[220px_minmax(0,1fr)] md:gap-6 lg:grid-cols-[240px_minmax(0,1fr)] lg:gap-10">
        <aside className="fixed top-14 z-30 -ml-2 hidden h-[calc(100vh-3.5rem)] w-full shrink-0 md:sticky md:block">
          <DocsSidebar />
        </aside>
        <main className="relative py-6 lg:gap-10 lg:py-8 xl:grid xl:grid-cols-[1fr_300px]">
          <div className="mx-auto w-full min-w-0">
            <div className="mb-4 flex items-center space-x-1 text-sm text-muted-foreground">
              <div className="truncate">Documentation</div>
              <span className="mx-1">/</span>
              <div className="truncate">Getting Started</div>
            </div>
            <div className="space-y-2">
              <h1 className="scroll-m-20 text-4xl font-bold tracking-tight">Getting Started with Synaptiq</h1>
              <p className="text-lg text-muted-foreground">
                Learn how to integrate and use Synaptiq's scientific LLM platform in your research.
              </p>
            </div>
            <div className="flex items-center space-x-2 pt-4">
              <DocsSearch />
            </div>
            <Tabs defaultValue="overview" className="mt-6">
              <TabsList className="w-full justify-start rounded-none border-b border-border/40 bg-transparent p-0">
                <TabsTrigger
                  value="overview"
                  className="rounded-none border-b-2 border-b-transparent bg-transparent px-4 py-2 font-medium text-muted-foreground hover:text-foreground data-[state=active]:border-b-primary data-[state=active]:text-foreground"
                >
                  Overview
                </TabsTrigger>
                <TabsTrigger
                  value="quickstart"
                  className="rounded-none border-b-2 border-b-transparent bg-transparent px-4 py-2 font-medium text-muted-foreground hover:text-foreground data-[state=active]:border-b-primary data-[state=active]:text-foreground"
                >
                  Quickstart
                </TabsTrigger>
                <TabsTrigger
                  value="api"
                  className="rounded-none border-b-2 border-b-transparent bg-transparent px-4 py-2 font-medium text-muted-foreground hover:text-foreground data-[state=active]:border-b-primary data-[state=active]:text-foreground"
                >
                  API Reference
                </TabsTrigger>
              </TabsList>
              <TabsContent value="overview" className="pt-6">
                <div className="space-y-6">
                  <h2 className="scroll-m-20 border-b pb-2 text-2xl font-semibold tracking-tight">What is Synaptiq?</h2>
                  <p>
                    Synaptiq is a specialized scientific Large Language Model (LLM) platform designed specifically for
                    researchers, physicists, mathematicians, and scientific institutions. Our platform combines advanced
                    AI capabilities with rigorous scientific validation to provide accurate and reliable tools for
                    scientific research.
                  </p>
                  <h3 className="scroll-m-20 text-xl font-semibold tracking-tight">Key Features</h3>
                  <ul className="my-6 ml-6 list-disc [&>li]:mt-2">
                    <li>Scientific LLM trained on peer-reviewed literature</li>
                    <li>Quantum simulation capabilities</li>
                    <li>Mathematical modeling and validation</li>
                    <li>API access for integration with existing research tools</li>
                    <li>Collaboration features for research teams</li>
                  </ul>
                  <h3 className="scroll-m-20 text-xl font-semibold tracking-tight">Use Cases</h3>
                  <div className="grid gap-4 md:grid-cols-2">
                    <Card>
                      <CardHeader className="flex flex-row items-center gap-2 pb-2">
                        <Rocket className="h-4 w-4 text-primary" />
                        <CardTitle className="text-base">Research Acceleration</CardTitle>
                      </CardHeader>
                      <CardContent className="pb-2">
                        <p className="text-sm text-muted-foreground">
                          Speed up literature review, hypothesis generation, and data analysis.
                        </p>
                      </CardContent>
                    </Card>
                    <Card>
                      <CardHeader className="flex flex-row items-center gap-2 pb-2">
                        <Lightbulb className="h-4 w-4 text-primary" />
                        <CardTitle className="text-base">Quantum Simulations</CardTitle>
                      </CardHeader>
                      <CardContent className="pb-2">
                        <p className="text-sm text-muted-foreground">
                          Model complex quantum systems with high accuracy and efficiency.
                        </p>
                      </CardContent>
                    </Card>
                  </div>
                </div>
              </TabsContent>
              <TabsContent value="quickstart" className="pt-6">
                <div className="space-y-6">
                  <h2 className="scroll-m-20 border-b pb-2 text-2xl font-semibold tracking-tight">Quickstart Guide</h2>
                  <p>
                    Get up and running with Synaptiq in minutes. This guide will walk you through the basic steps to
                    start using our platform for your scientific research.
                  </p>
                  <div className="space-y-4">
                    <div className="rounded-md border p-4">
                      <h3 className="font-medium">Step 1: Create an Account</h3>
                      <p className="mt-1 text-sm text-muted-foreground">
                        Sign up for a Synaptiq account to get your API key and access to our platform.
                      </p>
                      <Button asChild className="mt-2" size="sm">
                        <Link href="/signup">Create Account</Link>
                      </Button>
                    </div>
                    <div className="rounded-md border p-4">
                      <h3 className="font-medium">Step 2: Install the SDK</h3>
                      <p className="mt-1 text-sm text-muted-foreground">
                        Install our Python SDK to start integrating Synaptiq into your research workflow.
                      </p>
                      <pre className="mt-2 overflow-x-auto rounded-md bg-card/60 border border-primary/10 p-4 text-sm font-mono">
                        <code>pip install synaptiq-sdk</code>
                      </pre>
                    </div>
                    <div className="rounded-md border p-4">
                      <h3 className="font-medium">Step 3: Initialize the Client</h3>
                      <p className="mt-1 text-sm text-muted-foreground">
                        Set up the Synaptiq client with your API key.
                      </p>
                      <pre className="mt-2 overflow-x-auto rounded-md bg-card/60 border border-primary/10 p-4 text-sm font-mono">
                        <code>{`import synaptiq

# Initialize the client with your API key
client = synaptiq.Client(api_key="your_api_key")

# Now you can use the client to access Synaptiq's features
response = client.query("Explain quantum entanglement")`}</code>
                      </pre>
                    </div>
                  </div>
                  <div className="flex justify-end">
                    <Button asChild variant="outline">
                      <Link href="/docs/guides">
                        View Full Documentation <ArrowRight className="ml-2 h-4 w-4" />
                      </Link>
                    </Button>
                  </div>
                </div>
              </TabsContent>
              <TabsContent value="api" className="pt-6">
                <div className="space-y-6">
                  <h2 className="scroll-m-20 border-b pb-2 text-2xl font-semibold tracking-tight">API Reference</h2>
                  <p>Comprehensive documentation of the Synaptiq API endpoints and parameters.</p>
                  <div className="space-y-4">
                    <Card>
                      <CardHeader>
                        <div className="flex items-center justify-between">
                          <CardTitle className="text-base">Scientific Query</CardTitle>
                          <code className="rounded bg-muted px-2 py-1 text-sm">POST /api/v1/query</code>
                        </div>
                        <CardDescription>Submit a scientific query to the Synaptiq LLM.</CardDescription>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-2">
                          <h4 className="font-medium">Parameters</h4>
                          <ul className="list-inside list-disc space-y-1 text-sm">
                            <li>
                              <code>query</code> (string, required): The scientific query text
                            </li>
                            <li>
                              <code>model</code> (string, optional): Specific model to use
                            </li>
                            <li>
                              <code>context</code> (array, optional): Additional context documents
                            </li>
                            <li>
                              <code>format</code> (string, optional): Response format (text, json, latex)
                            </li>
                          </ul>
                        </div>
                      </CardContent>
                      <CardFooter className="flex justify-between">
                        <Button variant="outline" size="sm" asChild>
                          <Link href="/docs/api/query">
                            <FileText className="mr-2 h-4 w-4" />
                            Documentation
                          </Link>
                        </Button>
                        <Button size="sm" asChild>
                          <Link href="/playground">
                            <Code className="mr-2 h-4 w-4" />
                            Try in Playground
                          </Link>
                        </Button>
                      </CardFooter>
                    </Card>
                    <Card>
                      <CardHeader>
                        <div className="flex items-center justify-between">
                          <CardTitle className="text-base">Quantum Simulation</CardTitle>
                          <code className="rounded bg-muted px-2 py-1 text-sm">POST /api/v1/simulate</code>
                        </div>
                        <CardDescription>Run a quantum simulation with specified parameters.</CardDescription>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-2">
                          <h4 className="font-medium">Parameters</h4>
                          <ul className="list-inside list-disc space-y-1 text-sm">
                            <li>
                              <code>system</code> (object, required): Quantum system description
                            </li>
                            <li>
                              <code>method</code> (string, required): Simulation method
                            </li>
                            <li>
                              <code>parameters</code> (object, required): Simulation parameters
                            </li>
                            <li>
                              <code>output_format</code> (string, optional): Output format
                            </li>
                          </ul>
                        </div>
                      </CardContent>
                      <CardFooter className="flex justify-between">
                        <Button variant="outline" size="sm" asChild>
                          <Link href="/docs/api/simulate">
                            <FileText className="mr-2 h-4 w-4" />
                            Documentation
                          </Link>
                        </Button>
                        <Button size="sm" asChild>
                          <Link href="/playground">
                            <Code className="mr-2 h-4 w-4" />
                            Try in Playground
                          </Link>
                        </Button>
                      </CardFooter>
                    </Card>
                  </div>
                  <div className="flex justify-end">
                    <Button asChild variant="outline">
                      <Link href="/docs/api">
                        View All API Endpoints <ArrowRight className="ml-2 h-4 w-4" />
                      </Link>
                    </Button>
                  </div>
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </main>
      </div>
      <SiteFooter />
    </div>
  )
}
