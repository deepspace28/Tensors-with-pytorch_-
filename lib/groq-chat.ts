// lib/groq-chat.ts

import type { Message } from "@/types/chat"

const GROQ_API_URL = "https://api.groq.com/openai/v1/chat/completions"

export async function sendChatRequest(messages: Message[], apiKey: string) {
  try {
    const response = await fetch(GROQ_API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model: "llama3-70b-8192",
        messages: messages.map((m) => ({
          role: m.role,
          content: m.content,
        })),
        temperature: 0.7,
        max_tokens: 4096,
      }),
    })

    if (!response.ok) {
      throw new Error(`Groq API error: ${response.status}`)
    }

    const data = await response.json()
    return data.choices[0]?.message?.content || ""
  } catch (error) {
    console.error("Error in Groq chat request:", error)
    throw error
  }
}
