export function HeroSection() {
  return (
    <section className="relative w-full max-w-2xl mx-auto rounded-lg overflow-hidden">
      <img
        src="/female-doctor-in-white-coat-smiling-with-medical-t.jpg"
        alt="Medical professionals providing care"
        className="w-full h-[300px] object-cover"
      />
      <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-6">
        <h1 className="text-3xl font-bold text-white italic mb-2">Caring Beyond Cure</h1>
        <p className="text-white/90 text-sm">
          Your health is our priority. We provide comprehensive medical services with a patient-centered approach.
        </p>
      </div>
    </section>
  )
}
