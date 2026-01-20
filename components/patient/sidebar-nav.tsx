"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import { User, LayoutDashboard, Ticket, FileText, CreditCard, Clock, XCircle, LogOut } from "lucide-react"

const navItems = [
  { label: "Dashboard", href: "/patient/dashboard", icon: LayoutDashboard },
  { label: "Profile", href: "/patient/profile", icon: User },
  { label: "Queue Token", href: "/patient/queue-token", icon: Ticket },
  { label: "Prescriptions", href: "/patient/prescriptions", icon: FileText },
  { label: "Payments", href: "/patient/payments", icon: CreditCard },
  { label: "View History", href: "/patient/view-history", icon: Clock },
  { label: "Cancel Appointment", href: "/patient/cancel-appointment", icon: XCircle },
  { label: "Logout", href: "/login", icon: LogOut },
]

export function SidebarNav() {
  const pathname = usePathname()

  return (
    <div className="left-0 top-16 w-64 h-screen bg-white border-r border-gray-200 pt-8">
      <div className="px-6 mb-8">
        <h2 className="text-sm font-semibold text-gray-600 uppercase tracking-wider">MEDICAL CENTRE</h2>
      </div>

      <nav className="space-y-1 px-4">
        {navItems.map((item) => {
          const Icon = item.icon
          const isActive = pathname === item.href
          const isLogout = item.label === "Logout"
          
          return (
            <Link key={item.href} href={item.href}>
              <div
                className={cn(
                  "flex items-center gap-3 px-4 py-2.5 rounded-lg transition-colors",
                  isActive 
                    ? "bg-blue-50 text-blue-600 font-medium" 
                    : isLogout 
                      ? "text-red-600 hover:bg-red-50"
                      : "text-gray-700 hover:bg-gray-50",
                )}
              >
                <Icon className={cn("h-5 w-5", isActive ? "text-blue-600" : isLogout ? "text-red-600" : "text-gray-500")} />
                <span className="text-sm">{item.label}</span>
              </div>
            </Link>
          )
        })}
      </nav>
    </div>
  )
}
