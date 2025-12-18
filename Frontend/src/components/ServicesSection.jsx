import React from "react";
import accounting from "../images/accounting.png";
import tax from "../images/Harsh.png";
import gst from "../images/GST.png";
import health from "../images/Health.png";
import lic from "../images/Lic.png";
import software from "../images/software.png";

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
  return (
    <section id="services" className="bg-gray-50 py-24 relative overflow-hidden">
      {/* Background patterns */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-lightBlue/5 rounded-full -mr-32 -mt-32 blur-3xl"></div>
      <div className="absolute bottom-0 left-0 w-64 h-64 bg-greenLight/5 rounded-full -ml-32 -mb-32 blur-3xl"></div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <h2 className="text-lightBlue font-bold tracking-widest text-sm uppercase">Our Expertise</h2>
          <h1 className="text-4xl md:text-5xl font-extrabold text-deepBlueHead">
            Solutions for <span className="text-lightBlue">Every Business</span> Need
          </h1>
          <p className="text-grayText text-lg leading-relaxed">
            We provide a wide range of professional services to help you manage your finances, 
            ensure compliance, and grow your business with confidence.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <div 
              key={index}
              className="group bg-white p-8 rounded-2xl shadow-sm hover:shadow-xl transition-all duration-500 transform hover:-translate-y-2 border border-gray-100 flex flex-col items-center text-center"
            >
              <div className={`w-24 h-24 ${service.color} rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-500 p-4`}>
                <img
                  src={service.image}
                  alt={service.title}
                  className="w-full h-full object-contain"
                />
              </div>
              <h3 className="text-xl font-bold text-deepBlueHead mb-3">{service.title}</h3>
              <p className="text-grayText leading-relaxed">
                {service.description}
              </p>
              <div className="mt-6 flex items-center gap-2 text-lightBlue font-bold text-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                Learn More <span>→</span>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom CTA for Services */}
        <div className="mt-20 bg-deepBlue rounded-3xl p-8 md:p-12 flex flex-col md:flex-row items-center justify-between gap-8 shadow-2xl shadow-deepBlue/20">
          <div className="text-center md:text-left space-y-2">
            <h2 className="text-white text-2xl md:text-3xl font-bold">Need a customized solution?</h2>
            <p className="text-white/60">Our experts are ready to help you with your specific requirements.</p>
          </div>
          <a 
            href="#Enquiry" 
            className="bg-greenLight hover:bg-greenLight/90 text-deepBlue px-8 py-4 rounded-xl font-bold transition-all transform hover:scale-105 active:scale-95 whitespace-nowrap"
          >
            Contact our Team
          </a>
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;
