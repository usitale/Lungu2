"use client";

// ============================================================
// Hero Section — Full-screen video background
// Video: autoplay, muted, loop, playsinline for mobile
// Poster image shown while video loads or on mobile
// ============================================================

export default function Hero() {
  const scrollToSection = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section id="home" className="hero-video-container" aria-label="Hero section">
      {/*
        ── Background Video ────────────────────────────────────
        Replace the src with your actual video file path.
        Recommended: MP4 (H.264), max 10MB, 1920x1080, 30fps.
        For production, host on CDN (e.g. Cloudflare, AWS S3).

        Poster image: shown on mobile/slow connections before video loads.
        Use a high-quality hero landscape image as the poster.
        ─────────────────────────────────────────────────────
      */}
      <video
        autoPlay
        muted
        loop
        playsInline
        className="absolute inset-0 w-full h-full object-cover object-center"
        poster="https://images.unsplash.com/photo-1516426122078-c23e76319801?w=1920&q=85"
        aria-hidden="true"
        preload="metadata"
      >
        {/*
          Add your video sources here:
          <source src="/videos/hero-safari.mp4" type="video/mp4" />
          <source src="/videos/hero-safari.webm" type="video/webm" />
        */}
        {/* Fallback: poster image is shown when no video source is provided */}
      </video>

      {/* Gradient overlay for text readability */}
      <div className="hero-overlay" aria-hidden="true" />

      {/* Hero content */}
      <div className="relative z-10 flex flex-col items-center justify-center h-full text-center px-4 sm:px-6">
        {/* Tagline badge */}
        <div className="animate-fade-up mb-4">
          <span className="inline-flex items-center gap-2 bg-safari-gold/20 border border-safari-gold/40 text-safari-sand text-xs sm:text-sm font-semibold px-4 py-1.5 rounded-full backdrop-blur-sm tracking-wider uppercase">
            <span className="w-1.5 h-1.5 rounded-full bg-safari-gold animate-pulse-slow" />
            Southern Africa&apos;s Premier Safari Company
          </span>
        </div>

        {/* Main headline */}
        <h1 className="animate-fade-up-delay-1 text-white font-serif font-bold text-4xl sm:text-5xl md:text-6xl lg:text-7xl text-shadow-lg max-w-4xl leading-tight mb-4">
          Experience Africa&apos;s Wild{" "}
          <span className="text-safari-sand italic">Heart</span>
        </h1>

        {/* Subheadline */}
        <p className="animate-fade-up-delay-2 text-white/85 text-base sm:text-lg md:text-xl max-w-2xl leading-relaxed mb-8 text-shadow">
          Unforgettable safari adventures, luxury accommodation, and guided
          wildlife experiences crafted for those who seek the extraordinary.
        </p>

        {/* CTA buttons */}
        <div className="animate-fade-up-delay-3 flex flex-col sm:flex-row items-center gap-4 w-full max-w-lg sm:max-w-none sm:justify-center">
          <button
            onClick={() => scrollToSection("contact")}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-safari-gold hover:bg-safari-gold-light text-white font-bold text-base px-8 py-4 rounded-full transition-all duration-200 shadow-lg hover:shadow-premium hover:-translate-y-0.5 focus:outline-none focus:ring-2 focus:ring-safari-gold focus:ring-offset-2 focus:ring-offset-transparent"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
            Book a Safari
          </button>

          <button
            onClick={() => scrollToSection("accommodation")}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 border-2 border-white/70 hover:border-white text-white font-bold text-base px-8 py-4 rounded-full transition-all duration-200 hover:bg-white/15 backdrop-blur-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-transparent"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
            </svg>
            View Accommodation
          </button>

          <button
            onClick={() => {
              // ── WhatsApp Chat ─────────────────────────────
              // Replace with your WhatsApp number (including country code)
              const whatsappNumber = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || "260971234567";
              const message = "Hello! I'd like to enquire about a safari booking.";
              window.open(
                `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`,
                "_blank",
                "noopener,noreferrer"
              );
            }}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-green-500 hover:bg-green-400 text-white font-bold text-base px-8 py-4 rounded-full transition-all duration-200 shadow-lg hover:-translate-y-0.5 focus:outline-none focus:ring-2 focus:ring-green-400 focus:ring-offset-2 focus:ring-offset-transparent"
          >
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
            </svg>
            Chat With Us
          </button>
        </div>

        {/* Trust indicators */}
        <div className="animate-fade-up-delay-3 flex flex-wrap items-center justify-center gap-6 mt-10">
          {[
            { icon: "⭐", text: "5-Star Rated" },
            { icon: "🏆", text: "Award-Winning" },
            { icon: "👥", text: "5,000+ Happy Travelers" },
          ].map((item) => (
            <div key={item.text} className="flex items-center gap-2 text-white/80 text-sm font-medium">
              <span className="text-base">{item.icon}</span>
              <span>{item.text}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Scroll cue */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 scroll-cue">
        <button
          onClick={() => scrollToSection("about")}
          className="flex flex-col items-center gap-1 text-white/60 hover:text-white/90 transition-colors"
          aria-label="Scroll down"
        >
          <span className="text-xs tracking-widest uppercase font-medium">Scroll</span>
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </button>
      </div>
    </section>
  );
}
