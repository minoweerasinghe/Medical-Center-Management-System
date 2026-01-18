"use client"

import type React from "react"

import { MedicalHeader } from "@/components/medical-header"
import { SidebarNav } from "@/components/patient/sidebar-nav"

export default function PatientLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="min-h-screen bg-gray-50">
      <MedicalHeader variant="login" />
      <div className="flex">
        <SidebarNav />
        <main className="flex-1 ml-64 p-8">{children}</main>
      </div>
    </div>
  )
}
