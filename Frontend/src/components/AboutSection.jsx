import React, { useRef, useEffect } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/effect-creative";
import { Navigation, Pagination, Keyboard, EffectCreative } from "swiper/modules";
import Lottie from "react-lottie";
import { ReactTyped } from "react-typed";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronLeft, faChevronRight } from "@fortawesome/free-solid-svg-icons";

// Import animations and images
import visionAnimation from "../assets/lottieAnimations/vision-animation.json";
import missionAnimation from "../assets/lottieAnimations/mission-animation.json";
import directorImage from "../images/nevil.jpeg";

const AboutSection = () => {
  const prevRef = useRef(null);
  const nextRef = useRef(null);
  const swiperRef = useRef(null);

  // Reset to first slide when #About is visited via hash change
  useEffect(() => {
    const handleHashChange = () => {
      if (window.location.hash === "#About" && swiperRef.current) {
        swiperRef.current.slideTo(0);
      }
    };

    // Check on mount in case the hash is already there
    handleHashChange();

    window.addEventListener("hashchange", handleHashChange);
    return () => window.removeEventListener("hashchange", handleHashChange);
  }, []);

  const visionOptions = {
    loop: true,
    autoplay: true,
    animationData: visionAnimation,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };

  const missionOptions = {
    loop: true,
    autoplay: true,
    animationData: missionAnimation,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };

  return (
    <section id="About" className="bg-[#f8fafc] pt-12 pb-24 overflow-hidden">
      <div className="container mx-auto px-6">
        {/* Section Header */}
        <div className="text-center mb-16 space-y-4">
          <div className="inline-block px-4 py-1 rounded-full bg-lightBlue/10 text-lightBlue text-sm font-bold tracking-wider uppercase mb-2">
            The Core of Infinity
          </div>
          <h1 className="text-4xl md:text-6xl font-extrabold text-deepBlueHead tracking-tight">
            Our <span className="text-lightBlue">Identity</span>
          </h1>
          <div className="w-20 h-1.5 bg-lightBlue mx-auto rounded-full"></div>
        </div>

        {/* Swiper Slider Wrapper */}
        <div className="max-w-6xl mx-auto relative group px-4">
          {/* Custom Navigation Buttons */}
          <button 
            ref={prevRef}
            className="absolute left-[-20px] md:left-[-60px] top-1/2 -translate-y-1/2 z-30 w-12 h-12 bg-white rounded-full shadow-xl flex items-center justify-center text-lightBlue hover:bg-lightBlue hover:text-white transition-all duration-300 border border-gray-100 opacity-0 group-hover:opacity-100"
          >
            <FontAwesomeIcon icon={faChevronLeft} />
          </button>
          <button 
            ref={nextRef}
            className="absolute right-[-20px] md:right-[-60px] top-1/2 -translate-y-1/2 z-30 w-12 h-12 bg-white rounded-full shadow-xl flex items-center justify-center text-lightBlue hover:bg-lightBlue hover:text-white transition-all duration-300 border border-gray-100 opacity-0 group-hover:opacity-100"
          >
            <FontAwesomeIcon icon={faChevronRight} />
          </button>

          <Swiper
            modules={[Navigation, Pagination, Keyboard, EffectCreative]}
            effect="creative"
            creativeEffect={{
              prev: {
                shadow: true,
                translate: ["-20%", 0, -1],
              },
              next: {
                translate: ["100%", 0, 0],
              },
            }}
            onSwiper={(swiper) => {
              swiperRef.current = swiper;
            }}
            onInit={(swiper) => {
              swiper.params.navigation.prevEl = prevRef.current;
              swiper.params.navigation.nextEl = nextRef.current;
              swiper.navigation.init();
              swiper.navigation.update();
            }}
            pagination={{ 
              clickable: true, 
              el: '.custom-pagination'
            }}
            keyboard={{ enabled: true }}
            speed={800}
            spaceBetween={0}
            slidesPerView={1}
            loop={false}
            className="about-swiper rounded-[40px] shadow-2xl shadow-blue-900/10"
          >
            {/* Slide 1 - Director Info */}
            <SwiperSlide className="rounded-[40px] bg-white overflow-hidden">
              <div className="p-8 md:p-20 flex flex-col lg:flex-row items-center gap-16 min-h-[550px]">
                <div className="lg:w-1/2 space-y-8 text-center lg:text-left">
                  <div className="space-y-2">
                    <p className="text-lightBlue font-bold text-lg">Leadership</p>
                    <h2 className="text-5xl md:text-6xl font-black text-deepBlueHead">Nevil Gandhi</h2>
                  </div>
                  
                  <div className="bg-gray-50 border-l-4 border-lightBlue p-6 rounded-r-2xl min-h-[100px] md:min-h-0">
                    <h3 className="text-2xl text-deepBlueHead font-semibold">
                      I am a{" "}
                      <span className="text-lightBlue font-black underline decoration-lightBlue/30 underline-offset-8">
                        <ReactTyped
                          strings={["Tax Consultant", "Financial Advisor", "Strategic Planner", "Growth Specialist"]}
                          typeSpeed={50}
                          backSpeed={50}
                          loop
                        />
                      </span>
                    </h3>
                  </div>

                  <p className="text-grayText text-lg leading-relaxed font-medium">
                    With over a decade of technical expertise, I merge strategic clarity 
                    with personalized financial roadmaps to ensure our clients don't just 
                    survive the market—they lead it.
                  </p>
                  
                  <div className="flex flex-wrap justify-center lg:justify-start gap-4 pt-4">
                    <div className="flex items-center gap-2 bg-blue-50 px-4 py-2 rounded-full border border-blue-100">
                      <span className="w-2 h-2 rounded-full bg-blue-500 animate-pulse"></span>
                      <span className="text-blue-700 font-bold text-sm">36+ Years Experience</span>
                    </div>
                  </div>
                </div>

                <div className="lg:w-1/2 relative">
                  <div className="absolute -inset-4 bg-gradient-to-tr from-lightBlue to-greenLight rounded-[3rem] opacity-10 blur-2xl"></div>
                  <div className="relative z-10">
                    <img
                      src={directorImage}
                      alt="Nevil Gandhi"
                      className="rounded-[2.5rem] shadow-2xl w-full max-w-[420px] mx-auto border-8 border-white object-cover aspect-[4/5]"
                    />
                    <div className="absolute -bottom-6 -right-6 md:-right-10 bg-white p-6 rounded-3xl shadow-xl border border-gray-100 hidden md:block">
                      <p className="font-black text-2xl text-deepBlueHead">Director</p>
                      <p className="text-lightBlue font-bold">@InfinityConsultancy</p>
                    </div>
                  </div>
                </div>
              </div>
            </SwiperSlide>

            {/* Slide 2 - Vision */}
            <SwiperSlide className="rounded-[40px] bg-white overflow-hidden">
              <div className="p-8 md:p-20 flex flex-col lg:flex-row items-center gap-16 min-h-[550px]">
                <div className="lg:w-1/2 text-center lg:text-left space-y-8">
                  <div className="space-y-2">
                    <p className="text-green-500 font-bold text-lg italic">Future Focused</p>
                    <h2 className="text-5xl md:text-6xl font-black text-deepBlueHead">Our Vision</h2>
                  </div>
                  <p className="text-grayText text-xl leading-relaxed">
                    To be the catalyst for financial freedom, turning complex fiscal 
                    challenges into transparent opportunities for every client we serve.
                  </p>
                  <div className="grid grid-cols-2 gap-4">
                    {["Transparency", "Growth", "Innovation", "Security"].map((v) => (
                      <div key={v} className="flex items-center gap-3 bg-green-50/50 p-4 rounded-2xl border border-green-100">
                        <div className="w-2 h-2 rounded-full bg-green-500"></div>
                        <span className="font-bold text-gray-700">{v}</span>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="lg:w-1/2 flex justify-center">
                  <div className="w-full max-w-[450px] bg-gradient-to-br from-green-50 to-blue-50 rounded-full p-12">
                    <Lottie options={visionOptions} />
                  </div>
                </div>
              </div>
            </SwiperSlide>

            {/* Slide 3 - Mission */}
            <SwiperSlide className="rounded-[40px] bg-white overflow-hidden">
              <div className="p-8 md:p-20 flex flex-col lg:flex-row items-center gap-16 min-h-[550px]">
                <div className="lg:w-1/2 text-center lg:text-left space-y-8">
                  <div className="space-y-2">
                    <p className="text-lightBlue font-bold text-lg italic">Our Purpose</p>
                    <h2 className="text-5xl md:text-6xl font-black text-deepBlueHead">Our Mission</h2>
                  </div>
                  <p className="text-grayText text-xl leading-relaxed">
                    Empowering clients through integrity-driven consultancy, 
                    leveraging cutting-edge financial tools and a relentless 
                    commitment to excellence.
                  </p>
                  <div className="flex flex-wrap justify-center lg:justify-start gap-3">
                    {["Client First", "Ethical Growth", "Modern Solutions"].map((tag) => (
                      <span key={tag} className="bg-deepBlue text-white px-6 py-3 rounded-2xl font-bold text-sm shadow-lg shadow-blue-900/20">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
                <div className="lg:w-1/2 flex justify-center">
                  <div className="w-full max-w-[450px] bg-gradient-to-br from-blue-50 to-indigo-50 rounded-full p-12">
                    <Lottie options={missionOptions} />
                  </div>
                </div>
              </div>
            </SwiperSlide>
          </Swiper>
          
          {/* Custom Pagination Container */}
          <div className="custom-pagination flex justify-center gap-2 mt-12"></div>
        </div>
      </div>
      
      {/* Custom Styles for Swiper dots */}
      <style dangerouslySetInnerHTML={{ __html: `
        .custom-pagination .swiper-pagination-bullet {
          background: #cbd5e1;
          opacity: 1;
          transition: all 0.3s ease;
          width: 10px;
          height: 10px;
        }
        .custom-pagination .swiper-pagination-bullet-active {
          background: #2b84ea !important;
          width: 32px !important;
          border-radius: 10px !important;
        }
      `}} />
    </section>
  );
};

export default AboutSection;
