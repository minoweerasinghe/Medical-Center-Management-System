"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table"
import { AlertTriangle } from "lucide-react"
import Link from "next/link"

const stats = [
  { label: "CONSULTATION REVENUE", value: "Rs. 2,000", color: "bg-emerald-50 text-emerald-700" },
  { label: "MEDICINE SALES", value: "Rs. 17,300", color: "bg-amber-50 text-amber-700" },
  { label: "TOTAL APPOINTMENTS", value: "10", color: "bg-gray-50 text-gray-700" },
  { label: "TOTAL COMBINED REVENUE", value: "Rs. 19,300", color: "bg-emerald-100 text-emerald-800 border-2 border-emerald-500" },
]

const patientQueue = [
  { token: "#021", name: "Pramudi Perera", arrivalTime: "09:15 AM", status: "WAITING" },
  { token: "#022", name: "Amal Weerasinghe", arrivalTime: "09:30 AM", status: "WAITING" },
  { token: "#023", name: "Emasha Peiris", arrivalTime: "09:45 AM", status: "ARRIVED" },
  { token: "#024", name: "Sandali Bandara", arrivalTime: "10:05 AM", status: "SCHEDULED" },
]

const inventoryAlerts = [
  { name: "Paracetamol 500mg", status: "LOW", count: "15 units left", color: "bg-red-100 text-red-700" },
  { name: "Amoxicillin 250mg", status: "WARNING", count: "45 units left", color: "bg-amber-100 text-amber-700" },
  { name: "Insulin Lantus", status: "EXPIRED", count: "5 vials", color: "bg-red-100 text-red-700" },
]

export default function DoctorDashboard() {
  const waitingCount = patientQueue.filter(p => p.status === "WAITING").length

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Doctor's Dashboard</h1>
        <p className="text-gray-500">Daily clinical operations and patient metrics overview.</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat) => (
          <Card key={stat.label} className={stat.color}>
            <CardContent className="p-4">
              <p className="text-xs font-medium uppercase tracking-wide opacity-80">{stat.label}</p>
              <p className="text-2xl font-bold mt-1">{stat.value}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Patient Queue - Takes 2 columns */}
        <Card className="lg:col-span-2">
          <CardHeader className="flex flex-row items-center justify-between pb-4">
            <CardTitle className="text-lg font-semibold">Today's Patient Queue</CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="text-xs font-medium text-gray-500 uppercase">Token</TableHead>
                  <TableHead className="text-xs font-medium text-gray-500 uppercase">Patient Name</TableHead>
                  <TableHead className="text-xs font-medium text-gray-500 uppercase">Check Profile</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {patientQueue.map((patient) => (
                  <TableRow key={patient.token}>
                    <TableCell className="font-medium">{patient.token}</TableCell>
                    <TableCell>{patient.name}</TableCell>
                    <TableCell>
                      <Button size="sm" className="bg-teal-500 hover:bg-teal-600 text-white">
                        VIEW
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
            <div className="mt-4 text-center">
              <Link href="/doctor/patients" className="text-blue-600 hover:text-blue-700 text-sm font-medium">
                View All Patients
              </Link>
            </div>
          </CardContent>
        </Card>

        {/* Right Sidebar */}
        <div className="space-y-6">
          

          {/* Inventory Alerts */}
          <Card className="border-red-200">
            <CardHeader className="pb-3">
              <CardTitle className="text-lg font-semibold flex items-center gap-2 text-red-600">
                <AlertTriangle className="h-5 w-5" />
                Inventory Alerts
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {inventoryAlerts.map((item, index) => (
                <div key={index} className="flex items-center justify-between">
                  <div>
                    <p className="font-medium text-gray-900">{item.name}</p>
                    <p className="text-sm text-red-500">{item.count}</p>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
