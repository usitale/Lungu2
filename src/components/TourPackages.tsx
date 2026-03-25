"use client";

import Image from "next/image";
import { tourPackages } from "@/lib/data";

export default function TourPackages() {
  const scrollToBooking = (packageName: string) => {
    const el = document.getElementById("contact");
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
      // Pre-select the package after scroll
      setTimeout(() => {
        const select = document.getElementById("selectedPackage") as HTMLSelectElement | null;
        if (select) {
          const pkg = tourPackages.find((p) => p.name === packageName);
          if (pkg) select.value = pkg.id;
        }
      }, 600);
    }
  };

  return (
    <section id="packages" className="py-20 lg:py-28 bg-safari-sand-pale">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-14">
          <div className="flex justify-center mb-5">
            <div className="section-divider" />
          </div>
          <p className="text-safari-gold font-semibold text-sm uppercase tracking-widest mb-3">
            Safari Experiences
          </p>
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-safari-brown-dark mb-4">
            Tour Packages & Safaris
          </h2>
          <p className="text-gray-500 text-base sm:text-lg max-w-2xl mx-auto leading-relaxed">
            From weekend escapes to week-long wilderness adventures, every
            Lungu Safari Tours package is thoughtfully crafted for an
            unforgettable experience.
          </p>
        </div>

        {/* Package cards grid */}
        <div className="grid sm:grid-cols-2 xl:grid-cols-3 gap-7">
          {tourPackages.map((pkg) => (
            <article
              key={pkg.id}
              className={`safari-card group relative flex flex-col ${
                pkg.popular ? "ring-2 ring-safari-gold ring-offset-2" : ""
              }`}
            >
              {/* Badge */}
              {pkg.badge && (
                <div className="absolute top-4 left-4 z-10">
                  <span
                    className={`text-xs font-bold px-3 py-1 rounded-full shadow-md ${
                      pkg.popular
                        ? "bg-safari-gold text-white"
                        : "bg-safari-brown text-safari-sand"
                    }`}
                  >
                    {pkg.badge}
                  </span>
                </div>
              )}

              {/* Image */}
              <div className="relative h-52 overflow-hidden">
                <Image
                  src={pkg.image}
                  alt={pkg.name}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                  sizes="(max-width: 640px) 100vw, (max-width: 1280px) 50vw, 33vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />

                {/* Duration chip */}
                <div className="absolute bottom-4 left-4 flex items-center gap-2">
                  <span className="bg-white/90 backdrop-blur-sm text-safari-brown text-xs font-bold px-3 py-1 rounded-full">
                    {pkg.duration}
                  </span>
                  <span className="bg-white/90 backdrop-blur-sm text-safari-brown text-xs font-bold px-3 py-1 rounded-full">
                    {pkg.groupSize}
                  </span>
                </div>
              </div>

              {/* Content */}
              <div className="p-5 flex flex-col flex-1">
                <h3 className="font-serif font-bold text-xl text-safari-brown-dark mb-2 group-hover:text-safari-brown transition-colors">
                  {pkg.name}
                </h3>
                <p className="text-gray-500 text-sm leading-relaxed mb-4 flex-1">
                  {pkg.description}
                </p>

                {/* Highlights */}
                <ul className="space-y-1.5 mb-5">
                  {pkg.highlights.slice(0, 3).map((highlight) => (
                    <li key={highlight} className="flex items-start gap-2 text-sm text-gray-600">
                      <svg className="w-4 h-4 text-safari-gold flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                      {highlight}
                    </li>
                  ))}
                </ul>

                {/* Price + CTA */}
                <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                  <div>
                    <p className="text-xs text-gray-400 font-medium">From</p>
                    <p className="font-serif font-bold text-2xl text-safari-brown">
                      ${pkg.price.toLocaleString()}
                    </p>
                    <p className="text-xs text-gray-400">per person</p>
                  </div>
                  <button
                    onClick={() => scrollToBooking(pkg.name)}
                    className={`inline-flex items-center gap-1.5 font-bold text-sm px-5 py-2.5 rounded-full transition-all duration-200 ${
                      pkg.popular
                        ? "bg-safari-gold text-white hover:bg-safari-gold-light shadow-md"
                        : "bg-safari-brown text-white hover:bg-safari-brown-dark"
                    }`}
                  >
                    Book Now
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </button>
                </div>
              </div>
            </article>
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="text-center mt-12">
          <p className="text-gray-500 text-sm mb-4">
            Can&apos;t find what you&apos;re looking for? We offer fully custom safari packages.
          </p>
          <button
            onClick={() => document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" })}
            className="btn-outline"
          >
            Request a Custom Safari
          </button>
        </div>
      </div>
    </section>
  );
}
