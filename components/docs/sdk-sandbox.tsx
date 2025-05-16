"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Loader2, Play, Copy, Check } from "lucide-react"

export function SdkSandbox() {
  const [isRunning, setIsRunning] = useState(false)
  const [output, setOutput] = useState("")
  const [copied, setCopied] = useState(false)

  const sampleCode = `from synaptiq import SynaptiqClient
from synaptiq.domains import QuantumMechanics
from synaptiq.constraints import ConservationOfEnergy

# Initialize the client
client = SynaptiqClient()

# Generate a theory in the quantum mechanics domain
# with conservation of energy constraint
theory = client.theories.generate(
    domain="quantum_mechanics",
    constraints=["conservation_of_energy"],
    creativity_level=0.8
)

# Print the generated theory
print(f"Theory: {theory.title}")
print(f"Description: {theory.description}")
print(f"Confidence: {theory.confidence}")
print(f"Novelty Score: {theory.novelty_score}")

# Evaluate the theory
evaluation = theory.evaluate(
    criteria=["logical_consistency", "empirical_evidence"]
)

# Print evaluation results
print(f"\\nEvaluation Results:")
print(f"Logical Consistency: {evaluation.scores['logical_consistency']}")
print(f"Empirical Evidence: {evaluation.scores['empirical_evidence']}")
print(f"Overall Score: {evaluation.scores['overall']}")
print(f"Status: {evaluation.status}")
`

  const simulatedOutput = `Theory: Quantum Entanglement Decay Model
Description: A model proposing that quantum entanglement between particles decays logarithmically with distance in curved spacetime.
Confidence: 0.72
Novelty Score: 0.85

Evaluation Results:
Logical Consistency: 0.92
Empirical Evidence: 0.78
Overall Score: 0.84
Status: ACCEPTED_WITH_REVISIONS
`

  const runCode = () => {
    setIsRunning(true)
    setOutput("")

    // Simulate code execution with progressive output
    const lines = simulatedOutput.split("\n")
    let currentLine = 0

    const interval = setInterval(() => {
      if (currentLine < lines.length) {
        setOutput((prev) => prev + lines[currentLine] + "\n")
        currentLine++
      } else {
        clearInterval(interval)
        setIsRunning(false)
      }
    }, 300)
  }

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div className="border border-gray-800 rounded-lg overflow-hidden bg-black">
      <div className="p-4 border-b border-gray-800">
        <h3 className="text-xl font-medium text-white">Try It Now: SDK Sandbox</h3>
        <p className="text-gray-400 text-sm mt-1">Run a simple example of the Synaptiq Python SDK</p>
      </div>

      <Tabs defaultValue="code" className="p-4">
        <TabsList className="bg-gray-900 border border-gray-800 mb-4">
          <TabsTrigger value="code" className="data-[state=active]:bg-white data-[state=active]:text-black">
            Code
          </TabsTrigger>
          <TabsTrigger value="output" className="data-[state=active]:bg-white data-[state=active]:text-black">
            Output
          </TabsTrigger>
        </TabsList>

        <TabsContent value="code">
          <div className="relative">
            <pre className="bg-gray-900 rounded-md p-4 overflow-auto text-sm font-mono text-gray-300 max-h-96">
              {sampleCode}
            </pre>
            <button
              className="absolute top-2 right-2 p-1 rounded bg-gray-800 hover:bg-gray-700 text-gray-400"
              onClick={() => copyToClipboard(sampleCode)}
            >
              {copied ? <Check size={16} /> : <Copy size={16} />}
            </button>
          </div>
          <div className="mt-4 flex justify-end">
            <Button
              onClick={runCode}
              disabled={isRunning}
              className="bg-white text-black hover:bg-gray-200 flex items-center gap-2"
            >
              {isRunning ? (
                <>
                  <Loader2 size={16} className="animate-spin" />
                  Running...
                </>
              ) : (
                <>
                  <Play size={16} />
                  Run Code
                </>
              )}
            </Button>
          </div>
        </TabsContent>

        <TabsContent value="output">
          <div className="bg-gray-900 rounded-md p-4 overflow-auto font-mono text-sm text-gray-300 min-h-[200px] max-h-96">
            {isRunning ? (
              <div className="flex items-center">
                <Loader2 size={16} className="animate-spin mr-2" />
                <span>Running code...</span>
              </div>
            ) : output ? (
              <pre>{output}</pre>
            ) : (
              <div className="text-gray-500">Click "Run Code" to see the output here.</div>
            )}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
