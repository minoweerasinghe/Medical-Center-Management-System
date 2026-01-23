"use client"

import type React from "react"
import { useState } from "react"
import { MedicalHeader } from "@/components/medical-header"
import { useRouter } from "next/navigation"

type FormData = {
  familyUsername: string
  password: string
  firstName: string
  lastName: string
  dateOfBirth: string
  gender: string
  contactNumber: string
  allergies: string
  otherNotes: string
}

export default function AssistantProfileRegisterPage() {
  const router = useRouter()

  const [formData, setFormData] = useState<FormData>({
    familyUsername: "",
    password: "",
    firstName: "",
    lastName: "",
    dateOfBirth: "",
    gender: "",
    contactNumber: "",
    allergies: "",
    otherNotes: "",
  })

  const [error, setError] = useState<string>("")

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const validateForm = () => {
    const { familyUsername, firstName, lastName, password } = formData

    if (!familyUsername || !firstName || !lastName || !password) {
      setError("Family Username, First Name, Last Name, and Password are required")
      return false
    }

    if (password.length < 6) {
      setError("Password must be at least 6 characters")
      return false
    }

    return true
  }

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setError("")
    if (!validateForm()) return

    console.log("Profile registration:", formData)
    router.push("/login")
  }

  return (
    <div className="min-h-screen bg-white">
      <MedicalHeader variant="register" isAuthenticated={true} />

      <main className="flex items-center justify-center px-6 py-12">
        <div className="flex w-full max-w-6xl gap-10 items-center flex-col md:flex-row">
          {/* LEFT IMAGE */}
          <div className="w-full md:w-1/2">
            <div className="rounded-lg overflow-hidden border bg-gray-50">
              <img
                src="/patient-registration.png"
                alt="Profile Registration"
                className="w-full h-full object-cover"
              />
            </div>
          </div>

          {/* RIGHT FORM */}
          <div className="w-full md:w-1/2 max-w-md">
            <h1 className="text-3xl font-bold text-gray-900 mb-8 text-center">
              Profile Creation
            </h1>

            <form onSubmit={handleSubmit} className="space-y-6" noValidate>
              <div>
                <label className="block text-sm font-medium text-gray-800 mb-2">
                  Family Username
                </label>
                <input
                  type="text"
                  name="familyUsername"
                  value={formData.familyUsername}
                  onChange={handleChange}
                  placeholder="Enter family username"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
                  autoComplete="username"
                  required
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
                  placeholder="Enter password"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
                  autoComplete="new-password"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-800 mb-2">
                  First Name
                </label>
                <input
                  type="text"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleChange}
                  placeholder="Enter first name"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-800 mb-2">
                  Last Name
                </label>
                <input
                  type="text"
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleChange}
                  placeholder="Enter last name"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-800 mb-2">
                  Date of Birth
                </label>
                <input
                  type="date"
                  name="dateOfBirth"
                  value={formData.dateOfBirth}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-800 mb-2">
                  Gender
                </label>
                <select
                  name="gender"
                  value={formData.gender}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 bg-white"
                >
                  <option value="">Select gender</option>
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                </select>
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
                  autoComplete="tel"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-800 mb-2">
                  Allergies (Optional)
                </label>
                <input
                  type="text"
                  name="allergies"
                  value={formData.allergies}
                  onChange={handleChange}
                  placeholder="Eg: Penicillin, Dust"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-800 mb-2">
                  Other Notes (Optional)
                </label>
                <textarea
                  name="otherNotes"
                  value={formData.otherNotes}
                  onChange={handleChange}
                  placeholder="Any special notes..."
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 min-h-[100px]"
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
                Create Profile
              </button>

              <p className="text-center text-sm text-gray-500">
                Already have an account?{" "}
                <button
                  type="button"
                  onClick={() => router.push("/login")}
                  className="text-teal-600 hover:text-teal-700 font-medium"
                >
                  Login
                </button>
              </p>
            </form>
          </div>
        </div>
      </main>
    </div>
  )
}
