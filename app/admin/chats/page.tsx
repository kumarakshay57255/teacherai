"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { mockChatSessions } from "@/lib/mockAdminData"
import { formatDateTime, formatDuration } from "@/lib/adminUtils"
import { MessageSquare, Eye } from "lucide-react"

export default function ChatsPage() {
  const [sessions] = useState(mockChatSessions.slice(0, 20))

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-foreground">Chat Sessions</h1>
        <p className="text-foreground/60 mt-1">Monitor and review all AI tutor chat sessions</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="bg-card border-border">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-foreground/60">Total Sessions</p>
                <p className="text-3xl font-bold text-foreground mt-2">{mockChatSessions.length}</p>
              </div>
              <MessageSquare className="w-10 h-10 text-purple-500 opacity-50" />
            </div>
          </CardContent>
        </Card>
        <Card className="bg-card border-border">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-foreground/60">Active Sessions</p>
                <p className="text-3xl font-bold text-foreground mt-2">
                  {mockChatSessions.filter(s => s.status === "active").length}
                </p>
              </div>
              <MessageSquare className="w-10 h-10 text-green-500 opacity-50" />
            </div>
          </CardContent>
        </Card>
        <Card className="bg-card border-border">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-foreground/60">Completed</p>
                <p className="text-3xl font-bold text-foreground mt-2">
                  {mockChatSessions.filter(s => s.status === "completed").length}
                </p>
              </div>
              <MessageSquare className="w-10 h-10 text-blue-500 opacity-50" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Chat Sessions List */}
      <Card className="bg-card border-border">
        <CardHeader>
          <CardTitle>Recent Chat Sessions</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {sessions.map((session) => (
              <div key={session.id} className="flex items-center justify-between p-4 border border-border rounded-lg hover:border-primary/50 transition-colors">
                <div>
                  <p className="font-medium text-foreground">{session.studentName}</p>
                  <p className="text-sm text-foreground/60 mt-1">
                    {session.subjectName} • {formatDateTime(session.startTime)}
                  </p>
                </div>
                <div className="flex items-center space-x-4">
                  <div className="text-right">
                    <p className="text-sm font-medium text-foreground">{formatDuration(session.duration)}</p>
                    <p className="text-xs text-foreground/60">{session.messageCount} messages</p>
                  </div>
                  <Badge variant={session.status === "completed" ? "success" : "info"}>
                    {session.status}
                  </Badge>
                  <Button variant="outline" size="sm">
                    <Eye className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
