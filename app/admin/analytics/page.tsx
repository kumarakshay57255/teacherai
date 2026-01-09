"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { mockAnalytics } from "@/lib/mockAdminData"
import { Users, TrendingUp, Clock, MessageSquare } from "lucide-react"

export default function AnalyticsPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-foreground">Analytics & Reports</h1>
        <p className="text-foreground/60 mt-1">Comprehensive analytics and insights</p>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card className="bg-card border-border">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-foreground/60">Total Students</p>
                <p className="text-3xl font-bold text-foreground mt-2">{mockAnalytics.totalStudents}</p>
              </div>
              <Users className="w-10 h-10 text-blue-500 opacity-50" />
            </div>
          </CardContent>
        </Card>
        <Card className="bg-card border-border">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-foreground/60">Active Students</p>
                <p className="text-3xl font-bold text-foreground mt-2">{mockAnalytics.activeStudents}</p>
              </div>
              <TrendingUp className="w-10 h-10 text-green-500 opacity-50" />
            </div>
          </CardContent>
        </Card>
        <Card className="bg-card border-border">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-foreground/60">Total Sessions</p>
                <p className="text-3xl font-bold text-foreground mt-2">{mockAnalytics.totalSessions}</p>
              </div>
              <MessageSquare className="w-10 h-10 text-purple-500 opacity-50" />
            </div>
          </CardContent>
        </Card>
        <Card className="bg-card border-border">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-foreground/60">Avg Duration</p>
                <p className="text-3xl font-bold text-foreground mt-2">{mockAnalytics.averageSessionDuration}m</p>
              </div>
              <Clock className="w-10 h-10 text-amber-500 opacity-50" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Coming Soon */}
      <Card className="bg-card border-border">
        <CardHeader>
          <CardTitle>Advanced Analytics</CardTitle>
          <CardDescription>Detailed analytics features coming soon</CardDescription>
        </CardHeader>
        <CardContent className="py-12">
          <div className="text-center text-foreground/60">
            <p className="text-lg mb-4">📊</p>
            <p>Advanced analytics dashboard with detailed charts, trends, and insights</p>
            <p className="text-sm mt-2">Features: Student growth, retention analysis, engagement metrics, performance tracking</p>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
