import { MedicalHeader } from "@/components/medical-header"

export default function DoctorAvailabilityPage() {
  const doctors = [
    {
      id: 1,
      name: "Dr. Joseph Ferreira",
      specialty: "Cardiologist",
      registrationNo: "REG/DCA/12345/690",
      image: "/female-doctor-in-white-coat-smiling-with-medical-t.jpg",
      availability: [
        { day: "Monday", startTime: "08:00 AM", endTime: "02:00 PM" },
        { day: "Tuesday", startTime: "09:00 AM", endTime: "03:00 PM" },
        { day: "Wednesday", startTime: "08:30 AM", endTime: "02:00 PM" },
        { day: "Thursday", startTime: "08:00 AM", endTime: "01:00 PM" },
        { day: "Friday", startTime: "Not Available", endTime: "Not Available" },
        { day: "Saturday", startTime: "03:00 AM", endTime: "02:00 PM" },
        { day: "Sunday", startTime: "Not Available", endTime: "Not Available" },
      ],
    },
    {
      id: 2,
      name: "Dr. Ameesha Rodrigo",
      specialty: "Pediatrician",
      registrationNo: "REG/DCS/12345/1234",
      image: "/cartoon-illustration-of-doctor-consulting-with-pat.jpg",
      availability: [
        { day: "Monday", startTime: "09:00 AM", endTime: "04:00 PM" },
        { day: "Tuesday", startTime: "08:00 AM", endTime: "02:00 PM" },
        { day: "Wednesday", startTime: "Not Available", endTime: "Not Available" },
        { day: "Thursday", startTime: "09:00 AM", endTime: "03:00 PM" },
        { day: "Friday", startTime: "08:30 AM", endTime: "04:00 PM" },
        { day: "Saturday", startTime: "Not Available", endTime: "Not Available" },
        { day: "Sunday", startTime: "Not Available", endTime: "Not Available" },
      ],
    },
  ]

  return (
    <div className="min-h-screen bg-gray-50">
      <MedicalHeader />

      <main className="max-w-6xl mx-auto px-4 py-12">
        {/* Page Title */}
        <div className="mb-12">
          <h1 className="text-4xl font-bold text-center text-gray-900 mb-2">Doctor Availability</h1>
        </div>

        {/* Doctor Cards */}
        <div className="space-y-12">
          {doctors.map((doctor) => (
            <div key={doctor.id} className="bg-white rounded-lg shadow-md overflow-hidden">
              {/* Doctor Info Section */}
              <div className="flex flex-col md:flex-row gap-8 p-8 border-b border-gray-200">
                {/* Doctor Image */}
                <div className="flex-shrink-0">
                  <img
                    src={doctor.image || "/placeholder.svg"}
                    alt={doctor.name}
                    className="w-40 h-40 rounded-lg object-cover"
                  />
                </div>

                {/* Doctor Details */}
                <div className="flex-1">
                  <h2 className="text-2xl font-bold text-gray-900 mb-1">{doctor.name}</h2>
                  <p className="text-gray-600 mb-3">{doctor.specialty}</p>
                  <p className="text-sm text-gray-500">Registration No: {doctor.registrationNo}</p>
                </div>
              </div>

              {/* Availability Table */}
              <div className="p-8">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Availability</h3>
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b border-gray-200">
                        <th className="text-left py-3 px-4 font-semibold text-gray-700">Day</th>
                        <th className="text-left py-3 px-4 font-semibold text-gray-700">Start Time</th>
                        <th className="text-left py-3 px-4 font-semibold text-gray-700">End Time</th>
                      </tr>
                    </thead>
                    <tbody>
                      {doctor.availability.map((slot, idx) => (
                        <tr key={idx} className="border-b border-gray-100 hover:bg-gray-50">
                          <td className="py-3 px-4 text-gray-800">{slot.day}</td>
                          <td className="py-3 px-4">
                            <span className="text-green-600 font-semibold">{slot.startTime}</span>
                          </td>
                          <td className="py-3 px-4">
                            <span className="text-green-600 font-semibold">{slot.endTime}</span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  )
}
