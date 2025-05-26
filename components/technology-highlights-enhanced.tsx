"use client"

import { motion } from "framer-motion"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Atom, Calculator, Microscope, Cpu } from "lucide-react"

export function TechnologyHighlightsEnhanced() {
  const technologies = [
    {
      icon: Atom,
      title: "Quantum Simulations",
      description: "Advanced quantum circuit simulations with support for 100+ qubit systems.",
      metrics: "99.9% accuracy",
      color: "from-blue-500 to-cyan-500",
    },
    {
      icon: Calculator,
      title: "Mathematical Modeling",
      description: "Solve complex differential equations and perform symbolic mathematics.",
      metrics: "1000+ equations/sec",
      color: "from-green-500 to-emerald-500",
    },
    {
      icon: Microscope,
      title: "Scientific Analysis",
      description: "Deep analysis of research papers and experimental data validation.",
      metrics: "10M+ papers analyzed",
      color: "from-purple-500 to-violet-500",
    },
    {
      icon: Cpu,
      title: "High-Performance Computing",
      description: "Distributed computing infrastructure for large-scale simulations.",
      metrics: "1000+ GPU cores",
      color: "from-orange-500 to-red-500",
    },
  ]

  return (
    <section className="container px-4 py-8 sm:py-12 md:py-16 lg:py-12 mx-auto max-w-7xl">
      <div className="mx-auto flex max-w-4xl flex-col items-center justify-center gap-4 sm:gap-6 lg:gap-4 text-center">
        <Badge className="px-3 py-1 text-xs sm:px-4 sm:text-sm lg:px-3 lg:text-xs" variant="secondary">
          Technology
        </Badge>
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="text-2xl font-bold leading-tight sm:text-3xl md:text-4xl lg:text-3xl max-w-4xl"
        >
          Cutting-Edge Scientific Computing
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          viewport={{ once: true }}
          className="max-w-3xl leading-relaxed text-muted-foreground text-sm sm:text-base md:text-lg lg:text-base lg:leading-6"
        >
          Our platform combines the latest advances in AI, quantum computing, and high-performance computing to deliver
          unprecedented capabilities for scientific research.
        </motion.p>
      </div>

      <div className="mx-auto grid justify-center gap-4 sm:gap-6 lg:gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 max-w-7xl mt-8 sm:mt-12 lg:mt-8">
        {technologies.map((technology, index) => (
          <motion.div
            key={technology.title}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            viewport={{ once: true }}
          >
            <Card className="h-full hover:shadow-lg transition-all duration-300 hover:scale-105 border-gray-200 dark:border-gray-800 overflow-hidden">
              <div className={`h-2 bg-gradient-to-r ${technology.color}`} />
              <CardHeader className="p-4 sm:p-6 lg:p-4">
                <div className="mx-auto mb-3 sm:mb-4 lg:mb-3 flex h-12 w-12 sm:h-16 sm:w-16 lg:h-12 lg:w-12 items-center justify-center rounded-full bg-primary/10">
                  <technology.icon className="h-6 w-6 sm:h-8 sm:w-8 lg:h-6 lg:w-6 text-primary" />
                </div>
                <CardTitle className="text-center text-base sm:text-lg lg:text-base">{technology.title}</CardTitle>
              </CardHeader>
              <CardContent className="p-4 sm:p-6 lg:p-4 pt-0 text-center">
                <p className="text-xs sm:text-sm lg:text-xs text-muted-foreground mb-3 sm:mb-4 lg:mb-3 leading-relaxed">
                  {technology.description}
                </p>
                <div className="inline-flex items-center rounded-full bg-primary/10 px-3 py-1 text-xs sm:text-sm lg:text-xs font-medium text-primary">
                  {technology.metrics}
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>

      {/* Performance metrics section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.4 }}
        viewport={{ once: true }}
        className="mx-auto max-w-6xl mt-12 sm:mt-16 lg:mt-12"
      >
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6 lg:gap-4">
          <div className="text-center p-4 sm:p-6 lg:p-4 rounded-lg bg-gradient-to-br from-primary/5 to-primary/10">
            <div className="text-2xl sm:text-3xl lg:text-2xl font-bold text-primary mb-2">10x</div>
            <div className="text-sm sm:text-base lg:text-sm text-muted-foreground">Faster than traditional methods</div>
          </div>
          <div className="text-center p-4 sm:p-6 lg:p-4 rounded-lg bg-gradient-to-br from-secondary/5 to-secondary/10">
            <div className="text-2xl sm:text-3xl lg:text-2xl font-bold text-secondary mb-2">99.8%</div>
            <div className="text-sm sm:text-base lg:text-sm text-muted-foreground">Accuracy in simulations</div>
          </div>
          <div className="text-center p-4 sm:p-6 lg:p-4 rounded-lg bg-gradient-to-br from-accent/5 to-accent/10">
            <div className="text-2xl sm:text-3xl lg:text-2xl font-bold text-accent mb-2">24/7</div>
            <div className="text-sm sm:text-base lg:text-sm text-muted-foreground">Available for research</div>
          </div>
        </div>
      </motion.div>
    </section>
  )
}
