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
        <h1 className="text-4xl font-bold text-gray-900 mb-2">Profile Transfer</h1>
      </div>

      <Card className="p-8 bg-white max-w-2xl">
        {/* Old Account Verification */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Old Family Account Verification</h2>

          <form className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-900 mb-2">Username</label>
              <input
                type="text"
                name="oldUsername"
                placeholder="Enter your username"
                value={formData.oldUsername}
                onChange={handleChange}
                disabled={verified}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none disabled:bg-gray-100"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-900 mb-2">Password</label>
              <input
                type="password"
                name="oldPassword"
                placeholder="Enter your password"
                value={formData.oldPassword}
                onChange={handleChange}
                disabled={verified}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none disabled:bg-gray-100"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-900 mb-2">Your Profile ID</label>
              <input
                type="text"
                name="profileId"
                placeholder="Enter your profile ID"
                value={formData.profileId}
                onChange={handleChange}
                disabled={verified}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none disabled:bg-gray-100"
              />
            </div>

            <p className="text-xs text-gray-500 italic">
              Note: This information is required to verify your identity and ensure the security of your profile.
            </p>

            {!verified && (
              <Button
                type="button"
                onClick={handleVerify}
                className="w-full bg-blue-500 hover:bg-blue-600 text-white mt-4"
              >
                Verify
              </Button>
            )}
            {verified && (
              <div className="p-3 bg-green-50 border border-green-200 rounded-lg mt-4">
                <p className="text-sm text-green-600">✓ Account verified successfully</p>
              </div>
            )}
          </form>
        </div>

        {/* New Account Transfer */}
        {verified && (
          <div className="border-t pt-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Join New Account Transfer</h2>

            <form className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-900 mb-2">New Family Username</label>
                <input
                  type="text"
                  name="newUsername"
                  placeholder="Enter new family username"
                  value={formData.newUsername}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-900 mb-2">New Family Password</label>
                <input
                  type="password"
                  name="newPassword"
                  placeholder="Enter new family password"
                  value={formData.newPassword}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                />
              </div>
            </form>

            <div className="flex gap-4 mt-8 pt-6 border-t">
              <Button className="flex-1 bg-teal-500 hover:bg-teal-600 text-white">Confirm Transfer</Button>
              <Button className="flex-1 bg-gray-300 hover:bg-gray-400 text-gray-900">Cancel</Button>
            </div>
          </div>
        )}

        {!verified && (
          <div className="flex justify-end mt-8 pt-6 border-t">
            <Button className="bg-gray-300 hover:bg-gray-400 text-gray-900">Back</Button>
          </div>
        )}
      </Card>
    </div>
  )
}
