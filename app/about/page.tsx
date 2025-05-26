import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"

export default function AboutPage() {
  return (
    <div className="container mx-auto px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16 py-8 sm:py-12 lg:py-16 xl:py-20 max-w-7xl">
      <div className="space-y-8 sm:space-y-12 lg:space-y-16 xl:space-y-20">
        {/* Hero Section */}
        <section className="text-center space-y-4 sm:space-y-6 lg:space-y-8">
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl 2xl:text-8xl font-bold text-white leading-tight max-w-5xl mx-auto">
            About Synaptiq
          </h1>
          <p className="text-lg sm:text-xl lg:text-2xl xl:text-3xl text-white max-w-4xl mx-auto leading-relaxed px-4">
            Pioneering the frontier of scientific computing through quantum-enhanced artificial intelligence
          </p>
          <div className="flex justify-center gap-4 lg:gap-6 flex-wrap pt-4 lg:pt-8">
            <Button
              className="bg-gray-800 text-white hover:bg-gray-700 min-h-[44px] lg:min-h-[52px] xl:min-h-[56px] px-6 lg:px-8 xl:px-10 text-base lg:text-lg xl:text-xl font-semibold transition-all duration-300 hover:scale-105"
              size="lg"
              asChild
            >
              <Link href="/beta">Join Our Beta</Link>
            </Button>
            <Button
              variant="outline"
              size="lg"
              className="min-h-[44px] lg:min-h-[52px] xl:min-h-[56px] px-6 lg:px-8 xl:px-10 text-base lg:text-lg xl:text-xl font-semibold transition-all duration-300 hover:scale-105"
              asChild
            >
              <Link href="/docs">Explore Documentation</Link>
            </Button>
          </div>
        </section>

        {/* Our Mission */}
        <section className="grid grid-cols-1 xl:grid-cols-2 gap-8 lg:gap-12 xl:gap-16 2xl:gap-20 items-center">
          <div className="space-y-4 sm:space-y-6 lg:space-y-8 order-2 xl:order-1">
            <h2 className="text-2xl sm:text-3xl lg:text-4xl xl:text-5xl font-bold text-white">Our Mission</h2>
            <div className="space-y-4 lg:space-y-6">
              <p className="text-gray-300 text-sm sm:text-base lg:text-lg xl:text-xl leading-relaxed">
                At Synaptiq, our mission transcends conventional boundaries of scientific computing. We are dedicated to
                democratizing access to advanced quantum-enhanced artificial intelligence, empowering researchers,
                scientists, and innovators across disciplines to solve humanity's most pressing challenges. Our platform
                represents the convergence of quantum mechanics, neural networks, and scientific methodology—a synergy
                that unlocks unprecedented computational capabilities for scientific discovery.
              </p>
              <p className="text-gray-300 text-sm sm:text-base lg:text-lg xl:text-xl leading-relaxed">
                Founded in 2021 by a consortium of quantum physicists, AI researchers, and computational scientists,
                Synaptiq emerged from a shared vision: to create a computational environment where the most complex
                scientific problems become tractable through quantum-enhanced intelligence. We recognized that while
                quantum computing and artificial intelligence were advancing rapidly as separate fields, their
                integration remained largely theoretical. Synaptiq was born to bridge this gap, creating practical
                applications that harness the power of both paradigms.
              </p>
              <p className="text-gray-300 text-sm sm:text-base lg:text-lg xl:text-xl leading-relaxed">
                Our core philosophy centers on three fundamental principles: scientific rigor, computational innovation,
                and accessible design. We believe that advanced scientific tools should maintain the highest standards
                of accuracy while pushing the boundaries of what's computationally possible—all within an interface that
                researchers across disciplines can readily utilize. This balance of depth and accessibility defines the
                Synaptiq approach to scientific computing.
              </p>
            </div>
          </div>
          <div className="relative h-[250px] sm:h-[300px] lg:h-[400px] xl:h-[500px] 2xl:h-[600px] rounded-xl overflow-hidden shadow-xl order-1 xl:order-2">
            <Image
              src="/cosmic-flow.png"
              alt="Quantum neural network visualization"
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 40vw"
            />
          </div>
        </section>

        {/* Technology Platform */}
        <section className="space-y-6 sm:space-y-8 lg:space-y-12">
          <h2 className="text-2xl sm:text-3xl lg:text-4xl xl:text-5xl font-bold text-white text-center xl:text-left">
            Our Technology Platform
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4 sm:gap-6 lg:gap-8 xl:gap-10">
            <Card className="bg-gray-900 border-gray-800 hover:shadow-lg transition-all duration-300 hover:scale-105">
              <CardContent className="p-4 sm:p-6 lg:p-8 space-y-4 lg:space-y-6">
                <div className="h-10 w-10 sm:h-12 sm:w-12 lg:h-14 lg:w-14 xl:h-16 xl:w-16 rounded-lg bg-gray-800 flex items-center justify-center">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="text-white sm:w-6 sm:h-6 lg:w-8 lg:h-8 xl:w-10 xl:h-10"
                  >
                    <path d="M12 2a4 4 0 0 0-4 4v12a4 4 0 0 0 8 0V6a4 4 0 0 0-4-4z"></path>
                    <path d="M16 8a4 4 0 0 0-8 0v8a4 4 0 0 0 8 0V8z"></path>
                    <line x1="2" y1="12" x2="22" y2="12"></line>
                  </svg>
                </div>
                <h3 className="text-lg sm:text-xl lg:text-2xl xl:text-3xl font-semibold text-white">
                  Quantum Neural Networks
                </h3>
                <p className="text-gray-400 text-sm sm:text-base lg:text-lg xl:text-xl leading-relaxed">
                  Our proprietary quantum neural network architecture combines quantum circuit design with neural
                  network principles, enabling computations that leverage quantum superposition and entanglement while
                  maintaining the learning capabilities of neural systems.
                </p>
              </CardContent>
            </Card>
            <Card className="bg-gray-900 border-gray-800 hover:shadow-lg transition-all duration-300 hover:scale-105">
              <CardContent className="p-4 sm:p-6 lg:p-8 space-y-4 lg:space-y-6">
                <div className="h-10 w-10 sm:h-12 sm:w-12 lg:h-14 lg:w-14 xl:h-16 xl:w-16 rounded-lg bg-gray-800 flex items-center justify-center">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="text-white sm:w-6 sm:h-6 lg:w-8 lg:h-8 xl:w-10 xl:h-10"
                  >
                    <circle cx="12" cy="12" r="10"></circle>
                    <line x1="2" y1="12" x2="22" y2="12"></line>
                    <line x1="12" y1="2" x2="12" y2="22"></line>
                  </svg>
                </div>
                <h3 className="text-lg sm:text-xl lg:text-2xl xl:text-3xl font-semibold text-white">
                  Scientific Simulation Engine
                </h3>
                <p className="text-gray-400 text-sm sm:text-base lg:text-lg xl:text-xl leading-relaxed">
                  Our simulation engine provides high-fidelity modeling of complex physical systems, from quantum
                  mechanics to astrophysics, with unprecedented accuracy and computational efficiency through our hybrid
                  classical-quantum approach.
                </p>
              </CardContent>
            </Card>
            <Card className="bg-gray-900 border-gray-800 md:col-span-2 xl:col-span-1 hover:shadow-lg transition-all duration-300 hover:scale-105">
              <CardContent className="p-4 sm:p-6 lg:p-8 space-y-4 lg:space-y-6">
                <div className="h-10 w-10 sm:h-12 sm:w-12 lg:h-14 lg:w-14 xl:h-16 xl:w-16 rounded-lg bg-gray-800 flex items-center justify-center">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="text-white sm:w-6 sm:h-6 lg:w-8 lg:h-8 xl:w-10 xl:h-10"
                  >
                    <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
                  </svg>
                </div>
                <h3 className="text-lg sm:text-xl lg:text-2xl xl:text-3xl font-semibold text-white">
                  Scientific Language Model
                </h3>
                <p className="text-gray-400 text-sm sm:text-base lg:text-lg xl:text-xl leading-relaxed">
                  Our specialized language model is trained on scientific literature, mathematical formulations, and
                  domain-specific knowledge, enabling natural language interactions with deep scientific understanding
                  and mathematical reasoning.
                </p>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* The Science Behind Synaptiq */}
        <section className="space-y-6 sm:space-y-8 lg:space-y-12">
          <h2 className="text-2xl sm:text-3xl lg:text-4xl xl:text-5xl font-bold text-white text-center xl:text-left">
            The Science Behind Synaptiq
          </h2>
          <div className="space-y-4 sm:space-y-6 lg:space-y-8">
            <p className="text-gray-300 text-sm sm:text-base lg:text-lg xl:text-xl leading-relaxed">
              The scientific foundation of Synaptiq rests at the intersection of quantum mechanics, artificial
              intelligence, and computational science. Our platform leverages the principles of quantum superposition
              and entanglement to perform computations that would be intractable for classical systems. By encoding
              information in quantum states and manipulating these states through carefully designed quantum circuits,
              we can explore solution spaces exponentially faster than conventional approaches.
            </p>
            <p className="text-gray-300 text-sm sm:text-base lg:text-lg xl:text-xl leading-relaxed">
              At the core of our technology is a novel quantum-classical hybrid architecture that combines the strengths
              of quantum processing with classical neural networks. This approach allows us to harness quantum
              advantages where they provide computational benefits while utilizing classical methods for tasks where
              they excel. The result is a computational framework that transcends the limitations of either paradigm
              alone.
            </p>
          </div>
          <div className="grid grid-cols-1 xl:grid-cols-2 gap-6 sm:gap-8 lg:gap-12 xl:gap-16 mt-6 sm:mt-8 lg:mt-12">
            <div className="bg-gray-900 border border-gray-800 rounded-lg p-4 sm:p-6 lg:p-8 xl:p-10 hover:shadow-lg transition-all duration-300">
              <h3 className="text-lg sm:text-xl lg:text-2xl xl:text-3xl font-semibold text-white mb-3 sm:mb-4 lg:mb-6">
                Quantum Simulation Capabilities
              </h3>
              <ul className="space-y-2 sm:space-y-3 lg:space-y-4 text-gray-300">
                <li className="flex items-start">
                  <svg
                    className="h-5 w-5 sm:h-6 sm:w-6 lg:h-7 lg:w-7 text-white mr-2 lg:mr-3 flex-shrink-0 mt-0.5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span className="text-sm sm:text-base lg:text-lg xl:text-xl">
                    <strong className="text-white">Quantum Many-Body Systems:</strong> Simulate complex quantum systems
                    with many interacting particles, exploring phenomena like superconductivity and quantum phase
                    transitions.
                  </span>
                </li>
                <li className="flex items-start">
                  <svg
                    className="h-5 w-5 sm:h-6 sm:w-6 lg:h-7 lg:w-7 text-white mr-2 lg:mr-3 flex-shrink-0 mt-0.5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span className="text-sm sm:text-base lg:text-lg xl:text-xl">
                    <strong className="text-white">Molecular Dynamics:</strong> Model molecular structures and
                    interactions with quantum accuracy, accelerating drug discovery and materials science research.
                  </span>
                </li>
              </ul>
            </div>
            <div className="bg-gray-900 border border-gray-800 rounded-lg p-4 sm:p-6 lg:p-8 xl:p-10 hover:shadow-lg transition-all duration-300">
              <h3 className="text-lg sm:text-xl lg:text-2xl xl:text-3xl font-semibold text-white mb-3 sm:mb-4 lg:mb-6">
                Mathematical Foundations
              </h3>
              <ul className="space-y-2 sm:space-y-3 lg:space-y-4 text-gray-300">
                <li className="flex items-start">
                  <svg
                    className="h-5 w-5 sm:h-6 sm:w-6 lg:h-7 lg:w-7 text-white mr-2 lg:mr-3 flex-shrink-0 mt-0.5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span className="text-sm sm:text-base lg:text-lg xl:text-xl">
                    <strong className="text-white">Tensor Networks:</strong> Efficient representations of quantum states
                    and operations, enabling simulation of systems with large Hilbert spaces.
                  </span>
                </li>
                <li className="flex items-start">
                  <svg
                    className="h-5 w-5 sm:h-6 sm:w-6 lg:h-7 lg:w-7 text-white mr-2 lg:mr-3 flex-shrink-0 mt-0.5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span className="text-sm sm:text-base lg:text-lg xl:text-xl">
                    <strong className="text-white">Information Theory:</strong> Quantification of quantum entanglement,
                    coherence, and information processing capabilities in quantum systems.
                  </span>
                </li>
              </ul>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="bg-gray-900 border border-gray-800 rounded-xl p-6 sm:p-8 lg:p-12 xl:p-16 text-center">
          <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-bold text-white mb-3 sm:mb-4 lg:mb-6 leading-tight">
            Join the Quantum Revolution in Scientific Computing
          </h2>
          <p className="text-lg sm:text-xl lg:text-2xl xl:text-3xl text-gray-300 mb-4 sm:mb-6 lg:mb-8 max-w-4xl mx-auto leading-relaxed">
            Experience the power of quantum-enhanced AI for your scientific research and discovery
          </p>
          <div className="flex flex-col sm:flex-row flex-wrap justify-center gap-3 sm:gap-4 lg:gap-6">
            <Button
              className="bg-gray-800 text-white hover:bg-gray-700 min-h-[44px] lg:min-h-[52px] xl:min-h-[56px] px-6 lg:px-8 xl:px-10 text-base lg:text-lg xl:text-xl font-semibold transition-all duration-300 hover:scale-105"
              size="lg"
              asChild
            >
              <Link href="/beta">Apply for Beta Access</Link>
            </Button>
            <Button
              variant="outline"
              size="lg"
              className="min-h-[44px] lg:min-h-[52px] xl:min-h-[56px] px-6 lg:px-8 xl:px-10 text-base lg:text-lg xl:text-xl font-semibold transition-all duration-300 hover:scale-105"
              asChild
            >
              <Link href="/contact">Contact Our Team</Link>
            </Button>
          </div>
        </section>
      </div>
    </div>
  )
}
