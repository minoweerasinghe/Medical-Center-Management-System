"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import { UserPlus, Users, ListOrdered, Package, LayoutDashboard, LogOut } from "lucide-react"

const navItems = [
  { label: "Dashboard", href: "/assistant/dashboard", icon: LayoutDashboard },
  { label: "Patient Registration", href: "/assistant", icon: UserPlus },
  { label: "Patients", href: "/assistant/patients", icon: Users },
  { label: "Queue", href: "/assistant/queue", icon: ListOrdered },
  { label: "Inventory", href: "/assistant/inventory", icon: Package },
]

export function AssistantSidebar() {
  const pathname = usePathname()

  return (
    <aside className="w-64 bg-white border-r border-gray-200 min-h-screen">
      <div className="p-6 space-y-8">
        <div>
          <h2 className="text-lg font-bold text-gray-900 mb-4">MEDICAL CENTRE</h2>
        </div>

        <nav className="space-y-1">
          {navItems.map((item) => {
            const Icon = item.icon
            const isActive = pathname === item.href || 
              (item.href !== "/assistant" && pathname.startsWith(item.href + "/")) ||
              (item.href === "/assistant" && pathname === "/assistant")
            
            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "flex items-center gap-3 px-4 py-3 rounded-lg transition-colors",
                  isActive
                    ? "bg-blue-50 text-blue-600 font-medium"
                    : "text-gray-700 hover:bg-gray-50"
                )}
              >
                <Icon className={cn("h-5 w-5", isActive ? "text-blue-600" : "text-gray-500")} />
                <span className="text-sm">{item.label}</span>
              </Link>
            )
          })}
        </nav>

        <Link
          href="/login"
          className="flex items-center gap-3 px-4 py-3 rounded-lg text-red-600 hover:bg-red-50 transition-colors"
        >
          <LogOut className="h-5 w-5 text-red-600" />
          <span className="text-sm">Logout</span>
        </Link>
      </div>
    </aside>
  )
}
