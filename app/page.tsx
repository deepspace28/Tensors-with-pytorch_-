"use client"

import Link from "next/link"
import {
  ArrowRight,
  BrainCircuit,
  Database,
  FlaskRoundIcon as Flask,
  Microscope,
  Rocket,
  Sigma,
  Sparkles,
} from "lucide-react"
import { motion } from "framer-motion"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { HeroSection } from "@/components/hero-section"
import { FeatureSection } from "@/components/feature-section"
import { NewsletterSection } from "@/components/newsletter-section"
import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"
import { TechnologyHighlightsEnhanced } from "@/components/technology-highlights-enhanced"
import { AboutSynaptiqEnhanced } from "@/components/about-synaptiq-enhanced"

// Animation variants
const fadeIn = {
  hidden: { opacity: 0, y: 20 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: i * 0.1,
      duration: 0.5,
      ease: "easeOut",
    },
  }),
}

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.3,
    },
  },
}

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col">
      <SiteHeader />
      <main className="flex-1">
        <HeroSection />
        <AboutSynaptiqEnhanced />

        {/* Immersive Visualization Section with animations */}
        <section className="w-full py-12 md:py-24 lg:py-32 bg-black relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black opacity-50"></div>
          <div className="container px-4 md:px-6 relative z-20">
            <motion.div
              className="flex flex-col items-center justify-center space-y-4 text-center mb-10"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.3 }}
              variants={staggerContainer}
            >
              <motion.div variants={fadeIn} custom={0}>
                <Badge className="px-4 py-1 text-sm bg-white text-black" variant="outline">
                  Immersive Experience
                </Badge>
              </motion.div>
              <motion.h2
                className="text-3xl font-bold tracking-tighter text-white sm:text-4xl md:text-5xl"
                variants={fadeIn}
                custom={1}
              >
                Explore Scientific Frontiers
              </motion.h2>
              <motion.p
                className="max-w-[85%] leading-normal text-gray-300 sm:text-lg sm:leading-7"
                variants={fadeIn}
                custom={2}
              >
                Dive into our interactive 3D visualizations of complex scientific phenomena
              </motion.p>
            </motion.div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-12">
              <motion.div
                className="bg-gray-900 rounded-lg p-6 shadow-xl transform transition-all hover:scale-105 border border-gray-800"
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                viewport={{ once: true }}
              >
                <div className="aspect-video rounded-md bg-black mb-4 overflow-hidden relative">
                  <img
                    src="/Quantum Neural Web.png"
                    alt="Quantum Neural Network Visualization"
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent opacity-60"></div>
                  <div className="absolute bottom-4 left-4 right-4">
                    <h3 className="text-xl font-bold text-white">Quantum Neural Networks</h3>
                    <p className="text-gray-300 text-sm mt-1">
                      Visualize how quantum information flows through neural pathways
                    </p>
                  </div>
                </div>
                <div className="mt-4">
                  <p className="text-white mb-4">
                    Our advanced 3D visualization engine renders complex quantum neural networks in real-time, allowing
                    researchers to observe quantum information processing at unprecedented detail.
                  </p>
                  <Button
                    asChild
                    className="w-full bg-white hover:bg-gray-200 text-black transition-all duration-300 transform hover:scale-105"
                  >
                    <Link href="/visualizations/quantum-neural-networks">Explore Visualization</Link>
                  </Button>
                </div>
              </motion.div>
              <motion.div
                className="bg-gray-900 rounded-lg p-6 shadow-xl transform transition-all hover:scale-105 border border-gray-800"
                initial={{ opacity: 0, x: 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.4 }}
                viewport={{ once: true }}
              >
                <div className="aspect-video rounded-md bg-black mb-4 overflow-hidden relative">
                  <img src="/cosmic-flow.png" alt="Cosmic Flow Simulation" className="w-full h-full object-cover" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent opacity-60"></div>
                  <div className="absolute bottom-4 left-4 right-4">
                    <h3 className="text-xl font-bold text-white">Cosmic Flow Simulation</h3>
                    <p className="text-gray-300 text-sm mt-1">Witness the evolution of galaxies and dark matter</p>
                  </div>
                </div>
                <div className="mt-4">
                  <p className="text-white mb-4">
                    Our cosmic flow simulator models the complex interactions between dark matter, galaxies, and the
                    expansion of space-time, providing insights into the large-scale structure of the universe.
                  </p>
                  <Button
                    asChild
                    className="w-full bg-white hover:bg-gray-200 text-black transition-all duration-300 transform hover:scale-105"
                  >
                    <Link href="/visualizations/cosmic-flow">Explore Simulation</Link>
                  </Button>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        <TechnologyHighlightsEnhanced />
        <FeatureSection />
        <section className="container py-12 md:py-24 lg:py-32 relative">
          <motion.div
            className="mx-auto flex max-w-[58rem] flex-col items-center justify-center gap-4 text-center"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
          >
            <Badge className="px-4 py-1 text-sm bg-white text-black" variant="outline">
              Scientific Validation
            </Badge>
            <h2 className="text-3xl font-bold leading-[1.1] sm:text-4xl md:text-5xl text-white">
              Rigorous Scientific Validation
            </h2>
            <p className="max-w-[85%] leading-normal text-gray-400 sm:text-lg sm:leading-7">
              Our models undergo extensive validation by leading researchers in physics, mathematics, and computer
              science.
            </p>
          </motion.div>
          <motion.div
            className="mx-auto grid justify-center gap-4 sm:grid-cols-2 md:max-w-[64rem] md:grid-cols-3 lg:gap-8 mt-12"
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
          >
            <motion.div variants={fadeIn} custom={0}>
              <Card className="bg-gray-900 border-gray-800">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium text-white">Peer Review</CardTitle>
                  <Microscope className="h-4 w-4 text-gray-400" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-white">100%</div>
                  <p className="text-xs text-gray-400">All algorithms peer-reviewed by experts</p>
                </CardContent>
              </Card>
            </motion.div>
            <motion.div variants={fadeIn} custom={1}>
              <Card className="bg-gray-900 border-gray-800">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium text-white">Accuracy</CardTitle>
                  <Sigma className="h-4 w-4 text-gray-400" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-white">99.8%</div>
                  <p className="text-xs text-gray-400">Mathematical accuracy on benchmark tests</p>
                </CardContent>
              </Card>
            </motion.div>
            <motion.div variants={fadeIn} custom={2}>
              <Card className="bg-gray-900 border-gray-800">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium text-white">Publications</CardTitle>
                  <Flask className="h-4 w-4 text-gray-400" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-white">24+</div>
                  <p className="text-xs text-gray-400">Research papers published in top journals</p>
                </CardContent>
              </Card>
            </motion.div>
          </motion.div>
        </section>
        <section className="container py-12 md:py-24 lg:py-32 bg-gray-900/30 relative">
          <motion.div
            className="mx-auto flex max-w-[58rem] flex-col items-center justify-center gap-4 text-center"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
          >
            <Badge className="px-4 py-1 text-sm bg-white text-black" variant="outline">
              Use Cases
            </Badge>
            <h2 className="text-3xl font-bold leading-[1.1] sm:text-4xl md:text-5xl text-white">
              Powering Scientific Breakthroughs
            </h2>
            <p className="max-w-[85%] leading-normal text-gray-400 sm:text-lg sm:leading-7">
              See how researchers and institutions are using Synaptiq to accelerate their work.
            </p>
          </motion.div>
          <Tabs defaultValue="research" className="mx-auto max-w-4xl mt-12">
            <TabsList className="grid w-full grid-cols-3 bg-gray-800">
              <TabsTrigger
                value="research"
                className="text-white data-[state=active]:bg-white data-[state=active]:text-black"
              >
                Research
              </TabsTrigger>
              <TabsTrigger
                value="education"
                className="text-white data-[state=active]:bg-white data-[state=active]:text-black"
              >
                Education
              </TabsTrigger>
              <TabsTrigger
                value="industry"
                className="text-white data-[state=active]:bg-white data-[state=active]:text-black"
              >
                Industry
              </TabsTrigger>
            </TabsList>
            <TabsContent value="research" className="mt-6">
              <Card className="bg-gray-900 border-gray-800">
                <CardHeader>
                  <CardTitle className="text-white">Accelerating Research</CardTitle>
                  <CardDescription className="text-gray-400">
                    How Synaptiq helps researchers explore complex scientific problems.
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid gap-4 md:grid-cols-2">
                    <div className="flex items-start gap-2">
                      <div className="mt-0.5 rounded-full bg-gray-800 p-1">
                        <div className="h-4 w-4 text-white" />
                      </div>
                      <div className="space-y-1">
                        <h4 className="text-sm font-medium text-white">Quantum Physics Simulations</h4>
                        <p className="text-sm text-gray-400">
                          Run complex quantum simulations with unprecedented accuracy.
                        </p>
                      </div>
                    </div>
                    <div className="flex items-start gap-2">
                      <div className="mt-0.5 rounded-full bg-gray-800 p-1">
                        <Database className="h-4 w-4 text-white" />
                      </div>
                      <div className="space-y-1">
                        <h4 className="text-sm font-medium text-white">Data Analysis</h4>
                        <p className="text-sm text-gray-400">
                          Process and analyze large scientific datasets efficiently.
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="rounded-md bg-gray-800 p-4">
                    <p className="text-sm italic text-gray-300">
                      "Synaptiq has reduced our research cycle time by 60%, allowing us to explore more complex
                      hypotheses than ever before."
                    </p>
                    <p className="mt-2 text-sm font-medium text-white">
                      — Dr. Elena Patel, Quantum Physics Department, MIT
                    </p>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button asChild className="bg-white hover:bg-gray-200 text-black">
                    <Link href="/case-studies">
                      View Research Case Studies <ArrowRight className="ml-2 h-4 w-4" />
                    </Link>
                  </Button>
                </CardFooter>
              </Card>
            </TabsContent>
            <TabsContent value="education" className="mt-6">
              <Card className="bg-gray-900 border-gray-800">
                <CardHeader>
                  <CardTitle className="text-white">Enhancing Education</CardTitle>
                  <CardDescription className="text-gray-400">
                    How Synaptiq is transforming scientific education at universities.
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid gap-4 md:grid-cols-2">
                    <div className="flex items-start gap-2">
                      <div className="mt-0.5 rounded-full bg-gray-800 p-1">
                        <BrainCircuit className="h-4 w-4 text-white" />
                      </div>
                      <div className="space-y-1">
                        <h4 className="text-sm font-medium text-white">Interactive Learning</h4>
                        <p className="text-sm text-gray-400">
                          Create interactive simulations for complex scientific concepts.
                        </p>
                      </div>
                    </div>
                    <div className="flex items-start gap-2">
                      <div className="mt-0.5 rounded-full bg-gray-800 p-1">
                        <Sparkles className="h-4 w-4 text-white" />
                      </div>
                      <div className="space-y-1">
                        <h4 className="text-sm font-medium text-white">Personalized Curriculum</h4>
                        <p className="text-sm text-gray-400">
                          Adapt learning materials to individual student needs and progress.
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="rounded-md bg-gray-800 p-4">
                    <p className="text-sm italic text-gray-300">
                      "Our students' comprehension of advanced physics concepts has improved dramatically since
                      implementing Synaptiq in our curriculum."
                    </p>
                    <p className="mt-2 text-sm font-medium text-white">
                      — Prof. James Chen, California Institute of Technology
                    </p>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button asChild className="bg-white hover:bg-gray-200 text-black">
                    <Link href="/education">
                      Explore Education Solutions <ArrowRight className="ml-2 h-4 w-4" />
                    </Link>
                  </Button>
                </CardFooter>
              </Card>
            </TabsContent>
            <TabsContent value="industry" className="mt-6">
              <Card className="bg-gray-900 border-gray-800">
                <CardHeader>
                  <CardTitle className="text-white">Industry Applications</CardTitle>
                  <CardDescription className="text-gray-400">
                    How companies are leveraging Synaptiq for innovation.
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid gap-4 md:grid-cols-2">
                    <div className="flex items-start gap-2">
                      <div className="mt-0.5 rounded-full bg-gray-800 p-1">
                        <Rocket className="h-4 w-4 text-white" />
                      </div>
                      <div className="space-y-1">
                        <h4 className="text-sm font-medium text-white">R&D Acceleration</h4>
                        <p className="text-sm text-gray-400">
                          Reduce time-to-market for new scientific products and solutions.
                        </p>
                      </div>
                    </div>
                    <div className="flex items-start gap-2">
                      <div className="mt-0.5 rounded-full bg-gray-800 p-1">
                        <Flask className="h-4 w-4 text-white" />
                      </div>
                      <div className="space-y-1">
                        <h4 className="text-sm font-medium text-white">Material Science</h4>
                        <p className="text-sm text-gray-400">
                          Discover and test new materials with advanced simulations.
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="rounded-md bg-gray-800 p-4">
                    <p className="text-sm italic text-gray-300">
                      "Synaptiq has become an essential tool in our R&D department, helping us develop next-generation
                      materials faster than ever."
                    </p>
                    <p className="mt-2 text-sm font-medium text-white">
                      — Sarah Johnson, Chief Scientific Officer, QuantumMaterials Inc.
                    </p>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button asChild className="bg-white hover:bg-gray-200 text-black">
                    <Link href="/industry">
                      Discover Industry Solutions <ArrowRight className="ml-2 h-4 w-4" />
                    </Link>
                  </Button>
                </CardFooter>
              </Card>
            </TabsContent>
          </Tabs>
        </section>
        <NewsletterSection />
      </main>
      <SiteFooter />
    </div>
  )
}
