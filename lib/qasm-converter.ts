/**
 * Converts a gate-based quantum circuit description to OpenQASM 2.0 format
 */
export function convertToQASM(input: {
  qubits: number
  gates: Array<{
    name: string
    target?: number
    control?: number
    targets?: number[]
    controls?: number[]
    angle?: number
  }>
  measure: number[]
  initial_states?: string[]
}): string {
  // Start with QASM header
  const qasm = ["OPENQASM 2.0;", 'include "qelib1.inc";', `qreg q[${input.qubits}];`, `creg c[${input.qubits}];`]

  // Handle initial states if provided
  if (input.initial_states) {
    for (let i = 0; i < input.initial_states.length; i++) {
      const state = input.initial_states[i]
      if (state === "|1>") {
        qasm.push(`x q[${i}];`) // Apply X gate to flip from |0> to |1>
      } else if (state === "|+>") {
        qasm.push(`h q[${i}];`) // Apply H gate to create |+> state
      } else if (state === "|->") {
        qasm.push(`x q[${i}];`) // First flip to |1>
        qasm.push(`h q[${i}];`) // Then apply H to create |-> state
      }
      // |0> is the default state, so no gates needed
    }
  }

  // Add gates
  for (const gate of input.gates) {
    switch (gate.name.toLowerCase()) {
      case "hadamard":
      case "h":
        qasm.push(`h q[${gate.target}];`)
        break
      case "cnot":
      case "cx":
        qasm.push(`cx q[${gate.control}], q[${gate.target}];`)
        break
      case "x":
      case "pauli-x":
      case "not":
        qasm.push(`x q[${gate.target}];`)
        break
      case "y":
      case "pauli-y":
        qasm.push(`y q[${gate.target}];`)
        break
      case "z":
      case "pauli-z":
        qasm.push(`z q[${gate.target}];`)
        break
      case "s":
      case "phase":
        qasm.push(`s q[${gate.target}];`)
        break
      case "t":
        qasm.push(`t q[${gate.target}];`)
        break
      case "rx":
        const rxAngle = gate.angle || 0
        qasm.push(`rx(${rxAngle}) q[${gate.target}];`)
        break
      case "ry":
        const ryAngle = gate.angle || 0
        qasm.push(`ry(${ryAngle}) q[${gate.target}];`)
        break
      case "rz":
        const rzAngle = gate.angle || 0
        qasm.push(`rz(${rzAngle}) q[${gate.target}];`)
        break
      case "swap":
        qasm.push(`swap q[${gate.targets?.[0]}], q[${gate.targets?.[1]}];`)
        break
      case "toffoli":
      case "ccx":
        qasm.push(`ccx q[${gate.controls?.[0]}], q[${gate.controls?.[1]}], q[${gate.target}];`)
        break
      default:
        console.warn(`Unsupported gate: ${gate.name}`)
    }
  }

  // Add measurements
  for (const m of input.measure) {
    qasm.push(`measure q[${m}] -> c[${m}];`)
  }

  return qasm.join("\n")
}

/**
 * Creates a Bell state QASM program
 */
export function createBellStateQASM(qubits = 2): string {
  return `OPENQASM 2.0;
include "qelib1.inc";
qreg q[${qubits}];
creg c[${qubits}];
h q[0];
cx q[0], q[1];
measure q[0] -> c[0];
measure q[1] -> c[1];`
}

/**
 * Creates a GHZ state QASM program
 */
export function createGHZStateQASM(qubits = 3): string {
  const qasm = ["OPENQASM 2.0;", 'include "qelib1.inc";', `qreg q[${qubits}];`, `creg c[${qubits}];`, "h q[0];"]

  // Add CNOT gates to entangle all qubits
  for (let i = 0; i < qubits - 1; i++) {
    qasm.push(`cx q[${i}], q[${i + 1}];`)
  }

  // Add measurements
  for (let i = 0; i < qubits; i++) {
    qasm.push(`measure q[${i}] -> c[${i}];`)
  }

  return qasm.join("\n")
}
