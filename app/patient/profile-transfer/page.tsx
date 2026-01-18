"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"

export default function ProfileTransferPage() {
  const [step, setStep] = useState<"verify" | "transfer">("verify")
  const [verified, setVerified] = useState(false)
  const [formData, setFormData] = useState({
    oldUsername: "",
    oldPassword: "",
    profileId: "",
    newUsername: "",
    newPassword: "",
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleVerify = () => {
    if (formData.oldUsername && formData.oldPassword && formData.profileId) {
      setVerified(true)
      setStep("transfer")
    }
  }

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Profile Transfer</h1>
      </div>

      <Card className="p-8 bg-white max-w-2xl">
        {/* Old Account Verification */}
        <div className="mb-10">
          <h2 className="text-xl font-semibold text-gray-900 mb-6">Old Family Account Verification</h2>

          <form className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Username</label>
              <input
                type="text"
                name="oldUsername"
                placeholder="Enter your username"
                value={formData.oldUsername}
                onChange={handleChange}
                disabled={verified}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none disabled:bg-gray-100 text-sm"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Password</label>
              <input
                type="password"
                name="oldPassword"
                placeholder="Enter your password"
                value={formData.oldPassword}
                onChange={handleChange}
                disabled={verified}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none disabled:bg-gray-100 text-sm"
              />
            </div>

            <p className="text-xs text-blue-600 italic">
              Note: This information is required to verify your identity and ensure the security of your profile.
            </p>
          </form>
        </div>

        {/* New Account Transfer */}
        <div className="border-t pt-10">
          <h2 className="text-xl font-semibold text-gray-900 mb-6">Join New Account Transfer</h2>

          <form className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">New Family Username</label>
              <input
                type="text"
                name="newUsername"
                placeholder="Enter new family username"
                value={formData.newUsername}
                onChange={handleChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none text-sm"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">New Family Password</label>
              <input
                type="password"
                name="newPassword"
                placeholder="Enter new family password"
                value={formData.newPassword}
                onChange={handleChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none text-sm"
              />
            </div>
          </form>

          <div className="flex gap-4 mt-8 pt-6 border-t justify-center">
            <Button 
              onClick={handleVerify}
              className="bg-teal-500 hover:bg-teal-600 text-white px-8"
            >
              Confirm Transfer
            </Button>
            <Button className="bg-gray-300 hover:bg-gray-400 text-gray-900 px-8">Cancel</Button>
          </div>

          <div className="flex justify-center mt-4">
            <Button className="bg-white hover:bg-gray-100 text-gray-900 border border-gray-300">Back</Button>
          </div>
        </div>
      </Card>
    </div>
  )
}
