"use client"

import { useState, useEffect } from "react"
import { AIAvatar } from "./AIAvatar"
import { MessageList } from "./MessageList"
import { MessageInput } from "./MessageInput"
import { mockMessages } from "@/lib/mockData"

interface Message {
  id: string
  role: "user" | "assistant"
  content: string
  createdAt: Date
}

interface ChatInterfaceProps {
  subject?: string
}

export function ChatInterface({ subject }: ChatInterfaceProps) {
  const [messages, setMessages] = useState<Message[]>(mockMessages)
  const [loading, setLoading] = useState(false)

  const handleSendMessage = async (content: string) => {
    // Add user message
    const userMessage: Message = {
      id: Date.now().toString(),
      role: "user",
      content,
      createdAt: new Date(),
    }
    setMessages((prev) => [...prev, userMessage])
    setLoading(true)

    // Simulate AI response with delay
    setTimeout(() => {
      const aiMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: "assistant",
        content: `This is a mock response from the AI tutor${
          subject ? ` for ${subject}` : ""
        }. In production, this would be a real AI-generated response based on your question: "${content}"`,
        createdAt: new Date(),
      }
      setMessages((prev) => [...prev, aiMessage])
      setLoading(false)
    }, 1500)
  }

  return (
    <div className="flex h-screen">
      {/* AI Avatar Section */}
      <div className="w-1/2 border-r border-border">
        <AIAvatar isActive={loading} subject={subject} />
      </div>

      {/* Chat Section */}
      <div className="w-1/2 flex flex-col">
        <div className="p-4 border-b border-border">
          <h2 className="text-xl font-bold">
            {subject ? `${subject} Tutor` : "AI Tutor"}
          </h2>
        </div>

        <MessageList messages={messages} loading={loading} />
        <MessageInput onSend={handleSendMessage} disabled={loading} />
      </div>
    </div>
  )
}
