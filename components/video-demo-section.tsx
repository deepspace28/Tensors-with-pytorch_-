"use client"

import { useState } from "react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { QuantumVideoDemo } from "./video-demos/quantum-video"
import { DerivationVideoDemo } from "./video-demos/derivation-video"
import { PhysicsVideoDemo } from "./video-demos/physics-video"
import { motion } from "framer-motion"

export function VideoDemoSection() {
  const [activeTab, setActiveTab] = useState("quantum")

  // Animation variants for tab transitions
  const tabContentVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  }

  return (
    <div className="w-full">
      <Tabs defaultValue="quantum" className="w-full" onValueChange={setActiveTab}>
        <TabsList className="grid grid-cols-3 mb-8 bg-black border border-[#44475a] p-1 rounded-md">
          <TabsTrigger
            value="quantum"
            className="data-[state=active]:bg-[#44475a] data-[state=active]:text-white text-white hover:text-white hover:bg-[#333333] transition-all duration-200"
          >
            Quantum Physics
          </TabsTrigger>
          <TabsTrigger
            value="derivation"
            className="data-[state=active]:bg-[#44475a] data-[state=active]:text-white text-white hover:text-white hover:bg-[#333333] transition-all duration-200"
          >
            Mathematical Derivations
          </TabsTrigger>
          <TabsTrigger
            value="physics"
            className="data-[state=active]:bg-[#44475a] data-[state=active]:text-white text-white hover:text-white hover:bg-[#333333] transition-all duration-200"
          >
            Physics Lab
          </TabsTrigger>
        </TabsList>

        <div className="bg-black rounded-lg p-6 border border-[#44475a] shadow-xl">
          <motion.div key={activeTab} initial="hidden" animate="visible" variants={tabContentVariants}>
            <TabsContent value="quantum" className="mt-0">
              <QuantumVideoDemo />
            </TabsContent>

            <TabsContent value="derivation" className="mt-0">
              <DerivationVideoDemo />
            </TabsContent>

            <TabsContent value="physics" className="mt-0">
              <PhysicsVideoDemo />
            </TabsContent>
          </motion.div>
        </div>
      </Tabs>
    </div>
  )
}
