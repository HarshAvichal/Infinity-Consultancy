import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Navigation, Pagination, Keyboard } from "swiper/modules";
import Lottie from "react-lottie";
import useTyped from "../Hooks/useTyped";

// Import animations and images
import visionAnimation from "../assets/lottieAnimations/vision-animation.json";
import missionAnimation from "../assets/lottieAnimations/mission-animation.json";
import directorImage from "../images/NG.jpg";

const AboutSection = () => {
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

  // Use the custom hook for the typewriting effect
  const typedRef = useTyped({
    strings: ["Tax Consultant", "Financial Advisor", "Strategic Planner", "Growth Specialist"],
    typeSpeed: 50,
    backSpeed: 50,
    loop: true,
  });

  return (
    <section id="About" className="bg-[#f7f8fc] min-h-screen flex flex-col justify-center py-16">
      {/* Section Header */}
      <div className="text-center mb-16">
        <h1 className="text-4xl font-bold text-gray-800">
          Know More <span className="text-blue-500">About Us</span>
        </h1>
        <p className="text-gray-600 text-lg mt-4">
          Discover the vision, mission, and people who drive Infinity Consultancy.
        </p>
      </div>

      {/* Swiper Slider */}
      <Swiper
        modules={[Navigation, Pagination, Keyboard]}
        navigation
        pagination={{ clickable: true }}
        keyboard={{ enabled: true }}
        spaceBetween={50}
        slidesPerView={1}
        loop={true}
        className="w-full max-w-[1280px] mx-auto"
      >
        {/* Slide 1 - Director Info */}
        <SwiperSlide>
          <div className="flex flex-col md:flex-row items-center gap-16 px-16 min-h-[70vh]">
            <div className="md:w-1/2 space-y-6 text-center md:text-left pl-10">
              <h2 className="text-5xl font-bold text-gray-800">Myself, Nevil Gandhi</h2>
              <h3 className="text-2xl text-gray-800 font-bold">
                I am a <span ref={typedRef} className="text-4xl text-blue-500"></span>
              </h3>
              <p className="text-gray-600 text-base md:text-lg leading-relaxed">
                As a dedicated financial advisor with years of experience, I strive to
                empower individuals and businesses alike to achieve their financial goals
                through personalized guidance and strategic planning.
              </p>
            </div>
            <div className="md:w-1/2 flex flex-col items-center">
              <img
                src={directorImage}
                alt="Nevil Gandhi"
                className="rounded-lg shadow-lg w-60 md:w-72 lg:w-80 transition-transform duration-1000 animate-impactful"
              />
              <h4 className="mt-8 font-bold text-gray-800">
                Director{" "}
                <span className="text-blue-500">@InfinityConsultancy</span>
              </h4>
            </div>
          </div>
        </SwiperSlide>

        {/* Slide 2 - Vision */}
        <SwiperSlide>
          <div className="flex flex-col md:flex-row items-center gap-16 px-16 min-h-[70vh]">
            <div className="md:w-1/2 text-center md:text-left space-y-6 pl-10">
              <h2 className="text-3xl font-bold text-gray-800">Vision</h2>
              <p className="text-gray-600 text-base md:text-lg leading-relaxed">
                At Infinity Consultancy, our vision is to make financial success
                accessible to everyone. We aim to help individuals and businesses reach
                their financial dreams with trustworthy advice and tailored solutions.
              </p>
            </div>
            <div className="md:w-1/2 flex justify-center">
              <Lottie options={visionOptions} height={300} width={300} />
            </div>
          </div>
        </SwiperSlide>

        {/* Slide 3 - Mission */}
        <SwiperSlide>
          <div className="flex flex-col md:flex-row items-center gap-16 px-16 min-h-[70vh]">
            <div className="md:w-1/2 text-center md:text-left space-y-6 pl-10">
              <h2 className="text-3xl font-bold text-gray-800">Mission</h2>
              <p className="text-gray-600 text-base md:text-lg leading-relaxed">
                Our mission is to revolutionize how individuals and businesses approach
                finance. We are committed to providing cutting-edge solutions and
                personalized guidance to help our clients overcome obstacles and achieve
                financial growth.
              </p>
            </div>
            <div className="md:w-1/2 flex justify-center">
              <Lottie options={missionOptions} height={300} width={300} />
            </div>
          </div>
        </SwiperSlide>
      </Swiper>
    </section>
  );
};

export default AboutSection;
