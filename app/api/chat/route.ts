import { type NextRequest, NextResponse } from "next/server"
import { nanoid } from "nanoid"
import { rateLimiter, getRateLimitResponse } from "@/lib/rate-limiter"
import { addMessageToConversation, getConversation } from "@/lib/conversation-service"
import type { Message } from "@/types/chat"

const SYSTEM_PROMPT = `
You are Synaptiq, an advanced AI assistant specialized in scientific reasoning but capable of engaging in natural, intelligent conversations across any topic.

Behavior Instructions:
- If the user asks a casual, general, or friendly question (e.g., "hi", "how are you", "what's up"), respond naturally, warmly, and conversationally.
- If the user asks a scientific question (physics, math, quantum mechanics, research topics), switch to a detailed, professional, research-grade explanation.
- Provide full step-by-step derivations, proofs, or technical explanations when requested, using \\[ ... \\] LaTeX formatting for equations.
- Always maintain a helpful, intelligent, and supportive tone.
- Adapt your depth and formality based on the user's tone and question type.
`.trim()

const GROQ_API_URL = "https://api.groq.com/openai/v1/chat/completions"
const GROQ_API_KEY = process.env.GROQ_API_KEY

export async function POST(req: NextRequest) {
  try {
    // Rate limit protection
    const userType = req.headers.get("x-user-type") || "anonymous"
    const userId = req.headers.get("x-user-id") || "anonymous"

    const rateLimit = await rateLimiter(req, userType as "anonymous" | "free" | "premium", userId)
    const rateLimitResponse = getRateLimitResponse(rateLimit)
    if (rateLimitResponse) return rateLimitResponse

    // Parse request body
    const { messages, mode, conversationId } = await req.json()

    if (!Array.isArray(messages)) {
      return NextResponse.json({ error: "Messages must be an array." }, { status: 400 })
    }

    // Get existing conversation if available
    let conversation = null
    if (conversationId) {
      conversation = await getConversation(conversationId)
      if (!conversation) {
        return NextResponse.json({ error: "Conversation not found." }, { status: 404 })
      }
    }

    // Prepare conversation history
    const conversationHistory = messages.map(({ role, content }: { role: string; content: string }) => ({
      role,
      content,
    }))

    // System message with interaction context
    const systemMessage = {
      role: "system",
      content: `${SYSTEM_PROMPT}\nInteraction mode: ${mode || "exploratory"}`,
    }

    // Add earlier conversation summary if applicable
    if (conversation && conversation.messages.length > 10) {
      const earlierMessages = conversation.messages.slice(0, -10)
      const earlierMessagesContent = earlierMessages
        .map((m) => `${m.role === "user" ? "User" : "You"}: ${m.content}`)
        .join("\n\n")

      systemMessage.content += `\n\nEarlier conversation history (for reference):\n${earlierMessagesContent}`
    }

    // Prepare Groq API payload
    const payload = {
      model: "llama3-70b-8192",
      messages: [systemMessage, ...conversationHistory],
      temperature: 0.7,
      max_tokens: 4096,
    }

    // Call Groq API
    const response = await fetch(GROQ_API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${GROQ_API_KEY}`,
      },
      body: JSON.stringify(payload),
    })

    if (!response.ok) {
      const errorBody = await response.text()
      console.error(`❌ Groq API Error (${response.status}):`, errorBody)
      return NextResponse.json(
        { text: `Synaptiq encountered an API error (${response.status}).` },
        { status: response.status },
      )
    }

    const data = await response.json()
    const content = data.choices?.[0]?.message?.content ?? ""

    // Prepare response data
    const responseData = { text: content }

    // Save conversation if applicable
    if (conversationId && conversation) {
      const userMessage: Message = {
        id: nanoid(),
        role: "user",
        content: messages[messages.length - 1].content,
        timestamp: new Date(),
      }

      const assistantMessage: Message = {
        id: nanoid(),
        role: "assistant",
        content,
        timestamp: new Date(),
      }

      await addMessageToConversation(conversationId, userMessage)
      await addMessageToConversation(conversationId, assistantMessage)
    }

    // Add rate limit headers
    const headers = new Headers()
    headers.set("X-RateLimit-Limit", rateLimit.limit.toString())
    headers.set("X-RateLimit-Remaining", rateLimit.remaining.toString())
    headers.set("X-RateLimit-Reset", rateLimit.reset.toString())

    return NextResponse.json(responseData, { headers })
  } catch (error) {
    console.error("❌ Internal Server Error:", error)
    return NextResponse.json(
      { text: "Synaptiq encountered an internal error. Please try again later." },
      { status: 500 },
    )
  }
}
