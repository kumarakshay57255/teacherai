"use client"

import { useState, useMemo, useEffect } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { adminApi, AdminStudentUser } from "@/lib/api"
import { formatDate, downloadCSV } from "@/lib/adminUtils"
import { Search, Download, Eye, UserCheck, UserX, ChevronLeft, ChevronRight, RefreshCw } from "lucide-react"

export default function StudentsPage() {
  const [students, setStudents] = useState<AdminStudentUser[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState("")
  const [actionLoading, setActionLoading] = useState<string | null>(null)

  const [searchQuery, setSearchQuery] = useState("")
  const [statusFilter, setStatusFilter] = useState<"all" | "active" | "inactive">("all")
  const [classFilter, setClassFilter] = useState<string>("all")
  const [currentPage, setCurrentPage] = useState(1)
  const itemsPerPage = 10

  // Fetch students from API
  const fetchStudents = async () => {
    setLoading(true)
    setError("")

    const response = await adminApi.getUsers()

    if (response.data) {
      setStudents(response.data)
    } else {
      setError(response.error || "Failed to load students")
    }

    setLoading(false)
  }

  useEffect(() => {
    fetchStudents()
  }, [])

  // Filter students
  const filteredStudents = useMemo(() => {
    return students.filter((student) => {
      const matchesSearch =
        student.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (student.email?.toLowerCase().includes(searchQuery.toLowerCase()) ?? false) ||
        (student.mobile?.includes(searchQuery) ?? false)

      const matchesStatus =
        statusFilter === "all" ||
        (statusFilter === "active" && student.isActive) ||
        (statusFilter === "inactive" && !student.isActive)

      const matchesClass =
        classFilter === "all" || student.className === classFilter

      return matchesSearch && matchesStatus && matchesClass
    })
  }, [students, searchQuery, statusFilter, classFilter])

  // Get unique class names for filter
  const classNames = useMemo(() => {
    const names = new Set<string>()
    students.forEach((s) => {
      if (s.className) names.add(s.className)
    })
    return Array.from(names).sort()
  }, [students])

  // Pagination
  const totalPages = Math.ceil(filteredStudents.length / itemsPerPage)
  const paginatedStudents = filteredStudents.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  )

  // Handle activate/deactivate
  const handleToggleStatus = async (userId: string, isCurrentlyActive: boolean) => {
    setActionLoading(userId)

    const response = isCurrentlyActive
      ? await adminApi.deactivateUser(userId)
      : await adminApi.activateUser(userId)

    if (response.data) {
      // Update local state
      setStudents((prev) =>
        prev.map((s) =>
          s.id === userId ? { ...s, isActive: !isCurrentlyActive } : s
        )
      )
    } else {
      alert(response.error || "Failed to update user status")
    }

    setActionLoading(null)
  }

  // Export to CSV
  const handleExport = () => {
    const headers = ["Name", "Email", "Mobile", "Board", "Class", "Status", "Verified", "Created At"]
    const rows = filteredStudents.map((s) => [
      s.name,
      s.email || "",
      s.mobile || "",
      s.boardName || "",
      s.className || "",
      s.isActive ? "Active" : "Inactive",
      s.isVerified ? "Yes" : "No",
      new Date(s.createdAt).toLocaleDateString(),
    ])

    const csvContent = [headers, ...rows].map((row) => row.join(",")).join("\n")
    downloadCSV(csvContent, `students-${new Date().toISOString().split("T")[0]}.csv`)
  }

  const getStatusBadgeVariant = (isActive: boolean) => {
    return isActive ? "success" : "danger"
  }

  // Stats
  const stats = {
    total: students.length,
    active: students.filter((s) => s.isActive).length,
    inactive: students.filter((s) => !s.isActive).length,
    verified: students.filter((s) => s.isVerified).length,
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-foreground/60">Loading students...</div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="space-y-4">
        <div className="p-4 bg-destructive/10 border border-destructive/30 rounded-lg">
          <p className="text-destructive">{error}</p>
        </div>
        <Button onClick={fetchStudents}>Retry</Button>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Students</h1>
          <p className="text-foreground/60 mt-1">Manage and monitor all registered students</p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" onClick={fetchStudents}>
            <RefreshCw className="w-4 h-4 mr-2" />
            Refresh
          </Button>
          <Button onClick={handleExport} className="bg-primary hover:bg-primary/90">
            <Download className="w-4 h-4 mr-2" />
            Export CSV
          </Button>
        </div>
      </div>

      {/* Stats Summary */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-card border border-border rounded-lg p-4">
          <div className="text-2xl font-bold text-foreground">{stats.total}</div>
          <div className="text-sm text-foreground/60">Total Students</div>
        </div>
        <div className="bg-card border border-border rounded-lg p-4">
          <div className="text-2xl font-bold text-green-500">{stats.active}</div>
          <div className="text-sm text-foreground/60">Active</div>
        </div>
        <div className="bg-card border border-border rounded-lg p-4">
          <div className="text-2xl font-bold text-red-500">{stats.inactive}</div>
          <div className="text-sm text-foreground/60">Inactive</div>
        </div>
        <div className="bg-card border border-border rounded-lg p-4">
          <div className="text-2xl font-bold text-blue-500">{stats.verified}</div>
          <div className="text-sm text-foreground/60">Verified</div>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-card border border-border rounded-lg p-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          {/* Search */}
          <div className="md:col-span-2">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-foreground/40 w-5 h-5" />
              <Input
                placeholder="Search by name, email, or phone..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
          </div>

          {/* Status Filter */}
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value as "all" | "active" | "inactive")}
            className="px-3 py-2 bg-input border border-border rounded-lg text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
          >
            <option value="all">All Status</option>
            <option value="active">Active</option>
            <option value="inactive">Inactive</option>
          </select>

          {/* Class Filter */}
          <select
            value={classFilter}
            onChange={(e) => setClassFilter(e.target.value)}
            className="px-3 py-2 bg-input border border-border rounded-lg text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
          >
            <option value="all">All Classes</option>
            {classNames.map((className) => (
              <option key={className} value={className}>
                {className}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Students Table */}
      <div className="bg-card border border-border rounded-lg overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Student</TableHead>
              <TableHead>Contact</TableHead>
              <TableHead>Board</TableHead>
              <TableHead>Class</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Verified</TableHead>
              <TableHead>Joined</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {paginatedStudents.length === 0 ? (
              <TableRow>
                <TableCell colSpan={8} className="text-center text-foreground/60 py-8">
                  No students found
                </TableCell>
              </TableRow>
            ) : (
              paginatedStudents.map((student) => (
                <TableRow key={student.id}>
                  <TableCell>
                    <div className="flex items-center space-x-3">
                      <Avatar>
                        <AvatarFallback className="bg-primary text-primary-foreground">
                          {student.name.charAt(0).toUpperCase()}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <div className="font-medium text-foreground">{student.name}</div>
                        <div className="text-xs text-foreground/60">Age: {student.age}</div>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div>
                      <div className="text-sm text-foreground">{student.email || "-"}</div>
                      <div className="text-xs text-foreground/60">{student.mobile || "-"}</div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="text-sm text-foreground">{student.boardName || "-"}</div>
                  </TableCell>
                  <TableCell>
                    {student.className ? (
                      <Badge variant="info">{student.className}</Badge>
                    ) : (
                      "-"
                    )}
                  </TableCell>
                  <TableCell>
                    <Badge variant={getStatusBadgeVariant(student.isActive)}>
                      {student.isActive ? "Active" : "Inactive"}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <Badge variant={student.isVerified ? "success" : "secondary"}>
                      {student.isVerified ? "Yes" : "No"}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <div className="text-sm text-foreground/60">
                      {formatDate(student.createdAt)}
                    </div>
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex items-center justify-end space-x-2">
                      <Link href={`/admin/students/${student.id}`}>
                        <Button variant="ghost" size="sm" title="View Details">
                          <Eye className="w-4 h-4" />
                        </Button>
                      </Link>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleToggleStatus(student.id, student.isActive)}
                        disabled={actionLoading === student.id}
                        title={student.isActive ? "Deactivate User" : "Activate User"}
                        className={
                          student.isActive
                            ? "text-destructive hover:text-destructive"
                            : "text-green-600 hover:text-green-600"
                        }
                      >
                        {actionLoading === student.id ? (
                          <RefreshCw className="w-4 h-4 animate-spin" />
                        ) : student.isActive ? (
                          <UserX className="w-4 h-4" />
                        ) : (
                          <UserCheck className="w-4 h-4" />
                        )}
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex items-center justify-between px-4 py-4 border-t border-border">
            <div className="text-sm text-foreground/60">
              Showing {(currentPage - 1) * itemsPerPage + 1} to{" "}
              {Math.min(currentPage * itemsPerPage, filteredStudents.length)} of{" "}
              {filteredStudents.length} students
            </div>
            <div className="flex items-center space-x-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                disabled={currentPage === 1}
              >
                <ChevronLeft className="w-4 h-4" />
              </Button>
              <div className="text-sm text-foreground">
                Page {currentPage} of {totalPages}
              </div>
              <Button
                variant="outline"
                size="sm"
                onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
                disabled={currentPage === totalPages}
              >
                <ChevronRight className="w-4 h-4" />
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
