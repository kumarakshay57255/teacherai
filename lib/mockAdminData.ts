// Mock Admin Data for Teacher AI Admin Panel

import { mockSubjects } from "./mockData"

// Interfaces
export interface Student {
  id: string
  name: string
  email: string
  phone: string
  school: string
  class: string
  subjects: string[]
  registrationDate: Date
  lastActive: Date
  status: "active" | "inactive" | "suspended"
  totalSessions: number
  totalMessages: number
  averageSessionDuration: number // minutes
  profileImage?: string
  password: string
}

export interface ChatSession {
  id: string
  studentId: string
  studentName: string
  subject: string
  subjectName: string
  startTime: Date
  endTime?: Date
  duration: number // minutes
  messageCount: number
  status: "active" | "completed"
  messages: ChatMessage[]
}

export interface ChatMessage {
  id: string
  role: "user" | "assistant"
  content: string
  timestamp: Date
}

export interface ActivityLog {
  id: string
  type: "registration" | "login" | "chat_start" | "chat_end" | "profile_update" | "admin_action"
  userId: string
  userName: string
  description: string
  timestamp: Date
  metadata?: any
}

export interface AdminUser {
  id: string
  name: string
  email: string
  password: string
  role: "super_admin" | "admin" | "viewer"
}

// Mock Admin User
export const adminUser: AdminUser = {
  id: "admin-1",
  name: "Super Admin",
  email: "admin@teacherai.com",
  password: "admin123",
  role: "super_admin",
}

// Helper function to generate random date within range
function randomDate(start: Date, end: Date): Date {
  return new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()))
}

// Helper function to get random items from array
function getRandomItems<T>(arr: T[], count: number): T[] {
  const shuffled = [...arr].sort(() => 0.5 - Math.random())
  return shuffled.slice(0, count)
}

// Generate 50+ mock students
const firstNames = [
  "Aarav", "Vivaan", "Aditya", "Arjun", "Reyansh", "Ayaan", "Krishna", "Ishaan", "Shaurya", "Atharv",
  "Advika", "Aadhya", "Anika", "Ananya", "Diya", "Ira", "Kavya", "Kiara", "Mira", "Navya",
  "Raj", "Rohan", "Rishi", "Rudra", "Sai", "Samar", "Vihaan", "Yash", "Dev", "Dhruv",
  "Saanvi", "Sara", "Siya", "Tara", "Vanya", "Zara", "Priya", "Riya", "Myra", "Ira"
]

const lastNames = [
  "Sharma", "Patel", "Kumar", "Singh", "Gupta", "Reddy", "Verma", "Joshi", "Mehta", "Nair",
  "Rao", "Iyer", "Kapoor", "Malhotra", "Khanna", "Chopra", "Agarwal", "Bansal", "Saxena", "Trivedi"
]

const schools = [
  "Delhi Public School", "Kendriya Vidyalaya", "DAV Public School", "St. Xavier's School",
  "Ryan International School", "Narayana e-Techno School", "Chinmaya Vidyalaya",
  "Sardar Patel Vidyalaya", "Modern School", "The Heritage School", "Cambridge School",
  "Gyan Bharati School", "Amity International School", "Lotus Valley School", "Bal Bharati School"
]

const classes = Array.from({ length: 12 }, (_, i) => `Class ${i + 1}`)

export const mockStudents: Student[] = Array.from({ length: 55 }, (_, i) => {
  const firstName = firstNames[Math.floor(Math.random() * firstNames.length)]
  const lastName = lastNames[Math.floor(Math.random() * lastNames.length)]
  const name = `${firstName} ${lastName}`
  const email = `${firstName.toLowerCase()}.${lastName.toLowerCase()}${i}@example.com`
  const phone = `${Math.floor(Math.random() * 9000000000) + 1000000000}`
  const school = schools[Math.floor(Math.random() * schools.length)]
  const studentClass = classes[Math.floor(Math.random() * classes.length)]
  const subjectCount = Math.floor(Math.random() * 4) + 2 // 2-5 subjects
  const subjects = getRandomItems(mockSubjects.map(s => s.id), subjectCount)
  const registrationDate = randomDate(new Date(2024, 0, 1), new Date())
  const daysSinceReg = Math.floor((new Date().getTime() - registrationDate.getTime()) / (1000 * 60 * 60 * 24))
  const lastActive = randomDate(registrationDate, new Date())
  const status = Math.random() > 0.15 ? "active" : Math.random() > 0.5 ? "inactive" : "suspended"
  const totalSessions = Math.floor(Math.random() * 50) + 5
  const totalMessages = Math.floor(Math.random() * 500) + 20
  const averageSessionDuration = Math.floor(Math.random() * 45) + 10 // 10-55 minutes

  return {
    id: `student-${i + 1}`,
    name,
    email,
    phone,
    school,
    class: studentClass,
    subjects,
    registrationDate,
    lastActive,
    status,
    totalSessions,
    totalMessages,
    averageSessionDuration,
    password: "student123",
  }
})

// Generate mock chat sessions
export const mockChatSessions: ChatSession[] = []
let sessionIdCounter = 1

mockStudents.forEach((student) => {
  const sessionCount = Math.min(student.totalSessions, 10) // Max 10 sessions per student for mock data

  for (let i = 0; i < sessionCount; i++) {
    const subject = mockSubjects.find(s => s.id === student.subjects[Math.floor(Math.random() * student.subjects.length)])
    const startTime = randomDate(student.registrationDate, new Date())
    const duration = Math.floor(Math.random() * 60) + 5 // 5-65 minutes
    const endTime = new Date(startTime.getTime() + duration * 60000)
    const messageCount = Math.floor(Math.random() * 30) + 5
    const status = Math.random() > 0.1 ? "completed" : "active"

    // Generate mock messages for the session
    const messages: ChatMessage[] = []
    for (let j = 0; j < messageCount; j++) {
      const isUser = j % 2 === 0
      const msgTime = new Date(startTime.getTime() + (j * (duration * 60000 / messageCount)))

      messages.push({
        id: `msg-${sessionIdCounter}-${j}`,
        role: isUser ? "user" : "assistant",
        content: isUser
          ? `Student question about ${subject?.name} topic ${j / 2 + 1}`
          : `AI tutor response explaining the concept in detail...`,
        timestamp: msgTime,
      })
    }

    mockChatSessions.push({
      id: `session-${sessionIdCounter}`,
      studentId: student.id,
      studentName: student.name,
      subject: subject?.id || "1",
      subjectName: subject?.name || "Mathematics",
      startTime,
      endTime: status === "completed" ? endTime : undefined,
      duration,
      messageCount,
      status,
      messages,
    })

    sessionIdCounter++
  }
})

// Generate mock activity log
export const mockActivityLog: ActivityLog[] = []
let activityIdCounter = 1

// Registration activities
mockStudents.forEach((student) => {
  mockActivityLog.push({
    id: `activity-${activityIdCounter++}`,
    type: "registration",
    userId: student.id,
    userName: student.name,
    description: `${student.name} registered for Teacher AI`,
    timestamp: student.registrationDate,
    metadata: { email: student.email, class: student.class },
  })
})

// Login activities (random logins)
mockStudents.forEach((student) => {
  const loginCount = Math.floor(Math.random() * 20) + 5
  for (let i = 0; i < loginCount; i++) {
    mockActivityLog.push({
      id: `activity-${activityIdCounter++}`,
      type: "login",
      userId: student.id,
      userName: student.name,
      description: `${student.name} logged in`,
      timestamp: randomDate(student.registrationDate, new Date()),
    })
  }
})

// Chat activities
mockChatSessions.forEach((session) => {
  mockActivityLog.push({
    id: `activity-${activityIdCounter++}`,
    type: "chat_start",
    userId: session.studentId,
    userName: session.studentName,
    description: `${session.studentName} started a chat session on ${session.subjectName}`,
    timestamp: session.startTime,
    metadata: { sessionId: session.id, subject: session.subjectName },
  })

  if (session.status === "completed" && session.endTime) {
    mockActivityLog.push({
      id: `activity-${activityIdCounter++}`,
      type: "chat_end",
      userId: session.studentId,
      userName: session.studentName,
      description: `${session.studentName} completed chat session on ${session.subjectName}`,
      timestamp: session.endTime,
      metadata: {
        sessionId: session.id,
        subject: session.subjectName,
        duration: session.duration,
        messageCount: session.messageCount
      },
    })
  }
})

// Sort activity log by timestamp (newest first)
mockActivityLog.sort((a, b) => b.timestamp.getTime() - a.timestamp.getTime())

// Mock Analytics Data
export const mockAnalytics = {
  totalStudents: mockStudents.length,
  activeStudents: mockStudents.filter(s => {
    const daysSinceActive = (new Date().getTime() - s.lastActive.getTime()) / (1000 * 60 * 60 * 24)
    return daysSinceActive <= 7 && s.status === "active"
  }).length,
  totalSessions: mockChatSessions.length,
  averageSessionDuration: Math.round(
    mockChatSessions.reduce((sum, s) => sum + s.duration, 0) / mockChatSessions.length
  ),

  // Registration trend (last 30 days)
  registrationTrend: Array.from({ length: 30 }, (_, i) => {
    const date = new Date()
    date.setDate(date.getDate() - (29 - i))
    const dateStr = date.toISOString().split('T')[0]
    const count = mockStudents.filter(s => {
      const regDate = s.registrationDate.toISOString().split('T')[0]
      return regDate === dateStr
    }).length
    return { date: dateStr, count }
  }),

  // Subject distribution
  subjectDistribution: mockSubjects.map(subject => ({
    subject: subject.name,
    count: mockStudents.filter(s => s.subjects.includes(subject.id)).length,
  })),

  // Class distribution
  classDistribution: classes.map(cls => ({
    class: cls,
    count: mockStudents.filter(s => s.class === cls).length,
  })),

  // Daily active users (last 30 days)
  dailyActiveUsers: Array.from({ length: 30 }, (_, i) => {
    const date = new Date()
    date.setDate(date.getDate() - (29 - i))
    const dateStr = date.toISOString().split('T')[0]
    const count = mockStudents.filter(s => {
      const activeDate = s.lastActive.toISOString().split('T')[0]
      return activeDate === dateStr
    }).length
    return { date: dateStr, count: Math.max(count, Math.floor(Math.random() * 15)) }
  }),
}
