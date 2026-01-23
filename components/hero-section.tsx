export function HeroSection() {
  return (
    <section className="relative w-full max-w-7xl mx-auto rounded-3xl overflow-hidden shadow-lg">
      
      {/* HERO IMAGE */}
      <img
        src="/landing-new.jpg"
        alt="Medical professionals providing care"
        className="w-full h-[500px] md:h-[600px] object-cover"
      />

      {/* CENTERED TEXT OVERLAY */}
      <div className="absolute inset-3 flex flex-col items-center justify-center bg-black/40 text-center px-20 md:px-12">
        <h1 className="text-4xl md:text-6xl font-extrabold text-white italic drop-shadow-lg mb-16 animate-fadeIn">
          Caring Beyond Cure
        </h1>
        <p className="text-white/100 text-bold md:text-lg max-w-2xl mb-12 drop-shadow-sm animate-fadeIn delay-100">
          Your health is our priority. We provide comprehensive medical services with a patient-centered approach.
        </p>
      </div>
    </section>
  )
}
