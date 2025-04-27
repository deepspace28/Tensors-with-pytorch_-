import { nanoid } from "nanoid"
import { getCollection } from "./mongodb"
import type { Message } from "@/types/chat"

export interface Conversation {
  _id: string
  userId: string
  title: string
  messages: Message[]
  createdAt: Date
  updatedAt: Date
}

export async function createConversation(userId: string): Promise<Conversation> {
  const conversations = await getCollection("conversations")

  const conversation: Conversation = {
    _id: nanoid(),
    userId,
    title: "New Conversation",
    messages: [],
    createdAt: new Date(),
    updatedAt: new Date(),
  }

  await conversations.insertOne(conversation)
  return conversation
}

export async function getConversation(conversationId: string): Promise<Conversation | null> {
  const conversations = await getCollection("conversations")
  return conversations.findOne({ _id: conversationId }) as Promise<Conversation | null>
}

export async function getUserConversations(userId: string): Promise<Conversation[]> {
  const conversations = await getCollection("conversations")
  return conversations.find({ userId }).sort({ updatedAt: -1 }).toArray() as Promise<Conversation[]>
}

export async function addMessageToConversation(conversationId: string, message: Message): Promise<Conversation | null> {
  const conversations = await getCollection("conversations")

  const result = await conversations.findOneAndUpdate(
    { _id: conversationId },
    {
      $push: { messages: message },
      $set: { updatedAt: new Date() },
    },
    { returnDocument: "after" },
  )

  return result as unknown as Conversation | null
}

export async function updateConversationTitle(conversationId: string, title: string): Promise<Conversation | null> {
  const conversations = await getCollection("conversations")

  const result = await conversations.findOneAndUpdate(
    { _id: conversationId },
    { $set: { title, updatedAt: new Date() } },
    { returnDocument: "after" },
  )

  return result as unknown as Conversation | null
}

export async function deleteConversation(conversationId: string): Promise<boolean> {
  const conversations = await getCollection("conversations")
  const result = await conversations.deleteOne({ _id: conversationId })
  return result.deletedCount === 1
}
