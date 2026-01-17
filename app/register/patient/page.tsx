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

    if (!validateForm()) {
      return
    }

    console.log("Patient registration:", formData)
    router.push("/login")
  }

  return (
    <div className="min-h-screen bg-white">
      <MedicalHeader variant="register" />

      <main className="flex flex-col items-center justify-center py-12 px-4">
        <div className="w-full max-w-2xl mb-8">
          <div className="bg-teal-500 rounded-lg h-100 overflow-hidden">
            <img
              src="/patient-registration.png"
              alt="Patient"
              className="w-full h-full object-cover"
            />
          </div>
        </div>

        <div className="w-full max-w-md px-4">
          <h1 className="text-3xl font-bold text-center text-gray-900 mb-10">Patient Registration</h1>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="familyName" className="block text-sm font-medium text-gray-800 mb-2">
                <span className="text-green-600 font-bold"></span> Family Name
              </label>
              <input
                type="text"
                id="familyName"
                name="familyName"
                placeholder="Enter your family name"
                value={formData.familyName}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-md text-gray-700 placeholder-gray-400 focus:ring-2 focus:ring-sky-400 focus:border-transparent outline-none transition"
              />
            </div>

            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-800 mb-2">
                <span className="text-green-600 font-bold"></span> Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                placeholder="Enter your email"
                value={formData.email}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-md text-gray-700 placeholder-gray-400 focus:ring-2 focus:ring-sky-400 focus:border-transparent outline-none transition"
              />
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-800 mb-2">
                <span className="text-green-600 font-bold"></span> Password
              </label>
              <input
                type="password"
                id="password"
                name="password"
                placeholder="Enter your password"
                value={formData.password}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-md text-gray-700 placeholder-gray-400 focus:ring-2 focus:ring-sky-400 focus:border-transparent outline-none transition"
              />
            </div>

            <div>
              <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-800 mb-2">
                <span className="text-green-600 font-bold"></span> Confirm Password
              </label>
              <input
                type="password"
                id="confirmPassword"
                name="confirmPassword"
                placeholder="Confirm your password"
                value={formData.confirmPassword}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-md text-gray-700 placeholder-gray-400 focus:ring-2 focus:ring-sky-400 focus:border-transparent outline-none transition"
              />
            </div>

            {error && (
              <div className="p-3 bg-red-50 border border-red-200 rounded-lg">
                <p className="text-sm text-red-600">{error}</p>
              </div>
            )}

            <button
              type="submit"
              className="w-full bg-sky-500 hover:bg-sky-600 text-white font-bold py-2 px-4 rounded-md transition duration-200 mt-8"
            >
              Sign Up
            </button>
          </form>

          <p className="text-center mt-6 text-gray-500 text-sm">
            Already have an account?{" "}
            <button onClick={() => router.push("/login")} className="text-sky-500 hover:text-sky-600 font-medium">
              Login
            </button>
          </p>
        </div>
      </main>
    </div>
  )
}
