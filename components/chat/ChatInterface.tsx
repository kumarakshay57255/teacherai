"use client"

import { useState, useEffect } from "react"
import { AIAvatar } from "./AIAvatar"
import { MessageList } from "./MessageList"
import { MessageInput } from "./MessageInput"
import { academicApi, tutorApi, Topic, Subject, User } from "@/lib/api"

interface Message {
  id: string
  role: "user" | "assistant"
  content: string
  createdAt: Date
}

interface ChatInterfaceProps {
  subjectId?: string
  subjectName?: string
}

export function ChatInterface({ subjectId: initialSubjectId, subjectName: initialSubjectName }: ChatInterfaceProps) {
  const [messages, setMessages] = useState<Message[]>([])
  const [loading, setLoading] = useState(false)
  const [sessionId, setSessionId] = useState<string | null>(null)
  const [topics, setTopics] = useState<Topic[]>([])
  const [selectedTopic, setSelectedTopic] = useState<Topic | null>(null)
  const [loadingTopics, setLoadingTopics] = useState(false)
  const [error, setError] = useState("")

  // Subject selection state
  const [subjects, setSubjects] = useState<Subject[]>([])
  const [selectedSubject, setSelectedSubject] = useState<{ id: string; name: string } | null>(
    initialSubjectId ? { id: initialSubjectId, name: initialSubjectName || "Subject" } : null
  )
  const [loadingSubjects, setLoadingSubjects] = useState(false)

  // Fetch subjects when no subject is provided
  useEffect(() => {
    if (initialSubjectId) return // Skip if subject already provided via URL

    const fetchSubjects = async () => {
      setLoadingSubjects(true)
      setError("")

      const userDataStr = localStorage.getItem("user")
      if (!userDataStr) {
        setError("Please log in to view subjects")
        setLoadingSubjects(false)
        return
      }

      try {
        const userData: User = JSON.parse(userDataStr)
        if (!userData.classId) {
          setError("No class assigned. Please update your profile in Settings.")
          setLoadingSubjects(false)
          return
        }

        const response = await academicApi.getSubjectsByClass(userData.classId)
        if (response.data) {
          setSubjects(response.data)
        } else {
          setError(response.error || "Failed to load subjects")
        }
      } catch {
        setError("Failed to load user data")
      }

      setLoadingSubjects(false)
    }

    fetchSubjects()
  }, [initialSubjectId])

  // Fetch topics when subject is selected
  useEffect(() => {
    if (!selectedSubject) return

    const fetchTopics = async () => {
      setLoadingTopics(true)
      setError("")
      const response = await academicApi.getTopicsBySubject(selectedSubject.id)
      if (response.data) {
        setTopics(response.data)
      } else {
        setError(response.error || "Failed to load topics")
      }
      setLoadingTopics(false)
    }

    fetchTopics()
  }, [selectedSubject])

  // Handle subject selection
  const handleSubjectSelect = (subject: Subject) => {
    setSelectedSubject({ id: subject.id, name: subject.name })
    setTopics([])
    setSelectedTopic(null)
  }

  // Create session and add welcome message when topic is selected
  const handleTopicSelect = async (topic: Topic) => {
    if (!selectedSubject) return

    setSelectedTopic(topic)
    setLoading(true)
    setError("")

    // Create a new tutoring session
    const response = await tutorApi.createSession({
      subjectId: selectedSubject.id,
      topicId: topic.id,
    })

    if (response.data) {
      setSessionId(response.data.id)
      // Add welcome message
      setMessages([
        {
          id: "welcome",
          role: "assistant",
          content: `Hello! I'm your AI tutor for ${selectedSubject.name}. I'll help you learn about "${topic.name}". Feel free to ask me any questions!`,
          createdAt: new Date(),
        },
      ])
    } else {
      setError(response.error || "Failed to create session")
    }

    setLoading(false)
  }

  const handleSendMessage = async (content: string) => {
    if (!sessionId) {
      setError("No active session. Please select a topic first.")
      return
    }

    // Add user message
    const userMessage: Message = {
      id: Date.now().toString(),
      role: "user",
      content,
      createdAt: new Date(),
    }
    setMessages((prev) => [...prev, userMessage])
    setLoading(true)
    setError("")

    // Send message to API
    const response = await tutorApi.sendMessage({
      sessionId,
      content,
    })

    if (response.data) {
      // Add AI response
      const aiMessage: Message = {
        id: response.data.tutorMessage.id,
        role: "assistant",
        content: response.data.tutorMessage.content,
        createdAt: new Date(response.data.tutorMessage.createdAt),
      }
      setMessages((prev) => [...prev, aiMessage])
    } else {
      setError(response.error || "Failed to get response")
      // Remove the user message if API failed
      setMessages((prev) => prev.filter((m) => m.id !== userMessage.id))
    }

    setLoading(false)
  }

  // If no subject selected, show subject selection
  if (!selectedSubject) {
    return (
      <div className="flex items-center justify-center h-full">
        <div className="w-full max-w-md p-8">
          <h2 className="text-2xl font-bold mb-2">Select a Subject</h2>
          <p className="text-foreground/60 mb-6">Choose a subject to start learning</p>

          {loadingSubjects ? (
            <div className="text-center py-8">
              <p className="text-foreground/60">Loading subjects...</p>
            </div>
          ) : error ? (
            <div className="p-4 bg-destructive/10 border border-destructive/30 rounded-lg">
              <p className="text-destructive">{error}</p>
            </div>
          ) : subjects.length === 0 ? (
            <div className="p-4 bg-secondary rounded-lg">
              <p className="text-foreground/60">No subjects available for your class.</p>
            </div>
          ) : (
            <div className="space-y-2">
              {subjects.map((subject) => (
                <button
                  key={subject.id}
                  onClick={() => handleSubjectSelect(subject)}
                  className="w-full p-4 text-left bg-secondary hover:bg-secondary/80 rounded-lg transition-colors"
                >
                  {subject.name}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>
    )
  }

  // If subject selected but no topic, show topic selection
  if (!selectedTopic) {
    return (
      <div className="flex items-center justify-center h-full">
        <div className="w-full max-w-md p-8">
          <div className="flex items-center justify-between mb-2">
            <h2 className="text-2xl font-bold">{selectedSubject.name}</h2>
            <button
              onClick={() => setSelectedSubject(null)}
              className="text-sm text-foreground/60 hover:text-foreground"
            >
              Change Subject
            </button>
          </div>
          <p className="text-foreground/60 mb-6">Select a topic to start learning</p>

          {loadingTopics ? (
            <div className="text-center py-8">
              <p className="text-foreground/60">Loading topics...</p>
            </div>
          ) : error ? (
            <div className="p-4 bg-destructive/10 border border-destructive/30 rounded-lg">
              <p className="text-destructive">{error}</p>
            </div>
          ) : topics.length === 0 ? (
            <div className="p-4 bg-secondary rounded-lg">
              <p className="text-foreground/60">No topics available for this subject.</p>
            </div>
          ) : (
            <div className="space-y-2">
              {topics.map((topic) => (
                <button
                  key={topic.id}
                  onClick={() => handleTopicSelect(topic)}
                  className="w-full p-4 text-left bg-secondary hover:bg-secondary/80 rounded-lg transition-colors"
                  disabled={loading}
                >
                  {topic.name}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>
    )
  }

  // Chat interface
  return (
    <div className="flex h-full">
      {/* AI Avatar Section */}
      <div className="w-1/2 border-r border-border">
        <AIAvatar isActive={loading} subject={selectedSubject.name} />
      </div>

      {/* Chat Section */}
      <div className="w-1/2 flex flex-col">
        <div className="p-4 border-b border-border">
          <h2 className="text-xl font-bold">
            {selectedSubject.name} Tutor
          </h2>
          <p className="text-sm text-foreground/60">Topic: {selectedTopic.name}</p>
        </div>

        {error && (
          <div className="p-3 mx-4 mt-4 bg-destructive/10 border border-destructive/30 rounded-lg">
            <p className="text-sm text-destructive">{error}</p>
          </div>
        )}

        <MessageList messages={messages} loading={loading} />
        <MessageInput onSend={handleSendMessage} disabled={loading} />
      </div>
    </div>
  )
}
