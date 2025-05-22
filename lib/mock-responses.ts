import type { ChatMode } from "@/lib/direct-groq-client"

// Generate a mock response for development/testing
export function generateMockResponse(query: string, mode: ChatMode): string {
  // Clean the query for display
  const cleanQuery = query.trim().replace(/"/g, '\\"')

  if (mode === "reason") {
    return `
# Reasoning Analysis: "${cleanQuery}"

Let me think through this step by step:

## Initial Analysis
First, I need to understand what's being asked. This appears to be a question about ${getQueryTopic(cleanQuery)}.

## Breaking Down the Problem
1. **Key components**: ${getRandomKeyComponents()}
2. **Relevant principles**: ${getRandomPrinciples()}
3. **Potential approaches**: ${getRandomApproaches()}

## Logical Reasoning
${getRandomReasoning()}

## Conclusion
Based on the analysis above, I can conclude that ${getRandomConclusion()}.

Would you like me to elaborate on any specific part of this reasoning process?
`.trim()
  } else if (mode === "search") {
    return `
# Search Results for: "${cleanQuery}"

[MOCK SEARCH RESPONSE]

Based on the latest information available, here's what I found about ${getQueryTopic(cleanQuery)}:

## Key Information
${getRandomSearchResults()}

## Scientific Context
${getRandomScientificContext()}

## Related Concepts
${getRandomRelatedConcepts()}

Note: This is a simulated search response for development purposes. In production, this would contain real-time information from the web.
`.trim()
  } else {
    // Default scientific response
    return `
# ${getQueryTopic(cleanQuery)}

${getRandomScientificExplanation()}

## Mathematical Formulation
${getRandomMathematicalFormulation()}

## Applications
${getRandomApplications()}

## Current Research
${getRandomCurrentResearch()}

This is a simulated response for development purposes. In production, this would be a comprehensive scientific explanation from the Groq API.
`.trim()
  }
}

// Helper functions to generate random content
function getQueryTopic(query: string): string {
  const topics = [
    "quantum mechanics",
    "relativity theory",
    "differential equations",
    "mathematical physics",
    "computational science",
    "theoretical physics",
    "quantum computing",
    "statistical mechanics",
    "astrophysics",
    "particle physics",
  ]

  // Try to extract a topic from the query, or use a random one
  const lowerQuery = query.toLowerCase()
  for (const topic of topics) {
    if (lowerQuery.includes(topic)) {
      return topic
    }
  }

  return topics[Math.floor(Math.random() * topics.length)]
}

function getRandomKeyComponents(): string {
  const components = [
    "variables, constraints, and objectives",
    "initial conditions, boundary values, and differential operators",
    "quantum states, operators, and measurement probabilities",
    "energy levels, transition rates, and selection rules",
    "axioms, theorems, and logical implications",
  ]
  return components[Math.floor(Math.random() * components.length)]
}

function getRandomPrinciples(): string {
  const principles = [
    "conservation of energy, momentum, and angular momentum",
    "uncertainty principle, superposition, and entanglement",
    "equivalence principle, geodesic motion, and spacetime curvature",
    "laws of thermodynamics, entropy maximization, and statistical equilibrium",
    "mathematical induction, proof by contradiction, and axiomatic reasoning",
  ]
  return principles[Math.floor(Math.random() * principles.length)]
}

function getRandomApproaches(): string {
  const approaches = [
    "analytical solution using differential equations",
    "numerical simulation with finite element methods",
    "perturbation theory for approximate solutions",
    "variational methods to find energy minima",
    "statistical sampling with Monte Carlo techniques",
  ]
  return approaches[Math.floor(Math.random() * approaches.length)]
}

function getRandomReasoning(): string {
  const reasoning = [
    "When we apply the principle of superposition to this problem, we find that the system can exist in multiple states simultaneously. This leads to interference effects that are purely quantum mechanical in nature. The probability amplitudes combine according to the rules of quantum mechanics, giving us $$P(x) = |\\psi(x)|^2$$ for the probability density.",

    "Starting with the fundamental equation $$F = ma$$, we can derive the equations of motion for this system. For conservative forces, we can also use the principle of least action, which states that the path taken by the system minimizes the action integral $$S = \\int_{t_1}^{t_2} L(q, \\dot{q}, t) dt$$, where $$L$$ is the Lagrangian.",

    "The differential equation $$\\frac{dy}{dx} = f(x,y)$$ can be solved using separation of variables if it's separable, or by finding an integrating factor if it's first-order linear. For second-order equations, we often look for homogeneous and particular solutions, then combine them.",

    "By applying Bayes' theorem, $$P(A|B) = \\frac{P(B|A)P(A)}{P(B)}$$, we can update our prior beliefs based on new evidence. This forms the foundation of Bayesian inference and allows us to quantify uncertainty in a rigorous way.",

    "The system can be modeled as a Markov process, where future states depend only on the current state, not on the sequence of events that preceded it. This property allows us to use the transition matrix $$P$$ to calculate the probability distribution after $$n$$ steps as $$\\pi^{(n)} = \\pi^{(0)}P^n$$.",
  ]
  return reasoning[Math.floor(Math.random() * reasoning.length)]
}

function getRandomConclusion(): string {
  const conclusions = [
    "the system will evolve according to the time-dependent Schrödinger equation, with observable quantities emerging from the expectation values of the corresponding operators",
    "the solution exists and is unique according to the Picard–Lindelöf theorem, since our function satisfies the Lipschitz condition in the domain of interest",
    "the apparent paradox is resolved when we consider the relativistic effects, which become significant at speeds approaching the speed of light",
    "statistical fluctuations are inevitable in any finite sample, but the law of large numbers ensures convergence to the true value as the sample size increases",
    "quantum entanglement provides a resource for quantum information processing that has no classical analog, enabling tasks that would be impossible with classical systems",
  ]
  return conclusions[Math.floor(Math.random() * conclusions.length)]
}

function getRandomSearchResults(): string {
  const results = [
    "Recent research published in Nature (2023) demonstrates significant advances in this field, with experimental confirmation of theoretical predictions made over a decade ago.",
    "According to the latest data from CERN, the experimental results align with Standard Model predictions within the margin of error, though some anomalies warrant further investigation.",
    "A comprehensive meta-analysis published in Science (2022) synthesized findings from 42 independent studies, showing a strong consensus on the fundamental principles despite methodological variations.",
    "The NASA mission launched last year has been collecting data that challenges some of our previous assumptions, particularly regarding the distribution of dark matter in galaxy clusters.",
    "Recent computational models developed at MIT have achieved unprecedented accuracy in predicting complex system behaviors, reducing error rates by nearly 40% compared to previous approaches.",
  ]
  return results[Math.floor(Math.random() * results.length)]
}

function getRandomScientificContext(): string {
  const contexts = [
    "This phenomenon was first theorized by Einstein in 1915 but wasn't experimentally verified until the famous eclipse observations of 1919, which provided compelling evidence for general relativity.",
    "The quantum mechanical description revolutionized our understanding in the early 20th century, replacing the deterministic Newtonian framework with a probabilistic one that accounts for wave-particle duality.",
    "The mathematical formalism was developed independently by several researchers in the 1940s, but it wasn't until computational methods advanced in the 1980s that practical applications emerged.",
    "This principle represents one of the cornerstones of modern physics, connecting seemingly disparate fields through underlying symmetries and conservation laws.",
    "The theoretical framework has evolved significantly since its initial formulation, incorporating insights from quantum field theory, statistical mechanics, and information theory.",
  ]
  return contexts[Math.floor(Math.random() * contexts.length)]
}

function getRandomRelatedConcepts(): string {
  const concepts = [
    "- **Quantum Entanglement**: Non-local correlations between quantum systems\n- **Wave Function Collapse**: Transition from quantum superpositions to definite states\n- **Quantum Decoherence**: Loss of quantum coherence due to environmental interactions",
    "- **Spacetime Curvature**: Geometric interpretation of gravity in general relativity\n- **Event Horizons**: Boundaries beyond which events cannot affect an observer\n- **Gravitational Waves**: Ripples in spacetime propagating from massive accelerating objects",
    "- **Partial Differential Equations**: Mathematical tools for modeling continuous systems\n- **Boundary Value Problems**: Differential equations with specified boundary conditions\n- **Green's Functions**: Methods for solving inhomogeneous differential equations",
    "- **Statistical Ensembles**: Collections of microstates consistent with macroscopic constraints\n- **Phase Transitions**: Abrupt changes in system properties at critical points\n- **Renormalization Group**: Technique for analyzing systems at different length scales",
    "- **Computational Complexity**: Classification of problems by resource requirements\n- **Numerical Stability**: Resistance of algorithms to error propagation\n- **Parallel Computing**: Simultaneous execution of calculations for improved performance",
  ]
  return concepts[Math.floor(Math.random() * concepts.length)]
}

function getRandomScientificExplanation(): string {
  const explanations = [
    "Quantum mechanics describes nature at the smallest scales, where particles exhibit wave-like properties and physical quantities are quantized. The theory is built on mathematical formalism that uses wave functions to represent quantum states and operators to represent observable quantities. The Schrödinger equation governs how these quantum states evolve over time: $$i\\hbar\\frac{\\partial}{\\partial t}\\Psi(\\mathbf{r},t) = \\hat{H}\\Psi(\\mathbf{r},t)$$",

    "General relativity describes gravity as a geometric property of spacetime, which is curved by the presence of mass and energy. This curvature affects the path of objects moving through spacetime, creating what we perceive as gravitational attraction. The Einstein field equations relate the geometry of spacetime to the distribution of matter and energy: $$G_{\\mu\\nu} = \\frac{8\\pi G}{c^4}T_{\\mu\\nu}$$",

    "Thermodynamics studies energy transfer and conversion in physical systems. The laws of thermodynamics describe fundamental constraints on all physical processes, from microscopic particle interactions to cosmic phenomena. The second law introduces the concept of entropy, a measure of disorder that always increases in isolated systems: $$dS \\geq \\frac{\\delta Q}{T}$$",

    "Quantum field theory unifies quantum mechanics with special relativity, describing particles as excitations of underlying quantum fields that permeate all of spacetime. This framework provides the mathematical foundation for the Standard Model of particle physics, which classifies all known elementary particles and their interactions: $$\\mathcal{L} = \\mathcal{L}_{\\text{gauge}} + \\mathcal{L}_{\\text{fermion}} + \\mathcal{L}_{\\text{Higgs}} + \\mathcal{L}_{\\text{Yukawa}}$$",

    "Statistical mechanics connects microscopic properties of individual particles to macroscopic properties of materials. By applying probability theory to the behavior of large numbers of particles, it explains how microscopic randomness leads to predictable macroscopic behavior. The Boltzmann distribution gives the probability of a system being in a particular microstate: $$P(E_i) = \\frac{e^{-E_i/kT}}{Z}$$",
  ]
  return explanations[Math.floor(Math.random() * explanations.length)]
}

function getRandomMathematicalFormulation(): string {
  const formulations = [
    "The time-independent Schrödinger equation for a particle in a potential is given by:\n\n$$-\\frac{\\hbar^2}{2m}\\nabla^2\\psi(\\mathbf{r}) + V(\\mathbf{r})\\psi(\\mathbf{r}) = E\\psi(\\mathbf{r})$$\n\nwhere $\\psi(\\mathbf{r})$ is the wave function, $V(\\mathbf{r})$ is the potential energy, and $E$ is the total energy.",

    "The geodesic equation describing the path of a particle in curved spacetime is:\n\n$$\\frac{d^2 x^\\mu}{d\\tau^2} + \\Gamma^\\mu_{\\alpha\\beta}\\frac{dx^\\alpha}{d\\tau}\\frac{dx^\\beta}{d\\tau} = 0$$\n\nwhere $\\Gamma^\\mu_{\\alpha\\beta}$ are the Christoffel symbols that encode the spacetime curvature.",

    "The heat equation describing diffusion processes is given by:\n\n$$\\frac{\\partial u}{\\partial t} = \\alpha \\nabla^2 u$$\n\nwhere $u(\\mathbf{r},t)$ is the quantity being diffused (e.g., temperature) and $\\alpha$ is the diffusion coefficient.",

    "The partition function in statistical mechanics is defined as:\n\n$$Z = \\sum_i e^{-E_i/kT}$$\n\nwhere the sum is over all possible microstates $i$ with energies $E_i$, $k$ is Boltzmann's constant, and $T$ is temperature.",

    "The Lagrangian for a relativistic particle is given by:\n\n$$L = -mc^2\\sqrt{1-\\frac{v^2}{c^2}}$$\n\nwhich leads to the correct equations of motion when minimizing the action $S = \\int L dt$.",
  ]
  return formulations[Math.floor(Math.random() * formulations.length)]
}

function getRandomApplications(): string {
  const applications = [
    "Quantum mechanics forms the foundation for numerous technologies, including:\n- Semiconductor devices and transistors in modern electronics\n- Lasers and optical technologies\n- Magnetic resonance imaging (MRI) in medical diagnostics\n- Quantum computing and quantum cryptography",

    "Differential equations are essential tools in various fields:\n- Structural engineering for analyzing stress and strain\n- Fluid dynamics for designing aircraft and watercraft\n- Population modeling in ecology and epidemiology\n- Signal processing and control systems",

    "Statistical methods have transformative applications in:\n- Machine learning and artificial intelligence\n- Financial modeling and risk assessment\n- Quality control in manufacturing\n- Clinical trials and medical research",

    "Relativistic physics is crucial for:\n- Global Positioning System (GPS) satellite corrections\n- Particle accelerator design and operation\n- Understanding neutron stars and black holes\n- Gravitational wave astronomy",

    "Computational techniques enable advances in:\n- Drug discovery and molecular modeling\n- Weather forecasting and climate modeling\n- Materials science and nanotechnology\n- Optimization problems in logistics and operations research",
  ]
  return applications[Math.floor(Math.random() * applications.length)]
}

function getRandomCurrentResearch(): string {
  const research = [
    "Current research focuses on resolving the apparent contradictions between quantum mechanics and general relativity, with approaches including string theory, loop quantum gravity, and causal set theory. The development of a consistent theory of quantum gravity remains one of the greatest challenges in theoretical physics.",

    "Researchers are exploring quantum information science, investigating how quantum entanglement can be harnessed for computation, communication, and sensing. Quantum supremacy demonstrations have shown the potential for quantum computers to solve certain problems exponentially faster than classical computers.",

    "Advanced computational methods are being developed to solve previously intractable differential equations, enabling more accurate simulations of complex systems like climate models, fusion reactors, and biological processes. Machine learning techniques are increasingly being integrated with traditional numerical methods.",

    "The field of complex systems is studying emergence and self-organization in diverse systems, from neural networks to ecosystems to financial markets. These investigations are revealing universal patterns and principles that transcend traditional disciplinary boundaries.",

    "Experimental physics continues to probe the fundamental nature of reality, with projects like the Large Hadron Collider searching for new particles and interactions, and astronomical observatories collecting data that challenges our understanding of dark matter and dark energy.",
  ]
  return research[Math.floor(Math.random() * research.length)]
}
