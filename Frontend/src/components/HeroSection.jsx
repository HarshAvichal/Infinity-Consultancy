import React from "react";
import Lottie from "react-lottie";
import taxAnimation from "../assets/lottieAnimations/tax-animation.json";

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
    <section className="relative bg-[#02042a] min-h-screen flex items-center justify-center">
      <div className="flex flex-col md:flex-row items-center justify-between w-10/12 max-w-[1280px] mx-auto space-y-12 md:space-y-0">
        {/* Left Section */}
        <div className="space-y-6 text-center md:text-left">
          <h1 className="text-white font-bold text-4xl md:text-5xl leading-snug">
            Expert Tax Guidance for Your Financial Journey
          </h1>
          <div className="w-16 h-1 bg-[#61cea6] mx-auto md:mx-0"></div>
          <p className="text-white opacity-70 text-lg md:text-xl">
            From Payments to Payouts, We've Got You Covered: Our comprehensive
            financial services ensure every aspect of your finances is managed
            with expertise.
          </p>
        </div>

        {/* Right Section */}
        <div>
          <Lottie options={animationOptions} height={400} width={400} />
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
