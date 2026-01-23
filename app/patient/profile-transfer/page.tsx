"use client"

import type React from "react"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { CheckCircle2 } from "lucide-react"

type Step = "verify" | "choose" | "create-new" | "transfer-existing"

export default function ProfileTransferPage() {
  const [step, setStep] = useState<Step>("verify")
  const [transferOption, setTransferOption] = useState<"create" | "transfer" | null>(null)
  
  const [verifyData, setVerifyData] = useState({
    username: "",
    password: "",
    otp: "",
  })

  const [createAccountData, setCreateAccountData] = useState({
    familyUsername: "",
    email: "",
    password: "",
  })

  const [transferData, setTransferData] = useState({
    familyName: "",
    otp: "",
  })

  const handleVerifyChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setVerifyData((prev) => ({ ...prev, [name]: value }))
  }

  const handleCreateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setCreateAccountData((prev) => ({ ...prev, [name]: value }))
  }

  const handleTransferChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setTransferData((prev) => ({ ...prev, [name]: value }))
  }

  const handleVerify = (e: React.FormEvent) => {
    e.preventDefault()
    if (verifyData.username && verifyData.password && verifyData.otp) {
      setStep("choose")
    }
  }

  const handleOptionContinue = () => {
    if (transferOption === "create") {
      setStep("create-new")
    } else if (transferOption === "transfer") {
      setStep("transfer-existing")
    }
  }

  const handleCreateAccount = (e: React.FormEvent) => {
    e.preventDefault()
    // Handle create new account logic
    console.log("Creating new account:", createAccountData)
  }

  const handleTransferAccount = (e: React.FormEvent) => {
    e.preventDefault()
    // Handle transfer to existing account logic
    console.log("Transferring to account:", transferData)
  }

  const handleBack = () => {
    if (step === "choose") {
      setStep("verify")
    } else if (step === "create-new" || step === "transfer-existing") {
      setStep("choose")
      setTransferOption(null)
    }
  }

  const handleCancel = () => {
    setStep("verify")
    setTransferOption(null)
    setVerifyData({ username: "", password: "", otp: "" })
    setCreateAccountData({ familyUsername: "", email: "", password: "" })
    setTransferData({ familyName: "", otp: "" })
  }

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Profile Transfer</h1>
      </div>

      <Card className="p-8 bg-white max-w-2xl">
        {/* Step 1: Verify Current Profile */}
        {step === "verify" && (
          <div>
            <h2 className="text-xl font-semibold text-gray-900 mb-6">Current Profile Verification</h2>

            <form onSubmit={handleVerify} className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Username</label>
                <input
                  type="text"
                  name="username"
                  placeholder="Enter your username"
                  value={verifyData.username}
                  onChange={handleVerifyChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent outline-none text-sm"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Password</label>
                <input
                  type="password"
                  name="password"
                  placeholder="Enter your password"
                  value={verifyData.password}
                  onChange={handleVerifyChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent outline-none text-sm"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">OTP</label>
                <div className="flex gap-3">
                  <input
                    type="text"
                    name="otp"
                    placeholder="Enter OTP"
                    value={verifyData.otp}
                    onChange={handleVerifyChange}
                    className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent outline-none text-sm"
                    required
                  />
                  <Button type="button" variant="outline" className="px-4 bg-transparent">
                    Request OTP
                  </Button>
                </div>
              </div>

              <p className="text-xs text-blue-600 italic">
                Note: This information is required to verify your identity and ensure the security of your profile.
              </p>

              <div className="flex gap-4 pt-6 border-t justify-center">
                <Button 
                  type="submit"
                  className="bg-teal-500 hover:bg-teal-600 text-white px-8"
                >
                  Verify Profile
                </Button>
                <Button 
                  type="button"
                  onClick={handleCancel}
                  className="bg-gray-300 hover:bg-gray-400 text-gray-900 px-8"
                >
                  Cancel
                </Button>
              </div>
            </form>
          </div>
        )}

        {/* Step 2: Choose Transfer Option */}
        {step === "choose" && (
          <div>
            <div className="flex items-center gap-3 mb-6 p-4 bg-green-50 rounded-lg border border-green-200">
              <CheckCircle2 className="h-6 w-6 text-green-600" />
              <span className="text-green-800 font-medium">Profile verified successfully!</span>
            </div>

            <h2 className="text-xl font-semibold text-gray-900 mb-6">What would you like to do?</h2>

            <RadioGroup
              value={transferOption || ""}
              onValueChange={(value) => setTransferOption(value as "create" | "transfer")}
              className="space-y-4"
            >
              <div className="flex items-start space-x-3 p-4 border border-gray-200 rounded-lg hover:border-teal-300 hover:bg-teal-50/50 transition-colors cursor-pointer">
                <RadioGroupItem value="create" id="create" className="mt-1" />
                <Label htmlFor="create" className="cursor-pointer flex-1">
                  <span className="font-medium text-gray-900 block">Create a New Family Account</span>
                  <span className="text-sm text-gray-500">Start fresh with a new family account and transfer your profile to it</span>
                </Label>
              </div>

              <div className="flex items-start space-x-3 p-4 border border-gray-200 rounded-lg hover:border-teal-300 hover:bg-teal-50/50 transition-colors cursor-pointer">
                <RadioGroupItem value="transfer" id="transfer" className="mt-1" />
                <Label htmlFor="transfer" className="cursor-pointer flex-1">
                  <span className="font-medium text-gray-900 block">Transfer to an Existing Account</span>
                  <span className="text-sm text-gray-500">Move your profile to another existing family account</span>
                </Label>
              </div>
            </RadioGroup>

            <div className="flex gap-4 mt-8 pt-6 border-t justify-center">
              <Button 
                onClick={handleOptionContinue}
                disabled={!transferOption}
                className="bg-teal-500 hover:bg-teal-600 text-white px-8 disabled:opacity-50"
              >
                Continue
              </Button>
              <Button 
                onClick={handleBack}
                className="bg-gray-300 hover:bg-gray-400 text-gray-900 px-8"
              >
                Back
              </Button>
            </div>
          </div>
        )}

        {/* Step 3a: Create New Account Form */}
        {step === "create-new" && (
          <div>
            <h2 className="text-xl font-semibold text-gray-900 mb-6">Create New Family Account</h2>

            <form onSubmit={handleCreateAccount} className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Family Username</label>
                <input
                  type="text"
                  name="familyUsername"
                  placeholder="Enter family username"
                  value={createAccountData.familyUsername}
                  onChange={handleCreateChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent outline-none text-sm"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
                <input
                  type="email"
                  name="email"
                  placeholder="Enter email address"
                  value={createAccountData.email}
                  onChange={handleCreateChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent outline-none text-sm"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Password</label>
                <input
                  type="password"
                  name="password"
                  placeholder="Enter password"
                  value={createAccountData.password}
                  onChange={handleCreateChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent outline-none text-sm"
                  required
                />
              </div>

              <p className="text-xs text-blue-600 italic">
                Note: Your profile will be transferred to this new family account once created.
              </p>

              <div className="flex gap-4 pt-6 border-t justify-center">
                <Button 
                  type="submit"
                  className="bg-teal-500 hover:bg-teal-600 text-white px-8"
                >
                  Create & Transfer
                </Button>
                <Button 
                  type="button"
                  onClick={handleBack}
                  className="bg-gray-300 hover:bg-gray-400 text-gray-900 px-8"
                >
                  Back
                </Button>
              </div>
            </form>
          </div>
        )}

        {/* Step 3b: Transfer to Existing Account Form */}
        {step === "transfer-existing" && (
          <div>
            <h2 className="text-xl font-semibold text-gray-900 mb-6">Transfer to Existing Account</h2>

            <form onSubmit={handleTransferAccount} className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Account Family Name</label>
                <input
                  type="text"
                  name="familyName"
                  placeholder="Enter the family account name"
                  value={transferData.familyName}
                  onChange={handleTransferChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent outline-none text-sm"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">OTP from Target Account</label>
                <div className="flex gap-3">
                  <input
                    type="text"
                    name="otp"
                    placeholder="Enter OTP from target account"
                    value={transferData.otp}
                    onChange={handleTransferChange}
                    className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent outline-none text-sm"
                    required
                  />
                  <Button type="button" variant="outline" className="px-4 bg-transparent">
                    Request OTP
                  </Button>
                </div>
              </div>

              <p className="text-xs text-blue-600 italic">
                Note: The target account owner must provide the OTP to authorize this transfer.
              </p>

              <div className="flex gap-4 pt-6 border-t justify-center">
                <Button 
                  type="submit"
                  className="bg-teal-500 hover:bg-teal-600 text-white px-8"
                >
                  Confirm Transfer
                </Button>
                <Button 
                  type="button"
                  onClick={handleBack}
                  className="bg-gray-300 hover:bg-gray-400 text-gray-900 px-8"
                >
                  Back
                </Button>
              </div>
            </form>
          </div>
        )}
      </Card>
    </div>
  )
}
