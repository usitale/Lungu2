import Image from "next/image";
import { testimonials } from "@/lib/data";

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

export default function Testimonials() {
  return (
    <section className="py-20 lg:py-28 bg-safari-sand-pale">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-14">
          <div className="flex justify-center mb-5">
            <div className="section-divider" />
          </div>
          <p className="text-safari-gold font-semibold text-sm uppercase tracking-widest mb-3">
            What Travellers Say
          </p>
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-safari-brown-dark mb-4">
            Stories From the Bush
          </h2>
          <p className="text-gray-500 text-base sm:text-lg max-w-2xl mx-auto leading-relaxed">
            Real experiences from travellers who trusted us with their most
            precious moments.
          </p>
        </div>

        {/* Testimonials grid */}
        <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-6">
          {testimonials.map((t) => (
            <blockquote
              key={t.id}
              className="safari-card p-6 flex flex-col relative"
            >
              {/* Quote mark */}
              <span className="absolute top-4 right-5 text-safari-sand text-6xl font-serif leading-none select-none" aria-hidden="true">
                &ldquo;
              </span>

              {/* Stars */}
              <div className="mb-4">
                <StarRating rating={t.rating} />
              </div>

              {/* Review */}
              <p className="text-gray-600 text-sm leading-relaxed flex-1 mb-5 italic relative z-10">
                &ldquo;{t.review}&rdquo;
              </p>

              {/* Author */}
              <div className="flex items-center gap-3 pt-4 border-t border-gray-100">
                <div className="relative w-12 h-12 rounded-full overflow-hidden flex-shrink-0 ring-2 ring-safari-sand">
                  <Image
                    src={t.avatar}
                    alt={t.name}
                    fill
                    className="object-cover"
                    sizes="48px"
                  />
                </div>
                <div>
                  <p className="font-serif font-bold text-safari-brown-dark text-sm">
                    {t.name}
                  </p>
                  <div className="flex items-center gap-1.5 text-xs text-gray-400 mt-0.5">
                    <svg className="w-3 h-3 text-safari-gold" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                    </svg>
                    {t.country}
                    <span className="text-gray-300">•</span>
                    {t.tripTaken}
                  </div>
                </div>
              </div>
            </blockquote>
          ))}
        </div>

        {/* Review platform links */}
        <div className="mt-12 text-center">
          <p className="text-gray-500 text-sm mb-4">Read more reviews on</p>
          <div className="flex items-center justify-center gap-6 flex-wrap">
            {["TripAdvisor", "Google Reviews", "Booking.com"].map((platform) => (
              <span
                key={platform}
                className="text-safari-brown font-semibold text-sm bg-white border border-gray-200 px-5 py-2 rounded-full shadow-sm"
              >
                {platform} ⭐ 5.0
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
