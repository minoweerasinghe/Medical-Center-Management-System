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
          <span className="text-xl font-bold text-[#0891b2]">MEDiCAL CENTRE</span>
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
          </nav>
        )}
      </div>
    </header>
  )
}

function MedicalLogo() {
  return (
    <img
      src="/images.jpeg"
      alt="Medical Center Logo"
      width={48}
      height={48}
      style={{ objectFit: "contain" }}
    />
  )
}
