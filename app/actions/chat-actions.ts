"use server"

import { logger } from "@/lib/logger"

/**
 * Server action to send a chat request to Groq API
 * This keeps the API key secure on the server
 */
export async function sendChatRequest(message: string) {
  try {
    if (!process.env.GROQ_API_KEY) {
      throw new Error("GROQ_API_KEY is not set")
    }

    const response = await fetch("https://api.groq.com/openai/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.GROQ_API_KEY}`,
      },
      body: JSON.stringify({
        model: "llama3-70b-8192",
        messages: [
          {
            role: "system",
            content: "You are a helpful scientific assistant specializing in quantum physics and advanced mathematics.",
          },
          {
            role: "user",
            content: message,
          },
        ],
        temperature: 0.7,
        max_tokens: 1000,
      }),
    })

    if (!response.ok) {
      throw new Error(`Groq API returned status ${response.status}`)
    }

    const data = await response.json()
    return {
      success: true,
      message: data.choices?.[0]?.message?.content || "No response from API",
    }
  } catch (error) {
    logger.error(`Error in sendChatRequest: ${error instanceof Error ? error.message : String(error)}`)
    return {
      success: false,
      message: `Error: ${error instanceof Error ? error.message : "Unknown error"}`,
    }
  }
}
