"use client"

import { useSearchParams } from "next/navigation"
import { Suspense } from "react"
import { DashboardLayout } from "@/components/dashboard/DashboardLayout"
import { ChatInterface } from "@/components/chat/ChatInterface"

function TutorContent() {
  const searchParams = useSearchParams()
  const subjectId = searchParams.get("subjectId")
  const subjectName = searchParams.get("subjectName")

  return (
    <ChatInterface
      subjectId={subjectId || undefined}
      subjectName={subjectName || undefined}
    />
  )
}

export default function TutorPage() {
  return (
    <DashboardLayout>
      <Suspense fallback={<div className="flex items-center justify-center h-full">Loading...</div>}>
        <TutorContent />
      </Suspense>
    </DashboardLayout>
  )
}
