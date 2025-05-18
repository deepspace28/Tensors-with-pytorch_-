"use server"

import { revalidatePath } from "next/cache"

// Define the message type
export type Message = {
  role: "user" | "assistant" | "system"
  content: string
}

// Define the chat state type
export type ChatState = {
  messages: Message[]
  error?: string
}

/**
 * Server action to send a message to the Groq API
 * This runs entirely on the server, avoiding CORS issues
 */
export async function sendMessage(prevState: ChatState, formData: FormData): Promise<ChatState> {
  try {
    // Get the message from the form data
    const message = formData.get("message") as string

    if (!message || message.trim() === "") {
      return {
        ...prevState,
        error: "Please enter a message",
      }
    }

    // Add the user message to the messages array
    const newMessages = [...prevState.messages, { role: "user", content: message }]

    // Check if we have an API key
    const apiKey = process.env.GROQ_API_KEY
    if (!apiKey) {
      return {
        messages: [
          ...newMessages,
          {
            role: "assistant",
            content: "I'm sorry, but I can't process your request right now. The API key is missing.",
          },
        ],
        error: "API key is missing",
      }
    }

    // Simple system prompt
    const systemPrompt =
      "You are Synaptiq, an AI assistant specializing in scientific topics. If asked about your identity, state that you are Synaptiq, developed by Synaptiq Labs."

    try {
      // Make the request to the Groq API
      // This happens server-side, so no CORS issues
      const response = await fetch("https://api.groq.com/openai/v1/chat/completions", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${apiKey}`,
        },
        body: JSON.stringify({
          model: "llama3-70b-8192",
          messages: [{ role: "system", content: systemPrompt }, ...newMessages],
          temperature: 0.7,
          max_tokens: 2048,
        }),
      })

      if (!response.ok) {
        const errorData = await response.text()
        console.error("Groq API error:", response.status, errorData)

        return {
          messages: [
            ...newMessages,
            {
              role: "assistant",
              content: "I'm sorry, but I encountered an error processing your request. Please try again later.",
            },
          ],
          error: `API error: ${response.status}`,
        }
      }

      const data = await response.json()
      const assistantMessage = data.choices[0]?.message?.content || "No response from the API"

      // Return the updated messages
      return {
        messages: [...newMessages, { role: "assistant", content: assistantMessage }],
      }
    } catch (error) {
      console.error("Error calling Groq API:", error)

      // Return a fallback response
      return {
        messages: [
          ...newMessages,
          {
            role: "assistant",
            content: "I'm sorry, but I encountered an error processing your request. Please try again later.",
          },
        ],
        error: error instanceof Error ? error.message : "Unknown error",
      }
    }
  } catch (error) {
    console.error("General error in sendMessage:", error)

    return {
      ...prevState,
      error: error instanceof Error ? error.message : "Unknown error",
    }
  }
}

/**
 * Server action to clear the chat history
 */
export async function clearChat(): Promise<ChatState> {
  revalidatePath("/new-chat")
  return { messages: [] }
}
