"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

export default function SettingsPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-foreground">Settings</h1>
        <p className="text-foreground/60 mt-1">Platform configuration and preferences</p>
      </div>

      {/* Admin Account */}
      <Card className="bg-card border-border">
        <CardHeader>
          <CardTitle>Admin Account</CardTitle>
          <CardDescription>Manage your admin account settings</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-foreground mb-2">Admin Name</label>
            <Input defaultValue="Super Admin" />
          </div>
          <div>
            <label className="block text-sm font-medium text-foreground mb-2">Email</label>
            <Input defaultValue="admin@teacherai.com" disabled />
          </div>
          <Button className="bg-primary hover:bg-primary/90">Save Changes</Button>
        </CardContent>
      </Card>

      {/* Platform Configuration */}
      <Card className="bg-card border-border">
        <CardHeader>
          <CardTitle>Platform Configuration</CardTitle>
          <CardDescription>General platform settings</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-foreground mb-2">Platform Name</label>
            <Input defaultValue="Teacher AI" />
          </div>
          <div>
            <label className="block text-sm font-medium text-foreground mb-2">Support Email</label>
            <Input defaultValue="support@teacherai.com" />
          </div>
          <Button className="bg-primary hover:bg-primary/90">Save Configuration</Button>
        </CardContent>
      </Card>

      {/* Data Management */}
      <Card className="bg-card border-border">
        <CardHeader>
          <CardTitle>Data Management</CardTitle>
          <CardDescription>Export and manage platform data</CardDescription>
        </CardHeader>
        <CardContent className="space-y-3">
          <Button variant="outline" className="w-full justify-start">Export All Students Data</Button>
          <Button variant="outline" className="w-full justify-start">Export Chat Sessions</Button>
          <Button variant="outline" className="w-full justify-start">Export Activity Log</Button>
          <Button variant="destructive" className="w-full justify-start">Clear Test Data</Button>
        </CardContent>
      </Card>
    </div>
  )
}
