"use client"

import { useState, useEffect, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Mic, MicOff, Send } from "lucide-react"

interface MessageInputProps {
  onSend: (message: string) => void
  disabled: boolean
}

// Type definitions for Web Speech API
interface SpeechRecognitionEvent extends Event {
  results: SpeechRecognitionResultList
  resultIndex: number
}

interface SpeechRecognitionErrorEvent extends Event {
  error: string
  message: string
}

interface SpeechRecognition extends EventTarget {
  continuous: boolean
  interimResults: boolean
  lang: string
  start: () => void
  stop: () => void
  abort: () => void
  onresult: ((event: SpeechRecognitionEvent) => void) | null
  onerror: ((event: SpeechRecognitionErrorEvent) => void) | null
  onend: (() => void) | null
  onstart: (() => void) | null
}

declare global {
  interface Window {
    SpeechRecognition: new () => SpeechRecognition
    webkitSpeechRecognition: new () => SpeechRecognition
  }
}

const SILENCE_TIMEOUT_MS = 3000 // 5 seconds of silence before auto-stop

export function MessageInput({ onSend, disabled }: MessageInputProps) {
  const [message, setMessage] = useState("")
  const [isListening, setIsListening] = useState(false)
  const [isSupported, setIsSupported] = useState(true)
  const recognitionRef = useRef<SpeechRecognition | null>(null)
  const silenceTimeoutRef = useRef<NodeJS.Timeout | null>(null)

  useEffect(() => {
    // Check if browser supports Speech Recognition
    if (typeof window !== "undefined") {
      const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition
      if (!SpeechRecognition) {
        setIsSupported(false)
        return
      }

      const recognition = new SpeechRecognition()
      recognition.continuous = true
      recognition.interimResults = true
      recognition.lang = "en-IN" // English (India)

      recognition.onresult = (event: SpeechRecognitionEvent) => {
        let finalTranscript = ""
        let interimTranscript = ""

        for (let i = event.resultIndex; i < event.results.length; i++) {
          const transcript = event.results[i][0].transcript
          if (event.results[i].isFinal) {
            finalTranscript += transcript
          } else {
            interimTranscript += transcript
          }
        }

        // Update message with final + interim results
        if (finalTranscript) {
          setMessage((prev) => prev + finalTranscript)
        }

        // Reset silence timeout whenever speech is detected
        if (silenceTimeoutRef.current) {
          clearTimeout(silenceTimeoutRef.current)
        }
        silenceTimeoutRef.current = setTimeout(() => {
          if (recognitionRef.current) {
            recognitionRef.current.stop()
          }
        }, SILENCE_TIMEOUT_MS)
      }

      recognition.onerror = (event: SpeechRecognitionErrorEvent) => {
        console.error("Speech recognition error:", event.error)
        setIsListening(false)
        if (silenceTimeoutRef.current) {
          clearTimeout(silenceTimeoutRef.current)
          silenceTimeoutRef.current = null
        }
      }

      recognition.onend = () => {
        setIsListening(false)
        if (silenceTimeoutRef.current) {
          clearTimeout(silenceTimeoutRef.current)
          silenceTimeoutRef.current = null
        }
      }

      recognitionRef.current = recognition
    }

    return () => {
      if (recognitionRef.current) {
        recognitionRef.current.abort()
      }
      if (silenceTimeoutRef.current) {
        clearTimeout(silenceTimeoutRef.current)
      }
    }
  }, [])

  const toggleListening = () => {
    if (!recognitionRef.current || !isSupported) return

    if (isListening) {
      recognitionRef.current.stop()
      setIsListening(false)
      if (silenceTimeoutRef.current) {
        clearTimeout(silenceTimeoutRef.current)
        silenceTimeoutRef.current = null
      }
    } else {
      try {
        recognitionRef.current.start()
        setIsListening(true)
        // Start initial silence timeout in case user doesn't speak
        silenceTimeoutRef.current = setTimeout(() => {
          if (recognitionRef.current) {
            recognitionRef.current.stop()
          }
        }, SILENCE_TIMEOUT_MS)
      } catch (error) {
        console.error("Failed to start speech recognition:", error)
      }
    }
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (message.trim() && !disabled) {
      // Stop listening if we're submitting
      if (isListening && recognitionRef.current) {
        recognitionRef.current.stop()
        setIsListening(false)
      }
      if (silenceTimeoutRef.current) {
        clearTimeout(silenceTimeoutRef.current)
        silenceTimeoutRef.current = null
      }
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
          placeholder={isListening ? "Listening..." : "typing. . ."}
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
          variant={isListening ? "default" : "destructive"}
          size="icon"
          className={isListening ? "bg-green-600 hover:bg-green-700 animate-pulse" : "border-destructive"}
          onClick={toggleListening}
          disabled={disabled || !isSupported}
          title={!isSupported ? "Speech recognition not supported in this browser" : isListening ? "Stop listening" : "Start voice input"}
        >
          {isListening ? <MicOff className="h-4 w-4" /> : <Mic className="h-4 w-4" />}
        </Button>
      </form>
      {!isSupported && (
        <p className="text-xs text-destructive mt-2">
          Speech recognition is not supported in your browser. Try Chrome or Edge.
        </p>
      )}
    </div>
  )
}
