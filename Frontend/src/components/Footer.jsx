import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFacebookF, faInstagram, faLinkedinIn, faXTwitter } from "@fortawesome/free-brands-svg-icons";
import { faPhone, faEnvelope, faLocationDot } from "@fortawesome/free-solid-svg-icons";

const Footer = () => {
  const currentYear = 2026; // As requested

  return (
    <footer className="bg-deepBlue text-white pt-16 pb-8 border-t border-white/5">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
          {/* Brand Column */}
          <div className="space-y-6">
            <a href="/" className="text-2xl font-black tracking-tight">
              INFINITY <span className="text-lightBlue">CONSULTANCY</span>
            </a>
            <p className="text-gray-400 text-sm leading-relaxed max-w-xs">
              Expert Tax Guidance & Financial Advisory. Providing professional accounting and GST services since 2015.
            </p>
            <div className="flex gap-4">
              {[faFacebookF, faInstagram, faLinkedinIn, faXTwitter].map((icon, i) => (
                <a 
                  key={i} 
                  href="#" 
                  className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center hover:bg-lightBlue hover:text-white transition-all border border-white/10"
                >
                  <FontAwesomeIcon icon={icon} size="sm" />
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-bold mb-6">Quick Links</h4>
            <ul className="space-y-4">
              {["Services", "About", "Enquiry", "Privacy Policy"].map((link) => (
                <li key={link}>
                  <a href={`#${link}`} className="text-gray-400 hover:text-lightBlue transition-colors text-sm flex items-center gap-2 group">
                    <span className="w-1.5 h-1.5 rounded-full bg-lightBlue opacity-0 group-hover:opacity-100 transition-opacity"></span>
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Services Summary */}
          <div>
            <h4 className="text-lg font-bold mb-6">Our Services</h4>
            <ul className="space-y-4 text-sm text-gray-400">
              <li>Income-Tax Returns</li>
              <li>GST Registration</li>
              <li>Accounting Services</li>
              <li>Life & Health Insurance</li>
            </ul>
          </div>

          {/* Contact Summary */}
          <div>
            <h4 className="text-lg font-bold mb-6">Contact Us</h4>
            <ul className="space-y-4">
              <li className="flex items-start gap-3 text-gray-400 text-sm">
                <FontAwesomeIcon icon={faLocationDot} className="text-lightBlue mt-1" />
                <span>C-50, Shantinagar Township, Bilimora(W) - 396321</span>
              </li>
              <li className="flex items-center gap-3 text-gray-400 text-sm">
                <FontAwesomeIcon icon={faPhone} className="text-lightBlue" />
                <a href="tel:8460818184" className="hover:text-white transition-colors">8460818184</a>
              </li>
              <li className="flex items-center gap-3 text-gray-400 text-sm">
                <FontAwesomeIcon icon={faEnvelope} className="text-lightBlue" />
                <a href="mailto:nevil04@gmail.com" className="hover:text-white transition-colors">nevil04@gmail.com</a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-gray-500 text-xs md:text-sm text-center md:text-left">
            © {currentYear} <span className="text-white font-bold">Infinity Consultancy</span>. All rights reserved.
          </p>
          <div className="flex gap-6 text-gray-500 text-xs md:text-sm">
            <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
            <a href="#" className="hover:text-white transition-colors">Cookies Settings</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

