import Link from "next/link"
import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { SearchBar } from "@/components/docs/search-bar"

export const metadata = {
  title: "Synaptiq Internal Documentation | Scientific AI Platform",
  description: "Internal documentation for the Synaptiq scientific AI platform.",
}

export default function InternalDocsPage() {
  return (
    <div className="flex min-h-screen flex-col bg-black">
      <SiteHeader />
      <main className="flex-1">
        {/* Hero Section */}
        <section className="w-full py-12 md:py-16">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <Badge className="px-4 py-1 text-sm bg-white text-black" variant="outline">
                Internal Documentation
              </Badge>
              <h1 className="text-3xl font-bold tracking-tighter text-white sm:text-4xl md:text-5xl">
                Synaptiq Internal Documentation
              </h1>
              <p className="max-w-[700px] text-lg text-gray-400 md:text-xl">
                Tailored exclusively for internal use of the Synaptiq platform
              </p>
              <div className="w-full max-w-md">
                <SearchBar />
              </div>
            </div>
          </div>
        </section>

        {/* Introduction */}
        <section className="w-full py-6 md:py-8 bg-black border-t border-gray-900">
          <div className="container px-4 md:px-6">
            <div className="prose prose-invert max-w-none">
              <p className="text-gray-300">
                Synaptiq is a proprietary, AI-driven theory-generation engine integrated directly into our web
                infrastructure. It is accessible via internal APIs and is not available as a standalone module or
                package.
              </p>
              <p className="text-gray-300">
                Each section below includes a short summary. To explore a topic in detail, follow the{" "}
                <strong className="text-white">Learn More</strong> links, which route to isolated, deep-dive pages for
                focused comprehension.
              </p>
            </div>
          </div>
        </section>

        {/* Note about documentation */}
        <div className="container px-4 md:px-6 mb-8">
          <div className="bg-black border border-gray-800 rounded-lg p-4 text-gray-300">
            <p>
              <strong>Note:</strong> Detailed documentation pages are under development. Currently, all "Learn More"
              links will navigate to the corresponding section on this page.
            </p>
          </div>
        </div>

        {/* Documentation Sections */}
        <section className="w-full py-8 md:py-12 bg-black">
          <div className="container px-4 md:px-6">
            <div className="space-y-12">
              {/* Section 1: System Overview */}
              <div className="border-t border-gray-800 pt-8" id="system-overview">
                <h2 className="text-2xl font-bold text-white mb-4">1. System Overview</h2>
                <div className="bg-black border border-gray-800 rounded-lg p-6 mb-4">
                  <blockquote className="border-l-4 border-white pl-4 italic text-gray-300">
                    What Synaptiq is, why it exists, and how it fits into the platform.
                  </blockquote>
                  <ul className="list-disc list-inside text-gray-300 mt-4 space-y-2">
                    <li>Overview of Synaptiq's mission</li>
                    <li>Core architectural philosophy</li>
                    <li>System capabilities and boundaries</li>
                    <li>Operational roles across departments</li>
                  </ul>
                  <div className="mt-6">
                    <Button asChild className="bg-white text-black hover:bg-gray-200">
                      <Link href="#system-overview">Learn More →</Link>
                    </Button>
                  </div>
                </div>
              </div>

              {/* Section 2: Access & Authentication */}
              <div className="border-t border-gray-800 pt-8" id="access-authentication">
                <h2 className="text-2xl font-bold text-white mb-4">2. Access & Authentication</h2>
                <div className="bg-black border border-gray-800 rounded-lg p-6 mb-4">
                  <blockquote className="border-l-4 border-white pl-4 italic text-gray-300">
                    Guidelines for API access, key provisioning, and role-based authentication.
                  </blockquote>
                  <ul className="list-disc list-inside text-gray-300 mt-4 space-y-2">
                    <li>Internal access policies</li>
                    <li>Generating and managing API keys</li>
                    <li>User roles and permission layers</li>
                    <li>Key rotation and revocation workflows</li>
                  </ul>
                  <div className="mt-6">
                    <Button asChild className="bg-white text-black hover:bg-gray-200">
                      <Link href="#access-authentication">Learn More →</Link>
                    </Button>
                  </div>
                </div>
              </div>

              {/* Section 3: Core API: Theory Engine */}
              <div className="border-t border-gray-800 pt-8" id="core-api">
                <h2 className="text-2xl font-bold text-white mb-4">3. Core API: Theory Engine</h2>
                <div className="bg-black border border-gray-800 rounded-lg p-6 mb-4">
                  <blockquote className="border-l-4 border-white pl-4 italic text-gray-300">
                    The primary interface to generate, evaluate, and critique scientific theories.
                  </blockquote>
                  <h3 className="text-xl font-semibold text-white mt-4 mb-2">Endpoints:</h3>
                  <div className="space-y-4">
                    <Card className="bg-black border-gray-800">
                      <CardContent className="p-4">
                        <code className="text-white font-mono">POST /theory/generate</code>
                        <p className="text-gray-300 mt-1">Generate new hypotheses based on input constraints.</p>
                      </CardContent>
                    </Card>
                    <Card className="bg-black border-gray-800">
                      <CardContent className="p-4">
                        <code className="text-white font-mono">POST /theory/evaluate</code>
                        <p className="text-gray-300 mt-1">Evaluate the internal logic and coherence of a theory.</p>
                      </CardContent>
                    </Card>
                    <Card className="bg-black border-gray-800">
                      <CardContent className="p-4">
                        <code className="text-white font-mono">POST /theory/critique</code>
                        <p className="text-gray-300 mt-1">Identify contradictions and structural issues.</p>
                      </CardContent>
                    </Card>
                  </div>
                  <p className="text-gray-300 mt-4">
                    Each call returns structured objects compatible with downstream processing.
                  </p>
                  <div className="mt-6">
                    <Button asChild className="bg-white text-black hover:bg-gray-200">
                      <Link href="#core-api">Learn More →</Link>
                    </Button>
                  </div>
                </div>
              </div>

              {/* Section 4: Contextual Injection */}
              <div className="border-t border-gray-800 pt-8" id="contextual-injection">
                <h2 className="text-2xl font-bold text-white mb-4">4. Contextual Injection</h2>
                <div className="bg-black border border-gray-800 rounded-lg p-6 mb-4">
                  <blockquote className="border-l-4 border-white pl-4 italic text-gray-300">
                    Control the informational substrate that informs theory generation.
                  </blockquote>
                  <ul className="list-disc list-inside text-gray-300 mt-4 space-y-2">
                    <li>Uploading domain-specific data</li>
                    <li>Embedding prior constraints</li>
                    <li>Dynamic context switching</li>
                    <li>Handling biases and suppression patterns</li>
                  </ul>
                  <div className="mt-6">
                    <Button asChild className="bg-white text-black hover:bg-gray-200">
                      <Link href="#contextual-injection">Learn More →</Link>
                    </Button>
                  </div>
                </div>
              </div>

              {/* Section 5: Session & Memory API */}
              <div className="border-t border-gray-800 pt-8" id="session-memory">
                <h2 className="text-2xl font-bold text-white mb-4">5. Session & Memory API</h2>
                <div className="bg-black border border-gray-800 rounded-lg p-6 mb-4">
                  <blockquote className="border-l-4 border-white pl-4 italic text-gray-300">
                    Manage temporality, persistence, and theory evolution.
                  </blockquote>
                  <div className="space-y-2 mt-4">
                    <code className="text-white font-mono block">POST /session/start</code>
                    <code className="text-white font-mono block">PATCH /session/save</code>
                    <code className="text-white font-mono block">DELETE /session/wipe</code>
                  </div>
                  <p className="text-gray-300 mt-4">Attaching memory states to hypothesis chains</p>
                  <div className="mt-6">
                    <Button asChild className="bg-white text-black hover:bg-gray-200">
                      <Link href="#session-memory">Learn More →</Link>
                    </Button>
                  </div>
                </div>
              </div>

              {/* Section 6: Querying & Feedback */}
              <div className="border-t border-gray-800 pt-8" id="querying-feedback">
                <h2 className="text-2xl font-bold text-white mb-4">6. Querying & Feedback</h2>
                <div className="bg-black border border-gray-800 rounded-lg p-6 mb-4">
                  <blockquote className="border-l-4 border-white pl-4 italic text-gray-300">
                    Fetch theories, provide manual or system-level feedback, and observe updates.
                  </blockquote>
                  <div className="space-y-2 mt-4">
                    <code className="text-white font-mono block">GET /theory/:id</code>
                    <code className="text-white font-mono block">PATCH /theory/:id/feedback</code>
                  </div>
                  <ul className="list-disc list-inside text-gray-300 mt-4 space-y-2">
                    <li>Feedback types: structured, unstructured, scalar</li>
                    <li>Linking feedback to evolution cycles</li>
                  </ul>
                  <div className="mt-6">
                    <Button asChild className="bg-white text-black hover:bg-gray-200">
                      <Link href="#querying-feedback">Learn More →</Link>
                    </Button>
                  </div>
                </div>
              </div>

              {/* Section 7: Internal Protocols */}
              <div className="border-t border-gray-800 pt-8" id="internal-protocols">
                <h2 className="text-2xl font-bold text-white mb-4">7. Internal Protocols</h2>
                <div className="bg-black border border-gray-800 rounded-lg p-6 mb-4">
                  <blockquote className="border-l-4 border-white pl-4 italic text-gray-300">
                    How internal systems should communicate with Synaptiq for consistency and safety.
                  </blockquote>
                  <ul className="list-disc list-inside text-gray-300 mt-4 space-y-2">
                    <li>Standard API call conventions</li>
                    <li>Retry and failover policies</li>
                    <li>Timeouts and exponential backoff logic</li>
                  </ul>
                  <div className="mt-6">
                    <Button asChild className="bg-white text-black hover:bg-gray-200">
                      <Link href="#internal-protocols">Learn More →</Link>
                    </Button>
                  </div>
                </div>
              </div>

              {/* Section 8: System Behavior Control */}
              <div className="border-t border-gray-800 pt-8" id="system-behavior">
                <h2 className="text-2xl font-bold text-white mb-4">8. System Behavior Control</h2>
                <div className="bg-black border border-gray-800 rounded-lg p-6 mb-4">
                  <blockquote className="border-l-4 border-white pl-4 italic text-gray-300">
                    Tuning the engine's personality and risk appetite.
                  </blockquote>
                  <div className="mt-4">
                    <code className="text-white font-mono block">POST /engine/mode</code>
                    <ul className="list-disc list-inside text-gray-300 mt-2 ml-4">
                      <li>
                        Modes: <code className="text-white">exploratory</code>,{" "}
                        <code className="text-white">conservative</code>, <code className="text-white">frontier</code>
                      </li>
                    </ul>
                  </div>
                  <ul className="list-disc list-inside text-gray-300 mt-4 space-y-2">
                    <li>Adjusting randomness, depth, and time windows</li>
                    <li>Scenario-based tuning examples</li>
                  </ul>
                  <div className="mt-6">
                    <Button asChild className="bg-white text-black hover:bg-gray-200">
                      <Link href="#system-behavior">Learn More →</Link>
                    </Button>
                  </div>
                </div>
              </div>

              {/* Section 9: Monitoring & Logs */}
              <div className="border-t border-gray-800 pt-8" id="monitoring-logs">
                <h2 className="text-2xl font-bold text-white mb-4">9. Monitoring & Logs</h2>
                <div className="bg-black border border-gray-800 rounded-lg p-6 mb-4">
                  <blockquote className="border-l-4 border-white pl-4 italic text-gray-300">
                    Track Synaptiq's behavior over time.
                  </blockquote>
                  <ul className="list-disc list-inside text-gray-300 mt-4 space-y-2">
                    <li>Request logs with theory IDs</li>
                    <li>Trace maps of hypothesis progression</li>
                    <li>Internal scoring and anomaly flags</li>
                  </ul>
                  <div className="mt-6">
                    <Button asChild className="bg-white text-black hover:bg-gray-200">
                      <Link href="#monitoring-logs">Learn More →</Link>
                    </Button>
                  </div>
                </div>
              </div>

              {/* Section 10: Failure Modes & Recovery */}
              <div className="border-t border-gray-800 pt-8" id="failure-modes">
                <h2 className="text-2xl font-bold text-white mb-4">10. Failure Modes & Recovery</h2>
                <div className="bg-black border border-gray-800 rounded-lg p-6 mb-4">
                  <blockquote className="border-l-4 border-white pl-4 italic text-gray-300">
                    Handling breakdowns, contradictions, and runaway loops.
                  </blockquote>
                  <ul className="list-disc list-inside text-gray-300 mt-4 space-y-2">
                    <li>Engine error codes</li>
                    <li>Loop detection and auto-quarantine</li>
                    <li>Fallback protocols</li>
                  </ul>
                  <div className="mt-6">
                    <Button asChild className="bg-white text-black hover:bg-gray-200">
                      <Link href="#failure-modes">Learn More →</Link>
                    </Button>
                  </div>
                </div>
              </div>

              {/* Section 11: Security & Containment */}
              <div className="border-t border-gray-800 pt-8" id="security-containment">
                <h2 className="text-2xl font-bold text-white mb-4">11. Security & Containment</h2>
                <div className="bg-black border border-gray-800 rounded-lg p-6 mb-4">
                  <blockquote className="border-l-4 border-white pl-4 italic text-gray-300">
                    Guarding against misuse and epistemic leakage.
                  </blockquote>
                  <ul className="list-disc list-inside text-gray-300 mt-4 space-y-2">
                    <li>Isolation of engine threads</li>
                    <li>Redaction filters on sensitive outputs</li>
                    <li>Usage audits</li>
                  </ul>
                  <div className="mt-6">
                    <Button asChild className="bg-white text-black hover:bg-gray-200">
                      <Link href="#security-containment">Learn More →</Link>
                    </Button>
                  </div>
                </div>
              </div>

              {/* Section 12: Change Log & Experimental Modes */}
              <div className="border-t border-gray-800 pt-8" id="changelog">
                <h2 className="text-2xl font-bold text-white mb-4">12. Change Log & Experimental Modes</h2>
                <div className="bg-black border border-gray-800 rounded-lg p-6 mb-4">
                  <blockquote className="border-l-4 border-white pl-4 italic text-gray-300">
                    Understand what's changing and what's being tested.
                  </blockquote>
                  <ul className="list-disc list-inside text-gray-300 mt-4 space-y-2">
                    <li>Engine updates and changelog entries</li>
                    <li>Beta features and opt-in flags</li>
                    <li>Internal testing APIs</li>
                  </ul>
                  <div className="mt-6">
                    <Button asChild className="bg-white text-black hover:bg-gray-200">
                      <Link href="#changelog">Learn More →</Link>
                    </Button>
                  </div>
                </div>
              </div>

              {/* Section 13: Human Oversight Tools */}
              <div className="border-t border-gray-800 pt-8" id="human-oversight">
                <h2 className="text-2xl font-bold text-white mb-4">13. Human Oversight Tools</h2>
                <div className="bg-black border border-gray-800 rounded-lg p-6 mb-4">
                  <blockquote className="border-l-4 border-white pl-4 italic text-gray-300">
                    Mechanisms for human experts to interact with or supervise Synaptiq's outputs.
                  </blockquote>
                  <ul className="list-disc list-inside text-gray-300 mt-4 space-y-2">
                    <li>Review workflows for high-priority theories</li>
                    <li>Theory approval queue</li>
                    <li>Feedback injection via expert review</li>
                  </ul>
                  <div className="mt-6">
                    <Button asChild className="bg-white text-black hover:bg-gray-200">
                      <Link href="#human-oversight">Learn More →</Link>
                    </Button>
                  </div>
                </div>
              </div>

              {/* Section 14: Glossary & Schemas */}
              <div className="border-t border-gray-800 pt-8" id="glossary-schemas">
                <h2 className="text-2xl font-bold text-white mb-4">14. Glossary & Schemas</h2>
                <div className="bg-black border border-gray-800 rounded-lg p-6 mb-4">
                  <blockquote className="border-l-4 border-white pl-4 italic text-gray-300">
                    Definitions for internal terminology and standard API schemas.
                  </blockquote>
                  <ul className="list-disc list-inside text-gray-300 mt-4 space-y-2">
                    <li>Key conceptual terms</li>
                    <li>JSON schema definitions</li>
                    <li>Data contract registry</li>
                  </ul>
                  <div className="mt-6">
                    <Button asChild className="bg-white text-black hover:bg-gray-200">
                      <Link href="#glossary-schemas">Learn More →</Link>
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Meta Note */}
        <section className="w-full py-8 md:py-12 bg-black border-t border-gray-900">
          <div className="container px-4 md:px-6">
            <div className="bg-black border border-gray-800 rounded-lg p-6">
              <h3 className="text-xl font-bold text-white mb-4">Meta Note:</h3>
              <p className="text-gray-300">
                This documentation is dynamically versioned alongside the deployed system. All endpoints are internal,
                authenticated, and strictly scoped. Updates to any behavioral logic or API contract should include
                parallel updates to this document.
              </p>
            </div>
          </div>
        </section>
      </main>
      <SiteFooter />
    </div>
  )
}
