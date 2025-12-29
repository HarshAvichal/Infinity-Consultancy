import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes, faChevronLeft, faChevronRight } from "@fortawesome/free-solid-svg-icons";
import accounting from "../images/accounting.png";
import tax from "../images/Harsh.png";
import gst from "../images/GST.png";
import health from "../images/Health.png";
import lic from "../images/Lic.png";
import software from "../images/software.png";
import servicelist1 from "../images/servicelist1.jpeg";
import servicelist2 from "../images/servicelist2.jpeg";

const services = [
  {
    title: "Accounting Services",
    description: "Comprehensive financial management ensuring accurate records and regulatory compliance.",
    image: accounting,
    color: "bg-blue-500/10",
    textColor: "text-blue-600"
  },
  {
    title: "GST Services",
    description: "Expert assistance in GST registration, return filing, and ensuring complete compliance.",
    image: gst,
    color: "bg-green-500/10",
    textColor: "text-green-600"
  },
  {
    title: "Tax Services",
    description: "Navigating complex tax laws to maximize your returns while minimizing liabilities.",
    image: tax,
    color: "bg-red-500/10",
    textColor: "text-red-600"
  },
  {
    title: "Health Insurance",
    description: "Securing your future with the best health insurance plans tailored for your needs.",
    image: health,
    color: "bg-purple-500/10",
    textColor: "text-purple-600"
  },
  {
    title: "Life Insurance",
    description: "Reliable LIC policies and advisory to protect you and your loved ones.",
    image: lic,
    color: "bg-yellow-500/10",
    textColor: "text-yellow-600"
  },
  {
    title: "Software Services",
    description: "Modern digital solutions and software implementation for business efficiency.",
    image: software,
    color: "bg-indigo-500/10",
    textColor: "text-indigo-600"
  }
];

const ServicesSection = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const serviceListImages = [servicelist1, servicelist2];

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % serviceListImages.length);
  };

  const prevImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + serviceListImages.length) % serviceListImages.length);
  };

  // Handle keyboard navigation
  React.useEffect(() => {
    const handleKeyPress = (e) => {
      if (isModalOpen) {
        if (e.key === "Escape") closeModal();
        if (e.key === "ArrowRight") nextImage();
        if (e.key === "ArrowLeft") prevImage();
      }
    };
    window.addEventListener("keydown", handleKeyPress);
    return () => window.removeEventListener("keydown", handleKeyPress);
  }, [isModalOpen]);

  // Prevent body scroll when modal is open
  React.useEffect(() => {
    if (isModalOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isModalOpen]);

  return (
    <section id="services" className="bg-gray-50 py-12 md:py-24 relative overflow-hidden">
      {/* Background patterns */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-lightBlue/5 rounded-full -mr-32 -mt-32 blur-3xl"></div>
      <div className="absolute bottom-0 left-0 w-64 h-64 bg-greenLight/5 rounded-full -ml-32 -mb-32 blur-3xl"></div>

      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-10 md:mb-16 space-y-4">
          <h2 className="text-lightBlue font-bold tracking-widest text-xs md:text-sm uppercase">Our Expertise</h2>
          <h1 className="text-3xl md:text-5xl font-extrabold text-deepBlueHead">
            Solutions for <span className="text-lightBlue">Every Business</span> Need
          </h1>
          <p className="text-grayText text-sm md:text-lg leading-relaxed">
            We provide a wide range of professional services to help you manage your finances, 
            ensure compliance, and grow your business with confidence.
          </p>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-3 gap-4 md:gap-8">
          {services.map((service, index) => (
            <div 
              key={index}
              className="group bg-white p-4 md:p-8 rounded-2xl shadow-sm hover:shadow-xl transition-all duration-500 transform hover:-translate-y-2 border border-gray-100 flex flex-col items-center text-center"
            >
              <div className={`w-16 h-16 md:w-24 md:h-24 ${service.color} rounded-xl md:rounded-2xl flex items-center justify-center mb-4 md:mb-6 group-hover:scale-110 transition-transform duration-500 p-2 md:p-4`}>
                <img
                  src={service.image}
                  alt={service.title}
                  className="w-full h-full object-contain"
                />
              </div>
              <h3 className="text-sm md:text-xl font-bold text-deepBlueHead mb-2 md:mb-3 leading-tight">{service.title}</h3>
              <p className="text-xs md:text-lg text-grayText leading-relaxed line-clamp-3 md:line-clamp-none">
                {service.description}
              </p>
            </div>
          ))}
        </div>

        {/* Know More Section */}
        <div className="mt-12 md:mt-16 text-center">
          <div className="max-w-2xl mx-auto space-y-4">
            <p className="text-grayText text-sm md:text-lg">
              Want to explore our complete range of services?
            </p>
            <button
              onClick={openModal}
              className="inline-flex items-center gap-3 bg-lightBlue hover:bg-lightBlue500 text-white px-8 py-4 rounded-xl font-bold text-base md:text-lg shadow-lg shadow-lightBlue/20 transition-all transform hover:-translate-y-1 active:scale-95"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
              View Complete Service List
              <span>→</span>
            </button>
          </div>
        </div>

        {/* Bottom CTA for Services */}
        <div className="mt-12 md:mt-20 bg-deepBlue rounded-2xl md:rounded-[40px] p-6 md:p-12 flex flex-col md:flex-row items-center justify-between gap-6 md:gap-8 shadow-2xl shadow-deepBlue/20 relative overflow-hidden group">
          {/* Subtle background glow for the CTA */}
          <div className="absolute top-0 right-0 w-32 h-32 bg-lightBlue/10 rounded-full -mr-16 -mt-16 blur-2xl group-hover:scale-150 transition-transform duration-700"></div>
          
          <div className="text-center md:text-left space-y-2 relative z-10">
            <h2 className="text-white text-xl md:text-3xl font-black">Need a customized solution?</h2>
            <p className="text-white/60 text-xs md:text-lg">Our experts are ready to help you with your specific requirements.</p>
          </div>
          
          <a 
            href="#Enquiry" 
            className="w-full md:w-auto bg-greenLight hover:bg-greenLight/90 text-deepBlue px-6 md:px-8 py-3.5 md:py-4 rounded-xl font-black text-sm md:text-base transition-all transform hover:-translate-y-1 active:scale-95 whitespace-nowrap text-center relative z-10"
          >
            Contact our Team
          </a>
        </div>

        {/* Service List Modal */}
        {isModalOpen && (
          <div
            className="fixed inset-0 bg-black/95 z-[200] flex items-center justify-center p-4"
            onClick={closeModal}
          >
            {/* Close Button */}
            <button
              onClick={closeModal}
              className="absolute top-4 right-4 md:top-8 md:right-8 text-white hover:text-lightBlue transition-colors z-[210] bg-black/50 rounded-full p-3 hover:bg-black/70"
              aria-label="Close modal"
            >
              <FontAwesomeIcon icon={faTimes} className="text-2xl" />
            </button>

            {/* Navigation Buttons */}
            {serviceListImages.length > 1 && (
              <>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    prevImage();
                  }}
                  className="absolute left-4 md:left-8 top-1/2 -translate-y-1/2 text-white hover:text-lightBlue transition-colors z-[210] bg-black/50 rounded-full p-4 hover:bg-black/70"
                  aria-label="Previous image"
                >
                  <FontAwesomeIcon icon={faChevronLeft} className="text-xl" />
                </button>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    nextImage();
                  }}
                  className="absolute right-4 md:right-8 top-1/2 -translate-y-1/2 text-white hover:text-lightBlue transition-colors z-[210] bg-black/50 rounded-full p-4 hover:bg-black/70"
                  aria-label="Next image"
                >
                  <FontAwesomeIcon icon={faChevronRight} className="text-xl" />
                </button>
              </>
            )}

            {/* Image Container */}
            <div
              className="max-w-6xl max-h-[90vh] w-full flex items-center justify-center"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="relative">
                <img
                  src={serviceListImages[currentImageIndex]}
                  alt={`Service List ${currentImageIndex + 1}`}
                  className="max-w-full max-h-[90vh] object-contain rounded-lg shadow-2xl"
                />
                {/* Image Counter */}
                {serviceListImages.length > 1 && (
                  <div className="absolute top-4 left-4 bg-black/70 text-white px-4 py-2 rounded-full text-sm font-bold backdrop-blur-sm">
                    {currentImageIndex + 1} / {serviceListImages.length}
                  </div>
                )}
                {/* Image Title */}
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-6 rounded-b-lg">
                  <p className="text-white font-bold text-lg md:text-xl text-center">
                    Complete Service Catalog
                  </p>
                </div>
              </div>
            </div>

            {/* Instructions */}
            <div className="absolute bottom-8 left-1/2 -translate-x-1/2 text-white/60 text-sm hidden md:block">
              Use arrow keys or click arrows to navigate • Press ESC to close
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default ServicesSection;
