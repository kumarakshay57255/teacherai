"use client"

import { StatsCard } from "@/components/admin/StatsCard"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { mockAnalytics, mockActivityLog } from "@/lib/mockAdminData"
import { formatDateTime, formatDuration } from "@/lib/adminUtils"
import { Users, Activity, MessageSquare, Clock } from "lucide-react"
import { LineChart, Line, BarChart, Bar, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts"

const COLORS = ["#7c3aed", "#8b5cf6", "#a78bfa", "#c4b5fd", "#ddd6fe", "#ede9fe", "#f5f3ff"]

export default function AdminDashboard() {
  const stats = {
    totalStudents: mockAnalytics.totalStudents,
    activeStudents: mockAnalytics.activeStudents,
    totalSessions: mockAnalytics.totalSessions,
    avgDuration: mockAnalytics.averageSessionDuration,
  }

  // Get recent activity (last 10)
  const recentActivity = mockActivityLog.slice(0, 10)

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
          change={12}
          icon={Users}
          iconColor="text-blue-500"
        />
        <StatsCard
          title="Active Students"
          value={stats.activeStudents}
          change={8}
          icon={Activity}
          iconColor="text-green-500"
        />
        <StatsCard
          title="Chat Sessions"
          value={stats.totalSessions}
          change={15}
          icon={MessageSquare}
          iconColor="text-purple-500"
        />
        <StatsCard
          title="Avg Session Duration"
          value={`${stats.avgDuration}m`}
          change={-3}
          icon={Clock}
          iconColor="text-amber-500"
        />
      </div>

      {/* Charts Row 1 */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Registration Trend */}
        <Card className="bg-card border-border">
          <CardHeader>
            <CardTitle>Student Registrations (Last 30 Days)</CardTitle>
            <CardDescription>New student sign-ups over time</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={mockAnalytics.registrationTrend}>
                <CartesianGrid strokeDasharray="3 3" stroke="#27273f" />
                <XAxis
                  dataKey="date"
                  stroke="#a1a1aa"
                  fontSize={12}
                  tickFormatter={(value) => new Date(value).toLocaleDateString("en-US", { month: "short", day: "numeric" })}
                />
                <YAxis stroke="#a1a1aa" fontSize={12} />
                <Tooltip
                  contentStyle={{ backgroundColor: "#1a1a24", border: "1px solid #27273f", borderRadius: "8px" }}
                  labelStyle={{ color: "#fafafa" }}
                />
                <Line type="monotone" dataKey="count" stroke="#7c3aed" strokeWidth={2} dot={{ fill: "#7c3aed" }} />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Subject Distribution */}
        <Card className="bg-card border-border">
          <CardHeader>
            <CardTitle>Subject Enrollment Distribution</CardTitle>
            <CardDescription>Number of students per subject</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={mockAnalytics.subjectDistribution}>
                <CartesianGrid strokeDasharray="3 3" stroke="#27273f" />
                <XAxis dataKey="subject" stroke="#a1a1aa" fontSize={12} angle={-15} textAnchor="end" height={80} />
                <YAxis stroke="#a1a1aa" fontSize={12} />
                <Tooltip
                  contentStyle={{ backgroundColor: "#1a1a24", border: "1px solid #27273f", borderRadius: "8px" }}
                  labelStyle={{ color: "#fafafa" }}
                />
                <Bar dataKey="count" fill="#7c3aed" radius={[8, 8, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Charts Row 2 */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Class Distribution */}
        <Card className="bg-card border-border">
          <CardHeader>
            <CardTitle>Class Distribution</CardTitle>
            <CardDescription>Students by class level</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={mockAnalytics.classDistribution}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ class: cls, count }) => `${cls}: ${count}`}
                  outerRadius={100}
                  fill="#8884d8"
                  dataKey="count"
                >
                  {mockAnalytics.classDistribution.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip
                  contentStyle={{ backgroundColor: "#1a1a24", border: "1px solid #27273f", borderRadius: "8px" }}
                />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Recent Activity */}
        <Card className="bg-card border-border">
          <CardHeader>
            <CardTitle>Recent Activity</CardTitle>
            <CardDescription>Latest platform activities</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4 max-h-[300px] overflow-y-auto">
              {recentActivity.map((activity) => (
                <div key={activity.id} className="flex items-start space-x-3 pb-3 border-b border-border last:border-0">
                  <div className={`w-2 h-2 rounded-full mt-2 flex-shrink-0 ${
                    activity.type === "registration" ? "bg-green-500" :
                    activity.type === "login" ? "bg-blue-500" :
                    activity.type === "chat_start" ? "bg-purple-500" :
                    activity.type === "chat_end" ? "bg-purple-400" :
                    "bg-gray-500"
                  }`}></div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm text-foreground font-medium truncate">{activity.description}</p>
                    <p className="text-xs text-foreground/60 mt-1">{formatDateTime(activity.timestamp)}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
