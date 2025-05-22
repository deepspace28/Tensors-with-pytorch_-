export interface MessageSection {
  title: string
  content: string
}

// Add the isPlaceholder property to the Message interface
export interface Message {
  id: string
  role: "user" | "assistant" | "system"
  content: string
  timestamp: Date
  sections?: MessageSection[]
  isPlaceholder?: boolean
}
