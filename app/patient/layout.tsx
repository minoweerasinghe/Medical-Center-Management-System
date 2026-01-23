"use client"

import type React from "react"

import { MedicalHeader } from "@/components/medical-header"
import { SidebarNav } from "@/components/patient/sidebar-nav"
import { PatientProvider, usePatient } from "./patient-context"

function PatientLayoutContent({
  children,
}: {
  children: React.ReactNode
}) {
  const { selectedMember } = usePatient()

  return (
    <div className="min-h-screen bg-gray-50">
      <MedicalHeader variant="login" isAuthenticated={true} />
      <div className="flex">
        {selectedMember && <SidebarNav />}
        <main className={`flex-1 ${selectedMember ? "ml-4" : ""} p-8`}>
          {children}
        </main>
      </div>
    </div>
  )
}

export default function PatientLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <PatientProvider>
      <PatientLayoutContent>{children}</PatientLayoutContent>
    </PatientProvider>
  )
}
