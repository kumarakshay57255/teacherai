"use client"

import { useEffect, useState } from "react"
import { DashboardLayout } from "@/components/dashboard/DashboardLayout"
import { Button } from "@/components/ui/button"
import { academicApi, userApi, Board, Class, User } from "@/lib/api"

export default function SettingsPage() {
  const [user, setUser] = useState<User | null>(null)
  const [boards, setBoards] = useState<Board[]>([])
  const [classes, setClasses] = useState<Class[]>([])
  const [selectedBoardId, setSelectedBoardId] = useState("")
  const [selectedClassId, setSelectedClassId] = useState("")
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [loadingClasses, setLoadingClasses] = useState(false)
  const [error, setError] = useState("")
  const [success, setSuccess] = useState("")

  // Load user data and boards on mount
  useEffect(() => {
    const loadData = async () => {
      // Get user from localStorage
      const userDataStr = localStorage.getItem("user")
      if (!userDataStr) {
        setError("Please log in to view settings")
        setLoading(false)
        return
      }

      try {
        const userData: User = JSON.parse(userDataStr)
        setUser(userData)
        setSelectedBoardId(userData.boardId || "")
        setSelectedClassId(userData.classId || "")

        // Fetch boards
        const boardsResponse = await academicApi.getBoards()
        if (boardsResponse.data) {
          setBoards(boardsResponse.data)
        }

        // If user has a board, fetch classes for that board
        if (userData.boardId) {
          const classesResponse = await academicApi.getClassesByBoard(userData.boardId)
          if (classesResponse.data) {
            setClasses(classesResponse.data)
          }
        }
      } catch {
        setError("Failed to load user data")
      }

      setLoading(false)
    }

    loadData()
  }, [])

  // Fetch classes when board changes
  useEffect(() => {
    if (!selectedBoardId) {
      setClasses([])
      return
    }

    const fetchClasses = async () => {
      setLoadingClasses(true)
      // Reset class selection when board changes
      if (selectedBoardId !== user?.boardId) {
        setSelectedClassId("")
      }

      const response = await academicApi.getClassesByBoard(selectedBoardId)
      if (response.data) {
        setClasses(response.data)
      }
      setLoadingClasses(false)
    }

    fetchClasses()
  }, [selectedBoardId, user?.boardId])

  const handleSave = async () => {
    if (!selectedBoardId || !selectedClassId) {
      setError("Please select both board and class")
      return
    }

    setSaving(true)
    setError("")
    setSuccess("")

    const response = await userApi.updateProfile({
      board_id: selectedBoardId,
      class_id: selectedClassId,
    })

    if (response.data) {
      // Update localStorage with new user data
      const updatedUser = response.data.user
      localStorage.setItem("user", JSON.stringify(updatedUser))
      setUser(updatedUser)
      setSuccess("Profile updated successfully!")
    } else {
      setError(response.error || "Failed to update profile")
    }

    setSaving(false)
  }

  // Check if there are unsaved changes
  const hasChanges =
    selectedBoardId !== (user?.boardId || "") ||
    selectedClassId !== (user?.classId || "")

  if (loading) {
    return (
      <DashboardLayout>
        <div className="flex items-center justify-center h-full">
          <p className="text-foreground/60">Loading settings...</p>
        </div>
      </DashboardLayout>
    )
  }

  return (
    <DashboardLayout>
      <div className="p-8 max-w-2xl">
        <h1 className="text-3xl font-bold mb-8">Settings</h1>

        {error && (
          <div className="p-4 mb-6 bg-destructive/10 border border-destructive/30 rounded-lg">
            <p className="text-destructive">{error}</p>
          </div>
        )}

        {success && (
          <div className="p-4 mb-6 bg-green-500/10 border border-green-500/30 rounded-lg">
            <p className="text-green-600">{success}</p>
          </div>
        )}

        {/* Profile Information */}
        <div className="bg-card border border-border rounded-lg p-6 mb-6">
          <h2 className="text-xl font-semibold mb-4">Profile Information</h2>

          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-foreground/70 mb-1">
                Name
              </label>
              <p className="text-lg">{user?.name || "N/A"}</p>
            </div>

            <div>
              <label className="block text-sm font-medium text-foreground/70 mb-1">
                Mobile
              </label>
              <p className="text-lg">{user?.mobile || "N/A"}</p>
            </div>

            {user?.email && (
              <div>
                <label className="block text-sm font-medium text-foreground/70 mb-1">
                  Email
                </label>
                <p className="text-lg">{user.email}</p>
              </div>
            )}
          </div>
        </div>

        {/* Academic Settings */}
        <div className="bg-card border border-border rounded-lg p-6">
          <h2 className="text-xl font-semibold mb-4">Academic Settings</h2>

          <div className="space-y-4">
            {/* Board Selection */}
            <div>
              <label
                htmlFor="board"
                className="block text-sm font-medium text-foreground/70 mb-1"
              >
                Board
              </label>
              <select
                id="board"
                value={selectedBoardId}
                onChange={(e) => setSelectedBoardId(e.target.value)}
                className="w-full px-3 py-2 bg-background border border-input rounded-md focus:outline-none focus:ring-2 focus:ring-ring"
              >
                <option value="">Select a board</option>
                {boards.map((board) => (
                  <option key={board.id} value={board.id}>
                    {board.name}
                  </option>
                ))}
              </select>
            </div>

            {/* Class Selection */}
            <div>
              <label
                htmlFor="class"
                className="block text-sm font-medium text-foreground/70 mb-1"
              >
                Class
              </label>
              <select
                id="class"
                value={selectedClassId}
                onChange={(e) => setSelectedClassId(e.target.value)}
                disabled={!selectedBoardId || loadingClasses}
                className="w-full px-3 py-2 bg-background border border-input rounded-md focus:outline-none focus:ring-2 focus:ring-ring disabled:opacity-50"
              >
                <option value="">
                  {loadingClasses
                    ? "Loading classes..."
                    : !selectedBoardId
                    ? "Select a board first"
                    : "Select a class"}
                </option>
                {classes.map((cls) => (
                  <option key={cls.id} value={cls.id}>
                    {cls.name}
                  </option>
                ))}
              </select>
            </div>

            {/* Save Button */}
            <div className="pt-4">
              <Button
                onClick={handleSave}
                disabled={saving || !hasChanges}
                className="w-full sm:w-auto"
              >
                {saving ? "Saving..." : "Save Changes"}
              </Button>
              {!hasChanges && (
                <p className="text-sm text-foreground/50 mt-2">
                  No changes to save
                </p>
              )}
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  )
}
