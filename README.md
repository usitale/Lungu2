# Lungu Safari Tours — Official Website

A full-stack, production-grade tourism website built with **Next.js 14**, **TypeScript**, and **Tailwind CSS**.

## Features

- Full-screen hero section with video background support
- Complete tour packages & accommodation showcase
- Multi-step booking form with validation
- **PayPal** integration (frontend SDK + backend API routes)
- **PayFast** integration (server-signed form + ITN webhook)
- Floating chat widget (WhatsApp, Messenger, Tawk.to, Phone)
- Payment success & cancel pages
- Responsive across mobile, tablet, desktop
- Safari-inspired premium design palette
- Sticky navbar, gallery lightbox, FAQ accordion, testimonials

## Quick Start

```bash
# 1. Install dependencies
npm install

# 2. Configure environment
cp .env.local.example .env.local
# Edit .env.local with your actual credentials

# 3. Run development server
npm run dev
# → http://localhost:3000

# 4. Build for production
npm run build && npm start
```

## Environment Variables

Copy `.env.local.example` to `.env.local` and fill in:

| Variable | Description |
|---|---|
| `NEXT_PUBLIC_PAYPAL_CLIENT_ID` | PayPal sandbox/live client ID |
| `PAYPAL_CLIENT_SECRET` | PayPal client secret (server-only) |
| `PAYFAST_MERCHANT_ID` | PayFast merchant ID |
| `PAYFAST_MERCHANT_KEY` | PayFast merchant key |
| `NEXT_PUBLIC_WHATSAPP_NUMBER` | WhatsApp number (with country code) |
| `NEXT_PUBLIC_MESSENGER_PAGE_ID` | Facebook Page ID |
| `NEXT_PUBLIC_TAWKTO_PROPERTY_ID` | Tawk.to property ID |

## Project Structure

```
src/
├── app/
│   ├── page.tsx                    # Main homepage
│   ├── layout.tsx                  # Root layout (chat scripts here)
│   ├── globals.css                 # Tailwind + custom styles
│   ├── payment/
│   │   ├── success/page.tsx        # Payment success page
│   │   └── cancel/page.tsx         # Payment cancel page
│   └── api/
│       ├── booking/route.ts        # Booking submission API
│       └── payment/
│           ├── paypal/
│           │   ├── create-order/   # Create PayPal order
│           │   └── capture-order/  # Capture approved order
│           └── payfast/
│               ├── create/         # Build signed PayFast form
│               └── notify/         # ITN webhook handler
├── components/                     # All page sections
├── lib/
│   ├── data.ts                     # Content/copy layer
│   ├── paypal.ts                   # PayPal server utilities
│   └── payfast.ts                  # PayFast server utilities
└── types/index.ts                  # TypeScript interfaces
```

## Payment Flow

### PayPal
1. User selects PayPal → PayPal Buttons SDK renders
2. `createOrder` → calls `/api/payment/paypal/create-order`
3. User approves in PayPal popup
4. `onApprove` → calls `/api/payment/paypal/capture-order`
5. Success → show confirmation

### PayFast
1. User clicks "Pay with PayFast"
2. Frontend calls `/api/payment/payfast/create`
3. Server builds MD5-signed form data
4. Browser auto-POSTs form to PayFast endpoint
5. PayFast processes payment and POSTs to `/api/payment/payfast/notify` (ITN)
6. PayFast redirects to `/payment/success` or `/payment/cancel`

## Chat Integration

Uncomment the relevant sections in `src/app/layout.tsx`:
- **Tawk.to**: Add property ID and widget ID
- **Facebook Messenger**: Add page ID

The floating `ChatWidget` component handles WhatsApp, Messenger, phone, and live chat toggling.

## Hero Video

Replace the video source in `src/components/Hero.tsx`:

```html
<source src="/videos/hero-safari.mp4" type="video/mp4" />
```

Place your video file in `/public/videos/`. Recommended specs:
- Format: MP4 (H.264) + WebM fallback
- Resolution: 1920×1080
- Duration: 15–30 seconds (looped)
- File size: under 15MB
- Frame rate: 25–30fps

## Deployment

Deploy to Vercel, Netlify, or any Node.js host. Set all environment variables in your hosting dashboard — never commit `.env.local`.

---

Built for Lungu Safari Tours · Southern Africa
