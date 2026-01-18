"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"

export default function QueueTokenPage() {
  const [profileId, setProfileId] = useState("")
  const [patientInfo, setPatientInfo] = useState({
    name: "Sophia Clark",
    gender: "Female",
    age: 32,
  })
  const [booked, setBooked] = useState(false)

  const handleGetQueueToken = () => {
    if (profileId) {
      setBooked(true)
    }
  }

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-gray-900 mb-6">Queue Token</h1>
      </div>

      <Card className="p-8 bg-white">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Form Section */}
          <div className="space-y-8">
            <form className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-900 mb-3">Enter Profile ID</label>
                <input
                  type="text"
                  placeholder="Enter your profile ID"
                  value={profileId}
                  onChange={(e) => setProfileId(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none text-sm"
                />
              </div>
            </form>

            {/* Patient Info */}
            {patientInfo && (
              <div className="space-y-4">
                <div>
                  <p className="text-sm text-gray-600 mb-1">Name</p>
                  <p className="text-gray-900 font-medium">{patientInfo.name}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600 mb-1">Gender</p>
                  <p className="text-gray-900 font-medium">{patientInfo.gender}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600 mb-1">Age</p>
                  <p className="text-gray-900 font-medium">{patientInfo.age}</p>
                </div>
              </div>
            )}

            {/* Queue Information */}
            {booked && (
              <div className="space-y-4 pt-4 border-t border-gray-200">
                <div>
                  <p className="text-sm text-gray-600 mb-1">Current Queue Number:</p>
                  <p className="text-2xl font-bold text-gray-900">15</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600 mb-1">Next Available Queue Number:</p>
                  <p className="text-2xl font-bold text-gray-900">23</p>
                </div>
              </div>
            )}
          </div>

          {/* Profile Image */}
          <div className="flex items-center justify-center">
            <div className="bg-orange-300 rounded-lg overflow-hidden h-72 w-full">
              <img 
                src="/images/get-a-queue-token.png" 
                alt="Patient" 
                className="w-full h-full object-cover" 
              />
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="mt-8 pt-6 border-t border-gray-200 flex gap-4 justify-center">
          <Button 
            type="button"
            onClick={handleGetQueueToken} 
            className="bg-blue-500 hover:bg-blue-600 text-white px-8 py-2 text-sm font-medium"
          >
            Get Queue Token
          </Button>
          {booked && (
            <>
              <Button className="bg-blue-500 hover:bg-blue-600 text-white px-8 py-2 text-sm font-medium">
                Cancel Queue Token
              </Button>
              <Button className="bg-blue-500 hover:bg-blue-600 text-white px-8 py-2 text-sm font-medium">Back</Button>
            </>
          )}
        </div>
      </Card>
    </div>
  )
}
