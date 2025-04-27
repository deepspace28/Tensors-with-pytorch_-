import { MathRenderer } from "./math-renderer"

export function LatexTest() {
  const latexString = `
## Euler's Identity

Euler's identity is often cited as an example of mathematical beauty. It states:

\\[e^{i\\pi} + 1 = 0\\]

This equation connects five fundamental mathematical constants:

- \$$ e \$$: Euler's number, the base of the natural logarithm
- \$$ i \$$: The imaginary unit, defined as \$$ \\sqrt{-1} \$$
- \$$ \\pi \$$: Pi, the ratio of a circle's circumference to its diameter
- \$$ 1 \$$: The multiplicative identity
- \$$ 0 \$$: The additive identity

## Schrödinger Equation

The time-dependent Schrödinger equation:

\\[i\\hbar \\frac{\\partial}{\\partial t} \\Psi(\\mathbf{r}, t) = \\hat{H} \\Psi(\\mathbf{r}, t)\\]

Where:
- \$$ \\Psi(\\mathbf{r}, t) \$$ is the wave function
- \$$ i \$$ is the imaginary unit
- \$$ \\hbar \$$ is the reduced Planck constant
- \$$ \\hat{H} \$$ is the Hamiltonian operator

## Maxwell's Equations

Maxwell's equations in differential form:

1. Gauss's law:
   \\[\\nabla \\cdot \\mathbf{E} = \\frac{\\rho}{\\varepsilon_0}\\]

2. Gauss's law for magnetism:
   \\[\\nabla \\cdot \\mathbf{B} = 0\\]

3. Faraday's law of induction:
   \\[\\nabla \\times \\mathbf{E} = -\\frac{\\partial \\mathbf{B}}{\\partial t}\\]

4. Ampère's circuital law:
   \\[\\nabla \\times \\mathbf{B} = \\mu_0\\mathbf{J} + \\mu_0\\varepsilon_0\\frac{\\partial \\mathbf{E}}{\\partial t}\\]
`

  return (
    <div className="bg-gray-900 border border-gray-800 rounded-lg p-6">
      <MathRenderer text={latexString} />
    </div>
  )
}
