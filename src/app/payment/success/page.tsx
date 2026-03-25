// ============================================================
// Payment Success Page
// Shown after PayPal or PayFast redirect on successful payment.
// URL: /payment/success?booking=LST-XXXX
// ============================================================

import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Booking Confirmed | Lungu Safari Tours",
  description: "Your safari booking has been confirmed. Thank you for choosing Lungu Safari Tours!",
};

export default function PaymentSuccessPage({
  searchParams,
}: {
  searchParams: { booking?: string; token?: string; PayerID?: string };
}) {
  const bookingId = searchParams.booking || "Your booking";

  return (
    <main className="min-h-screen bg-safari-sand-pale flex items-center justify-center px-4 py-20">
      <div className="max-w-lg w-full bg-white rounded-3xl shadow-card-hover p-8 sm:p-10 text-center">
        {/* Success icon */}
        <div className="w-20 h-20 rounded-full bg-green-100 flex items-center justify-center mx-auto mb-6 ring-4 ring-green-50">
          <svg className="w-10 h-10 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        </div>

        {/* Logo */}
        <div className="flex items-center justify-center gap-2 mb-6">
          <div className="w-8 h-8 rounded-full bg-safari-gold flex items-center justify-center">
            <span className="text-white font-serif font-bold text-sm">L</span>
          </div>
          <span className="font-serif font-bold text-safari-brown-dark">Lungu Safari Tours</span>
        </div>

        <h1 className="font-serif font-bold text-2xl sm:text-3xl text-safari-brown-dark mb-2">
          Payment Successful!
        </h1>
        <p className="text-gray-500 text-base mb-2">
          Your safari adventure is confirmed and we&apos;re thrilled to welcome you!
        </p>

        {bookingId !== "Your booking" && (
          <div className="bg-safari-sand-pale rounded-xl p-3 mb-6">
            <p className="text-xs text-gray-400 uppercase tracking-wider mb-1">Booking Reference</p>
            <p className="font-mono font-bold text-safari-gold text-lg">{bookingId}</p>
          </div>
        )}

        {/* What's next */}
        <div className="bg-green-50 border border-green-100 rounded-2xl p-5 mb-8 text-left">
          <p className="font-semibold text-green-700 text-sm mb-3">What happens next:</p>
          <ul className="space-y-2.5 text-sm text-green-700">
            {[
              "A booking confirmation email is on its way to your inbox",
              "Our team will reach out within 24 hours to finalise your itinerary",
              "Your full safari information pack will be sent 7 days before departure",
              "Our WhatsApp line is available for any questions at any time",
            ].map((step, i) => (
              <li key={i} className="flex items-start gap-2">
                <span className="w-5 h-5 rounded-full bg-green-200 text-green-700 text-xs font-bold flex items-center justify-center flex-shrink-0 mt-0.5">
                  {i + 1}
                </span>
                {step}
              </li>
            ))}
          </ul>
        </div>

        <div className="space-y-3">
          <Link
            href="/"
            className="block w-full bg-safari-gold hover:bg-safari-gold-light text-white font-bold py-4 rounded-full transition-all duration-200 shadow-md text-center"
          >
            Return to Homepage
          </Link>
          <a
            href="https://wa.me/260971234567"  // Replace with real WhatsApp number
            target="_blank"
            rel="noopener noreferrer"
            className="block w-full bg-green-500 hover:bg-green-400 text-white font-bold py-4 rounded-full transition-all duration-200 text-center"
          >
            Contact Us on WhatsApp
          </a>
        </div>

        <p className="text-xs text-gray-400 mt-6">
          Having trouble? Email us at{" "}
          <a href="mailto:bookings@lungusafaritours.com" className="underline text-safari-brown">
            bookings@lungusafaritours.com
          </a>
        </p>
      </div>
    </main>
  );
}
