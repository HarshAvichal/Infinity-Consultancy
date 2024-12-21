import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleDot } from "@fortawesome/free-solid-svg-icons";

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
    <section id="services" className="bg-[#e7e7e7] py-8 overflow-hidden">
      <div className="relative flex overflow-x-hidden">
        {/* First Marquee */}
        <div className="flex items-center space-x-12 animate-marquee">
          {marqueeItems.map((item, index) => (
            <span
              key={index}
              className="text-xl font-semibold flex items-center gap-2 text-gray-800 whitespace-nowrap"
            >
              <FontAwesomeIcon icon={faCircleDot} className="text-blue-500" />
              {item}
            </span>
          ))}
        </div>

        {/* Second Marquee (reverse direction) */}
        <div className="absolute flex items-center space-x-12 top-0 animate-marquee2">
          {marqueeItems.map((item, index) => (
            <span
              key={index}
              className="text-xl font-semibold flex items-center gap-2 text-gray-800 whitespace-nowrap"
            >
              <FontAwesomeIcon icon={faCircleDot} className="text-blue-500" />
              {item}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
};

export default MarqueeSection;
