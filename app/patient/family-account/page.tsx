"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { usePatient } from "../patient-context"

interface FamilyMember {
  id: string
  name: string
  role: string
  image: string
}

export default function FamilyAccountPage() {
  const router = useRouter()
  const { setSelectedMember } = usePatient()
  const [members, setMembers] = useState<FamilyMember[]>([
    { id: "1", name: "Olivia Carter", role: "owner", image: "/pic3.png" },
    { id: "2", name: "Liam Carter", role: "Member", image: "/pic2.png" },
    { id: "3", name: "Ethan Carter", role: "Member", image: "/pic1.png" },
  ])

  const handleSelectMember = (member: FamilyMember) => {
    setSelectedMember(member)
    router.push(`/patient/profile?id=${member.id}`)
  }

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-gray-900 mb-1">Family Account</h1>
        <p className="text-gray-600 text-sm">Manage your family's health information and appointments</p>
      </div>

      <Card className="p-8 bg-white">
        <h2 className="text-lg font-semibold text-gray-900 mb-8">Account Holder: Olivia Carter</h2>

        <div className="mb-12">
          <h3 className="text-base font-semibold text-gray-900 mb-6">Family Members</h3>
          <div className="flex gap-6 flex-wrap">
            {members.map((member) => (
              <div
                key={member.id}
                onClick={() => handleSelectMember(member)}
                className="bg-gradient-to-b from-amber-200 to-amber-100 rounded-lg overflow-hidden hover:shadow-lg transition-shadow cursor-pointer w-40"
              >
                <div className="aspect-square overflow-hidden">
                  <img
                    src={member.image || "/placeholder.svg"}
                    alt={member.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="p-3 text-center">
                  <p className="font-semibold text-gray-900 text-sm">{member.name}</p>
                  <p className="text-xs text-gray-600">{member.role}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="flex justify-end pt-6 border-t border-gray-200">
          <Button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 text-sm" onClick={() => router.push("/patient/add-member")}>
            Add Family Member
          </Button>
        </div>
      </Card>
    </div>
  )
}
