"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"

interface Appointment {
  id: string
  queueNumber: number
  doctorName: string
  specialty: string
  date: string
  time: string
  status: string
  image: string
}

export default function CancelAppointmentPage() {
  const [appointments, setAppointments] = useState<Appointment[]>([
    {
      id: "002",
      queueNumber: 23,
      doctorName: "Dr. Mahesh Joseph",
      specialty: "General Practitioner",
      date: "10:00 AM, Jan 22, 2025",
      time: "Patient: Sophie Brown",
      status: "Scheduled",
      image: "/queue-token.png",
    },
    {
      id: "002",
      queueNumber: 32,
      doctorName: "Dr. Clara Harper",
      specialty: "Dermatologist",
      date: "2:30 PM, Jan 05, 2025",
      time: "Patient: Sophie Brown",
      status: "Scheduled",
      image: "/queue-token.png",
    }
  ])

  const handleCancelAppointment = (id: string) => {
    setAppointments((prev) => prev.filter((apt) => apt.id !== id))
  }

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Cancel Appointment</h1>
      </div>

      {appointments.length > 0 ? (
        <div className="space-y-6">
          {appointments.map((appointment) => (
            <Card key={appointment.id} className="p-8 bg-white">
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-start">
                {/* Appointment Details */}
                <div className="lg:col-span-2 space-y-4">
                  <div>
                    <p className="text-sm text-gray-600 mb-1">Queue Token Number:</p>
                    <p className="text-lg font-semibold text-gray-900">{appointment.queueNumber}</p>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <p className="text-sm text-gray-600 mb-1">Doctor</p>
                      <p className="text-gray-900 font-medium">{appointment.doctorName}</p>
                      <p className="text-sm text-gray-600">{appointment.specialty}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600 mb-1">Appointment Date & Time</p>
                      <p className="text-gray-900 font-medium">{appointment.date}</p>
                      <p className="text-sm text-gray-600">{appointment.time}</p>
                    </div>
                  </div>

                  <div>
                    <p className="text-sm text-gray-600 mb-1">Status</p>
                    <p className="text-gray-900 font-medium">{appointment.status}</p>
                  </div>

                  <div className="flex gap-4 pt-4 border-t border-gray-200">
                    <Button 
                      onClick={() => handleCancelAppointment(appointment.id)}
                      className="bg-red-500 hover:bg-red-600 text-white px-6 py-2 text-sm"
                    >
                      Cancel Appointment
                    </Button>
                    {/* <Button 
                      className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-2 text-sm"
                    >
                      Get Queue Token
                    </Button> */}
                  </div>
                </div>

                {/* Doctor Image */}
                <div className="bg-teal-500 rounded-lg overflow-hidden h-48 lg:h-64">
                  <img 
                    src={appointment.image || "/placeholder.svg"} 
                    alt={appointment.doctorName} 
                    className="w-full h-full object-cover" 
                  />
                </div>
              </div>
            </Card>
          ))}
        </div>
      ) : (
        <Card className="p-8 bg-white text-center">
          <p className="text-gray-600 text-lg">No appointments scheduled</p>
        </Card>
      )}

      <div className="flex justify-end pt-4">
        <Button className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-2">Back</Button>
      </div>
    </div>
  )
}
