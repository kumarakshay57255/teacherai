"use client"

import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Bell, Search, LogOut, User, ArrowLeftRight } from "lucide-react"
import { clearAdminAuth, getAdminAuth } from "@/lib/adminUtils"
import { useState, useEffect } from "react"

export function AdminHeader() {
  const router = useRouter()
  const [adminEmail, setAdminEmail] = useState<string>("")
  const [showProfileMenu, setShowProfileMenu] = useState(false)

  useEffect(() => {
    const auth = getAdminAuth()
    setAdminEmail(auth.adminEmail || "")
  }, [])

  const handleLogout = () => {
    clearAdminAuth()
    router.push("/admin/login")
  }

  const handleSwitchToStudent = () => {
    router.push("/")
  }

  return (
    <header className="bg-card border-b border-border px-6 py-4 sticky top-0 z-40">
      <div className="flex items-center justify-between">
        {/* Search Bar */}
        <div className="flex-1 max-w-xl">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-foreground/40 w-5 h-5" />
            <input
              type="text"
              placeholder="Search students, chats, activities..."
              className="w-full pl-10 pr-4 py-2 bg-secondary border border-border rounded-lg text-foreground placeholder:text-foreground/40 focus:outline-none focus:ring-2 focus:ring-primary"
            />
          </div>
        </div>

        {/* Right Section */}
        <div className="flex items-center space-x-4">
          {/* Notifications */}
          <button className="relative p-2 hover:bg-secondary rounded-lg transition-colors">
            <Bell className="w-5 h-5 text-foreground/70" />
            <span className="absolute top-1 right-1 w-2 h-2 bg-destructive rounded-full"></span>
          </button>

          {/* Admin Profile Dropdown */}
          <div className="relative">
            <button
              onClick={() => setShowProfileMenu(!showProfileMenu)}
              className="flex items-center space-x-3 px-3 py-2 hover:bg-secondary rounded-lg transition-colors"
            >
              <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center">
                <span className="text-sm font-bold text-white">A</span>
              </div>
              <div className="text-left hidden md:block">
                <div className="text-sm font-medium text-foreground">Admin</div>
                <div className="text-xs text-foreground/60">{adminEmail}</div>
              </div>
            </button>

            {/* Dropdown Menu */}
            {showProfileMenu && (
              <>
                <div
                  className="fixed inset-0 z-40"
                  onClick={() => setShowProfileMenu(false)}
                ></div>
                <div className="absolute right-0 mt-2 w-56 bg-card border border-border rounded-lg shadow-lg py-2 z-50">
                  <button
                    onClick={() => {
                      setShowProfileMenu(false)
                      // Add profile navigation here
                    }}
                    className="w-full px-4 py-2 text-left flex items-center space-x-2 hover:bg-secondary transition-colors"
                  >
                    <User className="w-4 h-4" />
                    <span>Profile</span>
                  </button>
                  <button
                    onClick={() => {
                      setShowProfileMenu(false)
                      handleSwitchToStudent()
                    }}
                    className="w-full px-4 py-2 text-left flex items-center space-x-2 hover:bg-secondary transition-colors"
                  >
                    <ArrowLeftRight className="w-4 h-4" />
                    <span>Switch to Student View</span>
                  </button>
                  <div className="border-t border-border my-2"></div>
                  <button
                    onClick={() => {
                      setShowProfileMenu(false)
                      handleLogout()
                    }}
                    className="w-full px-4 py-2 text-left flex items-center space-x-2 hover:bg-destructive/10 text-destructive transition-colors"
                  >
                    <LogOut className="w-4 h-4" />
                    <span>Logout</span>
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </header>
  )
}
