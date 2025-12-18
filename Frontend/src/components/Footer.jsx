import React from "react";

const Footer = () => {
  const currentYear = 2026;

  return (
    <footer className="bg-deepBlue text-white py-12 border-t border-white/5">
      <div className="container mx-auto px-6">
        <div className="flex flex-col items-center justify-center gap-6">
          {/* Copyright Line */}
          <p className="text-gray-400 text-sm md:text-base text-center">
            © {currentYear} <span className="text-white font-bold tracking-tight">Infinity Consultancy</span>. All rights reserved.
          </p>
          
          {/* Links Row */}
          <div className="flex gap-8 text-gray-500 text-xs md:text-sm font-medium">
            <a href="#" className="hover:text-lightBlue transition-colors">Terms of Service</a>
            <a href="#" className="hover:text-lightBlue transition-colors">Cookies Settings</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
