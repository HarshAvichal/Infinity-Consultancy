import React from "react";
import NavBar from "./components/NavBar";
import HeroSection from "./components/HeroSection";
import MarqueeSection from "./components/MarqueeSection";
import ServicesSection from "./components/ServicesSection";
import AboutSection from "./components/AboutSection";
import EnquirySection from "./components/EnquirySection";
import Footer from "./components/Footer";

const App = () => {
  return (
    <div className="bg-gray-100">
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

      {/* Enquiry Section */}
      <EnquirySection />

      {/* Footer Section */}
      <Footer />
    </div>
  );
};

export default App;
