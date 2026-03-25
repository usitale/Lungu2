// ============================================================
// Lungu Safari Tours — Static Content / Data Layer
// In production, replace with CMS or database queries
// ============================================================

import type {
  TourPackage,
  Accommodation,
  Destination,
  Testimonial,
  FAQItem,
} from "@/types";

export const tourPackages: TourPackage[] = [
  {
    id: "wildlife-safari",
    name: "Classic Wildlife Safari",
    description:
      "Immerse yourself in the raw beauty of Africa. Guided game drives through national parks teeming with the Big Five — lion, leopard, elephant, buffalo, and rhino.",
    duration: "5 Days / 4 Nights",
    groupSize: "2–10 People",
    price: 1450,
    currency: "USD",
    highlights: [
      "Daily morning & sunset game drives",
      "Professional wildlife guide",
      "Luxury tented lodge accommodation",
      "All meals included",
      "Park entry fees included",
    ],
    image: "https://images.unsplash.com/photo-1516426122078-c23e76319801?w=800&q=80",
    badge: "Most Popular",
    popular: true,
  },
  {
    id: "family-safari",
    name: "Family Safari Package",
    description:
      "Create lifelong memories with your family. Child-friendly game drives, bush walks, and cultural experiences designed for all ages.",
    duration: "7 Days / 6 Nights",
    groupSize: "Family (up to 6)",
    price: 2800,
    currency: "USD",
    highlights: [
      "Family-friendly lodge with pool",
      "Junior ranger programme",
      "Guided bush walks (supervised)",
      "Cultural village visit",
      "All meals and snacks",
    ],
    image: "https://images.unsplash.com/photo-1547471080-7cc2caa01a7e?w=800&q=80",
    badge: "Family Favourite",
  },
  {
    id: "luxury-safari",
    name: "Luxury Safari Experience",
    description:
      "The pinnacle of African safari. Private game reserve, gourmet dining under the stars, spa treatments, and exclusive sightings with a personal guide.",
    duration: "6 Days / 5 Nights",
    groupSize: "2–4 People",
    price: 4200,
    currency: "USD",
    highlights: [
      "Exclusive private game reserve",
      "Private game drives & tracker",
      "Gourmet bush dinners",
      "Spa & wellness facilities",
      "Helicopter scenic flight",
    ],
    image: "https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?w=800&q=80",
    badge: "Premium",
  },
  {
    id: "weekend-getaway",
    name: "Weekend Safari Getaway",
    description:
      "Short on time but craving adventure? Our weekend getaway packs the best of safari into two unforgettable days.",
    duration: "2 Days / 1 Night",
    groupSize: "2–8 People",
    price: 480,
    currency: "USD",
    highlights: [
      "Sunrise game drive",
      "Sunset boat cruise",
      "Bush braai (BBQ) experience",
      "Comfortable safari lodge",
      "Professional guide included",
    ],
    image: "https://images.unsplash.com/photo-1493246507139-91e8fad9978e?w=800&q=80",
    badge: "Quick Escape",
  },
  {
    id: "group-adventure",
    name: "Group Adventure Tour",
    description:
      "Perfect for friends, colleagues, or travel groups. A high-energy safari experience blending wildlife, adventure activities, and social evenings.",
    duration: "8 Days / 7 Nights",
    groupSize: "10–20 People",
    price: 1200,
    currency: "USD",
    highlights: [
      "White water rafting",
      "Walking safari",
      "Night game drives",
      "Cultural exchange programme",
      "Group-rate pricing",
    ],
    image: "https://images.unsplash.com/photo-1504432842672-1a79f78e4084?w=800&q=80",
    badge: "Group Special",
  },
];

export const accommodations: Accommodation[] = [
  {
    id: "bushveld-lodge",
    name: "Bushveld Safari Lodge",
    type: "Safari Lodge",
    description:
      "Wake up to the sounds of the bush in our signature thatched-roof lodge. Open verandas, plunge pools, and panoramic views of the waterhole.",
    amenities: [
      "Private plunge pool",
      "En-suite bathroom",
      "Air conditioning",
      "Game viewing deck",
      "Daily housekeeping",
      "Wi-Fi",
      "In-room minibar",
    ],
    pricePerNight: 320,
    currency: "USD",
    image: "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=800&q=80",
    rating: 5,
    badge: "Flagship Property",
  },
  {
    id: "luxury-tented-camp",
    name: "Luxury Tented Camp",
    type: "Tented Camp",
    description:
      "Experience the romance of classic African exploration in our elevated canvas tents, each with handcrafted wooden furniture and solar-powered lighting.",
    amenities: [
      "King-size bed",
      "Outdoor shower",
      "Private deck",
      "Butler service",
      "Evening turndown",
      "Mosquito nets",
      "Safe",
    ],
    pricePerNight: 280,
    currency: "USD",
    image: "https://images.unsplash.com/photo-1504432842672-1a79f78e4084?w=800&q=80",
    rating: 5,
    badge: "Most Romantic",
  },
  {
    id: "river-view-chalet",
    name: "River View Chalet",
    type: "Chalet",
    description:
      "Set on the banks of the Luangwa River, these private chalets offer front-row seats to hippos, crocodiles, and countless bird species.",
    amenities: [
      "River-facing balcony",
      "Twin or double beds",
      "En-suite bathroom",
      "Ceiling fan",
      "Mosquito net",
      "Tea & coffee station",
    ],
    pricePerNight: 195,
    currency: "USD",
    image: "https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=800&q=80",
    rating: 4,
  },
  {
    id: "family-villa",
    name: "Safari Family Villa",
    type: "Villa",
    description:
      "Spacious two-bedroom villa designed for families, with a shared lounge, private garden, children's play area, and dedicated safari vehicle.",
    amenities: [
      "2 Bedrooms",
      "Private garden",
      "Full kitchen",
      "Children's play area",
      "Dedicated vehicle",
      "Nanny service available",
      "Wi-Fi",
    ],
    pricePerNight: 450,
    currency: "USD",
    image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&q=80",
    rating: 5,
    badge: "Family Choice",
  },
];

export const destinations: Destination[] = [
  {
    id: "south-luangwa",
    name: "South Luangwa National Park",
    country: "Zambia",
    description:
      "One of Africa's finest wildlife sanctuaries. Dense wildlife, walking safaris, and legendary leopard sightings.",
    image: "https://images.unsplash.com/photo-1516426122078-c23e76319801?w=800&q=80",
    tags: ["Big Five", "Walking Safaris", "Night Drives"],
  },
  {
    id: "lower-zambezi",
    name: "Lower Zambezi",
    country: "Zambia",
    description:
      "Safari on land and on water. Canoe past elephants and hippos along the mighty Zambezi River.",
    image: "https://images.unsplash.com/photo-1504432842672-1a79f78e4084?w=800&q=80",
    tags: ["River Safari", "Canoeing", "Fishing"],
  },
  {
    id: "victoria-falls",
    name: "Victoria Falls",
    country: "Zambia/Zimbabwe",
    description:
      "Witness the world's largest waterfall — 'The Smoke That Thunders'. A UNESCO World Heritage Site.",
    image: "https://images.unsplash.com/photo-1547471080-7cc2caa01a7e?w=800&q=80",
    tags: ["Wonder of Nature", "Adventure", "UNESCO Site"],
  },
  {
    id: "kafue",
    name: "Kafue National Park",
    country: "Zambia",
    description:
      "Zambia's largest national park. Remote wilderness, diverse ecosystems, and some of the most authentic safari experiences in Africa.",
    image: "https://images.unsplash.com/photo-1493246507139-91e8fad9978e?w=800&q=80",
    tags: ["Vast Wilderness", "Diverse Wildlife", "Off-the-Beaten-Path"],
  },
];

export const testimonials: Testimonial[] = [
  {
    id: "t1",
    name: "Sarah & James Thornton",
    country: "United Kingdom",
    rating: 5,
    review:
      "Lungu Safari Tours gave us the most extraordinary experience of our lives. From the moment we landed to our final sunset game drive, every detail was perfectly arranged. Our guide Emmanuel had an encyclopaedic knowledge of the bush and genuine passion for wildlife conservation. We saw all of the Big Five on day one!",
    avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&q=80",
    tripTaken: "Classic Wildlife Safari, 2024",
  },
  {
    id: "t2",
    name: "The Nakamura Family",
    country: "Japan",
    rating: 5,
    review:
      "We were initially nervous about taking our children on safari, but Lungu Safari Tours made it completely magical and safe. The family villa was incredible and our kids still talk about the junior ranger programme every day. This was our best family holiday ever — we're already planning our return trip!",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&q=80",
    tripTaken: "Family Safari Package, 2024",
  },
  {
    id: "t3",
    name: "Dr. Amara Osei",
    country: "Ghana",
    rating: 5,
    review:
      "The Luxury Safari Experience was genuinely worth every penny. The private game reserve felt like it was ours alone. The gourmet dinners under the African sky, the spa, and that helicopter flight over the Zambezi — pure perfection. Lungu Safari delivers on every promise.",
    avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&q=80",
    tripTaken: "Luxury Safari Experience, 2023",
  },
  {
    id: "t4",
    name: "Michelle Kowalski",
    country: "United States",
    rating: 5,
    review:
      "I booked the Weekend Safari Getaway on short notice and could not believe how seamless the whole experience was. The booking process was simple, the team was incredibly responsive on WhatsApp, and the safari itself was breathtaking. I saw a leopard with her cubs. I'll never forget it.",
    avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&q=80",
    tripTaken: "Weekend Safari Getaway, 2024",
  },
  {
    id: "t5",
    name: "Tonderai Banda",
    country: "Zimbabwe",
    rating: 5,
    review:
      "As someone who grew up in Southern Africa, I have high standards for safari experiences. Lungu Safari Tours exceeded them all. The accommodation was world-class, the guiding was exceptional, and the attention to sustainability and community upliftment really resonated with me.",
    avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&q=80",
    tripTaken: "Group Adventure Tour, 2024",
  },
];

export const faqs: FAQItem[] = [
  {
    question: "What is the best time of year to go on safari?",
    answer:
      "The optimal safari season in Zambia runs from May to October (dry season). During this period, vegetation is low, wildlife concentrates around water sources, and game viewing is at its finest. July–October offers peak sightings. The green season (November–April) is also beautiful, with lush landscapes and excellent bird watching.",
  },
  {
    question: "How do I book a safari or accommodation?",
    answer:
      "Booking is straightforward. Fill out our online booking form on this page, selecting your preferred package, dates, and number of guests. Our team will confirm availability within 24 hours and guide you through payment. You can also call, email, or WhatsApp us directly for a personalised consultation.",
  },
  {
    question: "What payment methods do you accept?",
    answer:
      "We accept online payments via PayPal and PayFast. We also accept bank transfers. A 30% deposit secures your booking, with the balance due 30 days before departure. Our payment platform is fully secured with SSL encryption.",
  },
  {
    question: "What is your cancellation and refund policy?",
    answer:
      "Cancellations made 60+ days before departure: Full refund minus a 10% admin fee. 30–59 days: 50% refund. Under 30 days: No refund, but we will do our best to reschedule. We strongly recommend purchasing comprehensive travel insurance to protect your investment.",
  },
  {
    question: "Is it safe to bring children on safari?",
    answer:
      "Absolutely. Our Family Safari Package is specifically designed for families with children of all ages. Our guides are trained in child safety protocols, all vehicles have appropriate safety equipment, and our lodges have child-friendly facilities. Children must be at least 5 years old for certain activities such as walking safaris.",
  },
  {
    question: "What should I pack for my safari?",
    answer:
      "Neutral-coloured clothing (khaki, beige, olive), lightweight layers for cool mornings and evenings, a sun hat, sunscreen, insect repellent, comfortable walking shoes, binoculars, and a camera with extra memory cards. Avoid bright colours and strong perfumes as they can disturb wildlife.",
  },
  {
    question: "Are meals included in the packages?",
    answer:
      "Most of our tour packages are fully inclusive of all meals, including bush breakfasts, packed lunches, and dinners. Our accommodation packages vary — please check the specific package details or ask our team. We cater for all dietary requirements including vegetarian, vegan, and allergy-specific diets.",
  },
  {
    question: "Do I need a visa to visit Zambia?",
    answer:
      "Visa requirements depend on your nationality. Many nationalities can obtain a visa on arrival or a KAZA UniVisa (covering Zambia and Zimbabwe). We recommend checking with your nearest Zambian embassy or the e-visa portal before travel. Our team is happy to advise you on the process.",
  },
  {
    question: "What vaccinations or health precautions are required?",
    answer:
      "We recommend consulting your doctor or a travel health clinic at least 6–8 weeks before departure. Malaria prophylaxis is strongly advised for most safari destinations. Yellow fever vaccination may be required depending on your country of origin. Comprehensive travel health insurance is essential.",
  },
  {
    question: "Can you accommodate solo travellers?",
    answer:
      "Yes! Solo travellers are warmly welcome. We can match you with small-group departures to make the experience more affordable, or arrange fully private solo safaris. Single supplement fees may apply for accommodation. Contact us and we will find the perfect solution for you.",
  },
];

export const galleryImages = [
  {
    id: "g1",
    src: "https://images.unsplash.com/photo-1516426122078-c23e76319801?w=600&q=80",
    alt: "Lion pride at sunset",
    category: "Wildlife",
  },
  {
    id: "g2",
    src: "https://images.unsplash.com/photo-1547471080-7cc2caa01a7e?w=600&q=80",
    alt: "Elephant herd at waterhole",
    category: "Wildlife",
  },
  {
    id: "g3",
    src: "https://images.unsplash.com/photo-1504432842672-1a79f78e4084?w=600&q=80",
    alt: "Safari vehicle at sunrise",
    category: "Safari",
  },
  {
    id: "g4",
    src: "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=600&q=80",
    alt: "Luxury safari lodge",
    category: "Lodges",
  },
  {
    id: "g5",
    src: "https://images.unsplash.com/photo-1493246507139-91e8fad9978e?w=600&q=80",
    alt: "African savanna landscape",
    category: "Landscapes",
  },
  {
    id: "g6",
    src: "https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?w=600&q=80",
    alt: "Travellers enjoying sundowners",
    category: "Experiences",
  },
  {
    id: "g7",
    src: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=600&q=80",
    alt: "Mountain sunset Africa",
    category: "Landscapes",
  },
  {
    id: "g8",
    src: "https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=600&q=80",
    alt: "Infinity pool lodge view",
    category: "Lodges",
  },
  {
    id: "g9",
    src: "https://images.unsplash.com/photo-1503756234508-e32369269ddf?w=600&q=80",
    alt: "Leopard in tree",
    category: "Wildlife",
  },
  {
    id: "g10",
    src: "https://images.unsplash.com/photo-1477959858617-67f85cf4f1df?w=600&q=80",
    alt: "African sunrise",
    category: "Landscapes",
  },
  {
    id: "g11",
    src: "https://images.unsplash.com/photo-1474314881477-04c4aac40a0e?w=600&q=80",
    alt: "Giraffes on the plains",
    category: "Wildlife",
  },
  {
    id: "g12",
    src: "https://images.unsplash.com/photo-1501854140801-50d01698950b?w=600&q=80",
    alt: "Aerial view of savanna",
    category: "Landscapes",
  },
];
