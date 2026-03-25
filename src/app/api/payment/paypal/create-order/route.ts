// ============================================================
// POST /api/payment/paypal/create-order
// Creates a PayPal order and returns the order ID to the client
// ============================================================

import { NextRequest, NextResponse } from "next/server";
import { createPayPalOrder } from "@/lib/paypal";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    const { bookingId, amount, currency = "USD", description } = body;

    if (!bookingId || !amount || !description) {
      return NextResponse.json(
        { error: "Missing required fields: bookingId, amount, description" },
        { status: 400 }
      );
    }

    if (typeof amount !== "number" || amount <= 0) {
      return NextResponse.json(
        { error: "Invalid amount" },
        { status: 400 }
      );
    }

    const order = await createPayPalOrder({
      bookingId,
      amount,
      currency,
      description,
    });

    return NextResponse.json({ orderId: order.id, status: order.status });
  } catch (error) {
    console.error("[PayPal Create Order]", error);
    return NextResponse.json(
      { error: "Failed to create PayPal order. Please try again." },
      { status: 500 }
    );
  }
}
