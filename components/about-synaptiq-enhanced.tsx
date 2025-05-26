"use client"

import { motion } from "framer-motion"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { Brain, Zap, Shield, Users } from "lucide-react"

export function AboutSynaptiqEnhanced() {
  const features = [
    {
      icon: Brain,
      title: "Advanced AI Models",
      description: "State-of-the-art language models specifically trained for scientific research and discovery.",
    },
    {
      icon: Zap,
      title: "Real-time Processing",
      description: "Lightning-fast computation and analysis for immediate insights and results.",
    },
    {
      icon: Shield,
      title: "Validated Results",
      description: "All outputs are rigorously validated by leading researchers in their respective fields.",
    },
    {
      icon: Users,
      title: "Collaborative Platform",
      description: "Built for teams and individual researchers to collaborate and share discoveries.",
    },
  ]

  return (
    <section className="container px-4 py-8 sm:py-12 md:py-16 lg:py-12 mx-auto max-w-7xl">
      <div className="mx-auto flex max-w-4xl flex-col items-center justify-center gap-4 sm:gap-6 lg:gap-4 text-center">
        <Badge className="px-3 py-1 text-xs sm:px-4 sm:text-sm lg:px-3 lg:text-xs" variant="secondary">
          About Synaptiq
        </Badge>
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="text-2xl font-bold leading-tight sm:text-3xl md:text-4xl lg:text-3xl max-w-4xl"
        >
          Revolutionizing Scientific Research with AI
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          viewport={{ once: true }}
          className="max-w-3xl leading-relaxed text-muted-foreground text-sm sm:text-base md:text-lg lg:text-base lg:leading-6"
        >
          Synaptiq is the world's first AI platform designed specifically for scientific research. Our advanced models
          understand complex scientific concepts and can assist with everything from quantum mechanics to advanced
          mathematics.
        </motion.p>
      </div>

      <div className="mx-auto grid justify-center gap-4 sm:gap-6 lg:gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 max-w-7xl mt-8 sm:mt-12 lg:mt-8">
        {features.map((feature, index) => (
          <motion.div
            key={feature.title}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            viewport={{ once: true }}
          >
            <Card className="h-full hover:shadow-lg transition-all duration-300 hover:scale-105 border-gray-200 dark:border-gray-800">
              <CardContent className="p-4 sm:p-6 lg:p-4 text-center h-full flex flex-col">
                <div className="mx-auto mb-3 sm:mb-4 lg:mb-3 flex h-12 w-12 sm:h-16 sm:w-16 lg:h-12 lg:w-12 items-center justify-center rounded-full bg-primary/10">
                  <feature.icon className="h-6 w-6 sm:h-8 sm:w-8 lg:h-6 lg:w-6 text-primary" />
                </div>
                <h3 className="mb-2 sm:mb-3 lg:mb-2 text-base sm:text-lg lg:text-base font-semibold">
                  {feature.title}
                </h3>
                <p className="text-xs sm:text-sm lg:text-xs text-muted-foreground leading-relaxed flex-1">
                  {feature.description}
                </p>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>

      {/* Additional content section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.4 }}
        viewport={{ once: true }}
        className="mx-auto max-w-4xl text-center mt-12 sm:mt-16 lg:mt-12"
      >
        <div className="rounded-lg bg-gradient-to-r from-primary/10 to-secondary/10 p-6 sm:p-8 lg:p-6">
          <h3 className="text-lg sm:text-xl lg:text-lg font-semibold mb-3 sm:mb-4 lg:mb-3">
            Trusted by Leading Researchers
          </h3>
          <p className="text-sm sm:text-base lg:text-sm text-muted-foreground leading-relaxed">
            From quantum physicists at MIT to mathematicians at Oxford, researchers worldwide trust Synaptiq to
            accelerate their discoveries and validate their findings.
          </p>
        </div>
      </motion.div>
    </section>
  )
}
