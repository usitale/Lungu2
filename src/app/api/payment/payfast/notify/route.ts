// ============================================================
// POST /api/payment/payfast/notify
// PayFast ITN (Instant Transaction Notification) / Webhook
// PayFast calls this URL after payment is processed.
// This must be a publicly accessible HTTPS URL.
// ============================================================

import { NextRequest, NextResponse } from "next/server";
import { validatePayFastITN } from "@/lib/payfast";

export async function POST(request: NextRequest) {
  try {
    // PayFast sends data as URL-encoded form body
    const formData = await request.formData();
    const pfData: Record<string, string> = {};

    formData.forEach((value, key) => {
      pfData[key] = value.toString();
    });

    console.log("[PayFast ITN] Received:", pfData);

    // Validate the notification authenticity
    const isValid = await validatePayFastITN(pfData);
    if (!isValid) {
      console.error("[PayFast ITN] Invalid notification — rejecting");
      return new NextResponse("INVALID", { status: 400 });
    }

    const { m_payment_id, payment_status, amount_gross } = pfData;

    // ── Handle payment status ─────────────────────────────────
    if (payment_status === "COMPLETE") {
      // ── TODO: Update booking in your database ────────────────
      // await db.booking.update({
      //   where: { id: m_payment_id },
      //   data: {
      //     status: "PAID",
      //     paidAmount: parseFloat(amount_gross),
      //     paidAt: new Date(),
      //     paymentReference: pfData.pf_payment_id,
      //   },
      // });
      // await sendBookingConfirmationEmail(m_payment_id);
      console.log(`[PayFast ITN] Payment COMPLETE for booking ${m_payment_id} — amount: ${amount_gross}`);
    } else if (payment_status === "FAILED") {
      // ── TODO: Mark booking as payment failed ─────────────────
      console.log(`[PayFast ITN] Payment FAILED for booking ${m_payment_id}`);
    } else if (payment_status === "CANCELLED") {
      // ── TODO: Mark booking as cancelled ──────────────────────
      console.log(`[PayFast ITN] Payment CANCELLED for booking ${m_payment_id}`);
    }

    // PayFast expects a 200 OK response with "VALID" in the body
    return new NextResponse("VALID", { status: 200 });
  } catch (error) {
    console.error("[PayFast ITN] Error processing notification:", error);
    return new NextResponse("ERROR", { status: 500 });
  }
}
