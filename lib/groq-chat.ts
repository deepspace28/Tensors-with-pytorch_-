// lib/groq-chat.ts

import type { Message } from "@/types/chat"

// Smart input classification logic
const isScientificLike = (input: string): boolean => {
  const keywords = [
    "quantum",
    "physics",
    "mechanics",
    "integral",
    "derivative",
    "laplace",
    "fourier",
    "solve",
    "proof",
    "matrix",
    "tensor",
    "wave",
    "particle",
    "electric",
    "magnetic",
    "equation",
    "simulation",
    "field",
    "lattice",
    "thermodynamics",
    "relativity",
    "hbar",
    "math",
    "formula",
    "calculate",
    "computation",
    "algorithm",
    "theory",
    "hypothesis",
    "experiment",
    "observation",
    "measurement",
    "constant",
    "variable",
    "function",
  ]

  const symbolPattern = /[\d=+\-*/^$$$${}[\]√∫∑πφ±×÷]/ // math signs

  return keywords.some((word) => input.toLowerCase().includes(word)) || symbolPattern.test(input)
}

export async function sendChatRequest(messages: Message[]) {
  try {
    // Check if the latest user message is scientific-like
    const latestUserMessage = [...messages].reverse().find((m) => m.role === "user")

    if (latestUserMessage && !isScientificLike(latestUserMessage.content)) {
      return "I'm designed for scientific domains like physics, mathematics, and quantum mechanics. Please try a question in one of those areas!"
    }

    // Use our secure API route instead of directly accessing external APIs
    const response = await fetch("/api/chat", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        messages: messages.map((m) => ({
          role: m.role,
          content: m.content,
        })),
      }),
    })

    if (!response.ok) {
      throw new Error(`API error: ${response.status}`)
    }

    const data = await response.json()
    return data.text || data.content || ""
  } catch (error) {
    console.error("Error in chat request:", error)
    throw error
  }
}
