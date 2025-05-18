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
  // Remove direct API key usage from client-side code
  constructor() {
    // No API key should be stored here
  }

  // Send a chat request to the server-side proxy
  async sendChatRequest(messages: Message[], mode = "default"): Promise<ChatResponse> {
    try {
      // Get the last user message for potential fallback
      const lastUserMessage = messages.filter((m) => m.role === "user").pop()
      const userQuery = lastUserMessage?.content || ""

      // Use server-side proxy instead of direct Groq API call
      const response = await fetch("/api/chat", {
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
        const errorText = await response.text().catch(() => "Unknown error")
        console.error("API error:", response.status, errorText)

        // Use local fallback if API request fails
        return {
          text:
            LocalAI.getResponse(userQuery) +
            "\n\n(Note: The AI service is currently experiencing issues. I'm operating with limited capabilities.)",
          error: `API Error: ${response.status} - ${errorText.substring(0, 100)}`,
        }
      }

      const data = await response.json()
      return { text: data.text || "No response from the AI service." }
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
export const clientAIService = new ClientAIService()
