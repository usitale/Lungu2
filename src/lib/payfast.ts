// ============================================================
// PayFast Payment Utility — Server-Side Only
// ============================================================
// PayFast documentation: https://developers.payfast.co.za/docs
// NEVER import this file in client-side components

import crypto from "crypto";

export interface PayFastParams {
  merchant_id: string;
  merchant_key: string;
  return_url: string;
  cancel_url: string;
  notify_url: string;
  name_first: string;
  name_last: string;
  email_address: string;
  m_payment_id: string;          // your internal booking ID
  amount: string;                // e.g. "1450.00"
  item_name: string;             // e.g. "Wildlife Safari Booking"
  item_description?: string;
  custom_str1?: string;          // optional custom data
  passphrase?: string;           // PayFast passphrase (if set in dashboard)
}

/**
 * Generate an MD5 signature string required by PayFast.
 * The signature is built from alphabetically ordered params,
 * URL-encoded, and appended with the passphrase if present.
 */
export function generatePayFastSignature(
  params: Omit<PayFastParams, "passphrase"> & { passphrase?: string }
): string {
  // Remove passphrase from the data object; it's appended separately
  const { passphrase, ...data } = params;

  // Sort keys alphabetically and build query string
  const pfParamString = Object.keys(data)
    .sort()
    .filter((key) => data[key as keyof typeof data] !== undefined && data[key as keyof typeof data] !== "")
    .map(
      (key) =>
        `${key}=${encodeURIComponent(
          (data[key as keyof typeof data] as string).trim()
        ).replace(/%20/g, "+")}`
    )
    .join("&");

  const stringToHash = passphrase
    ? `${pfParamString}&passphrase=${encodeURIComponent(passphrase.trim()).replace(/%20/g, "+")}`
    : pfParamString;

  return crypto.createHash("md5").update(stringToHash).digest("hex");
}

/**
 * Build the PayFast payment data object ready to POST as a form.
 * All values come from environment variables — never hardcoded.
 */
export function buildPayFastPaymentData(
  booking: {
    bookingId: string;
    firstName: string;
    lastName: string;
    email: string;
    amount: number;
    packageName: string;
    description?: string;
  }
): { data: Record<string, string>; endpoint: string } {
  // ── Configure these in .env.local ──────────────────────────
  const merchantId = process.env.PAYFAST_MERCHANT_ID || "";
  const merchantKey = process.env.PAYFAST_MERCHANT_KEY || "";
  const passphrase = process.env.PAYFAST_PASSPHRASE || undefined;
  const returnUrl =
    process.env.PAYFAST_RETURN_URL ||
    `${process.env.NEXT_PUBLIC_SITE_URL}/payment/success`;
  const cancelUrl =
    process.env.PAYFAST_CANCEL_URL ||
    `${process.env.NEXT_PUBLIC_SITE_URL}/payment/cancel`;
  const notifyUrl =
    process.env.PAYFAST_NOTIFY_URL ||
    `${process.env.NEXT_PUBLIC_SITE_URL}/api/payment/payfast/notify`;
  const mode = process.env.PAYFAST_MODE || "sandbox";
  // ────────────────────────────────────────────────────────────

  const endpoint =
    mode === "live"
      ? "https://www.payfast.co.za/eng/process"
      : "https://sandbox.payfast.co.za/eng/process";

  const params: Record<string, string> = {
    merchant_id: merchantId,
    merchant_key: merchantKey,
    return_url: returnUrl,
    cancel_url: cancelUrl,
    notify_url: notifyUrl,
    name_first: booking.firstName,
    name_last: booking.lastName,
    email_address: booking.email,
    m_payment_id: booking.bookingId,
    amount: booking.amount.toFixed(2),
    item_name: booking.packageName,
    ...(booking.description && { item_description: booking.description }),
  };

  const signature = generatePayFastSignature({ ...params, passphrase } as PayFastParams);
  params.signature = signature;

  return { data: params, endpoint };
}

/**
 * Validate an incoming PayFast ITN (Instant Transaction Notification).
 * Call this inside /api/payment/payfast/notify route handler.
 *
 * Steps per PayFast docs:
 * 1. Verify data integrity (re-generate signature)
 * 2. Validate server IP
 * 3. Perform server-to-server POST validation
 */
export async function validatePayFastITN(
  pfData: Record<string, string>
): Promise<boolean> {
  const passphrase = process.env.PAYFAST_PASSPHRASE || undefined;

  // Re-generate signature from received data (excluding their signature field)
  const { signature: pfSignature, ...dataWithoutSig } = pfData;

  const expectedSignature = generatePayFastSignature({
    ...dataWithoutSig,
    passphrase,
  } as PayFastParams);

  if (pfSignature !== expectedSignature) {
    console.error("[PayFast ITN] Signature mismatch");
    return false;
  }

  // Server-to-server validation
  try {
    const mode = process.env.PAYFAST_MODE || "sandbox";
    const validateUrl =
      mode === "live"
        ? "https://www.payfast.co.za/eng/query/validate"
        : "https://sandbox.payfast.co.za/eng/query/validate";

    const formBody = Object.keys(pfData)
      .map((k) => `${encodeURIComponent(k)}=${encodeURIComponent(pfData[k])}`)
      .join("&");

    const response = await fetch(validateUrl, {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: formBody,
    });

    const text = await response.text();
    return text.trim() === "VALID";
  } catch (err) {
    console.error("[PayFast ITN] Validation request failed:", err);
    return false;
  }
}
