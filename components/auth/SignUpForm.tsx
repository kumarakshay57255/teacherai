"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { authApi, academicApi, Board, Class } from "@/lib/api"

export function SignUpForm() {
  const router = useRouter()
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    boardId: "",
    classId: "",
  })
  const [boards, setBoards] = useState<Board[]>([])
  const [classes, setClasses] = useState<Class[]>([])
  const [loading, setLoading] = useState(false)
  const [loadingBoards, setLoadingBoards] = useState(true)
  const [loadingClasses, setLoadingClasses] = useState(false)
  const [error, setError] = useState("")

  // Fetch boards on mount
  useEffect(() => {
    const fetchBoards = async () => {
      setLoadingBoards(true)
      const response = await academicApi.getBoards()
      if (response.data) {
        setBoards(response.data)
      } else {
        setError("Failed to load boards. Please refresh the page.")
      }
      setLoadingBoards(false)
    }
    fetchBoards()
  }, [])

  // Fetch classes when board changes
  useEffect(() => {
    if (!formData.boardId) {
      setClasses([])
      return
    }

    const fetchClasses = async () => {
      setLoadingClasses(true)
      setFormData(prev => ({ ...prev, classId: "" }))
      const response = await academicApi.getClassesByBoard(formData.boardId)
      if (response.data) {
        setClasses(response.data)
      } else {
        setError("Failed to load classes. Please try again.")
      }
      setLoadingClasses(false)
    }
    fetchClasses()
  }, [formData.boardId])

  // Derive age from class name (e.g., "Class 5" -> age 10)
  const deriveAgeFromClass = (classId: string): number => {
    const selectedClass = classes.find(c => c.id === classId)
    if (!selectedClass) return 10 // default age

    const match = selectedClass.name.match(/\d+/)
    if (match) {
      const classNumber = parseInt(match[0], 10)
      return classNumber + 5 // Class 1 = ~6 years, Class 10 = ~15 years
    }
    return 10
  }

  // Generate random password
  const generatePassword = (): string => {
    const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%"
    let password = ""
    for (let i = 0; i < 12; i++) {
      password += chars.charAt(Math.floor(Math.random() * chars.length))
    }
    return password
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")

    // Validation
    if (!formData.name || !formData.phone) {
      setError("Please fill in all required fields")
      return
    }

    if (formData.name.trim().length < 2) {
      setError("Name must be at least 2 characters")
      return
    }

    if (formData.phone.length !== 10) {
      setError("Phone number must be 10 digits")
      return
    }

    if (!formData.boardId) {
      setError("Please select your board")
      return
    }

    if (!formData.classId) {
      setError("Please select your class")
      return
    }

    setLoading(true)

    const age = deriveAgeFromClass(formData.classId)
    const password = generatePassword()

    const response = await authApi.register({
      name: formData.name.trim(),
      age,
      mobile: formData.phone,
      email: formData.email || undefined,
      password,
      board_id: formData.boardId,
      class_id: formData.classId,
    })

    setLoading(false)

    if (response.error) {
      if (response.status === 409) {
        setError("An account with this phone number or email already exists. Please login instead.")
      } else {
        setError(response.error)
      }
      return
    }

    // Success - redirect to login
    router.push("/login?registered=true")
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
              disabled={loading}
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
              maxLength={10}
              disabled={loading}
            />
            {formData.phone && formData.phone.length < 10 && (
              <p className="text-sm text-foreground/60 mt-1">
                {formData.phone.length}/10 digits entered
              </p>
            )}
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
              disabled={loading}
            />
          </div>

          {/* Board Dropdown */}
          <div>
            <label htmlFor="board" className="block text-sm font-medium text-foreground mb-2">
              Select Your Board <span className="text-destructive">*</span>
            </label>
            <select
              id="board"
              value={formData.boardId}
              onChange={(e) => setFormData({ ...formData, boardId: e.target.value })}
              className="w-full px-3 py-2 bg-input border border-border rounded-md text-foreground focus:outline-none focus:ring-2 focus:ring-ring"
              disabled={loading || loadingBoards}
            >
              <option value="">
                {loadingBoards ? "Loading boards..." : "Choose your board"}
              </option>
              {boards.map((board) => (
                <option key={board.id} value={board.id}>
                  {board.name}
                </option>
              ))}
            </select>
          </div>

          {/* Class Dropdown */}
          <div>
            <label htmlFor="class" className="block text-sm font-medium text-foreground mb-2">
              Select Your Class <span className="text-destructive">*</span>
            </label>
            <select
              id="class"
              value={formData.classId}
              onChange={(e) => setFormData({ ...formData, classId: e.target.value })}
              className="w-full px-3 py-2 bg-input border border-border rounded-md text-foreground focus:outline-none focus:ring-2 focus:ring-ring"
              disabled={loading || loadingClasses || !formData.boardId}
            >
              <option value="">
                {!formData.boardId
                  ? "Select a board first"
                  : loadingClasses
                  ? "Loading classes..."
                  : "Choose your class"}
              </option>
              {classes.map((cls) => (
                <option key={cls.id} value={cls.id}>
                  {cls.name}
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
          <Button
            type="submit"
            className="w-full bg-primary hover:bg-primary/90 text-lg py-6"
            disabled={loading}
          >
            {loading ? "Creating Account..." : "Create Account"}
          </Button>

          {/* Login Link */}
          <p className="text-center text-sm text-foreground/60">
            Already have an account?{" "}
            <button
              type="button"
              onClick={() => router.push("/login")}
              className="text-primary hover:underline"
              disabled={loading}
            >
              Login here
            </button>
          </p>
        </form>
      </CardContent>
    </Card>
  )
}
