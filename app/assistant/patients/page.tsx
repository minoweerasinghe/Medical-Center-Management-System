"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Search } from "lucide-react"
import { useSearchParams } from "next/navigation"
import { Suspense } from "react"
import Loading from "./loading"

interface Patient {
  id: string
  name: string
  profileId: string
  age: number
  gender: string
  contact: string
  prescriptions: boolean
}

const mockPatients: Patient[] = [
  {
    id: "1",
    name: "Pramudi Perera",
    profileId: "002",
    age: 30,
    gender: "Female",
    contact: "074 0235792",
    prescriptions: true,
  },
  {
    id: "2",
    name: "Sandali Silva",
    profileId: "019",
    age: 28,
    gender: "Female",
    contact: "076 5874568",
    prescriptions: true,
  },
  {
    id: "3",
    name: "Lalith Fernando",
    profileId: "080",
    age: 5,
    gender: "Male",
    contact: "072 1234569",
    prescriptions: false,
  },
]

export default function PatientsPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const searchParams = useSearchParams()

  const filteredPatients = mockPatients.filter(
    (patient) =>
      patient.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      patient.profileId.includes(searchTerm)
  )

  return (
    <Suspense fallback={<Loading />}>
      <div className="space-y-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Patients</h1>
          <p className="text-gray-600">View and manage patient profiles</p>
        </div>

        <Card className="p-6 bg-white">
          <div className="space-y-6">
            <div className="relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search by patient ID"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
              />
            </div>

            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">
                      Name
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">
                      Profile ID
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">
                      Age/Gender
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">
                      Contact Number
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">
                      View Profile
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {filteredPatients.map((patient) => (
                    <tr key={patient.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 text-sm font-medium text-gray-900">
                        {patient.name}
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-600">
                        {patient.profileId}
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-600">
                        {patient.age} / {patient.gender}
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-600">
                        {patient.contact}
                      </td>
                      <td className="px-6 py-4">
                        <Link href={`/assistant/patients/${patient.id}`}>
                          <Button
                            size="sm"
                            className="bg-blue-500 hover:bg-blue-600 text-white"
                          >
                            View Profile
                          </Button>
                        </Link>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>

              {filteredPatients.length === 0 && (
                <div className="text-center py-8 text-gray-500">
                  No patients found matching your search.
                </div>
              )}
            </div>
          </div>
        </Card>
      </div>
    </Suspense>
  )
}
