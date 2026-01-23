import React from "react"
import type { Metadata } from 'next'
import { MedicalHeader } from '@/components/medical-header'
import { AssistantSidebar } from '@/components/assistant/sidebar'

export const metadata: Metadata = {
  title: 'Medical Assistant - Medical Centre',
  description: 'Medical Assistant Dashboard',
}

export default function AssistantLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="min-h-screen bg-gray-50">
      <MedicalHeader isAuthenticated={true} />
      <div className="flex">
        <AssistantSidebar />
        <main className="flex-1 p-8">
          {children}
        </main>
      </div>
    </div>
  )
}
