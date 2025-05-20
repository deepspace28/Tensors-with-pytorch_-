"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Slider } from "@/components/ui/slider"

export function QuantumSimulator() {
  const [particles, setParticles] = useState(50)
  const [isRunning, setIsRunning] = useState(false)
  const [showPattern, setShowPattern] = useState(false)
  const [observationMode, setObservationMode] = useState(false)

  const handleStartSimulation = () => {
    setIsRunning(true)
    // After 2 seconds, show the interference pattern
    setTimeout(() => {
      setShowPattern(true)
    }, 2000)
  }

  const handleReset = () => {
    setIsRunning(false)
    setShowPattern(false)
    setObservationMode(false)
  }

  const handleToggleObservation = () => {
    setObservationMode(!observationMode)
    if (showPattern) {
      // Reset pattern when observation mode changes
      setShowPattern(false)
      setTimeout(() => {
        setShowPattern(true)
      }, 1000)
    }
  }

  return (
    <Card className="w-full bg-[#282a36] border-[#44475a] text-[#f8f8f2]">
      <CardHeader>
        <CardTitle className="text-[#8be9fd]">Quantum Double-Slit Experiment</CardTitle>
        <CardDescription className="text-[#6272a4]">Observe quantum wave-particle duality in action</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <span className="text-sm text-[#bd93f9]">Particle Count</span>
            <span className="text-sm text-[#f1fa8c]">{particles}</span>
          </div>
          <Slider
            value={[particles]}
            min={10}
            max={200}
            step={10}
            onValueChange={(value) => setParticles(value[0])}
            disabled={isRunning}
            className="[&>[role=slider]]:bg-[#ff79c6]"
          />

          <div className="h-60 bg-[#1e1f29] rounded-md relative overflow-hidden">
            {/* Simulation visualization */}
            <div className="absolute inset-0 flex items-center justify-center">
              {!isRunning && !showPattern && (
                <div className="text-[#6272a4] text-center">
                  <p>Press Start to begin the quantum simulation</p>
                </div>
              )}

              {isRunning && !showPattern && (
                <div className="text-[#50fa7b] text-center">
                  <p>Simulation running...</p>
                  <div className="mt-2 flex justify-center">
                    <div className="animate-pulse w-4 h-4 bg-[#50fa7b] rounded-full mx-1"></div>
                    <div className="animate-pulse w-4 h-4 bg-[#50fa7b] rounded-full mx-1 animation-delay-200"></div>
                    <div className="animate-pulse w-4 h-4 bg-[#50fa7b] rounded-full mx-1 animation-delay-400"></div>
                  </div>
                </div>
              )}

              {showPattern && (
                <div className="w-full h-full flex items-center justify-center">
                  {observationMode ? (
                    // Particle pattern (when observed)
                    <div className="w-full h-full flex flex-col items-center justify-center">
                      <div className="text-[#ff5555] mb-2">Particle Behavior (Observed)</div>
                      <div className="w-4/5 h-32 relative">
                        {Array.from({ length: 2 }).map((_, i) => (
                          <div
                            key={i}
                            className="absolute h-full"
                            style={{
                              left: `${30 + i * 40}%`,
                              width: "2px",
                              backgroundColor: "#ff5555",
                            }}
                          ></div>
                        ))}
                      </div>
                    </div>
                  ) : (
                    // Wave interference pattern (when not observed)
                    <div className="w-full h-full flex flex-col items-center justify-center">
                      <div className="text-[#8be9fd] mb-2">Wave Interference Pattern</div>
                      <div className="w-4/5 h-32 relative">
                        {Array.from({ length: 7 }).map((_, i) => (
                          <div
                            key={i}
                            className="absolute h-full"
                            style={{
                              left: `${10 + i * 13}%`,
                              width: "2px",
                              backgroundColor: `rgba(139, 233, 253, ${0.3 + Math.sin(i * 0.9) * 0.7})`,
                            }}
                          ></div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>

          <div className="flex flex-wrap gap-2">
            <Button
              onClick={handleStartSimulation}
              disabled={isRunning}
              className="bg-[#50fa7b] text-[#282a36] hover:bg-[#50fa7b]/80"
            >
              Start Simulation
            </Button>
            <Button
              onClick={handleReset}
              variant="outline"
              className="border-[#ff79c6] text-[#ff79c6] hover:bg-[#ff79c6]/10"
            >
              Reset
            </Button>
            <Button
              onClick={handleToggleObservation}
              variant={observationMode ? "default" : "outline"}
              className={
                observationMode
                  ? "bg-[#ff5555] text-white hover:bg-[#ff5555]/80"
                  : "border-[#bd93f9] text-[#bd93f9] hover:bg-[#bd93f9]/10"
              }
            >
              {observationMode ? "Observing" : "Observe Particles"}
            </Button>
          </div>

          <div className="text-sm text-[#6272a4] mt-4">
            <p>
              {observationMode
                ? "When observed, quantum particles behave like discrete particles, creating two distinct bands."
                : "Without observation, quantum particles exhibit wave-like properties, creating an interference pattern."}
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
