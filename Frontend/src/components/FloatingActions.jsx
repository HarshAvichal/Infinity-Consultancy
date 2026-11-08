import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faWhatsapp } from "@fortawesome/free-brands-svg-icons";
import { faPhone } from "@fortawesome/free-solid-svg-icons";

const WHATSAPP_URL =
  "https://wa.me/918460818184?text=" +
  encodeURIComponent("Hello Infinity Consultancy, I would like to enquire about your services.");

const FloatingActions = () => (
  <div className="fixed bottom-5 right-5 z-[90] flex flex-col gap-3">
    <a
      href="tel:8460818184"
      aria-label="Call Infinity Consultancy"
      className="md:hidden w-12 h-12 rounded-full bg-deepBlue border border-lightBlue/40 text-lightBlue flex items-center justify-center shadow-xl"
    >
      <FontAwesomeIcon icon={faPhone} />
    </a>
    <a
      href={WHATSAPP_URL}
      target="_blank"
      rel="noreferrer"
      aria-label="Chat on WhatsApp"
      className="w-14 h-14 rounded-full bg-[#25D366] text-white flex items-center justify-center shadow-xl shadow-black/30 hover:scale-110 transition-transform"
    >
      <FontAwesomeIcon icon={faWhatsapp} className="text-3xl" />
    </a>
  </div>
);

export default FloatingActions;
