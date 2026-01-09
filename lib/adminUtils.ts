// Admin Panel Utility Functions

import { Student, ChatSession, ActivityLog } from "./mockAdminData"

// Format date to readable string
export function formatDate(date: Date): string {
  return new Intl.DateTimeFormat("en-IN", {
    year: "numeric",
    month: "short",
    day: "numeric",
  }).format(date)
}

// Format date with time
export function formatDateTime(date: Date): string {
  return new Intl.DateTimeFormat("en-IN", {
    year: "numeric",
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  }).format(date)
}

// Format duration in minutes to readable string
export function formatDuration(minutes: number): string {
  if (minutes < 60) {
    return `${minutes}m`
  }
  const hours = Math.floor(minutes / 60)
  const mins = minutes % 60
  return mins > 0 ? `${hours}h ${mins}m` : `${hours}h`
}

// Calculate days ago
export function daysAgo(date: Date): string {
  const days = Math.floor((new Date().getTime() - date.getTime()) / (1000 * 60 * 60 * 24))
  if (days === 0) return "Today"
  if (days === 1) return "Yesterday"
  if (days < 7) return `${days} days ago`
  if (days < 30) return `${Math.floor(days / 7)} weeks ago`
  if (days < 365) return `${Math.floor(days / 30)} months ago`
  return `${Math.floor(days / 365)} years ago`
}

// Export students to CSV
export function exportStudentsToCSV(students: Student[]): string {
  const headers = ["ID", "Name", "Email", "Phone", "School", "Class", "Subjects", "Registration Date", "Last Active", "Status", "Total Sessions", "Total Messages"]
  const rows = students.map(s => [
    s.id,
    s.name,
    s.email,
    s.phone,
    s.school,
    s.class,
    s.subjects.join("; "),
    formatDate(s.registrationDate),
    formatDate(s.lastActive),
    s.status,
    s.totalSessions.toString(),
    s.totalMessages.toString(),
  ])

  const csvContent = [
    headers.join(","),
    ...rows.map(row => row.map(cell => `"${cell}"`).join(","))
  ].join("\n")

  return csvContent
}

// Export chat sessions to CSV
export function exportChatSessionsToCSV(sessions: ChatSession[]): string {
  const headers = ["Session ID", "Student Name", "Subject", "Start Time", "Duration (min)", "Message Count", "Status"]
  const rows = sessions.map(s => [
    s.id,
    s.studentName,
    s.subjectName,
    formatDateTime(s.startTime),
    s.duration.toString(),
    s.messageCount.toString(),
    s.status,
  ])

  const csvContent = [
    headers.join(","),
    ...rows.map(row => row.map(cell => `"${cell}"`).join(","))
  ].join("\n")

  return csvContent
}

// Download CSV file
export function downloadCSV(csvContent: string, filename: string): void {
  const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" })
  const link = document.createElement("a")
  const url = URL.createObjectURL(blob)
  link.setAttribute("href", url)
  link.setAttribute("download", filename)
  link.style.visibility = "hidden"
  document.body.appendChild(link)
  link.click()
  document.body.removeChild(link)
}

// Calculate percentage change
export function calculatePercentageChange(current: number, previous: number): number {
  if (previous === 0) return 100
  return Math.round(((current - previous) / previous) * 100)
}

// Filter students by search query
export function filterStudents(students: Student[], query: string): Student[] {
  const lowerQuery = query.toLowerCase()
  return students.filter(s =>
    s.name.toLowerCase().includes(lowerQuery) ||
    s.email.toLowerCase().includes(lowerQuery) ||
    s.phone.includes(lowerQuery) ||
    s.school.toLowerCase().includes(lowerQuery)
  )
}

// Get admin auth from localStorage
export function getAdminAuth(): { isAdmin: boolean; adminEmail?: string } {
  if (typeof window === "undefined") return { isAdmin: false }

  const role = localStorage.getItem("userRole")
  const email = localStorage.getItem("adminEmail")

  return {
    isAdmin: role === "admin",
    adminEmail: email || undefined,
  }
}

// Set admin auth in localStorage
export function setAdminAuth(email: string): void {
  localStorage.setItem("userRole", "admin")
  localStorage.setItem("adminEmail", email)
}

// Clear admin auth
export function clearAdminAuth(): void {
  localStorage.removeItem("userRole")
  localStorage.removeItem("adminEmail")
}

// Check if user is admin
export function isAdmin(): boolean {
  if (typeof window === "undefined") return false
  return localStorage.getItem("userRole") === "admin"
}
