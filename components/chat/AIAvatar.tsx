"use client"

interface AIAvatarProps {
  isActive: boolean
  subject?: string
}

export function AIAvatar({ isActive, subject }: AIAvatarProps) {
  return (
    <div className="relative h-full flex flex-col items-center justify-center bg-secondary">
      <div className="absolute top-4 right-4">
        <div className="text-sm text-muted-foreground bg-card px-4 py-2 rounded-lg">
          Text on screen
        </div>
      </div>

      <div className="relative">
        <div
          className={`w-64 h-64 rounded-full bg-gradient-to-br from-primary to-purple-800 flex items-center justify-center ${
            isActive ? "animate-pulse" : ""
          }`}
        >
          <div className="text-8xl">🤖</div>
        </div>
        {isActive && (
          <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 translate-y-12 text-sm text-muted-foreground">
            Thinking...
          </div>
        )}
      </div>

      {subject && (
        <div className="mt-8 text-lg font-semibold">{subject} Tutor</div>
      )}
    </div>
  )
}
