import React, { useState, useEffect, useRef } from "react";
import Lottie from "react-lottie";
import infinityAnimation from "../assets/lottieAnimations/Infinity-animation.json";

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const scrollPositionRef = useRef(0);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Prevent body scroll when mobile menu is open
  useEffect(() => {
    if (menuOpen) {
      // Save current scroll position BEFORE changing overflow
      scrollPositionRef.current = window.scrollY || window.pageYOffset || document.documentElement.scrollTop;
      
      // Simply prevent scrolling without changing scroll position
      // Apply to both html and body for better compatibility
      document.documentElement.style.overflow = 'hidden';
      document.body.style.overflow = 'hidden';
      // Also prevent touch scrolling on mobile
      document.body.style.touchAction = 'none';
    } else {
      // Restore scrolling
      document.documentElement.style.overflow = '';
      document.body.style.overflow = '';
      document.body.style.touchAction = '';
      
      // Restore scroll position immediately after removing overflow
      // Use requestAnimationFrame to ensure it happens after the style change
      requestAnimationFrame(() => {
        const savedPosition = scrollPositionRef.current;
        if (savedPosition !== undefined && savedPosition !== null) {
          window.scrollTo(0, savedPosition);
        }
      });
    }
    return () => {
      // Cleanup on unmount
      document.documentElement.style.overflow = '';
      document.body.style.overflow = '';
      document.body.style.touchAction = '';
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
    { name: "Enquiry", href: "#Enquiry" },
  ];

  return (
    <nav 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? "bg-deepBlue/80 backdrop-blur-md py-2 shadow-lg" : "bg-deepBlue py-4"
      }`}
    >
      <div className="relative z-50 w-full max-w-[1200px] mx-auto flex items-center justify-between px-4 md:px-6">
        <div className="flex items-center gap-1">
          {/* Infinity Consultancy Logo with "since 1989" */}
          <a 
            href="#"
            onClick={(e) => {
              e.preventDefault();
              // Smooth scroll to top
              window.scrollTo({
                top: 0,
                behavior: 'smooth'
              });
            }}
            className="group flex items-center gap-1 md:gap-2 cursor-pointer"
          >
            <div className="flex flex-col">
              <span className="text-white text-lg sm:text-xl md:text-2xl font-extrabold tracking-tight group-hover:text-lightBlue transition-colors whitespace-nowrap leading-tight">
                INFINITY <span className="text-white group-hover:text-lightBlue">CONSULTANCY</span>
              </span>
              <span className="text-gray-400 text-[10px] sm:text-xs md:text-sm font-medium tracking-wider uppercase mt-0.5 group-hover:text-lightBlue/80 transition-colors">
                since 1989
              </span>
            </div>
            {/* Infinity Animation */}
            <div className="w-12 h-12 sm:w-16 sm:h-16 -ml-1 md:-ml-2">
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
        </ul>

        {/* Hamburger Menu for Mobile */}
        <button
          type="button"
          className="text-white text-3xl md:hidden focus:outline-none relative z-[50]"
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            setMenuOpen(!menuOpen);
          }}
          aria-label="Toggle menu"
        >
          {menuOpen ? "✕" : "☰"}
        </button>
      </div>

      {/* Mobile Menu Overlay */}
      <div
        className={`fixed inset-0 bg-deepBlue z-[45] md:hidden transition-transform duration-500 ease-in-out ${
          menuOpen ? "translate-x-0" : "translate-x-full"
        }`}
        style={{ 
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          width: '100vw',
          height: '100vh',
          willChange: 'transform',
          margin: 0,
          padding: 0
        }}
        onClick={(e) => {
          // Close menu if clicking on the overlay background (not on links)
          if (e.target === e.currentTarget) {
            setMenuOpen(false);
          }
        }}
      >
        <div className="flex flex-col items-center justify-center h-full gap-8 px-6">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              className="text-white text-2xl font-bold hover:text-lightBlue transition-colors w-full text-center py-2"
              onClick={(e) => {
                e.preventDefault();
                // Close menu first
                setMenuOpen(false);
                // Wait for menu to close, then scroll to section
                setTimeout(() => {
                  const element = document.querySelector(link.href);
                  if (element) {
                    const offset = 100; // Account for fixed navbar
                    const elementPosition = element.getBoundingClientRect().top;
                    const offsetPosition = elementPosition + window.pageYOffset - offset;
                    window.scrollTo({
                      top: offsetPosition,
                      behavior: 'smooth'
                    });
                  }
                }, 350);
              }}
            >
              {link.name}
            </a>
          ))}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
