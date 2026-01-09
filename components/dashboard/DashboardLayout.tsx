"use client"

import { useEffect, useState } from "react"
import { Sidebar } from "./Sidebar"

export function DashboardLayout({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState({
    name: "User",
    school: "",
  })

  useEffect(() => {
    // Load user data from localStorage
    const name = localStorage.getItem("userName") || "User"
    const school = localStorage.getItem("userSchool") || ""
    setUser({ name, school })
  }, [])

  return (
    <div className="flex h-screen bg-background">
      <Sidebar user={user} />
      <main className="flex-1 overflow-y-auto">{children}</main>
    </div>
  )
}
