import React, { useState, useEffect } from "react";
import Lottie from "react-lottie";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPhone, faLocationDot, faEnvelope } from "@fortawesome/free-solid-svg-icons";
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

  // Prevent body scroll when menu is open
  useEffect(() => {
    if (menuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [menuOpen]);

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
    { name: "Gallery", href: "#Gallery" },
    { name: "Enquiry", href: "#Enquiry" },
  ];

  return (
    <>
    <nav 
      className={`fixed top-0 left-0 right-0 z-[100] transition-all duration-300 ${
        scrolled ? "bg-deepBlue/80 backdrop-blur-md py-2 shadow-lg" : "bg-deepBlue py-4"
      }`}
    >
      <div className="relative z-[101] w-full max-w-[1200px] mx-auto flex items-center justify-between px-4 md:px-6">
        <div className="flex items-center gap-1">
          {/* Infinity Consultancy Text */}
          <a href="/" className="group flex items-center gap-1 md:gap-2 cursor-pointer">
            <div className="flex flex-col">
              <span className="text-white text-lg sm:text-xl md:text-2xl font-extrabold tracking-tight group-hover:text-lightBlue transition-colors whitespace-nowrap">
                INFINITY <span className="text-white group-hover:text-lightBlue">CONSULTANCY</span>
              </span>
              <span className="text-white/70 text-[10px] sm:text-xs md:text-sm font-medium tracking-wide">Since 1989</span>
            </div>
            {/* Infinity Animation */}
            <div className="w-12 h-12 sm:w-16 sm:h-16 -ml-1 md:-ml-2">
              <Lottie options={infinityOptions} />
            </div>
          </a>
        </div>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center gap-6">
          <ul className="flex items-center gap-8">
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
          </ul>
          {/* Quick Action Buttons for Desktop */}
          <div className="flex items-center gap-3 ml-4 pl-4 border-l border-white/20">
            <a 
              href="tel:8460818184" 
              className="bg-white/5 hover:bg-white/10 p-2.5 rounded-xl flex items-center justify-center border border-white/10 transition-all hover:scale-110"
              title="Call Us"
            >
              <FontAwesomeIcon icon={faPhone} className="text-lightBlue text-sm" />
            </a>
            <a 
              href="#Enquiry" 
              className="bg-white/5 hover:bg-white/10 p-2.5 rounded-xl flex items-center justify-center border border-white/10 transition-all hover:scale-110"
              title="Enquiry"
            >
              <FontAwesomeIcon icon={faEnvelope} className="text-greenLight text-sm" />
            </a>
            <a 
              href="https://maps.google.com/?q=Infinity+Consultancy+Bilimora" 
              target="_blank" 
              rel="noreferrer"
              className="bg-white/5 hover:bg-white/10 p-2.5 rounded-xl flex items-center justify-center border border-white/10 transition-all hover:scale-110"
              title="Find Us"
            >
              <FontAwesomeIcon icon={faLocationDot} className="text-purple-400 text-sm" />
            </a>
          </div>
        </div>

        {/* Hamburger Menu for Mobile */}
        <button
          className="text-white text-3xl md:hidden focus:outline-none relative z-[150]"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle menu"
        >
          {menuOpen ? "✕" : "☰"}
        </button>
      </div>
    </nav>

      {/* Mobile Menu Overlay - Outside nav for proper layering */}
      {menuOpen && (
      <div
        className="fixed inset-0 bg-deepBlue z-[120] md:hidden"
      >
        <div className="flex flex-col h-full">
          {/* Header in Mobile Menu */}
          <div className="flex items-center justify-between p-6 border-b border-white/10">
            <div className="flex items-center gap-2">
              <div className="flex flex-col">
                <span className="text-white text-lg font-extrabold tracking-tight">
                  INFINITY <span className="text-white">CONSULTANCY</span>
                </span>
                <span className="text-white/70 text-[10px] font-medium tracking-wide">Since 1989</span>
              </div>
            </div>
            <button
              className="text-white text-3xl focus:outline-none"
              onClick={() => setMenuOpen(false)}
              aria-label="Close menu"
            >
              ✕
            </button>
          </div>

          {/* Navigation Links */}
          <div className="flex-1 flex flex-col justify-center px-6 py-8 gap-6">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className="text-white text-xl font-semibold hover:text-lightBlue transition-colors py-3 border-b border-white/10 last:border-0"
                onClick={() => setMenuOpen(false)}
              >
                {link.name}
              </a>
            ))}
          </div>

          {/* Quick Action Buttons */}
          <div className="p-6 border-t border-white/10">
            <p className="text-white/60 text-xs font-semibold uppercase tracking-wider mb-4">Quick Actions</p>
            <div className="grid grid-cols-3 gap-3">
              <a 
                href="tel:8460818184" 
                className="bg-white/5 hover:bg-white/10 p-4 rounded-2xl flex flex-col items-center gap-2 border border-white/10 transition-all active:scale-95"
                onClick={() => setMenuOpen(false)}
              >
                <FontAwesomeIcon icon={faPhone} className="text-lightBlue text-lg" />
                <span className="text-white text-[10px] font-bold uppercase">Call</span>
              </a>
              <a 
                href="#Enquiry" 
                className="bg-white/5 hover:bg-white/10 p-4 rounded-2xl flex flex-col items-center gap-2 border border-white/10 transition-all active:scale-95"
                onClick={() => setMenuOpen(false)}
              >
                <FontAwesomeIcon icon={faEnvelope} className="text-greenLight text-lg" />
                <span className="text-white text-[10px] font-bold uppercase">Enquiry</span>
              </a>
              <a 
                href="https://maps.google.com/?q=Infinity+Consultancy+Bilimora" 
                target="_blank" 
                rel="noreferrer"
                className="bg-white/5 hover:bg-white/10 p-4 rounded-2xl flex flex-col items-center gap-2 border border-white/10 transition-all active:scale-95"
                onClick={() => setMenuOpen(false)}
              >
                <FontAwesomeIcon icon={faLocationDot} className="text-purple-400 text-lg" />
                <span className="text-white text-[10px] font-bold uppercase">Map</span>
              </a>
            </div>
          </div>
        </div>
      </div>
      )}
    </>
  );
};

export default Navbar;
