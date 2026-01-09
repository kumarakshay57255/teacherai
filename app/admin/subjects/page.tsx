"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { mockSubjects } from "@/lib/mockData"
import { mockStudents } from "@/lib/mockAdminData"
import { BookOpen, Edit } from "lucide-react"

export default function SubjectsPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Subjects</h1>
          <p className="text-foreground/60 mt-1">Manage subjects and curriculum</p>
        </div>
        <Button className="bg-primary hover:bg-primary/90">Add Subject</Button>
      </div>

      {/* Subjects Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {mockSubjects.map((subject) => {
          const enrolledCount = mockStudents.filter(s => s.subjects.includes(subject.id)).length

          return (
            <Card key={subject.id} className="bg-card border-border hover:border-primary/50 transition-colors">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div
                      className="w-12 h-12 rounded-lg flex items-center justify-center text-2xl"
                      style={{ backgroundColor: subject.color + "20" }}
                    >
                      {subject.icon}
                    </div>
                    <div>
                      <CardTitle>{subject.name}</CardTitle>
                      <Badge variant="default" className="mt-1">{enrolledCount} students</Badge>
                    </div>
                  </div>
                  <Button variant="ghost" size="sm">
                    <Edit className="w-4 h-4" />
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-foreground/60">Total Sessions</span>
                    <span className="font-semibold text-foreground">
                      {Math.floor(Math.random() * 200) + 50}
                    </span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-foreground/60">Avg Performance</span>
                    <span className="font-semibold text-foreground">
                      {Math.floor(Math.random() * 20) + 75}%
                    </span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-foreground/60">Status</span>
                    <Badge variant="success">Active</Badge>
                  </div>
                </div>
              </CardContent>
            </Card>
          )
        })}
      </div>
    </div>
  )
}
