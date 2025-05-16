export interface Message {
  id: string
  role: "user" | "assistant" | "system"
  content: string
  timestamp: Date
  simulationResult?: any
  simulationType?: string
  sections?: MessageSection[]
}

export interface MessageSection {
  type: string
  content: string
}

export interface ChatState {
  messages: Message[]
  isLoading: boolean
  interactionMode: string
  isGuest: boolean
  queriesRemaining: number
}

export interface Conversation {
  _id: string
  title: string
  messages: Message[]
  createdAt: string
  updatedAt: string
}
