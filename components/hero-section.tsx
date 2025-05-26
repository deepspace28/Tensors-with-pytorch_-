"use client"

import Link from "next/link"
import { ArrowRight } from "lucide-react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"

interface HeroSectionProps {
  onJoinBeta?: () => void
}

export function HeroSection({ onJoinBeta }: HeroSectionProps) {
  return (
    <section className="relative w-full py-8 sm:py-12 md:py-16 lg:py-20 xl:py-24 2xl:py-32 bg-gradient-to-b from-background via-background/95 to-background/90 overflow-hidden min-h-[80vh] lg:min-h-[90vh] flex items-center">
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

      <div className="container px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16 relative z-20 mx-auto max-w-7xl w-full">
        <div className="mx-auto max-w-5xl text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
            <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl 2xl:text-8xl bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-300 leading-tight max-w-5xl mx-auto">
              Build the Future of Science with AI
            </h1>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <p className="mx-auto max-w-3xl text-muted-foreground text-base sm:text-lg md:text-xl lg:text-2xl xl:text-3xl mt-4 sm:mt-6 lg:mt-8 leading-relaxed px-4">
              Accelerate discoveries in quantum mechanics, physics, and mathematics using Synaptiq's specialized AI.
            </p>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="mt-6 sm:mt-8 lg:mt-12 flex flex-col sm:flex-row gap-3 sm:gap-4 lg:gap-6 justify-center px-4"
          >
            {/* Try Demo button - LEFT, WHITE */}
            <Button
              asChild
              size="lg"
              className="bg-white text-black hover:bg-gray-100 text-base sm:text-lg lg:text-xl px-6 sm:px-8 lg:px-10 xl:px-12 py-3 sm:py-4 lg:py-6 h-auto w-full sm:w-auto min-h-[48px] lg:min-h-[56px] xl:min-h-[64px] font-semibold transition-all duration-300 hover:scale-105"
            >
              <Link href="/demo" className="flex items-center justify-center">
                Try Demo <ArrowRight className="ml-2 h-4 w-4 sm:h-5 sm:w-5 lg:h-6 lg:w-6" />
              </Link>
            </Button>

            {/* Request Beta Access button - RIGHT, DARK */}
            <Button
              size="lg"
              variant="outline"
              className="border-gray-700 text-white hover:bg-gray-800 text-base sm:text-lg lg:text-xl px-6 sm:px-8 lg:px-10 xl:px-12 py-3 sm:py-4 lg:py-6 h-auto w-full sm:w-auto min-h-[48px] lg:min-h-[56px] xl:min-h-[64px] font-semibold transition-all duration-300 hover:scale-105"
              onClick={onJoinBeta}
            >
              Request Beta Access
            </Button>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.6 }}
            className="mt-8 sm:mt-12 lg:mt-16 xl:mt-20 flex flex-col sm:flex-row justify-center items-center gap-4 sm:gap-8 lg:gap-12 xl:gap-16"
          >
            <div className="flex flex-col items-center">
              <div className="text-2xl sm:text-3xl lg:text-4xl xl:text-5xl font-bold text-primary">99.8%</div>
              <div className="text-xs sm:text-sm lg:text-base xl:text-lg text-muted-foreground mt-1">Accuracy Rate</div>
            </div>
            <div className="hidden sm:block h-12 lg:h-16 w-px bg-border"></div>
            <div className="flex flex-col items-center">
              <div className="text-2xl sm:text-3xl lg:text-4xl xl:text-5xl font-bold text-primary">24+</div>
              <div className="text-xs sm:text-sm lg:text-base xl:text-lg text-muted-foreground mt-1">
                Research Papers
              </div>
            </div>
            <div className="hidden sm:block h-12 lg:h-16 w-px bg-border"></div>
            <div className="flex flex-col items-center">
              <div className="text-2xl sm:text-3xl lg:text-4xl xl:text-5xl font-bold text-primary">10k+</div>
              <div className="text-xs sm:text-sm lg:text-base xl:text-lg text-muted-foreground mt-1">Researchers</div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Animated particles */}
      <ParticleEffect />
    </section>
  )
}

function ParticleEffect() {
  return (
    <div className="absolute inset-0 z-10 pointer-events-none">
      {Array.from({ length: 30 }).map((_, i) => (
        <motion.div
          key={i}
          className="absolute rounded-full bg-white"
          style={{
            width: Math.random() * 6 + 2,
            height: Math.random() * 6 + 2,
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
          }}
          animate={{
            opacity: [0, 0.6, 0],
            scale: [0, 1, 0],
          }}
          transition={{
            duration: Math.random() * 6 + 4,
            repeat: Number.POSITIVE_INFINITY,
            repeatType: "loop",
            delay: Math.random() * 5,
          }}
        />
      ))}
    </div>
  )
}
