import React from "react";
import { ReactTyped } from "react-typed";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight, faShieldHalved } from "@fortawesome/free-solid-svg-icons";
import heroImage from "../gallery/office-desk-4.jpg";
import CountUp from "./CountUp";

const stats = [
  { value: "36+", label: "Years of Experience" },
  { value: "1000+", label: "Happy Clients" },
  { value: "100%", label: "Compliance" },
];

const HeroSection = () => {
  return (
    <section className="relative bg-deepBlue min-h-screen flex items-center overflow-hidden pt-28 pb-16 md:pt-24">
      {/* Background */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute inset-0 bg-grid opacity-70"></div>
        <div className="absolute top-[-15%] left-[-10%] w-[55%] h-[55%] bg-lightBlue/10 rounded-full blur-[140px]"></div>
        <div className="absolute bottom-[-20%] right-[-10%] w-[50%] h-[50%] bg-lightBlue/10 rounded-full blur-[160px]"></div>
      </div>

      <div className="container mx-auto px-6 md:px-12 grid md:grid-cols-2 gap-12 md:gap-8 items-center z-10 relative">
        {/* Left */}
        <div className="space-y-6 md:space-y-8 text-center md:text-left">
          <div style={{ animationDelay: "0ms" }} className="fade-up inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-lightBlue/30 bg-lightBlue/5 text-greenLight text-xs md:text-sm font-medium tracking-[0.2em] uppercase">
            <span className="w-1.5 h-1.5 rounded-full bg-lightBlue"></span>
            Trusted Since 1989
          </div>

          <h1
            aria-label="Expert Tax Guidance for Your Financial Journey"
            style={{ animationDelay: "150ms" }}
            className="fade-up text-white text-[2.5rem] leading-[1.1] md:text-6xl lg:text-7xl md:leading-[1.05] min-h-[150px] md:min-h-[230px]"
          >
            Expert <span className="gold-text italic">Tax Guidance</span>
            <br />
            <span className="text-[1.6rem] md:text-4xl lg:text-5xl text-white/85 font-normal">
              for Your{" "}
              <ReactTyped
                strings={["Financial Journey", "Business Growth", "Peace of Mind"]}
                typeSpeed={60}
                backSpeed={40}
                loop
                className="text-greenLight"
              />
            </span>
          </h1>

          <p style={{ animationDelay: "300ms" }} className="fade-up text-white/65 text-base md:text-lg max-w-xl mx-auto md:mx-0 leading-relaxed">
            From payments to payouts, we've got you covered. Our comprehensive financial
            services keep every aspect of your finances managed with expertise and precision.
          </p>

          <div style={{ animationDelay: "450ms" }} className="fade-up flex flex-col sm:flex-row items-center justify-center md:justify-start gap-4">
            <a
              href="#Enquiry"
              className="btn-gold w-full sm:w-auto inline-flex items-center justify-center gap-3 px-8 py-4 rounded-full font-semibold transition-all hover:-translate-y-0.5"
            >
              Consult Now
              <FontAwesomeIcon icon={faArrowRight} className="text-sm" />
            </a>
            <a
              href="#services"
              className="w-full sm:w-auto text-center border border-white/20 hover:border-lightBlue/60 hover:text-greenLight text-white px-8 py-4 rounded-full font-semibold transition-all"
            >
              Our Services
            </a>
          </div>

          <div style={{ animationDelay: "600ms" }} className="fade-up pt-4 md:pt-6 grid grid-cols-3 gap-4 max-w-md mx-auto md:mx-0 border-t border-white/10">
            {stats.map((s) => (
              <div key={s.label} className="pt-5">
                <p className="gold-text text-3xl md:text-4xl font-display font-semibold"><CountUp value={s.value} /></p>
                <p className="text-white/50 text-[11px] md:text-xs mt-1 uppercase tracking-wider">{s.label}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Right */}
        <div style={{ animationDelay: "300ms" }} className="fade-up relative flex justify-center md:justify-end">
          <div className="relative w-[82%] max-w-[440px]">
            <div className="absolute -inset-4 rounded-t-[999px] rounded-b-[2rem] border border-lightBlue/30"></div>
            <div className="absolute -inset-10 bg-lightBlue/10 blur-3xl rounded-full"></div>
            <div className="relative w-full aspect-[4/5] overflow-hidden rounded-t-[999px] rounded-b-[2rem] shadow-2xl shadow-black/50">
              <img
                src={heroImage}
                alt="Nevil Gandhi at his desk in the Infinity Consultancy office"
                className="w-full h-full object-cover scale-[1.55] origin-[50%_46%]"
              />
            </div>

            <a
              href="#About"
              className="glass float-slow absolute -bottom-6 -left-4 md:-left-12 rounded-2xl p-4 pr-6 flex items-center gap-3 hover:scale-105 transition-transform"
            >
              <span className="w-11 h-11 rounded-xl bg-lightBlue/15 flex items-center justify-center text-lightBlue">
                <FontAwesomeIcon icon={faShieldHalved} />
              </span>
              <span>
                <span className="block text-white font-semibold text-sm">Nevil Gandhi</span>
                <span className="block text-greenLight text-xs">Director &amp; Tax Advisor</span>
              </span>
            </a>

            <div className="glass float-slower absolute -top-4 -right-2 md:-right-8 rounded-2xl px-5 py-3 text-center">
              <p className="gold-text font-display text-2xl font-semibold leading-none">1989</p>
              <p className="text-white/60 text-[10px] uppercase tracking-widest mt-1">Established</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
