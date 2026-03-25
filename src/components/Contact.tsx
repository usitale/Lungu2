import BookingForm from "@/components/BookingForm";

const contactInfo = [
  {
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
      </svg>
    ),
    label: "Phone / Call Us",
    value: "+260 97 123 4567",  // Replace with real phone number
    href: "tel:+260971234567",
  },
  {
    icon: (
      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
      </svg>
    ),
    label: "WhatsApp",
    value: "+260 97 123 4567",  // Replace with real WhatsApp number
    href: "https://wa.me/260971234567",
  },
  {
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
      </svg>
    ),
    label: "Email Us",
    value: "bookings@lungusafaritours.com",  // Replace with real email
    href: "mailto:bookings@lungusafaritours.com",
  },
  {
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
      </svg>
    ),
    label: "Our Office",
    value: "123 Safari Way, Lusaka, Zambia",  // Replace with real address
    href: "#",
  },
];

export default function Contact() {
  return (
    <section id="contact" className="py-20 lg:py-28 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-14">
          <div className="flex justify-center mb-5">
            <div className="section-divider" />
          </div>
          <p className="text-safari-gold font-semibold text-sm uppercase tracking-widest mb-3">
            Ready to Book?
          </p>
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-safari-brown-dark mb-4">
            Book Your Safari
          </h2>
          <p className="text-gray-500 text-base sm:text-lg max-w-2xl mx-auto leading-relaxed">
            Fill out the form below and we&apos;ll get back to you within 24 hours to
            confirm your booking. Or reach out directly — we love talking safaris!
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-10 lg:gap-14">
          {/* Contact sidebar */}
          <div className="lg:col-span-1 space-y-6">
            {/* Contact info cards */}
            <div className="space-y-4">
              {contactInfo.map((item) => (
                <a
                  key={item.label}
                  href={item.href}
                  target={item.href.startsWith("http") ? "_blank" : undefined}
                  rel={item.href.startsWith("http") ? "noopener noreferrer" : undefined}
                  className="flex items-start gap-4 p-4 bg-safari-sand-pale rounded-xl hover:bg-safari-sand/30 transition-colors group"
                >
                  <div className="w-10 h-10 rounded-full bg-safari-gold/15 text-safari-gold flex items-center justify-center flex-shrink-0 group-hover:bg-safari-gold/25 transition-colors">
                    {item.icon}
                  </div>
                  <div>
                    <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-0.5">
                      {item.label}
                    </p>
                    <p className="text-safari-brown-dark font-semibold text-sm">
                      {item.value}
                    </p>
                  </div>
                </a>
              ))}
            </div>

            {/* Office hours */}
            <div className="bg-safari-brown-dark rounded-2xl p-6 text-white">
              <h4 className="font-serif font-bold text-lg mb-4">Office Hours</h4>
              <div className="space-y-2 text-sm">
                {[
                  { day: "Monday – Friday", hours: "08:00 – 18:00" },
                  { day: "Saturday", hours: "09:00 – 16:00" },
                  { day: "Sunday", hours: "10:00 – 14:00" },
                ].map((row) => (
                  <div key={row.day} className="flex justify-between">
                    <span className="text-white/60">{row.day}</span>
                    <span className="font-semibold text-safari-sand">{row.hours}</span>
                  </div>
                ))}
              </div>
              <div className="mt-4 pt-4 border-t border-white/10">
                <p className="text-xs text-white/50">All times are CAT (UTC+2)</p>
                <p className="text-xs text-safari-gold mt-1">
                  Emergency line available 24/7 for active guests
                </p>
              </div>
            </div>

            {/* Social links */}
            <div>
              <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-3">
                Follow Us
              </p>
              <div className="flex gap-3">
                {[
                  { name: "Facebook", href: "#", icon: "f" },
                  { name: "Instagram", href: "#", icon: "in" },
                  { name: "Twitter/X", href: "#", icon: "x" },
                  { name: "YouTube", href: "#", icon: "yt" },
                ].map((social) => (
                  <a
                    key={social.name}
                    href={social.href}
                    aria-label={social.name}
                    className="w-10 h-10 rounded-full bg-safari-sand-pale border border-safari-sand/40 hover:bg-safari-brown hover:border-safari-brown text-safari-brown hover:text-white flex items-center justify-center text-xs font-bold transition-all"
                  >
                    {social.icon}
                  </a>
                ))}
              </div>
            </div>
          </div>

          {/* Booking form */}
          <div className="lg:col-span-2">
            <BookingForm />
          </div>
        </div>
      </div>
    </section>
  );
}
