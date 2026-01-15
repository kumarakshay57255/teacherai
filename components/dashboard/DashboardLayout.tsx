"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { Sidebar } from "./Sidebar"

interface User {
  id: string
  name: string
  mobile?: string
  boardId?: string
  classId?: string
}

export function DashboardLayout({ children }: { children: React.ReactNode }) {
  const router = useRouter()
  const [user, setUser] = useState({
    name: "User",
    className: "",
  })
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Check if user is logged in
    const token = localStorage.getItem("token")
    const userDataStr = localStorage.getItem("user")

    if (!token || !userDataStr) {
      // Not logged in, redirect to login
      router.push("/login")
      return
    }

    try {
      const userData: User = JSON.parse(userDataStr)
      setUser({
        name: userData.name || "User",
        className: "", // We can fetch class name from API if needed
      })
    } catch {
      // Invalid user data, redirect to login
      router.push("/login")
      return
    }

    setLoading(false)
  }, [router])

  if (loading) {
    return (
      <div className="flex h-screen bg-background items-center justify-center">
        <div className="text-foreground/60">Loading...</div>
      </div>
    )
  }

  return (
    <div className="flex h-screen bg-background">
      <Sidebar user={user} />
      <main className="flex-1 overflow-y-auto">{children}</main>
    </div>
  )
}
