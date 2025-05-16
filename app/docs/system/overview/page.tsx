import Link from "next/link"
import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"
import { Button } from "@/components/ui/button"
import { ArrowLeft } from "lucide-react"

export const metadata = {
  title: "System Overview | Synaptiq Internal Documentation",
  description: "Overview of the Synaptiq scientific AI platform.",
}

export default function SystemOverviewPage() {
  return (
    <div className="flex min-h-screen flex-col bg-black">
      <SiteHeader />
      <main className="flex-1">
        <div className="container px-4 py-12 md:px-6">
          <div className="mb-8">
            <Button asChild variant="outline" className="border-gray-700 text-white hover:bg-gray-800">
              <Link href="/docs/internal" className="flex items-center gap-2">
                <ArrowLeft className="h-4 w-4" />
                Back to Documentation
              </Link>
            </Button>
          </div>

          <div className="prose prose-invert max-w-none">
            <h1 className="text-4xl font-bold text-white mb-6">System Overview</h1>

            <div className="bg-black border border-gray-800 rounded-lg p-6 mb-8">
              <blockquote className="border-l-4 border-white pl-4 italic text-gray-300">
                What Synaptiq is, why it exists, and how it fits into the platform.
              </blockquote>
            </div>

            <h2 className="text-2xl font-bold text-white mt-8 mb-4">Overview of Synaptiq's Mission</h2>
            <p className="text-gray-300">
              Synaptiq is a proprietary AI-driven theory-generation engine designed to accelerate scientific discovery
              by generating, evaluating, and refining novel hypotheses across multiple scientific domains. Unlike
              traditional AI systems that focus on answering questions or analyzing existing data, Synaptiq specializes
              in formulating original theories that can lead to new avenues of research and innovation.
            </p>
            <p className="text-gray-300">
              The platform's mission is to augment human scientific intuition by exploring vast hypothesis spaces that
              would be impractical for human researchers to navigate manually. By combining neural networks with
              symbolic reasoning, Synaptiq can generate theories that are both mathematically consistent and potentially
              groundbreaking.
            </p>

            <h2 className="text-2xl font-bold text-white mt-8 mb-4">Core Architectural Philosophy</h2>
            <p className="text-gray-300">Synaptiq's architecture is built on three fundamental principles:</p>
            <ol className="list-decimal list-inside text-gray-300 space-y-2 ml-4">
              <li>
                <strong className="text-white">Hybrid Intelligence:</strong> The integration of neural networks for
                pattern recognition and creative association with symbolic reasoning systems for logical consistency and
                formal verification.
              </li>
              <li>
                <strong className="text-white">Iterative Refinement:</strong> Theories evolve through cycles of
                generation, evaluation, critique, and refinement, mimicking the scientific method.
              </li>
              <li>
                <strong className="text-white">Human-AI Collaboration:</strong> The system is designed to work alongside
                human researchers, with clear interfaces for expert feedback and guidance.
              </li>
            </ol>
            <p className="text-gray-300 mt-4">
              The engine operates as a distributed system with specialized components for different aspects of theory
              generation and evaluation. This modular approach allows for continuous improvement of individual
              components without disrupting the overall system.
            </p>

            <h2 className="text-2xl font-bold text-white mt-8 mb-4">System Capabilities and Boundaries</h2>
            <h3 className="text-xl font-semibold text-white mt-6 mb-2">Capabilities</h3>
            <ul className="list-disc list-inside text-gray-300 space-y-2 ml-4">
              <li>Generation of novel scientific hypotheses across physics, chemistry, biology, and related fields</li>
              <li>Formal mathematical representation of theories with explicit axioms and derivations</li>
              <li>Evaluation of internal consistency and logical coherence</li>
              <li>Identification of potential experimental validations</li>
              <li>Comparison with existing scientific literature</li>
              <li>Progressive refinement based on feedback</li>
            </ul>

            <h3 className="text-xl font-semibold text-white mt-6 mb-2">Boundaries</h3>
            <ul className="list-disc list-inside text-gray-300 space-y-2 ml-4">
              <li>Not designed for direct experimental validation (requires integration with lab systems)</li>
              <li>Limited to domains with formal mathematical representations</li>
              <li>Requires human oversight for final theory validation</li>
              <li>Not intended for public-facing applications without expert mediation</li>
            </ul>

            <h2 className="text-2xl font-bold text-white mt-8 mb-4">Operational Roles Across Departments</h2>
            <div className="overflow-x-auto">
              <table className="w-full border-collapse text-gray-300 mt-4">
                <thead>
                  <tr className="border-b border-gray-800">
                    <th className="text-left py-2 px-4 text-white">Department</th>
                    <th className="text-left py-2 px-4 text-white">Role</th>
                    <th className="text-left py-2 px-4 text-white">Responsibilities</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b border-gray-800">
                    <td className="py-2 px-4">Research</td>
                    <td className="py-2 px-4">Domain Experts</td>
                    <td className="py-2 px-4">Provide feedback on theory quality, guide exploration directions</td>
                  </tr>
                  <tr className="border-b border-gray-800">
                    <td className="py-2 px-4">Engineering</td>
                    <td className="py-2 px-4">System Maintainers</td>
                    <td className="py-2 px-4">Ensure system stability, implement new features, optimize performance</td>
                  </tr>
                  <tr className="border-b border-gray-800">
                    <td className="py-2 px-4">Data Science</td>
                    <td className="py-2 px-4">Model Trainers</td>
                    <td className="py-2 px-4">Update neural components, tune parameters, analyze system behavior</td>
                  </tr>
                  <tr className="border-b border-gray-800">
                    <td className="py-2 px-4">Product</td>
                    <td className="py-2 px-4">Interface Designers</td>
                    <td className="py-2 px-4">Create intuitive interfaces for interacting with the system</td>
                  </tr>
                  <tr className="border-b border-gray-800">
                    <td className="py-2 px-4">Security</td>
                    <td className="py-2 px-4">System Guardians</td>
                    <td className="py-2 px-4">Monitor for misuse, enforce access controls, audit system usage</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <h2 className="text-2xl font-bold text-white mt-8 mb-4">Integration with Platform</h2>
            <p className="text-gray-300">
              Synaptiq is tightly integrated with our broader scientific platform through a series of internal APIs. It
              serves as the theoretical core that can be accessed by various applications including:
            </p>
            <ul className="list-disc list-inside text-gray-300 space-y-2 ml-4">
              <li>Research dashboards for scientific teams</li>
              <li>Experimental design tools</li>
              <li>Literature analysis systems</li>
              <li>Simulation environments</li>
            </ul>
            <p className="text-gray-300 mt-4">
              All interactions with Synaptiq are authenticated and logged, with different access levels depending on the
              user's role and permissions. The system is designed to be a collaborative tool that enhances human
              scientific capabilities rather than replacing them.
            </p>
          </div>
        </div>
      </main>
      <SiteFooter />
    </div>
  )
}
