"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Atom, Brain, FileText } from "lucide-react"

interface FeatureSectionProps {
  onJoinBeta?: () => void
}

export function FeatureSection({ onJoinBeta }: FeatureSectionProps) {
  return (
    <section className="w-full py-12 md:py-24 lg:py-32 bg-gray-950">
      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-center justify-center space-y-4 text-center">
          <div className="space-y-2">
            <div className="inline-block rounded-lg bg-gray-800 px-3 py-1 text-sm text-gray-200">Features</div>
            <h2 className="text-3xl font-bold tracking-tighter md:text-4xl/tight text-white">
              Cutting-Edge Scientific Capabilities
            </h2>
            <p className="max-w-[900px] text-gray-400 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
              Our platform combines advanced AI with scientific expertise to provide researchers with powerful tools for
              discovery and analysis.
            </p>
          </div>
        </div>
        <div className="mx-auto grid max-w-5xl items-center gap-6 py-12 lg:grid-cols-3 lg:gap-12">
          <Card className="bg-gray-900 border-gray-800 text-white">
            <CardHeader>
              <Brain className="h-10 w-10 text-purple-500 mb-4" />
              <CardTitle>Scientific LLM</CardTitle>
              <CardDescription className="text-gray-400">
                Our specialized language model trained on scientific literature and datasets.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-gray-400">
                Get accurate answers to complex scientific questions with our domain-specific AI trained on
                peer-reviewed research.
              </p>
            </CardContent>
          </Card>
          <Card className="bg-gray-900 border-gray-800 text-white">
            <CardHeader>
              <Atom className="h-10 w-10 text-blue-500 mb-4" />
              <CardTitle>Quantum Simulations</CardTitle>
              <CardDescription className="text-gray-400">
                Run quantum circuit simulations and visualize results directly in chat.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-gray-400">
                Explore quantum phenomena through interactive simulations that help visualize complex quantum concepts.
              </p>
            </CardContent>
          </Card>
          <Card className="bg-gray-900 border-gray-800 text-white">
            <CardHeader>
              <FileText className="h-10 w-10 text-green-500 mb-4" />
              <CardTitle>Research Assistant</CardTitle>
              <CardDescription className="text-gray-400">
                AI-powered research assistant to help with literature reviews and experiment design.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-gray-400">
                Accelerate your research with automated literature analysis, experiment design assistance, and more.
              </p>
            </CardContent>
          </Card>
        </div>
        <div className="flex justify-center">
          <Button className="bg-white text-black hover:bg-gray-200" size="lg" onClick={onJoinBeta}>
            Request Beta Access
          </Button>
        </div>
      </div>
    </section>
  )
}
