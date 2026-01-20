"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Search, Pill } from "lucide-react"
import { useSearchParams } from "next/navigation"
import { Suspense } from "react"
import Loading from "./loading"

const patientData = {
  id: "123456789",
  name: "Sophia Carter",
  age: 30,
  gender: "Female",
  contact: "(555) 123-4567",
  address: "123 Maple Street, Anytown, USA",
  allergies: ["Penicillin", "Aspirin"],
  prescribedMedicines: true,
  image: "/placeholder.svg?height=150&width=150",
}

const visitHistory = [
  {
    date: "15th May 2024",
    dosage: "1 tablet, twice a day",
    medicine: "Amoxicillin 500mg",
  },
  {
    date: "22nd April 2024",
    dosage: "1 tablet, as needed",
    medicine: "Ibuprofen 200mg",
  },
  {
    date: "10th March 2024",
    dosage: "1 tablet, once a day",
    medicine: "Cetirizine 10mg",
  },
]

export default function DoctorPatients() {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedPatient, setSelectedPatient] = useState(patientData)
  const [activeTab, setActiveTab] = useState("history")
  const searchParams = useSearchParams()

  return (
    <Suspense fallback={<Loading />}>
      <div className="space-y-6">
        {/* Search Bar */}
        <div className="relative max-w-xl">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
          <Input
            placeholder="Search by patient name or ID"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10 border-gray-300"
          />
        </div>

        {/* Allergies Badge */}
        <div>
          <Badge variant="outline" className="bg-teal-50 text-teal-700 border-teal-200">
            Allergies
          </Badge>
        </div>

        {/* Patient Profile Card */}
        <Card>
          <CardContent className="p-6">
            <div className="flex flex-col md:flex-row gap-6">
              {/* Patient Info */}
              <div className="flex-1 space-y-4">
                <div>
                  <h2 className="text-xl font-bold text-gray-900">Patient Profile</h2>
                  <p className="text-sm text-gray-500">
                    ID: {selectedPatient.id} | Prescribed Medicines: 
                    <span className="text-emerald-600 ml-1">
                      {selectedPatient.prescribedMedicines ? "Yes" : "No"}
                    </span>
                  </p>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-xs text-gray-500 underline">Name</p>
                    <p className="font-medium">{selectedPatient.name}</p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500 underline">Age/Gender</p>
                    <p className="font-medium">{selectedPatient.age} / {selectedPatient.gender}</p>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-xs text-gray-500 underline">Contact</p>
                    <p className="font-medium">{selectedPatient.contact}</p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500 underline">Address</p>
                    <p className="font-medium">{selectedPatient.address}</p>
                  </div>
                </div>

                <div>
                  <p className="text-xs text-gray-500 underline">Known Allergies</p>
                  <p className="font-medium">{selectedPatient.allergies.join(", ")}</p>
                </div>

                <div className="flex gap-3 pt-2">
                  <Button variant="outline" className="bg-transparent border-gray-300">
                    View History
                  </Button>
                  <Button className="bg-teal-500 hover:bg-teal-600 text-white">
                    View Prescription
                  </Button>
                </div>
              </div>

              {/* Patient Avatar */}
              <div className="flex justify-center md:justify-end">
                <div className="w-40 h-48 rounded-lg overflow-hidden bg-orange-50">
                  <Avatar className="w-full h-full rounded-lg">
                    <AvatarImage src={selectedPatient.image || "/placeholder.svg"} alt={selectedPatient.name} className="object-cover" />
                    <AvatarFallback className="text-2xl bg-orange-100 text-orange-700 rounded-lg">
                      {selectedPatient.name.split(' ').map(n => n[0]).join('')}
                    </AvatarFallback>
                  </Avatar>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Tabs for History / Prescribed Medicines */}
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="bg-transparent border-b w-full justify-start rounded-none h-auto p-0">
            <TabsTrigger 
              value="history" 
              className="rounded-none border-b-2 border-transparent data-[state=active]:border-teal-500 data-[state=active]:bg-transparent px-4 pb-2"
            >
              Visit History
            </TabsTrigger>
            <TabsTrigger 
              value="medicines" 
              className="rounded-none border-b-2 border-transparent data-[state=active]:border-teal-500 data-[state=active]:bg-transparent px-4 pb-2"
            >
              Prescribed Medicines
            </TabsTrigger>
          </TabsList>

          <TabsContent value="history" className="mt-6">
            <div className="space-y-4">
              {visitHistory.map((visit, index) => (
                <div key={index} className="flex gap-4 items-start">
                  <div className="flex-shrink-0 mt-1">
                    <Pill className="h-5 w-5 text-gray-400" />
                  </div>
                  <div>
                    <p className="font-semibold text-gray-900">Prescribed on: {visit.date}</p>
                    <p className="text-sm text-teal-600">Dosage: {visit.dosage}</p>
                    <p className="text-sm text-gray-600">{visit.medicine}</p>
                  </div>
                </div>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="medicines" className="mt-6">
            <div className="space-y-4">
              {visitHistory.map((visit, index) => (
                <Card key={index}>
                  <CardContent className="p-4">
                    <div className="flex justify-between items-start">
                      <div>
                        <p className="font-semibold">{visit.medicine}</p>
                        <p className="text-sm text-gray-500">{visit.dosage}</p>
                      </div>
                      <Badge variant="outline" className="bg-emerald-50 text-emerald-700">
                        Active
                      </Badge>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </Suspense>
  )
}
