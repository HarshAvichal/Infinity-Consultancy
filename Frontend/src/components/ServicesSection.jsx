import React from "react";
import accounting from "../images/accounting.png";
import tax from "../images/Harsh.png";
import gst from "../images/GST.png";
import health from "../images/Health.png";
import lic from "../images/Lic.png";
import software from "../images/software.png";


const ServicesSection = () => {
  return (
    <section className="bg-white py-16 relative">
      {/* Content */}
      <div className="container mx-auto px-6 md:px-12 lg:px-16 flex flex-col md:flex-row items-center gap-12 relative">
        {/* Left Section: Text */}
        <div className="md:w-1/2 space-y-8">
          <h1 className="text-5xl font-bold text-gray-800">
            Our <span className="text-blue-500">Services</span>
          </h1>
          <p className="text-lg text-gray-600 leading-8">
            Our comprehensive accounting services cover all aspects of financial
            management, ensuring accurate records and compliance with regulatory
            requirements. From maintaining ledgers to preparing financial statements,
            we handle it all, allowing you to focus on growing your business with
            confidence.
          </p>
          <p className="text-lg text-gray-600 leading-8">
            Simplify your tax obligations with our expert income-tax return services.
            Whether you're an individual or a business entity, we navigate the
            complexities of tax laws to maximize your returns while minimizing
            liabilities. Trust us to file your returns accurately and on time,
            ensuring peace of mind and financial security.
          </p>
          <p className="text-lg text-gray-600 leading-8">
            Take advantage of our extensive expertise in GST registration and return
            filing. We guide you through the process of GST compliance, from initial
            registration to periodic return submissions. With our assistance, you can
            streamline your GST obligations and avoid penalties, allowing your
            business to thrive in a competitive market.
          </p>
        </div>

        {/* Right Section: Images */}
        <div className="md:w-1/2 grid grid-cols-3 gap-8 relative">
          <div className="flex flex-col items-center">
            <img
              src={accounting}
              alt="Accounting"
              className="w-36 h-36 hover:scale-110 transition-transform duration-300 rounded-lg shadow-lg animate-zoom-1"
            />
            <p className="mt-2 text-sm font-semibold text-gray-800">Accounting Services</p>
          </div>
          <div className="flex flex-col items-center">
            <img
              src={gst}
              alt="GST"
              className="w-36 h-36 hover:scale-110 transition-transform duration-300 rounded-lg shadow-lg animate-zoom-2"
            />
            <p className="mt-2 text-sm font-semibold text-gray-800">GST Services</p>
          </div>
          <div className="flex flex-col items-center">
            <img
              src={health}
              alt="Health Insurance"
              className="w-36 h-36 hover:scale-110 transition-transform duration-300 rounded-lg shadow-lg animate-zoom-3"
            />
            <p className="mt-2 text-sm font-semibold text-gray-800">Health Insurance</p>
          </div>
          <div className="flex flex-col items-center">
            <img
              src={lic}
              alt="LIC"
              className="w-36 h-36 hover:scale-110 transition-transform duration-300 rounded-lg shadow-lg animate-zoom-4"
            />
            <p className="mt-2 text-sm font-semibold text-gray-800">Life Insurance</p>
          </div>
          <div className="flex flex-col items-center">
            <img
              src={software}
              alt="Software"
              className="w-36 h-36 hover:scale-110 transition-transform duration-300 rounded-lg shadow-lg  animate-zoom-5"
            />
            <p className="mt-2 text-sm font-semibold text-gray-800">Software Services</p>
          </div>
          <div className="flex flex-col items-center">
            <img
              src={tax}
              alt="Tax Services"
              className="w-36 h-36 hover:scale-110 transition-transform duration-300 rounded-lg shadow-lg animate-zoom-6"
            />
            <p className="mt-2 text-sm font-semibold text-gray-800">Tax Services</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;
