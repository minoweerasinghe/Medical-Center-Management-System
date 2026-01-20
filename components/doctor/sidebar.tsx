"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import { 
  LayoutDashboard, 
  User, 
  Calendar, 
  Users, 
  DollarSign, 
  Package, 
  UserPlus,
  LogOut 
} from "lucide-react"

const navItems = [
  { label: "Dashboard", href: "/doctor/dashboard", icon: LayoutDashboard },
  { label: "Profile", href: "/doctor/profile", icon: User },
  { label: "Availability", href: "/doctor/availability", icon: Calendar },
  { label: "Patients", href: "/doctor/patients", icon: Users },
  { label: "Revenue & Sales Report", href: "/doctor/revenue", icon: DollarSign },
  { label: "Inventory", href: "/doctor/inventory", icon: Package },
  { label: "Register Assistant", href: "/doctor/register-assistant", icon: UserPlus },
  { label: "Logout", href: "/login", icon: LogOut },
]

export function DoctorSidebar() {
  const pathname = usePathname()

  return (
    <aside className="w-64 min-h-[calc(100vh-64px)] bg-white border-r border-gray-200">
      <div className="py-6">
        <nav className="space-y-1 px-4">
          {navItems.map((item) => {
            const Icon = item.icon
            const isActive = pathname === item.href || pathname.startsWith(item.href + "/")
            const isLogout = item.label === "Logout"
            
            return (
              <Link key={item.href} href={item.href}>
                <div
                  className={cn(
                    "flex items-center gap-3 px-4 py-2.5 rounded-lg transition-colors",
                    isActive 
                      ? "bg-blue-50 text-blue-600 font-medium" 
                      : isLogout 
                        ? "text-gray-700 hover:bg-gray-50"
                        : "text-gray-700 hover:bg-gray-50",
                  )}
                >
                  <Icon className={cn("h-5 w-5", isActive ? "text-blue-600" : "text-gray-500")} />
                  <span className="text-sm">{item.label}</span>
                </div>
              </Link>
            )
          })}
        </nav>
      </div>
    </aside>
  )
}
