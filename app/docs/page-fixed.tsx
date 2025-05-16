import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Documentation | SynaptIQ",
  description: "Documentation for using the SynaptIQ scientific AI platform",
}

export default function DocsPage() {
  return (
    <div className="container mx-auto px-4 py-12">
      <h1 className="text-4xl font-bold mb-8">SynaptIQ Documentation</h1>

      <section className="mb-12">
        <h2 className="text-2xl font-semibold mb-4">Getting Started</h2>
        <div className="bg-gray-900 rounded-lg p-6">
          <p className="text-white mb-4">
            SynaptIQ is a scientific AI platform that helps researchers, scientists, and students explore complex
            scientific concepts through interactive simulations and visualizations.
          </p>
          <p className="text-white">
            To get started, simply navigate to the Chat interface and enter your scientific query.
          </p>
        </div>
      </section>

      <section className="mb-12">
        <h2 className="text-2xl font-semibold mb-4">Using Scientific Prompts</h2>
        <div className="bg-gray-900 rounded-lg p-6">
          <p className="text-white mb-4">
            For best results, be specific about the scientific concept you want to explore. Here are some example
            prompts:
          </p>
          <ul className="list-disc list-inside text-white space-y-2">
            <li>Simulate a quantum harmonic oscillator with 5 energy levels</li>
            <li>Explain the mathematics behind black hole entropy</li>
            <li>Visualize the double-slit experiment with electrons</li>
          </ul>
        </div>
      </section>

      <section className="mb-12">
        <h2 className="text-2xl font-semibold mb-4">Code Examples</h2>
        <div className="bg-gray-900 rounded-lg p-6">
          <p className="text-white mb-4">Example of using the SynaptIQ API:</p>
          <pre className="bg-black p-4 rounded text-green-400 overflow-x-auto">
            <code>
              {`// Initialize the SynaptIQ client
const synaptiq = new SynaptIQ({
  apiKey: process.env.SYNAPTIQ_API_KEY
});

// Run a quantum simulation
async function runSimulation() {
  const result = await synaptiq.simulate({
    type: 'quantum',
    system: 'hydrogen_atom',
    parameters: {
      energy_levels: 3,
      show_wavefunctions: true
    }
  });
  
  console.log(result);
}`}
            </code>
          </pre>
        </div>
      </section>

      <section className="mb-12">
        <h2 className="text-2xl font-semibold mb-4">API Reference</h2>
        <div className="bg-gray-900 rounded-lg p-6">
          <h3 className="text-xl text-white mb-4">Simulation Endpoints</h3>

          <div className="mb-6">
            <h4 className="text-lg text-white font-medium mb-2">POST /api/simulate</h4>
            <p className="text-white mb-2">Request body:</p>
            <pre className="bg-black p-4 rounded text-green-400 overflow-x-auto">
              <code>
                {`{
  "type": "quantum" | "physics" | "math" | "biology",
  "system": string,
  "parameters": object,
  "visualization": boolean
}`}
              </code>
            </pre>
          </div>

          <div>
            <h4 className="text-lg text-white font-medium mb-2">Response format:</h4>
            <pre className="bg-black p-4 rounded text-green-400 overflow-x-auto">
              <code>
                {`{
  "id": string,
  "results": {
    "data": any,
    "explanation": string,
    "visualization": string | null
  },
  "status": "success" | "error",
  "error": string | null
}`}
              </code>
            </pre>
          </div>
        </div>
      </section>

      <section>
        <h2 className="text-2xl font-semibold mb-4">Troubleshooting</h2>
        <div className="bg-gray-900 rounded-lg p-6">
          <h3 className="text-xl text-white mb-4">Common Issues</h3>

          <div className="mb-4">
            <h4 className="text-lg text-white font-medium mb-2">Simulation fails to run</h4>
            <p className="text-white">
              Check that your parameters are within the supported ranges. For example, quantum simulations support up to
              10 energy levels.
            </p>
          </div>

          <div>
            <h4 className="text-lg text-white font-medium mb-2">API returns an error</h4>
            <p className="text-white">
              Ensure your API key is valid and that you&apos;re using the correct endpoint for your simulation type.
            </p>
          </div>
        </div>
      </section>
    </div>
  )
}
