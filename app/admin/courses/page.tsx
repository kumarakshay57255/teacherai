"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

export default function CoursesPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Courses</h1>
          <p className="text-foreground/60 mt-1">Manage course content and materials</p>
        </div>
        <Button className="bg-primary hover:bg-primary/90">Add Course</Button>
      </div>

      <Card className="bg-card border-border">
        <CardContent className="py-24">
          <div className="text-center text-foreground/60">
            <p className="text-lg mb-4">📚</p>
            <p className="text-xl font-semibold text-foreground mb-2">Course Management</p>
            <p>Course management features coming soon</p>
            <p className="text-sm mt-2">Create, organize, and manage educational content</p>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
