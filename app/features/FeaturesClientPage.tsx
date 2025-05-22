"use client"

import type React from "react"

import { Button } from "@/components/ui/button"
import { Card, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Atom, Brain, Database, FileSearch, FlaskRoundIcon as Flask, Microscope } from "lucide-react"
import Link from "next/link"

interface FeaturesClientPageProps {
  onOpenBetaModal?: () => void
}

export default function FeaturesClientPage({ onOpenBetaModal }: FeaturesClientPageProps) {
  return (
    <div className="container max-w-6xl py-12">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold mb-4">Synaptiq Features</h1>
        <p className="text-xl text-gray-500 dark:text-gray-400 max-w-3xl mx-auto">
          Discover the powerful capabilities of our scientific AI platform designed for researchers, scientists, and
          educators.
        </p>
      </div>

      <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3 mb-12">
        <FeatureCard
          icon={<Brain className="h-8 w-8 text-purple-500" />}
          title="Scientific LLM"
          description="Our specialized large language model trained on scientific literature and datasets."
          link="/chat"
          linkText="Try Scientific LLM"
        />

        <FeatureCard
          icon={<Atom className="h-8 w-8 text-blue-500" />}
          title="Quantum Simulations"
          description="Run quantum circuit simulations and visualize results directly in chat."
          link="/features/quantum-simulations"
          linkText="Learn More"
          beta
          onOpenBetaModal={onOpenBetaModal}
        />

        <FeatureCard
          icon={<FileSearch className="h-8 w-8 text-green-500" />}
          title="Scientific Validation"
          description="Automatic fact-checking and validation against scientific literature."
          link="/features/scientific-validation"
          linkText="Learn More"
          beta
          onOpenBetaModal={onOpenBetaModal}
        />

        <FeatureCard
          icon={<Flask className="h-8 w-8 text-amber-500" />}
          title="Interactive Experiments"
          description="Run interactive scientific experiments and simulations in your browser."
          link="/demo"
          linkText="Try Demos"
        />

        <FeatureCard
          icon={<Microscope className="h-8 w-8 text-red-500" />}
          title="Research Assistant"
          description="AI-powered research assistant to help with literature reviews and experiment design."
          link="/features/research-assistant"
          linkText="Learn More"
          beta
          onOpenBetaModal={onOpenBetaModal}
        />

        <FeatureCard
          icon={<Database className="h-8 w-8 text-indigo-500" />}
          title="API Access"
          description="Integrate Synaptiq's capabilities into your own applications and workflows."
          link="/features/api-access"
          linkText="View Documentation"
          beta
          onOpenBetaModal={onOpenBetaModal}
        />
      </div>

      <div className="bg-gray-100 dark:bg-gray-800 p-8 rounded-lg mb-12">
        <div className="text-center mb-8">
          <h2 className="text-2xl font-bold mb-2">Join Our Beta Program</h2>
          <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            Get early access to our latest features and help shape the future of scientific AI.
          </p>
        </div>
        <div className="flex justify-center">
          <Button size="lg" onClick={onOpenBetaModal}>
            Request Beta Access
          </Button>
        </div>
      </div>
    </div>
  )
}

function FeatureCard({
  icon,
  title,
  description,
  link,
  linkText,
  beta = false,
  onOpenBetaModal,
}: {
  icon: React.ReactNode
  title: string
  description: string
  link: string
  linkText: string
  beta?: boolean
  onOpenBetaModal?: () => void
}) {
  return (
    <Card>
      <CardHeader>
        <div className="mb-2">{icon}</div>
        <CardTitle className="flex items-center gap-2">
          {title}
          {beta && (
            <span className="text-xs bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200 px-2 py-0.5 rounded-full">
              Beta
            </span>
          )}
        </CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardFooter>
        {beta ? (
          <Button className="w-full" onClick={onOpenBetaModal}>
            Request Beta Access
          </Button>
        ) : (
          <Link href={link} className="w-full">
            <Button className="w-full">{linkText}</Button>
          </Link>
        )}
      </CardFooter>
    </Card>
  )
}
