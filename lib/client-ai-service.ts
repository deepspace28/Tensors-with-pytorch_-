// This file should not use NEXT_PUBLIC_GROQ_API_KEY
// Instead, it should use server actions or API routes

import { sendChatRequest } from "@/app/actions/chat-actions"

/**
 * Client-side service for AI interactions
 * Uses server actions instead of direct API calls
 */
export const clientAiService = {
  /**
   * Sends a message to the AI
   * @param message The user's message
   * @returns The AI response
   */
  async sendMessage(message: string) {
    return sendChatRequest(message)
  },
}
