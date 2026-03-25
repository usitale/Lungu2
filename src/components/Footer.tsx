"use client";

const quickLinks = [
  { label: "Home", href: "#home" },
  { label: "About Us", href: "#about" },
  { label: "Safari Packages", href: "#packages" },
  { label: "Accommodation", href: "#accommodation" },
  { label: "Destinations", href: "#destinations" },
  { label: "Gallery", href: "#gallery" },
  { label: "FAQ", href: "#faq" },
  { label: "Contact & Book", href: "#contact" },
];

const services = [
  "Wildlife Safaris",
  "Family Safari Packages",
  "Luxury Safari Experiences",
  "Weekend Getaways",
  "Group Adventure Tours",
  "Lodge & Camp Bookings",
  "Custom Itineraries",
  "Airport Transfers",
];

export default function Footer() {
  const scrollTo = (href: string) => {
    const el = document.querySelector(href);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <footer className="bg-safari-brown-dark text-white">
      {/* Newsletter strip */}
      <div className="bg-safari-brown border-b border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex flex-col sm:flex-row items-center gap-6 sm:justify-between">
            <div>
              <h3 className="font-serif font-bold text-xl mb-1">Stay Inspired</h3>
              <p className="text-white/60 text-sm">Get safari tips, seasonal specials, and wildlife stories delivered to your inbox.</p>
            </div>
            <form
              onSubmit={(e) => { e.preventDefault(); alert("Thank you for subscribing! (Connect to your email provider)"); }}
              className="flex w-full sm:w-auto gap-2"
            >
              <input
                type="email"
                placeholder="your@email.com"
                required
                className="flex-1 sm:w-64 bg-white/10 border border-white/20 text-white placeholder-white/40 rounded-full px-5 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-safari-gold focus:border-transparent"
              />
              <button
                type="submit"
                className="bg-safari-gold hover:bg-safari-gold-light text-white font-semibold px-5 py-2.5 rounded-full text-sm transition-all whitespace-nowrap"
              >
                Subscribe
              </button>
            </form>
          </div>
        </div>
      </div>

      {/* Main footer content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Brand column */}
          <div className="lg:col-span-1">
            <div className="flex items-center gap-3 mb-5">
              <div className="w-11 h-11 rounded-full bg-safari-gold flex items-center justify-center shadow-md">
                <span className="text-white font-serif font-bold text-xl">L</span>
              </div>
              <div>
                <p className="font-serif font-bold text-lg leading-tight">Lungu Safari Tours</p>
                <p className="text-safari-sand text-xs tracking-widest uppercase">Southern Africa</p>
              </div>
            </div>
            <p className="text-white/60 text-sm leading-relaxed mb-5">
              Creating unforgettable wildlife experiences across Southern and
              East Africa since 2009. Trusted by thousands of travellers worldwide.
            </p>

            {/* Certifications */}
            <div className="flex flex-wrap gap-2">
              {["SATIB", "ZNTB", "Eco-Cert"].map((cert) => (
                <span
                  key={cert}
                  className="text-xs font-bold px-3 py-1 rounded-full border border-white/20 text-white/60"
                >
                  {cert}
                </span>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-serif font-bold text-base mb-5 text-white">Quick Links</h4>
            <ul className="space-y-2.5">
              {quickLinks.map((link) => (
                <li key={link.label}>
                  <button
                    onClick={() => scrollTo(link.href)}
                    className="text-white/60 hover:text-safari-sand text-sm transition-colors flex items-center gap-1.5 group"
                  >
                    <svg className="w-3 h-3 text-safari-gold opacity-0 group-hover:opacity-100 transition-opacity flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
                    </svg>
                    {link.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h4 className="font-serif font-bold text-base mb-5 text-white">Our Services</h4>
            <ul className="space-y-2.5">
              {services.map((service) => (
                <li key={service}>
                  <button
                    onClick={() => scrollTo("#packages")}
                    className="text-white/60 hover:text-safari-sand text-sm transition-colors flex items-center gap-1.5 group text-left"
                  >
                    <svg className="w-3 h-3 text-safari-gold flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
                    </svg>
                    {service}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-serif font-bold text-base mb-5 text-white">Contact Us</h4>
            <ul className="space-y-4 text-sm">
              <li>
                <p className="text-white/40 text-xs uppercase tracking-wider mb-0.5">Address</p>
                <p className="text-white/70">
                  123 Safari Way<br />
                  Lusaka, Zambia {/* Replace with real address */}
                </p>
              </li>
              <li>
                <p className="text-white/40 text-xs uppercase tracking-wider mb-0.5">Phone</p>
                <a href="tel:+260971234567" className="text-safari-sand hover:text-white transition-colors">
                  +260 97 123 4567 {/* Replace with real phone */}
                </a>
              </li>
              <li>
                <p className="text-white/40 text-xs uppercase tracking-wider mb-0.5">Email</p>
                <a href="mailto:bookings@lungusafaritours.com" className="text-safari-sand hover:text-white transition-colors break-all">
                  bookings@lungusafaritours.com {/* Replace with real email */}
                </a>
              </li>
              <li>
                <p className="text-white/40 text-xs uppercase tracking-wider mb-0.5">WhatsApp</p>
                <a
                  href="https://wa.me/260971234567"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-safari-sand hover:text-white transition-colors"
                >
                  +260 97 123 4567
                </a>
              </li>
            </ul>

            {/* Social icons */}
            <div className="mt-6">
              <p className="text-white/40 text-xs uppercase tracking-wider mb-3">Follow Us</p>
              <div className="flex gap-3">
                {[
                  { label: "Facebook", href: "#" },
                  { label: "Instagram", href: "#" },
                  { label: "YouTube", href: "#" },
                  { label: "Twitter", href: "#" },
                ].map((s) => (
                  <a
                    key={s.label}
                    href={s.href}
                    aria-label={s.label}
                    className="w-9 h-9 rounded-full bg-white/10 hover:bg-safari-gold flex items-center justify-center text-white/60 hover:text-white text-xs font-bold transition-all"
                  >
                    {s.label.charAt(0)}
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-5 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-white/40 text-xs text-center sm:text-left">
            &copy; {new Date().getFullYear()} Lungu Safari Tours. All rights reserved.
            Built with care for extraordinary adventures.
          </p>
          <div className="flex items-center gap-4 text-xs text-white/40">
            <a href="#" className="hover:text-white/70 transition-colors">Privacy Policy</a>
            <span>·</span>
            <a href="#" className="hover:text-white/70 transition-colors">Terms & Conditions</a>
            <span>·</span>
            <a href="#" className="hover:text-white/70 transition-colors">Sitemap</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
