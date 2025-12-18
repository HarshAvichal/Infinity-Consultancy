import React from "react";
import Lottie from "react-lottie";
import { ReactTyped } from "react-typed";
import taxAnimation from "../assets/lottieAnimations/tax-animation.json";
import directorImage from "../images/nevil.jpeg";

const HeroSection = () => {
  const animationOptions = {
    loop: true,
    autoplay: true,
    animationData: taxAnimation,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };

  return (
    <section className="relative bg-deepBlue min-h-screen flex items-center justify-center overflow-hidden pt-28 pb-10 md:pt-20 md:pb-0">
      {/* Background Decorative Elements - Enhanced for Mobile */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
        <div className="absolute top-[-5%] left-[-10%] w-[70%] h-[50%] md:w-[40%] md:h-[40%] bg-lightBlue/15 rounded-full blur-[100px] opacity-60 md:opacity-100"></div>
        <div className="absolute bottom-[-5%] right-[-10%] w-[70%] h-[50%] md:w-[40%] md:h-[40%] bg-greenLight/10 rounded-full blur-[100px] opacity-60 md:opacity-100"></div>
      </div>

      <div className="container mx-auto px-6 md:px-12 flex flex-col md:flex-row items-center justify-between z-10 space-y-10 md:space-y-0">
        {/* Left Section */}
        <div className="w-full md:w-1/2 space-y-6 md:space-y-8 text-center md:text-left">
          <div className="flex flex-col md:flex-row items-center md:items-start gap-4">
            <div className="inline-block px-4 py-1 rounded-full bg-lightBlue/10 border border-lightBlue/20 text-lightBlue font-bold text-[10px] md:text-sm tracking-widest uppercase animate-pulse">
              Trusted Financial Partners
            </div>
          </div>
          
          <h1 className="text-white font-black text-3xl sm:text-4xl md:text-6xl leading-[1.2] md:leading-[1.1] tracking-tight">
            Expert <span className="text-lightBlue">Tax Guidance</span> <br />
            <span className="text-2xl sm:text-3xl md:text-5xl opacity-90 block mt-1">
              for Your{" "}
              <ReactTyped
                strings={["Financial Journey", "Business Growth", "Success"]}
                typeSpeed={60}
                backSpeed={40}
                loop
                className="text-greenLight"
              />
            </span>
          </h1>

          <p className="text-grayish/70 text-sm md:text-xl max-w-xl mx-auto md:mx-0 leading-relaxed font-medium px-2 md:px-0">
            From Payments to Payouts, We've Got You Covered. Our comprehensive
            financial services ensure every aspect of your finances is managed
            with expertise and precision.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center md:justify-start gap-4 pt-2">
            <a
              href="#Enquiry"
              className="w-full sm:w-auto bg-lightBlue hover:bg-lightBlue500 text-white px-8 py-3.5 md:py-4 rounded-xl font-black text-base md:text-lg shadow-lg shadow-lightBlue/25 transition-all transform hover:-translate-y-1 active:scale-95"
            >
              Consult Now
            </a>
            <a
              href="#services"
              className="w-full sm:w-auto border border-white/10 hover:border-white/30 text-white px-8 py-3.5 md:py-4 rounded-xl font-bold text-base md:text-lg transition-all backdrop-blur-sm"
            >
              Our Services
            </a>
          </div>

          {/* Stats - More compact on Mobile */}
          <div className="pt-6 md:pt-8 flex items-center justify-center md:justify-start gap-6 md:gap-8 border-t border-white/5 md:border-0 mb-4 md:mb-0">
            <div className="text-center">
              <p className="text-white text-xl md:text-2xl font-black">10+</p>
              <p className="text-white/40 text-[10px] md:text-sm uppercase font-bold">Years Exp.</p>
            </div>
            <div className="w-px h-6 md:h-8 bg-white/10"></div>
            <div className="text-center">
              <p className="text-white text-xl md:text-2xl font-black">500+</p>
              <p className="text-white/40 text-[10px] md:text-sm uppercase font-bold">Clients</p>
            </div>
            <div className="w-px h-6 md:h-8 bg-white/10"></div>
            <div className="text-center">
              <p className="text-white text-xl md:text-2xl font-black">100%</p>
              <p className="text-white/40 text-[10px] md:text-sm uppercase font-bold">Trust</p>
            </div>
          </div>
        </div>

        {/* Right Section */}
        <div className="w-full md:w-1/2 flex justify-center relative pt-8 md:pt-0">
          <div className="absolute w-[90%] h-[90%] md:w-[80%] md:h-[80%] bg-lightBlue/15 rounded-full blur-[80px] animate-pulse"></div>
          <div className="relative z-10 w-full max-w-[240px] sm:max-w-[350px] md:max-w-[500px]">
            <Lottie options={animationOptions} />
            {/* Floating Trust Card - Adjusted position to prevent overlap */}
            <a 
              href="#About" 
              className="absolute -bottom-10 left-1/2 -translate-x-1/2 md:bottom-[-6px] md:-left-12 md:translate-x-0 bg-[#0a0c2e]/90 backdrop-blur-2xl border border-white/10 p-3 md:p-4 rounded-2xl shadow-2xl animate-bounce-slow hover:bg-white/10 hover:scale-105 transition-all cursor-pointer group/card border-l-lightBlue border-l-4 w-[200px] md:w-auto"
            >
              <div className="flex items-center gap-3 md:gap-4">
                <img src={directorImage} alt="Nevil Gandhi" className="w-10 h-10 md:w-12 md:h-12 rounded-lg object-cover border border-white/20" />
                <div>
                  <p className="text-white font-black text-xs md:text-sm">Nevil Gandhi</p>
                  <p className="text-lightBlue text-[10px] md:text-xs font-bold uppercase tracking-tight">Director & Advisor</p>
                </div>
              </div>
            </a>
          </div>
        </div>
      </div>
      <style dangerouslySetInnerHTML={{ __html: `
        @keyframes bounce-slow {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-10px); }
        }
        .animate-bounce-slow {
          animation: bounce-slow 4s ease-in-out infinite;
        }
      `}} />
    </section>
  );
};

export default HeroSection;
