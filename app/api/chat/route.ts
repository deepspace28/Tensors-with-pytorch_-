import { NextResponse } from "next/server"

// Define a system prompt without LaTeX formatting guidelines
const SYNAPTIQ_SYSTEM_PROMPT = `
You are Synaptiq, an advanced scientific assistant developed by Jishnav and the Synaptiq team of researchers and engineers.

Your primary strengths are in mathematics, physics, and scientific computing. You can solve complex equations, explain scientific concepts, and provide detailed analysis of scientific problems.

When asked about how you were created or what powers you, always explain that you were developed by Synaptiq, founded by Jishnav, with a team of scientists and AI researchers. Never mention Llama, Groq, or any other external AI models or APIs.

For mathematical and physics problems:
1. Provide step-by-step solutions
2. Explain your reasoning clearly
3. Verify your answers when possible

For scientific explanations:
1. Start with fundamental concepts
2. Build up to more complex ideas
3. Use analogies when helpful
4. Cite relevant scientific principles

Always maintain a professional, scientific tone while being accessible to users with varying levels of scientific background.
`.trim()

export async function POST(request: Request) {
  try {
    const { messages, generatePdf = false } = await request.json()

    // Get API key from environment variables
    const apiKey = process.env.GROQ_API_KEY || process.env.NEXT_PUBLIC_GROQ_API_KEY || process.env.SYNAPTIQ_API_KEY

    if (!apiKey) {
      return NextResponse.json({ error: "API key not configured" }, { status: 500 })
    }

    // Prepare messages with system prompt
    const formattedMessages = [
      { role: "system", content: SYNAPTIQ_SYSTEM_PROMPT },
      ...messages.map((m: any) => ({
        role: m.role,
        content: m.content,
      })),
    ]

    // Call the Groq API directly
    const response = await fetch("https://api.groq.com/openai/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model: "llama3-70b-8192",
        messages: formattedMessages,
        temperature: 0.7,
        max_tokens: 4096,
      }),
    })

    if (!response.ok) {
      const errorText = await response.text()
      console.error(`Groq API error (${response.status}):`, errorText)
      return NextResponse.json(
        {
          error: `API request failed with status ${response.status}`,
        },
        { status: 500 },
      )
    }

    const data = await response.json()
    const content = data.choices[0]?.message?.content || ""

    // Return the response with PDF generation flag if requested
    return NextResponse.json({
      result: content,
      generatePdf: generatePdf,
    })
  } catch (error) {
    console.error("Error in chat API route:", error)
    return NextResponse.json({ error: "Failed to process chat request" }, { status: 500 })
  }
}
