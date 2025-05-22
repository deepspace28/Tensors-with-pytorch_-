// Update this file to use our secure API route instead of directly accessing the API key

export async function runSimulation(
  prompt: string,
  options?: {
    model?: string
    temperature?: number
    maxTokens?: number
  },
) {
  try {
    // Use our secure API route instead of directly using the API key
    const response = await fetch("/api/simulate", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        prompt,
        temperature: options?.temperature || 0.7,
        maxTokens: options?.maxTokens || 1024,
      }),
    })

    if (!response.ok) {
      throw new Error(`Error from API: ${response.statusText}`)
    }

    const data = await response.json()
    return data
  } catch (error) {
    console.error("Error in simulation:", error)
    throw error
  }
}
