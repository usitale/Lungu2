import Navbar from "@/components/Navbar";
import OffersBanner from "@/components/OffersBanner";
import Hero from "@/components/Hero";
import About from "@/components/About";
import TourPackages from "@/components/TourPackages";
import Accommodation from "@/components/Accommodation";
import Destinations from "@/components/Destinations";
import WhyChooseUs from "@/components/WhyChooseUs";
import Testimonials from "@/components/Testimonials";
import Gallery from "@/components/Gallery";
import FAQ from "@/components/FAQ";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import ChatWidget from "@/components/ChatWidget";

export default function Home() {
  return (
    <>
      {/* Sticky navigation */}
      <Navbar />

      {/* Promotional banner */}
      <OffersBanner />

      {/* Hero: Full-screen video section */}
      <Hero />

      {/* About Lungu Safari Tours */}
      <About />

      {/* Safari tour packages */}
      <TourPackages />

      {/* Accommodation options */}
      <Accommodation />

      {/* Featured destinations */}
      <Destinations />

      {/* Why choose us */}
      <WhyChooseUs />

      {/* Testimonials */}
      <Testimonials />

      {/* Photo gallery */}
      <Gallery />

      {/* FAQ section */}
      <FAQ />

      {/* Contact & Booking form with payment */}
      <Contact />

      {/* Footer */}
      <Footer />

      {/* Floating chat widget */}
      <ChatWidget />
    </>
  );
}
