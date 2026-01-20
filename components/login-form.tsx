"use client"

import type React from "react"

import { useState } from "react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { RadioGroup, RadioGroupItem } from "./ui/radio-group"

export function LoginForm() {
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [role, setRole] = useState("")
  const [signupRole, setSignupRole] = useState("")
  const router = useRouter()

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (role === "patient") {
      // 1. Patient redirects to family account dashboard
      router.push("/patient/family-account")
    } else if (role === "doctor") {
      // 2. Doctor redirects to doctor dashboard
      router.push("/doctor/dashboard")
    } else if (role === "medical center assistant") {
      // 3. Medical assistant redirects to assistant dashboard
      router.push("/assistant/dashboard")
    }
  }

  const handleSignup = () => {
    if (signupRole) {
      const roleRoutes: Record<string, string> = {
        doctor: "/register/doctor",
        patient: "/register/patient",
        "medical center assistant": "/register/medical-assistant",
      }
      const route = roleRoutes[signupRole]
      if (route) {
        router.push(route)
      }
    }
  }

  return (
    <form onSubmit={handleSubmit} className="w-full max-w-md space-y-4">
      <div className="space-y-2">
        <Label htmlFor="username" className="text-foreground font-medium">
          Username
        </Label>
        <Input
          id="username"
          type="text"
          placeholder="Enter Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className="border-[#0891b2] focus:ring-[#0891b2]"
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="password" className="text-foreground font-medium">
          Password
        </Label>
        <Input
          id="password"
          type="password"
          placeholder="Enter Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="border-[#0891b2] focus:ring-[#0891b2]"
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="role" className="text-foreground font-medium">
          Role
        </Label>
        <RadioGroup value={role} onValueChange={setRole} className="space-y-2">
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="doctor" id="r1" />
            <Label htmlFor="r1">Doctor</Label>
          </div>

          <div className="flex items-center space-x-2">
            <RadioGroupItem value="patient" id="r2" />
            <Label htmlFor="r2">Patient</Label>
          </div>

          <div className="flex items-center space-x-2">
            <RadioGroupItem value="medical center assistant" id="r3" />
            <Label htmlFor="r3">Medical Center Assistant</Label>
          </div>
        </RadioGroup>
      </div>

      <div className="space-y-1 text-sm">
        <Link href="/reset-password" className="text-[#0891b2] hover:underline block">
          Reset Password?
        </Link>
      </div>

      <div className="space-y-3 pt-2">
        <Button type="submit" className="w-full bg-[#38bdf8] hover:bg-[#0ea5e9] text-white font-medium py-2">
          Login
        </Button>
      </div>

      <div className="border-t border-[#0891b2] pt-6 mt-6">
        <p className="text-sm text-[#0891b2] mb-4">Don't have an account? Create one:</p>
        <div className="space-y-2">
          <Label className="text-foreground font-medium">Select Registration Role</Label>

          <RadioGroup value={signupRole} onValueChange={setSignupRole} className="space-y-2">
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="doctor" id="r1" />
              <Label htmlFor="r1">Doctor</Label>
            </div>

            <div className="flex items-center space-x-2">
              <RadioGroupItem value="patient" id="r2" />
              <Label htmlFor="r2">Patient</Label>
            </div>

            <div className="flex items-center space-x-2">
              <RadioGroupItem value="medical center assistant" id="r3" />
              <Label htmlFor="r3">Medical Center Assistant</Label>
            </div>
          </RadioGroup>
        </div>

        <Button
          type="button"
          onClick={handleSignup}
          disabled={!signupRole}
          className="w-full mt-3 bg-[#38bdf8] hover:bg-[#0ea5e9] text-white font-medium py-2 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Create Account
        </Button>
      </div>
    </form>
  )
}
