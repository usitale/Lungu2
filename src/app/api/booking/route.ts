// ============================================================
// POST /api/booking
// Accepts a booking form submission, validates it, and returns
// a booking summary ready for payment processing.
// ============================================================

import { NextRequest, NextResponse } from "next/server";
import type { BookingFormData, BookingSummary } from "@/types";
import { tourPackages, accommodations } from "@/lib/data";

// Simple price lookup for demo — replace with DB query in production
function getPackagePrice(serviceType: string, packageId: string): number {
  if (serviceType === "accommodation") {
    const acc = accommodations.find((a) => a.id === packageId);
    return acc?.pricePerNight ?? 0;
  }
  const pkg = tourPackages.find((p) => p.id === packageId);
  return pkg?.price ?? 0;
}

function getPackageName(serviceType: string, packageId: string): string {
  if (serviceType === "accommodation") {
    const acc = accommodations.find((a) => a.id === packageId);
    return acc?.name ?? packageId;
  }
  const pkg = tourPackages.find((p) => p.id === packageId);
  return pkg?.name ?? packageId;
}

export async function POST(request: NextRequest) {
  try {
    const body: BookingFormData = await request.json();

    // ── Validation ──────────────────────────────────────────
    const required = ["fullName", "email", "phone", "guests", "travelDateFrom", "serviceType", "selectedPackage"];
    for (const field of required) {
      if (!body[field as keyof BookingFormData]) {
        return NextResponse.json(
          { error: `Missing required field: ${field}` },
          { status: 400 }
        );
      }
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(body.email)) {
      return NextResponse.json({ error: "Invalid email address" }, { status: 400 });
    }

    if (body.guests < 1 || body.guests > 100) {
      return NextResponse.json({ error: "Invalid number of guests" }, { status: 400 });
    }

    // ── Build booking summary ────────────────────────────────
    const unitPrice = getPackagePrice(body.serviceType, body.selectedPackage);
    const totalAmount = unitPrice * (body.serviceType === "accommodation" ? 1 : body.guests > 1 ? 1 : 1); // adjust pricing logic as needed

    const bookingId = `LST-${Date.now()}-${Math.random().toString(36).substring(2, 7).toUpperCase()}`;

    const summary: BookingSummary = {
      ...body,
      bookingId,
      totalAmount,
      currency: "USD",
      packageName: getPackageName(body.serviceType, body.selectedPackage),
      createdAt: new Date().toISOString(),
    };

    // ── TODO: Persist booking to database ───────────────────
    // await db.booking.create({ data: { ...summary, status: "PENDING_PAYMENT" } });
    // await sendInquiryNotificationEmail(summary);

    return NextResponse.json({
      success: true,
      booking: summary,
    });
  } catch (error) {
    console.error("[Booking API]", error);
    return NextResponse.json(
      { error: "Failed to process booking. Please try again." },
      { status: 500 }
    );
  }
}
