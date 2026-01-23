"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { RefreshCw, Clock, Info } from "lucide-react"
import { usePatient } from "../patient-context"

export default function QueueTokenPage() {
  const { selectedMember } = usePatient()
  const [isRefreshing, setIsRefreshing] = useState(false)

  const tokenData = {
    queueNumber: 23,
    doctor: {
      name: "Dr. Mahesh Joseph",
      specialty: "General Practitioner",
    },
    appointmentDateTime: "10:00 AM, Jan 22, 2025",
    status: "Scheduled",
    patient: {
      name: selectedMember?.name || "Pramudi Perera",
      role: "Patient Profile",
      image: selectedMember?.image || "/placeholder.svg?height=200&width=200",
    },
  }

  const liveQueueStatus = {
    currentTokenBeingServed: 15,
  }

  const handleRefresh = () => {
    setIsRefreshing(true)
    setTimeout(() => setIsRefreshing(false), 1000)
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Queue Token Status</h1>
        <p className="text-gray-600">Monitor your position and estimated waiting time in real-time.</p>
      </div>

      {/* Token Info Card */}
      <Card className="p-6 bg-blue-50/50 border-blue-100">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Left Side - Token Info */}
          <div className="space-y-6">
            <div>
              <p className="text-xs font-semibold text-blue-600 uppercase tracking-wider mb-2">
                Your Queue Token Number:
              </p>
              <p className="text-7xl font-bold text-gray-900">{tokenData.queueNumber}</p>
            </div>

            <div>
              <p className="text-xs text-gray-500 mb-1">Doctor</p>
              <p className="text-lg font-bold text-gray-900">{tokenData.doctor.name}</p>
              <p className="text-sm text-gray-600">{tokenData.doctor.specialty}</p>
            </div>

            <div>
              <p className="text-xs text-gray-500 mb-1">Appointment Date & Time</p>
              <p className="text-base font-semibold text-gray-900">{tokenData.appointmentDateTime}</p>
            </div>

            <div>
              <p className="text-xs text-gray-500 mb-1">Status</p>
              <Badge className="bg-emerald-100 text-emerald-700 hover:bg-emerald-100">{tokenData.status}</Badge>
            </div>
          </div>

          {/* Right Side - Patient Image */}
          <div className="flex flex-col items-center justify-center">
            <div className="w-48 h-48 rounded-lg overflow-hidden bg-amber-100 mb-3">
              <img
                src={tokenData.patient.image || "/placeholder.svg"}
                alt={tokenData.patient.name}
                className="w-full h-full object-cover"
              />
            </div>
            <p className="text-base font-semibold text-gray-900">{tokenData.patient.name}</p>
            <p className="text-sm text-blue-600">{tokenData.patient.role}</p>
          </div>
        </div>
      </Card>

      {/* Live Queue Status */}
      <Card className="p-6 bg-white">
        <h2 className="text-lg font-bold text-gray-900 mb-6">Live Queue Status</h2>
        
        <div className="grid grid-cols-3 gap-6 mb-6">
          <div>
            <p className="text-xs font-semibold text-blue-600 uppercase tracking-wider mb-3">
              Current Token Being Served
            </p>
            <div className="flex items-center gap-3">
              <span className="inline-flex items-center justify-center w-10 h-10 rounded-lg bg-blue-100 text-blue-700 font-bold text-lg">
                {liveQueueStatus.currentTokenBeingServed}
              </span>
            </div>
          </div>
        </div>

        <div className="flex justify-center">
          <Button
            onClick={handleRefresh}
            disabled={isRefreshing}
            className="bg-blue-500 hover:bg-blue-600 text-white px-8"
          >
            <RefreshCw className={`h-4 w-4 mr-2 ${isRefreshing ? "animate-spin" : ""}`} />
            Refresh Status
          </Button>
        </div>
      </Card>

      {/* Queue Information Notice */}
      <Card className="p-4 bg-blue-50 border-blue-200">
        <div className="flex gap-3">
          <Info className="h-5 w-5 text-blue-600 flex-shrink-0 mt-0.5" />
          <div>
            <p className="font-semibold text-gray-900">Queue Information</p>
            <p className="text-sm text-gray-600">
              Please arrive at least 15 minutes before your estimated time. If you miss your turn, you will take your turn after 5 patients.
            </p>
          </div>
        </div>
      </Card>
    </div>
  )
}
