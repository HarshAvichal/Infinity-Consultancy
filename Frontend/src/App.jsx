import React from "react";
import NavBar from "./components/NavBar";
import HeroSection from "./components/HeroSection";
import MarqueeSection from "./components/MarqueeSection";
import ServicesSection from "./components/ServicesSection";
// Add other sections as needed
import AboutSection from "./components/AboutSection"; // Example
import EnquirySection from "./components/EnquirySection"; // Example

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
    </div>
  );
};

export default App;
