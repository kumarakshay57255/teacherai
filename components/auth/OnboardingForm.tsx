"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader } from "@/components/ui/card"

export function OnboardingForm() {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [formData, setFormData] = useState({
    name: "",
    phone: typeof window !== "undefined" ? localStorage.getItem("userPhone") || "" : "",
    school: "",
    subject: "",
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    // Simulate API call
    setTimeout(() => {
      // Save to localStorage
      localStorage.setItem("userName", formData.name)
      localStorage.setItem("userSchool", formData.school)
      localStorage.setItem("userSubject", formData.subject)

      setLoading(false)
      router.push("/dashboard")
    }, 1000)
  }

  return (
    <Card className="w-full max-w-md">
      <CardHeader className="space-y-1">
        <h2 className="text-2xl font-bold text-center">Complete Your Profile</h2>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Input
              placeholder="Name"
              value={formData.name}
              onChange={(e) =>
                setFormData({ ...formData, name: e.target.value })
              }
              required
            />
          </div>

          <div className="space-y-2">
            <Input
              placeholder="Phone Number"
              value={formData.phone}
              onChange={(e) =>
                setFormData({ ...formData, phone: e.target.value })
              }
              disabled
            />
          </div>

          <div className="space-y-2">
            <Input
              placeholder="School/Inst"
              value={formData.school}
              onChange={(e) =>
                setFormData({ ...formData, school: e.target.value })
              }
              required
            />
          </div>

          <div className="space-y-2">
            <Input
              placeholder="subjectt"
              value={formData.subject}
              onChange={(e) =>
                setFormData({ ...formData, subject: e.target.value })
              }
              required
            />
          </div>

          <Button type="submit" disabled={loading} className="w-full">
            {loading ? "Submitting..." : "subject"}
          </Button>
        </form>
      </CardContent>
    </Card>
  )
}
