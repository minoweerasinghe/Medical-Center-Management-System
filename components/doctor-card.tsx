interface DoctorCardProps {
  name: string
  specialty: string
  registrationId: string
  imageSrc: string
  imageAlt: string
  availability: {
    day: string
    startTime: string
    endTime: string
  }[]
}

export function DoctorCard({ name, specialty, registrationId, imageSrc, imageAlt, availability }: DoctorCardProps) {
  return (
    <div className="w-full bg-white border border-gray-200 rounded-lg p-6 mb-8">
      <div className="flex flex-col md:flex-row gap-6 mb-6">
        {/* Doctor Image */}
        <div className="flex-shrink-0">
          <img
            src={imageSrc || "/placeholder.svg"}
            alt={imageAlt}
            className="w-40 h-40 rounded-lg object-cover bg-teal-500"
          />
        </div>

        {/* Doctor Info */}
        <div className="flex-1">
          <h3 className="text-xl font-bold text-gray-900 mb-1">{name}</h3>
          <p className="text-gray-600 mb-3">{specialty}</p>
          <p className="text-sm text-gray-500">Registration no. {registrationId}</p>
        </div>
      </div>

      {/* Availability Management Table */}
      <div className="mt-6">
        <h4 className="text-lg font-semibold text-gray-900 mb-4">Availability Management</h4>
        <div className="overflow-x-auto">
          <table className="w-full border-collapse">
            <thead>
              <tr className="border-b border-gray-300">
                <th className="text-left px-4 py-3 font-semibold text-gray-900">Day</th>
                <th className="text-left px-4 py-3 font-semibold text-gray-900">Start Time</th>
                <th className="text-left px-4 py-3 font-semibold text-gray-900">End Time</th>
              </tr>
            </thead>
            <tbody>
              {availability.map((slot, index) => (
                <tr key={index} className="border-b border-gray-200">
                  <td className="px-4 py-3 text-gray-700">{slot.day}</td>
                  <td className="px-4 py-3 text-gray-600">{slot.startTime}</td>
                  <td className="px-4 py-3 text-gray-600">{slot.endTime}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
