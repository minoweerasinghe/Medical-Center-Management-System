"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"

interface FamilyMember {
  id: string
  name: string
  role: string
  image: string
}

export default function FamilyAccountPage() {
  const [members] = useState<FamilyMember[]>([
    { id: "1", name: "Liam Carter", role: "Member", image: "/male-profile.jpg" },
    { id: "2", name: "Olivia Carter", role: "Account Holder", image: "/female-profile.jpg" },
    { id: "3", name: "Ethan Carter", role: "Member", image: "/young-male-profile.jpg" },
  ])

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-4xl font-bold text-gray-900 mb-2">Family Account</h1>
        <p className="text-gray-600">Manage your family's health information and appointments</p>
      </div>

      <Card className="p-6 bg-white">
        <h2 className="text-xl font-semibold text-gray-900 mb-4">Account Holder: Olivia Carter</h2>

        <div className="mb-8">
          <h3 className="text-lg font-semibold text-gray-900 mb-6">Family Members</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {members.map((member) => (
              <Link key={member.id} href={`/patient/profile?id=${member.id}`}>
                <div className="bg-gradient-to-b from-amber-100 to-amber-50 rounded-lg overflow-hidden hover:shadow-lg transition-shadow cursor-pointer h-full">
                  <div className="aspect-square overflow-hidden">
                    <img
                      src={member.image || "/placeholder.svg"}
                      alt={member.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="p-4 text-center">
                    <p className="font-semibold text-gray-900">{member.name}</p>
                    <p className="text-sm text-gray-600">{member.role}</p>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>

        <div className="flex justify-end pt-4 border-t border-gray-200">
          <Link href="/patient/add-member">
            <Button className="bg-blue-500 hover:bg-blue-600 text-white">Add Family Member</Button>
          </Link>
        </div>
      </Card>
    </div>
  )
}
