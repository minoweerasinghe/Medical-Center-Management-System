"use client"

import type React from "react"
import { useState } from "react"
import { MedicalHeader } from "@/components/medical-header"
import { useRouter } from "next/navigation"

export default function ProfileRegisterPage() {
  const router = useRouter()
  const [formData, setFormData] = useState({
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
  const [error, setError] = useState("")

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const validateForm = () => {
    if (!formData.firstName || !formData.lastName ||  !formData.password || !formData.familyUsername) {
      setError("First Name, Last Name, Email, and Password are required")
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

    console.log("Profile registration:", formData)
    // Navigate to login page
    setTimeout(() => {
      router.push("/login")
    }, 100)
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
                alt="Profile Registration"
                className="w-full h-full object-cover"
              />
            </div>
          </div>

          {/* RIGHT FORM */}
          <div className="w-full md:w-1/2 max-w-md">
            <h1 className="text-3xl font-bold text-gray-900 mb-8 text-center md:text-center">
              Profile Creation
            </h1>

            <form onSubmit={handleSubmit} className="space-y-6">
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
                  First Name
                </label>
                <input
                  type="text"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleChange}
                  placeholder="Enter first name"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
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
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
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
                />
              </div>

                   <div>
                <label className="block text-sm font-medium text-gray-800 mb-2">
                    Allergies
                </label>
                <input
                  type="text"
                  name="allergies"
                  value={formData.allergies}
                  onChange={handleChange}
                  placeholder="Enter allergies"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
                />
              </div>


                   <div>
                <label className="block text-sm font-medium text-gray-800 mb-2">
                  Other Notes
                </label>
                <input
                  type="text"
                  name="otherNotes"
                  value={formData.otherNotes}
                  onChange={handleChange}
                  placeholder="Enter other notes"
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
                Create Profile
              </button>
            </form>
          </div>
        </div>
      </main>
    </div>
  )
}
