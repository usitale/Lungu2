// ============================================================
// POST /api/payment/payfast/create
// Builds and returns the signed PayFast form data.
// The client then POSTs this data to the PayFast endpoint.
// ============================================================

import { NextRequest, NextResponse } from "next/server";
import { buildPayFastPaymentData } from "@/lib/payfast";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    const { bookingId, firstName, lastName, email, amount, packageName, description } = body;

    if (!bookingId || !firstName || !lastName || !email || !amount || !packageName) {
      return NextResponse.json(
        { error: "Missing required booking fields" },
        { status: 400 }
      );
    }

    if (typeof amount !== "number" || amount <= 0) {
      return NextResponse.json(
        { error: "Invalid amount" },
        { status: 400 }
      );
    }

    const { data, endpoint } = buildPayFastPaymentData({
      bookingId,
      firstName,
      lastName,
      email,
      amount,
      packageName,
      description,
    });

    // ── TODO: Save booking with status PENDING in your database ─
    // await db.booking.upsert({ ... status: "PENDING_PAYMENT" ... });
    // ────────────────────────────────────────────────────────────

    return NextResponse.json({ data, endpoint });
  } catch (error) {
    console.error("[PayFast Create]", error);
    return NextResponse.json(
      { error: "Failed to create PayFast payment. Please try again." },
      { status: 500 }
    );
  }
}
