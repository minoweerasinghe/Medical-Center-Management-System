"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"

export function ResetPasswordForm() {
  const [email, setEmail] = useState("")
  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Handle password reset logic here
    setSubmitted(true)
    // Reset form after 2 seconds
    setTimeout(() => {
      setEmail("")
      setSubmitted(false)
    }, 2000)
  }

  return (
    <div className="w-full max-w-md mx-auto">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-foreground mb-4">Reset Your Password</h1>
        <p className="text-muted-foreground text-lg">
          Enter the email address associated with your account, and we'll send you a link to reset your password.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label htmlFor="email" className="block text-sm font-medium text-foreground mb-2">
            Email Address
          </label>
          <input
            id="email"
            type="email"
            placeholder="your.email@example.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="w-full px-4 py-3 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0891b2] focus:border-transparent placeholder-muted-foreground"
          />
        </div>

        <Button
          type="submit"
          className="w-full bg-[#0891b2] hover:bg-[#0e7490] text-white py-3 rounded-lg font-semibold transition-colors"
        >
          {submitted ? "Reset Link Sent!" : "Send Reset Link"}
        </Button>
      </form>

      {submitted && (
        <p className="text-center text-sm text-green-600 mt-4">Check your email for the password reset link.</p>
      )}
    </div>
  )
}
