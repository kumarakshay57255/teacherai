"use client"

import { useEffect, useState } from "react"
import { DashboardLayout } from "@/components/dashboard/DashboardLayout"
import { SubjectPill } from "@/components/dashboard/SubjectPill"
import { academicApi, Subject, User } from "@/lib/api"

export default function DashboardPage() {
  const [subjects, setSubjects] = useState<Subject[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState("")

  useEffect(() => {
    const fetchSubjects = async () => {
      // Get user data from localStorage
      const userDataStr = localStorage.getItem("user")
      if (!userDataStr) {
        setError("Please log in to view subjects")
        setLoading(false)
        return
      }

      try {
        const userData: User = JSON.parse(userDataStr)

        if (!userData.classId) {
          setError("No class assigned. Please update your profile.")
          setLoading(false)
          return
        }

        // Fetch subjects for the user's class
        const response = await academicApi.getSubjectsByClass(userData.classId)

        if (response.data) {
          setSubjects(response.data)
        } else {
          setError(response.error || "Failed to load subjects")
        }
      } catch {
        setError("Failed to load user data")
      }

      setLoading(false)
    }

    fetchSubjects()
  }, [])

  return (
    <DashboardLayout>
      <div className="p-8">
        <h1 className="text-3xl font-bold mb-8">Choose Your Subject</h1>

        {loading ? (
          <div className="flex items-center justify-center py-12">
            <div className="text-foreground/60">Loading subjects...</div>
          </div>
        ) : error ? (
          <div className="p-4 bg-destructive/10 border border-destructive/30 rounded-lg">
            <p className="text-destructive">{error}</p>
          </div>
        ) : subjects.length === 0 ? (
          <div className="p-4 bg-secondary rounded-lg">
            <p className="text-foreground/60">No subjects available for your class.</p>
          </div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {subjects.map((subject) => (
              <SubjectPill key={subject.id} subject={subject} />
            ))}
          </div>
        )}
      </div>
    </DashboardLayout>
  )
}
