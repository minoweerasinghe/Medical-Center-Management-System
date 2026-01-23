"use client"

import type React from "react"
import { useState } from "react"
import { MedicalHeader } from "@/components/medical-header"
import { useRouter } from "next/navigation"

export default function DoctorRegisterPage() {
  const router = useRouter()
  const [formData, setFormData] = useState({
    name: "",
    specialization: "",
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
    if (
      !formData.name ||
      !formData.specialization ||
      !formData.email ||
      !formData.password ||
      !formData.confirmPassword
    ) {
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

    console.log("Doctor registration:", formData)
    router.push("/login")
  }

  return (
    <div className="min-h-screen bg-white">
      <MedicalHeader variant="register" />

      <main className="px-6 py-12">

        {/* CENTERED TITLE ABOVE BOTH */}
        <h1 className="text-4xl font-bold text-gray-900 text-center mb-12">
          Welcome to MEDiCAL CENTRE Doc!
        </h1>

        {/* FORM + IMAGE ROW */}
        <div className="flex flex-col md:flex-row items-start justify-center gap-24">

          {/* LEFT SIDE FORM */}
          <div className="w-full md:w-1/2 max-w-md">
            <form onSubmit={handleSubmit} className="space-y-5">

              <div>
                <label className="block text-sm font-medium text-gray-800 mb-2">
                  Name
                </label>
                <input
                  type="text"
                  name="name"
                  placeholder="Enter your name"
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-sky-400 outline-none"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-800 mb-2">
                  Specialization
                </label>
                <input
                  type="text"
                  name="specialization"
                  placeholder="Enter your specialization"
                  value={formData.specialization}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-sky-400 outline-none"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-800 mb-2">
                  Email Address
                </label>
                <input
                  type="email"
                  name="email"
                  placeholder="Enter your email"
                  value={formData.email}
                  onChange={handleChange}
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
                  placeholder="Enter your password"
                  value={formData.password}
                  onChange={handleChange}
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
                  placeholder="Confirm your password"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-sky-400 outline-none"
                />
              </div>

              {error && (
                <div className="p-3 bg-red-50 border border-red-200 rounded-lg">
                  <p className="text-sm text-red-600">{error}</p>
                </div>
              )}

              <button className="w-full bg-sky-500 hover:bg-sky-600 text-white font-bold py-2 rounded-md">
                Save Changes
              </button>

              <button
                type="button"
                onClick={() => router.back()}
                className="w-full bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 rounded-md"
              >
                Cancel
              </button>
            </form>
          </div>

          {/* RIGHT SIDE IMAGE */}
          <div className="w-full md:w-1/2 max-w-lg">
            <div className="h-[520px] rounded-lg overflow-hidden shadow-lg">
              <img
                src="/doctor-availability.png"
                alt="Doctor"
                className="w-full h-full object-cover"
              />
            </div>
          </div>

        </div>
      </main>
    </div>
  )
}
