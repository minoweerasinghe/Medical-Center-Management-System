"use client"

import type React from "react"
import { useState } from "react"
import { MedicalHeader } from "@/components/medical-header"
import { useRouter } from "next/navigation"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

export default function RegisterPage() {
  const router = useRouter()
  const [formData, setFormData] = useState({
    userType: "",
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

  const handleUserTypeChange = (value: string) => {
    setFormData((prev) => ({
      ...prev,
      userType: value,
    }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setError("")

    if (
      !formData.userType ||
      !formData.familyName ||
      !formData.email ||
      !formData.password ||
      !formData.confirmPassword
    ) {
      setError("All fields are required")
      return
    }

    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match")
      return
    }

    if (formData.password.length < 6) {
      setError("Password must be at least 6 characters")
      return
    }

    // TODO: Submit registration data to backend
    console.log("Registration data:", formData)
    router.push("/login")
  }

  return (
    <div className="min-h-screen bg-white">
      <MedicalHeader variant="register" />

      <main className="flex flex-col items-center justify-center py-12 px-4">
        <div className="w-full max-w-2xl mb-8">
          <div className="bg-teal-500 rounded-lg h-40 overflow-hidden">
            <img
              src="/images/attachments-gen-images-public-female-doctor-in-white-coat-smiling-with-medical-t.jpg"
              alt="Medical professional"
              className="w-full h-full object-cover"
            />
          </div>
        </div>

        <div className="w-full max-w-md px-4">
          <h1 className="text-3xl font-bold text-center text-gray-900 mb-10">Account Registration</h1>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="userType" className="block text-sm font-medium text-gray-800 mb-2">
                <span className="text-green-600 font-bold">1.</span> User Type
              </label>
              <Select value={formData.userType} onValueChange={handleUserTypeChange}>
                <SelectTrigger className="w-full border-gray-300 text-gray-700">
                  <SelectValue placeholder="Select your user type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="doctor">Doctor</SelectItem>
                  <SelectItem value="patient">Patient</SelectItem>
                  <SelectItem value="assistant">Medical Center Assistant</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* 2. Family Name Field */}
            <div>
              <label htmlFor="familyName" className="block text-sm font-medium text-gray-800 mb-2">
                <span className="text-green-600 font-bold">2.</span> Family name
              </label>
              <input
                type="text"
                id="familyName"
                name="familyName"
                placeholder="Enter your Family name"
                value={formData.familyName}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-md text-gray-700 placeholder-gray-400 focus:ring-2 focus:ring-sky-400 focus:border-transparent outline-none transition"
              />
            </div>

            {/* 3. Email Field */}
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-800 mb-2">
                <span className="text-green-600 font-bold">3.</span> Email
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

            {/* 4. Password Field */}
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-800 mb-2">
                <span className="text-green-600 font-bold">4.</span> Password
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

            {/* 5. Confirm Password Field */}
            <div>
              <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-800 mb-2">
                <span className="text-green-600 font-bold">5.</span> Confirm Password
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

            {/* Error Message */}
            {error && (
              <div className="p-3 bg-red-50 border border-red-200 rounded-lg">
                <p className="text-sm text-red-600">{error}</p>
              </div>
            )}

            {/* Sign Up Button */}
            <button
              type="submit"
              className="w-full bg-sky-500 hover:bg-sky-600 text-black font-bold py-2 px-4 rounded-md transition duration-200 mt-8"
            >
              Sign Up
            </button>
          </form>

          {/* Login Link */}
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
