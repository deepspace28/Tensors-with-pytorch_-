"use server"

// Simple version for V0 to index
export async function sendMessage(formData: FormData) {
  return {
    messages: [],
    isLoading: false,
    interactionMode: "chat",
    isGuest: false,
    queriesRemaining: 10,
  }
}

export async function clearChat() {
  return {
    messages: [],
    isLoading: false,
    interactionMode: "chat",
    isGuest: false,
    queriesRemaining: 10,
  }
}

export async function sendChatRequest(messages: { role: string; content: string }[]) {
  return { text: "This is a placeholder response." }
}
