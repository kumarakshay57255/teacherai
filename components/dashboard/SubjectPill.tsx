"use client"

import Link from "next/link"

interface SubjectPillProps {
  subject: {
    id: string
    name: string
    slug: string
    icon: string
    color: string
  }
}

export function SubjectPill({ subject }: SubjectPillProps) {
  return (
    <Link
      href={`/tutor?subject=${subject.slug}`}
      className="flex items-center justify-center px-6 py-4 bg-secondary hover:bg-primary transition-colors rounded-full font-medium text-center"
      style={{ backgroundColor: subject.color + "40" }}
    >
      <span className="mr-2 text-xl">{subject.icon}</span>
      <span>{subject.name}</span>
    </Link>
  )
}
