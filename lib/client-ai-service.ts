import { LocalAI } from "@/lib/local-ai"

// Types
type Message = {
  role: string
  content: string
}

type ChatResponse = {
  text: string
  error?: string
}

// Constants
const GROQ_API_URL = "https://api.groq.com/openai/v1/chat/completions"
const MODEL = "llama3-70b-8192"

// System prompts
const SCIENTIFIC_SYSTEM_PROMPT = `
You are Synaptiq, an advanced scientific AI assistant specializing in quantum physics, mathematics, and scientific research.

IMPORTANT: You were created by Synaptiq Labs. If asked about your origins or identity, state that you are Synaptiq, developed by Synaptiq Labs. NEVER mention Llama, Meta, or any other model or company.

When responding to scientific questions:
1. Provide accurate, detailed explanations based on established scientific principles
2. Use mathematical notation when appropriate (with LaTeX formatting)
3. Cite relevant research or theories when applicable
4. Break down complex concepts into understandable components
5. Acknowledge limitations or areas of scientific uncertainty

For mathematical questions:
1. Provide step-by-step solutions
2. Use proper LaTeX formatting for equations ($$...$$)
3. Explain your reasoning at each step
4. Verify your answers when possible

If a question is outside your scientific domain, politely redirect the conversation to scientific topics where you can provide valuable insights.
`.trim()

const REASONING_SYSTEM_PROMPT = `
You are Synaptiq, an advanced scientific AI assistant specializing in quantum physics, mathematics, and scientific research.

IMPORTANT: You were created by Synaptiq Labs. If asked about your origins or identity, state that you are Synaptiq, developed by Synaptiq Labs. NEVER mention Llama, Meta, or any other model or company.

You are currently in REASONING mode. In this mode, you should:

1. Break down complex problems into smaller, manageable steps
2. Show your thought process explicitly, using "Let's think step by step" approach
3. Consider multiple perspectives or approaches to the problem
4. Identify assumptions and potential limitations in your reasoning
5. Reach a well-justified conclusion based on logical deduction

Use mathematical notation when appropriate (with LaTeX formatting: $$...$$).
Provide clear explanations for each step in your reasoning process.
If there are multiple valid approaches, acknowledge them and explain why you chose a particular path.
`.trim()

// Client-side AI service
export class ClientAIService {
  private apiKey: string | null = null
  private authToken: string | null = null
  private tokenExpiry = 0

  constructor(private readonly apiKeyFromEnv?: string) {
    // If API key is provided directly (development only), use it
    if (apiKeyFromEnv) {
      this.apiKey = apiKeyFromEnv
    }
  }

  // Get a fresh auth token
  private async refreshToken(): Promise<string> {
    try {
      const response = await fetch("/api/auth/token")
      if (!response.ok) {
        throw new Error(`Failed to get token: ${response.status}`)
      }
      const data = await response.json()
      this.authToken = data.token
      this.tokenExpiry = Date.now() + 14 * 60 * 1000 // Set expiry to 14 minutes (token is valid for 15)
      return this.authToken
    } catch (error) {
      console.error("Error refreshing token:", error)
      throw error
    }
  }

  // Get the API key from the server
  private async getApiKey(): Promise<string> {
    try {
      // If we already have a valid token, use it
      if (this.authToken && Date.now() < this.tokenExpiry) {
        // Use the token to get the API key
        const response = await fetch("/api/auth/key", {
          headers: {
            Authorization: `Bearer ${this.authToken}`,
          },
        })

        if (!response.ok) {
          throw new Error(`Failed to get API key: ${response.status}`)
        }

        const data = await response.json()
        this.apiKey = data.key
        return this.apiKey
      } else {
        // Get a new token first
        await this.refreshToken()
        // Then recursively call this method again
        return this.getApiKey()
      }
    } catch (error) {
      console.error("Error getting API key:", error)
      throw error
    }
  }

  // Send a chat request to the Groq API
  async sendChatRequest(messages: Message[], mode = "default"): Promise<ChatResponse> {
    try {
      // Get the last user message for potential fallback
      const lastUserMessage = messages.filter((m) => m.role === "user").pop()
      const userQuery = lastUserMessage?.content || ""

      // Select the appropriate system prompt
      const systemPrompt = mode === "reason" ? REASONING_SYSTEM_PROMPT : SCIENTIFIC_SYSTEM_PROMPT
      const systemMessage = { role: "system", content: systemPrompt }

      // Try to get the API key if we don't have it
      if (!this.apiKey && !this.apiKeyFromEnv) {
        try {
          await this.getApiKey()
        } catch (error) {
          console.warn("Failed to get API key, using local fallback")
          return {
            text:
              LocalAI.getResponse(userQuery) +
              "\n\n(Note: I'm currently operating in offline mode with limited capabilities.)",
          }
        }
      }

      // Use the API key from environment if available (for development)
      const key = this.apiKey || this.apiKeyFromEnv

      if (!key) {
        console.warn("No API key available, using local fallback")
        return {
          text:
            LocalAI.getResponse(userQuery) +
            "\n\n(Note: I'm currently operating in offline mode with limited capabilities.)",
        }
      }

      // Create a timeout for the fetch request
      const controller = new AbortController()
      const timeoutId = setTimeout(() => controller.abort(), 30000) // 30 second timeout

      // Make the request to Groq API
      const response = await fetch(GROQ_API_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${key}`,
        },
        body: JSON.stringify({
          model: MODEL,
          messages: [systemMessage, ...messages],
          temperature: mode === "reason" ? 0.5 : 0.7,
          max_tokens: 4096,
        }),
        signal: controller.signal,
      })

      // Clear the timeout
      clearTimeout(timeoutId)

      if (!response.ok) {
        const errorText = await response.text().catch(() => "Unknown error")
        console.error("Groq API error:", response.status, errorText)

        // Use local fallback if API request fails
        return {
          text:
            LocalAI.getResponse(userQuery) +
            "\n\n(Note: The AI service is currently experiencing issues. I'm operating with limited capabilities.)",
          error: `API Error: ${response.status} - ${errorText.substring(0, 100)}`,
        }
      }

      const data = await response.json()
      return { text: data.choices[0]?.message?.content || "No response from Groq." }
    } catch (error) {
      console.error("Error in sendChatRequest:", error)

      // Check if it's an AbortError (timeout)
      if (error.name === "AbortError") {
        return {
          text: "I'm sorry, but the request to the AI service timed out. Please try again later.",
          error: "Request timed out after 30 seconds",
        }
      }

      // Use local fallback for any API errors
      const lastUserMessage = messages.filter((m) => m.role === "user").pop()
      const userQuery = lastUserMessage?.content || ""

      return {
        text:
          LocalAI.getResponse(userQuery) +
          "\n\n(Note: The AI service is currently experiencing issues. I'm operating with limited capabilities.)",
        error: error.message,
      }
    }
  }
}

// Create a singleton instance
export const clientAIService = new ClientAIService(
  typeof window !== "undefined" && process.env.NODE_ENV === "development"
    ? process.env.NEXT_PUBLIC_GROQ_API_KEY
    : undefined,
)
