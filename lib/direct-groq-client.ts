import { LocalAI } from "./local-ai"

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

/**
 * Direct Groq client that bypasses Next.js API routes
 * This can be used client-side with a secure API key
 */
export class DirectGroqClient {
  private apiKey: string
  private baseUrl = "https://api.groq.com/openai/v1/chat/completions"

  constructor(apiKey: string) {
    this.apiKey = apiKey
  }

  /**
   * Send a chat completion request to Groq
   */
  async chatCompletion(messages: any[], mode = "normal"): Promise<string> {
    if (!this.apiKey) {
      console.warn("No API key provided, using local fallback")
      return LocalAI.getResponse(messages[messages.length - 1]?.content || "")
    }

    try {
      // Select the appropriate system prompt based on the mode
      const systemPrompt = mode === "reason" ? REASONING_SYSTEM_PROMPT : SCIENTIFIC_SYSTEM_PROMPT

      const systemMessage = {
        role: "system",
        content: systemPrompt,
      }

      // Create a timeout for the fetch request
      const controller = new AbortController()
      const timeoutId = setTimeout(() => controller.abort(), 30000) // 30 second timeout

      const response = await fetch(this.baseUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${this.apiKey}`,
        },
        body: JSON.stringify({
          model: "llama3-70b-8192",
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
        throw new Error(`Groq API error: ${response.status} - ${errorText}`)
      }

      const data = await response.json()
      return data.choices[0]?.message?.content || "No response from Groq."
    } catch (error) {
      console.error("Error calling Groq API:", error)
      return LocalAI.getResponse(messages[messages.length - 1]?.content || "")
    }
  }
}
