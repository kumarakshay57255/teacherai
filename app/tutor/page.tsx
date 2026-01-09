"use client"

import { useSearchParams } from "next/navigation"
import { DashboardLayout } from "@/components/dashboard/DashboardLayout"
import { ChatInterface } from "@/components/chat/ChatInterface"
import { mockSubjects } from "@/lib/mockData"

export default function TutorPage() {
  const searchParams = useSearchParams()
  const subjectSlug = searchParams.get("subject")

  const subject = mockSubjects.find((s) => s.slug === subjectSlug)

  return (
    <DashboardLayout>
      <ChatInterface subject={subject?.name} />
    </DashboardLayout>
  )
}
