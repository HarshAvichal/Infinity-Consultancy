import React, { useState } from "react";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPhone, faLocationDot, faEnvelope, faPaperPlane } from "@fortawesome/free-solid-svg-icons";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const EnquirySection = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    userMessage: "",
  });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const validateForm = () => {
    const { firstName, lastName, email, phone, userMessage } = formData;

    if (!firstName || !lastName || !email || !phone) {
      toast.error("Please fill in all required fields.", { position: "top-right" });
      return false;
    }

    const nameRegex = /^[a-zA-Z\s]+$/;
    if (!nameRegex.test(firstName.trim())) {
      toast.error("First Name should only contain letters.", { position: "top-right" });
      return false;
    }
    if (!nameRegex.test(lastName.trim())) {
      toast.error("Last Name should only contain letters.", { position: "top-right" });
      return false;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      toast.error("Please enter a valid email address.", { position: "top-right" });
      return false;
    }

    const phoneRegex = /^\d{10}$/;
    if (!phoneRegex.test(phone)) {
      toast.error("Phone Number must be exactly 10 digits.", { position: "top-right" });
      return false;
    }

    if (!userMessage.trim()) {
      toast.error("Message field cannot be empty.", { position: "top-right" });
      return false;
    }

    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) return;

    setLoading(true);
    try {
      // Try to get backend URL from environment, with fallback
      const backendUrl = import.meta.env.VITE_BACKEND_URL || import.meta.env.VITE_API_URL;
      console.log("🔍 Frontend Debug - Backend URL:", backendUrl);
      console.log("🔍 Frontend Debug - All env vars:", import.meta.env);
      console.log("🔍 Frontend Debug - Form Data:", formData);
      
      if (!backendUrl) {
        console.error("❌ Backend URL is missing!");
        setLoading(false);
        toast.error("Backend server is not configured. Please contact support.", { 
          position: "top-right", 
          autoClose: 8000 
        });
        return;
      }

      // First, verify backend is reachable
      try {
        console.log(`🔍 Checking backend health at: ${backendUrl}/health`);
        await axios.get(`${backendUrl}/health`, { timeout: 5000 });
        console.log("✅ Backend is reachable");
      } catch (healthError) {
        console.warn("⚠️ Backend health check failed:", healthError.message);
        // Continue anyway - health check is just a warning
      }

      console.log(`📤 Sending request to: ${backendUrl}/send-email`);
      const response = await axios.post(
        `${backendUrl}/send-email`, 
        formData,
        {
          timeout: 30000, // 30 seconds timeout
          headers: {
            'Content-Type': 'application/json',
          }
        }
      );
      
      console.log("✅ Response received:", response.data);
      
      toast.success(response.data.message || "Thank you! Your inquiry has been sent.", {
        position: "top-right",
        autoClose: 5000,
      });
      setFormData({
        firstName: "",
        lastName: "",
        email: "",
        phone: "",
        userMessage: "",
      });
    } catch (error) {
      console.error("❌ Form submission error:", error);
      console.error("❌ Error details:", {
        message: error.message,
        code: error.code,
        response: error.response?.data,
        status: error.response?.status,
        config: error.config?.url
      });
      
      let errorMessage = "Failed to send message. Please try again later.";
      
      if (error.code === 'ECONNABORTED' || error.message?.includes('timeout')) {
        errorMessage = "Request timed out. Please check your connection and try again.";
      } else if (error.code === 'ERR_NETWORK' || error.message?.includes('Network Error')) {
        errorMessage = "Network error. Please check your internet connection and backend URL.";
      } else if (error.response?.status === 429) {
        errorMessage = "Too many requests. Please wait a few minutes and try again.";
      } else if (error.response?.data?.message) {
        errorMessage = error.response.data.message;
      } else if (error.message) {
        errorMessage = error.message;
      }
      
      toast.error(errorMessage, { position: "top-right", autoClose: 6000 });
    } finally {
      setLoading(false);
      console.log("🏁 Form submission finished, loading set to false");
    }
  };

  return (
    <section id="Enquiry" className="bg-[#0f172a] py-24 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full opacity-10 pointer-events-none">
        <div className="absolute top-0 left-0 w-96 h-96 bg-lightBlue rounded-full blur-[120px]"></div>
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-greenLight rounded-full blur-[120px]"></div>
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="text-center mb-16 space-y-4">
          <h2 className="text-lightBlue font-bold tracking-widest text-sm uppercase">Get In Touch</h2>
          <h1 className="text-4xl md:text-5xl font-extrabold text-white">
            Ready to <span className="text-lightBlue">Start Your Journey?</span>
          </h1>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            Fill out the form below and our team will get back to you within 24 hours.
          </p>
        </div>

        <div className="flex flex-col lg:flex-row gap-10 lg:gap-16 items-start">
          {/* Enquiry Form Card - First on Mobile */}
          <div className="w-full lg:w-2/3 bg-white p-6 md:p-12 rounded-3xl shadow-2xl order-1 lg:order-2">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-sm font-bold text-deepBlueHead">First Name</label>
                  <input
                    type="text"
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleChange}
                    placeholder="Harsh"
                    className="w-full bg-gray-50 border border-gray-200 py-3 px-4 rounded-xl focus:ring-2 focus:ring-lightBlue focus:border-transparent outline-none transition-all"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-bold text-deepBlueHead">Last Name</label>
                  <input
                    type="text"
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleChange}
                    placeholder="Avichal"
                    className="w-full bg-gray-50 border border-gray-200 py-3 px-4 rounded-xl focus:ring-2 focus:ring-lightBlue focus:border-transparent outline-none transition-all"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-sm font-bold text-deepBlueHead">Email Address</label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="harsh@gmail.com"
                    className="w-full bg-gray-50 border border-gray-200 py-3 px-4 rounded-xl focus:ring-2 focus:ring-lightBlue focus:border-transparent outline-none transition-all"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-bold text-deepBlueHead">Phone Number</label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder="your phone number"
                    className="w-full bg-gray-50 border border-gray-200 py-3 px-4 rounded-xl focus:ring-2 focus:ring-lightBlue focus:border-transparent outline-none transition-all"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-bold text-deepBlueHead">Your Message</label>
                <textarea
                  name="userMessage"
                  rows="5"
                  value={formData.userMessage}
                  onChange={handleChange}
                  placeholder="I need help with my GST registration or Tax return..."
                  className="w-full bg-gray-50 border border-gray-200 py-3 px-4 rounded-xl focus:ring-2 focus:ring-lightBlue focus:border-transparent outline-none transition-all resize-none"
                ></textarea>
              </div>

              <button
                type="submit"
                disabled={loading}
                className={`w-full bg-lightBlue hover:bg-lightBlue500 text-white font-bold py-4 rounded-xl transition-all flex items-center justify-center gap-3 group shadow-lg shadow-lightBlue/20 ${loading ? 'opacity-70 cursor-not-allowed' : 'transform hover:-translate-y-1'}`}
              >
                {loading ? (
                  "Sending Message..."
                ) : (
                  <>
                    Send Inquiry
                    <FontAwesomeIcon icon={faPaperPlane} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                  </>
                )}
              </button>
            </form>
          </div>

          {/* Contact Info Side - Below Form on Mobile */}
          <div className="w-full lg:w-1/3 space-y-6 md:space-y-8 order-2 lg:order-1">
            {/* Quick Action Grid for Mobile */}
            <div className="grid grid-cols-3 gap-4 lg:hidden">
              <a href="tel:8460818184" className="bg-white/5 p-4 rounded-2xl flex flex-col items-center gap-2 border border-white/10">
                <FontAwesomeIcon icon={faPhone} className="text-lightBlue" />
                <span className="text-white text-[10px] font-bold uppercase">Call</span>
              </a>
              <a href="mailto:nevil04@gmail.com" className="bg-white/5 p-4 rounded-2xl flex flex-col items-center gap-2 border border-white/10">
                <FontAwesomeIcon icon={faEnvelope} className="text-greenLight" />
                <span className="text-white text-[10px] font-bold uppercase">Mail</span>
              </a>
              <a href="https://maps.google.com/?q=Infinity+Consultancy+Bilimora" target="_blank" rel="noreferrer" className="bg-white/5 p-4 rounded-2xl flex flex-col items-center gap-2 border border-white/10">
                <FontAwesomeIcon icon={faLocationDot} className="text-purple-400" />
                <span className="text-white text-[10px] font-bold uppercase">Map</span>
              </a>
            </div>

            {/* Detailed Contact Info Card */}
            <div className="bg-white/5 backdrop-blur-xl border border-white/10 p-6 md:p-8 rounded-3xl space-y-6 md:space-y-8">
              <h3 className="text-xl md:text-2xl font-bold text-white mb-2 md:mb-6">Contact Information</h3>
              
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 md:w-12 md:h-12 bg-lightBlue/20 rounded-xl flex items-center justify-center text-lightBlue shrink-0">
                  <FontAwesomeIcon icon={faPhone} />
                </div>
                <div>
                  <p className="text-gray-400 text-xs md:text-sm">Call Us</p>
                  <div className="space-y-1">
                    <a href="tel:8460818184" className="text-white font-semibold hover:text-lightBlue transition-colors block text-sm md:text-base">8460818184</a>
                    <a href="tel:9375152535" className="text-white font-semibold hover:text-lightBlue transition-colors block text-sm md:text-base">9375152535</a>
                  </div>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-10 h-10 md:w-12 md:h-12 bg-greenLight/20 rounded-xl flex items-center justify-center text-greenLight shrink-0">
                  <FontAwesomeIcon icon={faEnvelope} />
                </div>
                <div>
                  <p className="text-gray-400 text-xs md:text-sm">Email Us</p>
                  <div className="space-y-1">
                    <a href="mailto:nevil04@gmail.com" className="text-white font-semibold hover:text-lightBlue transition-colors block text-sm md:text-base">nevil04@gmail.com</a>
                    <a href="mailto:infinitygst04@gmail.com" className="text-white font-semibold hover:text-lightBlue transition-colors block text-sm md:text-base">infinitygst04@gmail.com</a>
                  </div>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-10 h-10 md:w-12 md:h-12 bg-purple-500/20 rounded-xl flex items-center justify-center text-purple-400 shrink-0">
                  <FontAwesomeIcon icon={faLocationDot} />
                </div>
                <div>
                  <p className="text-gray-400 text-xs md:text-sm">Visit Us</p>
                  <p className="text-white font-semibold leading-relaxed text-sm md:text-base">
                    C-50, Shantinagar Township, Bilimora(W) - 396321
                  </p>
                  <p className="text-gray-400 text-[10px] md:text-xs mt-1 italic">Branch: Vapi | Surat</p>
                </div>
              </div>
            </div>

            {/* Business Hours */}
            <div className="bg-gradient-to-br from-lightBlue/20 to-transparent p-6 md:p-8 rounded-3xl border border-lightBlue/20">
              <div className="flex items-center justify-between lg:block mb-4">
                <h4 className="text-white font-bold text-sm md:text-base">Business Hours</h4>
                <p className="text-white text-xs flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-greenLight animate-pulse"></span>
                  Open Now
                </p>
              </div>
              <ul className="space-y-2">
                <li className="flex justify-between text-xs md:text-sm"><span className="text-gray-400">Mon - Fri:</span> <span className="text-white">9:00 AM - 7:00 PM</span></li>
                <li className="flex justify-between text-xs md:text-sm"><span className="text-gray-400">Saturday:</span> <span className="text-white">10:00 AM - 4:00 PM</span></li>
                <li className="flex justify-between text-xs md:text-sm"><span className="text-gray-400">Sunday:</span> <span className="text-red-400">Closed</span></li>
              </ul>
            </div>
          </div>
        </div>
      </div>
      <ToastContainer 
        position="bottom-center"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
        toastStyle={{ 
          backgroundColor: '#0f172a', 
          color: '#fff',
          borderRadius: '16px',
          border: '1px solid rgba(255,255,255,0.1)',
          boxShadow: '0 20px 40px rgba(0,0,0,0.4)'
        }}
      />
    </section>
  );
};

export default EnquirySection;
