import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMapMarkerAlt, faBuilding } from "@fortawesome/free-solid-svg-icons";

const BranchesSection = () => {
  const branches = [
    {
      city: "Bilimora",
      isHeadquarters: true,
      year: "Since 1989",
      address: "C-50, Shantinagar Township, Bilimora(W) - 396321",
    },
    {
      city: "Vapi",
      isHeadquarters: false,
      type: "Branch Office",
    },
    {
      city: "Surat",
      isHeadquarters: false,
      type: "Branch Office",
    },
    {
      city: "Navsari",
      isHeadquarters: false,
      type: "Branch Office",
    },
    {
      city: "Valsad",
      isHeadquarters: false,
      type: "Branch Office",
    },
  ];

  return (
    <section className="bg-white py-16 md:py-24 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-lightBlue/5 rounded-full -mr-48 -mt-48 blur-3xl"></div>
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-greenLight/5 rounded-full -ml-48 -mb-48 blur-3xl"></div>

      <div className="container mx-auto px-6 relative z-10">
        {/* Section Header */}
        <div className="text-center mb-12 md:mb-16 space-y-4">
          <div className="inline-block px-4 py-1 rounded-full bg-lightBlue/10 text-lightBlue text-sm font-bold tracking-wider uppercase mb-2">
            Our Presence
          </div>
          <h1 className="text-4xl md:text-6xl font-extrabold text-deepBlueHead tracking-tight">
            Growing <span className="text-lightBlue">Together</span>
          </h1>
          <div className="w-20 h-1.5 bg-lightBlue mx-auto rounded-full"></div>
          <p className="text-grayText text-lg max-w-2xl mx-auto mt-4">
            From our roots in Bilimora to serving clients across Gujarat, our expansion reflects our commitment to excellence
          </p>
        </div>

        {/* Timeline Section */}
        <div className="max-w-5xl mx-auto">
          {/* Timeline Header */}
          <div className="flex items-center justify-between mb-8 px-4">
            <div className="text-center">
              <div className="text-lightBlue font-black text-3xl md:text-4xl">1989</div>
              <div className="text-grayText text-sm mt-1">Our Beginning</div>
            </div>
            <div className="flex-1 h-1 bg-gradient-to-r from-lightBlue via-greenLight to-purple-500 mx-4 rounded-full"></div>
            <div className="text-center">
              <div className="text-lightBlue font-black text-3xl md:text-4xl">2025</div>
              <div className="text-grayText text-sm mt-1">Today</div>
            </div>
          </div>

          {/* Headquarters Card (Bilimora) */}
          <div className="mb-12">
            <div className="relative">
              <div className="absolute left-1/2 -translate-x-1/2 w-4 h-4 bg-lightBlue rounded-full z-10 animate-pulse"></div>
              <div className="absolute left-1/2 -translate-x-1/2 w-8 h-8 bg-lightBlue/20 rounded-full animate-ping"></div>
            </div>
            
            <div className="flex justify-center mt-8">
              <div className="group bg-gradient-to-br from-lightBlue/10 to-purple-500/10 border-2 border-lightBlue p-6 md:p-8 rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 max-w-md w-full">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-12 h-12 bg-lightBlue rounded-xl flex items-center justify-center">
                    <FontAwesomeIcon icon={faBuilding} className="text-white text-xl" />
                  </div>
                  <div>
                    <h3 className="text-2xl font-black text-deepBlueHead">{branches[0].city}</h3>
                    <div className="flex items-center gap-2 mt-1">
                      <span className="bg-lightBlue text-white px-3 py-1 rounded-full text-xs font-bold">
                        MAIN OFFICE
                      </span>
                      <span className="text-lightBlue text-sm font-bold">{branches[0].year}</span>
                    </div>
                  </div>
                </div>
                <div className="flex items-start gap-2 text-grayText text-sm mt-4">
                  <FontAwesomeIcon icon={faMapMarkerAlt} className="text-lightBlue mt-1" />
                  <p className="leading-relaxed">{branches[0].address}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Branch Offices Grid */}
          <div className="relative">
            {/* Vertical line connecting to branches */}
            <div className="absolute left-1/2 -translate-x-1/2 w-1 h-12 bg-gradient-to-b from-lightBlue to-transparent hidden md:block"></div>
            
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 mt-12">
              {branches.slice(1).map((branch, index) => (
                <div
                  key={index}
                  className="group bg-white border-2 border-gray-100 hover:border-lightBlue p-4 md:p-6 rounded-2xl shadow-sm hover:shadow-xl transition-all duration-500 transform hover:-translate-y-2"
                >
                  <div className="flex flex-col items-center text-center">
                    <div className="w-10 h-10 md:w-12 md:h-12 bg-lightBlue/10 rounded-xl flex items-center justify-center mb-3 group-hover:scale-110 transition-transform duration-500">
                      <FontAwesomeIcon icon={faMapMarkerAlt} className="text-lightBlue text-lg md:text-xl" />
                    </div>
                    <h4 className="text-lg md:text-xl font-bold text-deepBlueHead mb-1">{branch.city}</h4>
                    <span className="text-xs text-grayText font-medium">{branch.type}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Stats/Impact Section */}
          <div className="mt-16 bg-gradient-to-r from-lightBlue to-purple-500 rounded-3xl p-8 md:p-12 text-white text-center">
            <div className="grid grid-cols-3 gap-6 md:gap-8">
              <div>
                <div className="text-3xl md:text-5xl font-black mb-2">5+</div>
                <div className="text-white/80 text-sm md:text-base">Locations</div>
              </div>
              <div>
                <div className="text-3xl md:text-5xl font-black mb-2">36+</div>
                <div className="text-white/80 text-sm md:text-base">Years</div>
              </div>
              <div>
                <div className="text-3xl md:text-5xl font-black mb-2">1000+</div>
                <div className="text-white/80 text-sm md:text-base">Clients</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default BranchesSection;

