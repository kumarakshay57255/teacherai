"use client"

import { use, useEffect, useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { adminApi, AdminStudentUser } from "@/lib/api"
import { formatDateTime } from "@/lib/adminUtils"
import { ArrowLeft, Mail, Phone, GraduationCap, BookOpen, Calendar, CheckCircle, XCircle } from "lucide-react"

interface StudentDetailPageProps {
  params: Promise<{ id: string }>
}

export default function StudentDetailPage({ params }: StudentDetailPageProps) {
  const { id } = use(params)
  const [student, setStudent] = useState<AdminStudentUser | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState("")

  useEffect(() => {
    const fetchStudent = async () => {
      const response = await adminApi.getUserById(id)
      if (response.data) {
        setStudent(response.data)
      } else {
        setError(response.error || "Student not found")
      }
      setLoading(false)
    }
    fetchStudent()
  }, [id])

  const handleDeactivate = async () => {
    if (!student) return
    const response = await adminApi.deactivateUser(student.id)
    if (response.data) {
      setStudent({ ...student, isActive: false })
    }
  }

  const handleActivate = async () => {
    if (!student) return
    const response = await adminApi.activateUser(student.id)
    if (response.data) {
      setStudent({ ...student, isActive: true })
    }
  }

  if (loading) {
    return (
      <div className="space-y-6">
        <div className="flex items-center space-x-4">
          <Link href="/admin/students">
            <Button variant="outline">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Students
            </Button>
          </Link>
        </div>
        <div className="flex items-center justify-center py-12">
          <div className="text-foreground/60">Loading student details...</div>
        </div>
      </div>
    )
  }

  if (error || !student) {
    return (
      <div className="space-y-6">
        <div className="flex items-center space-x-4">
          <Link href="/admin/students">
            <Button variant="outline">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Students
            </Button>
          </Link>
        </div>
        <div className="text-center py-12">
          <p className="text-foreground/60">{error || "Student not found"}</p>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <Link href="/admin/students">
            <Button variant="outline">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Students
            </Button>
          </Link>
        </div>
        <div className="flex items-center space-x-2">
          {student.isActive ? (
            <Button variant="destructive" onClick={handleDeactivate}>
              Deactivate Account
            </Button>
          ) : (
            <Button variant="default" onClick={handleActivate}>
              Activate Account
            </Button>
          )}
        </div>
      </div>

      {/* Profile Section */}
      <Card className="bg-card border-border">
        <CardContent className="p-6">
          <div className="flex items-start space-x-6">
            <Avatar className="w-24 h-24">
              <AvatarFallback className="bg-primary text-primary-foreground text-3xl">
                {student.name.charAt(0).toUpperCase()}
              </AvatarFallback>
            </Avatar>
            <div className="flex-1">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-2xl font-bold text-foreground">{student.name}</h2>
                  <p className="text-sm text-foreground/60 mt-1">ID: {student.id}</p>
                </div>
                <div className="flex items-center space-x-2">
                  <Badge variant={student.isActive ? "success" : "danger"} className="text-lg px-4 py-2">
                    {student.isActive ? "Active" : "Inactive"}
                  </Badge>
                  {student.isVerified && (
                    <Badge variant="info" className="text-lg px-4 py-2">
                      Verified
                    </Badge>
                  )}
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
                {student.email && (
                  <div className="flex items-center space-x-2 text-foreground/70">
                    <Mail className="w-4 h-4" />
                    <span>{student.email}</span>
                  </div>
                )}
                {student.mobile && (
                  <div className="flex items-center space-x-2 text-foreground/70">
                    <Phone className="w-4 h-4" />
                    <span>{student.mobile}</span>
                  </div>
                )}
                {student.className && (
                  <div className="flex items-center space-x-2 text-foreground/70">
                    <GraduationCap className="w-4 h-4" />
                    <span>{student.className}</span>
                  </div>
                )}
                {student.boardName && (
                  <div className="flex items-center space-x-2 text-foreground/70">
                    <BookOpen className="w-4 h-4" />
                    <span>{student.boardName}</span>
                  </div>
                )}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Details Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="bg-card border-border">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-foreground/60">Age</p>
                <p className="text-2xl font-bold text-foreground mt-1">{student.age || "N/A"}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card className="bg-card border-border">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-foreground/60">Status</p>
                <div className="flex items-center mt-1">
                  {student.isActive ? (
                    <CheckCircle className="w-6 h-6 text-green-500" />
                  ) : (
                    <XCircle className="w-6 h-6 text-red-500" />
                  )}
                  <span className="text-lg font-bold text-foreground ml-2">
                    {student.isActive ? "Active" : "Inactive"}
                  </span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card className="bg-card border-border">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-foreground/60">Verified</p>
                <div className="flex items-center mt-1">
                  {student.isVerified ? (
                    <CheckCircle className="w-6 h-6 text-green-500" />
                  ) : (
                    <XCircle className="w-6 h-6 text-yellow-500" />
                  )}
                  <span className="text-lg font-bold text-foreground ml-2">
                    {student.isVerified ? "Yes" : "No"}
                  </span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card className="bg-card border-border">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-foreground/60">Registered</p>
                <p className="text-lg font-bold text-foreground mt-1">
                  {formatDateTime(student.createdAt)}
                </p>
              </div>
              <Calendar className="w-10 h-10 text-purple-500 opacity-50" />
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
