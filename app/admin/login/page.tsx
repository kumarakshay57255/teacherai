"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { adminApi } from "@/lib/api"

export default function AdminLoginPage() {
  const router = useRouter()
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!email || !password) {
      setError("Please enter both email and password")
      return
    }

    setLoading(true)
    setError("")

    const response = await adminApi.login(email, password)

    if (response.data) {
      // Store admin token and user data
      localStorage.setItem("adminToken", response.data.token)
      localStorage.setItem("adminUser", JSON.stringify(response.data.user))
      localStorage.setItem("userRole", "admin")
      router.push("/admin/dashboard")
    } else {
      setError(response.error || "Login failed")
    }

    setLoading(false)
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-background">
      <div className="w-full max-w-md p-8">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold mb-2">Admin Login</h1>
          <p className="text-foreground/60">Sign in to access the admin panel</p>
        </div>

        <form onSubmit={handleLogin} className="space-y-6">
          {error && (
            <div className="p-4 bg-destructive/10 border border-destructive/30 rounded-lg">
              <p className="text-sm text-destructive">{error}</p>
            </div>
          )}

          <div>
            <label htmlFor="email" className="block text-sm font-medium mb-2">
              Email
            </label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-3 bg-secondary border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
              placeholder="admin@teacherai.com"
              disabled={loading}
            />
          </div>

          <div>
            <label htmlFor="password" className="block text-sm font-medium mb-2">
              Password
            </label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-3 bg-secondary border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
              placeholder="Enter your password"
              disabled={loading}
            />
          </div>

          <Button
            type="submit"
            className="w-full py-6 text-lg"
            disabled={loading}
          >
            {loading ? "Signing in..." : "Sign In"}
          </Button>
        </form>
      </div>
    </div>
  )
}
