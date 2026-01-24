"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"

export default function ProfilePage() {
  const [isEditing] = useState(false)

  const profileData = {
    id: "002",
    name: "Pramudi Perera",
    address: "'Alakamanda',Kiulawatta, Bombuwela, Kalutara South",
    contact: "074 0235792",
    gender: "Female",
    birthday: "1994-05-15",
    image: "/pic3.png",
  }

  const otherProfiles = [
    {
      id: "003",
      name: "Numeth Perera",
      gender: "Male",
      birthday: "2010-02-10",
      image: "/pic1.png",
    },
    {
      id: "004",
      name: "Lalith Perera",
      gender: "Male",
      birthday: "1998-07-22",
      image: "/pic2.png",
    },
  ]

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

      {/* Other Profiles Section */}
      <div>
        <h2 className="text-3xl font-bold text-gray-900 mb-2">Other Profiles</h2>
        <p className="text-gray-600">Select family members' profiles under this account</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {otherProfiles.map((profile) => (
          <Card key={profile.id} className="p-6 bg-white hover:shadow-lg transition-shadow">
            <div className="text-center">
              <div className="bg-amber-100 rounded-lg overflow-hidden mb-4 h-40 flex items-center justify-center">
                <img 
                  src={profile.image || "/placeholder.svg"} 
                  alt={profile.name} 
                  className="w-full h-full object-cover" 
                />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-1">{profile.name}</h3>
              
              <div className="space-y-2 text-sm text-gray-600 mb-6">
                <div>
                  <p className="text-xs text-gray-500">Gender</p>
                  <p className="text-gray-900 font-medium">{profile.gender}</p>
                </div>
                <div>
                  <p className="text-xs text-gray-500">Date of Birth</p>
                  <p className="text-gray-900 font-medium">{profile.birthday}</p>
                </div>
              </div>

              <div className="flex flex-col gap-2">
                <Link href={`/patient/profile?id=${profile.id}`}>
                  <Button className="w-full bg-blue-500 hover:bg-blue-600 text-white">View Profile</Button>
                </Link>
                <Button className="w-full bg-gray-200 hover:bg-gray-300 text-gray-900">Edit</Button>
              </div>
            </div>
          </Card>
        ))}

        {/* Add New Profile Card */}
        <Card className="p-6 bg-white border-2 border-dashed border-gray-300 hover:border-blue-500 hover:shadow-lg transition-all flex items-center justify-center min-h-96">
          <div className="text-center">
            <div className="text-4xl text-gray-400 mb-3">+</div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Add New Profile</h3>
            <p className="text-sm text-gray-600 mb-4">Add a family member to your account</p>
            <Link href="/patient/add-member">
              <Button className="bg-blue-500 hover:bg-blue-600 text-white">Add Member</Button>
            </Link>
          </div>
        </Card>
      </div>
    </div>
  )
}
