// ============================================================
// POST /api/payment/paypal/capture-order
// Captures an approved PayPal order. Called after user approves
// the payment in the PayPal popup/redirect flow.
// ============================================================

import { NextRequest, NextResponse } from "next/server";
import { capturePayPalOrder } from "@/lib/paypal";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { orderId } = body;

    if (!orderId) {
      return NextResponse.json(
        { error: "Missing orderId" },
        { status: 400 }
      );
    }

    const captureData = await capturePayPalOrder(orderId);

    // ── TODO: Update booking status in your database ──────────
    // const purchase = captureData.purchase_units?.[0]?.payments?.captures?.[0];
    // const bookingId = captureData.purchase_units?.[0]?.reference_id;
    // await db.booking.update({ where: { id: bookingId }, data: { status: "PAID", paypalOrderId: orderId } });
    // ────────────────────────────────────────────────────────────

    return NextResponse.json({
      success: true,
      orderId,
      status: (captureData as Record<string, unknown>).status,
      details: captureData,
    });
  } catch (error) {
    console.error("[PayPal Capture Order]", error);
    return NextResponse.json(
      { error: "Failed to capture PayPal payment. Please contact support." },
      { status: 500 }
    );
  }
}
