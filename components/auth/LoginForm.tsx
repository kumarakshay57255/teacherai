"use client"

import { useState, useEffect } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { authApi } from "@/lib/api"

export function LoginForm() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const [phoneNumber, setPhoneNumber] = useState("")
  const [otp, setOtp] = useState("")
  const [otpSent, setOtpSent] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")
  const [success, setSuccess] = useState("")

  // Show success message if redirected from signup
  useEffect(() => {
    if (searchParams.get("registered") === "true") {
      setSuccess("Account created successfully! Please login with your phone number.")
    }
  }, [searchParams])

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/\D/g, "").slice(0, 10)
    setPhoneNumber(value)
    setError("")
  }

  const handleOtpChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/\D/g, "").slice(0, 6)
    setOtp(value)
    setError("")
  }

  const handleSendOTP = async () => {
    if (phoneNumber.length !== 10) {
      setError("Phone number must be exactly 10 digits")
      return
    }

    setLoading(true)
    setError("")
    setSuccess("")

    const response = await authApi.loginOtp(phoneNumber)

    setLoading(false)

    if (response.error) {
      if (response.status === 404) {
        setError("No account found with this phone number. Please sign up first.")
      } else {
        setError(response.error)
      }
      return
    }

    setOtpSent(true)
    setSuccess("OTP sent successfully! Check your phone.")
  }

  const handleVerifyOTP = async () => {
    if (otp.length !== 6) {
      setError("Please enter a valid 6-digit OTP")
      return
    }

    setLoading(true)
    setError("")
    setSuccess("")

    const response = await authApi.verifyOtp(phoneNumber, otp)

    setLoading(false)

    if (response.error) {
      if (response.status === 401) {
        setError("Invalid OTP. Please try again.")
      } else if (response.status === 400) {
        setError("OTP has expired. Please request a new one.")
      } else {
        setError(response.error)
      }
      return
    }

    if (response.data) {
      // Store token and user data
      localStorage.setItem("token", response.data.token)
      localStorage.setItem("user", JSON.stringify(response.data.user))

      // Redirect to dashboard
      router.push("/dashboard")
    }
  }

  const handleChangePhone = () => {
    setOtpSent(false)
    setOtp("")
    setError("")
    setSuccess("")
  }

  return (
    <Card className="w-full max-w-md">
      <CardHeader className="space-y-1">
        <h2 className="text-2xl font-bold text-center">Login</h2>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Success Message */}
        {success && (
          <div className="p-3 bg-green-500/10 border border-green-500/30 rounded-md">
            <p className="text-sm text-green-600">{success}</p>
          </div>
        )}

        <div className="space-y-2">
          <Input
            type="tel"
            placeholder="Enter 10-digit phone number"
            value={phoneNumber}
            onChange={handlePhoneChange}
            disabled={otpSent || loading}
            className="w-full"
            maxLength={10}
          />
          {phoneNumber && phoneNumber.length < 10 && (
            <p className="text-sm text-foreground/60">
              {phoneNumber.length}/10 digits entered
            </p>
          )}
        </div>

        {otpSent && (
          <div className="space-y-2">
            <Input
              type="text"
              placeholder="Enter 6-digit OTP"
              value={otp}
              onChange={handleOtpChange}
              maxLength={6}
              disabled={loading}
              className="w-full"
            />
          </div>
        )}

        {/* Error Message */}
        {error && (
          <div className="p-3 bg-destructive/10 border border-destructive/30 rounded-md">
            <p className="text-sm text-destructive">{error}</p>
          </div>
        )}

        {!otpSent ? (
          <Button
            onClick={handleSendOTP}
            disabled={phoneNumber.length !== 10 || loading}
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
              {loading ? "Verifying..." : "Login"}
            </Button>
            <Button
              onClick={handleChangePhone}
              variant="ghost"
              className="w-full"
              disabled={loading}
            >
              Change Phone Number
            </Button>
            <Button
              onClick={handleSendOTP}
              variant="outline"
              className="w-full"
              disabled={loading}
            >
              {loading ? "Sending..." : "Resend OTP"}
            </Button>
          </div>
        )}

        {/* Signup Link */}
        <p className="text-center text-sm text-foreground/60">
          Don&apos;t have an account?{" "}
          <button
            type="button"
            onClick={() => router.push("/signup")}
            className="text-primary hover:underline"
            disabled={loading}
          >
            Sign up here
          </button>
        </p>
      </CardContent>
    </Card>
  )
}
