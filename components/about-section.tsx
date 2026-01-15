import Link from "next/link"

export function AboutSection() {
  return (
    <section className="w-full max-w-2xl mx-auto border-t border-border py-6">
      <div className="flex items-start justify-between gap-6">
        <div className="flex-1">
          <h3 className="text-sm font-bold text-foreground mb-1">ABOUT US</h3>
          <p className="text-sm text-muted-foreground mb-3">Welcome to MEDICAL CENTRE</p>
          <p className="text-sm text-muted-foreground mb-4">
            At MEDICAL CENTRE, the essence of our service is simply you. We pride ourselves on the fact that our very
            foundation is built on patient satisfaction and not wasting time. We need you to feel that you have received
            the best care, advice and service.
          </p>
          <p className="text-sm font-medium text-foreground italic mb-4">"The patient always comes first!"</p>
          <div className="space-y-1">
            <Link href="tel:+94718074664" className="block text-sm text-[#0891b2] hover:underline">
              Contact: +94 71 807 4664
            </Link>
            <Link href="#" className="block text-sm text-[#0891b2] hover:underline">
              Visit Us: Kirwdawatta, Bambuwela, Kalutara
            </Link>
          </div>
        </div>
        <div className="w-40 h-28 flex-shrink-0">
          <img
            src="/cartoon-illustration-of-medical-staff-in-hospital-.jpg"
            alt="Medical staff illustration"
            className="w-full h-full object-cover rounded-lg"
          />
        </div>
      </div>
    </section>
  )
}
