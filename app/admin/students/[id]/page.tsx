"use client"

import { use } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { mockStudents, mockChatSessions, mockActivityLog } from "@/lib/mockAdminData"
import { mockSubjects } from "@/lib/mockData"
import { formatDate, formatDateTime, formatDuration } from "@/lib/adminUtils"
import { ArrowLeft, Mail, Phone, School, GraduationCap, Clock, MessageSquare, Activity as ActivityIcon } from "lucide-react"

interface StudentDetailPageProps {
  params: Promise<{ id: string }>
}

export default function StudentDetailPage({ params }: StudentDetailPageProps) {
  const { id } = use(params)
  const student = mockStudents.find((s) => s.id === id)

  if (!student) {
    return (
      <div className="space-y-6">
        <div className="flex items-center space-x-4">
          <Link href="/admin/students">
            <Button variant="outline">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Students
            </Button>
          </Link>
        </div>
        <div className="text-center py-12">
          <p className="text-foreground/60">Student not found</p>
        </div>
      </div>
    )
  }

  // Get student's chat sessions
  const studentSessions = mockChatSessions.filter((s) => s.studentId === student.id)

  // Get student's activity log
  const studentActivity = mockActivityLog.filter((a) => a.userId === student.id).slice(0, 20)

  // Calculate subject-wise performance
  const subjectPerformance = student.subjects.map((subjectId) => {
    const subject = mockSubjects.find((s) => s.id === subjectId)
    const sessions = studentSessions.filter((s) => s.subject === subjectId)
    const messages = sessions.reduce((sum, s) => sum + s.messageCount, 0)

    return {
      subject: subject?.name || "Unknown",
      icon: subject?.icon || "📚",
      sessions: sessions.length,
      messages,
      lastActivity: sessions.length > 0
        ? sessions.sort((a, b) => b.startTime.getTime() - a.startTime.getTime())[0].startTime
        : null,
      performance: Math.floor(Math.random() * 30) + 70, // Mock performance score
    }
  })

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <Link href="/admin/students">
            <Button variant="outline">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Students
            </Button>
          </Link>
        </div>
        <div className="flex items-center space-x-2">
          <Button variant="outline">Edit Profile</Button>
          <Button variant="destructive">Suspend Account</Button>
        </div>
      </div>

      {/* Profile Section */}
      <Card className="bg-card border-border">
        <CardContent className="p-6">
          <div className="flex items-start space-x-6">
            <Avatar className="w-24 h-24">
              <AvatarFallback className="bg-primary text-primary-foreground text-3xl">
                {student.name.charAt(0).toUpperCase()}
              </AvatarFallback>
            </Avatar>
            <div className="flex-1">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-2xl font-bold text-foreground">{student.name}</h2>
                  <p className="text-sm text-foreground/60 mt-1">ID: {student.id}</p>
                </div>
                <Badge variant={student.status === "active" ? "success" : student.status === "inactive" ? "warning" : "danger"} className="text-lg px-4 py-2">
                  {student.status}
                </Badge>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
                <div className="flex items-center space-x-2 text-foreground/70">
                  <Mail className="w-4 h-4" />
                  <span>{student.email}</span>
                </div>
                <div className="flex items-center space-x-2 text-foreground/70">
                  <Phone className="w-4 h-4" />
                  <span>{student.phone}</span>
                </div>
                <div className="flex items-center space-x-2 text-foreground/70">
                  <School className="w-4 h-4" />
                  <span>{student.school}</span>
                </div>
                <div className="flex items-center space-x-2 text-foreground/70">
                  <GraduationCap className="w-4 h-4" />
                  <span>{student.class}</span>
                </div>
              </div>
              <div className="flex flex-wrap gap-2 mt-4">
                {student.subjects.map((subjectId) => {
                  const subject = mockSubjects.find((s) => s.id === subjectId)
                  return subject ? (
                    <Badge key={subject.id} variant="default">
                      {subject.icon} {subject.name}
                    </Badge>
                  ) : null
                })}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Engagement Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="bg-card border-border">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-foreground/60">Total Sessions</p>
                <p className="text-2xl font-bold text-foreground mt-1">{student.totalSessions}</p>
              </div>
              <MessageSquare className="w-10 h-10 text-purple-500 opacity-50" />
            </div>
          </CardContent>
        </Card>
        <Card className="bg-card border-border">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-foreground/60">Total Messages</p>
                <p className="text-2xl font-bold text-foreground mt-1">{student.totalMessages}</p>
              </div>
              <MessageSquare className="w-10 h-10 text-blue-500 opacity-50" />
            </div>
          </CardContent>
        </Card>
        <Card className="bg-card border-border">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-foreground/60">Avg Duration</p>
                <p className="text-2xl font-bold text-foreground mt-1">{formatDuration(student.averageSessionDuration)}</p>
              </div>
              <Clock className="w-10 h-10 text-green-500 opacity-50" />
            </div>
          </CardContent>
        </Card>
        <Card className="bg-card border-border">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-foreground/60">Last Active</p>
                <p className="text-lg font-bold text-foreground mt-1">{formatDate(student.lastActive)}</p>
              </div>
              <ActivityIcon className="w-10 h-10 text-amber-500 opacity-50" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Subject Performance & Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Subject Performance */}
        <Card className="bg-card border-border">
          <CardHeader>
            <CardTitle>Subject Performance</CardTitle>
            <CardDescription>Performance metrics for each enrolled subject</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {subjectPerformance.map((sp) => (
                <div key={sp.subject} className="border border-border rounded-lg p-4">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center space-x-2">
                      <span className="text-2xl">{sp.icon}</span>
                      <span className="font-medium text-foreground">{sp.subject}</span>
                    </div>
                    <Badge variant="success">{sp.performance}%</Badge>
                  </div>
                  <div className="grid grid-cols-3 gap-2 text-sm">
                    <div>
                      <p className="text-foreground/60">Sessions</p>
                      <p className="font-semibold text-foreground">{sp.sessions}</p>
                    </div>
                    <div>
                      <p className="text-foreground/60">Messages</p>
                      <p className="font-semibold text-foreground">{sp.messages}</p>
                    </div>
                    <div>
                      <p className="text-foreground/60">Last Activity</p>
                      <p className="font-semibold text-foreground">
                        {sp.lastActivity ? formatDate(sp.lastActivity) : "Never"}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Activity Timeline */}
        <Card className="bg-card border-border">
          <CardHeader>
            <CardTitle>Activity Timeline</CardTitle>
            <CardDescription>Recent activities and events</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4 max-h-[400px] overflow-y-auto">
              {studentActivity.map((activity) => (
                <div key={activity.id} className="flex items-start space-x-3 pb-3 border-b border-border last:border-0">
                  <div className={`w-2 h-2 rounded-full mt-2 flex-shrink-0 ${
                    activity.type === "registration" ? "bg-green-500" :
                    activity.type === "login" ? "bg-blue-500" :
                    activity.type === "chat_start" ? "bg-purple-500" :
                    activity.type === "chat_end" ? "bg-purple-400" :
                    "bg-gray-500"
                  }`}></div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm text-foreground font-medium truncate">{activity.description}</p>
                    <p className="text-xs text-foreground/60 mt-1">{formatDateTime(activity.timestamp)}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Chat History */}
      <Card className="bg-card border-border">
        <CardHeader>
          <CardTitle>Chat History</CardTitle>
          <CardDescription>All chat sessions with the AI tutor</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {studentSessions.slice(0, 10).map((session) => (
              <div key={session.id} className="flex items-center justify-between p-4 border border-border rounded-lg hover:border-primary/50 transition-colors">
                <div className="flex items-center space-x-4">
                  <div className="text-2xl">
                    {mockSubjects.find((s) => s.id === session.subject)?.icon || "📚"}
                  </div>
                  <div>
                    <p className="font-medium text-foreground">{session.subjectName}</p>
                    <p className="text-sm text-foreground/60">{formatDateTime(session.startTime)}</p>
                  </div>
                </div>
                <div className="flex items-center space-x-6">
                  <div className="text-right">
                    <p className="text-sm text-foreground/60">Duration</p>
                    <p className="font-semibold text-foreground">{formatDuration(session.duration)}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm text-foreground/60">Messages</p>
                    <p className="font-semibold text-foreground">{session.messageCount}</p>
                  </div>
                  <Badge variant={session.status === "completed" ? "success" : "info"}>
                    {session.status}
                  </Badge>
                  <Link href={`/admin/chats/${session.id}`}>
                    <Button variant="outline" size="sm">View</Button>
                  </Link>
                </div>
              </div>
            ))}
            {studentSessions.length === 0 && (
              <p className="text-center text-foreground/60 py-8">No chat sessions yet</p>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
