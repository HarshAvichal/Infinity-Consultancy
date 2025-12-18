import React from "react";

const Footer = () => {
  const currentYear = 2026;

  return (
    <footer className="bg-deepBlue text-white py-10 border-t border-white/5">
      <div className="container mx-auto px-6">
        <div className="flex flex-col items-center justify-center">
          {/* Copyright Line only */}
          <p className="text-gray-400 text-sm md:text-base text-center">
            © {currentYear} <span className="text-white font-bold tracking-tight">Infinity Consultancy</span>. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
