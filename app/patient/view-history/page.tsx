"use client"

import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"

interface Visit {
  date: string
  doctor: string
  specialty: string
  diagnosis: string
  prescription: string
  amountPaid: number
}

const visits: Visit[] = [
  {
    date: "March 15, 2023",
    doctor: "Dr. Mahesh Joseph",
    specialty: "General Practitioner",
    diagnosis: "Flu",
    prescription: "View Prescription",
    amountPaid: 500,
  },
  {
    date: "November 20, 2022",
    doctor: "Dr. Mahesh Joseph",
    specialty: "General Practitioner",
    diagnosis: "Fever",
    prescription: "View Prescription",
    amountPaid: 1850,
  },
  {
    date: "May 8, 2022",
    doctor: "Dr. Amasha Joseph",
    specialty: "Orthopedic",
    diagnosis: "Allergies",
    prescription: "View Prescription",
    amountPaid: 3175,
  },
]

export default function ViewHistoryPage() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-4xl font-bold text-gray-900 mb-2">Visit History</h1>
        <p className="text-gray-600">Review your past medical visits and related information</p>
      </div>

      {visits.map((visit, idx) => (
        <Card key={idx} className="p-6 bg-white">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-4">
            <div>
              <p className="text-sm text-gray-600 mb-1">Date</p>
              <p className="text-lg font-semibold text-gray-900">{visit.date}</p>
            </div>
            <div>
              <p className="text-sm text-gray-600 mb-1">Doctor</p>
              <p className="text-lg font-semibold text-gray-900">{visit.doctor}</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-4">
            <div>
              <p className="text-sm text-gray-600 mb-1">Specialty</p>
              <p className="text-gray-700">{visit.specialty}</p>
            </div>
            <div>
              <p className="text-sm text-gray-600 mb-1">Diagnosis</p>
              <p className="text-gray-700">{visit.diagnosis}</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4 border-t">
            <div>
              <p className="text-sm text-gray-600 mb-1">Prescription</p>
              <button className="text-blue-500 hover:text-blue-600 font-medium text-sm">{visit.prescription}</button>
            </div>
            <div>
              <p className="text-sm text-gray-600 mb-1">Amount Paid</p>
              <p className="text-gray-700 font-medium">Rs. {visit.amountPaid}</p>
            </div>
          </div>
        </Card>
      ))}
    </div>
  )
}
