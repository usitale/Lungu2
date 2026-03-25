import Image from "next/image";

const stats = [
  { value: "15+", label: "Years of Experience" },
  { value: "5,000+", label: "Satisfied Travellers" },
  { value: "20+", label: "Safari Destinations" },
  { value: "98%", label: "Satisfaction Rate" },
];

export default function About() {
  return (
    <section id="about" className="py-20 lg:py-28 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Image collage */}
          <div className="relative">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-4">
                <div className="relative h-56 sm:h-64 rounded-2xl overflow-hidden shadow-card">
                  <Image
                    src="https://images.unsplash.com/photo-1516426122078-c23e76319801?w=600&q=80"
                    alt="Lions in the African wilderness"
                    fill
                    className="object-cover hover:scale-105 transition-transform duration-500"
                    sizes="(max-width: 768px) 50vw, 25vw"
                  />
                </div>
                <div className="relative h-40 sm:h-48 rounded-2xl overflow-hidden shadow-card">
                  <Image
                    src="https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=600&q=80"
                    alt="Luxury safari lodge"
                    fill
                    className="object-cover hover:scale-105 transition-transform duration-500"
                    sizes="(max-width: 768px) 50vw, 25vw"
                  />
                </div>
              </div>
              <div className="space-y-4 pt-8">
                <div className="relative h-40 sm:h-48 rounded-2xl overflow-hidden shadow-card">
                  <Image
                    src="https://images.unsplash.com/photo-1493246507139-91e8fad9978e?w=600&q=80"
                    alt="Vast African savanna"
                    fill
                    className="object-cover hover:scale-105 transition-transform duration-500"
                    sizes="(max-width: 768px) 50vw, 25vw"
                  />
                </div>
                <div className="relative h-56 sm:h-64 rounded-2xl overflow-hidden shadow-card">
                  <Image
                    src="https://images.unsplash.com/photo-1504432842672-1a79f78e4084?w=600&q=80"
                    alt="Safari vehicle at dawn"
                    fill
                    className="object-cover hover:scale-105 transition-transform duration-500"
                    sizes="(max-width: 768px) 50vw, 25vw"
                  />
                </div>
              </div>
            </div>

            {/* Award badge */}
            <div className="absolute -bottom-4 -right-4 sm:-bottom-6 sm:-right-6 bg-safari-brown text-white rounded-2xl p-4 shadow-card-hover">
              <p className="text-safari-sand text-xs font-bold uppercase tracking-wider mb-1">Trusted Since</p>
              <p className="font-serif font-bold text-3xl leading-none">2009</p>
            </div>
          </div>

          {/* Content */}
          <div>
            <div className="section-divider mb-5" />
            <p className="text-safari-gold font-semibold text-sm uppercase tracking-widest mb-3">
              About Lungu Safari Tours
            </p>
            <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-safari-brown-dark mb-6 leading-tight">
              Africa&apos;s Wild Beauty,{" "}
              <span className="text-safari-gold">Your Way</span>
            </h2>

            <p className="text-gray-600 text-base sm:text-lg leading-relaxed mb-5">
              Founded in 2009 and based in the heart of Southern Africa, Lungu
              Safari Tours has been creating extraordinary wildlife experiences
              for travellers from around the world. We believe that a safari is
              not just a holiday — it is a life-changing encounter with the
              natural world.
            </p>

            <p className="text-gray-600 text-base sm:text-lg leading-relaxed mb-8">
              Our expert guides carry decades of bush experience and a genuine
              passion for Africa&apos;s ecosystems and wildlife. From intimate private
              game reserves to iconic national parks, we match every traveller
              with the perfect experience — whether you seek luxury, adventure,
              family fun, or a quiet communion with nature.
            </p>

            {/* Feature pills */}
            <div className="flex flex-wrap gap-3 mb-10">
              {[
                "SATIB Registered",
                "Eco-Certified",
                "Community Partner",
                "Award-Winning Guides",
              ].map((badge) => (
                <span
                  key={badge}
                  className="inline-flex items-center gap-1.5 bg-safari-sand-pale border border-safari-sand text-safari-brown text-sm font-semibold px-4 py-1.5 rounded-full"
                >
                  <svg className="w-3.5 h-3.5 text-safari-gold flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  {badge}
                </span>
              ))}
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              {stats.map((stat) => (
                <div key={stat.label} className="text-center p-4 rounded-xl bg-safari-sand-pale">
                  <p className="font-serif font-bold text-2xl sm:text-3xl text-safari-brown mb-1">
                    {stat.value}
                  </p>
                  <p className="text-xs text-gray-500 font-medium leading-tight">
                    {stat.label}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
