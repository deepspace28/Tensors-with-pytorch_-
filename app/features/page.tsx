import type React from "react"
import Link from "next/link"
import { ArrowRight, Atom, Beaker, Brain, Code, FlaskRoundIcon as Flask, Microscope } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"

export const metadata = {
  title: "Features | Synaptiq",
  description: "Explore the advanced features of Synaptiq, the scientific AI platform.",
}

export default function FeaturesPage() {
  return (
    <div className="container mx-auto px-4 py-12">
      <div className="text-center mb-16">
        <h1 className="text-4xl font-bold tracking-tight mb-4">Synaptiq Features</h1>
        <p className="text-xl text-gray-500 dark:text-gray-400 max-w-3xl mx-auto">
          Discover how Synaptiq is revolutionizing scientific research with advanced AI capabilities
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
        <FeatureCard
          icon={<Brain className="h-10 w-10 text-purple-500" />}
          title="Scientific LLM"
          description="Our specialized language model is trained on scientific literature and optimized for research tasks."
          href="/chat"
        />

        <FeatureCard
          icon={<Atom className="h-10 w-10 text-blue-500" />}
          title="Quantum Simulations"
          description="Run complex quantum simulations with unprecedented accuracy and visualize the results."
          href="/features/quantum-simulations"
        />

        <FeatureCard
          icon={<Microscope className="h-10 w-10 text-green-500" />}
          title="Scientific Validation"
          description="All results are rigorously validated by leading researchers in physics and mathematics."
          href="/features/scientific-validation"
        />

        <FeatureCard
          icon={<Code className="h-10 w-10 text-yellow-500" />}
          title="API Access"
          description="Integrate Synaptiq into your research workflow with our comprehensive API."
          href="/features/api-access"
        />

        <FeatureCard
          icon={<Flask className="h-10 w-10 text-red-500" />}
          title="Research Collaboration"
          description="Collaborate with other researchers and share your findings in real-time."
          href="/features"
        />

        <FeatureCard
          icon={<Beaker className="h-10 w-10 text-indigo-500" />}
          title="Data Visualization"
          description="Visualize complex scientific data with interactive charts and 3D models."
          href="/features"
        />
      </div>

      <div className="bg-gray-100 dark:bg-gray-800 rounded-xl p-8 mb-16">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-4">Request Beta Access</h2>
          <p className="text-lg mb-6">
            Synaptiq is currently in beta. Join our waitlist to get early access to our platform.
          </p>
          <Button
            size="lg"
            className="bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700"
          >
            <Link href="/beta" className="flex items-center gap-2">
              Request Access <ArrowRight className="h-4 w-4" />
            </Link>
          </Button>
        </div>
      </div>

      <div className="max-w-3xl mx-auto">
        <h2 className="text-3xl font-bold mb-6">Frequently Asked Questions</h2>

        <div className="space-y-6">
          <div>
            <h3 className="text-xl font-semibold mb-2">What makes Synaptiq different from other AI platforms?</h3>
            <p className="text-gray-600 dark:text-gray-400">
              Synaptiq is specifically designed for scientific research, with specialized models trained on scientific
              literature and capabilities for running complex simulations.
            </p>
          </div>

          <div>
            <h3 className="text-xl font-semibold mb-2">How accurate are the quantum simulations?</h3>
            <p className="text-gray-600 dark:text-gray-400">
              Our quantum simulations are validated against experimental data and theoretical models, providing high
              accuracy for research purposes.
            </p>
          </div>

          <div>
            <h3 className="text-xl font-semibold mb-2">Can I integrate Synaptiq with my existing tools?</h3>
            <p className="text-gray-600 dark:text-gray-400">
              Yes, our API allows seamless integration with popular scientific tools and platforms, including Jupyter
              notebooks and custom research environments.
            </p>
          </div>

          <div>
            <h3 className="text-xl font-semibold mb-2">Is there a free tier available?</h3>
            <p className="text-gray-600 dark:text-gray-400">
              We offer a limited free tier for academic researchers and students. Contact us for more information about
              our academic program.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

function FeatureCard({
  icon,
  title,
  description,
  href,
}: {
  icon: React.ReactNode
  title: string
  description: string
  href: string
}) {
  return (
    <Card className="border border-gray-200 dark:border-gray-800">
      <CardHeader>
        <div className="mb-4">{icon}</div>
        <CardTitle>{title}</CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardFooter>
        <Button variant="ghost" className="gap-1" asChild>
          <Link href={href}>
            Learn more <ArrowRight className="h-4 w-4" />
          </Link>
        </Button>
      </CardFooter>
    </Card>
  )
}
