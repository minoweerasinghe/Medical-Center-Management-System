"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { usePatient } from "../patient-context"

export default function DashboardPage() {
  const { selectedMember } = usePatient()

  const queueStatus = {
    tokenNumber: 23,
    estimatedWait: "~ 15 mins",
    currentlyServing: 19,
  }

  const balance = {
    amount: "Rs. 1,425.00",
    lastBilling: "March 15, 2024",
  }

  const appointment = {
    queueTokenNumber: 23,
    dateTime: "10:00 AM, Jan 22, 2025",
    patientName: selectedMember?.name || "Olivia Bennett",
    doctor: {
      name: "Dr. Sophie Brown",
      specialty: "General Practitioner",
      image: "/queue-token.png",
    },
    status: "Scheduled",
  }

  const prescriptions = [
    {
      medication: "Paracetamol",
      dosage: "500mg",
      quantity: "15 tablets",
      frequency: "Twice a day, Two pills",
    },
    {
      medication: "Lithus Syrup",
      dosage: "100ml",
      quantity: "1 bottle",
      frequency: "Once a day, 5 ml",
    },
  ]

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
        <p className="text-gray-600">
          Welcome back, {selectedMember?.name?.split(" ")[0] || "Olivia"}. Here is your health overview for today.
        </p>
      </div>

      {/* Queue Status and Outstanding Balance */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Queue Status Card */}
        <Card className="p-6 bg-blue-50/50 border-blue-100">
          <p className="text-xs font-semibold text-blue-600 uppercase tracking-wider mb-2">Queue Status</p>
          <div className="flex items-end justify-between">
            <div>
              <p className="text-xs text-gray-500 mb-1">Your Token Number</p>
              <p className="text-5xl font-bold text-gray-900">{queueStatus.tokenNumber}</p>
            </div>
          </div>
          <p className="text-sm text-gray-600 mt-3">Currently serving: {queueStatus.currentlyServing}</p>
        </Card>

        {/* Outstanding Balance Card */}
        <Card className="p-6 bg-white">
          <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">Outstanding Balance</p>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-3xl font-bold text-gray-900">{balance.amount}</p>
              <p className="text-sm text-gray-500">Last billing: {balance.lastBilling}</p>
            </div>
            <Link href="/patient/payments">
              <Button className="bg-emerald-500 hover:bg-emerald-600 text-white px-6">View Payments</Button>
            </Link>
          </div>
        </Card>
      </div>

      {/* Upcoming Appointment */}
      <Card className="p-6 bg-white">
        <h2 className="text-lg font-bold text-gray-900 mb-6">Upcoming Appointment</h2>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-4">
            <div className="grid grid-cols-2 gap-6">
              <div>
                <p className="text-xs text-gray-500 mb-1">Queue Token Number:</p>
                <p className="text-2xl font-bold text-gray-900">{appointment.queueTokenNumber}</p>
              </div>
              <div>
                <p className="text-xs text-gray-500 mb-1">Appointment Date & Time</p>
                <p className="text-base font-semibold text-gray-900">{appointment.dateTime}</p>
                <p className="text-sm text-gray-600">Patient: {appointment.patientName}</p>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-6 pt-4">
              <div>
                <p className="text-xs text-gray-500 mb-1">Doctor</p>
                <p className="text-base font-bold text-gray-900">{appointment.doctor.name}</p>
                <p className="text-sm text-gray-600">{appointment.doctor.specialty}</p>
              </div>
              <div>
                <p className="text-xs text-gray-500 mb-1">Status</p>
                <Badge className="bg-emerald-100 text-emerald-700 hover:bg-emerald-100">{appointment.status}</Badge>
              </div>
            </div>
            <div className="pt-4">
              <Link href="/patient/cancel-appointment">
                <Button variant="destructive" className="bg-red-500 hover:bg-red-600">
                  Cancel Appointment
                </Button>
              </Link>
            </div>
          </div>
          <div className="flex justify-center lg:justify-end">
            <div className="w-48 h-48 rounded-lg overflow-hidden bg-teal-50">
              <img
                src={appointment.doctor.image || "/placeholder.svg"}
                alt={appointment.doctor.name}
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>
      </Card>

      {/* Recent Prescription */}
      <Card className="p-6 bg-white">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-bold text-gray-900">Recent Prescription</h2>
          <Link href="/patient/prescriptions" className="text-sm text-blue-600 hover:text-blue-700">
            View All
          </Link>
        </div>
        <Table>
          <TableHeader>
            <TableRow className="border-b border-gray-200">
              <TableHead className="text-xs font-semibold text-gray-500 uppercase">Medication</TableHead>
              <TableHead className="text-xs font-semibold text-gray-500 uppercase">Dosage</TableHead>
              <TableHead className="text-xs font-semibold text-gray-500 uppercase">Quantity</TableHead>
              <TableHead className="text-xs font-semibold text-gray-500 uppercase">Frequency</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {prescriptions.map((prescription, index) => (
              <TableRow key={index} className="border-b border-gray-100">
                <TableCell className="font-medium text-gray-900">{prescription.medication}</TableCell>
                <TableCell className="text-gray-600">{prescription.dosage}</TableCell>
                <TableCell className="text-gray-600">{prescription.quantity}</TableCell>
                <TableCell className="text-gray-600">{prescription.frequency}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        <div className="flex items-center justify-between mt-4 pt-4 border-t border-gray-200 text-sm text-gray-500">
          <p>Prescribed by: Dr. Mahesh Joseph</p>
          <p>Date: Jun 15, 2024</p>
        </div>
      </Card>
    </div>
  )
}
