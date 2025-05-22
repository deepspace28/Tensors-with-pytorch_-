import Link from "next/link"
import { ArrowRight, Check, Award, Users, BookOpen } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function ScientificValidationPage() {
  return (
    <div className="min-h-screen bg-black text-white">
      {/* Hero Section */}
      <section className="relative py-20 overflow-hidden border-b border-gray-800">
        <div className="absolute inset-0 bg-[url('/thoughtful-scientist.png')] bg-cover bg-center opacity-20"></div>
        <div className="container mx-auto px-4 relative z-10 max-w-4xl">
          <div className="flex flex-col items-center text-center">
            {/* Custom Scientific Validation Logo */}
            <div className="w-20 h-20 mb-6">
              <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
                <rect x="10" y="30" width="80" height="50" rx="4" stroke="white" strokeWidth="2" />
                <path d="M20 60 L35 45 L50 70 L65 35 L80 50" stroke="white" strokeWidth="2" />
                <circle cx="35" cy="45" r="3" fill="white" />
                <circle cx="50" cy="70" r="3" fill="white" />
                <circle cx="65" cy="35" r="3" fill="white" />
                <circle cx="80" cy="50" r="3" fill="white" />
                <circle cx="20" cy="60" r="3" fill="white" />
                <path d="M30 20 L70 20" stroke="white" strokeWidth="2" />
                <path d="M50 10 L50 30" stroke="white" strokeWidth="2" />
                <circle cx="50" cy="10" r="5" fill="white" />
                <path d="M25 90 L75 90" stroke="white" strokeWidth="2" />
                <path d="M30 85 L30 95" stroke="white" strokeWidth="2" />
                <path d="M50 85 L50 95" stroke="white" strokeWidth="2" />
                <path d="M70 85 L70 95" stroke="white" strokeWidth="2" />
              </svg>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold mb-6">Scientific Validation</h1>
            <p className="text-xl text-gray-300 mb-8 max-w-3xl">
              Rigorous validation by leading researchers in physics, mathematics, and quantum computing ensures the
              accuracy and reliability of Synaptiq's results.
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              <Button size="lg" className="bg-white text-black hover:bg-gray-200" asChild>
                <Link href="/beta">Join the Beta</Link>
              </Button>
              <Button size="lg" variant="outline" className="border-gray-700 text-white hover:bg-gray-800" asChild>
                <Link href="/docs/validation">
                  Validation Methodology <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Introduction */}
      <section className="py-20 container mx-auto px-4 max-w-4xl">
        <h2 className="text-3xl font-bold mb-8">The Foundation of Scientific Trust</h2>

        <div className="prose prose-lg prose-invert max-w-none">
          <p className="text-gray-300">
            In the rapidly evolving landscape of artificial intelligence and quantum computing, scientific validation
            stands as the critical differentiator between genuine innovation and unsubstantiated claims. At Synaptiq, we
            recognize that the value of our platform rests entirely on the accuracy and reliability of the results it
            produces. This understanding has led us to develop one of the most comprehensive validation frameworks in
            the industry, ensuring that every aspect of our platform meets the highest standards of scientific integrity
            and practical utility.
          </p>

          <p className="text-gray-300">
            Scientific validation at Synaptiq goes far beyond conventional software testing. Our approach integrates
            rigorous theoretical analysis, comprehensive empirical testing, independent expert review, and continuous
            performance monitoring to create a multi-layered validation framework. This framework ensures that our
            quantum simulations, scientific language model, and analytical tools not only function as intended but
            produce results that accurately reflect physical reality and can be trusted as the basis for important
            research decisions and scientific conclusions.
          </p>

          <p className="text-gray-300">
            The importance of this validation cannot be overstated. In scientific research, incorrect or misleading
            results can lead to wasted resources, misguided research directions, and potentially harmful applications.
            This is particularly true in emerging fields like quantum computing, where intuition is still developing and
            conventional wisdom may not apply. By establishing a rigorous validation framework, we provide researchers
            with the confidence they need to incorporate advanced computational techniques into their work, knowing that
            the results reflect genuine physical insights rather than algorithmic artifacts or implementation errors.
          </p>

          <p className="text-gray-300">
            Our validation approach is also distinguished by its transparency. We believe that true scientific
            validation requires openness about methods, limitations, and uncertainties. For each capability on our
            platform, we provide detailed documentation of our validation methodology, benchmark results against
            established standards, and clear indications of the conditions under which results may be less reliable.
            This transparency enables users to make informed judgments about the applicability of our tools to their
            specific research questions and to interpret results with appropriate context and caution.
          </p>

          <p className="text-gray-300">
            Perhaps most importantly, our commitment to validation is ongoing rather than a one-time effort. As our
            platform evolves with new capabilities and applications, our validation framework evolves in parallel,
            ensuring that every feature meets our stringent standards before reaching users. This continuous validation
            process incorporates feedback from users, advances in the scientific literature, and insights from our
            expert advisors, creating a dynamic system that maintains scientific integrity even as the boundaries of
            what's possible continue to expand.
          </p>
        </div>
      </section>

      {/* Validation Framework */}
      <section className="py-20 bg-gray-950 border-y border-gray-800">
        <div className="container mx-auto px-4 max-w-4xl">
          <h2 className="text-3xl font-bold mb-12 text-center">Our Validation Framework</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
            <div className="bg-black p-6 rounded-lg border border-gray-800">
              <div className="flex items-center mb-4">
                <BookOpen className="h-8 w-8 text-white mr-3" />
                <h3 className="text-xl font-semibold">Theoretical Validation</h3>
              </div>
              <p className="text-gray-300 mb-4">
                Every algorithm and model in our platform is grounded in established scientific principles and
                mathematical formalism. Our theoretical validation ensures that our implementations correctly represent
                the underlying physics and mathematics.
              </p>
              <ul className="space-y-2">
                <FeatureItem>Mathematical proof verification</FeatureItem>
                <FeatureItem>Consistency with physical laws</FeatureItem>
                <FeatureItem>Boundary condition analysis</FeatureItem>
                <FeatureItem>Asymptotic behavior verification</FeatureItem>
              </ul>
            </div>

            <div className="bg-black p-6 rounded-lg border border-gray-800">
              <div className="flex items-center mb-4">
                <BookOpen className="h-8 w-8 text-white mr-3" />
                <h3 className="text-xl font-semibold">Empirical Validation</h3>
              </div>
              <p className="text-gray-300 mb-4">
                We rigorously test our simulations and models against experimental data and established benchmarks. This
                empirical validation ensures that our platform produces results that match real-world observations
                across diverse scenarios.
              </p>
              <ul className="space-y-2">
                <FeatureItem>Comparison with experimental data</FeatureItem>
                <FeatureItem>Benchmark against established standards</FeatureItem>
                <FeatureItem>Cross-validation with alternative methods</FeatureItem>
                <FeatureItem>Sensitivity analysis for parameter robustness</FeatureItem>
              </ul>
            </div>

            <div className="bg-black p-6 rounded-lg border border-gray-800">
              <div className="flex items-center mb-4">
                <Users className="h-8 w-8 text-white mr-3" />
                <h3 className="text-xl font-semibold">Expert Review</h3>
              </div>
              <p className="text-gray-300 mb-4">
                Our platform undergoes continuous review by leading experts in relevant scientific fields. This expert
                validation ensures that our approaches align with current scientific understanding and best practices.
              </p>
              <ul className="space-y-2">
                <FeatureItem>Advisory board of scientific leaders</FeatureItem>
                <FeatureItem>Peer review of methodologies</FeatureItem>
                <FeatureItem>Domain expert consultation</FeatureItem>
                <FeatureItem>Academic collaboration and publication</FeatureItem>
              </ul>
            </div>

            <div className="bg-black p-6 rounded-lg border border-gray-800">
              <div className="flex items-center mb-4">
                <Award className="h-8 w-8 text-white mr-3" />
                <h3 className="text-xl font-semibold">Performance Validation</h3>
              </div>
              <p className="text-gray-300 mb-4">
                We continuously monitor the performance of our platform across diverse use cases and scenarios. This
                performance validation ensures reliability, reproducibility, and practical utility for real-world
                research applications.
              </p>
              <ul className="space-y-2">
                <FeatureItem>Reproducibility testing</FeatureItem>
                <FeatureItem>Uncertainty quantification</FeatureItem>
                <FeatureItem>Edge case analysis</FeatureItem>
                <FeatureItem>Long-term stability assessment</FeatureItem>
              </ul>
            </div>
          </div>

          <div className="prose prose-lg prose-invert max-w-none">
            <p className="text-gray-300">
              These four pillars of validation work together to create a comprehensive framework that ensures the
              scientific integrity of our platform. By combining theoretical rigor, empirical testing, expert oversight,
              and performance monitoring, we provide a level of validation that goes beyond industry standards and
              establishes a new benchmark for scientific computing platforms.
            </p>

            <p className="text-gray-300">
              Importantly, our validation framework is not static but evolves continuously in response to new scientific
              developments, emerging validation methodologies, and feedback from our user community. This dynamic
              approach ensures that our platform remains at the forefront of scientific reliability even as it expands
              to encompass new capabilities and application domains.
            </p>
          </div>
        </div>
      </section>

      {/* Validation in Practice */}
      <section className="py-20 container mx-auto px-4 max-w-4xl">
        <h2 className="text-3xl font-bold mb-12 text-center">Validation in Practice</h2>

        <div className="space-y-12 mb-16">
          <div className="bg-black p-8 rounded-lg border border-gray-800">
            <h3 className="text-2xl font-semibold mb-4">Quantum Circuit Simulation Validation</h3>
            <p className="text-gray-300 mb-6">
              Our quantum circuit simulations undergo rigorous validation to ensure they accurately represent quantum
              mechanical behavior. This validation process combines theoretical analysis, comparison with analytical
              solutions for tractable cases, and benchmarking against established quantum simulation frameworks.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-gray-900 p-4 rounded-lg">
                <h4 className="font-medium mb-2 text-white">Validation Approach</h4>
                <p className="text-sm text-gray-300">
                  We validate our quantum circuit simulations through comparison with analytical solutions for small
                  systems, cross-validation with established quantum simulation frameworks, and verification of expected
                  quantum phenomena such as interference and entanglement.
                </p>
              </div>
              <div className="bg-gray-900 p-4 rounded-lg">
                <h4 className="font-medium mb-2 text-white">Results</h4>
                <p className="text-sm text-gray-300">
                  Our quantum circuit simulations achieve over 99.9% fidelity with analytical solutions for systems up
                  to 20 qubits and maintain high agreement with established frameworks for larger systems, with
                  performance advantages in specific circuit configurations.
                </p>
              </div>
            </div>
          </div>

          <div className="bg-black p-8 rounded-lg border border-gray-800">
            <h3 className="text-2xl font-semibold mb-4">Scientific Language Model Validation</h3>
            <p className="text-gray-300 mb-6">
              Our scientific language model is validated through a combination of factual accuracy assessment, logical
              consistency evaluation, and expert review. This multi-faceted approach ensures that the model provides
              reliable information and reasoning across diverse scientific domains.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-gray-900 p-4 rounded-lg">
                <h4 className="font-medium mb-2 text-white">Validation Approach</h4>
                <p className="text-sm text-gray-300">
                  We validate our scientific language model through factual accuracy testing against scientific
                  literature, logical consistency evaluation using formal reasoning frameworks, and blind expert review
                  of model outputs across multiple scientific domains.
                </p>
              </div>
              <div className="bg-gray-900 p-4 rounded-lg">
                <h4 className="font-medium mb-2 text-white">Results</h4>
                <p className="text-sm text-gray-300">
                  Our model demonstrates 87% factual accuracy on specialized scientific benchmarks, 92% logical
                  consistency in multi-step reasoning tasks, and receives positive expert assessment for 83% of
                  responses across physics, chemistry, and mathematics domains.
                </p>
              </div>
            </div>
          </div>

          <div className="bg-black p-8 rounded-lg border border-gray-800">
            <h3 className="text-2xl font-semibold mb-4">Molecular Simulation Validation</h3>
            <p className="text-gray-300 mb-6">
              Our molecular simulation capabilities are validated through comparison with experimental data, established
              computational chemistry methods, and theoretical predictions. This validation ensures that our simulations
              provide reliable insights into molecular structure and behavior.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-gray-900 p-4 rounded-lg">
                <h4 className="font-medium mb-2 text-white">Validation Approach</h4>
                <p className="text-sm text-gray-300">
                  We validate our molecular simulations through comparison with experimental spectroscopic data,
                  cross-validation with established computational chemistry methods, and verification of conformance
                  with theoretical predictions for model systems.
                </p>
              </div>
              <div className="bg-gray-900 p-4 rounded-lg">
                <h4 className="font-medium mb-2 text-white">Results</h4>
                <p className="text-sm text-gray-300">
                  Our molecular simulations achieve mean absolute errors below 1.5 kcal/mol for binding energies
                  compared to experimental data, outperforming classical methods by 35-40% for strongly correlated
                  systems while maintaining computational efficiency.
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="prose prose-lg prose-invert max-w-none">
          <p className="text-gray-300">
            These examples illustrate our validation approach in practice, but they represent only a small fraction of
            the comprehensive validation work that underlies our platform. For every capability we offer, we maintain
            detailed validation documentation that outlines the specific methodologies, benchmarks, and results that
            support its scientific reliability.
          </p>

          <p className="text-gray-300">
            We believe that this level of validation transparency is essential for scientific computing platforms,
            particularly those operating at the cutting edge of fields like quantum computing and artificial
            intelligence. By providing clear evidence of validation and acknowledging limitations where they exist, we
            enable users to make informed decisions about the applicability of our tools to their specific research
            questions and to interpret results with appropriate context.
          </p>
        </div>
      </section>

      {/* Validation Team */}
      <section className="py-20 bg-gray-950 border-y border-gray-800">
        <div className="container mx-auto px-4 max-w-4xl">
          <h2 className="text-3xl font-bold mb-12 text-center">Our Validation Team</h2>

          <div className="prose prose-lg prose-invert max-w-none mb-16">
            <p className="text-gray-300">
              Behind Synaptiq's rigorous validation framework stands a team of dedicated scientists and engineers with
              expertise spanning quantum physics, computational chemistry, machine learning, and software verification.
              This multidisciplinary team works collaboratively to design and implement validation methodologies that
              ensure the scientific integrity of our platform across diverse application domains.
            </p>

            <p className="text-gray-300">
              Our internal validation team is complemented by an external advisory board comprising leading researchers
              from prestigious academic institutions and research organizations. These advisors provide independent
              oversight of our validation methodologies, review validation results, and offer guidance on emerging
              validation approaches and standards. This combination of internal expertise and external oversight creates
              a robust system of checks and balances that maintains the highest standards of scientific validation.
            </p>

            <p className="text-gray-300">
              Beyond our formal validation structures, we actively engage with the broader scientific community through
              academic collaborations, conference presentations, and peer-reviewed publications. This engagement ensures
              that our validation approaches remain aligned with evolving best practices and benefit from the collective
              wisdom of the scientific community. It also provides opportunities for independent verification of our
              methods and results, further strengthening the credibility of our platform.
            </p>

            <p className="text-gray-300">
              We also recognize the invaluable role that our users play in the validation process. The diverse
              applications and use cases explored by our user community provide real-world testing that complements our
              formal validation procedures. We actively solicit feedback on the accuracy and reliability of our platform
              and incorporate this feedback into our continuous improvement process. This collaborative approach to
              validation ensures that our platform meets the practical needs of researchers while maintaining rigorous
              scientific standards.
            </p>
          </div>
        </div>
      </section>

      {/* Future of Validation */}
      <section className="py-20 container mx-auto px-4 max-w-4xl">
        <h2 className="text-3xl font-bold mb-12 text-center">The Future of Scientific Validation</h2>

        <div className="prose prose-lg prose-invert max-w-none mb-16">
          <p className="text-gray-300">
            As scientific computing continues to advance into new frontiers like quantum computing and advanced AI, the
            importance of rigorous validation will only increase. At Synaptiq, we are not only committed to maintaining
            the highest standards of validation for our current capabilities but also to pioneering new approaches to
            validation that address the unique challenges of emerging technologies.
          </p>

          <p className="text-gray-300">
            One key area of focus is the development of validation methodologies for quantum advantage claims. As
            quantum computing approaches the threshold where it can outperform classical computing for certain tasks,
            validating these claims becomes increasingly challenging since direct verification may not be possible using
            classical methods. We are developing innovative approaches to validation that combine theoretical
            guarantees, partial verification, and consistency checks to provide confidence in quantum advantage results
            without requiring full classical verification.
          </p>

          <p className="text-gray-300">
            Another important direction is the validation of AI-assisted scientific discovery. As AI systems like our
            scientific language model play an increasingly active role in the scientific process, validating their
            contributions requires new approaches that go beyond traditional accuracy metrics. We are developing
            frameworks for evaluating the novelty, plausibility, and utility of AI-generated scientific hypotheses and
            insights, ensuring that these tools enhance human scientific creativity rather than misleading it.
          </p>

          <p className="text-gray-300">
            We are also exploring the potential of formal verification methods for certain aspects of our platform.
            Formal verification uses mathematical techniques to prove that software behaves exactly as specified,
            providing a level of certainty that goes beyond traditional testing approaches. While formal verification is
            not feasible for all aspects of complex scientific software, we are identifying components where it can be
            applied effectively to further strengthen our validation framework.
          </p>

          <p className="text-gray-300">
            Perhaps most importantly, we are committed to making validation an integral part of the scientific computing
            ecosystem rather than an afterthought. This means not only validating our own platform but also contributing
            to the development of validation standards, benchmarks, and methodologies that can benefit the entire field.
            By advancing the science of validation alongside the technologies we develop, we aim to ensure that the
            extraordinary potential of quantum computing and AI for scientific discovery is realized in a way that
            maintains the highest standards of scientific integrity.
          </p>
        </div>
      </section>

      {/* Beta CTA */}
      <section className="py-20 container mx-auto px-4">
        <div className="bg-gradient-to-r from-gray-900 to-black rounded-2xl p-8 md:p-12 border border-gray-800">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">Experience Validated Scientific Computing</h2>
            <p className="text-xl text-gray-300 mb-8">
              Join our beta program to access a platform where scientific integrity meets cutting-edge technology.
            </p>
            <div className="prose prose-lg prose-invert max-w-none mb-8">
              <p className="text-gray-300">
                In an era of rapid technological advancement, the distinction between genuine scientific tools and
                unvalidated prototypes has never been more important. By joining Synaptiq's beta program, you gain
                access to a platform where every capability has been rigorously validated to ensure scientific accuracy
                and reliability. This validation provides the confidence you need to incorporate advanced computational
                techniques into your research, knowing that the results reflect genuine physical insights rather than
                algorithmic artifacts or implementation errors.
              </p>
              <p className="text-gray-300">
                As a beta participant, you'll also have the opportunity to contribute to our validation process. Your
                real-world applications and feedback will help us refine our validation methodologies and ensure that
                our platform meets the practical needs of researchers across disciplines. This collaborative approach to
                validation creates a virtuous cycle where our platform becomes increasingly reliable and valuable as it
                adapts to the diverse challenges of scientific research.
              </p>
              <p className="text-gray-300">
                Don't compromise on scientific integrity. Join our beta program today and experience the difference that
                rigorous validation makes in scientific computing.
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
