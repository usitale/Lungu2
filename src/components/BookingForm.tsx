"use client";

// ============================================================
// Booking Form + Payment Flow
// Steps:
//   1. Fill booking details
//   2. Review booking summary
//   3. Choose payment method (PayPal or PayFast)
//   4. Process payment
// ============================================================

import { useState } from "react";
import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";
import { tourPackages, accommodations } from "@/lib/data";
import type { BookingFormData, BookingSummary } from "@/types";

type Step = "form" | "summary" | "payment" | "success";
type PaymentMethod = "paypal" | "payfast" | null;

const serviceOptions = [
  { value: "trip", label: "Safari Trip / Tour Package" },
  { value: "accommodation", label: "Accommodation Only" },
  { value: "both", label: "Safari Trip + Accommodation" },
];

const allPackageOptions = [
  ...tourPackages.map((p) => ({ value: p.id, label: `${p.name} — $${p.price.toLocaleString()}`, type: "trip" })),
  ...accommodations.map((a) => ({ value: a.id, label: `${a.name} — $${a.pricePerNight}/night`, type: "accommodation" })),
];

const initialForm: BookingFormData = {
  fullName: "",
  email: "",
  phone: "",
  guests: 1,
  travelDateFrom: "",
  travelDateTo: "",
  serviceType: "trip",
  selectedPackage: "",
  specialRequests: "",
};

export default function BookingForm() {
  const [step, setStep] = useState<Step>("form");
  const [form, setForm] = useState<BookingFormData>(initialForm);
  const [booking, setBooking] = useState<BookingSummary | null>(null);
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>(null);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<Partial<Record<keyof BookingFormData, string>>>({});
  const [paymentError, setPaymentError] = useState<string | null>(null);

  // ── Form field change handler ──────────────────────────────
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: name === "guests" ? parseInt(value) || 1 : value,
      // Reset selected package when service type changes
      ...(name === "serviceType" ? { selectedPackage: "" } : {}),
    }));
    if (errors[name as keyof BookingFormData]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  };

  // ── Validation ─────────────────────────────────────────────
  const validate = (): boolean => {
    const newErrors: Partial<Record<keyof BookingFormData, string>> = {};
    if (!form.fullName.trim()) newErrors.fullName = "Full name is required";
    if (!form.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
      newErrors.email = "Please enter a valid email address";
    }
    if (!form.phone.trim()) newErrors.phone = "Phone number is required";
    if (form.guests < 1) newErrors.guests = "At least 1 guest is required";
    if (!form.travelDateFrom) newErrors.travelDateFrom = "Travel start date is required";
    if (!form.selectedPackage) newErrors.selectedPackage = "Please select a package";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // ── Submit booking form → get summary ─────────────────────
  const handleSubmitForm = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setLoading(true);
    try {
      const res = await fetch("/api/booking", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Booking failed");
      setBooking(data.booking);
      setStep("summary");
    } catch (err) {
      setErrors({ fullName: err instanceof Error ? err.message : "Something went wrong. Please try again." });
    } finally {
      setLoading(false);
    }
  };

  // ── PayFast: request signed form data from server ─────────
  const handlePayFast = async () => {
    if (!booking) return;
    setLoading(true);
    setPaymentError(null);
    try {
      const nameParts = booking.fullName.trim().split(" ");
      const firstName = nameParts[0] || "Guest";
      const lastName = nameParts.slice(1).join(" ") || "User";

      const res = await fetch("/api/payment/payfast/create", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          bookingId: booking.bookingId,
          firstName,
          lastName,
          email: booking.email,
          amount: booking.totalAmount,
          packageName: booking.packageName,
          description: `Lungu Safari Tours booking — ${booking.packageName}`,
        }),
      });
      const result = await res.json();
      if (!res.ok) throw new Error(result.error || "PayFast error");

      // Build a form and auto-submit to PayFast
      const form = document.createElement("form");
      form.method = "POST";
      form.action = result.endpoint;
      Object.entries(result.data as Record<string, string>).forEach(([key, val]) => {
        const input = document.createElement("input");
        input.type = "hidden";
        input.name = key;
        input.value = val;
        form.appendChild(input);
      });
      document.body.appendChild(form);
      form.submit();
    } catch (err) {
      setPaymentError(err instanceof Error ? err.message : "PayFast payment failed. Please try again.");
      setLoading(false);
    }
  };

  // ── PayPal: create order (server-side) ────────────────────
  const createPayPalOrder = async () => {
    if (!booking) throw new Error("No booking");
    const res = await fetch("/api/payment/paypal/create-order", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        bookingId: booking.bookingId,
        amount: booking.totalAmount,
        currency: "USD",
        description: `Lungu Safari Tours — ${booking.packageName}`,
      }),
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.error || "PayPal order failed");
    return data.orderId as string;
  };

  // ── PayPal: capture order after approval ─────────────────
  const capturePayPalOrder = async (orderId: string) => {
    const res = await fetch("/api/payment/paypal/capture-order", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ orderId }),
    });
    const data = await res.json();
    if (!res.ok || !data.success) throw new Error(data.error || "Capture failed");
    setStep("success");
  };

  // Filtered package options based on service type
  const packageOptions =
    form.serviceType === "accommodation"
      ? allPackageOptions.filter((p) => p.type === "accommodation")
      : form.serviceType === "trip"
      ? allPackageOptions.filter((p) => p.type === "trip")
      : allPackageOptions;

  const paypalClientId = process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID || "test";

  // ═══════════════════════════════════════════════════════════
  // STEP 1 — Booking Form
  // ═══════════════════════════════════════════════════════════
  if (step === "form") {
    return (
      <div className="bg-white rounded-3xl shadow-card-hover p-6 sm:p-8 lg:p-10">
        <div className="flex items-center gap-3 mb-8">
          <div className="w-10 h-10 rounded-full bg-safari-gold flex items-center justify-center">
            <span className="text-white font-bold text-sm">1</span>
          </div>
          <div>
            <h3 className="font-serif font-bold text-xl text-safari-brown-dark">Booking Details</h3>
            <p className="text-gray-400 text-sm">Fill in your information to get started</p>
          </div>
        </div>

        <form onSubmit={handleSubmitForm} noValidate>
          {/* General error */}
          {errors.fullName && errors.fullName.includes("wrong") && (
            <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-xl text-red-700 text-sm">
              {errors.fullName}
            </div>
          )}

          <div className="grid sm:grid-cols-2 gap-5">
            {/* Full Name */}
            <div className="sm:col-span-2">
              <label htmlFor="fullName" className="safari-label">
                Full Name <span className="text-red-500">*</span>
              </label>
              <input
                id="fullName"
                name="fullName"
                type="text"
                value={form.fullName}
                onChange={handleChange}
                placeholder="e.g. Sarah Thornton"
                className={`safari-input ${errors.fullName ? "border-red-400 focus:ring-red-400" : ""}`}
                autoComplete="name"
              />
              {errors.fullName && !errors.fullName.includes("wrong") && (
                <p className="text-red-500 text-xs mt-1">{errors.fullName}</p>
              )}
            </div>

            {/* Email */}
            <div>
              <label htmlFor="email" className="safari-label">
                Email Address <span className="text-red-500">*</span>
              </label>
              <input
                id="email"
                name="email"
                type="email"
                value={form.email}
                onChange={handleChange}
                placeholder="your@email.com"
                className={`safari-input ${errors.email ? "border-red-400 focus:ring-red-400" : ""}`}
                autoComplete="email"
              />
              {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
            </div>

            {/* Phone */}
            <div>
              <label htmlFor="phone" className="safari-label">
                Phone / WhatsApp <span className="text-red-500">*</span>
              </label>
              <input
                id="phone"
                name="phone"
                type="tel"
                value={form.phone}
                onChange={handleChange}
                placeholder="+260 97 123 4567"
                className={`safari-input ${errors.phone ? "border-red-400 focus:ring-red-400" : ""}`}
                autoComplete="tel"
              />
              {errors.phone && <p className="text-red-500 text-xs mt-1">{errors.phone}</p>}
            </div>

            {/* Number of Guests */}
            <div>
              <label htmlFor="guests" className="safari-label">
                Number of Guests <span className="text-red-500">*</span>
              </label>
              <input
                id="guests"
                name="guests"
                type="number"
                min={1}
                max={50}
                value={form.guests}
                onChange={handleChange}
                className={`safari-input ${errors.guests ? "border-red-400 focus:ring-red-400" : ""}`}
              />
              {errors.guests && <p className="text-red-500 text-xs mt-1">{errors.guests}</p>}
            </div>

            {/* Travel Date From */}
            <div>
              <label htmlFor="travelDateFrom" className="safari-label">
                Travel Start Date <span className="text-red-500">*</span>
              </label>
              <input
                id="travelDateFrom"
                name="travelDateFrom"
                type="date"
                value={form.travelDateFrom}
                onChange={handleChange}
                min={new Date().toISOString().split("T")[0]}
                className={`safari-input ${errors.travelDateFrom ? "border-red-400 focus:ring-red-400" : ""}`}
              />
              {errors.travelDateFrom && <p className="text-red-500 text-xs mt-1">{errors.travelDateFrom}</p>}
            </div>

            {/* Travel Date To */}
            <div>
              <label htmlFor="travelDateTo" className="safari-label">
                Travel End Date
              </label>
              <input
                id="travelDateTo"
                name="travelDateTo"
                type="date"
                value={form.travelDateTo}
                onChange={handleChange}
                min={form.travelDateFrom || new Date().toISOString().split("T")[0]}
                className="safari-input"
              />
            </div>

            {/* Service Type */}
            <div>
              <label htmlFor="serviceType" className="safari-label">
                Service Type <span className="text-red-500">*</span>
              </label>
              <select
                id="serviceType"
                name="serviceType"
                value={form.serviceType}
                onChange={handleChange}
                className="safari-input"
              >
                {serviceOptions.map((opt) => (
                  <option key={opt.value} value={opt.value}>{opt.label}</option>
                ))}
              </select>
            </div>

            {/* Selected Package */}
            <div>
              <label htmlFor="selectedPackage" className="safari-label">
                Select Package <span className="text-red-500">*</span>
              </label>
              <select
                id="selectedPackage"
                name="selectedPackage"
                value={form.selectedPackage}
                onChange={handleChange}
                className={`safari-input ${errors.selectedPackage ? "border-red-400 focus:ring-red-400" : ""}`}
              >
                <option value="">— Choose a package —</option>
                {packageOptions.map((opt) => (
                  <option key={opt.value} value={opt.value}>{opt.label}</option>
                ))}
              </select>
              {errors.selectedPackage && <p className="text-red-500 text-xs mt-1">{errors.selectedPackage}</p>}
            </div>

            {/* Special Requests */}
            <div className="sm:col-span-2">
              <label htmlFor="specialRequests" className="safari-label">
                Special Requests or Notes
              </label>
              <textarea
                id="specialRequests"
                name="specialRequests"
                value={form.specialRequests}
                onChange={handleChange}
                rows={4}
                placeholder="Dietary requirements, accessibility needs, special occasions, custom requests..."
                className="safari-input resize-none"
              />
            </div>
          </div>

          <div className="mt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
            <p className="text-xs text-gray-400 flex items-center gap-1.5">
              <svg className="w-4 h-4 text-safari-gold" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
              </svg>
              Your information is safe and encrypted
            </p>
            <button
              type="submit"
              disabled={loading}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-safari-gold hover:bg-safari-gold-light disabled:opacity-60 disabled:cursor-not-allowed text-white font-bold text-base px-10 py-4 rounded-full transition-all duration-200 shadow-md"
            >
              {loading ? (
                <><span className="spinner" /> Processing...</>
              ) : (
                <>
                  Review My Booking
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                  </svg>
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    );
  }

  // ═══════════════════════════════════════════════════════════
  // STEP 2 — Booking Summary
  // ═══════════════════════════════════════════════════════════
  if (step === "summary" && booking) {
    return (
      <div className="bg-white rounded-3xl shadow-card-hover p-6 sm:p-8 lg:p-10">
        <div className="flex items-center gap-3 mb-8">
          <div className="w-10 h-10 rounded-full bg-safari-gold flex items-center justify-center">
            <span className="text-white font-bold text-sm">2</span>
          </div>
          <div>
            <h3 className="font-serif font-bold text-xl text-safari-brown-dark">Booking Summary</h3>
            <p className="text-gray-400 text-sm">Review your details before payment</p>
          </div>
        </div>

        {/* Summary card */}
        <div className="bg-safari-sand-pale rounded-2xl p-6 mb-6 border border-safari-sand/40">
          <div className="flex items-start justify-between mb-4">
            <div>
              <p className="text-xs font-semibold text-safari-gold uppercase tracking-wider mb-1">Booking Reference</p>
              <p className="font-mono font-bold text-safari-brown-dark text-lg">{booking.bookingId}</p>
            </div>
            <span className="bg-yellow-100 text-yellow-700 text-xs font-bold px-3 py-1 rounded-full border border-yellow-200">
              PENDING PAYMENT
            </span>
          </div>

          <div className="grid sm:grid-cols-2 gap-4 text-sm">
            {[
              { label: "Guest Name", value: booking.fullName },
              { label: "Email", value: booking.email },
              { label: "Phone", value: booking.phone },
              { label: "Guests", value: `${booking.guests} person${booking.guests > 1 ? "s" : ""}` },
              { label: "Package", value: booking.packageName },
              { label: "Service", value: booking.serviceType.charAt(0).toUpperCase() + booking.serviceType.slice(1) },
              { label: "Travel Date", value: booking.travelDateFrom },
              ...(booking.travelDateTo ? [{ label: "Return Date", value: booking.travelDateTo }] : []),
              ...(booking.specialRequests ? [{ label: "Special Requests", value: booking.specialRequests }] : []),
            ].map((item) => (
              <div key={item.label}>
                <p className="text-gray-400 font-medium text-xs uppercase tracking-wider mb-0.5">{item.label}</p>
                <p className="text-safari-brown-dark font-semibold">{item.value}</p>
              </div>
            ))}
          </div>

          {/* Total */}
          <div className="mt-5 pt-5 border-t border-safari-sand flex items-center justify-between">
            <div>
              <p className="text-gray-500 text-sm">Total Amount Due</p>
              <p className="font-serif font-bold text-3xl text-safari-brown">
                ${booking.totalAmount.toLocaleString()}
                <span className="text-base font-sans text-gray-400 ml-1">{booking.currency}</span>
              </p>
            </div>
            <div className="text-right">
              <p className="text-xs text-gray-400">30% deposit to confirm</p>
              <p className="font-bold text-safari-gold text-lg">
                ${(booking.totalAmount * 0.3).toLocaleString()} deposit
              </p>
            </div>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row items-center gap-4">
          <button
            onClick={() => setStep("form")}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 border-2 border-safari-sand text-safari-brown font-semibold px-6 py-3 rounded-full hover:bg-safari-sand-pale transition-all"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 17l-5-5m0 0l5-5m-5 5h12" />
            </svg>
            Edit Details
          </button>
          <button
            onClick={() => setStep("payment")}
            className="w-full sm:flex-1 inline-flex items-center justify-center gap-2 bg-safari-gold hover:bg-safari-gold-light text-white font-bold text-base px-10 py-4 rounded-full transition-all duration-200 shadow-md"
          >
            Proceed to Payment
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
            </svg>
          </button>
        </div>
      </div>
    );
  }

  // ═══════════════════════════════════════════════════════════
  // STEP 3 — Payment
  // ═══════════════════════════════════════════════════════════
  if (step === "payment" && booking) {
    return (
      <div className="bg-white rounded-3xl shadow-card-hover p-6 sm:p-8 lg:p-10">
        <div className="flex items-center gap-3 mb-8">
          <div className="w-10 h-10 rounded-full bg-safari-gold flex items-center justify-center">
            <span className="text-white font-bold text-sm">3</span>
          </div>
          <div>
            <h3 className="font-serif font-bold text-xl text-safari-brown-dark">Secure Payment</h3>
            <p className="text-gray-400 text-sm">Choose your preferred payment method</p>
          </div>
        </div>

        {/* Mini summary */}
        <div className="flex items-center justify-between bg-safari-sand-pale rounded-xl px-5 py-3 mb-8 text-sm">
          <span className="text-gray-500">
            <span className="font-semibold text-safari-brown">{booking.packageName}</span>
            {" · "}{booking.fullName}
          </span>
          <span className="font-serif font-bold text-safari-brown text-lg">
            ${booking.totalAmount.toLocaleString()}
          </span>
        </div>

        {/* Payment error */}
        {paymentError && (
          <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-xl text-red-700 text-sm">
            {paymentError}
          </div>
        )}

        {/* Payment method selection */}
        <div className="space-y-4 mb-8">
          <p className="font-semibold text-gray-700 text-sm">Select Payment Method:</p>

          <div className="grid sm:grid-cols-2 gap-4">
            {/* PayPal option */}
            <button
              onClick={() => setPaymentMethod("paypal")}
              className={`flex items-center gap-4 p-4 rounded-xl border-2 transition-all text-left ${
                paymentMethod === "paypal"
                  ? "border-[#003087] bg-blue-50"
                  : "border-gray-200 hover:border-gray-300 hover:bg-gray-50"
              }`}
            >
              <div className="w-12 h-12 rounded-lg bg-[#003087] flex items-center justify-center flex-shrink-0">
                <svg viewBox="0 0 24 24" className="w-8 h-5 text-white" fill="currentColor">
                  <path d="M7.076 21.337H2.47a.641.641 0 0 1-.633-.74L4.944.901C5.026.382 5.474 0 5.998 0h7.46c2.57 0 4.578.543 5.69 1.81 1.01 1.15 1.304 2.42 1.012 4.287-.023.143-.047.288-.077.437-.983 5.05-4.349 6.797-8.647 6.797h-2.19c-.524 0-.968.382-1.05.9l-1.12 7.106zm14.146-14.42a3.35 3.35 0 0 0-.607-.541c1.379 8.037-.784 13.625-8.03 14.01l.044-.275c.234-1.481.461-2.963.6-4.458.28-.296.571-.573.87-.84 1.2-1.05 2.042-2.395 2.5-3.855.459-1.46.5-3.032.07-4.5l-.047-.14-.4.003z"/>
                </svg>
              </div>
              <div>
                <p className="font-bold text-gray-800">PayPal</p>
                <p className="text-xs text-gray-500">Secure payment via PayPal</p>
              </div>
              {paymentMethod === "paypal" && (
                <svg className="w-5 h-5 text-[#003087] ml-auto flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
              )}
            </button>

            {/* PayFast option */}
            <button
              onClick={() => setPaymentMethod("payfast")}
              className={`flex items-center gap-4 p-4 rounded-xl border-2 transition-all text-left ${
                paymentMethod === "payfast"
                  ? "border-[#3AB54A] bg-green-50"
                  : "border-gray-200 hover:border-gray-300 hover:bg-gray-50"
              }`}
            >
              <div className="w-12 h-12 rounded-lg bg-[#3AB54A] flex items-center justify-center flex-shrink-0">
                <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
                </svg>
              </div>
              <div>
                <p className="font-bold text-gray-800">PayFast</p>
                <p className="text-xs text-gray-500">EFT, Credit/Debit Card, Instant EFT</p>
              </div>
              {paymentMethod === "payfast" && (
                <svg className="w-5 h-5 text-[#3AB54A] ml-auto flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
              )}
            </button>
          </div>
        </div>

        {/* Payment action area */}
        {paymentMethod === "paypal" && (
          <div className="mb-4">
            <PayPalScriptProvider
              options={{
                clientId: paypalClientId,
                currency: "USD",
              }}
            >
              <PayPalButtons
                style={{
                  layout: "vertical",
                  color: "blue",
                  shape: "pill",
                  label: "pay",
                  height: 50,
                }}
                createOrder={createPayPalOrder}
                onApprove={async (data) => {
                  try {
                    await capturePayPalOrder(data.orderID);
                  } catch (err) {
                    setPaymentError(
                      err instanceof Error ? err.message : "Payment capture failed"
                    );
                  }
                }}
                onError={(err) => {
                  console.error("[PayPal]", err);
                  setPaymentError("PayPal encountered an error. Please try again.");
                }}
                onCancel={() => setPaymentError("Payment was cancelled.")}
              />
            </PayPalScriptProvider>
            <p className="text-xs text-gray-400 text-center mt-2">
              You will be redirected to PayPal to complete your payment securely.
            </p>
          </div>
        )}

        {paymentMethod === "payfast" && (
          <div className="mb-4">
            <button
              onClick={handlePayFast}
              disabled={loading}
              className="w-full inline-flex items-center justify-center gap-3 bg-[#3AB54A] hover:bg-green-500 disabled:opacity-60 text-white font-bold text-base py-4 rounded-full transition-all duration-200 shadow-md"
            >
              {loading ? (
                <><span className="spinner" /> Redirecting to PayFast...</>
              ) : (
                <>
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
                  </svg>
                  Pay ${booking.totalAmount.toLocaleString()} with PayFast
                </>
              )}
            </button>
            <p className="text-xs text-gray-400 text-center mt-2">
              You will be redirected to the secure PayFast payment page.
              Supports Credit/Debit cards, EFT, and Instant EFT.
            </p>
          </div>
        )}

        {!paymentMethod && (
          <div className="mb-4 p-4 bg-safari-sand-pale rounded-xl text-center text-safari-brown text-sm font-medium">
            Please select a payment method above to continue.
          </div>
        )}

        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-2">
          <button
            onClick={() => { setStep("summary"); setPaymentMethod(null); setPaymentError(null); }}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 border-2 border-safari-sand text-safari-brown font-semibold px-6 py-3 rounded-full hover:bg-safari-sand-pale transition-all"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 17l-5-5m0 0l5-5m-5 5h12" />
            </svg>
            Back to Summary
          </button>

          {/* Security trust strip */}
          <div className="flex items-center gap-2 text-xs text-gray-400">
            <svg className="w-4 h-4 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
            </svg>
            256-bit SSL Encrypted Payment
          </div>
        </div>
      </div>
    );
  }

  // ═══════════════════════════════════════════════════════════
  // STEP 4 — Success
  // ═══════════════════════════════════════════════════════════
  if (step === "success" && booking) {
    return (
      <div className="bg-white rounded-3xl shadow-card-hover p-6 sm:p-8 lg:p-10 text-center">
        <div className="w-20 h-20 rounded-full bg-green-100 flex items-center justify-center mx-auto mb-6">
          <svg className="w-10 h-10 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        </div>
        <h3 className="font-serif font-bold text-2xl sm:text-3xl text-safari-brown-dark mb-2">
          Booking Confirmed!
        </h3>
        <p className="text-gray-500 text-base mb-2">
          Thank you, <strong>{booking.fullName}</strong>. Your safari is booked!
        </p>
        <p className="font-mono text-safari-gold font-bold mb-6">{booking.bookingId}</p>
        <div className="bg-green-50 rounded-xl p-5 mb-6 text-left">
          <p className="text-green-700 font-semibold text-sm mb-1">What happens next?</p>
          <ul className="text-green-700 text-sm space-y-1.5">
            <li className="flex items-center gap-2">
              <svg className="w-4 h-4 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" /></svg>
              A confirmation email has been sent to <strong>{booking.email}</strong>
            </li>
            <li className="flex items-center gap-2">
              <svg className="w-4 h-4 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" /></svg>
              Our team will contact you within 24 hours to finalise details
            </li>
            <li className="flex items-center gap-2">
              <svg className="w-4 h-4 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" /></svg>
              Your safari itinerary will be sent 7 days before departure
            </li>
          </ul>
        </div>
        <button
          onClick={() => { setStep("form"); setForm(initialForm); setBooking(null); }}
          className="btn-outline"
        >
          Make Another Booking
        </button>
      </div>
    );
  }

  return null;
}
