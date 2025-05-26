import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"

export default function AboutPage() {
  return (
    <div className="container mx-auto px-4 py-12 max-w-6xl">
      <div className="space-y-12">
        {/* Hero Section */}
        <section className="text-center space-y-6">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white">About Synaptiq</h1>
          <p className="text-xl text-white max-w-3xl mx-auto">
            Pioneering the frontier of scientific computing through quantum-enhanced artificial intelligence
          </p>
          <div className="flex justify-center gap-4 flex-wrap">
            <Button className="bg-gray-800 text-white hover:bg-gray-700" size="lg" asChild>
              <Link href="/beta">Join Our Beta</Link>
            </Button>
          </div>
        </section>

        {/* Our Mission */}
        <section className="grid md:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <h2 className="text-3xl font-bold text-white">Our Mission</h2>
            <div className="space-y-4">
              <p className="text-gray-300">
                At Synaptiq, our mission transcends conventional boundaries of scientific computing. We are dedicated to
                democratizing access to advanced quantum-enhanced artificial intelligence, empowering researchers,
                scientists, and innovators across disciplines to solve humanity's most pressing challenges. Our platform
                represents the convergence of quantum mechanics, neural networks, and scientific methodology—a synergy
                that unlocks unprecedented computational capabilities for scientific discovery.
              </p>
              <p className="text-gray-300">
                Founded in 2021 by a consortium of quantum physicists, AI researchers, and computational scientists,
                Synaptiq emerged from a shared vision: to create a computational environment where the most complex
                scientific problems become tractable through quantum-enhanced intelligence. We recognized that while
                quantum computing and artificial intelligence were advancing rapidly as separate fields, their
                integration remained largely theoretical. Synaptiq was born to bridge this gap, creating practical
                applications that harness the power of both paradigms.
              </p>
              <p className="text-gray-300">
                Our core philosophy centers on three fundamental principles: scientific rigor, computational innovation,
                and accessible design. We believe that advanced scientific tools should maintain the highest standards
                of accuracy while pushing the boundaries of what's computationally possible—all within an interface that
                researchers across disciplines can readily utilize. This balance of depth and accessibility defines the
                Synaptiq approach to scientific computing.
              </p>
            </div>
          </div>
          <div className="relative h-[400px] rounded-xl overflow-hidden shadow-xl">
            <Image src="/cosmic-flow.png" alt="Quantum neural network visualization" fill className="object-cover" />
          </div>
        </section>

        {/* Technology Platform */}
        <section className="space-y-8">
          <h2 className="text-3xl font-bold text-white">Our Technology Platform</h2>
          <div className="grid md:grid-cols-3 gap-6">
            <Card className="bg-gray-900 border-gray-800">
              <CardContent className="p-6 space-y-4">
                <div className="h-12 w-12 rounded-lg bg-gray-800 flex items-center justify-center">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="text-white"
                  >
                    <path d="M12 2a4 4 0 0 0-4 4v12a4 4 0 0 0 8 0V6a4 4 0 0 0-4-4z"></path>
                    <path d="M16 8a4 4 0 0 0-8 0v8a4 4 0 0 0 8 0V8z"></path>
                    <line x1="2" y1="12" x2="22" y2="12"></line>
                  </svg>
                </div>
                <h3 className="text-xl font-semibold text-white">Quantum Neural Networks</h3>
                <p className="text-gray-400">
                  Our proprietary quantum neural network architecture combines quantum circuit design with neural
                  network principles, enabling computations that leverage quantum superposition and entanglement while
                  maintaining the learning capabilities of neural systems.
                </p>
              </CardContent>
            </Card>
            <Card className="bg-gray-900 border-gray-800">
              <CardContent className="p-6 space-y-4">
                <div className="h-12 w-12 rounded-lg bg-gray-800 flex items-center justify-center">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="text-white"
                  >
                    <circle cx="12" cy="12" r="10"></circle>
                    <line x1="2" y1="12" x2="22" y2="12"></line>
                    <line x1="12" y1="2" x2="12" y2="22"></line>
                  </svg>
                </div>
                <h3 className="text-xl font-semibold text-white">Scientific Simulation Engine</h3>
                <p className="text-gray-400">
                  Our simulation engine provides high-fidelity modeling of complex physical systems, from quantum
                  mechanics to astrophysics, with unprecedented accuracy and computational efficiency through our hybrid
                  classical-quantum approach.
                </p>
              </CardContent>
            </Card>
            <Card className="bg-gray-900 border-gray-800">
              <CardContent className="p-6 space-y-4">
                <div className="h-12 w-12 rounded-lg bg-gray-800 flex items-center justify-center">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="text-white"
                  >
                    <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
                  </svg>
                </div>
                <h3 className="text-xl font-semibold text-white">Scientific Language Model</h3>
                <p className="text-gray-400">
                  Our specialized language model is trained on scientific literature, mathematical formulations, and
                  domain-specific knowledge, enabling natural language interactions with deep scientific understanding
                  and mathematical reasoning.
                </p>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* The Science Behind Synaptiq */}
        <section className="space-y-8">
          <h2 className="text-3xl font-bold text-white">The Science Behind Synaptiq</h2>
          <div className="space-y-6">
            <p className="text-gray-300">
              The scientific foundation of Synaptiq rests at the intersection of quantum mechanics, artificial
              intelligence, and computational science. Our platform leverages the principles of quantum superposition
              and entanglement to perform computations that would be intractable for classical systems. By encoding
              information in quantum states and manipulating these states through carefully designed quantum circuits,
              we can explore solution spaces exponentially faster than conventional approaches.
            </p>
            <p className="text-gray-300">
              At the core of our technology is a novel quantum-classical hybrid architecture that combines the strengths
              of quantum processing with classical neural networks. This approach allows us to harness quantum
              advantages where they provide computational benefits while utilizing classical methods for tasks where
              they excel. The result is a computational framework that transcends the limitations of either paradigm
              alone.
            </p>
            <p className="text-gray-300">
              Our quantum neural networks implement a variety of quantum circuit designs, including variational quantum
              eigensolver (VQE) architectures, quantum approximate optimization algorithms (QAOA), and quantum
              convolutional networks. These circuits are parameterized and trainable, allowing them to learn from data
              while maintaining quantum coherence. The classical components of our system handle pre-processing, feature
              extraction, and post-processing, creating a seamless workflow from input to scientifically rigorous
              output.
            </p>
            <p className="text-gray-300">
              The mathematical formalism underlying Synaptiq draws from quantum information theory, differential
              geometry, and statistical learning theory. We employ tensor network representations to efficiently
              simulate quantum systems, geometric quantum mechanics to understand the topology of quantum state spaces,
              and information-theoretic measures to quantify entanglement and quantum advantages. This rigorous
              mathematical foundation ensures that our simulations and predictions maintain scientific validity across
              applications.
            </p>
          </div>
          <div className="grid md:grid-cols-2 gap-8 mt-8">
            <div className="bg-gray-900 border border-gray-800 rounded-lg p-6">
              <h3 className="text-xl font-semibold text-white mb-4">Quantum Simulation Capabilities</h3>
              <ul className="space-y-3 text-gray-300">
                <li className="flex items-start">
                  <svg
                    className="h-6 w-6 text-white mr-2 flex-shrink-0"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span>
                    <strong className="text-white">Quantum Many-Body Systems:</strong> Simulate complex quantum systems
                    with many interacting particles, exploring phenomena like superconductivity and quantum phase
                    transitions.
                  </span>
                </li>
                <li className="flex items-start">
                  <svg
                    className="h-6 w-6 text-white mr-2 flex-shrink-0"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span>
                    <strong className="text-white">Molecular Dynamics:</strong> Model molecular structures and
                    interactions with quantum accuracy, accelerating drug discovery and materials science research.
                  </span>
                </li>
                <li className="flex items-start">
                  <svg
                    className="h-6 w-6 text-white mr-2 flex-shrink-0"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span>
                    <strong className="text-white">Quantum Field Theories:</strong> Implement lattice simulations of
                    quantum field theories, providing insights into fundamental physics and high-energy phenomena.
                  </span>
                </li>
                <li className="flex items-start">
                  <svg
                    className="h-6 w-6 text-white mr-2 flex-shrink-0"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span>
                    <strong className="text-white">Quantum Machine Learning:</strong> Train quantum neural networks for
                    pattern recognition, anomaly detection, and predictive modeling in scientific datasets.
                  </span>
                </li>
              </ul>
            </div>
            <div className="bg-gray-900 border border-gray-800 rounded-lg p-6">
              <h3 className="text-xl font-semibold text-white mb-4">Mathematical Foundations</h3>
              <ul className="space-y-3 text-gray-300">
                <li className="flex items-start">
                  <svg
                    className="h-6 w-6 text-white mr-2 flex-shrink-0"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span>
                    <strong className="text-white">Tensor Networks:</strong> Efficient representations of quantum states
                    and operations, enabling simulation of systems with large Hilbert spaces.
                  </span>
                </li>
                <li className="flex items-start">
                  <svg
                    className="h-6 w-6 text-white mr-2 flex-shrink-0"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span>
                    <strong className="text-white">Differential Geometry:</strong> Geometric approaches to quantum
                    mechanics and quantum information, providing insights into quantum state spaces.
                  </span>
                </li>
                <li className="flex items-start">
                  <svg
                    className="h-6 w-6 text-white mr-2 flex-shrink-0"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span>
                    <strong className="text-white">Information Theory:</strong> Quantification of quantum entanglement,
                    coherence, and information processing capabilities in quantum systems.
                  </span>
                </li>
                <li className="flex items-start">
                  <svg
                    className="h-6 w-6 text-white mr-2 flex-shrink-0"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span>
                    <strong className="text-white">Numerical Methods:</strong> Advanced algorithms for solving
                    differential equations, optimization problems, and eigenvalue problems in quantum contexts.
                  </span>
                </li>
              </ul>
            </div>
          </div>
        </section>

        {/* Applications and Use Cases */}
        <section className="space-y-8">
          <h2 className="text-3xl font-bold text-white">Applications and Use Cases</h2>
          <div className="grid md:grid-cols-2 gap-8">
            <div className="space-y-6">
              <h3 className="text-2xl font-semibold text-white">Scientific Research</h3>
              <p className="text-gray-300">
                Synaptiq empowers researchers across disciplines to explore complex scientific questions with
                unprecedented computational power. In physics, our platform enables simulations of quantum many-body
                systems, providing insights into superconductivity, quantum magnetism, and topological phases of matter.
                Astrophysicists use Synaptiq to model gravitational wave patterns, dark matter distributions, and cosmic
                microwave background radiation with enhanced precision.
              </p>
              <p className="text-gray-300">
                In chemistry and materials science, our quantum-enhanced simulations accurately predict molecular
                properties, reaction pathways, and novel material structures. This accelerates drug discovery, catalyst
                design, and the development of advanced materials with tailored properties. Researchers have used
                Synaptiq to identify promising drug candidates for challenging targets and design materials with
                unprecedented strength-to-weight ratios.
              </p>
              <h3 className="text-2xl font-semibold text-white mt-8">Education and Training</h3>
              <p className="text-gray-300">
                Beyond research applications, Synaptiq serves as a powerful educational tool for the next generation of
                scientists. Our interactive simulations and visualizations make complex quantum phenomena accessible to
                students at various educational levels. Universities worldwide have integrated Synaptiq into their
                quantum mechanics, computational physics, and advanced mathematics curricula, providing students with
                hands-on experience in quantum computing and scientific simulation.
              </p>
              <p className="text-gray-300">
                Our platform includes specialized tutorials, guided explorations, and challenge problems that build
                intuition for quantum mechanics and computational science. By bridging theoretical concepts with
                interactive visualizations, Synaptiq helps students develop a deeper understanding of quantum phenomena
                and their applications in scientific computing.
              </p>
            </div>
            <div className="space-y-6">
              <h3 className="text-2xl font-semibold text-white">Industrial Applications</h3>
              <p className="text-gray-300">
                In the industrial sector, Synaptiq addresses computationally intensive challenges across multiple
                domains. Pharmaceutical companies leverage our platform to accelerate drug discovery through
                quantum-enhanced molecular simulations and binding affinity predictions. Energy companies utilize
                Synaptiq for optimizing grid operations, modeling renewable energy integration, and simulating advanced
                battery chemistries with quantum accuracy.
              </p>
              <p className="text-gray-300">
                Materials manufacturers employ our quantum simulation capabilities to design novel alloys, polymers, and
                composites with specific properties, reducing the need for costly experimental iterations. Financial
                institutions use our quantum optimization algorithms for portfolio optimization, risk assessment, and
                fraud detection, gaining computational advantages in complex modeling scenarios.
              </p>
              <h3 className="text-2xl font-semibold text-white mt-8">Interdisciplinary Research</h3>
              <p className="text-gray-300">
                Synaptiq excels at the boundaries between traditional disciplines, where computational challenges often
                prove most formidable. In biophysics, our platform enables simulations of protein folding dynamics,
                enzyme catalysis, and biomolecular interactions with quantum-level accuracy. Researchers in quantum
                biology use Synaptiq to investigate quantum coherence in photosynthesis, avian magnetoreception, and
                other biological processes where quantum effects may play crucial roles.
              </p>
              <p className="text-gray-300">
                At the intersection of neuroscience and quantum information, Synaptiq facilitates exploration of quantum
                models of consciousness, neural network dynamics, and information processing in biological systems.
                Climate scientists leverage our computational capabilities for enhanced atmospheric modeling, carbon
                cycle simulations, and climate prediction with improved accuracy and reduced uncertainty.
              </p>
            </div>
          </div>
        </section>

        {/* Research and Publications */}
        <section className="space-y-8">
          <h2 className="text-3xl font-bold text-white">Research and Publications</h2>
          <p className="text-gray-300">
            Synaptiq maintains a strong commitment to advancing the scientific field through peer-reviewed research and
            open collaboration. Our team regularly publishes in leading journals and conferences across quantum
            computing, artificial intelligence, and computational science. These publications document our
            methodological innovations, benchmark results, and theoretical advances in quantum-enhanced scientific
            computing.
          </p>
          <div className="space-y-4">
            <Card className="bg-gray-900 border-gray-800">
              <CardContent className="p-6">
                <h3 className="text-lg font-semibold text-white">Quantum Neural Networks for Scientific Discovery</h3>
                <p className="text-white">Journal of Quantum Information Processing</p>
                <p className="text-gray-400 mt-2">
                  This paper introduces our novel architecture for quantum neural networks optimized for scientific
                  applications, demonstrating superior performance in quantum chemistry simulations and materials
                  science predictions.
                </p>
              </CardContent>
            </Card>
            <Card className="bg-gray-900 border-gray-800">
              <CardContent className="p-6">
                <h3 className="text-lg font-semibold text-white">
                  Tensor Network Methods for Quantum Many-Body Simulations
                </h3>
                <p className="text-white">Physical Review X</p>
                <p className="text-gray-400 mt-2">
                  Our research team developed enhanced tensor network algorithms that significantly improve the
                  efficiency and accuracy of quantum many-body simulations, enabling exploration of previously
                  intractable systems.
                </p>
              </CardContent>
            </Card>
            <Card className="bg-gray-900 border-gray-800">
              <CardContent className="p-6">
                <h3 className="text-lg font-semibold text-white">Quantum-Enhanced Scientific Language Models</h3>
                <p className="text-white">Conference on Neural Information Processing Systems (NeurIPS)</p>
                <p className="text-gray-400 mt-2">
                  This paper presents our approach to integrating quantum computing principles into language models
                  specialized for scientific discourse, demonstrating improved mathematical reasoning and
                  domain-specific knowledge.
                </p>
              </CardContent>
            </Card>
          </div>
          <p className="text-gray-300 mt-4">
            Beyond formal publications, we actively contribute to open-source scientific computing projects, share
            technical whitepapers, and participate in research collaborations with academic institutions worldwide. This
            commitment to open science accelerates progress in quantum-enhanced computing while ensuring that our
            methods undergo rigorous peer review and validation.
          </p>
        </section>

        {/* Future Vision */}
        <section className="space-y-6">
          <h2 className="text-3xl font-bold text-white">Our Vision for the Future</h2>
          <p className="text-gray-300">
            As we look to the future, Synaptiq envisions a scientific computing landscape transformed by the seamless
            integration of quantum and classical paradigms. We are working toward a future where researchers across
            disciplines can leverage quantum advantages without specialized expertise in quantum mechanics or quantum
            programming. This democratization of quantum-enhanced computing will accelerate scientific discovery across
            fields, from drug discovery to climate modeling to fundamental physics.
          </p>
          <p className="text-gray-300">
            Our research roadmap includes developing more powerful quantum neural network architectures, expanding our
            simulation capabilities to encompass broader scientific domains, and enhancing the interpretability of
            quantum-enhanced models. We are particularly focused on bridging the gap between quantum theory and
            practical applications, translating quantum advantages into tangible benefits for scientific research and
            industrial innovation.
          </p>
          <p className="text-gray-300">
            In the coming years, we anticipate that quantum-enhanced scientific computing will become an essential tool
            for addressing humanity's most pressing challenges—from developing new medicines and sustainable materials
            to modeling climate systems and understanding fundamental physics. Synaptiq is committed to leading this
            transformation, maintaining our core values of scientific rigor, computational innovation, and accessible
            design as we push the boundaries of what's possible.
          </p>
          <p className="text-gray-300">
            We invite researchers, educators, industry partners, and curious minds to join us on this journey. Whether
            you're exploring quantum computing for the first time or seeking to apply quantum advantages to specific
            scientific challenges, Synaptiq offers a platform where quantum possibilities become scientific realities.
            Together, we can accelerate the pace of discovery and unlock new frontiers in human knowledge.
          </p>
        </section>

        {/* CTA Section */}
        <section className="bg-gray-900 border border-gray-800 rounded-xl p-8 text-center">
          <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">
            Join the Quantum Revolution in Scientific Computing
          </h2>
          <p className="text-xl text-gray-300 mb-6 max-w-3xl mx-auto">
            Experience the power of quantum-enhanced AI for your scientific research and discovery
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Button className="bg-gray-800 text-white hover:bg-gray-700" size="lg" asChild>
              <Link href="/beta">Apply for Beta Access</Link>
            </Button>
            <Button variant="outline" size="lg" asChild>
              <Link href="/contact">Contact Our Team</Link>
            </Button>
          </div>
        </section>
      </div>
    </div>
  )
}
