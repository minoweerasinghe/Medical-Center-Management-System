"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"

export default function ProfilePage() {
  const [isEditing] = useState(false)

  const profileData = {
    id: "002",
    name: "Olivia Bennett",
    address: "'Alakamanda',Kiulawatta, Bombuwela, Kalutara South",
    contact: "077 123 4567",
    gender: "Female",
    birthday: "1994-05-15",
    image: "/pic3.png",
  }

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-4xl font-bold text-gray-900 mb-2">My Profile</h1>
        <p className="text-gray-600">View and manage your personal and medical information</p>
      </div>

      <Card className="p-8 bg-white">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          <div className="md:col-span-1">
            <div className="bg-amber-100 rounded-lg overflow-hidden mb-4">
              <img src={profileData.image || "/placeholder.svg"} alt="Patient" className="w-full h-auto object-cover" />
            </div>
            <div className="text-center">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Patient Profile</h3>
              <p className="text-sm text-gray-600 mb-4">Manage your personal and medical information</p>
              <Link href="/patient/profile-settings">
                <Button className="w-full bg-blue-500 hover:bg-blue-600 text-white">Edit Profile</Button>
              </Link>
            </div>
          </div>

          <div className="md:col-span-2">
            <h3 className="text-lg font-semibold text-gray-900 mb-6">Personal Details</h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
              <div>
                <p className="text-sm text-gray-600 mb-2">Profile ID</p>
                <p className="text-gray-900 font-semibold">{profileData.id}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600 mb-2">Full Name</p>
                <p className="text-gray-900 font-semibold">{profileData.name}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600 mb-2">Address</p>
                <p className="text-gray-900">{profileData.address}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600 mb-2">Contact Number</p>
                <p className="text-gray-900">{profileData.contact}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600 mb-2">Gender</p>
                <p className="text-gray-900">{profileData.gender}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600 mb-2">Birthday</p>
                <p className="text-gray-900">{profileData.birthday}</p>
              </div>
            </div>

            <div className="border-t pt-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Other Medical Notes</h3>
              <div className="bg-gray-50 rounded-lg p-4 h-32 border border-gray-200"></div>
            </div>
          </div>
        </div>

        <div className="border-t pt-6 flex flex-col md:flex-row gap-4 justify-end">
          <Link href="/patient/profile-transfer">
            <Button className="bg-blue-400 hover:bg-blue-500 text-white">Transfer Profile</Button>
          </Link>
          <Button className="bg-gray-400 hover:bg-gray-500 text-white">Delete Profile</Button>
          <Button className="bg-blue-500 hover:bg-blue-600 text-white">Save Changes</Button>
        </div>
      </Card>
    </div>
  )
}
