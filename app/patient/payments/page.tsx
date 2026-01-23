"use client"

import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"

interface Payment {
  patientName: string
  profileId: string
  doctorName: string
  date: string
  medicines: Array<{
    name: string
    quantity: number
    unitPrice: number
    subtotal: number
  }>
  consultationFee: number
  totalMedicinePrice: number
  totalBill: number
}

const payment: Payment = {
  patientName: "Pramudi Perera",
  profileId: "002",
  doctorName: "Dr. Mahesh Joseph",
  date: "2024-03-15",
  medicines: [
    { name: "Lyptus Syrup", quantity: 1, unitPrice: 1000, subtotal: 1000 },
    { name: "Paracetamol", quantity: 15, unitPrice: 15, subtotal: 225 },
  ],
  consultationFee: 200,
  totalMedicinePrice: 1225,
  totalBill: 1425,
}

export default function PaymentsPage() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-4xl font-bold text-gray-900 mb-2">Payments</h1>
      </div>

      <Card className="p-6 bg-white">
        <div className="grid grid-cols-2 gap-8 mb-8">
          <div>
            <p className="text-sm text-gray-600 mb-2">Patient Name</p>
            <p className="text-lg font-semibold text-gray-900">{payment.patientName}</p>

            <p className="text-sm text-gray-600 mb-2 mt-4">Doctor Name</p>
            <p className="text-lg font-semibold text-gray-900">{payment.doctorName}</p>
          </div>
          <div>
            <p className="text-sm text-gray-600 mb-2">Profile ID</p>
            <p className="text-lg font-semibold text-gray-900">{payment.profileId}</p>

            <p className="text-sm text-gray-600 mb-2 mt-4">Date</p>
            <p className="text-lg font-semibold text-gray-900">{payment.date}</p>
          </div>
        </div>

        <div className="border-t pt-6 mb-8">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Prescribed Medicines</h3>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b">
                  <th className="text-left py-3 px-4 font-semibold text-gray-900 text-sm">Medicine Name</th>
                  <th className="text-left py-3 px-4 font-semibold text-gray-900 text-sm">Quantity</th>
                  <th className="text-left py-3 px-4 font-semibold text-gray-900 text-sm">Unit Price</th>
                  <th className="text-left py-3 px-4 font-semibold text-gray-900 text-sm">Subtotal</th>
                </tr>
              </thead>
              <tbody>
                {payment.medicines.map((med, idx) => (
                  <tr key={idx} className="border-b">
                    <td className="py-3 px-4 text-gray-700">{med.name}</td>
                    <td className="py-3 px-4 text-gray-700">{med.quantity}</td>
                    <td className="py-3 px-4 text-blue-600">Rs. {med.unitPrice}</td>
                    <td className="py-3 px-4 text-blue-600">Rs. {med.subtotal}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div className="space-y-4 mb-8 p-4 bg-gray-50 rounded-lg">
          <div className="flex justify-between items-center">
            <span className="text-gray-600 font-medium">Doctor Consultation Fee</span>
            <span className="text-gray-900 font-semibold">Rs. {payment.consultationFee}.00</span>
          </div>

          <div className="border-t pt-4">
            <div className="flex justify-between items-center mb-2">
              <span className="text-gray-600 font-medium">Total Medicine Price</span>
              <span className="text-gray-900 font-semibold">Rs. {payment.totalMedicinePrice}.00</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-900 font-bold">Total Bill</span>
              <span className="text-gray-900 font-bold text-lg">Rs. {payment.totalBill}.00</span>
            </div>
          </div>
        </div>
      </Card>
    </div>
  )
}
