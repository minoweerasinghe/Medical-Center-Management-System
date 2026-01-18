"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

export default function QueueTokenPage() {
  const [selectedProfile, setSelectedProfile] = useState("")
  const [specialty, setSpecialty] = useState("")
  const [booked, setBooked] = useState(false)

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-4xl font-bold text-gray-900 mb-2">Queue Token</h1>
        <p className="text-gray-600">Book your appointment and get your queue number</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Form Section */}
        <div className="lg:col-span-2">
          <Card className="p-6 bg-white">
            <form className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-900 mb-2">Enter Profile ID</label>
                <input
                  type="text"
                  placeholder="Enter profile ID"
                  value={selectedProfile}
                  onChange={(e) => setSelectedProfile(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-900 mb-2">Select Specialty</label>
                <Select value={specialty} onValueChange={setSpecialty}>
                  <SelectTrigger className="border-gray-300">
                    <SelectValue placeholder="Select specialty" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="general">General Practitioner</SelectItem>
                    <SelectItem value="cardio">Cardiology</SelectItem>
                    <SelectItem value="neuro">Neurology</SelectItem>
                    <SelectItem value="ortho">Orthopedics</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <Button onClick={() => setBooked(true)} className="w-full bg-blue-500 hover:bg-blue-600 text-white py-2">
                Get Queue Token
              </Button>
            </form>
          </Card>
        </div>

        {/* Profile Preview */}
        <div className="bg-amber-100 rounded-lg overflow-hidden h-64">
          <img src="/patient-photo.jpg" alt="Patient" className="w-full h-full object-cover" />
        </div>
      </div>

      {/* Queue Information */}
      {booked && (
        <Card className="p-6 bg-white border-2 border-blue-200">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Queue Information</h2>

          <div className="space-y-4 mb-6">
            <div className="flex justify-between items-center p-4 bg-gray-50 rounded-lg">
              <span className="text-gray-600 font-medium">Current Queue Number:</span>
              <span className="text-3xl font-bold text-blue-600">15</span>
            </div>
            <div className="flex justify-between items-center p-4 bg-gray-50 rounded-lg">
              <span className="text-gray-600 font-medium">Next Available Queue Number:</span>
              <span className="text-3xl font-bold text-green-600">23</span>
            </div>
          </div>

          <div className="flex gap-4">
            <Button className="flex-1 bg-blue-500 hover:bg-blue-600 text-white">Cancel Queue Token</Button>
            <Button className="flex-1 bg-gray-300 hover:bg-gray-400 text-gray-900">Back</Button>
          </div>
        </Card>
      )}
    </div>
  )
}
