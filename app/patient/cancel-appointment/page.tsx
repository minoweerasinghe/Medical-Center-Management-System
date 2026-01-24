"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { AlertCircle } from "lucide-react"

interface Appointment {
  id: string
  queueNumber: number
  doctorName: string
  specialty: string
  date: string
  time: string
  status: string
  image: string
}

export default function CancelAppointmentPage() {
  const [appointments, setAppointments] = useState<Appointment[]>([
    {
      id: "001",
      queueNumber: 23,
      doctorName: "Dr. Mahesh Joseph",
      specialty: "General Practitioner",
      date: "6:00 PM, Jan 24, 2026",
      time: "Patient: Pramudi Perera",
      status: "Scheduled",
      image: "/queue-token.png",
    },
    {
      id: "002",
      queueNumber: 32,
      doctorName: "Dr. Amasha Joseph",
      specialty: "Dermatologist",
      date: "2:30 PM, Jan 05, 2026",
      time: "Patient: Pramudi Perera",
      status: "Scheduled",
      image: "/queue-token.png",
    }
  ])

  const [showCancelDialog, setShowCancelDialog] = useState(false)
  const [selectedAppointmentId, setSelectedAppointmentId] = useState<string | null>(null)
  const [cancelReason, setCancelReason] = useState("")
  const [cannotCancelMessage, setCannotCancelMessage] = useState("")

  const cancellationReasons = [
    { value: "getting-late", label: "Getting late / Running late" },
    { value: "book-another-date", label: "Will book another date" },
    { value: "doctor-change", label: "Want to change doctor" },
    { value: "feeling-unwell", label: "Not feeling well" },
    { value: "urgent-work", label: "Urgent work commitment" },
    { value: "other", label: "Other reason" },
  ]

  const isWithin2Hours = (appointmentDate: string): boolean => {
    // Parse the appointment date (e.g., "1:00 PM, Jan 24, 2026")
    try {
      // Split by comma to separate time and date
      const parts = appointmentDate.split(", ")
      if (parts.length < 3) return true // Allow cancellation if can't parse
      
      const timeStr = parts[0] // "1:00 PM"
      const monthAndDay = parts[1] // "Jan 24"
      const yearStr = parts[2] // "2026"
      
      // Parse time (HH:MM AM/PM)
      const timeRegex = /(\d{1,2}):(\d{2})\s(AM|PM)/i
      const timeMatch = timeStr.match(timeRegex)
      if (!timeMatch) return true
      
      let hours = parseInt(timeMatch[1])
      const minutes = parseInt(timeMatch[2])
      const period = timeMatch[3].toUpperCase()
      
      // Convert to 24-hour format
      if (period === "PM" && hours !== 12) hours += 12
      if (period === "AM" && hours === 12) hours = 0
      
      // Parse month and day (e.g., "Jan 24")
      const monthDayRegex = /(\w+)\s(\d{1,2})/
      const monthDayMatch = monthAndDay.match(monthDayRegex)
      if (!monthDayMatch) return true
      
      const monthStr = monthDayMatch[1]
      const day = parseInt(monthDayMatch[2])
      
      const monthMap: Record<string, number> = {
        "jan": 0, "feb": 1, "mar": 2, "apr": 3, "may": 4, "jun": 5,
        "jul": 6, "aug": 7, "sep": 8, "oct": 9, "nov": 10, "dec": 11
      }
      
      const month = monthMap[monthStr.toLowerCase()]
      if (month === undefined) return true
      
      const year = parseInt(yearStr)
      
      // Create appointment date object
      const appointmentDateTime = new Date(year, month, day, hours, minutes, 0)
      const currentTime = new Date()
      
      // Calculate difference in hours
      const timeDifference = appointmentDateTime.getTime() - currentTime.getTime()
      const hoursRemaining = timeDifference / (1000 * 60 * 60)
      
      // Allow cancellation if within 1 hour and appointment is in the future
      return hoursRemaining <= 1 && hoursRemaining > 0
    } catch (error) {
      console.error("Date parsing error:", error)
      return true // Allow cancellation by default if parsing fails
    }
  }

  const handleCancelClick = (id: string, appointmentDate: string) => {
    if (isWithin2Hours(appointmentDate)) {
      setSelectedAppointmentId(id)
      setCancelReason("")
      setCannotCancelMessage("")
      setShowCancelDialog(true)
    } else {
      setCannotCancelMessage(
        "Appointments can only be cancelled within 1 hour of the scheduled time. This appointment is outside the cancellation window."
      )
      setShowCancelDialog(true)
    }
  }

  const handleConfirmCancel = () => {
    if (selectedAppointmentId && cancelReason) {
      setAppointments((prev) => prev.filter((apt) => apt.id !== selectedAppointmentId))
      setShowCancelDialog(false)
      setCancelReason("")
      setSelectedAppointmentId(null)
    }
  }

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-4xl font-bold text-gray-900 mb-2">Cancel Appointment</h1>
        <p className="text-gray-600">You can cancel appointments within 1 hour of the scheduled time</p>
      </div>

      {appointments.length > 0 ? (
        <div className="space-y-6">
          {appointments.map((appointment) => {
            // For demo: show both appointments as cancellable (uncomment line below to use actual 1-hour check)
            const canCancel = true // isWithin2Hours(appointment.date)
            return (
              <Card 
                key={appointment.id} 
                className={`p-6 border-2 transition-all ${
                  canCancel 
                    ? "border-gray-200 bg-white hover:shadow-lg" 
                    : "border-yellow-200 bg-yellow-50"
                }`}
              >
                <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
                  {/* Left - Appointment Details */}
                  <div className="lg:col-span-2 space-y-5">
                    <div className="bg-blue-50 rounded-lg p-4">
                      <p className="text-xs font-semibold text-blue-600 uppercase tracking-wide mb-2">Queue Token</p>
                      <p className="text-4xl font-bold text-blue-700">{appointment.queueNumber}</p>
                    </div>

                    <div className="space-y-4">
                      <div>
                        <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1">Doctor</p>
                        <p className="text-lg font-semibold text-gray-900">{appointment.doctorName}</p>
                        <p className="text-sm text-gray-600">{appointment.specialty}</p>
                      </div>

                      <div>
                        <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1">Appointment Date & Time</p>
                        <p className="text-base font-semibold text-gray-900">{appointment.date}</p>
                        <p className="text-sm text-gray-600">{appointment.time}</p>
                      </div>

                      <div className="flex items-center gap-2">
                        <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide">Status:</p>
                        <span className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-xs font-semibold">
                          {appointment.status}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Middle - Doctor Image */}
                  <div className="lg:col-span-1">
                    <div className="bg-gradient-to-br from-teal-400 to-teal-600 rounded-lg overflow-hidden h-48 flex items-center justify-center">
                      <img 
                        src={appointment.image || "/placeholder.svg"} 
                        alt={appointment.doctorName} 
                        className="w-full h-full object-cover" 
                      />
                    </div>
                  </div>

                  {/* Right - Action */}
                  <div className="lg:col-span-1 flex flex-col items-stretch justify-between">
                    {canCancel ? (
                      <div className="bg-green-50 rounded-lg p-4 border border-green-200 text-center mb-4">
                        <p className="text-xs font-semibold text-green-700">ELIGIBLE FOR CANCELLATION</p>
                        <p className="text-sm text-green-600 mt-1">Within 1-hour window</p>
                      </div>
                    ) : (
                      <div className="bg-yellow-50 rounded-lg p-4 border border-yellow-200 text-center mb-4">
                        <p className="text-xs font-semibold text-yellow-700">CANNOT CANCEL</p>
                        <p className="text-xs text-yellow-600 mt-1">Outside 1-hour window</p>
                      </div>
                    )}

                    <Button 
                      onClick={() => handleCancelClick(appointment.id, appointment.date)}
                      disabled={!canCancel}
                      className={`w-full py-3 font-semibold ${
                        canCancel
                          ? "bg-red-500 hover:bg-red-600 text-white"
                          : "bg-gray-300 text-gray-500 cursor-not-allowed"
                      }`}
                    >
                      {canCancel ? "Cancel Appointment" : "Cannot Cancel"}
                    </Button>
                  </div>
                </div>
              </Card>
            )
          })}
        </div>
      ) : (
        <Card className="p-12 bg-white text-center border-2 border-gray-200">
          <p className="text-gray-600 text-lg">No appointments to cancel</p>
        </Card>
      )}

      {/* Cancel Confirmation Dialog */}
      <Dialog open={showCancelDialog} onOpenChange={setShowCancelDialog}>
        <DialogContent className="sm:max-w-[550px] max-h-[90vh] overflow-y-auto">
          {cannotCancelMessage ? (
            <div className="space-y-6">
              <div className="text-center">
                <div className="flex justify-center mb-4">
                  <div className="w-16 h-16 bg-yellow-100 rounded-full flex items-center justify-center">
                    <AlertCircle className="h-8 w-8 text-yellow-600" />
                  </div>
                </div>
                <h2 className="text-2xl font-bold text-gray-900 mb-2">Cannot Cancel Appointment</h2>
              </div>

              <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                <p className="text-gray-700 text-center text-sm leading-relaxed">
                  {cannotCancelMessage}
                </p>
              </div>

              <div className="flex justify-center gap-3 pt-4">
                <Button
                  onClick={() => {
                    setShowCancelDialog(false)
                    setCannotCancelMessage("")
                  }}
                  className="bg-blue-500 hover:bg-blue-600 text-white px-8 py-2"
                >
                  Understood
                </Button>
              </div>
            </div>
          ) : (
            <div className="space-y-6">
              <div>
                <h2 className="text-2xl font-bold text-gray-900 mb-2">Cancel Appointment?</h2>
                <p className="text-gray-600">Please select a reason for cancelling this appointment</p>
              </div>

              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                <p className="text-sm text-gray-700">
                  <span className="font-semibold">Note:</span> This action cannot be undone. You can book a new appointment later if needed.
                </p>
              </div>

              <div className="space-y-4">
                <p className="text-sm font-semibold text-gray-900">Why are you cancelling?</p>
                <RadioGroup value={cancelReason} onValueChange={setCancelReason}>
                  <div className="space-y-2">
                    {cancellationReasons.map((reason) => (
                      <div 
                        key={reason.value} 
                        className={`flex items-center space-x-3 p-3 rounded-lg border-2 cursor-pointer transition-all ${
                          cancelReason === reason.value
                            ? "border-blue-500 bg-blue-50"
                            : "border-gray-200 bg-white hover:border-gray-300"
                        }`}
                      >
                        <RadioGroupItem value={reason.value} id={reason.value} className="cursor-pointer" />
                        <Label 
                          htmlFor={reason.value} 
                          className="cursor-pointer font-medium text-gray-900 flex-1"
                        >
                          {reason.label}
                        </Label>
                      </div>
                    ))}
                  </div>
                </RadioGroup>
              </div>

              <div className="flex gap-3 pt-4 border-t">
                <Button
                  onClick={() => {
                    setShowCancelDialog(false)
                    setCancelReason("")
                    setSelectedAppointmentId(null)
                  }}
                  className="flex-1 bg-gray-200 hover:bg-gray-300 text-gray-900 font-semibold"
                >
                  Keep Appointment
                </Button>
                <Button
                  onClick={handleConfirmCancel}
                  disabled={!cancelReason}
                  className="flex-1 bg-red-500 hover:bg-red-600 text-white font-semibold disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Confirm Cancellation
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  )
}
