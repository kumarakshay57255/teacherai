import Link from "next/link"
import { Card, CardContent } from "@/components/ui/card"

interface CourseCardProps {
  course: {
    id: string
    title?: string
    name?: string
    description: string
    difficulty: string
    subject: {
      name: string
    }
  }
}

export function CourseCard({ course }: CourseCardProps) {
  const title = course.title || course.name

  return (
    <Link href={`/course/${course.id}`}>
      <Card className="hover:border-primary transition-colors h-full">
        <CardContent className="p-6">
          <div className="w-full h-40 bg-secondary rounded-lg mb-4 flex items-center justify-center">
            <span className="text-muted-foreground">Card</span>
          </div>
          <h3 className="font-bold text-lg mb-2">{title}</h3>
          <p className="text-sm text-muted-foreground mb-3 line-clamp-2">
            {course.description}
          </p>
          <div className="flex items-center justify-between">
            <span className="text-xs px-2 py-1 bg-secondary rounded-full">
              {course.subject.name}
            </span>
            <span className="text-xs text-muted-foreground capitalize">
              {course.difficulty}
            </span>
          </div>
        </CardContent>
      </Card>
    </Link>
  )
}
