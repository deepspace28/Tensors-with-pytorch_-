"use client"

import type React from "react"
import { useState, useRef, useEffect } from "react"

interface ChatInterfaceProps {
  onSendMessage: (message: string) => void
  messages: { sender: string; content: string }[]
  isLoading: boolean
}

const ChatInterface: React.FC<ChatInterfaceProps> = ({ onSendMessage, messages, isLoading }) => {
  const [inputMessage, setInputMessage] = useState("")
  const chatContainerRef = useRef<HTMLDivElement>(null)

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputMessage(event.target.value)
  }

  const handleSendMessage = () => {
    if (inputMessage.trim() !== "") {
      onSendMessage(inputMessage)
      setInputMessage("")
    }
  }

  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight
    }
  }, [messages])

  return (
    <div className="flex flex-col h-full">
      <div ref={chatContainerRef} className="flex-grow overflow-y-auto p-4">
        {messages.map((message, index) => (
          <div key={index} className={`mb-2 ${message.sender === "user" ? "text-right" : "text-left"}`}>
            <span
              className={`inline-block p-2 rounded-lg ${message.sender === "user" ? "bg-blue-200" : "bg-gray-200"}`}
            >
              {message.content}
            </span>
          </div>
        ))}
        {isLoading && <div className="text-center">Loading...</div>}
      </div>
      <div className="p-4 border-t border-gray-300">
        <div className="flex">
          <input
            type="text"
            className="flex-grow border border-gray-300 rounded-md px-4 py-2 mr-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Type your message..."
            value={inputMessage}
            onChange={handleInputChange}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                handleSendMessage()
              }
            }}
          />
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-md focus:outline-none focus:shadow-outline"
            onClick={handleSendMessage}
          >
            Send
          </button>
        </div>
      </div>
    </div>
  )
}

export default ChatInterface
