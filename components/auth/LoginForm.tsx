"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader } from "@/components/ui/card"

export function LoginForm() {
  const router = useRouter()
  const [phoneNumber, setPhoneNumber] = useState("")
  const [otp, setOtp] = useState("")
  const [otpSent, setOtpSent] = useState(false)
  const [loading, setLoading] = useState(false)

  const handleSendOTP = async () => {
    setLoading(true)
    // Simulate API call delay
    setTimeout(() => {
      setOtpSent(true)
      setLoading(false)
      // In real app, OTP would be sent via SMS
      console.log("Mock OTP sent to:", phoneNumber)
    }, 1000)
  }

  const handleVerifyOTP = async () => {
    setLoading(true)
    // Simulate API call delay
    setTimeout(() => {
      setLoading(false)
      // Mock verification - accept any 6-digit OTP
      if (otp.length === 6) {
        // Store phone number in localStorage
        localStorage.setItem("userPhone", phoneNumber)
        // Check if user needs onboarding
        const hasProfile = localStorage.getItem("userName")
        if (hasProfile) {
          router.push("/dashboard")
        } else {
          router.push("/onboarding")
        }
      }
    }, 1000)
  }

  return (
    <Card className="w-full max-w-md">
      <CardHeader className="space-y-1">
        <h2 className="text-2xl font-bold text-center">Login</h2>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <Input
            type="tel"
            placeholder="Phone Number"
            value={phoneNumber}
            onChange={(e) => setPhoneNumber(e.target.value)}
            disabled={otpSent || loading}
            className="w-full"
          />
        </div>

        {otpSent && (
          <div className="space-y-2">
            <Input
              type="text"
              placeholder="OTP"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
              maxLength={6}
              disabled={loading}
              className="w-full"
            />
          </div>
        )}

        {!otpSent ? (
          <Button
            onClick={handleSendOTP}
            disabled={!phoneNumber || loading}
            className="w-full"
          >
            {loading ? "Sending..." : "Send OTP"}
          </Button>
        ) : (
          <div className="space-y-2">
            <Button
              onClick={handleVerifyOTP}
              disabled={otp.length !== 6 || loading}
              className="w-full"
            >
              {loading ? "Verifying..." : "login"}
            </Button>
            <Button
              onClick={() => {
                setOtpSent(false)
                setOtp("")
              }}
              variant="ghost"
              className="w-full"
              disabled={loading}
            >
              Change Phone Number
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  )
}
