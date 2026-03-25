import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    // Allow external image domains for placeholder images
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
      {
        protocol: "https",
        hostname: "picsum.photos",
      },
    ],
  },
  // Environment variables exposed to the browser (non-secret)
  env: {
    NEXT_PUBLIC_PAYPAL_CLIENT_ID: process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID || "",
    NEXT_PUBLIC_WHATSAPP_NUMBER: process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || "",
    NEXT_PUBLIC_MESSENGER_PAGE_ID: process.env.NEXT_PUBLIC_MESSENGER_PAGE_ID || "",
    NEXT_PUBLIC_TAWKTO_PROPERTY_ID: process.env.NEXT_PUBLIC_TAWKTO_PROPERTY_ID || "",
    NEXT_PUBLIC_SITE_URL: process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000",
  },
};

export default nextConfig;
