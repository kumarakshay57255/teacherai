"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { adminUser } from "@/lib/mockAdminData"
import { setAdminAuth } from "@/lib/adminUtils"
import { ShieldCheck, Lock, Mail } from "lucide-react"

export default function AdminLoginPage() {
  const router = useRouter()
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  })
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")
    setLoading(true)

    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 500))

    // Validate credentials (mock)
    if (formData.email === adminUser.email && formData.password === adminUser.password) {
      // Set admin auth
      setAdminAuth(adminUser.email)

      // Navigate to admin dashboard
      router.push("/admin/dashboard")
    } else {
      setError("Invalid email or password")
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex relative overflow-hidden bg-gradient-to-br from-background via-background to-primary/10">
      {/* Animated Background Effects */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="gradient-orb absolute top-20 left-20 w-96 h-96 bg-primary/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="gradient-orb animation-delay-2 absolute bottom-20 right-20 w-80 h-80 bg-purple-600/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="gradient-orb animation-delay-4 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-purple-500/10 rounded-full blur-3xl animate-pulse"></div>

        {/* Floating Particles */}
        <div className="particle absolute top-1/4 left-1/4 w-2 h-2 bg-primary/40 rounded-full animate-float"></div>
        <div className="particle animation-delay-2 absolute top-1/3 right-1/3 w-3 h-3 bg-purple-500/40 rounded-full animate-float"></div>
        <div className="particle animation-delay-3 absolute bottom-1/4 left-1/3 w-2 h-2 bg-primary/40 rounded-full animate-float"></div>
        <div className="particle animation-delay-4 absolute bottom-1/3 right-1/4 w-3 h-3 bg-purple-500/40 rounded-full animate-float"></div>
      </div>

      {/* Left Side - Admin Branding */}
      <div className="hidden lg:flex lg:w-1/2 relative z-10 items-center justify-center p-12">
        <div className="max-w-lg space-y-8 animate-slide-up">
          {/* Shield Icon */}
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-br from-primary/40 to-purple-600/40 rounded-full blur-3xl animate-pulse"></div>
            <div className="relative text-center">
              <div className="flex items-center justify-center mb-6">
                <ShieldCheck className="w-32 h-32 text-primary animate-float" />
              </div>
            </div>
          </div>

          {/* Description */}
          <div className="text-center space-y-4 animate-fade-in animation-delay-2">
            <h1 className="text-4xl font-bold text-foreground">
              Admin Portal
            </h1>
            <p className="text-xl text-foreground/70 leading-relaxed">
              Teacher AI Super Admin Panel
            </p>
            <p className="text-lg text-foreground/60">
              Manage students, track analytics, monitor platform performance, and make data-driven decisions.
            </p>
          </div>

          {/* Features */}
          <div className="space-y-4 animate-fade-in animation-delay-3">
            <div className="flex items-start space-x-3">
              <div className="mt-1 flex-shrink-0 w-8 h-8 bg-primary/20 rounded-full flex items-center justify-center">
                <span className="text-primary text-sm">✓</span>
              </div>
              <div>
                <div className="font-semibold text-foreground">Complete Student Management</div>
                <div className="text-sm text-foreground/60">View, edit, and manage all student accounts</div>
              </div>
            </div>
            <div className="flex items-start space-x-3">
              <div className="mt-1 flex-shrink-0 w-8 h-8 bg-primary/20 rounded-full flex items-center justify-center">
                <span className="text-primary text-sm">✓</span>
              </div>
              <div>
                <div className="font-semibold text-foreground">Real-time Analytics</div>
                <div className="text-sm text-foreground/60">Track engagement, performance, and platform metrics</div>
              </div>
            </div>
            <div className="flex items-start space-x-3">
              <div className="mt-1 flex-shrink-0 w-8 h-8 bg-primary/20 rounded-full flex items-center justify-center">
                <span className="text-primary text-sm">✓</span>
              </div>
              <div>
                <div className="font-semibold text-foreground">Comprehensive Reports</div>
                <div className="text-sm text-foreground/60">Export data and generate detailed reports</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Right Side - Login Form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-6 lg:p-12 relative z-10">
        <div className="w-full max-w-md animate-slide-up animation-delay-1">
          <Card className="bg-card border-border shadow-2xl">
            <CardHeader className="text-center">
              <div className="flex justify-center mb-4">
                <ShieldCheck className="w-16 h-16 text-primary" />
              </div>
              <CardTitle className="text-3xl font-bold text-foreground">Admin Login</CardTitle>
              <CardDescription className="text-foreground/60">
                Enter your credentials to access the admin panel
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-4">
                {/* Email */}
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-foreground mb-2">
                    Email Address
                  </label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-foreground/40 w-5 h-5" />
                    <Input
                      id="email"
                      type="email"
                      placeholder="admin@teacherai.com"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="bg-input border-border pl-10"
                      required
                    />
                  </div>
                </div>

                {/* Password */}
                <div>
                  <label htmlFor="password" className="block text-sm font-medium text-foreground mb-2">
                    Password
                  </label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-foreground/40 w-5 h-5" />
                    <Input
                      id="password"
                      type="password"
                      placeholder="Enter your password"
                      value={formData.password}
                      onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                      className="bg-input border-border pl-10"
                      required
                    />
                  </div>
                </div>

                {/* Error Message */}
                {error && (
                  <div className="p-3 bg-destructive/10 border border-destructive/30 rounded-md">
                    <p className="text-sm text-destructive">{error}</p>
                  </div>
                )}

                {/* Demo Credentials */}
                <div className="p-3 bg-primary/10 border border-primary/30 rounded-md">
                  <p className="text-xs text-foreground/70 mb-1 font-semibold">Demo Credentials:</p>
                  <p className="text-xs text-foreground/60">Email: admin@teacherai.com</p>
                  <p className="text-xs text-foreground/60">Password: admin123</p>
                </div>

                {/* Submit Button */}
                <Button
                  type="submit"
                  className="w-full bg-primary hover:bg-primary/90 text-lg py-6"
                  disabled={loading}
                >
                  {loading ? "Logging in..." : "Login to Admin Panel"}
                </Button>

                {/* Back to Main Site */}
                <div className="text-center">
                  <button
                    type="button"
                    onClick={() => router.push("/")}
                    className="text-sm text-primary hover:underline"
                  >
                    ← Back to main site
                  </button>
                </div>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
