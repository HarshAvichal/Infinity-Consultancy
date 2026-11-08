import React from "react";

const Footer = () => (
  <footer className="bg-deepBlue text-white pt-14 pb-8 border-t border-lightBlue/15">
    <div className="container mx-auto px-6">
      <div className="flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="text-center md:text-left">
          <p className="font-display text-2xl tracking-wide">
            <span className="gold-text">∞</span> Infinity Consultancy
          </p>
          <p className="text-white/50 text-sm mt-1">Tax, GST, accounting &amp; insurance since 1989</p>
        </div>
        <nav className="flex gap-8 text-sm text-white/70">
          <a href="#services" className="hover:text-greenLight transition-colors">Services</a>
          <a href="#About" className="hover:text-greenLight transition-colors">About</a>
          <a href="#Gallery" className="hover:text-greenLight transition-colors">Gallery</a>
          <a href="#Enquiry" className="hover:text-greenLight transition-colors">Enquiry</a>
        </nav>
      </div>
      <div className="mt-10 pt-6 border-t border-white/10 text-center text-white/40 text-xs">
        © {new Date().getFullYear()} Infinity Consultancy. All rights reserved.
      </div>
    </div>
  </footer>
);

export default Footer;
