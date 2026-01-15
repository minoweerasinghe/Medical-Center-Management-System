import Link from "next/link"
import { Button } from "@/components/ui/button"

interface MedicalHeaderProps {
  variant?: "login" | "home" | "register"
}

export function MedicalHeader({ variant = "home" }: MedicalHeaderProps) {
  return (
    <header className="border-b border-border bg-background">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <MedicalLogo />
          <span className="text-xl font-bold text-[#0891b2]">MEDICAL CENTRE</span>
        </div>

        {variant === "register" ? (
          <nav className="flex items-center gap-6">
            <Link href="/" className="text-foreground hover:text-[#0891b2] transition-colors">
              Home
            </Link>
            <Link href="/about" className="text-foreground hover:text-[#0891b2] transition-colors">
              About Us
            </Link>
            <Link href="/login" className="text-foreground hover:text-[#0891b2] transition-colors font-medium">
              Login
            </Link>
          </nav>
        ) : variant === "login" ? (
          <nav className="flex items-center gap-6">
            <Link href="/" className="text-foreground hover:text-[#0891b2] transition-colors">
              Home
            </Link>
            <Link href="/about" className="text-foreground hover:text-[#0891b2] transition-colors">
              About Us
            </Link>
            <Button variant="outline" className="rounded-md bg-transparent">
              Sign Up
            </Button>
          </nav>
        ) : (
          <nav className="flex items-center gap-6">
            <Link href="/" className="text-foreground hover:text-[#0891b2] transition-colors">
              Home
            </Link>
            <Link href="/login" className="text-foreground hover:text-[#0891b2] transition-colors">
              Login
            </Link>
            <Link href="/doctor-availability" className="text-foreground hover:text-[#0891b2] transition-colors">
              Doctor
            </Link>
            <Button className="rounded-md bg-[#0891b2] hover:bg-[#0e7490] text-white">Get Queue Token</Button>
          </nav>
        )}
      </div>
    </header>
  )
}

function MedicalLogo() {
  return (
    <svg width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
      {/* Green cross */}
      <rect x="8" y="16" width="6" height="20" fill="#22c55e" />
      <rect x="2" y="22" width="18" height="6" fill="#22c55e" />
      {/* Red cross */}
      <rect x="28" y="8" width="6" height="20" fill="#ef4444" />
      <rect x="22" y="14" width="18" height="6" fill="#ef4444" />
      {/* Connecting line */}
      <rect x="14" y="30" width="20" height="4" fill="#0891b2" transform="rotate(-45 14 30)" />
    </svg>
  )
}
