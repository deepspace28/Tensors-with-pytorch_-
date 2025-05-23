"use client"

import Link from "next/link"
import { ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"

interface HeroSectionProps {
  onJoinBeta?: () => void
}

export function HeroSection({ onJoinBeta }: HeroSectionProps) {
  return (
    <section className="relative w-full py-12 md:py-24 lg:py-32 xl:py-48 bg-gradient-to-b from-background via-background/95 to-background/90 overflow-hidden">
      {/* Abstract background pattern */}
      <div className="absolute inset-0 z-0 opacity-20">
        <svg
          width="100%"
          height="100%"
          viewBox="0 0 100 100"
          xmlns="http://www.w3.org/2000/svg"
          preserveAspectRatio="none"
        >
          <defs>
            <radialGradient id="grid" cx="50%" cy="50%" r="50%" fx="50%" fy="50%">
              <stop offset="0%" stopColor="white" stopOpacity="0.1" />
              <stop offset="100%" stopColor="white" stopOpacity="0" />
            </radialGradient>
          </defs>
          <rect width="100" height="100" fill="url(#grid)" />
          <g stroke="white" strokeWidth="0.05">
            {Array.from({ length: 20 }).map((_, i) => (
              <line key={`h-${i}`} x1="0" y1={i * 5} x2="100" y2={i * 5} />
            ))}
            {Array.from({ length: 20 }).map((_, i) => (
              <line key={`v-${i}`} x1={i * 5} y1="0" x2={i * 5} y2="100" />
            ))}
          </g>
        </svg>
      </div>

      <div className="container px-4 md:px-6 relative z-20">
        <div className="mx-auto max-w-3xl text-center">
          <div>
            <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl lg:text-7xl bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-300">
              Build the Future of Science with AI
            </h1>
          </div>
          <div>
            <p className="mx-auto max-w-[700px] text-muted-foreground md:text-xl lg:text-2xl mt-4">
              Accelerate discoveries in quantum mechanics, physics, and mathematics using Synaptiq's specialized AI.
            </p>
          </div>
          <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center">
            {/* Try Demo button - LEFT, WHITE */}
            <Button asChild size="lg" className="bg-white text-black hover:bg-gray-100 text-lg px-8 py-6 h-auto">
              <Link href="/demo" className="flex items-center">
                Try Demo <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>

            {/* Request Beta Access button - RIGHT, DARK */}
            <Button
              asChild
              size="lg"
              variant="outline"
              className="border-gray-700 text-white hover:bg-gray-800 text-lg px-8 py-6 h-auto"
            >
              <Link href="/beta">Request Beta Access</Link>
            </Button>
          </div>
          <div className="mt-12 flex justify-center items-center gap-8">
            <div className="flex flex-col items-center">
              <div className="text-3xl font-bold text-primary">99.8%</div>
              <div className="text-sm text-muted-foreground">Accuracy Rate</div>
            </div>
            <div className="h-12 w-px bg-border"></div>
            <div className="flex flex-col items-center">
              <div className="text-3xl font-bold text-primary">24+</div>
              <div className="text-sm text-muted-foreground">Research Papers</div>
            </div>
            <div className="h-12 w-px bg-border"></div>
            <div className="flex flex-col items-center">
              <div className="text-3xl font-bold text-primary">10k+</div>
              <div className="text-sm text-muted-foreground">Researchers</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
