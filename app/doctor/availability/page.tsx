"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Calendar } from "@/components/ui/calendar"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

const timeSlots = [
  "09:00 AM", "09:30 AM", "10:00 AM", "10:30 AM", "11:00 AM", "11:30 AM",
  "02:00 PM", "02:30 PM", "03:00 PM", "03:30 PM", "04:00 PM", "04:30 PM"
]

const daysOfWeek = [
  { day: "Monday", available: true },
  { day: "Tuesday", available: true },
  { day: "Wednesday", available: true },
  { day: "Thursday", available: true },
  { day: "Friday", available: true },
  { day: "Saturday", available: false },
  { day: "Sunday", available: false },
]

export default function DoctorAvailability() {
  const [date, setDate] = useState<Date | undefined>(new Date())
  const [availability, setAvailability] = useState(daysOfWeek)
  const [startTime, setStartTime] = useState("09:00 AM")
  const [endTime, setEndTime] = useState("05:00 PM")

  const toggleDay = (index: number) => {
    const updated = [...availability]
    updated[index].available = !updated[index].available
    setAvailability(updated)
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Availability Management</h1>
        <p className="text-gray-500">Set your working hours and manage your schedule.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Calendar */}
        <Card>
          <CardHeader>
            <CardTitle>Select Date</CardTitle>
          </CardHeader>
          <CardContent>
            <Calendar
              mode="single"
              selected={date}
              onSelect={setDate}
              className="rounded-md border"
            />
          </CardContent>
        </Card>

        {/* Weekly Schedule */}
        <Card>
          <CardHeader>
            <CardTitle>Weekly Schedule</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {availability.map((item, index) => (
              <div key={item.day} className="flex items-center justify-between py-2 border-b last:border-0">
                <div className="flex items-center gap-3">
                  <Switch
                    checked={item.available}
                    onCheckedChange={() => toggleDay(index)}
                  />
                  <Label className="font-medium">{item.day}</Label>
                </div>
                <Badge variant={item.available ? "default" : "secondary"} className={item.available ? "bg-emerald-100 text-emerald-700" : ""}>
                  {item.available ? "Available" : "Unavailable"}
                </Badge>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>

      {/* Working Hours */}
      <Card>
        <CardHeader>
          <CardTitle>Default Working Hours</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label>Start Time</Label>
              <Select value={startTime} onValueChange={setStartTime}>
                <SelectTrigger>
                  <SelectValue placeholder="Select start time" />
                </SelectTrigger>
                <SelectContent>
                  {timeSlots.map((time) => (
                    <SelectItem key={time} value={time}>{time}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label>End Time</Label>
              <Select value={endTime} onValueChange={setEndTime}>
                <SelectTrigger>
                  <SelectValue placeholder="Select end time" />
                </SelectTrigger>
                <SelectContent>
                  {timeSlots.map((time) => (
                    <SelectItem key={time} value={time}>{time}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
          <div className="flex justify-end mt-6">
            <Button className="bg-teal-500 hover:bg-teal-600 text-white">
              Save Schedule
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
