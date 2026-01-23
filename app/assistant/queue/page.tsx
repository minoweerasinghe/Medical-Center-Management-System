'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'

interface QueueItem {
  token: string
  patientName: string
  doctor: string
  status: 'In Progress' | 'Waiting'
}

export default function QueuePage() {
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedPatient] = useState({
    name: 'Pramudi Perera',
    id: '002',
    dob: '05/15/1985',
    gender: 'Female',
    queueToken: '16',
  })

  const queueItems: QueueItem[] = [
    { token: '16', patientName: 'Pramudi Perera', doctor: 'Dr. Mahesh Joseph', status: 'In Progress' },
    { token: '17', patientName: 'Lalith Fernando', doctor: 'Dr. Mahesh Joseph', status: 'Waiting' },
    { token: '18', patientName: 'Olivia Bennett', doctor: 'Dr. Mahesh Joseph', status: 'Waiting' },
    { token: '19', patientName: 'Nameetha Alwis', doctor: 'Dr. Mahesh Joseph', status: 'Waiting' },
    { token: '20', patientName: 'Ama Perera', doctor: 'Dr. Mahesh Joseph', status: 'Waiting' },
  ]

  const filteredQueue = queueItems.filter(
    (item) =>
      item.token.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.patientName.toLowerCase().includes(searchTerm.toLowerCase())
  )

  return (
    <div className="space-y-8">
      <h1 className="text-3xl font-bold text-gray-900">Current Queue</h1>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        {/* Left Panel - Patient Search and Info */}
        <div className="space-y-6">
          {/* Search */}
          <div className="relative">
            <span className="absolute left-3 top-3 text-gray-400">🔍</span>
            <input
              type="text"
              placeholder="Search by Profile ID"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg bg-gray-50 focus:ring-2 focus:ring-blue-500 outline-none text-sm"
            />
          </div>

          {/* Patient Summary */}
          <Card className="p-6 bg-white">
            <h3 className="text-sm font-semibold text-gray-900 mb-4">Patient Summary</h3>
            <div className="space-y-3">
              <div>
                <p className="text-xs text-gray-600 mb-1">Name</p>
                <p className="font-semibold text-gray-900 text-sm">{selectedPatient.name}</p>
              </div>
              <div>
                <p className="text-xs text-gray-600">ID: {selectedPatient.id} | DOB: {selectedPatient.dob}</p>
              </div>
              <div>
                <p className="text-xs text-gray-600">Gender: {selectedPatient.gender}</p>
              </div>
            </div>
          </Card>

          {/* Queue Token */}
          <Card className="p-6 bg-white">
            <h3 className="text-sm font-semibold text-gray-900 mb-4">Queue Token</h3>
            <div className="text-4xl font-bold text-blue-600 text-center py-4">{selectedPatient.queueToken}</div>
          </Card>
        </div>

        {/* Right Panel - Queue Table */}
        <div className="lg:col-span-3">
          <Card className="p-8 bg-white">
            <h2 className="text-xl font-bold text-gray-900 mb-6">Current Queue</h2>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50 border-b border-gray-200">
                  <tr>
                    <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">Token</th>
                    <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">Patient Name</th>
                    <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">Doctor</th>
                    <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {filteredQueue.map((item) => (
                    <tr key={item.token} className="hover:bg-gray-50">
                      <td className="px-6 py-4 text-sm font-semibold text-gray-900">{item.token}</td>
                      <td className="px-6 py-4 text-sm text-blue-600">{item.patientName}</td>
                      <td className="px-6 py-4 text-sm text-gray-600">{item.doctor}</td>
                      <td className="px-6 py-4 text-sm">
                        {item.status === 'In Progress' ? (
                          <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-xs font-medium">
                            In Progress
                          </span>
                        ) : (
                          <span className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-xs font-medium">
                            Waiting
                          </span>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Card>
        </div>
      </div>

      {/* Back Button */}
      <div className="flex justify-end">
        <Link href="/assistant">
          <Button className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-2">Back</Button>
        </Link>
      </div>
    </div>
  )
}
