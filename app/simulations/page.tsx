"use client"

import type React from "react"

import { useState } from "react"
import { ArrowLeft, Beaker } from "lucide-react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { DynamicSimulator } from "@/components/simulation-lab/dynamic-simulator"

export default function SimulationsPage() {
  const [prompt, setPrompt] = useState("")
  const [activeSimulation, setActiveSimulation] = useState<string | null>(null)

  const handleRunSimulation = () => {
    if (prompt.trim()) {
      console.log(`Setting active simulation to: "${prompt}"`)
      setActiveSimulation(prompt)
    }
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault()
      handleRunSimulation()
    }
  }

  return (
    <div className="flex flex-col min-h-screen bg-black">
      {/* Header */}
      <header className="border-b border-gray-900 p-4 flex items-center justify-between">
        <Link href="/demo" className="flex items-center text-gray-500 hover:text-gray-300 transition-colors">
          <ArrowLeft className="h-5 w-5 mr-2" />
          <span>Back to Chat</span>
        </Link>
        <h1 className="text-xl font-bold text-white">Synaptiq Simulations</h1>
        <div className="w-24" />
      </header>

      {/* Main Content */}
      <main className="flex-1 p-6">
        <div className="max-w-4xl mx-auto">
          <Card className="bg-[#0a0a0a] border-gray-900 mb-6">
            <CardHeader>
              <CardTitle className="text-white text-2xl flex items-center">
                <Beaker className="h-6 w-6 mr-2 text-gray-400" />
                Simulation Laboratory
              </CardTitle>
              <CardDescription className="text-gray-500">
                Run real-time simulations with adjustable parameters
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex gap-2">
                <Input
                  value={prompt}
                  onChange={(e) => setPrompt(e.target.value)}
                  onKeyDown={handleKeyDown}
                  placeholder="Enter a simulation prompt..."
                  className="flex-1 bg-[#111111] border-gray-800 text-white"
                />
                <Button onClick={handleRunSimulation} className="bg-gray-800 hover:bg-gray-700 text-white border-0">
                  Run
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Simulation Results */}
          {activeSimulation ? (
            <DynamicSimulator prompt={activeSimulation} />
          ) : (
            <Card className="bg-[#0a0a0a] border-gray-900 min-h-[400px] flex items-center justify-center">
              <CardContent className="text-center">
                <div className="flex justify-center mb-4">
                  <Beaker className="h-16 w-16 text-gray-700" />
                </div>
                <p className="text-gray-500">Enter a simulation prompt to begin</p>
                <p className="text-gray-600 text-sm mt-2">
                  Try "Quantum wave function", "Schrödinger's equation", or "Harmonic oscillator"
                </p>
              </CardContent>
            </Card>
          )}
        </div>
      </main>
    </div>
  )
}
