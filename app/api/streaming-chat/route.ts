import { NextResponse } from "next/server"
import { LocalAI } from "@/lib/local-ai"

// CORS headers
const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, Authorization",
}

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

export async function OPTIONS() {
  return new NextResponse(null, {
    status: 204,
    headers: corsHeaders,
  })
}

export async function POST(req: Request) {
  console.log("Streaming chat API called:", new Date().toISOString())

  try {
    // Parse request body
    const body = await req.json().catch((error) => {
      console.error("Failed to parse request body:", error)
      return null
    })

    if (!body || !Array.isArray(body.messages)) {
      return NextResponse.json({ error: "Invalid request format" }, { status: 400, headers: corsHeaders })
    }

    const { messages, mode = "default" } = body

    // Get the last user message for potential fallback
    const lastUserMessage = messages.filter((m) => m.role === "user").pop()
    const userQuery = lastUserMessage?.content || ""

    // Select the appropriate system prompt
    const systemPrompt = mode === "reason" ? REASONING_SYSTEM_PROMPT : SCIENTIFIC_SYSTEM_PROMPT
    const systemMessage = { role: "system", content: systemPrompt }

    // Check if GROQ_API_KEY is available
    if (!process.env.GROQ_API_KEY) {
      console.error("GROQ_API_KEY is not defined")

      // Use local fallback
      const fallbackResponse = LocalAI.getResponse(userQuery)

      // Create a ReadableStream for the fallback response
      const encoder = new TextEncoder()
      const stream = new ReadableStream({
        start(controller) {
          // Split the fallback response into chunks to simulate streaming
          const chunks = fallbackResponse.split(" ")

          // Send each chunk with a small delay
          let i = 0
          const interval = setInterval(() => {
            if (i >= chunks.length) {
              clearInterval(interval)
              controller.close()
              return
            }

            const chunk = chunks[i] + " "
            controller.enqueue(encoder.encode(`data: ${JSON.stringify({ text: chunk })}\n\n`))
            i++
          }, 50)
        },
      })

      return new NextResponse(stream, {
        headers: {
          ...corsHeaders,
          "Content-Type": "text/event-stream",
          "Cache-Control": "no-cache",
          Connection: "keep-alive",
        },
      })
    }

    console.log("Sending streaming request to Groq API...")

    // Make the streaming request to Groq API
    const response = await fetch("https://api.groq.com/openai/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.GROQ_API_KEY}`,
      },
      body: JSON.stringify({
        model: "llama3-70b-8192",
        messages: [systemMessage, ...messages],
        temperature: mode === "reason" ? 0.5 : 0.7,
        max_tokens: 4096,
        stream: true, // Enable streaming
      }),
    })

    if (!response.ok) {
      const errorText = await response.text().catch(() => "Unknown error")
      console.error("Groq API error:", response.status, errorText)

      // Use local fallback if API request fails
      const fallbackResponse =
        LocalAI.getResponse(userQuery) +
        "\n\n(Note: The AI service is currently experiencing issues. I'm operating with limited capabilities.)"

      // Create a ReadableStream for the fallback response
      const encoder = new TextEncoder()
      const stream = new ReadableStream({
        start(controller) {
          // Split the fallback response into chunks to simulate streaming
          const chunks = fallbackResponse.split(" ")

          // Send each chunk with a small delay
          let i = 0
          const interval = setInterval(() => {
            if (i >= chunks.length) {
              clearInterval(interval)
              controller.close()
              return
            }

            const chunk = chunks[i] + " "
            controller.enqueue(encoder.encode(`data: ${JSON.stringify({ text: chunk })}\n\n`))
            i++
          }, 50)
        },
      })

      return new NextResponse(stream, {
        headers: {
          ...corsHeaders,
          "Content-Type": "text/event-stream",
          "Cache-Control": "no-cache",
          Connection: "keep-alive",
        },
      })
    }

    // Forward the streaming response
    const responseStream = response.body
    if (!responseStream) {
      throw new Error("No response stream from Groq API")
    }

    // Transform the Groq stream format to our own format
    const transformStream = new TransformStream({
      async transform(chunk, controller) {
        // Convert the chunk to text
        const text = new TextDecoder().decode(chunk)

        // Groq sends "data: [JSON]" format
        const lines = text.split("\n").filter((line) => line.trim() !== "")

        for (const line of lines) {
          // Check for the end of the stream
          if (line === "data: [DONE]") {
            return
          }

          // Process data lines
          if (line.startsWith("data: ")) {
            try {
              const jsonStr = line.slice(6) // Remove "data: " prefix
              const json = JSON.parse(jsonStr)

              // Extract the content delta
              const content = json.choices[0]?.delta?.content || ""
              if (content) {
                // Send our own formatted event
                controller.enqueue(`data: ${JSON.stringify({ text: content })}\n\n`)
              }
            } catch (e) {
              console.error("Error parsing JSON from stream:", e, line)
            }
          }
        }
      },
    })

    // Pipe the response through our transform stream
    const stream = responseStream.pipeThrough(transformStream)

    return new NextResponse(stream, {
      headers: {
        ...corsHeaders,
        "Content-Type": "text/event-stream",
        "Cache-Control": "no-cache",
        Connection: "keep-alive",
      },
    })
  } catch (error) {
    console.error("Error in streaming chat:", error)

    // Return an error response
    return NextResponse.json(
      { error: error.message, text: "I'm sorry, but I encountered an unexpected error. Please try again later." },
      { status: 500, headers: corsHeaders },
    )
  }
}
