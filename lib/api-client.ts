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

  // Use server API route instead of direct API access
  async getModelResponse(messages: any[], options: any = {}) {
    try {
      const response = await fetch(`${this.getBaseUrl()}/ai-completion`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          messages,
          model: options.model || "default",
          temperature: options.temperature || 0.7,
          max_tokens: options.maxTokens || 4096,
        }),
      })

      if (!response.ok) {
        throw new Error(`API error: ${response.status}`)
      }

      return await response.json()
    } catch (error) {
      console.error("Error getting model response:", error)
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
