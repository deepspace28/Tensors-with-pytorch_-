import Link from "next/link"
import { ArrowRight, Check, Braces, FlaskRoundIcon as Flask, Zap } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function QuantumSimulationsPage() {
  return (
    <div className="min-h-screen bg-black text-white">
      {/* Hero Section */}
      <section className="relative py-20 overflow-hidden border-b border-gray-800">
        <div className="absolute inset-0 bg-[url('/cosmic-flow.png')] bg-cover bg-center opacity-20"></div>
        <div className="container mx-auto px-4 relative z-10 max-w-4xl">
          <div className="flex flex-col items-center text-center">
            {/* Custom Quantum Logo */}
            <div className="w-20 h-20 mb-6">
              <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
                <circle cx="50" cy="50" r="45" stroke="white" strokeWidth="2" />
                <circle cx="50" cy="50" r="30" stroke="white" strokeWidth="2" />
                <circle cx="50" cy="50" r="15" stroke="white" strokeWidth="2" />
                <circle cx="50" cy="20" r="5" fill="white" />
                <circle cx="50" cy="80" r="5" fill="white" />
                <circle cx="20" cy="50" r="5" fill="white" />
                <circle cx="80" cy="50" r="5" fill="white" />
                <path d="M50 20 L50 80" stroke="white" strokeWidth="1" strokeDasharray="4 4" />
                <path d="M20 50 L80 50" stroke="white" strokeWidth="1" strokeDasharray="4 4" />
              </svg>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold mb-6">Quantum Simulations</h1>
            <p className="text-xl text-gray-300 mb-8 max-w-3xl">
              Harness the power of quantum computing simulations to solve complex problems in physics, chemistry, and
              materials science with unprecedented accuracy.
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              <Button size="lg" className="bg-white text-black hover:bg-gray-200" asChild>
                <Link href="/beta">Join the Beta</Link>
              </Button>
              <Button size="lg" variant="outline" className="border-gray-700 text-white hover:bg-gray-800" asChild>
                <Link href="/demo/quantum">
                  Try Demo <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Rest of the content remains the same */}
      {/* Introduction */}
      <section className="py-20 container mx-auto px-4 max-w-4xl">
        <h2 className="text-3xl font-bold mb-8">Revolutionizing Scientific Research Through Quantum Computing</h2>

        <div className="prose prose-lg prose-invert max-w-none">
          <p className="text-gray-300">
            Synaptiq's Quantum Simulations platform represents a paradigm shift in scientific computing, offering
            researchers, academics, and industry professionals access to state-of-the-art quantum simulation
            capabilities without the need for specialized hardware or extensive quantum computing expertise. Our
            platform bridges the gap between theoretical quantum mechanics and practical applications, enabling
            breakthrough discoveries in fields ranging from materials science and drug discovery to optimization
            problems and cryptography.
          </p>

          <p className="text-gray-300">
            Quantum computing leverages the principles of quantum mechanics—superposition, entanglement, and quantum
            interference—to perform computations that would be practically impossible for classical computers. While
            fully-realized quantum computers are still in development, quantum simulations provide a powerful approach
            to harness quantum mechanical effects for solving complex scientific problems today. Synaptiq's platform
            utilizes advanced algorithms and computational techniques to simulate quantum systems with high fidelity,
            allowing researchers to explore quantum phenomena and develop applications that will be ready for deployment
            on quantum hardware as it becomes available.
          </p>

          <p className="text-gray-300">
            The potential of quantum simulations extends far beyond academic interest. In chemistry, quantum simulations
            can model molecular structures and reactions with unprecedented accuracy, potentially revolutionizing drug
            discovery and materials design. In physics, they enable the study of complex quantum systems that are
            otherwise inaccessible to experimental investigation. In optimization, quantum-inspired algorithms can find
            solutions to complex problems that classical methods struggle with. Synaptiq's platform makes these
            capabilities accessible through an intuitive interface, powerful visualization tools, and comprehensive
            documentation, democratizing access to quantum computing's transformative potential.
          </p>

          <p className="text-gray-300">
            What sets Synaptiq apart is our commitment to scientific rigor and practical usability. Our platform has
            been developed in collaboration with leading researchers in quantum physics, computer science, and various
            application domains to ensure both theoretical soundness and practical utility. Every simulation is backed
            by rigorous validation against experimental data and theoretical benchmarks, providing users with confidence
            in the results. At the same time, our user-friendly interface and extensive documentation make quantum
            simulations accessible to researchers without specialized quantum computing knowledge, expanding the
            community of scientists who can benefit from these powerful techniques.
          </p>

          <p className="text-gray-300">
            As quantum computing continues to advance, Synaptiq remains at the forefront of innovation, continuously
            expanding our platform's capabilities and applications. By joining our beta program, you become part of this
            exciting journey, gaining early access to cutting-edge features and contributing to the development of a
            tool that is reshaping scientific research. Whether you're exploring fundamental quantum phenomena,
            developing new materials, optimizing complex systems, or preparing for the quantum computing revolution,
            Synaptiq's Quantum Simulations platform provides the tools and support you need to succeed.
          </p>
        </div>
      </section>

      {/* Core Capabilities */}
      <section className="py-20 bg-gray-950 border-y border-gray-800">
        <div className="container mx-auto px-4 max-w-4xl">
          <h2 className="text-3xl font-bold mb-12 text-center">Core Capabilities</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
            <div className="bg-black p-6 rounded-lg border border-gray-800">
              <div className="flex items-center mb-4">
                <Flask className="h-8 w-8 text-white mr-3" />
                <h3 className="text-xl font-semibold">Quantum Circuit Simulation</h3>
              </div>
              <p className="text-gray-300 mb-4">
                Simulate quantum circuits with up to 30 qubits, supporting various gate operations and measurement
                protocols. Our advanced simulation engine provides high-fidelity results for complex quantum algorithms
                and protocols.
              </p>
              <ul className="space-y-2">
                <FeatureItem>Custom gate definitions and circuit design</FeatureItem>
                <FeatureItem>Error modeling and noise simulation</FeatureItem>
                <FeatureItem>Circuit optimization algorithms</FeatureItem>
                <FeatureItem>Interactive visualization of quantum states</FeatureItem>
              </ul>
            </div>

            <div className="bg-black p-6 rounded-lg border border-gray-800">
              <div className="flex items-center mb-4">
                <Flask className="h-8 w-8 text-white mr-3" />
                <h3 className="text-xl font-semibold">Quantum Chemistry</h3>
              </div>
              <p className="text-gray-300 mb-4">
                Model molecular structures and chemical reactions using quantum mechanical principles. Our platform
                enables accurate simulation of electronic structures and molecular dynamics without the approximations
                required by classical methods.
              </p>
              <ul className="space-y-2">
                <FeatureItem>Electronic structure calculations</FeatureItem>
                <FeatureItem>Molecular dynamics simulations</FeatureItem>
                <FeatureItem>Reaction pathway analysis</FeatureItem>
                <FeatureItem>Drug-target interaction modeling</FeatureItem>
              </ul>
            </div>

            <div className="bg-black p-6 rounded-lg border border-gray-800">
              <div className="flex items-center mb-4">
                <Braces className="h-8 w-8 text-white mr-3" />
                <h3 className="text-xl font-semibold">Quantum Machine Learning</h3>
              </div>
              <p className="text-gray-300 mb-4">
                Leverage quantum algorithms to enhance machine learning models and data analysis. Our quantum machine
                learning tools enable pattern recognition and data processing capabilities beyond classical approaches.
              </p>
              <ul className="space-y-2">
                <FeatureItem>Quantum neural networks</FeatureItem>
                <FeatureItem>Quantum support vector machines</FeatureItem>
                <FeatureItem>Quantum feature mapping</FeatureItem>
                <FeatureItem>Quantum-enhanced data classification</FeatureItem>
              </ul>
            </div>

            <div className="bg-black p-6 rounded-lg border border-gray-800">
              <div className="flex items-center mb-4">
                <Zap className="h-8 w-8 text-white mr-3" />
                <h3 className="text-xl font-semibold">Quantum Algorithms</h3>
              </div>
              <p className="text-gray-300 mb-4">
                Implement and customize quantum algorithms for specific scientific applications. Our library includes
                both established quantum algorithms and cutting-edge research implementations.
              </p>
              <ul className="space-y-2">
                <FeatureItem>Shor's and Grover's algorithms</FeatureItem>
                <FeatureItem>Quantum Fourier Transform</FeatureItem>
                <FeatureItem>Variational quantum eigensolvers</FeatureItem>
                <FeatureItem>Quantum approximate optimization</FeatureItem>
              </ul>
            </div>
          </div>

          <div className="prose prose-lg prose-invert max-w-none">
            <p className="text-gray-300">
              These core capabilities form the foundation of Synaptiq's Quantum Simulations platform, but they represent
              only the beginning of what's possible. Our platform is continuously evolving, with new features and
              capabilities added regularly based on the latest research and user feedback. By joining our beta program,
              you'll gain early access to these innovations and have the opportunity to shape the future of quantum
              simulation technology.
            </p>

            <p className="text-gray-300">
              Beyond the technical capabilities, Synaptiq provides comprehensive documentation, tutorials, and support
              to help you make the most of these powerful tools. Whether you're a quantum computing expert or new to the
              field, our platform is designed to meet you where you are and help you achieve your research goals.
            </p>
          </div>
        </div>
      </section>

      {/* Applications */}
      <section className="py-20 container mx-auto px-4 max-w-4xl">
        <h2 className="text-3xl font-bold mb-12 text-center">Real-World Applications</h2>

        <div className="space-y-12 mb-16">
          <div className="bg-black p-8 rounded-lg border border-gray-800">
            <h3 className="text-2xl font-semibold mb-4">Material Science Research</h3>
            <p className="text-gray-300 mb-6">
              Quantum simulations enable researchers to predict properties of new materials without expensive physical
              experiments, accelerating the discovery of materials with specific desired characteristics. This has
              profound implications for developing new semiconductors, superconductors, catalysts, and structural
              materials.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-gray-900 p-4 rounded-lg">
                <h4 className="font-medium mb-2 text-white">Challenge</h4>
                <p className="text-sm text-gray-300">
                  Predicting superconductivity properties requires complex quantum mechanical calculations that are
                  intractable for classical computers, leading to a slow, trial-and-error approach to materials
                  discovery.
                </p>
              </div>
              <div className="bg-gray-900 p-4 rounded-lg">
                <h4 className="font-medium mb-2 text-white">Solution</h4>
                <p className="text-sm text-gray-300">
                  Synaptiq's quantum simulations can model electron interactions in potential superconducting materials
                  with high accuracy, allowing researchers to screen thousands of candidate materials virtually before
                  experimental verification.
                </p>
              </div>
            </div>
          </div>

          <div className="bg-black p-8 rounded-lg border border-gray-800">
            <h3 className="text-2xl font-semibold mb-4">Pharmaceutical Research & Drug Discovery</h3>
            <p className="text-gray-300 mb-6">
              The drug discovery process is notoriously time-consuming and expensive, with high failure rates in
              clinical trials. Quantum simulations can revolutionize this process by accurately modeling molecular
              interactions and predicting drug efficacy and side effects before synthesis and testing.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-gray-900 p-4 rounded-lg">
                <h4 className="font-medium mb-2 text-white">Challenge</h4>
                <p className="text-sm text-gray-300">
                  Accurately modeling protein-drug interactions requires quantum mechanical precision that exceeds the
                  capabilities of classical computational chemistry methods, leading to unexpected clinical trial
                  failures.
                </p>
              </div>
              <div className="bg-gray-900 p-4 rounded-lg">
                <h4 className="font-medium mb-2 text-white">Solution</h4>
                <p className="text-sm text-gray-300">
                  Synaptiq's platform enables precise simulation of drug-target interactions at the quantum level,
                  allowing pharmaceutical researchers to identify promising candidates and potential issues earlier in
                  the development pipeline.
                </p>
              </div>
            </div>
          </div>

          <div className="bg-black p-8 rounded-lg border border-gray-800">
            <h3 className="text-2xl font-semibold mb-4">Optimization Problems in Industry</h3>
            <p className="text-gray-300 mb-6">
              Many industrial processes involve complex optimization problems that classical algorithms struggle to
              solve efficiently. Quantum-inspired optimization algorithms can find better solutions faster, leading to
              significant improvements in efficiency, cost reduction, and resource allocation.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-gray-900 p-4 rounded-lg">
                <h4 className="font-medium mb-2 text-white">Challenge</h4>
                <p className="text-sm text-gray-300">
                  Optimizing logistics networks, manufacturing processes, or financial portfolios involves navigating
                  vast solution spaces with numerous constraints, often forcing companies to settle for suboptimal
                  solutions.
                </p>
              </div>
              <div className="bg-gray-900 p-4 rounded-lg">
                <h4 className="font-medium mb-2 text-white">Solution</h4>
                <p className="text-sm text-gray-300">
                  Synaptiq's quantum optimization algorithms can explore solution spaces more efficiently, identifying
                  optimal or near-optimal solutions that translate to tangible business advantages and competitive edge.
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="prose prose-lg prose-invert max-w-none">
          <p className="text-gray-300">
            These examples represent just a fraction of the potential applications for quantum simulations. As our
            understanding of quantum computing advances and our platform evolves, new applications continue to emerge
            across diverse fields including finance, cryptography, artificial intelligence, climate modeling, and
            fundamental physics research.
          </p>

          <p className="text-gray-300">
            What makes Synaptiq's approach unique is our focus on practical, accessible implementations that deliver
            value today while preparing for the quantum computing future. Our platform bridges the gap between
            theoretical quantum advantage and practical application, allowing researchers and organizations to begin
            their quantum journey now, developing expertise and applications that will seamlessly transition to quantum
            hardware as it matures.
          </p>
        </div>
      </section>

      {/* Technical Details */}
      <section className="py-20 bg-gray-950 border-y border-gray-800">
        <div className="container mx-auto px-4 max-w-4xl">
          <h2 className="text-3xl font-bold mb-12 text-center">Technical Approach</h2>

          <div className="prose prose-lg prose-invert max-w-none mb-16">
            <p className="text-gray-300">
              Synaptiq's Quantum Simulations platform is built on a foundation of cutting-edge research in quantum
              computing, high-performance computing, and domain-specific scientific knowledge. Our technical approach
              combines several key innovations to deliver quantum simulation capabilities that are both powerful and
              accessible.
            </p>

            <h3 className="text-2xl font-semibold mt-8 mb-4">Hybrid Classical-Quantum Architecture</h3>
            <p className="text-gray-300">
              Rather than waiting for fully-realized quantum computers, our platform employs a hybrid approach that
              combines classical computing resources with quantum simulation techniques. This allows us to tackle
              problems that would be intractable for purely classical methods while remaining practical for
              implementation on current hardware. Our architecture is designed to scale seamlessly as quantum hardware
              becomes more capable, ensuring that investments in our platform today will continue to pay dividends in
              the quantum future.
            </p>

            <h3 className="text-2xl font-semibold mt-8 mb-4">Advanced Simulation Algorithms</h3>
            <p className="text-gray-300">
              At the core of our platform are proprietary simulation algorithms that push the boundaries of what's
              possible in quantum simulation. These algorithms incorporate techniques from tensor networks, quantum
              Monte Carlo methods, and density functional theory, optimized for performance on modern high-performance
              computing infrastructure. For certain problem classes, we've achieved simulation capabilities that exceed
              conventional approaches by orders of magnitude in both accuracy and computational efficiency.
            </p>

            <h3 className="text-2xl font-semibold mt-8 mb-4">Domain-Specific Optimizations</h3>
            <p className="text-gray-300">
              Recognizing that different scientific domains have unique requirements and challenges, we've developed
              domain-specific optimizations for key application areas such as materials science, quantum chemistry, and
              optimization problems. These optimizations incorporate domain knowledge directly into the simulation
              algorithms, enabling more efficient and accurate simulations for specific problem types. This approach
              allows us to deliver performance that would be impossible with generic quantum simulation methods.
            </p>

            <h3 className="text-2xl font-semibold mt-8 mb-4">Scalable Cloud Infrastructure</h3>
            <p className="text-gray-300">
              Synaptiq's platform is built on a scalable cloud infrastructure that automatically allocates computational
              resources based on the complexity of the simulation task. This ensures that users have access to the
              computational power they need without requiring expertise in high-performance computing or infrastructure
              management. Our infrastructure incorporates the latest advances in GPU acceleration, distributed
              computing, and memory optimization to deliver maximum performance for quantum simulation workloads.
            </p>

            <h3 className="text-2xl font-semibold mt-8 mb-4">Comprehensive Validation Framework</h3>
            <p className="text-gray-300">
              Scientific integrity is at the heart of our approach. Every simulation capability undergoes rigorous
              validation against experimental data, theoretical benchmarks, and alternative computational methods. Our
              validation framework ensures that users can trust the results of their simulations and understand the
              limitations and uncertainties associated with different approaches. This commitment to validation
              distinguishes Synaptiq from platforms that prioritize speed or features over scientific accuracy.
            </p>
          </div>
        </div>
      </section>

      {/* Getting Started */}
      <section className="py-20 container mx-auto px-4 max-w-4xl">
        <h2 className="text-3xl font-bold mb-12 text-center">Getting Started with Quantum Simulations</h2>

        <div className="prose prose-lg prose-invert max-w-none mb-16">
          <p className="text-gray-300">
            Embarking on your quantum simulation journey with Synaptiq is straightforward, regardless of your prior
            experience with quantum computing. Our platform is designed to be accessible to researchers across
            disciplines while providing the depth and flexibility needed for advanced applications.
          </p>

          <h3 className="text-2xl font-semibold mt-8 mb-4">For Quantum Computing Novices</h3>
          <p className="text-gray-300">
            If you're new to quantum computing, our platform provides a gentle introduction through guided tutorials,
            interactive examples, and comprehensive documentation. You don't need to understand the intricacies of
            quantum mechanics or quantum circuit design to benefit from our platform. Our domain-specific interfaces
            allow you to describe your problem in familiar terms, and our system handles the translation to quantum
            simulation automatically. As your understanding grows, you can progressively engage with more advanced
            features and customizations.
          </p>

          <h3 className="text-2xl font-semibold mt-8 mb-4">For Quantum Computing Experts</h3>
          <p className="text-gray-300">
            For those with quantum computing expertise, our platform offers unparalleled flexibility and control. You
            can design custom quantum circuits, implement novel quantum algorithms, and fine-tune simulation parameters
            to meet your specific requirements. Our API provides programmatic access to all platform capabilities,
            enabling integration with your existing workflows and tools. Advanced visualization and analysis tools help
            you gain insights from complex quantum simulations and communicate your findings effectively.
          </p>

          <h3 className="text-2xl font-semibold mt-8 mb-4">Integration with Existing Workflows</h3>
          <p className="text-gray-300">
            Synaptiq's platform is designed to integrate seamlessly with your existing research workflows. We provide
            connectors for popular scientific computing environments like Python, MATLAB, and Jupyter, as well as
            domain-specific tools for chemistry, materials science, and optimization. Data can be imported from and
            exported to standard formats, ensuring compatibility with your current analysis and visualization tools.
            This integration approach allows you to incorporate quantum simulations into your research without
            disrupting established processes.
          </p>

          <h3 className="text-2xl font-semibold mt-8 mb-4">Support and Community</h3>
          <p className="text-gray-300">
            Beyond the technical capabilities, Synaptiq provides comprehensive support to ensure your success. Our
            documentation covers everything from basic concepts to advanced techniques, with practical examples drawn
            from real-world research scenarios. Our support team includes experts in quantum computing and various
            application domains, ready to assist with technical questions and application guidance. Additionally, our
            growing user community provides a forum for knowledge sharing, collaboration, and inspiration across
            disciplines and industries.
          </p>
        </div>
      </section>

      {/* Beta CTA */}
      <section className="py-20 container mx-auto px-4">
        <div className="bg-gradient-to-r from-gray-900 to-black rounded-2xl p-8 md:p-12 border border-gray-800">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">Join the Quantum Revolution Today</h2>
            <p className="text-xl text-gray-300 mb-8">
              Be among the first to access our full suite of quantum simulation tools and accelerate your research
              beyond classical limitations.
            </p>
            <div className="prose prose-lg prose-invert max-w-none mb-8">
              <p className="text-gray-300">
                The quantum computing revolution is underway, and early adopters will gain significant advantages in
                their fields. By joining our beta program, you'll not only gain access to cutting-edge quantum
                simulation capabilities but also help shape the future of this transformative technology. Your feedback
                and use cases will directly influence our development roadmap, ensuring that our platform evolves to
                meet the needs of real-world scientific research.
              </p>
              <p className="text-gray-300">
                Beta participants receive priority support, exclusive access to new features before general release, and
                opportunities to collaborate with our research team on publications and case studies. Whether you're
                looking to explore fundamental quantum phenomena, accelerate your materials discovery process, optimize
                complex systems, or prepare for the quantum computing future, Synaptiq's Quantum Simulations platform
                provides the tools and support you need to succeed.
              </p>
              <p className="text-gray-300">
                Don't miss this opportunity to be at the forefront of scientific innovation. Join our beta program today
                and discover what quantum simulations can do for your research.
              </p>
            </div>
            <Button size="lg" className="bg-white text-black hover:bg-gray-200 text-lg px-8" asChild>
              <Link href="/beta">Apply for Beta Access</Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  )
}

function FeatureItem({ children }) {
  return (
    <li className="flex items-start">
      <Check className="h-5 w-5 text-white mr-2 mt-0.5 flex-shrink-0" />
      <span className="text-gray-300">{children}</span>
    </li>
  )
}
