// API client for making requests to our backend
export const ApiClient = {
  // Get the base URL with fallback
  getBaseUrl() {
    return (
      process.env.NEXT_PUBLIC_API_BASE_URL ||
      (typeof window !== "undefined" ? `${window.location.origin}/api` : "http://localhost:3000/api")
    )
  },

  // Chat API
  async sendChatMessage(messages: any[], mode = "normal") {
    try {
      const response = await fetch(`${this.getBaseUrl()}/chat`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          messages,
          mode,
        }),
      })

      if (!response.ok) {
        throw new Error(`API error: ${response.status}`)
      }

      return await response.json()
    } catch (error) {
      console.error("Error sending chat message:", error)
      throw error
    }
  },

  // Direct Groq API access from client (using public API key)
  async directGroqRequest(messages: any[], options: any = {}) {
    if (!process.env.NEXT_PUBLIC_GROQ_API_KEY) {
      throw new Error("GROQ_API_KEY is not configured for client-side access")
    }

    try {
      const response = await fetch("https://api.groq.com/openai/v1/chat/completions", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${process.env.NEXT_PUBLIC_GROQ_API_KEY}`,
        },
        body: JSON.stringify({
          model: options.model || "llama3-70b-8192",
          messages,
          temperature: options.temperature || 0.7,
          max_tokens: options.maxTokens || 4096,
        }),
      })

      if (!response.ok) {
        throw new Error(`Groq API error: ${response.status}`)
      }

      return await response.json()
    } catch (error) {
      console.error("Error making direct Groq request:", error)
      throw error
    }
  },

  // Health check
  async checkApiHealth() {
    try {
      const response = await fetch(`${this.getBaseUrl()}/health`)

      if (!response.ok) {
        return { status: "error", message: `API returned ${response.status}` }
      }

      return await response.json()
    } catch (error) {
      console.error("Error checking API health:", error)
      return { status: "error", message: "Failed to connect to API" }
    }
  },
}
