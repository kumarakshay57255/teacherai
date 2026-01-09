"use client"

import { useEffect, useState } from "react"
import { useRouter, usePathname } from "next/navigation"
import { AdminSidebar } from "@/components/admin/AdminSidebar"
import { AdminHeader } from "@/components/admin/AdminHeader"
import { isAdmin } from "@/lib/adminUtils"

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const router = useRouter()
  const pathname = usePathname()
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Skip auth check for login page
    if (pathname === "/admin/login") {
      setIsLoading(false)
      return
    }

    // Check if user is admin
    const adminAuth = isAdmin()

    if (!adminAuth) {
      // Redirect to admin login
      router.push("/admin/login")
    } else {
      setIsLoading(false)
    }
  }, [pathname, router])

  // Show loading state while checking auth
  if (isLoading && pathname !== "/admin/login") {
    return (
      <div className="flex items-center justify-center min-h-screen bg-background">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-foreground/60">Loading admin panel...</p>
        </div>
      </div>
    )
  }

  // Login page doesn't need layout
  if (pathname === "/admin/login") {
    return <>{children}</>
  }

  // Admin panel layout
  return (
    <div className="flex h-screen bg-background overflow-hidden">
      <AdminSidebar />
      <div className="flex-1 flex flex-col overflow-hidden">
        <AdminHeader />
        <main className="flex-1 overflow-y-auto p-6">
          {children}
        </main>
      </div>
    </div>
  )
}
