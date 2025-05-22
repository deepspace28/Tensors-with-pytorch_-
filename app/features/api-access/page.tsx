import Link from "next/link"
import { ArrowRight, Check, Code, Terminal, Database, Globe } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function ApiAccessPage() {
  return (
    <div className="min-h-screen bg-black text-white">
      {/* Hero Section */}
      <section className="relative py-20 overflow-hidden border-b border-gray-800">
        <div className="absolute inset-0 bg-[url('/Quantum Neural Web.png')] bg-cover bg-center opacity-20"></div>
        <div className="container mx-auto px-4 relative z-10 max-w-4xl">
          <div className="flex flex-col items-center text-center">
            {/* Custom API Logo */}
            <div className="w-20 h-20 mb-6">
              <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
                <rect x="10" y="25" width="80" height="50" rx="4" stroke="white" strokeWidth="2" />
                <path d="M10 40 L90 40" stroke="white" strokeWidth="2" />
                <circle cx="20" cy="33" r="3" fill="white" />
                <circle cx="30" cy="33" r="3" fill="white" />
                <circle cx="40" cy="33" r="3" fill="white" />
                <path d="M20 55 L40 55" stroke="white" strokeWidth="2" />
                <path d="M20 65 L60 65" stroke="white" strokeWidth="2" />
                <path d="M50 55 L80 55" stroke="white" strokeWidth="2" strokeDasharray="4 4" />
                <path d="M70 65 L80 65" stroke="white" strokeWidth="2" strokeDasharray="4 4" />
                <path d="M60 15 L70 25" stroke="white" strokeWidth="2" />
                <path d="M70 15 L60 25" stroke="white" strokeWidth="2" />
                <path d="M30 85 L40 75" stroke="white" strokeWidth="2" />
                <path d="M40 85 L30 75" stroke="white" strokeWidth="2" />
                <path d="M60 85 L70 75" stroke="white" strokeWidth="2" />
                <path d="M70 85 L60 75" stroke="white" strokeWidth="2" />
              </svg>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold mb-6">API Access</h1>
            <p className="text-xl text-gray-300 mb-8 max-w-3xl">
              Integrate Synaptiq's powerful scientific computing capabilities directly into your applications and
              workflows with our comprehensive API.
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              <Button size="lg" className="bg-white text-black hover:bg-gray-200" asChild>
                <Link href="/beta">Join the Beta</Link>
              </Button>
              <Button size="lg" variant="outline" className="border-gray-700 text-white hover:bg-gray-800" asChild>
                <Link href="/docs/api">
                  API Documentation <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Introduction */}
      <section className="py-20 container mx-auto px-4 max-w-4xl">
        <h2 className="text-3xl font-bold mb-8">Seamless Integration for Scientific Workflows</h2>

        <div className="prose prose-lg prose-invert max-w-none">
          <p className="text-gray-300">
            In the modern scientific landscape, research workflows span multiple tools, platforms, and computational
            environments. Recognizing this reality, Synaptiq has developed a comprehensive API that allows seamless
            integration of our advanced scientific capabilities into existing research ecosystems. This API-first
            approach enables researchers to harness the power of quantum simulations, scientific language models, and
            specialized analytical tools without disrupting established workflows or requiring extensive retraining on
            new interfaces.
          </p>

          <p className="text-gray-300">
            The Synaptiq API is designed with both flexibility and simplicity in mind. For developers and computational
            scientists comfortable with programming, our RESTful API provides granular access to all platform
            capabilities, allowing precise control and customization. For researchers who prefer to work in specific
            scientific environments, we offer native integrations with popular tools like Python, R, MATLAB, and
            Jupyter, enabling you to access Synaptiq's capabilities using familiar syntax and workflows. This dual
            approach ensures that our platform can adapt to your preferred working style rather than forcing you to
            adapt to ours.
          </p>

          <p className="text-gray-300">
            Beyond technical integration, our API is designed to support the collaborative and iterative nature of
            scientific research. All API interactions are automatically logged and versioned, creating a detailed
            provenance record that enhances reproducibility and facilitates collaboration. Results can be easily shared
            with colleagues, exported to various formats for publication, or saved for future reference. This
            comprehensive approach to research workflow integration ensures that Synaptiq enhances your scientific
            process rather than becoming an isolated tool used for specific tasks.
          </p>

          <p className="text-gray-300">
            Security and data privacy are fundamental considerations in our API design. All API communications are
            encrypted using industry-standard protocols, and our authentication system supports various security models
            including API keys, OAuth, and institutional single sign-on. Data transmitted through our API remains under
            your control, with clear policies regarding storage, processing, and retention. These security measures
            ensure that sensitive research data and proprietary methods remain protected while still enabling the
            collaborative aspects of scientific research.
          </p>

          <p className="text-gray-300">
            Perhaps most importantly, our API is backed by the same rigorous validation framework that underlies all
            Synaptiq capabilities. Every API endpoint is thoroughly tested for accuracy, reliability, and performance,
            ensuring that programmatic access maintains the same high standards as our user interfaces. This commitment
            to validation across all access methods provides confidence that your research results will be consistent
            and reliable regardless of how you choose to interact with our platform.
          </p>
        </div>
      </section>

      {/* API Capabilities */}
      <section className="py-20 bg-gray-950 border-y border-gray-800">
        <div className="container mx-auto px-4 max-w-4xl">
          <h2 className="text-3xl font-bold mb-12 text-center">API Capabilities</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
            <div className="bg-black p-6 rounded-lg border border-gray-800">
              <div className="flex items-center mb-4">
                <Terminal className="h-8 w-8 text-white mr-3" />
                <h3 className="text-xl font-semibold">Quantum Simulation API</h3>
              </div>
              <p className="text-gray-300 mb-4">
                Access our quantum simulation engine programmatically to model quantum systems, run quantum algorithms,
                and analyze results. Our API supports both high-level abstractions and low-level control for maximum
                flexibility.
              </p>
              <ul className="space-y-2">
                <FeatureItem>Quantum circuit design and execution</FeatureItem>
                <FeatureItem>Quantum chemistry simulations</FeatureItem>
                <FeatureItem>Quantum optimization algorithms</FeatureItem>
                <FeatureItem>Custom quantum algorithm development</FeatureItem>
              </ul>
            </div>

            <div className="bg-black p-6 rounded-lg border border-gray-800">
              <div className="flex items-center mb-4">
                <Database className="h-8 w-8 text-white mr-3" />
                <h3 className="text-xl font-semibold">Scientific LLM API</h3>
              </div>
              <p className="text-gray-300 mb-4">
                Integrate our specialized scientific language model into your applications and workflows. Our API
                provides access to scientific knowledge, reasoning, and explanation capabilities with domain-specific
                accuracy.
              </p>
              <ul className="space-y-2">
                <FeatureItem>Scientific question answering</FeatureItem>
                <FeatureItem>Literature analysis and summarization</FeatureItem>
                <FeatureItem>Hypothesis generation and evaluation</FeatureItem>
                <FeatureItem>Mathematical reasoning and derivation</FeatureItem>
              </ul>
            </div>

            <div className="bg-black p-6 rounded-lg border border-gray-800">
              <div className="flex items-center mb-4">
                <Globe className="h-8 w-8 text-white mr-3" />
                <h3 className="text-xl font-semibold">Workflow Integration API</h3>
              </div>
              <p className="text-gray-300 mb-4">
                Build end-to-end scientific workflows that combine multiple Synaptiq capabilities with your existing
                tools and data sources. Our workflow API enables automation, reproducibility, and collaboration.
              </p>
              <ul className="space-y-2">
                <FeatureItem>Pipeline construction and execution</FeatureItem>
                <FeatureItem>Data transformation and analysis</FeatureItem>
                <FeatureItem>Result visualization and export</FeatureItem>
                <FeatureItem>Experiment tracking and versioning</FeatureItem>
              </ul>
            </div>

            <div className="bg-black p-6 rounded-lg border border-gray-800">
              <div className="flex items-center mb-4">
                <Code className="h-8 w-8 text-white mr-3" />
                <h3 className="text-xl font-semibold">Security and Administration API</h3>
              </div>
              <p className="text-gray-300 mb-4">
                Manage access, monitor usage, and ensure compliance with your organization's security policies. Our
                administration API provides the tools you need to integrate Synaptiq securely into your research
                environment.
              </p>
              <ul className="space-y-2">
                <FeatureItem>User and group management</FeatureItem>
                <FeatureItem>Usage monitoring and quotas</FeatureItem>
                <FeatureItem>Audit logging and compliance reporting</FeatureItem>
                <FeatureItem>Custom security policy enforcement</FeatureItem>
              </ul>
            </div>
          </div>

          <div className="prose prose-lg prose-invert max-w-none">
            <p className="text-gray-300">
              These core API capabilities provide programmatic access to the full spectrum of Synaptiq's scientific
              computing platform. Each capability is thoroughly documented with examples, reference implementations, and
              best practices to facilitate rapid integration into your existing workflows and systems.
            </p>

            <p className="text-gray-300">
              Beyond these core capabilities, we offer specialized APIs for specific scientific domains and use cases.
              These domain-specific APIs incorporate field-specific terminology, data formats, and workflows, making
              integration even more seamless for researchers in these areas. As our platform evolves, we continue to
              expand both our core and domain-specific API offerings based on user feedback and emerging research needs.
            </p>
          </div>
        </div>
      </section>

      {/* Integration Examples */}
      <section className="py-20 container mx-auto px-4 max-w-4xl">
        <h2 className="text-3xl font-bold mb-12 text-center">Integration Examples</h2>

        <div className="space-y-12 mb-16">
          <div className="bg-black p-8 rounded-lg border border-gray-800">
            <h3 className="text-2xl font-semibold mb-4">Python Integration</h3>
            <p className="text-gray-300 mb-6">
              Our Python SDK provides a native interface to Synaptiq's capabilities, allowing seamless integration with
              popular scientific Python libraries like NumPy, SciPy, and Pandas. This integration enables researchers to
              incorporate quantum simulations and AI-powered analysis directly into their Python workflows.
            </p>
            <div className="bg-gray-900 p-4 rounded-lg font-mono text-sm overflow-x-auto">
              <pre className="text-gray-300">
                {`import synaptiq as sq

# Initialize the client
client = sq.Client(api_key="YOUR_API_KEY")

# Run a quantum simulation
circuit = sq.QuantumCircuit(3)
circuit.h(0)
circuit.cx(0, 1)
circuit.cx(0, 2)

# Execute the circuit
result = client.quantum.run(circuit, shots=1000)

# Analyze the results
counts = result.get_counts()
print(counts)  # {'000': 498, '111': 502}

# Use the scientific LLM to interpret results
explanation = client.llm.explain(
    "What does this GHZ state result indicate?",
    context={"result": counts}
)
print(explanation)`}
              </pre>
            </div>
          </div>

          <div className="bg-black p-8 rounded-lg border border-gray-800">
            <h3 className="text-2xl font-semibold mb-4">Jupyter Notebook Integration</h3>
            <p className="text-gray-300 mb-6">
              Our Jupyter extensions enable interactive exploration of quantum simulations and scientific AI directly
              within notebook environments. This integration supports the exploratory and iterative nature of scientific
              research while maintaining reproducibility.
            </p>
            <div className="bg-gray-900 p-4 rounded-lg font-mono text-sm overflow-x-auto">
              <pre className="text-gray-300">
                {`# Load the Synaptiq extension
%load_ext synaptiq

# Create and run a molecular simulation
%%synaptiq_molecule
name: caffeine
optimization: quantum
properties: 
  - electronic_structure
  - binding_energy
  - vibrational_modes

# Results are automatically visualized and stored in the notebook
# Access the results programmatically
results = _synaptiq_last_result

# Further analysis with Python
import matplotlib.pyplot as plt
plt.figure(figsize=(10, 6))
plt.plot(results.vibrational_modes.frequencies, results.vibrational_modes.intensities)
plt.xlabel('Frequency (cm⁻¹)')
plt.ylabel('Intensity')
plt.title('Vibrational Spectrum of Caffeine')
plt.show()`}
              </pre>
            </div>
          </div>

          <div className="bg-black p-8 rounded-lg border border-gray-800">
            <h3 className="text-2xl font-semibold mb-4">Web Application Integration</h3>
            <p className="text-gray-300 mb-6">
              Our JavaScript SDK and RESTful API enable integration of Synaptiq's capabilities into web applications and
              dashboards. This integration allows organizations to build custom research portals and interactive tools
              that leverage our platform's capabilities.
            </p>
            <div className="bg-gray-900 p-4 rounded-lg font-mono text-sm overflow-x-auto">
              <pre className="text-gray-300">
                {`// Initialize the Synaptiq client
const synaptiq = new Synaptiq.Client({
  apiKey: 'YOUR_API_KEY'
});

// Create an interactive quantum circuit builder
const circuitBuilder = new Synaptiq.QuantumCircuitBuilder({
  container: document.getElementById('circuit-builder'),
  qubits: 5,
  onCircuitChange: (circuit) => {
    // Update the simulation results when the circuit changes
    updateSimulationResults(circuit);
  }
});

// Function to update simulation results
async function updateSimulationResults(circuit) {
  try {
    // Run the simulation
    const result = await synaptiq.quantum.run({
      circuit: circuit.serialize(),
      shots: 1000
    });
    
    // Visualize the results
    const visualization = new Synaptiq.Visualization.QuantumStateVisualization({
      container: document.getElementById('results-visualization'),
      data: result,
      type: 'bloch-sphere'
    });
    
    // Display additional information
    document.getElementById('result-stats').textContent = 
      JSON.stringify(result.statistics, null, 2);
  } catch (error) {
    console.error('Simulation error:', error);
  }
}`}
              </pre>
            </div>
          </div>
        </div>

        <div className="prose prose-lg prose-invert max-w-none">
          <p className="text-gray-300">
            These examples illustrate just a few of the many ways that Synaptiq's API can be integrated into research
            workflows and applications. Our documentation includes many more examples, tutorials, and reference
            implementations to help you get started quickly with your specific integration needs.
          </p>

          <p className="text-gray-300">
            We also offer integration consulting services for beta participants, providing personalized guidance on how
            to best incorporate our capabilities into your specific research environment. Our team of scientific
            computing experts can help you design efficient workflows, optimize performance, and ensure that your
            integration meets both technical and scientific requirements.
          </p>
        </div>
      </section>

      {/* Technical Details */}
      <section className="py-20 bg-gray-950 border-y border-gray-800">
        <div className="container mx-auto px-4 max-w-4xl">
          <h2 className="text-3xl font-bold mb-12 text-center">Technical Specifications</h2>

          <div className="prose prose-lg prose-invert max-w-none mb-16">
            <p className="text-gray-300">
              Synaptiq's API is built on modern, standards-compliant technologies that ensure reliability, performance,
              and compatibility with a wide range of client environments. Our technical architecture is designed to
              support both simple integrations and complex, high-performance scientific workflows.
            </p>

            <h3 className="text-2xl font-semibold mt-8 mb-4">API Architecture</h3>
            <p className="text-gray-300">
              Our primary API follows RESTful principles with JSON as the default data format, making it compatible with
              virtually any programming language or environment. For performance-critical applications, we also offer a
              gRPC interface that provides lower latency and more efficient binary data transfer. Both interfaces
              provide access to the same underlying capabilities, allowing you to choose the approach that best fits
              your requirements.
            </p>

            <h3 className="text-2xl font-semibold mt-8 mb-4">Authentication and Security</h3>
            <p className="text-gray-300">
              API access is secured using industry-standard authentication mechanisms including API keys, OAuth 2.0, and
              JWT tokens. All API communications are encrypted using TLS 1.3, and we support IP whitelisting, rate
              limiting, and other security measures to protect against unauthorized access. For enterprise customers, we
              offer integration with SAML and other institutional identity providers to simplify user management and
              ensure compliance with organizational security policies.
            </p>

            <h3 className="text-2xl font-semibold mt-8 mb-4">Performance and Scaling</h3>
            <p className="text-gray-300">
              Our API infrastructure is designed to scale automatically based on demand, ensuring consistent performance
              even during peak usage periods. For computationally intensive operations like quantum simulations, we
              provide both synchronous and asynchronous execution models. The asynchronous model allows you to submit
              long-running jobs and receive notifications when they complete, enabling efficient use of resources for
              complex scientific workflows.
            </p>

            <h3 className="text-2xl font-semibold mt-8 mb-4">Data Handling</h3>
            <p className="text-gray-300">
              Our API supports efficient transfer of scientific data in various formats including JSON, HDF5, and
              domain-specific formats like CIF for crystallography or PDB for molecular structures. For large datasets,
              we provide streaming capabilities and resumable uploads/downloads to ensure reliable data transfer even in
              challenging network environments. All data is versioned and can be referenced by persistent identifiers,
              facilitating reproducibility and collaboration.
            </p>

            <h3 className="text-2xl font-semibold mt-8 mb-4">Client Libraries</h3>
            <p className="text-gray-300">
              To simplify integration, we provide official client libraries for popular programming languages including
              Python, JavaScript, R, and MATLAB. These libraries handle authentication, error handling, and data
              serialization, allowing you to focus on the scientific aspects of your integration rather than API
              mechanics. All client libraries are open source, thoroughly documented, and maintained with the same
              rigorous testing standards as our core platform.
            </p>
          </div>
        </div>
      </section>

      {/* Getting Started */}
      <section className="py-20 container mx-auto px-4 max-w-4xl">
        <h2 className="text-3xl font-bold mb-12 text-center">Getting Started with API Integration</h2>

        <div className="prose prose-lg prose-invert max-w-none mb-16">
          <p className="text-gray-300">
            Integrating Synaptiq's API into your research workflow is a straightforward process designed to minimize
            technical overhead and maximize scientific productivity. Our comprehensive documentation, example code, and
            support resources ensure a smooth integration experience regardless of your technical background.
          </p>

          <h3 className="text-2xl font-semibold mt-8 mb-4">1. Access and Authentication</h3>
          <p className="text-gray-300">
            The first step in API integration is obtaining access credentials. Beta participants receive API keys
            through our secure portal, along with detailed instructions for storing and using these credentials safely.
            Our documentation includes examples of authentication for various client environments, ensuring that you can
            establish secure API access quickly and correctly.
          </p>

          <h3 className="text-2xl font-semibold mt-8 mb-4">2. Explore and Experiment</h3>
          <p className="text-gray-300">
            Before diving into full integration, we recommend exploring our API capabilities through our interactive
            documentation and sandbox environment. This exploration allows you to understand the available endpoints,
            data formats, and response structures without writing any code. Our sandbox environment provides a safe
            space to experiment with API calls using realistic but non-sensitive data, helping you design your
            integration with confidence.
          </p>

          <h3 className="text-2xl font-semibold mt-8 mb-4">3. Choose Your Integration Approach</h3>
          <p className="text-gray-300">
            Based on your technical requirements and preferences, you can choose from several integration approaches.
            For most scientific users, our language-specific SDKs provide the simplest path to integration, with
            high-level abstractions that map naturally to scientific concepts. For users with specific requirements or
            existing API infrastructure, direct REST or gRPC integration offers maximum flexibility and control.
          </p>

          <h3 className="text-2xl font-semibold mt-8 mb-4">4. Implement and Test</h3>
          <p className="text-gray-300">
            With your integration approach selected, implementation typically involves adding our client library to your
            project and writing the code that connects your workflow to our API. Our documentation includes detailed
            tutorials and examples for common integration patterns, significantly reducing the time and effort required.
            During implementation, our testing tools help you verify that your integration is working correctly and
            efficiently.
          </p>

          <h3 className="text-2xl font-semibold mt-8 mb-4">5. Deploy and Monitor</h3>
          <p className="text-gray-300">
            Once your integration is implemented and tested, deployment is typically as simple as including your API
            credentials in your production environment. Our API dashboard provides monitoring tools that help you track
            usage, performance, and potential issues with your integration. For enterprise deployments, we offer
            additional tools for managing multiple users, controlling access, and ensuring compliance with
            organizational policies.
          </p>
        </div>
      </section>

      {/* Beta CTA */}
      <section className="py-20 container mx-auto px-4">
        <div className="bg-gradient-to-r from-gray-900 to-black rounded-2xl p-8 md:p-12 border border-gray-800">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">Transform Your Research Workflow</h2>
            <p className="text-xl text-gray-300 mb-8">
              Join our beta program to integrate cutting-edge scientific capabilities directly into your research
              environment.
            </p>
            <div className="prose prose-lg prose-invert max-w-none mb-8">
              <p className="text-gray-300">
                The future of scientific research lies in integrated, automated workflows that combine the best
                available tools and techniques. By joining Synaptiq's beta program, you gain early access to API
                capabilities that can transform your research workflow, enabling new levels of efficiency,
                reproducibility, and insight. Whether you're looking to automate routine analyses, incorporate quantum
                simulations into existing pipelines, or build entirely new research applications, our API provides the
                foundation you need.
              </p>
              <p className="text-gray-300">
                Beta participants receive priority API access with higher rate limits and computational allocations,
                ensuring that you have the resources needed for serious research applications. You'll also have direct
                access to our integration specialists who can provide personalized guidance on API usage, optimization,
                and best practices. Your feedback during the beta period will directly influence our API development
                roadmap, ensuring that our capabilities evolve to meet your specific research needs.
              </p>
              <p className="text-gray-300">
                Don't miss this opportunity to shape the future of scientific computing. Join our beta program today and
                start building the integrated research workflow of tomorrow.
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
