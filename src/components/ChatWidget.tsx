"use client";

// ============================================================
// Floating Chat Widget
// Provides quick access to:
//   - WhatsApp chat
//   - Facebook Messenger
//   - Live chat (Tawk.to or similar)
//   - Phone call
// ============================================================

import { useState } from "react";

export default function ChatWidget() {
  const [isOpen, setIsOpen] = useState(false);

  // ── Configure these in .env.local ────────────────────────
  // NEXT_PUBLIC_WHATSAPP_NUMBER=260971234567
  // NEXT_PUBLIC_MESSENGER_PAGE_ID=your_page_id
  const whatsappNumber = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || "260971234567";
  const messengerPageId = process.env.NEXT_PUBLIC_MESSENGER_PAGE_ID || "";
  // ──────────────────────────────────────────────────────────

  const chatOptions = [
    {
      id: "whatsapp",
      label: "Chat on WhatsApp",
      sublabel: "Typically replies within minutes",
      color: "bg-green-500 hover:bg-green-400",
      textColor: "text-green-600",
      bgLight: "bg-green-50",
      icon: (
        <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
        </svg>
      ),
      onClick: () => {
        const message = "Hello! I'd like to enquire about a safari booking.";
        window.open(
          `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`,
          "_blank",
          "noopener,noreferrer"
        );
      },
    },
    {
      id: "messenger",
      label: "Facebook Messenger",
      sublabel: "Chat on our Facebook page",
      color: "bg-[#0084FF] hover:bg-blue-400",
      textColor: "text-blue-600",
      bgLight: "bg-blue-50",
      icon: (
        <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
          <path d="M12 0C5.373 0 0 4.974 0 11.111c0 3.498 1.744 6.614 4.469 8.654V24l4.088-2.242c1.092.3 2.246.464 3.443.464 6.627 0 12-4.975 12-11.111S18.627 0 12 0zm1.191 14.963l-3.055-3.26-5.963 3.26L10.732 8l3.131 3.26L19.752 8l-6.561 6.963z" />
        </svg>
      ),
      onClick: () => {
        if (messengerPageId) {
          window.open(
            `https://m.me/${messengerPageId}`,
            "_blank",
            "noopener,noreferrer"
          );
        } else {
          // Fallback: open Facebook page
          // Replace with your actual Facebook page URL
          window.open("https://facebook.com/LunguSafariTours", "_blank", "noopener,noreferrer");
        }
      },
    },
    {
      id: "livechat",
      label: "Live Chat",
      sublabel: "Chat with our team now",
      color: "bg-safari-brown hover:bg-safari-brown-dark",
      textColor: "text-safari-brown",
      bgLight: "bg-safari-sand-pale",
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
        </svg>
      ),
      onClick: () => {
        // ── Tawk.to: trigger chat window to open ──────────────
        // Uncomment when Tawk.to script is loaded in layout.tsx:
        //
        // if (window.Tawk_API && typeof window.Tawk_API.toggle === 'function') {
        //   window.Tawk_API.toggle();
        // }
        //
        // Fallback: scroll to contact form
        document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" });
        setIsOpen(false);
      },
    },
    {
      id: "phone",
      label: "Call Us",
      sublabel: "+260 97 123 4567",  // Replace with real number
      color: "bg-safari-gold hover:bg-safari-gold-light",
      textColor: "text-safari-gold",
      bgLight: "bg-amber-50",
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
        </svg>
      ),
      onClick: () => {
        window.location.href = `tel:+260971234567`; // Replace with real phone
      },
    },
  ];

  return (
    <div className="chat-widget-container" role="region" aria-label="Chat support options">
      {/* Options panel */}
      {isOpen && (
        <div className="mb-4 w-72 bg-white rounded-2xl shadow-card-hover border border-gray-100 overflow-hidden animate-fade-up">
          {/* Header */}
          <div className="bg-safari-brown-dark px-4 py-3">
            <p className="text-white font-serif font-bold text-base">Lungu Safari Tours</p>
            <div className="flex items-center gap-1.5 mt-0.5">
              <span className="w-2 h-2 rounded-full bg-green-400" />
              <p className="text-white/70 text-xs">We&apos;re online — typically reply instantly</p>
            </div>
          </div>

          {/* Options */}
          <div className="p-3 space-y-2">
            {chatOptions.map((opt) => (
              <button
                key={opt.id}
                onClick={() => { opt.onClick(); setIsOpen(false); }}
                className={`w-full flex items-center gap-3 p-3 rounded-xl ${opt.bgLight} hover:opacity-90 transition-all text-left group`}
              >
                <div className={`w-11 h-11 rounded-full ${opt.color} flex items-center justify-center text-white flex-shrink-0 shadow-sm group-hover:-translate-y-0.5 transition-transform`}>
                  {opt.icon}
                </div>
                <div>
                  <p className={`font-semibold text-sm ${opt.textColor}`}>{opt.label}</p>
                  <p className="text-gray-400 text-xs">{opt.sublabel}</p>
                </div>
                <svg className="w-4 h-4 text-gray-300 ml-auto flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </button>
            ))}
          </div>

          <div className="px-4 pb-3 text-center">
            <p className="text-gray-400 text-xs">
              Or{" "}
              <button
                onClick={() => { document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" }); setIsOpen(false); }}
                className="text-safari-brown underline font-medium hover:text-safari-gold transition-colors"
              >
                send an inquiry form
              </button>
            </p>
          </div>
        </div>
      )}

      {/* Toggle button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`w-14 h-14 rounded-full shadow-lg flex items-center justify-center transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-safari-gold ${
          isOpen
            ? "bg-gray-600 hover:bg-gray-700 focus:ring-gray-500 rotate-45"
            : "bg-safari-brown hover:bg-safari-brown-dark"
        }`}
        aria-label={isOpen ? "Close chat options" : "Open chat options"}
        aria-expanded={isOpen}
      >
        {isOpen ? (
          <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        ) : (
          <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
          </svg>
        )}
        {/* Pulse indicator */}
        {!isOpen && (
          <span className="absolute top-0 right-0 w-3.5 h-3.5 bg-green-400 border-2 border-white rounded-full animate-pulse-slow" />
        )}
      </button>
    </div>
  );
}
