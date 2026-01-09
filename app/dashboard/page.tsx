"use client"

import { DashboardLayout } from "@/components/dashboard/DashboardLayout"
import { SubjectPill } from "@/components/dashboard/SubjectPill"
import { CourseCard } from "@/components/dashboard/CourseCard"
import { mockSubjects, mockCourses } from "@/lib/mockData"

export default function DashboardPage() {
  return (
    <DashboardLayout>
      <div className="p-8">
        <h1 className="text-3xl font-bold mb-8">Choose Your Subject</h1>

        {/* Subject Pills Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mb-8">
          {mockSubjects.map((subject) => (
            <SubjectPill key={subject.id} subject={subject} />
          ))}
        </div>

        {/* Divider */}
        <div className="border-t border-border my-8" />

        {/* Course Cards */}
        <h2 className="text-2xl font-bold mb-6">Featured Courses</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {mockCourses.map((course) => (
            <CourseCard key={course.id} course={course} />
          ))}
        </div>
      </div>
    </DashboardLayout>
  )
}
