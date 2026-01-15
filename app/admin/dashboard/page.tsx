"use client"

import { useEffect, useState, useMemo } from "react"
import { StatsCard } from "@/components/admin/StatsCard"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { adminApi, AdminStudentUser } from "@/lib/api"
import { formatDateTime } from "@/lib/adminUtils"
import { Users, Activity, UserCheck, UserX } from "lucide-react"
import { BarChart, Bar, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts"

const COLORS = ["#7c3aed", "#8b5cf6", "#a78bfa", "#c4b5fd", "#ddd6fe", "#ede9fe", "#f5f3ff"]

export default function AdminDashboard() {
  const [students, setStudents] = useState<AdminStudentUser[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState("")

  useEffect(() => {
    const fetchStudents = async () => {
      const response = await adminApi.getUsers()
      if (response.data) {
        setStudents(response.data)
      } else {
        setError(response.error || "Failed to load data")
      }
      setLoading(false)
    }
    fetchStudents()
  }, [])

  // Calculate stats from real data
  const stats = useMemo(() => ({
    totalStudents: students.length,
    activeStudents: students.filter(s => s.isActive).length,
    inactiveStudents: students.filter(s => !s.isActive).length,
    verifiedStudents: students.filter(s => s.isVerified).length,
  }), [students])

  // Calculate class distribution
  const classDistribution = useMemo(() => {
    const distribution: Record<string, number> = {}
    students.forEach(s => {
      const cls = s.className || "Unassigned"
      distribution[cls] = (distribution[cls] || 0) + 1
    })
    return Object.entries(distribution)
      .map(([name, count]) => ({ class: name, count }))
      .sort((a, b) => {
        // Sort by class number if possible
        const numA = parseInt(a.class.replace(/\D/g, "")) || 999
        const numB = parseInt(b.class.replace(/\D/g, "")) || 999
        return numA - numB
      })
  }, [students])

  // Calculate board distribution
  const boardDistribution = useMemo(() => {
    const distribution: Record<string, number> = {}
    students.forEach(s => {
      const board = s.boardName || "Unassigned"
      distribution[board] = (distribution[board] || 0) + 1
    })
    return Object.entries(distribution)
      .map(([name, count]) => ({ board: name, count }))
  }, [students])

  // Recent registrations (last 10)
  const recentRegistrations = useMemo(() => {
    return [...students]
      .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
      .slice(0, 10)
  }, [students])

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-foreground/60">Loading dashboard...</div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="p-4 bg-destructive/10 border border-destructive/30 rounded-lg">
        <p className="text-destructive">{error}</p>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div>
        <h1 className="text-3xl font-bold text-foreground">Dashboard</h1>
        <p className="text-foreground/60 mt-1">Overview of your platform's performance and metrics</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatsCard
          title="Total Students"
          value={stats.totalStudents}
          icon={Users}
          iconColor="text-blue-500"
        />
        <StatsCard
          title="Active Students"
          value={stats.activeStudents}
          icon={UserCheck}
          iconColor="text-green-500"
        />
        <StatsCard
          title="Inactive Students"
          value={stats.inactiveStudents}
          icon={UserX}
          iconColor="text-red-500"
        />
        <StatsCard
          title="Verified Students"
          value={stats.verifiedStudents}
          icon={Activity}
          iconColor="text-purple-500"
        />
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Class Distribution */}
        <Card className="bg-card border-border">
          <CardHeader>
            <CardTitle>Class Distribution</CardTitle>
            <CardDescription>Students by class level</CardDescription>
          </CardHeader>
          <CardContent>
            {classDistribution.length === 0 ? (
              <div className="flex items-center justify-center h-[300px] text-foreground/60">
                No data available
              </div>
            ) : (
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={classDistribution}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#27273f" />
                  <XAxis dataKey="class" stroke="#a1a1aa" fontSize={12} angle={-15} textAnchor="end" height={80} />
                  <YAxis stroke="#a1a1aa" fontSize={12} />
                  <Tooltip
                    contentStyle={{ backgroundColor: "#1a1a24", border: "1px solid #27273f", borderRadius: "8px" }}
                    labelStyle={{ color: "#fafafa" }}
                  />
                  <Bar dataKey="count" fill="#7c3aed" radius={[8, 8, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            )}
          </CardContent>
        </Card>

        {/* Board Distribution */}
        <Card className="bg-card border-border">
          <CardHeader>
            <CardTitle>Board Distribution</CardTitle>
            <CardDescription>Students by education board</CardDescription>
          </CardHeader>
          <CardContent>
            {boardDistribution.length === 0 ? (
              <div className="flex items-center justify-center h-[300px] text-foreground/60">
                No data available
              </div>
            ) : (
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie
                    data={boardDistribution}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={({ board, count }) => `${board}: ${count}`}
                    outerRadius={100}
                    fill="#8884d8"
                    dataKey="count"
                  >
                    {boardDistribution.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip
                    contentStyle={{ backgroundColor: "#1a1a24", border: "1px solid #27273f", borderRadius: "8px" }}
                  />
                </PieChart>
              </ResponsiveContainer>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Recent Registrations */}
      <Card className="bg-card border-border">
        <CardHeader>
          <CardTitle>Recent Registrations</CardTitle>
          <CardDescription>Latest student sign-ups</CardDescription>
        </CardHeader>
        <CardContent>
          {recentRegistrations.length === 0 ? (
            <div className="text-center py-8 text-foreground/60">
              No registrations yet
            </div>
          ) : (
            <div className="space-y-4 max-h-[400px] overflow-y-auto">
              {recentRegistrations.map((student) => (
                <div key={student.id} className="flex items-center justify-between pb-3 border-b border-border last:border-0">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center text-primary-foreground font-bold">
                      {student.name.charAt(0).toUpperCase()}
                    </div>
                    <div>
                      <p className="font-medium text-foreground">{student.name}</p>
                      <p className="text-sm text-foreground/60">
                        {student.className || "No class"} • {student.boardName || "No board"}
                      </p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-sm text-foreground/60">{formatDateTime(student.createdAt)}</p>
                    <p className={`text-xs ${student.isActive ? "text-green-500" : "text-red-500"}`}>
                      {student.isActive ? "Active" : "Inactive"}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
