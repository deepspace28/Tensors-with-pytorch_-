import { BarChart3, FileText, ArrowRight } from "lucide-react"

export function PerformanceBenchmarks() {
  return (
    <div className="bg-black border border-gray-800 rounded-lg overflow-hidden">
      <div className="p-6 border-b border-gray-800">
        <h3 className="text-xl font-bold text-white">Performance Benchmarks</h3>
        <p className="text-gray-400 mt-2">Real-world performance metrics and success stories</p>
      </div>

      <div className="grid md:grid-cols-2 gap-6 p-6">
        <div className="space-y-4">
          <h4 className="text-lg font-medium text-white flex items-center gap-2">
            <BarChart3 className="h-5 w-5" /> Quantitative Metrics
          </h4>

          <div className="space-y-4">
            <div className="bg-gray-900 p-4 rounded-lg">
              <div className="flex justify-between items-center mb-2">
                <span className="text-white">Theory Generation Rate</span>
                <span className="text-white font-mono">12 / day</span>
              </div>
              <p className="text-sm text-gray-400">
                Average number of novel, peer-review-aligned hypotheses generated per day in quantum field theory
                domain.
              </p>
            </div>

            <div className="bg-gray-900 p-4 rounded-lg">
              <div className="flex justify-between items-center mb-2">
                <span className="text-white">Consistency Score</span>
                <span className="text-white font-mono">94%</span>
              </div>
              <p className="text-sm text-gray-400">
                Percentage of generated theories that are mathematically consistent with established physical laws.
              </p>
            </div>

            <div className="bg-gray-900 p-4 rounded-lg">
              <div className="flex justify-between items-center mb-2">
                <span className="text-white">Novel Prediction Rate</span>
                <span className="text-white font-mono">3.4 / theory</span>
              </div>
              <p className="text-sm text-gray-400">
                Average number of testable predictions generated per theory that were not explicitly derivable from
                input data.
              </p>
            </div>

            <div className="bg-gray-900 p-4 rounded-lg">
              <div className="flex justify-between items-center mb-2">
                <span className="text-white">Simulation Performance</span>
                <span className="text-white font-mono">5-120 sec</span>
              </div>
              <p className="text-sm text-gray-400">
                Typical runtime for quantum simulations, depending on complexity (multi-particle entanglement takes
                longer).
              </p>
            </div>
          </div>
        </div>

        <div className="space-y-4">
          <h4 className="text-lg font-medium text-white flex items-center gap-2">
            <FileText className="h-5 w-5" /> Case Study: Dark Matter Interaction Patterns
          </h4>

          <div className="bg-gray-900 p-4 rounded-lg">
            <h5 className="text-white font-medium mb-3">Challenge</h5>
            <p className="text-sm text-gray-400">
              CERN researchers needed to explore non-standard interaction patterns for dark matter particles based on
              recent detector data.
            </p>
          </div>

          <div className="relative">
            <div className="absolute left-4 top-0 bottom-0 w-0.5 bg-gray-800"></div>
            <div className="flex items-center gap-3 relative z-10 mb-3">
              <div className="w-8 h-8 rounded-full bg-white text-black flex items-center justify-center">1</div>
              <h5 className="text-white font-medium">Data Integration</h5>
            </div>
            <div className="pl-11 mb-4">
              <p className="text-sm text-gray-400">
                Synaptiq was connected to CERN's dark matter detection dataset, containing 3 years of experimental
                results.
              </p>
            </div>

            <div className="flex items-center gap-3 relative z-10 mb-3">
              <div className="w-8 h-8 rounded-full bg-white text-black flex items-center justify-center">2</div>
              <h5 className="text-white font-medium">Theory Generation</h5>
            </div>
            <div className="pl-11 mb-4">
              <p className="text-sm text-gray-400">
                Synaptiq generated 8 novel interaction models in Frontier Mode, unconstrained by standard model
                assumptions.
              </p>
            </div>

            <div className="flex items-center gap-3 relative z-10 mb-3">
              <div className="w-8 h-8 rounded-full bg-white text-black flex items-center justify-center">3</div>
              <h5 className="text-white font-medium">Evaluation & Refinement</h5>
            </div>
            <div className="pl-11 mb-4">
              <p className="text-sm text-gray-400">
                3 of the theories showed strong correlation with anomalies in the detector data, with one scoring 92% on
                empirical alignment.
              </p>
            </div>

            <div className="flex items-center gap-3 relative z-10">
              <div className="w-8 h-8 rounded-full bg-white text-black flex items-center justify-center">4</div>
              <h5 className="text-white font-medium">Results</h5>
            </div>
            <div className="pl-11">
              <p className="text-sm text-gray-400">
                The top theory predicted a seasonal variation pattern that was subsequently confirmed by new
                measurements, leading to a published paper.
              </p>
            </div>
          </div>

          <div className="mt-4">
            <a href="/docs/case-studies/dark-matter" className="text-white flex items-center gap-1 hover:underline">
              Read full case study <ArrowRight className="h-4 w-4" />
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}
