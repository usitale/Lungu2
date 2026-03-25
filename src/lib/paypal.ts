// ============================================================
// PayPal Payment Utility — Server-Side Only
// ============================================================
// PayPal REST API docs: https://developer.paypal.com/docs/api/
// NEVER import this file in client-side components

const PAYPAL_BASE_URL =
  process.env.PAYPAL_MODE === "live"
    ? "https://api-m.paypal.com"
    : "https://api-m.sandbox.paypal.com";

/**
 * Fetch a PayPal OAuth2 access token using client credentials.
 * Token is short-lived — fetch fresh per request or cache briefly.
 */
export async function getPayPalAccessToken(): Promise<string> {
  // ── Configure these in .env.local ──────────────────────────
  const clientId = process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID || "";
  const clientSecret = process.env.PAYPAL_CLIENT_SECRET || "";
  // ────────────────────────────────────────────────────────────

  if (!clientId || !clientSecret) {
    throw new Error("[PayPal] Missing PAYPAL_CLIENT_ID or PAYPAL_CLIENT_SECRET environment variables");
  }

  const credentials = Buffer.from(`${clientId}:${clientSecret}`).toString("base64");

  const response = await fetch(`${PAYPAL_BASE_URL}/v1/oauth2/token`, {
    method: "POST",
    headers: {
      Authorization: `Basic ${credentials}`,
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: "grant_type=client_credentials",
  });

  if (!response.ok) {
    const error = await response.text();
    throw new Error(`[PayPal] Token fetch failed: ${error}`);
  }

  const data = await response.json();
  return data.access_token as string;
}

/**
 * Create a PayPal order.
 * Returns the PayPal order ID used by the frontend PayPal JS SDK.
 */
export async function createPayPalOrder(params: {
  bookingId: string;
  amount: number;
  currency?: string;
  description: string;
}): Promise<{ id: string; status: string }> {
  const accessToken = await getPayPalAccessToken();

  const orderPayload = {
    intent: "CAPTURE",
    purchase_units: [
      {
        reference_id: params.bookingId,
        description: params.description,
        amount: {
          currency_code: params.currency || "USD",
          value: params.amount.toFixed(2),
        },
      },
    ],
    application_context: {
      brand_name: "Lungu Safari Tours",
      landing_page: "BILLING",
      user_action: "PAY_NOW",
      return_url: `${process.env.NEXT_PUBLIC_SITE_URL}/payment/success?booking=${params.bookingId}`,
      cancel_url: `${process.env.NEXT_PUBLIC_SITE_URL}/payment/cancel?booking=${params.bookingId}`,
    },
  };

  const response = await fetch(`${PAYPAL_BASE_URL}/v2/checkout/orders`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${accessToken}`,
      "Content-Type": "application/json",
      "PayPal-Request-Id": params.bookingId, // idempotency key
    },
    body: JSON.stringify(orderPayload),
  });

  if (!response.ok) {
    const error = await response.text();
    throw new Error(`[PayPal] Create order failed: ${error}`);
  }

  return response.json();
}

/**
 * Capture a PayPal order after the customer approves it.
 * Call this after the frontend SDK triggers onApprove.
 */
export async function capturePayPalOrder(
  orderId: string
): Promise<Record<string, unknown>> {
  const accessToken = await getPayPalAccessToken();

  const response = await fetch(
    `${PAYPAL_BASE_URL}/v2/checkout/orders/${orderId}/capture`,
    {
      method: "POST",
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      },
    }
  );

  if (!response.ok) {
    const error = await response.text();
    throw new Error(`[PayPal] Capture order failed: ${error}`);
  }

  return response.json();
}
