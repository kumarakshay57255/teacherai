"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Mic, Send } from "lucide-react"

interface MessageInputProps {
  onSend: (message: string) => void
  disabled: boolean
}

export function MessageInput({ onSend, disabled }: MessageInputProps) {
  const [message, setMessage] = useState("")

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (message.trim() && !disabled) {
      onSend(message)
      setMessage("")
    }
  }

  return (
    <div className="p-4 border-t border-border">
      <form onSubmit={handleSubmit} className="flex gap-2">
        <Input
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="typing. . ."
          disabled={disabled}
          className="flex-1"
        />
        <Button
          type="submit"
          disabled={disabled || !message.trim()}
          size="icon"
        >
          <Send className="h-4 w-4" />
        </Button>
        <Button
          type="button"
          variant="destructive"
          size="icon"
          className="border-destructive"
        >
          <Mic className="h-4 w-4" />
        </Button>
      </form>
    </div>
  )
}
