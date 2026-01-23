'use client'

import { useParams, useRouter } from 'next/navigation'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { ArrowLeft } from 'lucide-react'

interface Patient {
  id: string
  name: string
  profileId: string
  age: number
  gender: string
  contact: string
  email?: string
  address?: string
  allergies?: string[]
  prescriptions: boolean
  image?: string
}

const mockPatients: Patient[] = [
  {
    id: '1',
    name: 'Pramudi Perera',
    profileId: '002',
    age: 30,
    gender: 'Female',
    contact: '074 0235792',
    email: 'pramudi@email.com',
    address: 'Alakamanda, Kiulawatta, Bombuwela, Kalutara',
    allergies: ['Penicillin', 'Aspirin'],
    prescriptions: true,
    image: '/pic3.png',
  },
  {
    id: '2',
    name: 'Sandali Silva',
    profileId: '019',
    age: 28,
    gender: 'Female',
    contact: '076 5874568',
    email: 'sandali@email.com',
    address: 'Colombo, Sri Lanka',
    allergies: [],
    prescriptions: true,
  },
  {
    id: '3',
    name: 'Lalith Fernando',
    profileId: '080',
    age: 5,
    gender: 'Male',
    contact: '072 1234569',
    email: 'lalith@email.com',
    address: 'Kandy, Sri Lanka',
    allergies: ['Nuts'],
    prescriptions: false,
  },
]

export default function PatientDetailPage() {
  const params = useParams()
  const router = useRouter()
  const patientId = params.id as string

  const patient = mockPatients.find((p) => p.id === patientId)

  if (!patient) {
    return (
      <div className="space-y-4">
        <Link href="/assistant/patients">
          <Button variant="outline" className="gap-2">
            <ArrowLeft className="h-4 w-4" />
            Back to Patients
          </Button>
        </Link>
        <Card>
          <CardContent className="p-6 text-center text-gray-500">
            Patient not found
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <Link href="/assistant/patients">
          <Button variant="outline" className="gap-2">
            <ArrowLeft className="h-4 w-4" />
            Back to Patients
          </Button>
        </Link>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Patient Profile</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="flex gap-6">
            {/* Patient Avatar */}
            <div className="flex-shrink-0">
              <Avatar className="w-24 h-24">
                <AvatarImage src={patient.image || '/placeholder.svg'} alt={patient.name} />
                <AvatarFallback className="text-lg">
                  {patient.name
                    .split(' ')
                    .map((n) => n[0])
                    .join('')}
                </AvatarFallback>
              </Avatar>
            </div>

            {/* Patient Info */}
            <div className="flex-1 space-y-4">
              <div>
                <h2 className="text-2xl font-bold text-gray-900">{patient.name}</h2>
                <p className="text-sm text-gray-500">Profile ID: {patient.profileId}</p>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-xs text-gray-500 uppercase font-semibold">Age</p>
                  <p className="text-lg font-medium text-gray-900">{patient.age}</p>
                </div>
                <div>
                  <p className="text-xs text-gray-500 uppercase font-semibold">Gender</p>
                  <p className="text-lg font-medium text-gray-900">{patient.gender}</p>
                </div>
              </div>
            </div>
          </div>

          <div className="border-t pt-6 space-y-4">
            <div className="grid grid-cols-2 gap-6">
              <div>
                <p className="text-xs text-gray-500 uppercase font-semibold">Contact Number</p>
                <p className="text-lg font-medium text-gray-900">{patient.contact}</p>
              </div>
              <div>
                <p className="text-xs text-gray-500 uppercase font-semibold">Email</p>
                <p className="text-lg font-medium text-gray-900">{patient.email || 'N/A'}</p>
              </div>
            </div>

            <div>
              <p className="text-xs text-gray-500 uppercase font-semibold">Address</p>
              <p className="text-lg font-medium text-gray-900">{patient.address || 'N/A'}</p>
            </div>

            <div>
              <p className="text-xs text-gray-500 uppercase font-semibold">Allergies</p>
              <div className="flex gap-2 mt-2">
                {patient.allergies && patient.allergies.length > 0 ? (
                  patient.allergies.map((allergy) => (
                    <span
                      key={allergy}
                      className="bg-red-100 text-red-700 px-3 py-1 rounded-full text-sm"
                    >
                      {allergy}
                    </span>
                  ))
                ) : (
                  <span className="text-gray-500">No allergies recorded</span>
                )}
              </div>
            </div>

            <div>
              <p className="text-xs text-gray-500 uppercase font-semibold">Prescriptions</p>
              <p className="text-lg font-medium text-gray-900">
                {patient.prescriptions ? 'Yes' : 'No'}
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
