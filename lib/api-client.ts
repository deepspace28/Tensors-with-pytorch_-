// Client-side API utility

// Get the API URL from environment variables
const API_URL = process.env.NEXT_PUBLIC_API_URL || ""

/**
 * Makes a request to the Groq API through our server-side proxy
 */
export async function callGroqAPI(prompt: string, systemPrompt?: string, model = "llama3-70b-8192") {
  try {
    const response = await fetch(`${API_URL}/api/groq-proxy`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        prompt,
        systemPrompt,
        model,
      }),
    })

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}))
      throw new Error(errorData.error || `API request failed with status ${response.status}`)
    }

    return await response.json()
  } catch (error) {
    console.error("Error calling Groq API:", error)
    throw error
  }
}

/**
 * Makes a request to the simulation API
 */
export async function callSimulationAPI(type: string, prompt: string) {
  try {
    const response = await fetch(`${API_URL}/api/simulations/${type}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ prompt }),
    })

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}))
      throw new Error(errorData.error || `API request failed with status ${response.status}`)
    }

    return await response.json()
  } catch (error) {
    console.error(`Error calling ${type} simulation API:`, error)
    throw error
  }
}
