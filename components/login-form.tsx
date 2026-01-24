"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Stethoscope, Briefcase, User } from "lucide-react"
import { cn } from "@/lib/utils"

interface RoleCardProps {
  value: string
  label: string
  icon: React.ReactNode
  selected: boolean
  onSelect: (value: string) => void
}

function RoleCard({ value, label, icon, selected, onSelect }: RoleCardProps) {
  return (
    <button
      type="button"
      onClick={() => onSelect(value)}
      className={cn(
        "flex flex-col items-center justify-center p-4 rounded-lg border-2 transition-all min-w-[100px] flex-1",
        selected
          ? "border-[#0891b2] bg-[#0891b2]/5"
          : "border-border bg-background hover:border-[#0891b2]/50"
      )}
    >
      <div
        className={cn(
          "w-10 h-10 rounded-full flex items-center justify-center mb-2",
          selected ? "bg-[#0891b2] text-white" : "bg-[#a7f3d0] text-[#0891b2]"
        )}
      >
        {icon}
      </div>
      <span className={cn("text-sm font-medium", selected ? "text-[#0891b2]" : "text-foreground")}>
        {label}
      </span>
    </button>
  )
}

export function LoginForm() {
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [role, setRole] = useState("")
  const [signupRole, setSignupRole] = useState("")
  const router = useRouter()

  useEffect(() => {
    if (typeof window !== "undefined" && window.location.hash === "#register") {
      const registerSection = document.getElementById("register-section")
      if (registerSection) {
        registerSection.scrollIntoView({ behavior: "smooth" })
      }
    }
  }, [])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (role === "patient") {
      // Store default patient member in localStorage
      localStorage.setItem(
        "defaultPatient",
        JSON.stringify({
          id: "002",
          name: "Pramudi Perera",
          role: "patient",
          image: "/pic3.png",
        })
      )
      router.push("/patient/dashboard")
    } else if (role === "doctor") {
      router.push("/doctor/dashboard")
    } else if (role === "medical center assistant") {
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

  const roleOptions = [
    { value: "doctor", label: "Doctor", icon: <Stethoscope className="w-5 h-5" /> },
    { value: "medical center assistant", label: "Medical Assistant", icon: <Briefcase className="w-5 h-5" /> },
    { value: "patient", label: "Patient", icon: <User className="w-5 h-5" /> },
  ]

    const rolesOptions = [
    { value: "doctor", label: "Doctor", icon: <Stethoscope className="w-5 h-5" /> },
    { value: "patient", label: "Patient", icon: <User className="w-5 h-5" /> },
  ]

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

      <div className="space-y-3">
        <Label className="text-foreground font-medium">Select Your Role</Label>
        <div className="flex gap-3">
          {roleOptions.map((option) => (
            <RoleCard
              key={option.value}
              value={option.value}
              label={option.label}
              icon={option.icon}
              selected={role === option.value}
              onSelect={setRole}
            />
          ))}
        </div>
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

      <div id="register-section" className="border-t border-[#0891b2] pt-6 mt-6 scroll-mt-20">
        <h2 className="text-2xl font-bold text-foreground text-center mb-2">Create Your Account</h2>
        <p className="text-sm text-muted-foreground text-center mb-6">Join our medical network today.</p>
        
        <div className="space-y-3">
          <Label className="text-foreground font-medium">Select Your Role</Label>
          <div className="flex gap-3">
            {rolesOptions.map((option) => (
              <RoleCard
                key={option.value}
                value={option.value}
                label={option.label}
                icon={option.icon}
                selected={signupRole === option.value}
                onSelect={setSignupRole}
              />
            ))}
          </div>
        </div>

        <Button
          type="button"
          onClick={handleSignup}
          disabled={!signupRole}
          className="w-full mt-6 bg-[#38bdf8] hover:bg-[#0ea5e9] text-white font-medium py-2 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Create Account
        </Button>
      </div>
    </form>
  )
}
