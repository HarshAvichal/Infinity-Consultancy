import React, { useState } from "react";
import Lottie from "react-lottie";
import infinityAnimation from "../assets/lottieAnimations/Infinity-animation.json";

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  const infinityOptions = {
    loop: true,
    autoplay: true,
    animationData: infinityAnimation,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };

  return (
    <nav className="bg-deepBlue">
      <div className="relative w-full max-w-[1080px] mx-auto flex items-center justify-between px-4 py-4">
        <div className="flex items-center gap-2">
          {/* Infinity Consultancy Text */}
          <a href="/" className="cursor-pointer text-white text-2xl font-bold">
            INFINITY CONSULTANCY
          </a>
          {/* Infinity Animation */}
          <div className="w-20 h-30">
            <Lottie options={infinityOptions} />
          </div>
        </div>

        {/* Hamburger Menu for Mobile */}
        <button
          className="text-white text-3xl md:hidden"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          ☰
        </button>
        <ul
          className={`md:flex gap-6 absolute md:static bg-deepBlue md:bg-transparent w-full md:w-auto left-0 top-[70px] z-10 transition-all ${
            menuOpen ? "block" : "hidden"
          }`}
        >
          <li className="text-white font-mullish py-2 px-4 md:py-0 hover:text-lightBlue cursor-pointer">
            <a href="#services">Services</a>
          </li>
          <li className="text-white font-mullish py-2 px-4 md:py-0 hover:text-lightBlue cursor-pointer">
            <a href="#About">About</a>
          </li>
          <li className="text-white font-mullish py-2 px-4 md:py-0 hover:text-lightBlue cursor-pointer">
            <a href="#Enquiry">Enquiry / Contact</a>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
