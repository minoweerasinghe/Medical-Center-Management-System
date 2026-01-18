"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"

const navItems = [
  { label: "Profile", href: "/patient/profile", icon: "👤" },
  { label: "Queue Token", href: "/patient/queue-token", icon: "🎫" },
  { label: "Prescriptions", href: "/patient/prescriptions", icon: "📋" },
  { label: "Payments", href: "/patient/payments", icon: "💳" },
  { label: "View History", href: "/patient/view-history", icon: "📜" },
  { label: "Cancel Appointment", href: "/patient/cancel-appointment", icon: "❌" },
  { label: "Logout", href: "/login", icon: "🚪" },
]

export function SidebarNav() {
  const pathname = usePathname()

  return (
    <div className="left-0 top-16 w-64 h-screen bg-white border-r border-gray-200 pt-8">
      <div className="px-6 mb-8">
        <h2 className="text-sm font-semibold text-gray-600 uppercase tracking-wider">MEDICAL CENTRE</h2>
      </div>

      <nav className="space-y-2 px-4">
        {navItems.map((item) => (
          <Link key={item.href} href={item.href}>
            <div
              className={cn(
                "flex items-center gap-3 px-4 py-2 rounded-lg transition-colors",
                pathname === item.href ? "bg-gray-100 text-gray-900 font-medium" : "text-gray-700 hover:bg-gray-50",
              )}
            >
              <span className="text-lg">{item.icon}</span>
              <span className="text-sm">{item.label}</span>
            </div>
          </Link>
        ))}
      </nav>
    </div>
  )
}
