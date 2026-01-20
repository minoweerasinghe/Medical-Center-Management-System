import React from "react"
import type { Metadata } from 'next'
import { MedicalHeader } from '@/components/medical-header'
import { DoctorSidebar } from '@/components/doctor/sidebar'

export const metadata: Metadata = {
  title: 'Doctor Portal - Medical Centre',
  description: 'Doctor Dashboard and Management',
}

export default function DoctorLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="min-h-screen bg-gray-50">
      <MedicalHeader />
      <div className="flex">
        <DoctorSidebar />
        <main className="flex-1 p-8">
          {children}
        </main>
      </div>
    </div>
  )
}
