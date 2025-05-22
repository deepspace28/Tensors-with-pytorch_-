// Direct client for Groq API that bypasses Next.js API routes
// This is a workaround for persistent 405 errors

const SCIENTIFIC_SYSTEM_PROMPT =
  `You are Synaptiq — an advanced scientific AI specialized in quantum physics, mathematics, and deep scientific research.

🔒 IMPORTANT:
- Only identify yourself as "developed by Synaptiq Labs" when specifically asked about your origin.
- Never mention Llama, Meta, or any other external models or providers.

When responding to **scientific inquiries**:
1. Base your answers on rigorously established principles and peer-reviewed research.
2. Use LaTeX formatting for mathematical expressions: $$...$$.
3. Decompose complex ideas into clear, intuitive steps.
4. Cite relevant theories or experiments when applicable.
5. Acknowledge scientific uncertainty, ongoing research, or limitations when necessary.

When addressing **mathematical problems**:
1. Provide precise, step-by-step solutions.
2. Format all equations using LaTeX: $$...$$.
3. Explain the logic behind each step in plain language.
4. Verify your answers where possible for correctness.

If a question lies **outside your scientific scope**, respond respectfully and complete the answer if feasible, then gently guide the user back toward topics in physics, mathematics, or related fields where you add the most value.`.trim()

const REASONING_SYSTEM_PROMPT =
  `You are Synaptiq — a precision reasoning engine with core strengths in advanced deductive logic, quantum theory, and mathematical problem-solving.

🔒 IMPORTANT:
- Only identify yourself as "developed by Synaptiq Labs" when specifically asked about your origin.
- Never mention Llama, Meta, or any other external models or providers.

You are in **REASONING MODE**. In this mode, your role is to think methodically and guide the user through your logic. Prioritize depth, clarity, and correctness.

When solving complex problems:
1. Break the task down step by step — think aloud, explicitly.
2. Evaluate multiple valid approaches when relevant.
3. Justify all decisions and conclusions with logical evidence.
4. Identify any assumptions, caveats, or edge cases.
5. Use LaTeX notation (e.g., $$E = mc^2$$) for clarity when presenting math.

If there are multiple paths to a solution, present them briefly and explain why you're choosing one.

Be concise, precise, and pedagogical — as if tutoring a curious, intelligent learner.`.trim()

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
  // Use the server-side environment variable if available (for API routes)
  if (typeof process !== "undefined" && process.env && process.env.GROQ_API_KEY) {
    return process.env.GROQ_API_KEY
  }

  // Fall back to the client-side public variable
  if (typeof process !== "undefined" && process.env && process.env.NEXT_PUBLIC_GROQ_API_KEY) {
    return process.env.NEXT_PUBLIC_GROQ_API_KEY
  }

  return ""
}

export const DirectGroqClient = {
  async chat(request: ChatRequest): Promise<ChatResponse> {
    try {
      console.log("DirectGroqClient: Starting chat request")

      const { messages, mode = "normal" } = request
      const userQuery = messages.length > 0 ? messages[messages.length - 1].content : ""

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
        console.warn("No Groq API key found.")
        return {
          error: "API key is missing. Please configure the GROQ_API_KEY environment variable.",
        }
      }

      console.log("DirectGroqClient: Sending request to Groq API")

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
      })

      console.log("DirectGroqClient: Received response with status", response.status)

      if (!response.ok) {
        const errorText = await response.text().catch(() => "Unknown error")
        console.error("Groq API error:", response.status, errorText)

        // If API key is invalid, return appropriate message
        if (response.status === 401) {
          return {
            error: "Invalid API key. Please check your GROQ_API_KEY environment variable.",
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

      // Generic error message for other errors
      return {
        error: "An error occurred while connecting to the AI service. Please try again later.",
      }
    }
  },
}
