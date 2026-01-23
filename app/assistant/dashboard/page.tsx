"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { UserPlus, Printer, Package, AlertTriangle, Moon, ListOrderedIcon } from "lucide-react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

// Mock data
const recentRegistrations = [
  { id: 1, name: "Pramudi Perera", profileId: "002"},
  { id: 2, name: "Amal Weerasinghe", profileId: "019"},
  { id: 3, name: "Emasha Peiris", profileId: "080"},
  { id: 4, name: "Sandali Bandara", profileId: "011"},
]

const lowStockAlerts = [
  { id: 1, name: "Paracetamol", quantity: 12, unit: "packs", color: "bg-red-50 border-red-100" },
  { id: 2, name: "Amoxicillin", quantity: 5, unit: "packs", color: "bg-red-50 border-red-100" },
  { id: 3, name: "Cough Syrup", quantity: 20, unit: "bottles", color: "bg-orange-50 border-orange-100" },
  { id: 4, name: "Saline Bag", quantity: 15, unit: "units", color: "bg-pink-50 border-pink-100" },
]

const queueSummary = {
  currentToken: 16,
  waiting: 8,
  avgTime: "12m",
}

export default function AssistantDashboardPage() {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex flex-wrap gap-4">
        <Link href="/assistant">
          <Button className="bg-blue-500 hover:bg-blue-600 text-white gap-2">
            <UserPlus className="h-4 w-4" />
            New Registration
          </Button>
        </Link>
        <Link href="/assistant/queue">
          <Button className="bg-blue-500 hover:bg-blue-600 text-white gap-2">
            <ListOrderedIcon className="h-4 w-4" />
            Queue Token Updates
          </Button>
        </Link>
        <Link href="/assistant/inventory">
          <Button variant="outline" className="gap-2 bg-transparent">
            <Package className="h-4 w-4" />
            Check Stock
          </Button>
        </Link>
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-15">
        {/* Queue Status */}
        <Card>
          <CardHeader className="pb-2">
            <div className="flex items-center gap-2">
              <CardTitle className="text-lg font-semibold">Queue Status</CardTitle>
            </div>
          </CardHeader>
          <CardContent className="pt-2">
            <div className="text-center">
              <p className="text-xs font-medium text-blue-600 tracking-wide mb-2">CURRENT SERVING TOKEN</p>
              <p className="text-6xl font-bold text-blue-500 mb-8">{queueSummary.currentToken}</p>
              <div className="flex justify-center gap-8">
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Recent Registrations */}
        <Card>
          <CardHeader className="pb-2">
            <div className="flex items-center justify-between">
              <CardTitle className="text-lg font-semibold">Recent Registrations</CardTitle>
              <Link href="/assistant/patients" className="text-sm text-blue-500 hover:text-blue-600">
                View All
              </Link>
            </div>
          </CardHeader>
          <CardContent className="pt-4">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="text-xs font-medium text-gray-500 uppercase">Name</TableHead>
                  <TableHead className="text-xs font-medium text-gray-500 uppercase">Profile ID</TableHead>
                  <TableHead className="text-xs font-medium text-gray-500 uppercase">View Profile</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {recentRegistrations.map((registration) => (
                  <TableRow key={registration.id}>
                    <TableCell className="font-medium">{registration.name}</TableCell>
                    <TableCell className="text-gray-600">{registration.profileId}</TableCell>
                    <TableCell>
                      <Link href={`/assistant/patients/${registration.id}`}>
                        <Button size="sm" className="bg-blue-500 hover:bg-blue-600 text-white h-7 px-3 text-xs">
                          View
                        </Button>
                      </Link>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>

      {/* Low Stock Alerts */}
      <Card>
        <CardHeader className="pb-2">
          <div className="flex items-center gap-2">
            <AlertTriangle className="h-5 w-5 text-amber-500" />
            <CardTitle className="text-lg font-semibold">Low Stock Alerts</CardTitle>
          </div>
        </CardHeader>
        <CardContent className="pt-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {lowStockAlerts.map((item) => (
              <div
                key={item.id}
                className={`flex items-center gap-3 p-4 rounded-lg border ${item.color}`}
              >
                <div className="p-2 bg-white rounded-lg">
                  <Package className="h-5 w-5 text-red-500" />
                </div>
                <div>
                  <p className="font-medium text-gray-900">{item.name}</p>
                  <p className="text-sm text-red-500">
                    {String(item.quantity).padStart(2, "0")} {item.unit} left
                  </p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
