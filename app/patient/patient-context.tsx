"use client"

import type React from "react"
import { createContext, useContext, useState } from "react"

interface SelectedMember {
  id: string
  name: string
  role: string
  image: string
}

interface PatientContextType {
  selectedMember: SelectedMember | null
  setSelectedMember: (member: SelectedMember | null) => void
}

const PatientContext = createContext<PatientContextType | undefined>(undefined)

export function PatientProvider({ children }: { children: React.ReactNode }) {
  const [selectedMember, setSelectedMember] = useState<SelectedMember | null>(null)

  return (
    <PatientContext.Provider value={{ selectedMember, setSelectedMember }}>
      {children}
    </PatientContext.Provider>
  )
}

export function usePatient() {
  const context = useContext(PatientContext)
  if (!context) {
    throw new Error("usePatient must be used within PatientProvider")
  }
  return context
}
