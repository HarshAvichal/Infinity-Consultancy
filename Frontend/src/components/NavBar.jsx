import React, { useState, useEffect } from "react";
import Lottie from "react-lottie";
import infinityAnimation from "../assets/lottieAnimations/Infinity-animation.json";

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const infinityOptions = {
    loop: true,
    autoplay: true,
    animationData: infinityAnimation,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };

  const navLinks = [
    { name: "Services", href: "#services" },
    { name: "About", href: "#About" },
    { name: "Enquiry / Contact", href: "#Enquiry" },
  ];

  return (
    <nav 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? "bg-deepBlue/80 backdrop-blur-md py-2 shadow-lg" : "bg-deepBlue py-4"
      }`}
    >
      <div className="w-full max-w-[1200px] mx-auto flex items-center justify-between px-6">
        <div className="flex items-center gap-1">
          {/* Infinity Consultancy Text */}
          <a href="/" className="group flex items-center gap-2 cursor-pointer">
            <span className="text-white text-xl md:text-2xl font-extrabold tracking-tight group-hover:text-lightBlue transition-colors">
              INFINITY <span className="text-lightBlue group-hover:text-white">CONSULTANCY</span>
            </span>
            {/* Infinity Animation */}
            <div className="w-16 h-16 -ml-2">
              <Lottie options={infinityOptions} />
            </div>
          </a>
        </div>

        {/* Desktop Menu */}
        <ul className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <li key={link.name}>
              <a
                href={link.href}
                className="text-white font-mullish font-medium hover:text-lightBlue transition-all relative group"
              >
                {link.name}
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-lightBlue transition-all duration-300 group-hover:w-full"></span>
              </a>
            </li>
          ))}
          <li>
            <a 
              href="#Enquiry" 
              className="bg-lightBlue hover:bg-lightBlue500 text-white px-5 py-2 rounded-full font-bold transition-all transform hover:scale-105 active:scale-95"
            >
              Get Started
            </a>
          </li>
        </ul>

        {/* Hamburger Menu for Mobile */}
        <button
          className="text-white text-3xl md:hidden focus:outline-none"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle menu"
        >
          {menuOpen ? "✕" : "☰"}
        </button>
      </div>

      {/* Mobile Menu Overlay */}
      <div
        className={`fixed inset-0 bg-deepBlue z-40 md:hidden transition-transform duration-500 ease-in-out ${
          menuOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex flex-col items-center justify-center h-full gap-8">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              className="text-white text-2xl font-bold hover:text-lightBlue"
              onClick={() => setMenuOpen(false)}
            >
              {link.name}
            </a>
          ))}
          <a
            href="#Enquiry"
            className="mt-4 bg-lightBlue text-white px-8 py-3 rounded-full font-bold text-xl"
            onClick={() => setMenuOpen(false)}
          >
            Get Started
          </a>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
