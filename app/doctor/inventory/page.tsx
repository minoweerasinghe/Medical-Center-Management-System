"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
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
import { Search } from "lucide-react"
import { useSearchParams } from "next/navigation"


const summaryStats = [
  { label: "Total Medicines in Stock", value: "1200" },
  { label: "Expiring Soon", value: "50" },
  { label: "Expired Items", value: "10" },
  { label: "Total Stock Value", value: "Rs.. 50,000" },
]

const inventoryData = [
  { invId: "INV001", medId: "MED001", name: "Paracetamol", stock: 500, price: "Rs.5", expiry: "2024-12-31", location: "A1-01" },
  { invId: "INV002", medId: "MED002", name: "Ibuprofen", stock: 300, price: "Rs.8", expiry: "2025-06-15", location: "A1-02" },
  { invId: "INV003", medId: "MED003", name: "Amoxicillin", stock: 200, price: "Rs.12", expiry: "2024-10-20", location: "A2-01" },
  { invId: "INV004", medId: "MED004", name: "Ciprofloxacin", stock: 150, price: "Rs.15", expiry: "2025-03-10", location: "A2-02" },
  { invId: "INV005", medId: "MED005", name: "Omeprazole", stock: 100, price: "Rs.20", expiry: "2024-09-05", location: "B1-01" },
  { invId: "INV006", medId: "MED006", name: "Metformin", stock: 250, price: "Rs.7", expiry: "2025-01-25", location: "B1-02" },
  { invId: "INV007", medId: "MED007", name: "Atorvastatin", stock: 180, price: "Rs.18", expiry: "2024-11-12", location: "B2-01" },
  { invId: "INV008", medId: "MED008", name: "Levothyroxine", stock: 120, price: "Rs.22", expiry: "2025-05-01", location: "B2-03" },
  { invId: "INV009", medId: "MED009", name: "Losartan", stock: 90, price: "Rs.25", expiry: "2024-08-18", location: "C1-01" },
  { invId: "INV010", medId: "MED010", name: "Amlodipine", stock: 210, price: "Rs.10", expiry: "2025-02-08", location: "C1-02" },
]

export default function DoctorInventory() {
  const [searchTerm, setSearchTerm] = useState("")
  const [expiryStatus, setExpiryStatus] = useState("")
  const [sortBy, setSortBy] = useState("")
  const [reportMonth, setReportMonth] = useState("")
  const [currentPage, setCurrentPage] = useState(1)
  const itemsPerPage = 10
  const totalPages = Math.ceil(inventoryData.length / itemsPerPage)
  const searchParams = useSearchParams()

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Medicine Inventory Management</h1>
        <p className="text-gray-500">Review, monitor, and export reports of all medicines in stock</p>
      </div>

      {/* Filter Controls */}
      <Card>
        <CardContent className="p-6 space-y-4">
          <h3 className="font-semibold">Filter Controls</h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Select value={expiryStatus} onValueChange={setExpiryStatus}>
              <SelectTrigger>
                <SelectValue placeholder="Expiry Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All</SelectItem>
                <SelectItem value="valid">Valid</SelectItem>
                <SelectItem value="expiring">Expiring Soon</SelectItem>
                <SelectItem value="expired">Expired</SelectItem>
              </SelectContent>
            </Select>

            <Select value={sortBy} onValueChange={setSortBy}>
              <SelectTrigger>
                <SelectValue placeholder="Sort By" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="name">Name</SelectItem>
                <SelectItem value="stock">Stock Level</SelectItem>
                <SelectItem value="expiry">Expiry Date</SelectItem>
                <SelectItem value="price">Price</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            <Input
              placeholder="Search for medicines"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>

          <Select value={reportMonth} onValueChange={setReportMonth}>
            <SelectTrigger>
              <SelectValue placeholder="Report Month" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="january">January</SelectItem>
              <SelectItem value="february">February</SelectItem>
              <SelectItem value="march">March</SelectItem>
              <SelectItem value="april">April</SelectItem>
            </SelectContent>
          </Select>

          <div className="flex justify-end gap-3">
            <Button variant="outline" className="bg-transparent">Generate Report</Button>
            <Button className="bg-teal-500 hover:bg-teal-600 text-white">Download PDF Report</Button>
          </div>
        </CardContent>
      </Card>

      {/* Summary Cards */}
      <div>
        <h3 className="font-semibold mb-4">Summary</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {summaryStats.map((stat) => (
            <Card key={stat.label}>
              <CardContent className="p-4">
                <p className="text-xs text-gray-500">{stat.label}</p>
                <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Inventory Data Table */}
      <div>
        <h3 className="font-semibold mb-4">Inventory Data</h3>
        <Card>
          <CardContent className="p-0">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="text-xs">Inventory ID</TableHead>
                  <TableHead className="text-xs">Medicine ID</TableHead>
                  <TableHead className="text-xs">Medicine Name</TableHead>
                  <TableHead className="text-xs">Stock Balance</TableHead>
                  <TableHead className="text-xs">Unit Price</TableHead>
                  <TableHead className="text-xs">Expiry Date</TableHead>
                  <TableHead className="text-xs">Storage Location</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {inventoryData.map((item) => (
                  <TableRow key={item.invId}>
                    <TableCell className="text-gray-500">{item.invId}</TableCell>
                    <TableCell className="text-gray-500">{item.medId}</TableCell>
                    <TableCell>{item.name}</TableCell>
                    <TableCell>{item.stock}</TableCell>
                    <TableCell>{item.price}</TableCell>
                    <TableCell className="text-gray-500">{item.expiry}</TableCell>
                    <TableCell>{item.location}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>

        {/* Pagination */}
        <div className="flex items-center justify-center gap-2 mt-4">
          <Button 
            variant="outline" 
            size="sm" 
            className="bg-transparent"
            onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
            disabled={currentPage === 1}
          >
            {"<"}
          </Button>
          {[1, 2, 3].map((page) => (
            <Button
              key={page}
              variant={currentPage === page ? "default" : "outline"}
              size="sm"
              className={currentPage === page ? "bg-blue-500 text-white" : "bg-transparent"}
              onClick={() => setCurrentPage(page)}
            >
              {page}
            </Button>
          ))}
          <span className="text-gray-500">...</span>
          <Button variant="outline" size="sm" className="bg-transparent">10</Button>
          <Button 
            variant="outline" 
            size="sm" 
            className="bg-transparent"
            onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
            disabled={currentPage === totalPages}
          >
            {">"}
          </Button>
        </div>
      </div>
    </div>
  )
}

export function Loading() {
  return null
}
