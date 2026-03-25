"use client";

import { useState } from "react";

export default function OffersBanner() {
  const [dismissed, setDismissed] = useState(false);

  if (dismissed) return null;

  return (
    <div className="bg-safari-brown text-white relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-r from-safari-brown-dark via-safari-brown to-safari-brown-light opacity-80" />
      <div className="relative z-10 max-w-7xl mx-auto px-4 py-3 flex items-center justify-between gap-4">
        <div className="flex items-center gap-3 flex-1 justify-center text-center sm:text-left">
          <span className="hidden sm:block text-safari-sand text-lg">✨</span>
          <p className="text-sm sm:text-base font-medium">
            <span className="font-bold text-safari-sand">Early Bird Special:</span>{" "}
            Save up to 20% on all safari packages booked before 30 June 2025.{" "}
            <button
              onClick={() => document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" })}
              className="underline text-safari-sand hover:text-white font-semibold transition-colors"
            >
              Book now →
            </button>
          </p>
        </div>
        <button
          onClick={() => setDismissed(true)}
          className="flex-shrink-0 text-white/60 hover:text-white transition-colors p-1"
          aria-label="Dismiss banner"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>
    </div>
  );
}
