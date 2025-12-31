import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleCheck } from "@fortawesome/free-solid-svg-icons";

const MarqueeSection = () => {
  const marqueeItems = [
    "Accounting",
    "Income-Tax Return",
    "GST Registration & Return",
    "Digital Signature Certificate",
    "Trade Mark Registration",
    "Pan Card / TAN Number",
    "GST & IT Audit",
    "Computerized Billing Systems",
    "Company Formation & ROC",
    "Life Insurance",
    "Health Insurance",
    "General Insurance",
    "TDS Return",
    "MSME Certificate",
    "Import / Export Code",
    "Provident Fund",
    "Bank Loans",
    "CMA Data",
  ];

  return (
    <section className="bg-[#f8fafc] border-y border-gray-100 py-10 overflow-hidden relative z-20 md:shadow-[0_15px_50px_-15px_rgba(0,0,0,0.08)]">
      {/* Decorative gradient overlays for smooth fading on edges */}
      <div className="absolute inset-y-0 left-0 w-16 md:w-48 bg-gradient-to-r from-[#f8fafc] via-[#f8fafc]/80 to-transparent z-10"></div>
      <div className="absolute inset-y-0 right-0 w-16 md:w-48 bg-gradient-to-l from-[#f8fafc] via-[#f8fafc]/80 to-transparent z-10"></div>

      <div className="flex overflow-hidden group">
        <div className="flex items-center space-x-16 animate-marquee-mobile md:animate-marquee whitespace-nowrap py-2">
          {marqueeItems.map((item, index) => (
            <span
              key={index}
              className="text-slate-500 hover:text-lightBlue transition-all duration-300 font-bold text-sm uppercase tracking-wider flex items-center gap-4"
            >
              <FontAwesomeIcon icon={faCircleCheck} className="text-lightBlue text-base" />
              {item}
            </span>
          ))}
          {/* Repeat for seamless loop */}
          {marqueeItems.map((item, index) => (
            <span
              key={`repeat-${index}`}
              className="text-slate-500 hover:text-lightBlue transition-all duration-300 font-bold text-sm uppercase tracking-wider flex items-center gap-4"
            >
              <FontAwesomeIcon icon={faCircleCheck} className="text-lightBlue text-base" />
              {item}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
};

export default MarqueeSection;
