"use client"

import type React from "react"
import { useMemo, useState } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { AlertCircle, CheckCircle2, Clock, ShieldCheck, UserCheck } from "lucide-react"

type Step =
  | "verify"
  | "owner-check"
  | "select-new-owner"
  | "new-owner-verify"
  | "choose-action"
  | "create-new-account"
  | "transfer-to-existing"

interface FamilyMember {
  id: string
  name: string
  nic?: string
  contact?: string
  role: "owner" | "member"
}

export default function ProfileTransferPage() {
  const [step, setStep] = useState<Step>("verify")

  // STEP 1: verify initiator
  const [verifyData, setVerifyData] = useState({
    familyUsername: "",
    password: "",
    otp: "",
  })

  // STEP 2: owner result
  const [isOwner, setIsOwner] = useState<boolean | null>(null)

  // STEP 3: select new owner (must have NIC + contact)
  const familyMembers: FamilyMember[] = [
    { id: "001", name: "Pramudi Perera", nic: "123456789V", contact: "074 0235792", role: "owner" },
    { id: "003", name: "Rohith Perera", nic: "987654321V", contact: "075 1234567", role: "member" },
    { id: "004", name: "Aisha Perera", nic: "456789123V", contact: "076 2345678", role: "member" },
    // Example of someone who should NOT appear (missing NIC/contact):
    { id: "005", name: "Member Without NIC", role: "member" },
  ]

  const eligibleNewOwners = useMemo(
    () => familyMembers.filter((m) => m.role !== "owner" && !!m.nic && !!m.contact),
    [familyMembers]
  )

  const [selectedNewOwner, setSelectedNewOwner] = useState<FamilyMember | null>(null)

  // STEP 4: verify new owner by OTP
  const [newOwnerOtp, setNewOwnerOtp] = useState("")
  const [newOwnerOtpSent, setNewOwnerOtpSent] = useState(false)

  // STEP 5: action
  const [action, setAction] = useState<"createNew" | "transferExisting" | null>(null)

  // Create new account form
  const [newAccountData, setNewAccountData] = useState({
    newFamilyUsername: "",
    email: "",
    password: "",
  })

  // Transfer to existing account form
  const [targetFamilyUsername, setTargetFamilyUsername] = useState("")

  // dialogs
  const [dialog, setDialog] = useState<null | "pending" | "success" | "deleteConfirm">(null)

  const onVerifyChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setVerifyData((p) => ({ ...p, [name]: value }))
  }

  const onVerifySubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Mock: if OTP + username + password exist, continue.
    if (!verifyData.familyUsername || !verifyData.password || !verifyData.otp) return

    // Mock owner check result:
    const mockIsOwner = true
    setIsOwner(mockIsOwner)
    setStep("owner-check")
  }

  const goBack = () => {
    setDialog(null)
    setNewOwnerOtp("")
    setNewOwnerOtpSent(false)

    if (step === "owner-check") {
      setStep("verify")
      setIsOwner(null)
      return
    }
    if (step === "select-new-owner") {
      setStep("owner-check")
      setSelectedNewOwner(null)
      return
    }
    if (step === "new-owner-verify") {
      setStep("select-new-owner")
      setNewOwnerOtp("")
      setNewOwnerOtpSent(false)
      return
    }
    if (step === "choose-action") {
      setStep("new-owner-verify")
      setAction(null)
      return
    }
    if (step === "create-new-account" || step === "transfer-to-existing") {
      setStep("choose-action")
      setAction(null)
      return
    }
    setStep("verify")
  }

  const resetAll = () => {
    setStep("verify")
    setVerifyData({ familyUsername: "", password: "", otp: "" })
    setIsOwner(null)
    setSelectedNewOwner(null)
    setNewOwnerOtp("")
    setNewOwnerOtpSent(false)
    setAction(null)
    setNewAccountData({ newFamilyUsername: "", email: "", password: "" })
    setTargetFamilyUsername("")
    setDialog(null)
  }

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-4xl font-bold text-gray-900 mb-2">Profile Transfer</h1>
        <p className="text-gray-600">
          Verify ownership, select a new owner, then delete & move to a new account or transfer into another account.
        </p>
      </div>

      <Card className="p-8 bg-white max-w-3xl">
        {/* STEP 1 */}
        {step === "verify" && (
          <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-2">Verify Your Account</h2>
            <p className="text-gray-600 mb-6">We need to confirm it’s really you before starting the transfer.</p>

            <form onSubmit={onVerifySubmit} className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-900 mb-2">Family Username</label>
                <Input
                  name="familyUsername"
                  placeholder="Enter family username"
                  value={verifyData.familyUsername}
                  onChange={onVerifyChange}
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-900 mb-2">Password</label>
                <Input
                  name="password"
                  type="password"
                  placeholder="Enter password"
                  value={verifyData.password}
                  onChange={onVerifyChange}
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-900 mb-2">OTP</label>
                <div className="flex gap-3">
                  <Input name="otp" placeholder="Enter OTP" value={verifyData.otp} onChange={onVerifyChange} required />
                  <Button type="button" variant="outline" className="px-6">
                    Request OTP
                  </Button>
                </div>
                <p className="text-xs text-gray-500 mt-2">OTP will be sent to the owner’s registered contact number.</p>
              </div>

              <Button type="submit" className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 font-semibold">
                Verify & Continue
              </Button>
            </form>
          </div>
        )}

        {/* STEP 2 */}
        {step === "owner-check" && (
          <div className="space-y-6">
            {isOwner ? (
              <>
                <div className="flex items-center gap-3 p-4 bg-green-50 border border-green-200 rounded-lg">
                  <ShieldCheck className="h-6 w-6 text-green-600" />
                  <div>
                    <p className="font-semibold text-green-900">Owner Verified</p>
                    <p className="text-sm text-green-700">You can transfer ownership.</p>
                  </div>
                </div>

                <div className="space-y-2">
                  <h2 className="text-2xl font-bold text-gray-900">Select New Account Owner</h2>
                  <p className="text-gray-600">
                    Only family members with a <span className="font-semibold">NIC</span> and{" "}
                    <span className="font-semibold">contact number</span> can be selected.
                  </p>
                </div>

                <div className="space-y-3">
                  {eligibleNewOwners.map((m) => (
                    <button
                      key={m.id}
                      onClick={() => {
                        setSelectedNewOwner(m)
                        setStep("new-owner-verify")
                      }}
                      className="w-full p-4 border-2 border-gray-200 rounded-lg hover:border-blue-500 hover:bg-blue-50 transition-all text-left"
                    >
                      <div className="flex items-start justify-between gap-4">
                        <div>
                          <p className="font-semibold text-gray-900">{m.name}</p>
                          <p className="text-sm text-gray-600">NIC: {m.nic}</p>
                          <p className="text-sm text-gray-600">Contact: {m.contact}</p>
                        </div>
                        <div className="text-xs bg-blue-100 text-blue-700 px-3 py-1 rounded-full font-medium">
                          Eligible
                        </div>
                      </div>
                    </button>
                  ))}
                </div>

                <div className="flex gap-3 pt-6 border-t">
                  <Button onClick={goBack} className="flex-1 bg-gray-300 hover:bg-gray-400 text-gray-900 font-semibold">
                    Back
                  </Button>
                </div>
              </>
            ) : (
              <>
                <div className="flex items-start gap-3 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
                  <AlertCircle className="h-6 w-6 text-yellow-600 flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="font-semibold text-yellow-900">Not Account Owner</p>
                    <p className="text-sm text-yellow-700">Only the account owner can initiate a profile transfer.</p>
                  </div>
                </div>
                <div className="flex gap-3 pt-6 border-t">
                  <Button onClick={goBack} className="flex-1 bg-gray-300 hover:bg-gray-400 text-gray-900 font-semibold">
                    Back
                  </Button>
                </div>
              </>
            )}
          </div>
        )}

        {/* STEP 4: New owner OTP confirm */}
        {step === "new-owner-verify" && selectedNewOwner && (
          <div className="space-y-6">
            <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
              <p className="text-sm text-gray-800">
                <span className="font-semibold">Selected New Owner:</span> {selectedNewOwner.name} <br />
                <span className="font-semibold">NIC:</span> {selectedNewOwner.nic} •{" "}
                <span className="font-semibold">Contact:</span> {selectedNewOwner.contact}
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-2">Verify New Owner</h2>
              <p className="text-gray-600">
                Send an OTP to the selected owner’s contact number to confirm they accept ownership.
              </p>
            </div>

            <div className="space-y-3">
              <div className="flex gap-3">
                <Input
                  placeholder="Enter OTP received by new owner"
                  value={newOwnerOtp}
                  onChange={(e) => setNewOwnerOtp(e.target.value)}
                />
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setNewOwnerOtpSent(true)}
                  className="px-6"
                >
                  Send OTP
                </Button>
              </div>

              {newOwnerOtpSent && (
                <p className="text-xs text-green-700">OTP sent to {selectedNewOwner.contact}. Ask them to provide it.</p>
              )}
            </div>

            <div className="flex gap-3 pt-6 border-t">
              <Button onClick={goBack} className="flex-1 bg-gray-300 hover:bg-gray-400 text-gray-900 font-semibold">
                Back
              </Button>
              <Button
                onClick={() => {
                  if (!newOwnerOtp) return
                  setStep("choose-action")
                }}
                className="flex-1 bg-blue-600 hover:bg-blue-700 text-white font-semibold"
              >
                Confirm New Owner
              </Button>
            </div>
          </div>
        )}

        {/* STEP 5: choose action */}
        {step === "choose-action" && selectedNewOwner && (
          <div className="space-y-6">
            <div className="flex items-center gap-3 p-4 bg-green-50 border border-green-200 rounded-lg">
              <UserCheck className="h-6 w-6 text-green-600" />
              <div>
                <p className="font-semibold text-green-900">New Owner Confirmed</p>
                <p className="text-sm text-green-700">{selectedNewOwner.name} is ready to receive ownership.</p>
              </div>
            </div>

            <h2 className="text-2xl font-bold text-gray-900">Choose What Happens Next</h2>

            <div className="space-y-3">
              <button
                onClick={() => {
                  setAction("createNew")
                  setStep("create-new-account")
                }}
                className="w-full p-4 border-2 border-gray-200 rounded-lg hover:border-blue-500 hover:bg-blue-50 transition-all text-left"
              >
                <p className="font-semibold text-gray-900">Delete this account & Create a New Account</p>
                <p className="text-sm text-gray-600">
                  Create a brand new family account for the new owner, then move all ownership/data.
                </p>
              </button>

              <button
                onClick={() => {
                  setAction("transferExisting")
                  setStep("transfer-to-existing")
                }}
                className="w-full p-4 border-2 border-gray-200 rounded-lg hover:border-green-500 hover:bg-green-50 transition-all text-left"
              >
                <p className="font-semibold text-gray-900">Transfer into Another Existing Account</p>
                <p className="text-sm text-gray-600">
                  Enter another family username and send a request. The other account holder must accept it.
                </p>
              </button>
            </div>

            <div className="flex gap-3 pt-6 border-t">
              <Button onClick={goBack} className="flex-1 bg-gray-300 hover:bg-gray-400 text-gray-900 font-semibold">
                Back
              </Button>
            </div>
          </div>
        )}

        {/* OPTION 1: create new account */}
        {step === "create-new-account" && selectedNewOwner && (
          <div className="space-y-6">
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-2">Create New Family Account</h2>
              <p className="text-gray-600">This will delete the current account and move ownership to a new account.</p>
            </div>

            <div className="p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
              <p className="text-sm text-gray-700">
                <span className="font-semibold">Important:</span> Deleting the current account is irreversible.
              </p>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-900 mb-2">New Family Username</label>
                <Input
                  value={newAccountData.newFamilyUsername}
                  onChange={(e) => setNewAccountData((p) => ({ ...p, newFamilyUsername: e.target.value }))}
                  placeholder="e.g. perera_family_2"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-900 mb-2">Email</label>
                <Input
                  type="email"
                  value={newAccountData.email}
                  onChange={(e) => setNewAccountData((p) => ({ ...p, email: e.target.value }))}
                  placeholder="newowner@email.com"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-900 mb-2">Password</label>
                <Input
                  type="password"
                  value={newAccountData.password}
                  onChange={(e) => setNewAccountData((p) => ({ ...p, password: e.target.value }))}
                  placeholder="Create a strong password"
                />
              </div>
            </div>

            <div className="flex gap-3 pt-6 border-t">
              <Button onClick={goBack} className="flex-1 bg-gray-300 hover:bg-gray-400 text-gray-900 font-semibold">
                Back
              </Button>
              <Button
                onClick={() => setDialog("deleteConfirm")}
                className="flex-1 bg-red-600 hover:bg-red-700 text-white font-semibold"
              >
                Delete & Create New Account
              </Button>
            </div>
          </div>
        )}

        {/* OPTION 2: transfer into another existing account */}
        {step === "transfer-to-existing" && selectedNewOwner && (
          <div className="space-y-6">
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-2">Transfer to Another Existing Account</h2>
              <p className="text-gray-600">Enter the target family username and send a request for acceptance.</p>
            </div>

            <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
              <p className="text-sm text-gray-700">
                <span className="font-semibold">New Owner:</span> {selectedNewOwner.name}
              </p>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-900 mb-2">Target Family Username</label>
              <Input
                value={targetFamilyUsername}
                onChange={(e) => setTargetFamilyUsername(e.target.value)}
                placeholder="Enter target family username"
              />
              <p className="text-xs text-gray-500 mt-2">
                The target account holder must accept the request from their “Transfer Requests” page.
              </p>
            </div>

            <div className="flex gap-3 pt-6 border-t">
              <Button onClick={goBack} className="flex-1 bg-gray-300 hover:bg-gray-400 text-gray-900 font-semibold">
                Back
              </Button>
              <Button
                onClick={() => {
                  if (!targetFamilyUsername) return
                  setDialog("pending")
                }}
                className="flex-1 bg-blue-600 hover:bg-blue-700 text-white font-semibold"
              >
                Send Request
              </Button>
            </div>
          </div>
        )}
      </Card>

      {/* Pending dialog */}
      <Dialog open={dialog === "pending"} onOpenChange={(o) => (!o ? setDialog(null) : null)}>
        <DialogContent className="sm:max-w-[520px]">
          <DialogHeader>
            <DialogTitle>Transfer Request Sent</DialogTitle>
          </DialogHeader>

          <div className="space-y-4">
            <div className="flex justify-center">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center">
                <Clock className="h-8 w-8 text-blue-700" />
              </div>
            </div>

            <div className="text-center">
              <p className="font-semibold text-gray-900">Waiting for acceptance</p>
              <p className="text-sm text-gray-600 mt-1">
                Request sent to <span className="font-semibold">{targetFamilyUsername}</span>.
              </p>
            </div>

            <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
              <p className="text-sm text-gray-700">
                The other account holder must accept the request from: <span className="font-semibold">Profile Transfer Requests</span>.
              </p>
            </div>

            <Button
              onClick={() => {
                setDialog(null)
                resetAll()
              }}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold"
            >
              Done
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      {/* Delete confirm dialog */}
      <Dialog open={dialog === "deleteConfirm"} onOpenChange={(o) => (!o ? setDialog(null) : null)}>
        <DialogContent className="sm:max-w-[520px]">
          <DialogHeader>
            <DialogTitle className="text-red-600">Confirm Delete & Create New Account</DialogTitle>
          </DialogHeader>

          <div className="space-y-4">
            <div className="p-4 bg-red-50 border border-red-200 rounded-lg">
              <p className="text-sm text-red-800">
                <span className="font-semibold">Warning:</span> This action is irreversible. Current account will be deleted.
              </p>
            </div>

            <p className="text-sm text-gray-700">
              You are about to delete this account and create a new one for <span className="font-semibold">{selectedNewOwner?.name}</span>.
            </p>

            <div className="flex gap-3 pt-2">
              <Button
                onClick={() => setDialog(null)}
                className="flex-1 bg-gray-300 hover:bg-gray-400 text-gray-900 font-semibold"
              >
                Cancel
              </Button>
              <Button
                onClick={() => {
                  setDialog("success")
                }}
                className="flex-1 bg-red-600 hover:bg-red-700 text-white font-semibold"
              >
                Confirm
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Success dialog */}
      <Dialog open={dialog === "success"} onOpenChange={(o) => (!o ? setDialog(null) : null)}>
        <DialogContent className="sm:max-w-[520px]">
          <DialogHeader>
            <DialogTitle>Completed</DialogTitle>
          </DialogHeader>

          <div className="space-y-4">
            <div className="flex justify-center">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center">
                <CheckCircle2 className="h-8 w-8 text-green-700" />
              </div>
            </div>

            <div className="text-center">
              <p className="font-semibold text-gray-900">Transfer setup completed</p>
              <p className="text-sm text-gray-600 mt-1">
                Ownership transfer flow finished. (Connect API to finalize real DB updates.)
              </p>
            </div>

            <Button
              onClick={() => {
                setDialog(null)
                resetAll()
              }}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold"
            >
              Done
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}
