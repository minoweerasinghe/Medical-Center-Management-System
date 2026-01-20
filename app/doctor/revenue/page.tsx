"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table"
import { FileText, RefreshCw } from "lucide-react"

const stats = [
  { label: "Consultation Revenue", value: "Rs. 2000", color: "bg-emerald-50" },
  { label: "Medicine Sales Revenue", value: "Rs. 17,300", color: "bg-amber-50" },
  { label: "Total Appointments", value: "10", color: "bg-blue-50" },
  { label: "Total Combined Revenue", value: "Rs. 19,300", color: "bg-gray-50" },
]

const months = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December"
]

const years = ["2024", "2023", "2022", "2021"]

const transactions = [
  { date: "2024-10-07", patient: "Owen Turner", consultation: 500, medicine: 200, total: 700 },
  { date: "2024-10-14", patient: "Sophia Reed", consultation: 500, medicine: 300, total: 800 },
  { date: "2024-10-21", patient: "Ethan Foster", consultation: 500, medicine: 150, total: 650 },
  { date: "2024-10-28", patient: "Ava Mitchell", consultation: 500, medicine: 250, total: 750 },
]

export default function DoctorRevenue() {
  const [selectedMonth, setSelectedMonth] = useState("")
  const [selectedYear, setSelectedYear] = useState("")
  const [showReport, setShowReport] = useState(true)

  const totalConsultation = transactions.reduce((sum, t) => sum + t.consultation, 0)
  const totalMedicine = transactions.reduce((sum, t) => sum + t.medicine, 0)
  const grandTotal = transactions.reduce((sum, t) => sum + t.total, 0)

  return (
    <div className="space-y-6">
      {/* Page Header - Revenue Overview */}
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Doctor Revenue & Medicine Sales</h1>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat) => (
          <Card key={stat.label} className={stat.color}>
            <CardContent className="p-4">
              <p className="text-xs text-gray-500">{stat.label}</p>
              <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Revenue Summary Card */}
      <Card className="bg-gradient-to-br from-teal-50 to-emerald-50">
        <CardContent className="p-6">
          <p className="text-sm text-gray-600">Revenue Summary</p>
          <p className="text-3xl font-bold text-gray-900">Rs. 19,300</p>
          <p className="text-sm text-teal-600">Today</p>
          <div className="h-32 mt-4 bg-white/50 rounded-lg">
            {/* Chart placeholder */}
          </div>
        </CardContent>
      </Card>

      <Button className="bg-teal-500 hover:bg-teal-600 text-white">
        Download Monthly Report PDF
      </Button>

      {/* Monthly Revenue Report Section */}
      <Card>
        <CardHeader>
          <CardTitle>Monthly Revenue Report</CardTitle>
          <p className="text-sm text-gray-500">Review and download detailed revenue reports for each doctor.</p>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Filters */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-md">
            <div className="space-y-2">
              <Label>Month</Label>
              <Select value={selectedMonth} onValueChange={setSelectedMonth}>
                <SelectTrigger>
                  <SelectValue placeholder="Select month" />
                </SelectTrigger>
                <SelectContent>
                  {months.map((month) => (
                    <SelectItem key={month} value={month.toLowerCase()}>{month}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label>Year</Label>
              <Select value={selectedYear} onValueChange={setSelectedYear}>
                <SelectTrigger>
                  <SelectValue placeholder="Select year" />
                </SelectTrigger>
                <SelectContent>
                  {years.map((year) => (
                    <SelectItem key={year} value={year}>{year}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="flex gap-3">
            <Button onClick={() => setShowReport(true)} className="bg-teal-500 hover:bg-teal-600 text-white">
              Generate Report
            </Button>
            <Button variant="outline" className="bg-transparent">
              Download PDF Report
            </Button>
          </div>

          {showReport && (
            <>
              {/* Summary */}
              <div>
                <h3 className="text-lg font-semibold mb-4">Summary</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <Card>
                    <CardContent className="p-4">
                      <p className="text-sm text-gray-500">Consultation Revenue</p>
                      <p className="text-xl font-bold">Rs. 12,500</p>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardContent className="p-4">
                      <p className="text-sm text-gray-500">Medicine Sales Revenue</p>
                      <p className="text-xl font-bold">Rs. 8,200</p>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardContent className="p-4">
                      <p className="text-sm text-gray-500">Total Combined Revenue</p>
                      <p className="text-xl font-bold">Rs. 20,700</p>
                    </CardContent>
                  </Card>
                </div>
              </div>

              {/* Detailed Transactions */}
              <div>
                <h3 className="text-lg font-semibold mb-4">Detailed Transactions</h3>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Date</TableHead>
                      <TableHead>Patient Name</TableHead>
                      <TableHead>Consultation Fee (Rs.)</TableHead>
                      <TableHead>Medicine Sales Value (Rs.)</TableHead>
                      <TableHead>Total per Visit (Rs.)</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {transactions.map((transaction, index) => (
                      <TableRow key={index}>
                        <TableCell className="text-gray-500">{transaction.date}</TableCell>
                        <TableCell>{transaction.patient}</TableCell>
                        <TableCell>{transaction.consultation}</TableCell>
                        <TableCell>{transaction.medicine}</TableCell>
                        <TableCell>{transaction.total}</TableCell>
                      </TableRow>
                    ))}
                    <TableRow className="bg-gray-50 font-medium">
                      <TableCell className="text-blue-600">Total</TableCell>
                      <TableCell></TableCell>
                      <TableCell>{totalConsultation}</TableCell>
                      <TableCell>{totalMedicine}</TableCell>
                      <TableCell>{grandTotal}</TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </div>
            </>
          )}

          {!showReport && (
            <div className="text-center py-12">
              <div className="inline-flex items-center justify-center w-24 h-24 bg-teal-50 rounded-lg mb-4">
                <FileText className="h-12 w-12 text-teal-500" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">No Data Available</h3>
              <p className="text-gray-500 mb-4">
                There is no data available for the selected doctor and time range. Please adjust your filters or check back later.
              </p>
              <Button variant="outline" className="bg-transparent">
                <RefreshCw className="h-4 w-4 mr-2" />
                Refresh
              </Button>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
