"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { mockActivityLog } from "@/lib/mockAdminData"
import { formatDateTime } from "@/lib/adminUtils"

export default function ActivityPage() {
  const recentActivity = mockActivityLog.slice(0, 50)

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-foreground">Activity Log</h1>
        <p className="text-foreground/60 mt-1">System-wide activity and audit trail</p>
      </div>

      <Card className="bg-card border-border">
        <CardHeader>
          <CardTitle>Recent Activities</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {recentActivity.map((activity) => (
              <div key={activity.id} className="flex items-start space-x-3 pb-3 border-b border-border last:border-0">
                <div className={`w-2 h-2 rounded-full mt-2 flex-shrink-0 ${
                  activity.type === "registration" ? "bg-green-500" :
                  activity.type === "login" ? "bg-blue-500" :
                  activity.type === "chat_start" ? "bg-purple-500" :
                  activity.type === "chat_end" ? "bg-purple-400" :
                  "bg-gray-500"
                }`}></div>
                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <p className="text-sm text-foreground font-medium">{activity.description}</p>
                    <Badge variant="secondary" className="text-xs">
                      {activity.type.replace("_", " ")}
                    </Badge>
                  </div>
                  <p className="text-xs text-foreground/60 mt-1">{formatDateTime(activity.timestamp)}</p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
