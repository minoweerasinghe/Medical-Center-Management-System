"use client"

import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"

interface Prescription {
  id: string
  doctorName: string
  specialty: string
  contact: string
  date: string
  diagnosis: string
  medicines: Array<{
    name: string
    dosage: string
    quantity: string
    frequency: string
  }>
}

const prescriptions: Prescription[] = [
  {
    id: "1",
    doctorName: "Dr. Mahesh Joseph",
    specialty: "General Practitioner",
    contact: "071 7894502",
    date: "Jun 15, 2024",
    diagnosis: "Common Cold",
    medicines: [
      { name: "Paracetamol", dosage: "500mg", quantity: "15 tablets", frequency: "Twice a day, Two pills" },
      { name: "Lithus Syrup", dosage: "100ml", quantity: "1 bottle", frequency: "Once a day, 5 ml" },
    ],
  },
]

export default function PrescriptionsPage() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-4xl font-bold text-gray-900 mb-2">Prescriptions</h1>
      </div>

      {prescriptions.map((rx) => (
        <Card key={rx.id} className="p-6 bg-white">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-4">{rx.doctorName}</h3>
              <div className="space-y-2 text-sm text-gray-600">
                <p>Specialty: {rx.specialty}</p>
                <p>Contact: {rx.contact}</p>
                <p>Date: {rx.date}</p>
              </div>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Diagnosis</h3>
              <p className="text-gray-600">{rx.diagnosis}</p>
            </div>
          </div>

          <div className="mb-8 border-t pt-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Prescription</h3>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b">
                    <th className="text-left py-3 px-4 font-semibold text-gray-900 text-sm">Medication</th>
                    <th className="text-left py-3 px-4 font-semibold text-gray-900 text-sm">Dosage</th>
                    <th className="text-left py-3 px-4 font-semibold text-gray-900 text-sm">Quantity</th>
                    <th className="text-left py-3 px-4 font-semibold text-gray-900 text-sm">Frequency</th>
                  </tr>
                </thead>
                <tbody>
                  {rx.medicines.map((med, idx) => (
                    <tr key={idx} className="border-b">
                      <td className="py-3 px-4 text-gray-700">{med.name}</td>
                      <td className="py-3 px-4 text-gray-700">{med.dosage}</td>
                      <td className="py-3 px-4 text-gray-700">{med.quantity}</td>
                      <td className="py-3 px-4 text-gray-600 text-sm">{med.frequency}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </Card>
      ))}
    </div>
  )
}
