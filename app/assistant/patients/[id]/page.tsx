'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'

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
    id: '1',
    name: 'Sophia Carter',
    profileId: '12345678',
    age: 30,
    gender: 'Female',
    contact: '(555) 123-4567',
    prescriptions: true,
  },
  {
    id: '2',
    name: 'Ethan Carter',
    profileId: '12345679',
    age: 28,
    gender: 'Male',
    contact: '(555) 123-4568',
    prescriptions: true,
  },
  {
    id: '3',
    name: 'Liam Carter',
    profileId: '12345680',
    age: 5,
    gender: 'Male',
    contact: '(555) 123-4569',
    prescriptions: false,
  },
]

export default function PatientsPage() {
  const [searchTerm, setSearchTerm] = useState('')

  const filteredPatients = mockPatients.filter(
    (patient) =>
      patient.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      patient.profileId.includes(searchTerm)
  )

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Patients</h1>
        <p className="text-gray-600">View and manage patient profiles</p>
      </div>

      <Card className="p-6 bg-white">
        <div className="space-y-6">
          <div>
            <input
              type="text"
              placeholder="Search by patient name or ID"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
            />
          </div>

          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">Name</th>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">Profile ID</th>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">Age/Gender</th>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">Contact</th>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {filteredPatients.map((patient) => (
                  <tr key={patient.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 text-sm text-gray-900">{patient.name}</td>
                    <td className="px-6 py-4 text-sm text-gray-600">{patient.profileId}</td>
                    <td className="px-6 py-4 text-sm text-gray-600">
                      {patient.age} / {patient.gender}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-600">{patient.contact}</td>
                    <td className="px-6 py-4 text-sm space-x-2">
                      <Link href={`/assistant/patients/${patient.id}`}>
                        <Button className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 text-xs">
                          View Profile
                        </Button>
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </Card>
    </div>
  )
}
