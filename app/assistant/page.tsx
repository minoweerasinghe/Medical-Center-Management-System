'use client'

import Link from 'next/link'
import { Button } from '@/components/ui/button'

export default function PatientRegistrationPage() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-gray-50 to-gray-100 px-4 py-8">
      <div className="w-full max-w-6xl space-y-8">
        {/* Buttons Section */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center pt-12 mb-12">
          <Link href="/register/family">
            <Button className="bg-blue-500 hover:bg-blue-600 text-white px-8 py-3 font-medium text-base rounded-lg shadow-md">
              Family Account Create
            </Button>
          </Link>
          <Link href="/register/profile">
            <Button className="bg-blue-500 hover:bg-blue-600 text-white px-8 py-3 font-medium text-base rounded-lg shadow-md">
              Profile Create
            </Button>
          </Link>
        </div>

        {/* Healthcare Illustration */}
        <div className="flex justify-center">
          <img
            src="/patient-registration.png"
            alt="Healthcare clinic illustration"
            className="w-full max-w-4xl h-auto rounded-lg shadow-lg"
          />
        </div>
      </div>
    </div>
  )
}
