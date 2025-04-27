"use client"

import { Atom, Database, Code, CheckCircle } from "lucide-react"
import { motion } from "framer-motion"
import { Card, CardContent } from "@/components/ui/card"
import { FadeInUp, StaggerChildren, StaggerItem } from "@/components/motion"

export function TechnologyHighlightsEnhanced() {
  return (
    <section className="w-full py-12 md:py-24 lg:py-32 bg-gradient-to-b from-background to-muted/30">
      <div className="container px-4 md:px-6">
        <FadeInUp>
          <div className="flex flex-col items-center justify-center space-y-4 text-center">
            <div className="space-y-2">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
                Advanced Scientific AI Capabilities
              </h2>
              <p className="max-w-[85%] leading-normal text-muted-foreground sm:text-lg sm:leading-7">
                Cutting-edge technology powering scientific discovery and innovation
              </p>
            </div>
          </div>
        </FadeInUp>
        <StaggerChildren className="mx-auto grid gap-8 py-12 md:grid-cols-2">
          {/* Quantum-Attention Neural Networks */}
          <StaggerItem>
            <motion.div whileHover={{ y: -5 }} className="h-full">
              <Card className="overflow-hidden border-border/40 bg-background/60 backdrop-blur-sm hover-glow h-full">
                <CardContent className="p-0 h-full">
                  <div className="flex flex-col md:flex-row h-full">
                    <div className="flex items-center justify-center bg-foreground/5 p-8 md:w-1/3">
                      <Atom className="h-16 w-16" />
                    </div>
                    <div className="space-y-2 p-6 md:w-2/3">
                      <h3 className="text-xl font-bold">Quantum-Attention Neural Networks</h3>
                      <p className="text-muted-foreground">
                        Our proprietary QANN architecture combines quantum computing principles with attention
                        mechanisms to process complex scientific data with unprecedented accuracy and efficiency.
                      </p>
                      <ul className="mt-4 space-y-1 text-sm text-muted-foreground">
                        <li className="flex items-center">
                          <span className="mr-2 h-1 w-1 rounded-full bg-foreground"></span>
                          Quantum-inspired tensor networks
                        </li>
                        <li className="flex items-center">
                          <span className="mr-2 h-1 w-1 rounded-full bg-foreground"></span>
                          Multi-head scientific attention
                        </li>
                        <li className="flex items-center">
                          <span className="mr-2 h-1 w-1 rounded-full bg-foreground"></span>
                          Entanglement-based information processing
                        </li>
                      </ul>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </StaggerItem>

          {/* Scientific Datasets & Symbolic Math Engines */}
          <StaggerItem>
            <motion.div whileHover={{ y: -5 }} className="h-full">
              <Card className="overflow-hidden border-border/40 bg-background/60 backdrop-blur-sm hover-glow h-full">
                <CardContent className="p-0 h-full">
                  <div className="flex flex-col md:flex-row h-full">
                    <div className="flex items-center justify-center bg-foreground/5 p-8 md:w-1/3">
                      <Database className="h-16 w-16" />
                    </div>
                    <div className="space-y-2 p-6 md:w-2/3">
                      <h3 className="text-xl font-bold">Scientific Datasets & Symbolic Math Engines</h3>
                      <p className="text-muted-foreground">
                        Trained on petabytes of peer-reviewed scientific literature and integrated with symbolic
                        mathematics engines for rigorous mathematical reasoning and derivation capabilities.
                      </p>
                      <ul className="mt-4 space-y-1 text-sm text-muted-foreground">
                        <li className="flex items-center">
                          <span className="mr-2 h-1 w-1 rounded-full bg-foreground"></span>
                          10+ million scientific papers analyzed
                        </li>
                        <li className="flex items-center">
                          <span className="mr-2 h-1 w-1 rounded-full bg-foreground"></span>
                          Symbolic integration with SymPy and Mathematica
                        </li>
                        <li className="flex items-center">
                          <span className="mr-2 h-1 w-1 rounded-full bg-foreground"></span>
                          Automated theorem proving capabilities
                        </li>
                      </ul>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </StaggerItem>

          {/* Quantum Simulation Frameworks */}
          <StaggerItem>
            <motion.div whileHover={{ y: -5 }} className="h-full">
              <Card className="overflow-hidden border-border/40 bg-background/60 backdrop-blur-sm hover-glow h-full">
                <CardContent className="p-0 h-full">
                  <div className="flex flex-col md:flex-row h-full">
                    <div className="flex items-center justify-center bg-foreground/5 p-8 md:w-1/3">
                      <Code className="h-16 w-16" />
                    </div>
                    <div className="space-y-2 p-6 md:w-2/3">
                      <h3 className="text-xl font-bold">Quantum Simulation Frameworks</h3>
                      <p className="text-muted-foreground">
                        Seamless integration with Qiskit and PennyLane enables high-fidelity quantum simulations,
                        allowing researchers to model complex quantum systems without specialized hardware.
                      </p>
                      <ul className="mt-4 space-y-1 text-sm text-muted-foreground">
                        <li className="flex items-center">
                          <span className="mr-2 h-1 w-1 rounded-full bg-foreground"></span>
                          Qiskit & PennyLane integration
                        </li>
                        <li className="flex items-center">
                          <span className="mr-2 h-1 w-1 rounded-full bg-foreground"></span>
                          Quantum circuit optimization
                        </li>
                        <li className="flex items-center">
                          <span className="mr-2 h-1 w-1 rounded-full bg-foreground"></span>
                          Error mitigation techniques
                        </li>
                      </ul>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </StaggerItem>

          {/* AI Peer Review & Validation */}
          <StaggerItem>
            <motion.div whileHover={{ y: -5 }} className="h-full">
              <Card className="overflow-hidden border-border/40 bg-background/60 backdrop-blur-sm hover-glow h-full">
                <CardContent className="p-0 h-full">
                  <div className="flex flex-col md:flex-row h-full">
                    <div className="flex items-center justify-center bg-foreground/5 p-8 md:w-1/3">
                      <CheckCircle className="h-16 w-16" />
                    </div>
                    <div className="space-y-2 p-6 md:w-2/3">
                      <h3 className="text-xl font-bold">AI Peer Review & Validation</h3>
                      <p className="text-muted-foreground">
                        Our AI-driven scientific integrity system continuously validates outputs against established
                        scientific knowledge, ensuring accuracy and reliability in all results and recommendations.
                      </p>
                      <ul className="mt-4 space-y-1 text-sm text-muted-foreground">
                        <li className="flex items-center">
                          <span className="mr-2 h-1 w-1 rounded-full bg-foreground"></span>
                          Automated consistency checking
                        </li>
                        <li className="flex items-center">
                          <span className="mr-2 h-1 w-1 rounded-full bg-foreground"></span>
                          Citation verification system
                        </li>
                        <li className="flex items-center">
                          <span className="mr-2 h-1 w-1 rounded-full bg-foreground"></span>
                          Uncertainty quantification
                        </li>
                      </ul>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </StaggerItem>
        </StaggerChildren>
      </div>
    </section>
  )
}
