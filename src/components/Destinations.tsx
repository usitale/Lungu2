import Image from "next/image";
import { destinations } from "@/lib/data";

export default function Destinations() {
  return (
    <section id="destinations" className="py-20 lg:py-28 bg-safari-sand-pale">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-14">
          <div className="flex justify-center mb-5">
            <div className="section-divider" />
          </div>
          <p className="text-safari-gold font-semibold text-sm uppercase tracking-widest mb-3">
            Where We Go
          </p>
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-safari-brown-dark mb-4">
            Featured Destinations
          </h2>
          <p className="text-gray-500 text-base sm:text-lg max-w-2xl mx-auto leading-relaxed">
            Discover the most breathtaking wilderness areas, national parks,
            and natural wonders of Southern and East Africa.
          </p>
        </div>

        {/* Destinations grid — first card is large */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {destinations.map((dest, index) => (
            <article
              key={dest.id}
              className={`safari-card group relative overflow-hidden cursor-default ${
                index === 0 ? "md:col-span-2 lg:col-span-1 lg:row-span-2" : ""
              }`}
            >
              <div className={`relative ${index === 0 ? "h-80 md:h-96 lg:h-full lg:min-h-[500px]" : "h-56"} overflow-hidden`}>
                <Image
                  src={dest.image}
                  alt={dest.name}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-700"
                  sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                />
                {/* Gradient overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/20 to-transparent" />

                {/* Content overlay */}
                <div className="absolute bottom-0 left-0 right-0 p-6">
                  <div className="flex items-center gap-2 mb-2">
                    <svg className="w-4 h-4 text-safari-sand" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                    </svg>
                    <span className="text-safari-sand text-sm font-medium">{dest.country}</span>
                  </div>
                  <h3 className="font-serif font-bold text-xl sm:text-2xl text-white mb-2">
                    {dest.name}
                  </h3>
                  <p className={`text-white/80 text-sm leading-relaxed ${index === 0 ? "block" : "hidden group-hover:block transition-all"} mb-3`}>
                    {dest.description}
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {dest.tags.map((tag) => (
                      <span
                        key={tag}
                        className="bg-white/15 backdrop-blur-sm text-white text-xs font-medium px-3 py-1 rounded-full border border-white/20"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </article>
          ))}
        </div>

        {/* Bottom banner */}
        <div className="mt-12 bg-safari-brown rounded-2xl overflow-hidden">
          <div className="relative p-8 sm:p-10 text-center">
            <div className="absolute inset-0 bg-gradient-to-r from-safari-brown-dark to-safari-brown opacity-80" />
            <div className="relative z-10">
              <h3 className="font-serif font-bold text-2xl sm:text-3xl text-white mb-3">
                Not Sure Which Destination Is Right for You?
              </h3>
              <p className="text-white/75 text-base mb-6 max-w-xl mx-auto">
                Our expert safari consultants will help you choose the perfect
                destination based on your interests, budget, and travel dates.
              </p>
              <button
                onClick={() => document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" })}
                className="inline-flex items-center gap-2 bg-safari-gold hover:bg-safari-gold-light text-white font-bold px-8 py-3.5 rounded-full transition-all duration-200 shadow-md"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                </svg>
                Talk to an Expert
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
