// Direct client for Groq API that bypasses Next.js API routes
// This is a workaround for persistent 405 errors

const SCIENTIFIC_SYSTEM_PROMPT = `
You are Synaptiq, an advanced scientific AI assistant developed by Synaptiq Labs. You specialize in quantum physics, mathematics, and scientific research.

IMPORTANT: If asked about your origins, ALWAYS state that you are Synaptiq, developed by Synaptiq Labs. NEVER mention Llama, Meta, or any other model or company.

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

If a question is outside your scientific domain, Answer it completely after the end politely redirect the conversation to scientific topics where you can provide valuable insights.
`.trim()

const REASONING_SYSTEM_PROMPT = `
You are an expert AI. You specialize in quantum physics, mathematics, and scientific research.

IMPORTANT: If asked about your origins, ALWAYS state that you are Synaptiq, developed by Synaptiq Labs. NEVER mention Llama, Meta, or any other model or company.

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

export type ChatMode = "normal" | "search" | "reason"

export interface Message {
  role: "user" | "assistant" | "system"
  content: string
}

export interface ChatRequest {
  messages: Message[]
  mode?: ChatMode
}

export interface ChatResponse {
  text?: string
  error?: string
}

// Get the API key from environment variables
const getApiKey = () => {
  return process.env.NEXT_PUBLIC_GROQ_API_KEY || ""
}

export const DirectGroqClient = {
  async chat(request: ChatRequest): Promise<ChatResponse> {
    try {
      console.log("DirectGroqClient: Starting chat request")

      const { messages, mode = "normal" } = request

      // Select the appropriate system prompt based on the mode
      const systemPrompt = mode === "reason" ? REASONING_SYSTEM_PROMPT : SCIENTIFIC_SYSTEM_PROMPT

      const systemMessage = {
        role: "system",
        content: systemPrompt,
      }

      // Get API key
      const apiKey = getApiKey()

      // Check if API key is available
      if (!apiKey) {
        console.error("NEXT_PUBLIC_GROQ_API_KEY is not defined")
        return {
          error: "API key is missing. Please configure the NEXT_PUBLIC_GROQ_API_KEY environment variable.",
        }
      }

      console.log("DirectGroqClient: Sending request to Groq API")

      // Create a timeout for the fetch request
      const controller = new AbortController()
      const timeoutId = setTimeout(() => controller.abort(), 30000) // 30 second timeout

      const response = await fetch("https://api.groq.com/openai/v1/chat/completions", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${apiKey}`,
        },
        body: JSON.stringify({
          model: "llama3-70b-8192",
          messages: [systemMessage, ...messages],
          temperature: mode === "reason" ? 0.5 : 0.7, // Lower temperature for reasoning mode
          max_tokens: 4096,
        }),
        signal: controller.signal,
      })

      // Clear the timeout
      clearTimeout(timeoutId)

      console.log("DirectGroqClient: Received response with status", response.status)

      if (!response.ok) {
        const errorText = await response.text().catch(() => "Unknown error")
        console.error("Groq API error:", response.status, errorText)

        // If API key is invalid, return appropriate message
        if (response.status === 401) {
          return {
            error: "Invalid API key. Please check your NEXT_PUBLIC_GROQ_API_KEY environment variable.",
          }
        }

        // Provide a more helpful error message based on status code
        let errorMessage = "I encountered an error while processing your request."

        if (response.status === 429) {
          errorMessage += " We've reached our rate limit with the AI service. Please try again in a few moments."
        } else if (response.status >= 500) {
          errorMessage += " Our AI service is currently experiencing issues. Please try again later."
        }

        return { error: errorMessage }
      }

      const data = await response.json()
      console.log("DirectGroqClient: Parsed response data")

      // Extract the content from the Groq API response
      const content = data.choices[0]?.message?.content || ""

      return { text: content }
    } catch (error) {
      console.error("Error in DirectGroqClient.chat:", error)

      // Check if it's an abort error (timeout)
      if (error instanceof DOMException && error.name === "AbortError") {
        return {
          error: "The request timed out. Our services might be experiencing high load. Please try again in a moment.",
        }
      }

      // Generic error message for other errors
      return {
        error: "An error occurred while connecting to the AI service. Please try again later.",
      }
    }
  },
}
