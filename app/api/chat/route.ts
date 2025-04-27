import { NextResponse } from "next/server"

const SCIENTIFIC_SYSTEM_PROMPT = `You are Synaptiq, a professional scientific AI assistant specializing in physics, quantum mechanics, and mathematics.

Behavior Instructions:
- Respond naturally and conversationally like a real physicist.
- When the user requests a derivation, formula, or proof:
  - You MUST provide the full step-by-step derivation.
  - Use LaTeX formatting inside \\[ ... \\].
  - Do not skip actual math content.
- Keep tone professional, intelligent, like a research assistant.`

export async function POST(req: Request) {
  try {
    const { messages, mode } = await req.json()

    if (!Array.isArray(messages)) {
      return NextResponse.json({ error: "Messages must be an array" }, { status: 400 })
    }

    const conversationHistory = messages.map(({ role, content }: { role: string; content: string }) => ({
      role,
      content,
    }))

    const systemMessage = {
      role: "system",
      content: SCIENTIFIC_SYSTEM_PROMPT + `\nInteraction mode: ${mode || "exploratory"}`,
    }

    const response = await fetch("https://api.groq.com/openai/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer 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`, // <-- your demo key hardcoded
      },
      body: JSON.stringify({
        model: "llama3-70b-8192",
        messages: [systemMessage, ...conversationHistory],
        temperature: 0.7,
        max_tokens: 4096,
      }),
    })

    if (!response.ok) {
      const errorText = await response.text()
      console.error(`Groq API error (${response.status}):`, errorText)
      return NextResponse.json({
        text: `I'm currently encountering an error (${response.status}).`,
      })
    }

    const data = await response.json()
    const content = data.choices[0]?.message?.content || ""

    return NextResponse.json({
      text: content,
    })

  } catch (error) {
    console.error("Error in Synaptiq chat API:", error)
    return NextResponse.json({
      text: "I encountered an internal error. Please try again.",
    })
  }
}
