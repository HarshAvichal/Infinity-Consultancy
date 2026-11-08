import React, { useRef, useEffect } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/effect-creative";
import { Navigation, Pagination, Keyboard, EffectCreative } from "swiper/modules";
import LazyLottie from "./LazyLottie";
import { ReactTyped } from "react-typed";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronLeft, faChevronRight } from "@fortawesome/free-solid-svg-icons";

// Import animations and images
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
        rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };

  const missionOptions = {
    loop: true,
    autoplay: true,
        rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };

  return (
    <section id="About" className="bg-ivory pt-12 pb-24 overflow-hidden">
      <div className="container mx-auto px-6">
        {/* Section Header */}
        <div className="text-center mb-16 space-y-4">
          <div className="inline-block px-4 py-1 rounded-full bg-lightBlue/10 text-lightBlue text-sm font-bold tracking-wider uppercase mb-2">
            The Core of Infinity
          </div>
          <h2 className="text-4xl md:text-6xl font-extrabold text-deepBlueHead tracking-tight">
            Our <span className="text-lightBlue">Identity</span>
          </h2>
          <div className="w-20 h-1.5 bg-lightBlue mx-auto rounded-full"></div>
        </div>

        {/* Swiper Slider Wrapper */}
        <div className="max-w-6xl mx-auto relative group px-4">
          {/* Custom Navigation Buttons */}
          <button 
            ref={prevRef}
            className="absolute left-[-20px] md:left-[-60px] top-1/2 -translate-y-1/2 z-30 w-12 h-12 bg-white rounded-full shadow-xl flex items-center justify-center text-lightBlue hover:bg-lightBlue hover:text-white transition-all duration-300 border border-lightGray opacity-0 group-hover:opacity-100"
          >
            <FontAwesomeIcon icon={faChevronLeft} />
          </button>
          <button 
            ref={nextRef}
            className="absolute right-[-20px] md:right-[-60px] top-1/2 -translate-y-1/2 z-30 w-12 h-12 bg-white rounded-full shadow-xl flex items-center justify-center text-lightBlue hover:bg-lightBlue hover:text-white transition-all duration-300 border border-lightGray opacity-0 group-hover:opacity-100"
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
            className="about-swiper rounded-[40px] shadow-2xl shadow-black/10"
          >
            {/* Slide 1 - Director Info */}
            <SwiperSlide className="rounded-[40px] bg-white overflow-hidden">
              <div className="p-6 md:p-20 flex flex-col lg:flex-row items-center gap-8 md:gap-16 min-h-[400px] md:min-h-[550px]">
                <div className="lg:w-1/2 space-y-4 md:space-y-8 text-center lg:text-left">
                  <div className="space-y-2">
                    <p className="text-lightBlue font-bold text-sm md:text-lg">Leadership</p>
                    <h3 className="text-3xl md:text-6xl font-black text-deepBlueHead">Nevil Gandhi</h3>
                  </div>
                  
                  <div className="bg-sand/60 border-l-4 border-lightBlue p-4 md:p-6 rounded-r-2xl min-h-[100px] md:min-h-0 flex items-center">
                    <h3 className="text-lg md:text-2xl text-deepBlueHead font-semibold">
                      I am a{" "}
                      <span className="text-lightBlue font-black underline decoration-lightBlue/30 underline-offset-4 md:underline-offset-8 inline-block min-w-[150px] md:min-w-[200px]">
                        <ReactTyped
                          strings={["Tax Consultant", "Financial Advisor", "Strategic Planner", "Growth Specialist"]}
                          typeSpeed={50}
                          backSpeed={50}
                          loop
                        />
                      </span>
                    </h3>
                  </div>

                  <p className="text-grayText text-base md:text-lg leading-relaxed font-medium">
                    With over a decade of technical expertise, I merge strategic clarity 
                    with personalized financial roadmaps to ensure our clients don't just 
                    survive the market—they lead it.
                  </p>
                  
                  <div className="flex flex-wrap justify-center lg:justify-start gap-4 pt-2 md:pt-4">
                    <div className="flex items-center gap-2 bg-sand px-3 md:px-4 py-1.5 md:py-2 rounded-full border border-lightBlue/20">
                      <span className="w-2 h-2 rounded-full bg-sand0 animate-pulse"></span>
                      <span className="text-goldDeep font-bold text-xs md:text-sm">36+ Years Experience</span>
                    </div>
                  </div>
                </div>

                <div className="lg:w-1/2 relative w-full md:w-auto">
                  <div className="absolute -inset-4 bg-gradient-to-tr from-lightBlue to-greenLight rounded-[3rem] opacity-10 blur-2xl"></div>
                  <div className="relative z-10">
                    <img
                      src={directorImage}
                      alt="Nevil Gandhi"
                      className="rounded-[2rem] md:rounded-[2.5rem] shadow-2xl w-full max-w-[280px] md:max-w-[420px] mx-auto border-4 md:border-8 border-white object-cover aspect-[4/5]"
                    />
                    <div className="absolute -bottom-6 -right-6 md:-right-10 bg-white p-6 rounded-3xl shadow-xl border border-lightGray hidden md:block">
                      <p className="font-black text-2xl text-deepBlueHead">Director</p>
                      <p className="text-lightBlue font-bold">@InfinityConsultancy</p>
                    </div>
                  </div>
                </div>
              </div>
            </SwiperSlide>

            {/* Slide 2 - Vision */}
            <SwiperSlide className="rounded-[40px] bg-white overflow-hidden">
              <div className="p-6 md:p-20 flex flex-col lg:flex-row items-center gap-8 md:gap-16 min-h-[400px] md:min-h-[550px]">
                <div className="lg:w-1/2 text-center lg:text-left space-y-4 md:space-y-8">
                  <div className="space-y-2">
                    <p className="text-lightBlue font-bold text-sm md:text-lg italic">Future Focused</p>
                    <h3 className="text-3xl md:text-6xl font-black text-deepBlueHead">Our Vision</h3>
                  </div>
                  <p className="text-grayText text-base md:text-xl leading-relaxed">
                    To be the catalyst for financial freedom, turning complex fiscal 
                    challenges into transparent opportunities for every client we serve.
                  </p>
                  <div className="grid grid-cols-2 gap-3 md:gap-4">
                    {["Transparency", "Growth", "Innovation", "Security"].map((v) => (
                      <div key={v} className="flex items-center gap-2 md:gap-3 bg-sand/60 p-3 md:p-4 rounded-xl md:rounded-2xl border border-lightBlue/20">
                        <div className="w-2 h-2 rounded-full bg-lightBlue"></div>
                        <span className="font-bold text-gray2 text-sm md:text-base">{v}</span>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="lg:w-1/2 flex justify-center">
                  <div className="w-full max-w-[280px] md:max-w-[450px] bg-gradient-to-br from-ivory to-sand rounded-full p-8 md:p-12">
                    <LazyLottie loader={() => import("../assets/lottieAnimations/vision-animation.json")} options={visionOptions} />
                  </div>
                </div>
              </div>
            </SwiperSlide>

            {/* Slide 3 - Mission */}
            <SwiperSlide className="rounded-[40px] bg-white overflow-hidden">
              <div className="p-6 md:p-20 flex flex-col lg:flex-row items-center gap-8 md:gap-16 min-h-[400px] md:min-h-[550px]">
                <div className="lg:w-1/2 text-center lg:text-left space-y-4 md:space-y-8">
                  <div className="space-y-2">
                    <p className="text-lightBlue font-bold text-sm md:text-lg italic">Our Purpose</p>
                    <h3 className="text-3xl md:text-6xl font-black text-deepBlueHead">Our Mission</h3>
                  </div>
                  <p className="text-grayText text-base md:text-xl leading-relaxed">
                    Empowering clients through integrity-driven consultancy, 
                    leveraging cutting-edge financial tools and a relentless 
                    commitment to excellence.
                  </p>
                  <div className="flex flex-wrap justify-center lg:justify-start gap-2 md:gap-3">
                    {["Client First", "Ethical Growth", "Modern Solutions"].map((tag) => (
                      <span key={tag} className="bg-deepBlue text-white px-4 md:px-6 py-2 md:py-3 rounded-xl md:rounded-2xl font-bold text-xs md:text-sm shadow-lg shadow-black/20">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
                <div className="lg:w-1/2 flex justify-center">
                  <div className="w-full max-w-[280px] md:max-w-[450px] bg-gradient-to-br from-ivory to-sand rounded-full p-8 md:p-12">
                    <LazyLottie loader={() => import("../assets/lottieAnimations/mission-animation.json")} options={missionOptions} />
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
          background: #d9d2c0;
          opacity: 1;
          transition: all 0.3s ease;
          width: 10px;
          height: 10px;
        }
        .custom-pagination .swiper-pagination-bullet-active {
          background: #c9a45c !important;
          width: 32px !important;
          border-radius: 10px !important;
        }
      `}} />
    </section>
  );
};

export default AboutSection;
