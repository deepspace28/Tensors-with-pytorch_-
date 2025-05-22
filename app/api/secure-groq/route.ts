import { NextResponse } from "next/server"

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

If a question lies **outside your scientific scope**, respond completely and complete the answer if feasible, rela then gently guide the user back toward topics in physics, mathematics, or related fields where you add the most value.`.trim()

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

// CORS headers for all responses
const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, Authorization, X-API-Key",
  "Access-Control-Max-Age": "86400",
}

// Handle OPTIONS requests for CORS preflight
export async function OPTIONS() {
  console.log("OPTIONS request received at /api/secure-groq")
  return new NextResponse(null, {
    status: 204,
    headers: corsHeaders,
  })
}

// Handle GET requests
export async function GET() {
  console.log("GET request received at /api/secure-groq - returning 405")
  return NextResponse.json(
    { error: "Method Not Allowed", message: "This endpoint only accepts POST requests" },
    { status: 405, headers: { ...corsHeaders, Allow: "POST, OPTIONS" } },
  )
}

export async function POST(req: Request) {
  console.log("POST request received to /api/secure-groq")

  // Add CORS headers to all responses
  const headers = { ...corsHeaders, Allow: "POST, OPTIONS" }

  try {
    // Parse the request body
    let body
    try {
      body = await req.json()
      console.log("Request body received:", JSON.stringify(body).substring(0, 200) + "...")
    } catch (error) {
      console.error("Failed to parse request body:", error)
      return NextResponse.json(
        { error: "Invalid request body", message: "I couldn't process your request. Please try again." },
        { status: 400, headers },
      )
    }

    const { messages, temperature = 0.7, max_tokens = 4096, mode = "normal" } = body

    if (!Array.isArray(messages)) {
      console.error("Invalid messages format:", messages)
      return NextResponse.json(
        { error: "Messages must be an array", message: "There was an issue with your request format." },
        { status: 400, headers },
      )
    }

    // Select the appropriate system prompt based on the mode
    const systemPrompt = mode === "reason" ? REASONING_SYSTEM_PROMPT : SCIENTIFIC_SYSTEM_PROMPT

    const systemMessage = {
      role: "system",
      content: systemPrompt,
    }

    // Get API key from environment variables
    const apiKey = process.env.GROQ_API_KEY
    console.log("API key available:", !!apiKey)

    // Check if API key is available
    if (!apiKey) {
      console.error("GROQ_API_KEY is not defined")
      return NextResponse.json(
        {
          error: "API key is missing",
          message: "The API key is missing. Please configure the GROQ_API_KEY environment variable.",
        },
        { status: 500, headers },
      )
    }

    try {
      console.log("Sending request to Groq API from secure endpoint")

      const response = await fetch("https://api.groq.com/openai/v1/chat/completions", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${apiKey}`,
        },
        body: JSON.stringify({
          model: "llama3-70b-8192",
          messages: [systemMessage, ...messages],
          temperature: temperature,
          max_tokens: max_tokens,
        }),
      })

      console.log("Groq API response status:", response.status)

      if (!response.ok) {
        const errorText = await response.text().catch(() => "Unknown error")
        console.error("Groq API error from secure endpoint:", response.status, errorText)

        // If API key is invalid, return appropriate message
        if (response.status === 401) {
          console.log("Invalid API key")
          return NextResponse.json(
            {
              error: "Invalid API key",
              message: "The API key is invalid. Please check your GROQ_API_KEY environment variable.",
            },
            { status: 401, headers },
          )
        }

        // Provide a more helpful error message based on status code
        let errorMessage = "I encountered an error while processing your request."

        if (response.status === 429) {
          errorMessage += " We've reached our rate limit with the AI service. Please try again in a few moments."
        } else if (response.status >= 500) {
          errorMessage += " Our AI service is currently experiencing issues. Please try again later."
        }

        return NextResponse.json(
          { error: `Groq API error: ${response.status}`, message: errorMessage },
          { status: response.status, headers },
        )
      }

      const data = await response.json()
      console.log("Received response from Groq API via secure endpoint")

      // Return the full response data
      return NextResponse.json(data, { status: 200, headers })
    } catch (error) {
      console.error("Error calling Groq API from secure endpoint:", error)

      // Generic error message for other errors
      return NextResponse.json(
        {
          error: "API call failed",
          message: "An error occurred while connecting to the AI service. Please try again later.",
        },
        { status: 500, headers },
      )
    }
  } catch (error) {
    console.error("Unhandled error in secure-groq API:", error)
    return NextResponse.json(
      {
        error: "Server error",
        message: "An unexpected error occurred while processing your request. Please try again later.",
      },
      { status: 500, headers },
    )
  }
}
