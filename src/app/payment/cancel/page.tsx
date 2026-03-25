// ============================================================
// Payment Cancel / Failure Page
// Shown after PayPal or PayFast cancellation/failure redirect.
// URL: /payment/cancel?booking=LST-XXXX
// ============================================================

import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Payment Cancelled | Lungu Safari Tours",
  description: "Your payment was cancelled. Your booking is still saved — try again or contact us.",
};

export default function PaymentCancelPage({
  searchParams,
}: {
  searchParams: { booking?: string };
}) {
  const bookingId = searchParams.booking;

  return (
    <main className="min-h-screen bg-safari-sand-pale flex items-center justify-center px-4 py-20">
      <div className="max-w-lg w-full bg-white rounded-3xl shadow-card-hover p-8 sm:p-10 text-center">
        {/* Cancel icon */}
        <div className="w-20 h-20 rounded-full bg-amber-100 flex items-center justify-center mx-auto mb-6 ring-4 ring-amber-50">
          <svg className="w-10 h-10 text-amber-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
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
          Payment Not Completed
        </h1>
        <p className="text-gray-500 text-base mb-5">
          Your payment was cancelled or could not be processed. Don&apos;t worry —
          your booking details have been saved and your safari spot is held for 24 hours.
        </p>

        {bookingId && (
          <div className="bg-amber-50 rounded-xl p-3 mb-5">
            <p className="text-xs text-gray-400 uppercase tracking-wider mb-1">Your Booking Reference</p>
            <p className="font-mono font-bold text-safari-brown text-lg">{bookingId}</p>
          </div>
        )}

        <div className="bg-safari-sand-pale rounded-2xl p-5 mb-8 text-left">
          <p className="font-semibold text-safari-brown text-sm mb-3">You can:</p>
          <ul className="space-y-2 text-sm text-gray-600">
            <li className="flex items-center gap-2">
              <svg className="w-4 h-4 text-safari-gold flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
              </svg>
              Try the payment again with the same or a different method
            </li>
            <li className="flex items-center gap-2">
              <svg className="w-4 h-4 text-safari-gold flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
              </svg>
              Contact us via WhatsApp to pay via bank transfer
            </li>
            <li className="flex items-center gap-2">
              <svg className="w-4 h-4 text-safari-gold flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
              </svg>
              Call us directly and we&apos;ll process your booking manually
            </li>
          </ul>
        </div>

        <div className="space-y-3">
          <Link
            href="/#contact"
            className="block w-full bg-safari-gold hover:bg-safari-gold-light text-white font-bold py-4 rounded-full transition-all duration-200 shadow-md text-center"
          >
            Try Payment Again
          </Link>
          <a
            href="https://wa.me/260971234567?text=Hi, I had an issue with my payment for booking reference: "  // Replace with real number
            target="_blank"
            rel="noopener noreferrer"
            className="block w-full bg-green-500 hover:bg-green-400 text-white font-bold py-4 rounded-full transition-all duration-200 text-center"
          >
            Get Help on WhatsApp
          </a>
          <Link
            href="/"
            className="block w-full border-2 border-safari-sand text-safari-brown font-semibold py-4 rounded-full transition-all hover:bg-safari-sand-pale text-center"
          >
            Back to Homepage
          </Link>
        </div>

        <p className="text-xs text-gray-400 mt-6">
          Need help? Email us at{" "}
          <a href="mailto:bookings@lungusafaritours.com" className="underline text-safari-brown">
            bookings@lungusafaritours.com
          </a>
          {" "}or call{" "}
          <a href="tel:+260971234567" className="underline text-safari-brown">
            +260 97 123 4567
          </a>
        </p>
      </div>
    </main>
  );
}
