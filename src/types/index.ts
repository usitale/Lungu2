// ============================================================
// Lungu Safari Tours — Shared TypeScript Types
// ============================================================

export interface TourPackage {
  id: string;
  name: string;
  description: string;
  duration: string;
  groupSize: string;
  price: number;
  currency: string;
  highlights: string[];
  image: string;
  badge?: string;
  popular?: boolean;
}

export interface Accommodation {
  id: string;
  name: string;
  type: string;
  description: string;
  amenities: string[];
  pricePerNight: number;
  currency: string;
  image: string;
  rating: number;
  badge?: string;
}

export interface Destination {
  id: string;
  name: string;
  country: string;
  description: string;
  image: string;
  tags: string[];
}

export interface Testimonial {
  id: string;
  name: string;
  country: string;
  rating: number;
  review: string;
  avatar: string;
  tripTaken: string;
}

export interface FAQItem {
  question: string;
  answer: string;
}

export interface BookingFormData {
  fullName: string;
  email: string;
  phone: string;
  guests: number;
  travelDateFrom: string;
  travelDateTo: string;
  serviceType: "trip" | "accommodation" | "both";
  selectedPackage: string;
  specialRequests: string;
}

export interface BookingSummary extends BookingFormData {
  bookingId: string;
  totalAmount: number;
  currency: string;
  packageName: string;
  createdAt: string;
}

export interface PaymentMethod {
  id: "paypal" | "payfast";
  label: string;
  description: string;
  logo: string;
}
