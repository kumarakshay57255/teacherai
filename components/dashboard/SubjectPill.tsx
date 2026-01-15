"use client"

import Link from "next/link"
import { Subject } from "@/lib/api"

// Map subject names to icons and colors
const subjectStyles: Record<string, { icon: string; color: string }> = {
  mathematics: { icon: "📐", color: "#8b5cf6" },
  maths: { icon: "📐", color: "#8b5cf6" },
  math: { icon: "📐", color: "#8b5cf6" },
  science: { icon: "🔬", color: "#10b981" },
  english: { icon: "📚", color: "#f59e0b" },
  hindi: { icon: "📖", color: "#ef4444" },
  history: { icon: "🏛️", color: "#ef4444" },
  geography: { icon: "🌍", color: "#3b82f6" },
  physics: { icon: "⚛️", color: "#ec4899" },
  chemistry: { icon: "🧪", color: "#06b6d4" },
  biology: { icon: "🧬", color: "#22c55e" },
  computer: { icon: "💻", color: "#6366f1" },
  "computer science": { icon: "💻", color: "#6366f1" },
  social: { icon: "👥", color: "#f97316" },
  "social science": { icon: "👥", color: "#f97316" },
  "social studies": { icon: "👥", color: "#f97316" },
  economics: { icon: "📊", color: "#14b8a6" },
  political: { icon: "⚖️", color: "#a855f7" },
  civics: { icon: "🏛️", color: "#a855f7" },
  art: { icon: "🎨", color: "#f43f5e" },
  music: { icon: "🎵", color: "#d946ef" },
  default: { icon: "📘", color: "#64748b" },
}

function getSubjectStyle(name: string): { icon: string; color: string } {
  const lowerName = name.toLowerCase()

  // Check for exact match first
  if (subjectStyles[lowerName]) {
    return subjectStyles[lowerName]
  }

  // Check for partial match
  for (const key of Object.keys(subjectStyles)) {
    if (lowerName.includes(key) || key.includes(lowerName)) {
      return subjectStyles[key]
    }
  }

  return subjectStyles.default
}

interface SubjectPillProps {
  subject: Subject
}

export function SubjectPill({ subject }: SubjectPillProps) {
  const style = getSubjectStyle(subject.name)

  return (
    <Link
      href={`/tutor?subjectId=${subject.id}&subjectName=${encodeURIComponent(subject.name)}`}
      className="flex items-center justify-center px-6 py-4 hover:opacity-80 transition-opacity rounded-full font-medium text-center"
      style={{ backgroundColor: style.color + "30" }}
    >
      <span className="mr-2 text-xl">{style.icon}</span>
      <span>{subject.name}</span>
    </Link>
  )
}
