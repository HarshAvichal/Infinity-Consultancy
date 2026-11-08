import React, { useState, useEffect } from "react";
import InfinityLogo from "./InfinityLogo";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPhone, faLocationDot, faEnvelope } from "@fortawesome/free-solid-svg-icons";

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

  const navLinks = [
    { name: "Services", href: "#services" },
    { name: "About", href: "#About" },
    { name: "Gallery", href: "#Gallery" },
    { name: "Enquiry", href: "#Enquiry" },
  ];

  const handleLogoClick = (e) => {
    e.preventDefault();
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  return (
    <>
    <nav 
      className={`fixed top-0 left-0 right-0 z-[100] transition-all duration-300 ${
        scrolled ? "bg-deepBlue/85 backdrop-blur-xl py-2 border-b border-lightBlue/15 shadow-lg shadow-black/20" : "bg-transparent py-4"
      }`}
    >
      <div className="relative z-[101] w-full max-w-[1200px] mx-auto flex items-center justify-between px-4 md:px-6">
        <div className="flex items-center gap-1 justify-start">
          {/* Infinity Consultancy Text */}
          <button 
            onClick={handleLogoClick}
            className="group flex items-center gap-1 md:gap-2 cursor-pointer bg-transparent border-none p-0 text-left"
          >
            <div className="flex flex-col text-left">
              <span className="text-white text-lg sm:text-xl md:text-2xl font-semibold tracking-[0.08em] group-hover:text-greenLight transition-colors whitespace-nowrap text-left">
                INFINITY <span className="text-white/70 group-hover:text-greenLight">CONSULTANCY</span>
              </span>
              <span className="text-lightBlue text-[10px] sm:text-xs font-medium tracking-[0.3em] uppercase text-left">Since 1989</span>
            </div>
            <InfinityLogo className="w-14 h-7 sm:w-[4.5rem] sm:h-9 ml-1" />
          </button>
        </div>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center gap-6">
          <ul className="flex items-center gap-8">
            {navLinks.map((link) => (
              <li key={link.name}>
                <a
                  href={link.href}
                  className="text-white/80 text-sm tracking-wide font-medium hover:text-greenLight transition-all relative group"
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
              className="bg-white/5 hover:bg-lightBlue/15 p-2.5 rounded-full w-10 h-10 flex items-center justify-center border border-white/10 transition-all hover:scale-110"
              title="Call Us"
            >
              <FontAwesomeIcon icon={faPhone} className="text-lightBlue text-sm" />
            </a>
            <a 
              href="#Enquiry" 
              className="bg-white/5 hover:bg-lightBlue/15 p-2.5 rounded-full w-10 h-10 flex items-center justify-center border border-white/10 transition-all hover:scale-110"
              title="Enquiry"
            >
              <FontAwesomeIcon icon={faEnvelope} className="text-greenLight text-sm" />
            </a>
            <a 
              href="https://maps.google.com/?q=Infinity+Consultancy+Bilimora" 
              target="_blank" 
              rel="noreferrer"
              className="bg-white/5 hover:bg-lightBlue/15 p-2.5 rounded-full w-10 h-10 flex items-center justify-center border border-white/10 transition-all hover:scale-110"
              title="Find Us"
            >
              <FontAwesomeIcon icon={faLocationDot} className="text-lightBlue text-sm" />
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
            <button 
              onClick={(e) => {
                e.preventDefault();
                setMenuOpen(false);
                window.scrollTo({
                  top: 0,
                  behavior: 'smooth'
                });
              }}
              className="flex items-center gap-2 bg-transparent border-none p-0 cursor-pointer text-left"
            >
              <div className="flex flex-col text-left">
                <span className="text-white text-lg font-extrabold tracking-tight text-left">
                  INFINITY <span className="text-white">CONSULTANCY</span>
                </span>
                <span className="text-white/70 text-[10px] font-medium tracking-wide text-left">Since 1989</span>
              </div>
            </button>
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
                className="text-white text-xl font-semibold hover:text-greenLight transition-colors py-3 font-display border-b border-white/10 last:border-0"
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
                <FontAwesomeIcon icon={faLocationDot} className="text-lightBlue text-lg" />
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
