"use client"

import { useState, useEffect, useRef } from "react"
import type React from "react"

import { SiteHeader } from "@/components/site-header"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ChatMessages } from "@/components/chat/chat-messages"
import { SimulationDetector } from "@/components/chat/simulation-detector"
import { VisualizationRenderer } from "@/components/chat/visualization-renderer"
import { ModeSelector } from "@/components/chat/mode-selector"
import { Loader2, Send, Sparkles, Beaker, FlaskConical, Atom } from "lucide-react"
import { useChat } from "@/contexts/chat-context"
import type { Message } from "@/types/chat"
import { detectSimulationType } from "@/lib/engines/simulationRouter"
import { PresetSelector } from "@/components/simulation-lab/preset-selector"
import { QuantumCircuitVisualization } from "@/components/simulation-lab/quantum-circuit-visualization"
import { AdvancedQuantumParameters } from "@/components/simulation-lab/advanced-quantum-parameters"
import { quantumPresets } from "@/lib/simulation-presets/quantum-presets"

export default function ChatPage() {
  const { chatState, sendMessage, clearMessages, setInteractionMode } = useChat()

  const [input, setInput] = useState("")
  const [activeTab, setActiveTab] = useState("chat")
  const [simulationType, setSimulationType] = useState<string | null>(null)
  const [simulationMode, setSimulationMode] = useState("quantum")
  const [selectedPreset, setSelectedPreset] = useState("")
  const [isRunningSimulation, setIsRunningSimulation] = useState(false)
  const [simulationResult, setSimulationResult] = useState<any>(null)
  const [advancedParams, setAdvancedParams] = useState<Record<string, any>>({})

  const messagesEndRef = useRef<HTMLDivElement>(null)

  // Scroll to bottom of messages
  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" })
    }
  }, [chatState.messages])

  // Detect simulation type from input
  useEffect(() => {
    if (input.trim()) {
      const type = detectSimulationType(input)
      setSimulationType(type)
    } else {
      setSimulationType(null)
    }
  }, [input])

  const handleSendMessage = async () => {
    if (!input.trim()) return

    if (activeTab === "simulation") {
      await runSimulation()
    } else {
      sendMessage(input)
      setInput("")
    }
  }

  const runSimulation = async () => {
    setIsRunningSimulation(true)

    try {
      // Prepare simulation parameters
      const params = {
        prompt: input,
        type: simulationMode,
        preset: selectedPreset || undefined,
        ...advancedParams,
      }

      // Call the appropriate API endpoint based on simulation type
      const endpoint = `/api/simulations/${simulationMode}`
      const response = await fetch(endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(params),
      })

      if (!response.ok) {
        throw new Error(`Simulation failed: ${response.statusText}`)
      }

      const result = await response.json()

      // Add simulation result to chat
      const simulationMessage: Message = {
        id: Date.now().toString(),
        role: "assistant",
        content: `Simulation results for: ${input}`,
        timestamp: new Date(),
        simulationResult: result.data || result,
        simulationType: simulationMode,
      }

      chatState.messages.push(simulationMessage)
      setSimulationResult(result.data || result)
      setInput("")
    } catch (error) {
      console.error("Simulation error:", error)
      // Add error message to chat
      const errorMessage: Message = {
        id: Date.now().toString(),
        role: "assistant",
        content: `Error running simulation: ${error instanceof Error ? error.message : "Unknown error"}`,
        timestamp: new Date(),
      }
      chatState.messages.push(errorMessage)
    } finally {
      setIsRunningSimulation(false)
    }
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault()
      handleSendMessage()
    }
  }

  return (
    <div className="flex min-h-screen flex-col bg-black text-white">
      <SiteHeader />
      <main className="flex-1 flex flex-col">
        <div className="container mx-auto py-4 flex-1 flex flex-col">
          <Tabs defaultValue="chat" value={activeTab} onValueChange={setActiveTab} className="flex-1 flex flex-col">
            <TabsList className="grid grid-cols-2 w-full max-w-md mx-auto mb-4 bg-gray-900 border border-gray-800">
              <TabsTrigger value="chat" className="data-[state=active]:bg-gray-800 data-[state=active]:text-white">
                <Sparkles className="h-4 w-4 mr-2" />
                Scientific Chat
              </TabsTrigger>
              <TabsTrigger
                value="simulation"
                className="data-[state=active]:bg-gray-800 data-[state=active]:text-white"
              >
                <Atom className="h-4 w-4 mr-2" />
                Simulations
              </TabsTrigger>
            </TabsList>

            <TabsContent value="chat" className="flex-1 flex flex-col space-y-4">
              <Card className="flex-1 bg-gray-900 border-gray-800 overflow-hidden flex flex-col">
                <CardContent className="p-4 flex-1 overflow-y-auto">
                  <ChatMessages messages={chatState.messages} />
                  <div ref={messagesEndRef} />
                </CardContent>
              </Card>

              <Card className="bg-gray-900 border-gray-800">
                <CardContent className="p-4">
                  <div className="flex items-center space-x-2">
                    <Input
                      placeholder="Ask a scientific question..."
                      value={input}
                      onChange={(e) => setInput(e.target.value)}
                      onKeyDown={handleKeyDown}
                      className="flex-1 bg-gray-800 border-gray-700 text-white"
                    />
                    <Button
                      onClick={handleSendMessage}
                      disabled={chatState.isLoading || !input.trim()}
                      className="bg-gray-800 hover:bg-gray-700"
                    >
                      {chatState.isLoading ? (
                        <Loader2 className="h-4 w-4 animate-spin" />
                      ) : (
                        <Send className="h-4 w-4" />
                      )}
                    </Button>
                  </div>

                  <div className="mt-2">
                    <ModeSelector
                      selectedMode={chatState.interactionMode}
                      onModeChange={setInteractionMode}
                      disabled={chatState.isLoading}
                    />
                  </div>

                  {simulationType && simulationType !== "unknown" && (
                    <div className="mt-2 p-2 bg-gray-800 rounded-md text-xs text-gray-400">
                      <SimulationDetector type={simulationType} query={input} />
                    </div>
                  )}
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="simulation" className="flex-1 flex flex-col space-y-4">
              <Card className="bg-gray-900 border-gray-800">
                <CardContent className="p-4">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                      <label className="block text-sm font-medium mb-1">Simulation Type</label>
                      <div className="flex space-x-2">
                        <Button
                          variant={simulationMode === "quantum" ? "default" : "outline"}
                          size="sm"
                          onClick={() => setSimulationMode("quantum")}
                          className={simulationMode === "quantum" ? "bg-gray-700" : "bg-gray-800 border-gray-700"}
                        >
                          <Atom className="h-4 w-4 mr-1" />
                          Quantum
                        </Button>
                        <Button
                          variant={simulationMode === "physics" ? "default" : "outline"}
                          size="sm"
                          onClick={() => setSimulationMode("physics")}
                          className={simulationMode === "physics" ? "bg-gray-700" : "bg-gray-800 border-gray-700"}
                        >
                          <FlaskConical className="h-4 w-4 mr-1" />
                          Physics
                        </Button>
                        <Button
                          variant={simulationMode === "math" ? "default" : "outline"}
                          size="sm"
                          onClick={() => setSimulationMode("math")}
                          className={simulationMode === "math" ? "bg-gray-700" : "bg-gray-800 border-gray-700"}
                        >
                          <Beaker className="h-4 w-4 mr-1" />
                          Math
                        </Button>
                      </div>
                    </div>

                    <div className="md:col-span-2">
                      <label className="block text-sm font-medium mb-1">Simulation Preset</label>
                      <PresetSelector
                        presets={quantumPresets}
                        selectedPreset={selectedPreset}
                        onSelectPreset={setSelectedPreset}
                      />
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="flex-1 bg-gray-900 border-gray-800 overflow-hidden flex flex-col">
                <CardContent className="p-4 flex-1 overflow-y-auto">
                  {simulationMode === "quantum" && (
                    <div className="space-y-4">
                      <AdvancedQuantumParameters onChange={setAdvancedParams} preset={selectedPreset} />

                      <div className="border border-gray-800 rounded-md p-4 bg-gray-800/50">
                        <h3 className="text-lg font-medium mb-2">Circuit Preview</h3>
                        <QuantumCircuitVisualization preset={selectedPreset} parameters={advancedParams} />
                      </div>
                    </div>
                  )}

                  {simulationResult && (
                    <div className="mt-4 border border-gray-800 rounded-md p-4 bg-gray-800/50">
                      <h3 className="text-lg font-medium mb-2">Simulation Results</h3>
                      <VisualizationRenderer data={simulationResult} type={simulationMode} />
                    </div>
                  )}
                </CardContent>
              </Card>

              <Card className="bg-gray-900 border-gray-800">
                <CardContent className="p-4">
                  <div className="flex items-center space-x-2">
                    <Input
                      placeholder={`Enter ${simulationMode} simulation prompt...`}
                      value={input}
                      onChange={(e) => setInput(e.target.value)}
                      onKeyDown={handleKeyDown}
                      className="flex-1 bg-gray-800 border-gray-700 text-white"
                    />
                    <Button
                      onClick={runSimulation}
                      disabled={isRunningSimulation || !input.trim()}
                      className="bg-gray-700 hover:bg-gray-600"
                    >
                      {isRunningSimulation ? <Loader2 className="h-4 w-4 animate-spin" /> : "Run Simulation"}
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </main>
    </div>
  )
}
