"use client"

import type React from "react"
import { useState } from "react"
import { MedicalHeader } from "@/components/medical-header"
import { useRouter } from "next/navigation"

export default function AssistantFamilyRegisterPage() {
  const router = useRouter()
  const [formData, setFormData] = useState({
    familyName: "",
    nic: "",
    contactNumber: "",
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

    console.log("Family account registration:", formData)
    router.push("/login")
  }

  return (
    <div className="min-h-screen bg-white">
      <MedicalHeader variant="register" isAuthenticated={true} />

      <main className="flex items-center justify-center px-6 py-12">
        <div className="flex w-full max-w-6xl gap-30 items-center flex-col md:flex-row">
          
          {/* LEFT IMAGE */}
          <div className="w-full md:w-1/2">
            <div className="rounded-lg overflow-hidden">
              <img
                src="/patient-registration.png"
                alt="Family Registration"
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
                  Family Name
                </label>
                <input
                  type="text"
                  name="familyName"
                  value={formData.familyName}
                  onChange={handleChange}
                  placeholder="Enter family name"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-800 mb-2">
                  NIC Number
                </label>
                <input
                  type="text"
                  name="nic"
                  value={formData.nic}
                  onChange={handleChange}
                  placeholder="Enter NIC number"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-800 mb-2">
                  Contact Number
                </label>
                <input
                  type="tel"
                  name="contactNumber"
                  value={formData.contactNumber}
                  onChange={handleChange}
                  placeholder="Enter contact number"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-800 mb-2">
                  Email Address
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="Enter your email"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
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
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
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
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
                />
              </div>

              {error && (
                <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg">
                  {error}
                </div>
              )}

              <button
                type="submit"
                className="w-full bg-teal-500 hover:bg-teal-600 text-white font-semibold py-3 px-4 rounded-lg transition duration-200"
              >
                Create Family Account
              </button>
            </form>
          </div>
        </div>
      </main>
    </div>
  )
}
