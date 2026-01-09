"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { Home, MessageSquare, BookOpen, Settings } from "lucide-react"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"

const navigation = [
  { name: "Dashboard", href: "/dashboard", icon: Home },
  { name: "Tutor", href: "/tutor", icon: MessageSquare },
  { name: "Courses", href: "/courses", icon: BookOpen },
  { name: "Settings", href: "/settings", icon: Settings },
]

interface SidebarProps {
  user: {
    name: string
    school?: string
  }
}

export function Sidebar({ user }: SidebarProps) {
  const pathname = usePathname()

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
          {user.school && (
            <p className="text-sm text-muted-foreground text-center">
              {user.school}
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
    </div>
  )
}
