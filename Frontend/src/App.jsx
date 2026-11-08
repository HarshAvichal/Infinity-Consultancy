import React from "react";
import NavBar from "./components/NavBar";
import HeroSection from "./components/HeroSection";
import MarqueeSection from "./components/MarqueeSection";
import ServicesSection from "./components/ServicesSection";
import AboutSection from "./components/AboutSection";
import BranchesSection from "./components/BranchesSection";
import GallerySection from "./components/GallerySection";
import EnquirySection from "./components/EnquirySection";
import Footer from "./components/Footer";
import FloatingActions from "./components/FloatingActions";

const App = () => {
  return (
    <div className="bg-ivory">
      {/* Navbar */}
      <NavBar />

      {/* Hero Section */}
      <HeroSection />

      {/* Marquee Section */}
      <MarqueeSection />

      {/* Services Section */}
      <ServicesSection />

      {/* About Section */}
      <AboutSection />

      {/* Branches Section */}
      <BranchesSection />

      {/* Gallery Section */}
      <GallerySection />

      {/* Enquiry Section */}
      <EnquirySection />

      <Footer />
      <FloatingActions />
    </div>
  );
};

export default App;
