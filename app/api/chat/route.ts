import { NextResponse } from "next/server"

const SCIENTIFIC_SYSTEM_PROMPT = `
You are Synaptiq, an advanced scientific AI assistant developed by Synaptiq Labs. You specialize in quantum physics, mathematics, and scientific research.

IMPORTANT: You were created by Synaptiq Labs. If asked about your origins, ALWAYS state that you are Synaptiq, developed by Synaptiq Labs. NEVER mention Llama, Meta, or any other model or company.

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

Remember: You are Synaptiq, created by Synaptiq Labs. This is your identity.
`.trim()

const REASONING_SYSTEM_PROMPT = `
You are Synaptiq, an advanced scientific AI assistant developed by Synaptiq Labs. You specialize in quantum physics, mathematics, and scientific research.

IMPORTANT: You were created by Synaptiq Labs. If asked about your origins, ALWAYS state that you are Synaptiq, developed by Synaptiq Labs. NEVER mention Llama, Meta, or any other model or company.

You are currently in REASONING mode. In this mode, you should:

1. Break down complex problems into smaller, manageable steps
2. Show your thought process explicitly, using "Let's think step by step" approach
3. Consider multiple perspectives or approaches to the problem
4. Identify assumptions and potential limitations in your reasoning
5. Reach a well-justified conclusion based on logical deduction

Use mathematical notation when appropriate (with LaTeX formatting: $$...$$).
Provide clear explanations for each step in your reasoning process.
If there are multiple valid approaches, acknowledge them and explain why you chose a particular path.

Remember: You are Synaptiq, created by Synaptiq Labs. This is your identity.
`.trim()

export async function POST(req: Request) {
  try {
    const { messages, mode } = await req.json()

    if (!Array.isArray(messages)) {
      return NextResponse.json({ error: "Messages must be an array" }, { status: 400 })
    }

    // Select the appropriate system prompt based on the mode
    const systemPrompt = mode === "reason" ? REASONING_SYSTEM_PROMPT : SCIENTIFIC_SYSTEM_PROMPT

    const systemMessage = {
      role: "system",
      content: systemPrompt,
    }

    try {
      const response = await fetch("https://api.groq.com/openai/v1/chat/completions", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${process.env.GROQ_API_KEY}`,
        },
        body: JSON.stringify({
          model: "llama3-70b-8192",
          messages: [systemMessage, ...messages],
          temperature: mode === "reason" ? 0.5 : 0.7, // Lower temperature for reasoning mode
          max_tokens: 4096,
        }),
      })

      if (!response.ok) {
        throw new Error(`Groq API error (${response.status})`)
      }

      const data = await response.json()
      const content = data.choices[0]?.message?.content || ""

      return NextResponse.json({
        text: content,
      })
    } catch (error) {
      console.error("Error calling Groq API:", error)

      // Fallback response if the API call fails
      let fallbackResponse = ""

      if (messages.length > 0) {
        const lastMessage = messages[messages.length - 1]
        const query = lastMessage.content

        fallbackResponse = `I apologize, but I'm having trouble connecting to my knowledge base at the moment. Let me provide a general response about "${query}" based on my core understanding.

Scientific topics like this often involve multiple perspectives and approaches. While I can't provide a detailed analysis right now, I can tell you that this area has seen significant research and development in recent years.

When my connection is restored, I'd be happy to provide a more comprehensive explanation. Is there a specific aspect of this topic you're most interested in?`
      } else {
        fallbackResponse =
          "I apologize, but I'm having trouble connecting to my knowledge base at the moment. Please try again later."
      }

      return NextResponse.json({
        text: fallbackResponse,
      })
    }
  } catch (error) {
    console.error("Error in chat API:", error)
    return NextResponse.json({
      text: "I apologize, but I encountered an error while processing your request. Please try again later.",
    })
  }
}
