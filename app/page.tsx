import { MedicalHeader } from "@/components/medical-header"
import { HeroSection } from "@/components/hero-section"
import { QueueCounter } from "@/components/queue-counter"
import { FeatureCard } from "@/components/feature-card"
import { AboutSection } from "@/components/about-section"

export default function Home() {
  return (
    <div className="min-h-screen bg-slate-50">
      <MedicalHeader variant="home" />

      <main className="max-w-7xl mx-auto px-4">

        {/* HERO SECTION (moderate size, under header) */}
        <section className="mt-3">
          <HeroSection />
        </section>

        {/* QUEUE COUNTER (beautiful & normal flow) */}
        <section className="mt-8 flex justify-center">
          <QueueCounter count={15} />
        </section>

        {/* FEATURE CARDS */}
        <section className="mt-18 grid grid-cols-1 md:grid-cols-3 gap-10">

          <FeatureCard
            title="Login"
            description="Securely login and access your medical profile."
            buttonText="Login"
            imageSrc="/login_front.png"
            imageAlt="Login illustration"
          />

          <FeatureCard
            title="Patient Registration"
            description="Register easily and start managing appointments."
            buttonText="Register"
            imageSrc="/patient-registration.png"
            imageAlt="Patient registration illustration"
          />

          <FeatureCard
            title="Doctor Availability"
            description="Check doctor availability and reduce waiting time."
            buttonText="Check Availability"
            imageSrc="/doctor-availability.png"
            imageAlt="Doctor availability illustration"
          />

        </section>

        {/* ABOUT SECTION */}
        <section className="mt-12 mb-12">
          <div className="bg-white rounded-2xl shadow-md p-10">
            <AboutSection />
          </div>
        </section>

      </main>
    </div>
  )
}
