"use client"

import { useState } from "react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Loader2, PlayCircle, Copy, Check } from "lucide-react"

interface EndpointInfo {
  method: string
  url: string
  description: string
  requestBody?: string
  responseBody?: string
}

export function ApiConsole() {
  const [loading, setLoading] = useState(false)
  const [response, setResponse] = useState("")
  const [copied, setCopied] = useState(false)
  const [selectedEndpoint, setSelectedEndpoint] = useState("generateTheory")

  const endpoints: Record<string, EndpointInfo> = {
    generateTheory: {
      method: "POST",
      url: "/api/v1/theories/generate",
      description: "Generate a new scientific theory based on parameters",
      requestBody: JSON.stringify(
        {
          domain: "quantum_mechanics",
          constraints: ["conservation_of_energy"],
          creativity_level: 0.8,
          max_complexity: 3,
        },
        null,
        2,
      ),
      responseBody: JSON.stringify(
        {
          id: "th_1234abcd",
          title: "Quantum Entanglement Decay Model",
          description:
            "A model proposing that quantum entanglement between particles decays logarithmically with distance in curved spacetime.",
          confidence: 0.72,
          novelty_score: 0.85,
          created_at: "2025-05-01T12:34:56Z",
        },
        null,
        2,
      ),
    },
    evaluateTheory: {
      method: "POST",
      url: "/api/v1/theories/th_1234abcd/evaluate",
      description: "Evaluate an existing theory",
      requestBody: JSON.stringify(
        {
          evaluation_criteria: ["logical_consistency", "empirical_evidence"],
          evidence_datasets: ["CERN_2022", "quantum_experiments_2023"],
          detail_level: "comprehensive",
        },
        null,
        2,
      ),
      responseBody: JSON.stringify(
        {
          id: "eval_5678efgh",
          theory_id: "th_1234abcd",
          scores: {
            logical_consistency: 0.92,
            empirical_evidence: 0.78,
            overall: 0.84,
          },
          critiques: [
            "Needs more experimental validation in high-energy scenarios",
            "Boundary conditions require further specification",
          ],
          status: "ACCEPTED_WITH_REVISIONS",
          created_at: "2025-05-01T13:45:23Z",
        },
        null,
        2,
      ),
    },
  }

  const simulateApiCall = () => {
    setLoading(true)
    setResponse("")

    // Simulate API call with a delay
    setTimeout(() => {
      setResponse(endpoints[selectedEndpoint].responseBody || "{}")
      setLoading(false)
    }, 1500)
  }

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div className="bg-black border border-gray-800 rounded-lg overflow-hidden">
      <div className="p-4 border-b border-gray-800">
        <h3 className="text-xl text-white font-semibold">Interactive API Console</h3>
        <p className="text-gray-400 text-sm mt-1">Test Synaptiq API endpoints directly in your browser</p>
      </div>

      <div className="p-4">
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-400 mb-2">Select Endpoint</label>
          <select
            className="w-full bg-gray-900 border border-gray-700 rounded-md px-3 py-2 text-white"
            value={selectedEndpoint}
            onChange={(e) => setSelectedEndpoint(e.target.value)}
          >
            <option value="generateTheory">Generate Theory</option>
            <option value="evaluateTheory">Evaluate Theory</option>
          </select>
        </div>

        <div className="mb-4">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium text-gray-400">Endpoint</span>
            <span className="bg-gray-900 px-2 py-1 text-xs font-mono rounded text-white">
              {endpoints[selectedEndpoint].method} {endpoints[selectedEndpoint].url}
            </span>
          </div>
          <p className="text-gray-400 text-sm">{endpoints[selectedEndpoint].description}</p>
        </div>
      </div>

      <Tabs defaultValue="request" className="px-4 pb-4">
        <TabsList className="mb-2 bg-gray-900 border border-gray-800">
          <TabsTrigger value="request" className="data-[state=active]:bg-white data-[state=active]:text-black">
            Request
          </TabsTrigger>
          <TabsTrigger value="response" className="data-[state=active]:bg-white data-[state=active]:text-black">
            Response
          </TabsTrigger>
        </TabsList>

        <TabsContent value="request">
          <div className="relative">
            <pre className="bg-gray-900 rounded-md p-4 overflow-auto text-sm font-mono text-gray-300 max-h-60">
              {endpoints[selectedEndpoint].requestBody}
            </pre>
            <button
              className="absolute top-2 right-2 p-1 rounded-md bg-gray-800 hover:bg-gray-700 text-gray-400"
              onClick={() => copyToClipboard(endpoints[selectedEndpoint].requestBody || "")}
            >
              {copied ? <Check size={16} /> : <Copy size={16} />}
            </button>
          </div>
          <div className="mt-4 flex justify-end">
            <Button
              onClick={simulateApiCall}
              disabled={loading}
              className="bg-white text-black hover:bg-gray-200 flex items-center gap-2"
            >
              {loading ? (
                <>
                  <Loader2 size={16} className="animate-spin" />
                  Running...
                </>
              ) : (
                <>
                  <PlayCircle size={16} />
                  Execute
                </>
              )}
            </Button>
          </div>
        </TabsContent>

        <TabsContent value="response">
          <div className="relative">
            <pre className="bg-gray-900 rounded-md p-4 overflow-auto text-sm font-mono text-gray-300 max-h-60">
              {response || (loading ? "Loading..." : "Execute the request to see the response")}
            </pre>
            {response && (
              <button
                className="absolute top-2 right-2 p-1 rounded-md bg-gray-800 hover:bg-gray-700 text-gray-400"
                onClick={() => copyToClipboard(response)}
              >
                {copied ? <Check size={16} /> : <Copy size={16} />}
              </button>
            )}
          </div>
        </TabsContent>
      </Tabs>

      <div className="px-4 pb-4">
        <a
          href="/docs/api/postman-collection.json"
          download
          className="text-white underline text-sm hover:text-gray-300 flex items-center gap-1"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 24 24" fill="currentColor">
            <path
              d="M11.9996 0C5.3829 0 0 5.38256 0 11.9996C0 18.6167 5.3829 24 11.9996 24C18.6167 24 24 18.6167 24 11.9996C24 5.38293 18.6167 0 11.9996 0Z"
              fill="#FF6C37"
            />
            <path
              d="M15.3305 10.8263L9.9937 17.2419H14.6816C14.6826 17.2419 14.684 17.2419 14.6851 17.2419C14.6918 17.2419 14.6981 17.2419 14.7045 17.2419H14.7109C16.5099 17.1835 17.95 15.6826 17.9501 13.9052C17.9501 12.4553 16.9845 11.2217 15.6778 10.8182C15.5561 10.7904 15.4314 10.8096 15.3305 10.8782V10.8263Z"
              fill="white"
            />
            <path
              d="M8.15613 17.242H6.00063C6.00021 17.242 5.9999 17.242 5.9999 17.242C5.99948 17.242 5.99906 17.242 5.99865 17.242C5.99823 17.242 5.99781 17.242 5.99729 17.242C4.89778 17.242 4.00063 16.3451 4.00063 15.2454C4.00063 14.4166 4.50511 13.6957 5.23532 13.4222C5.36001 13.3752 5.44594 13.262 5.45126 13.1299C5.45699 12.9946 5.38386 12.8729 5.26272 12.8133C4.54763 12.4672 4.05501 11.748 4.05501 10.9369C4.05501 9.83725 4.95237 8.93999 6.05209 8.93999C6.0652 8.93999 6.07842 8.94041 6.09154 8.94115C6.09144 8.93063 6.09144 8.92022 6.09144 8.90969C6.09144 6.75461 7.84011 5.0061 9.99511 5.0061C10.9498 5.0061 11.852 5.36441 12.5395 6.05199C13.1259 6.63815 13.4835 7.39419 13.5519 8.20555C13.5648 8.36274 13.6981 8.48293 13.8572 8.49136C15.1498 8.56272 16.1834 9.6584 16.1834 10.9569C16.1834 11.5661 15.9683 12.1495 15.5768 12.6063C15.4881 12.7056 15.459 12.8488 15.5027 12.9764C15.5464 13.1039 15.655 13.1943 15.7898 13.213C16.9989 13.3842 17.9501 14.433 17.9501 15.6526C17.9501 15.7022 17.9479 15.7518 17.9441 15.8014C17.9227 16.6148 17.1935 17.242 16.3358 17.242H15.148"
              fill="white"
            />
            <path
              d="M8.15613 17.2419H9.9937V10.0356C9.9937 9.88357 9.87126 9.76114 9.71929 9.76114H8.43054C8.27857 9.76114 8.15613 9.88357 8.15613 10.0356V17.2419Z"
              fill="white"
            />
          </svg>
          Download Postman Collection
        </a>
      </div>
    </div>
  )
}
