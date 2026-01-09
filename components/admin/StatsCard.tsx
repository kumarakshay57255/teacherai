import { Card, CardContent } from "@/components/ui/card"
import { LucideIcon } from "lucide-react"

interface StatsCardProps {
  title: string
  value: string | number
  change?: number
  icon: LucideIcon
  iconColor?: string
}

export function StatsCard({ title, value, change, icon: Icon, iconColor = "text-primary" }: StatsCardProps) {
  const isPositive = change && change > 0
  const isNegative = change && change < 0

  return (
    <Card className="bg-card border-border hover:border-primary/50 transition-colors">
      <CardContent className="p-6">
        <div className="flex items-center justify-between">
          <div className="flex-1">
            <p className="text-sm text-foreground/60 font-medium">{title}</p>
            <p className="text-3xl font-bold text-foreground mt-2">{value}</p>
            {change !== undefined && (
              <div className="flex items-center mt-2">
                <span
                  className={`text-sm font-medium ${
                    isPositive ? "text-green-500" : isNegative ? "text-red-500" : "text-foreground/60"
                  }`}
                >
                  {isPositive && "+"}{change}%
                </span>
                <span className="text-xs text-foreground/60 ml-2">from last week</span>
              </div>
            )}
          </div>
          <div className={`w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center ${iconColor}`}>
            <Icon className="w-6 h-6" />
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
