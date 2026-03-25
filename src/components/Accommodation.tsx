"use client";

import Image from "next/image";
import { accommodations } from "@/lib/data";

function StarRating({ rating }: { rating: number }) {
  return (
    <div className="flex items-center gap-0.5">
      {[1, 2, 3, 4, 5].map((star) => (
        <svg
          key={star}
          className={`w-4 h-4 ${star <= rating ? "star-filled" : "star-empty"}`}
          fill="currentColor"
          viewBox="0 0 20 20"
        >
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      ))}
    </div>
  );
}

export default function Accommodation() {
  const scrollToBooking = (accName: string) => {
    const el = document.getElementById("contact");
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
      setTimeout(() => {
        const serviceSelect = document.getElementById("serviceType") as HTMLSelectElement | null;
        const packageSelect = document.getElementById("selectedPackage") as HTMLSelectElement | null;
        if (serviceSelect) serviceSelect.value = "accommodation";
        if (packageSelect) {
          const acc = accommodations.find((a) => a.name === accName);
          if (acc) packageSelect.value = acc.id;
        }
      }, 600);
    }
  };

  return (
    <section id="accommodation" className="py-20 lg:py-28 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-14">
          <div className="flex justify-center mb-5">
            <div className="section-divider" />
          </div>
          <p className="text-safari-gold font-semibold text-sm uppercase tracking-widest mb-3">
            Where You Stay
          </p>
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-safari-brown-dark mb-4">
            Safari Accommodation
          </h2>
          <p className="text-gray-500 text-base sm:text-lg max-w-2xl mx-auto leading-relaxed">
            Sleep in the heart of the wilderness. Our handpicked lodges, tented
            camps, and villas blend luxury with the raw beauty of nature.
          </p>
        </div>

        {/* Accommodation cards */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-4 gap-7">
          {accommodations.map((acc) => (
            <article key={acc.id} className="safari-card group flex flex-col relative">
              {/* Badge */}
              {acc.badge && (
                <div className="absolute top-4 left-4 z-10">
                  <span className="bg-safari-gold text-white text-xs font-bold px-3 py-1 rounded-full shadow-md">
                    {acc.badge}
                  </span>
                </div>
              )}

              {/* Image */}
              <div className="relative h-52 overflow-hidden">
                <Image
                  src={acc.image}
                  alt={acc.name}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />

                {/* Type chip */}
                <div className="absolute top-4 right-4">
                  <span className="bg-safari-brown/80 backdrop-blur-sm text-white text-xs font-semibold px-3 py-1 rounded-full">
                    {acc.type}
                  </span>
                </div>
              </div>

              {/* Content */}
              <div className="p-5 flex flex-col flex-1">
                <div className="flex items-start justify-between gap-2 mb-2">
                  <h3 className="font-serif font-bold text-lg text-safari-brown-dark leading-tight">
                    {acc.name}
                  </h3>
                  <StarRating rating={acc.rating} />
                </div>

                <p className="text-gray-500 text-sm leading-relaxed mb-4 flex-1">
                  {acc.description}
                </p>

                {/* Amenities */}
                <div className="mb-5">
                  <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2">
                    Amenities
                  </p>
                  <div className="flex flex-wrap gap-1.5">
                    {acc.amenities.slice(0, 4).map((amenity) => (
                      <span
                        key={amenity}
                        className="bg-safari-sand-pale text-safari-brown text-xs font-medium px-2.5 py-1 rounded-full border border-safari-sand/40"
                      >
                        {amenity}
                      </span>
                    ))}
                    {acc.amenities.length > 4 && (
                      <span className="text-safari-gold text-xs font-medium px-2.5 py-1">
                        +{acc.amenities.length - 4} more
                      </span>
                    )}
                  </div>
                </div>

                {/* Price + CTA */}
                <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                  <div>
                    <p className="text-xs text-gray-400 font-medium">From</p>
                    <p className="font-serif font-bold text-2xl text-safari-brown">
                      ${acc.pricePerNight}
                    </p>
                    <p className="text-xs text-gray-400">per night</p>
                  </div>
                  <button
                    onClick={() => scrollToBooking(acc.name)}
                    className="inline-flex items-center gap-1.5 bg-safari-green text-white font-bold text-sm px-5 py-2.5 rounded-full hover:bg-safari-green-light transition-all duration-200 shadow-md"
                  >
                    Reserve Now
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </button>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
