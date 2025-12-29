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
    <section className="relative bg-deepBlue min-h-screen flex items-center justify-center overflow-hidden pt-20">
      {/* Background Decorative Elements */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-lightBlue/10 rounded-full blur-[120px]"></div>
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-greenLight/10 rounded-full blur-[120px]"></div>
      </div>

      <div className="container mx-auto px-6 md:px-12 flex flex-col md:flex-row items-center justify-between z-10 space-y-12 md:space-y-0">
        {/* Left Section */}
        <div className="w-full md:w-1/2 space-y-8 text-center md:text-left">
          <div className="flex flex-col md:flex-row items-center md:items-start gap-6">
            <div className="inline-block px-4 py-1 rounded-full bg-lightBlue/10 border border-lightBlue/20 text-lightBlue font-semibold text-sm animate-pulse">
              Trusted Financial Partners
            </div>
          </div>
          
          <h1 className="text-white font-extrabold text-4xl md:text-6xl leading-[1.1] tracking-tight">
            Expert <span className="text-lightBlue">Tax Guidance</span> <br />
            <span className="text-3xl md:text-5xl opacity-90">
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

          <p className="text-grayish/80 text-lg md:text-xl max-w-xl leading-relaxed">
            From Payments to Payouts, We've Got You Covered. Our comprehensive
            financial services ensure every aspect of your finances is managed
            with expertise and precision.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center md:justify-start gap-4 pt-4">
            <a
              href="#Enquiry"
              className="w-full sm:w-auto bg-lightBlue hover:bg-lightBlue500 text-white px-8 py-4 rounded-lg font-bold text-lg shadow-lg shadow-lightBlue/20 transition-all transform hover:-translate-y-1"
            >
              Consult Now
            </a>
            <a
              href="#services"
              className="w-full sm:w-auto border border-white/20 hover:border-white/40 text-white px-8 py-4 rounded-lg font-bold text-lg transition-all backdrop-blur-sm"
            >
              Our Services
            </a>
          </div>

          {/* Stats or Trust badges */}
          <div className="pt-8 flex items-center justify-center md:justify-start gap-8 opacity-60">
            <div>
              <p className="text-white text-2xl font-bold">36+</p>
              <p className="text-white/60 text-sm">Years Exp.</p>
            </div>
            <div className="w-px h-8 bg-white/20"></div>
            <div>
              <p className="text-white text-2xl font-bold">1000+</p>
              <p className="text-white/60 text-sm">Happy Clients</p>
            </div>
            <div className="w-px h-8 bg-white/20"></div>
            <div>
              <p className="text-white text-2xl font-bold">100%</p>
              <p className="text-white/60 text-sm">Compliance</p>
            </div>
          </div>
        </div>

        {/* Right Section */}
        <div className="w-full md:w-1/2 flex justify-center relative">
          <div className="absolute w-[80%] h-[80%] bg-lightBlue/20 rounded-full blur-[100px] animate-pulse"></div>
          <div className="relative z-10 w-full max-w-[500px]">
            <Lottie options={animationOptions} />
            {/* Floating Trust Card */}
            <a 
              href="#About" 
              className="absolute -bottom-6 -left-6 md:-left-12 bg-white/10 backdrop-blur-xl border border-white/20 p-4 rounded-2xl shadow-2xl hidden sm:block animate-bounce-slow hover:bg-white/20 hover:scale-105 transition-all cursor-pointer group/card"
            >
              <div className="flex items-center gap-4">
                <img src={directorImage} alt="Nevil Gandhi" className="w-12 h-12 rounded-xl object-cover border-2 border-lightBlue/50" />
                <div>
                  <p className="text-white font-bold text-sm">Nevil Gandhi</p>
                  <p className="text-lightBlue text-xs">Director & Advisor</p>
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
