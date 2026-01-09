"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

export function SignUpForm() {
  const router = useRouter()
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    school: "",
    class: "",
  })
  const [error, setError] = useState("")

  const classes = [
    "Class 1", "Class 2", "Class 3", "Class 4", "Class 5",
    "Class 6", "Class 7", "Class 8", "Class 9", "Class 10",
    "Class 11", "Class 12"
  ]

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")

    // Validation
    if (!formData.name || !formData.phone) {
      setError("Please fill in all required fields")
      return
    }

    if (formData.phone.length !== 10) {
      setError("Phone number must be 10 digits")
      return
    }

    if (!formData.class) {
      setError("Please select your class")
      return
    }

    // Mock signup - save to localStorage
    localStorage.setItem("userName", formData.name)
    localStorage.setItem("userPhone", formData.phone)
    if (formData.email) {
      localStorage.setItem("userEmail", formData.email)
    }
    localStorage.setItem("userSchool", formData.school)
    localStorage.setItem("userClass", formData.class)

    // Navigate to dashboard
    router.push("/dashboard")
  }

  return (
    <Card className="w-full max-w-2xl bg-card border-border shadow-2xl">
      <CardHeader className="text-center">
        <CardTitle className="text-3xl font-bold text-foreground">Create Your Account</CardTitle>
        <CardDescription className="text-foreground/60">
          Join Teacher AI and start your learning journey
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Name */}
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-foreground mb-2">
              Full Name <span className="text-destructive">*</span>
            </label>
            <Input
              id="name"
              type="text"
              placeholder="Enter your full name"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className="bg-input border-border"
            />
          </div>

          {/* Phone */}
          <div>
            <label htmlFor="phone" className="block text-sm font-medium text-foreground mb-2">
              Phone Number <span className="text-destructive">*</span>
            </label>
            <Input
              id="phone"
              type="tel"
              placeholder="Enter 10-digit phone number"
              value={formData.phone}
              onChange={(e) => setFormData({ ...formData, phone: e.target.value.replace(/\D/g, "").slice(0, 10) })}
              className="bg-input border-border"
            />
          </div>

          {/* Email */}
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-foreground mb-2">
              Email <span className="text-foreground/60 text-xs">(Optional)</span>
            </label>
            <Input
              id="email"
              type="email"
              placeholder="Enter your email (optional)"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              className="bg-input border-border"
            />
          </div>

          {/* School */}
          <div>
            <label htmlFor="school" className="block text-sm font-medium text-foreground mb-2">
              School Name
            </label>
            <Input
              id="school"
              type="text"
              placeholder="Enter your school name (optional)"
              value={formData.school}
              onChange={(e) => setFormData({ ...formData, school: e.target.value })}
              className="bg-input border-border"
            />
          </div>

          {/* Class Dropdown */}
          <div>
            <label htmlFor="class" className="block text-sm font-medium text-foreground mb-2">
              Select Your Class <span className="text-destructive">*</span>
            </label>
            <select
              id="class"
              value={formData.class}
              onChange={(e) => setFormData({ ...formData, class: e.target.value })}
              className="w-full px-3 py-2 bg-input border border-border rounded-md text-foreground focus:outline-none focus:ring-2 focus:ring-ring"
            >
              <option value="">Choose your class</option>
              {classes.map((cls) => (
                <option key={cls} value={cls}>
                  {cls}
                </option>
              ))}
            </select>
          </div>

          {/* Error Message */}
          {error && (
            <div className="p-3 bg-destructive/10 border border-destructive/30 rounded-md">
              <p className="text-sm text-destructive">{error}</p>
            </div>
          )}

          {/* Submit Button */}
          <Button type="submit" className="w-full bg-primary hover:bg-primary/90 text-lg py-6">
            Create Account
          </Button>

          {/* Login Link */}
          <p className="text-center text-sm text-foreground/60">
            Already have an account?{" "}
            <button
              type="button"
              onClick={() => router.push("/login")}
              className="text-primary hover:underline"
            >
              Login here
            </button>
          </p>
        </form>
      </CardContent>
    </Card>
  )
}
