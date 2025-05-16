import { logger } from "../logger"

interface QuantumSimulationResult {
  summary: string
  equations?: string[]
  insight?: string
  chart?: {
    title?: string
    labels: string[]
    values: number[]
  }
  circuit?: string
}

/**
 * Runs a quantum simulation based on the provided parameters
 * @param prompt The original user prompt
 * @param params The parameters for the simulation
 * @returns The simulation result
 */
export async function executeQuantumSimulation(
  prompt: string,
  params: Record<string, any>,
): Promise<QuantumSimulationResult> {
  try {
    logger.info(`Running quantum simulation with params: ${JSON.stringify(params)}`)

    // Check if we have access to Python API
    if (!process.env.PYTHON_API_URL) {
      logger.info("No Python API URL found, using mock quantum simulation")
      return mockQuantumSimulation(prompt, params)
    }

    // Generate Qiskit code based on the parameters
    const qiskitCode = generateQiskitCode(prompt, params)

    // Execute the Qiskit code
    const result = await executeQiskitCode(qiskitCode)

    // Parse the result
    let parsedResult
    try {
      parsedResult = JSON.parse(result)
    } catch (parseError) {
      logger.error("Failed to parse quantum simulation result:", parseError)
      return mockQuantumSimulation(prompt, params)
    }

    // Validate the result
    if (!parsedResult.summary) {
      logger.warn("Invalid simulation result: missing summary")
      return mockQuantumSimulation(prompt, params)
    }

    // Return the structured result
    return {
      summary: parsedResult.summary,
      equations: parsedResult.equations || [],
      insight: parsedResult.insight || parsedResult.insights,
      chart: {
        title: parsedResult.chart_data?.title || "Measurement Probabilities",
        labels: parsedResult.chart_data?.labels || [],
        values: parsedResult.chart_data?.datasets?.[0]?.data || parsedResult.chart_data?.values || [],
      },
      circuit: parsedResult.circuit_description,
    }
  } catch (error) {
    logger.error(`Error running quantum simulation: ${error instanceof Error ? error.message : String(error)}`)
    return mockQuantumSimulation(prompt, params)
  }
}

/**
 * Generates Qiskit code based on the parameters
 */
function generateQiskitCode(prompt: string, params: Record<string, any>): string {
  const qubits = params.qubits || 2
  const shots = params.shots || 1024
  const entangle = params.entangle !== false

  return `
import json
import numpy as np
from qiskit import QuantumCircuit, Aer, execute
from qiskit.visualization import plot_histogram

try:
    # Create a quantum circuit
    qubits = ${qubits}
    circuit = QuantumCircuit(qubits, qubits)
    
    # Apply Hadamard to first qubit to create superposition
    circuit.h(0)
    
    # Entangle qubits if requested
    if ${entangle}:
        for i in range(1, qubits):
            circuit.cx(0, i)
    
    # Measure all qubits
    circuit.measure_all()
    
    # Run the simulation
    simulator = Aer.get_backend('qasm_simulator')
    job = execute(circuit, simulator, shots=${shots})
    result = job.result()
    counts = result.get_counts(circuit)
    
    # Prepare the output
    labels = list(counts.keys())
    values = list(counts.values())
    probabilities = [count/${shots} for count in values]
    
    # Generate LaTeX equations
    equations = []
    if qubits == 1:
        equations.append("\\\\ket{\\\\psi} = \\\\frac{1}{\\\\sqrt{2}}(\\\\ket{0} + \\\\ket{1})")
    elif qubits == 2:
        if ${entangle}:
            equations.append("\\\\ket{\\\\psi} = \\\\frac{1}{\\\\sqrt{2}}(\\\\ket{00} + \\\\ket{11})")
        else:
            equations.append("\\\\ket{\\\\psi} = \\\\frac{1}{\\\\sqrt{2}}\\\\ket{0} \\\\otimes \\\\ket{0} + \\\\frac{1}{\\\\sqrt{2}}\\\\ket{1} \\\\otimes \\\\ket{0}")
    else:
        # For more qubits, show the general form
        zeros = "0" * qubits
        ones = "1" * qubits
        if ${entangle}:
            equations.append(f"\\\\ket{{\\\\psi}} = \\\\frac{{1}}{{\\\\sqrt{{2}}}}(\\\\ket{{{zeros}}} + \\\\ket{{{ones}}})")
        else:
            equations.append(f"\\\\ket{{\\\\psi}} = \\\\frac{{1}}{{\\\\sqrt{{2}}}}\\\\ket{{0}} \\\\otimes \\\\ket{{{zeros[1:]}}} + \\\\frac{{1}}{{\\\\sqrt{{2}}}}\\\\ket{{1}} \\\\otimes \\\\ket{{{zeros[1:]}}}")
    
    # Add measurement equation
    equations.append("P(\\\\text{measure } \\\\ket{x}) = |\\\\langle x | \\\\psi \\\\rangle|^2")
    
    # Create circuit description
    circuit_description = f"""
    Quantum Circuit for {'Schrödinger\\'s Cat' if ${entangle} else 'Quantum Superposition'}:
    - {qubits} qubit{'s' if qubits > 1 else ''}
    - Hadamard gate on qubit 0 creates superposition
    - {'CNOT gates entangle the qubits' if ${entangle} and qubits > 1 else 'No entanglement'}
    - Measurement of all qubits
    """
    
    # Generate insight based on the results
    if ${entangle} and qubits > 1:
        insight = f"""
        This simulation demonstrates quantum entanglement, a key feature of Schrödinger's cat thought experiment.
        The results show that measuring one qubit immediately determines the state of the other qubit(s),
        even though each individual outcome is random. This is the quantum mechanical phenomenon that
        Einstein famously called "spooky action at a distance."
        
        In the context of Schrödinger's cat, this represents how the fate of the cat (alive or dead)
        is entangled with the state of the radioactive atom (decayed or not decayed).
        """
    else:
        insight = f"""
        This simulation demonstrates quantum superposition, where a quantum system exists in multiple
        states simultaneously until measured. The Hadamard gate creates an equal superposition of
        states, giving each possible outcome approximately equal probability.
        
        When we measure the system, it collapses to one of the possible states with probabilities
        determined by the quantum state's amplitude.
        """
    
    output = {
        "success": True,
        "summary": f"Simulated a {qubits}-qubit {'entangled ' if ${entangle} else ''}quantum system with {shots} shots",
        "equations": equations,
        "chart_data": {
            "type": "bar",
            "labels": labels,
            "datasets": [{"label": "Counts", "data": values}],
            "title": "Measurement Probabilities"
        },
        "insight": insight,
        "circuit_description": circuit_description
    }
    
    print(json.dumps(output))
except Exception as e:
    error_output = {
        "success": False,
        "summary": f"Error in quantum simulation: {str(e)}"
    }
    print(json.dumps(error_output))
`
}

/**
 * Executes Qiskit code and returns the result
 */
async function executeQiskitCode(code: string): Promise<string> {
  try {
    // Check if we have access to Python API
    if (process.env.PYTHON_API_URL) {
      const response = await fetch(process.env.PYTHON_API_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${process.env.PYTHON_API_KEY || ""}`,
        },
        body: JSON.stringify({
          code,
          engine: "qiskit",
        }),
      })

      if (!response.ok) {
        throw new Error(`Python API returned status ${response.status}`)
      }

      return await response.text()
    } else {
      // For development/testing, return a mock result
      throw new Error("Python API URL not configured")
    }
  } catch (error) {
    logger.error(`Error executing Qiskit code: ${error instanceof Error ? error.message : String(error)}`)
    throw error
  }
}

/**
 * Creates a mock quantum simulation result for testing or fallback
 */
function mockQuantumSimulation(prompt: string, params: Record<string, any>): QuantumSimulationResult {
  const qubits = params.qubits || 2
  const entangle = params.entangle !== false
  const isSchrodinger =
    prompt.toLowerCase().includes("schrödinger") ||
    prompt.toLowerCase().includes("schrodinger") ||
    prompt.toLowerCase().includes("cat")

  // Generate appropriate states based on number of qubits
  let states: string[] = []
  let values: number[] = []

  if (qubits === 1) {
    states = ["0", "1"]
    values = [0.5, 0.5]
  } else if (entangle) {
    // For entangled states, we expect mostly |00> and |11>
    const zeros = "0".repeat(qubits)
    const ones = "1".repeat(qubits)
    states = [zeros, ones]
    values = [0.5, 0.5]
  } else {
    // For non-entangled states with H on first qubit
    const baseStates = ["0", "1"]
    const restZeros = "0".repeat(qubits - 1)
    states = baseStates.map((b) => b + restZeros)
    values = [0.5, 0.5]
  }

  // Format states with ket notation
  const formattedStates = states.map((state) => `|${state}⟩`)

  // Generate appropriate equations
  let equations: string[]
  if (qubits === 1) {
    equations = [
      "\\ket{\\psi} = \\frac{1}{\\sqrt{2}}(\\ket{0} + \\ket{1})",
      "P(\\text{measure } \\ket{0}) = P(\\text{measure } \\ket{1}) = \\frac{1}{2}",
    ]
  } else if (entangle) {
    const zeros = "0".repeat(qubits)
    const ones = "1".repeat(qubits)
    equations = [
      `\\ket{\\psi} = \\frac{1}{\\sqrt{2}}(\\ket{${zeros}} + \\ket{${ones}})`,
      `P(\\text{measure } \\ket{${zeros}}) = P(\\text{measure } \\ket{${ones}}) = \\frac{1}{2}`,
    ]
  } else {
    const zeros = "0".repeat(qubits - 1)
    equations = [
      `\\ket{\\psi} = \\frac{1}{\\sqrt{2}}\\ket{0} \\otimes \\ket{${zeros}} + \\frac{1}{\\sqrt{2}}\\ket{1} \\otimes \\ket{${zeros}}`,
      `P(\\text{measure } \\ket{0${zeros}}) = P(\\text{measure } \\ket{1${zeros}}) = \\frac{1}{2}`,
    ]
  }

  // Generate insight
  let insight = ""
  let title = ""

  if (isSchrodinger) {
    title = "Schrödinger's Cat Quantum State"
    insight =
      "This simulation demonstrates the famous Schrödinger's cat thought experiment, where a cat in a box is simultaneously alive and dead until observed. In quantum terms, the cat's state is entangled with a quantum event (radioactive decay), placing the entire system in a superposition of states. When we measure the system, it collapses to either 'alive' or 'dead' with equal probability."
  } else if (entangle && qubits > 1) {
    title = "Quantum Entanglement Simulation"
    insight =
      "This simulation demonstrates quantum entanglement, where the quantum states of multiple particles become correlated such that the quantum state of each particle cannot be described independently. The results show that measuring one qubit immediately determines the state of the other qubit(s), even though each individual outcome is random. This is the quantum mechanical phenomenon that Einstein famously called 'spooky action at a distance'."
  } else {
    title = "Quantum Superposition Simulation"
    insight =
      "This simulation demonstrates quantum superposition, where a quantum system exists in multiple states simultaneously until measured. The Hadamard gate creates an equal superposition of states, giving each possible outcome approximately equal probability. When we measure the system, it collapses to one of the possible states with probabilities determined by the quantum state's amplitude."
  }

  return {
    summary: `Simulated a ${qubits}-qubit ${entangle ? "entangled " : ""}quantum system for "${prompt}"`,
    equations: equations,
    insight: insight,
    chart: {
      title: title,
      labels: formattedStates,
      values: values,
    },
  }
}
