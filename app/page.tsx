import { MedicalHeader } from "@/components/medical-header"
import { HeroSection } from "@/components/hero-section"
import { QueueCounter } from "@/components/queue-counter"
import { FeatureCard } from "@/components/feature-card"
import { AboutSection } from "@/components/about-section"

export default function Home() {
  return (
    <div className="min-h-screen bg-background">
      <MedicalHeader variant="home" />
      <main className="container mx-auto px-4 py-8">
        <div className="flex flex-col items-center gap-6">
          <HeroSection />

          <QueueCounter count={15} />

          <FeatureCard
            title="Patient Registration"
            description="Easily register as a new patient and access our services."
            buttonText="Register"
            imageSrc="/patient-registration.png"
            imageAlt="Patient registration illustration"
          />

          <FeatureCard
            title="Doctor Availability"
            description="Get to know about doctor availability and save your time"
            buttonText="Click Here"
            imageSrc="/doctor-availability.png"
            imageAlt="Doctor availability illustration"
          />

          <AboutSection />
        </div>
      </main>
    </div>
  )
}
