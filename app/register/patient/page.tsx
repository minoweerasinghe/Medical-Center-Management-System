"use client"

import type React from "react"
import { useState } from "react"
import { MedicalHeader } from "@/components/medical-header"
import { useRouter } from "next/navigation"

export default function PatientRegisterPage() {
  const router = useRouter()
  const [formData, setFormData] = useState({
    familyName: "",
    email: "",
    password: "",
    confirmPassword: "",
  })
  const [error, setError] = useState("")

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const validateForm = () => {
    if (!formData.familyName || !formData.email || !formData.password || !formData.confirmPassword) {
      setError("All fields are required")
      return false
    }
    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match")
      return false
    }
    if (formData.password.length < 6) {
      setError("Password must be at least 6 characters")
      return false
    }
    return true
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setError("")
    if (!validateForm()) return

    console.log("Patient registration:", formData)
    router.push("/login")
  }

  return (
    <div className="min-h-screen bg-white">
      <MedicalHeader variant="register" />

      <main className="flex items-center justify-center px-6 py-12">
        <div className="flex w-full max-w-6xl gap-30 items-center flex-col md:flex-row">
          
          {/* LEFT IMAGE */}
          <div className="w-full md:w-1/2">
            <div className="rounded-lg overflow-hidden">
              <img
                src="/patient-registration.png"
                alt="Patient"
                className="w-full h-full object-cover"
              />
            </div>
          </div>

          {/* RIGHT FORM */}
          <div className="w-full md:w-1/2 max-w-md">
            <h1 className="text-3xl font-bold text-gray-900 mb-8 text-center md:text-center">
              Family Account Registration
            </h1>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-800 mb-2">
                  Family Username
                </label>
                <input
                  type="text"
                  name="familyName"
                  value={formData.familyName}
                  onChange={handleChange}
                  placeholder="Enter your family username"
                  className="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-sky-400 outline-none"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-800 mb-2">
                  Email
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="Enter your email"
                  className="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-sky-400 outline-none"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-800 mb-2">
                  Password
                </label>
                <input
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="Enter your password"
                  className="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-sky-400 outline-none"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-800 mb-2">
                  Confirm Password
                </label>
                <input
                  type="password"
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  placeholder="Confirm your password"
                  className="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-sky-400 outline-none"
                />
              </div>

              {error && (
                <div className="p-3 bg-red-50 border border-red-200 rounded-lg">
                  <p className="text-sm text-red-600">{error}</p>
                </div>
              )}

              <button
                type="submit"
                className="w-full bg-sky-500 hover:bg-sky-600 text-white font-bold py-2 rounded-md transition"
              >
                Sign Up
              </button>
            </form>

            <p className="text-center mt-6 text-gray-500 text-sm">
              Already have an account?{" "}
              <button
                onClick={() => router.push("/login")}
                className="text-sky-500 hover:text-sky-600 font-medium"
              >
                Login
              </button>
            </p>
          </div>
        </div>
      </main>
    </div>
  )
}
