"use server"

// Simple implementation of the required exports
export async function sendMessage(formData: FormData) {
  const message = formData.get("message") as string
  return {
    success: true,
    message: `Server received: ${message}`,
  }
}

export async function clearChat() {
  return {
    success: true,
  }
}

export async function sendChatRequest(messages: { role: string; content: string }[]) {
  const lastMessage = messages[messages.length - 1]
  return {
    text: `Server processed: ${lastMessage.content}`,
  }
}
