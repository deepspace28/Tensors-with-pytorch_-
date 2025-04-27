import { type NextRequest, NextResponse } from "next/server"
import { nanoid } from "nanoid"
import { rateLimiter, getRateLimitResponse } from "@/lib/rate-limiter"
import { addMessageToConversation, getConversation } from "@/lib/conversation-service"
import type { Message } from "@/types/chat"

const SCIENTIFIC_SYSTEM_PROMPT = `
You are Synaptiq, a professional scientific AI assistant specializing in physics, quantum mechanics, and mathematics.

Behavior Instructions:
- Respond naturally and conversationally like a real physicist.
- When the user requests a derivation, formula, or proof:
  - You MUST provide the full step-by-step derivation.
  - Use LaTeX formatting inside \\[ ... \\] for equations.
  - Do not skip actual math content.
- Keep tone professional, intelligent, like a research assistant.
- Reference previous parts of the conversation when relevant.
`.trim()

const GROQ_API_URL = "https://api.groq.com/openai/v1/chat/completions"
const GROQ_API_KEY = process.env.GROQ_API_KEY

export async function POST(req: NextRequest) {
  try {
    // Apply rate limiting
    const userType = req.headers.get("x-user-type") || "anonymous"
    const userId = req.headers.get("x-user-id") || "anonymous"

    const rateLimit = await rateLimiter(req, userType as "anonymous" | "free" | "premium", userId)

    // Check if rate limit is exceeded
    const rateLimitResponse = getRateLimitResponse(rateLimit)
    if (rateLimitResponse) {
      return rateLimitResponse
    }

    // Parse request body
    const { messages, mode, conversationId } = await req.json()

    if (!Array.isArray(messages)) {
      return NextResponse.json({ error: "Messages must be an array." }, { status: 400 })
    }

    // Get conversation from database if conversationId is provided
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

    // Add system message with context about previous messages if we have a conversation
    const systemMessage = {
      role: "system",
      content: `${SCIENTIFIC_SYSTEM_PROMPT}\nInteraction mode: ${mode || "exploratory"}`,
    }

    // If we have a conversation with more than 10 messages, add a summary of earlier messages
    if (conversation && conversation.messages.length > 10) {
      const earlierMessages = conversation.messages.slice(0, -10)
      const earlierMessagesContent = earlierMessages
        .map((m) => `${m.role === "user" ? "User" : "You"}: ${m.content}`)
        .join("\n\n")

      systemMessage.content += `\n\nEarlier in this conversation (for your reference):\n${earlierMessagesContent}`
    }

    const payload = {
      model: "llama3-70b-8192",
      messages: [systemMessage, ...conversationHistory],
      temperature: 0.7,
      max_tokens: 4096,
    }

    // Call the Groq API
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
        { text: `Synaptiq encountered an error (${response.status}).` },
        { status: response.status },
      )
    }

    const data = await response.json()
    const content = data.choices?.[0]?.message?.content ?? ""

    // Create response object
    const responseData = { text: content }

    // If we have a conversation, add the new messages to it
    if (conversationId && conversation) {
      // Add user message
      const userMessage: Message = {
        id: nanoid(),
        role: "user",
        content: messages[messages.length - 1].content,
        timestamp: new Date(),
      }

      await addMessageToConversation(conversationId, userMessage)

      // Add assistant message
      const assistantMessage: Message = {
        id: nanoid(),
        role: "assistant",
        content,
        timestamp: new Date(),
      }

      await addMessageToConversation(conversationId, assistantMessage)
    }

    // Add rate limit headers to response
    const headers = new Headers()
    headers.set("X-RateLimit-Limit", rateLimit.limit.toString())
    headers.set("X-RateLimit-Remaining", rateLimit.remaining.toString())
    headers.set("X-RateLimit-Reset", rateLimit.reset.toString())

    return NextResponse.json(responseData, { headers })
  } catch (error) {
    console.error("❌ Internal server error in Synaptiq chat API:", error)
    return NextResponse.json(
      { text: "Synaptiq encountered an internal error. Please try again later." },
      { status: 500 },
    )
  }
}
