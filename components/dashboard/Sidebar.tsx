"use client"

import Link from "next/link"
import { usePathname, useRouter } from "next/navigation"
import { Home, MessageSquare, BookOpen, Settings, LogOut } from "lucide-react"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"

const navigation = [
  { name: "Dashboard", href: "/dashboard", icon: Home },
  { name: "Tutor", href: "/tutor", icon: MessageSquare },
  // { name: "Courses", href: "/courses", icon: BookOpen },
  { name: "Settings", href: "/settings", icon: Settings },
]

interface SidebarProps {
  user: {
    name: string
    className?: string
  }
}

export function Sidebar({ user }: SidebarProps) {
  const pathname = usePathname()
  const router = useRouter()

  const handleLogout = () => {
    // Clear all user data from localStorage
    localStorage.removeItem("token")
    localStorage.removeItem("user")
    localStorage.removeItem("userName")
    localStorage.removeItem("userPhone")
    localStorage.removeItem("userEmail")
    localStorage.removeItem("userSchool")
    localStorage.removeItem("userClass")
    localStorage.removeItem("userRole")
    localStorage.removeItem("adminEmail")

    // Redirect to login
    router.push("/login")
  }

  return (
    <div className="w-64 bg-card border-r border-border flex flex-col h-screen">
      {/* User Profile */}
      <div className="p-6 border-b border-border">
        <div className="flex flex-col items-center">
          <Avatar className="h-16 w-16 mb-3">
            <AvatarFallback className="bg-primary text-primary-foreground text-2xl font-bold">
              {user.name?.[0]?.toUpperCase() || "U"}
            </AvatarFallback>
          </Avatar>
          <h3 className="font-semibold text-center">{user.name}</h3>
          {user.className && (
            <p className="text-sm text-muted-foreground text-center">
              {user.className}
            </p>
          )}
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-4 space-y-2">
        {navigation.map((item) => {
          const Icon = item.icon
          const isActive = pathname === item.href

          return (
            <Link
              key={item.name}
              href={item.href}
              className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                isActive
                  ? "bg-primary text-primary-foreground"
                  : "hover:bg-accent text-muted-foreground hover:text-foreground"
              }`}
            >
              <Icon className="h-5 w-5" />
              <span>{item.name}</span>
            </Link>
          )
        })}
      </nav>

      {/* Logout Button */}
      <div className="p-4 border-t border-border">
        <Button
          variant="ghost"
          className="w-full justify-start text-destructive hover:text-destructive hover:bg-destructive/10"
          onClick={handleLogout}
        >
          <LogOut className="h-5 w-5 mr-3" />
          Logout
        </Button>
      </div>
    </div>
  )
}
