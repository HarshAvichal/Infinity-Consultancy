import React, { useState } from "react";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPhone, faLocationDot, faEnvelope } from "@fortawesome/free-solid-svg-icons";
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

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const validateForm = () => {
    const { firstName, lastName, email, phone, userMessage } = formData;

    if (!firstName || !lastName || !email || !phone) {
      toast.error("Please enter your details before sending.", { position: "top-right" });
      return false;
    }

    // Validate first name and last name (no numbers or special characters)
    const nameRegex = /^[a-zA-Z]+$/;
    if (!nameRegex.test(firstName)) {
      toast.error("First Name can only contain letters.", { position: "top-right" });
      return false;
    }
    if (!nameRegex.test(lastName)) {
      toast.error("Last Name can only contain letters.", { position: "top-right" });
      return false;
    }

    // Validate email (must contain "gmail.com")
    const emailRegex = /^[^\s@]+@gmail\.com$/;
    if (!emailRegex.test(email)) {
      toast.error("Email must be a valid Gmail address.", { position: "top-right" });
      return false;
    }

    // Validate phone (must be a 10-digit number)
    const phoneRegex = /^\d{10}$/;
    if (!phoneRegex.test(phone)) {
      toast.error("Phone Number must be a 10-digit number.", { position: "top-right" });
      return false;
    }

    // Validate message (must not be empty)
    if (!userMessage.trim()) {
      toast.error("Message field cannot be empty.", { position: "top-right" });
      return false;
    }

    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate the form
    if (!validateForm()) {
      return;
    }

    // Send email request
    try {
      const response = await axios.post("http://localhost:5000/send-email", formData);
      toast.success(response.data.message || "Email sent successfully!", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
      setFormData({
        firstName: "",
        lastName: "",
        email: "",
        phone: "",
        userMessage: "",
      });
    } catch (error) {
      const errorMessage =
        error.response?.data?.message || "Failed to send your message. Please try again!";
      toast.error(errorMessage, {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    }
  };

  return (
    <section id="Enquiry" className="bg-[#34354b] py-16">
      {/* Section Header */}
      <div className="py-8 bg-[#34354b] flex justify-center">
        <span className="mx-4 text-2xl font-bold text-white">
          <i className="fa-solid fa-circle-dot"></i>&nbsp;ENQUIRY
        </span>
      </div>

      {/* Enquiry Form */}
      <div className="w-11/12 max-w-[800px] mx-auto bg-[#27293d] p-8 rounded-lg shadow-md">
        <form className="space-y-6" onSubmit={handleSubmit}>
          {/* Name Fields */}
          <div className="flex flex-col md:flex-row gap-6">
            <div className="flex-1">
              <label htmlFor="firstName" className="block text-white font-bold mb-2">
                First Name
              </label>
              <input
                type="text"
                id="firstName"
                name="firstName"
                value={formData.firstName}
                onChange={handleChange}
                placeholder="Enter First Name"
                className="w-full bg-[#34354b] py-2 px-4 rounded-md focus:ring-2 focus:ring-lightBlue focus:outline-none text-white placeholder-gray-400"
              />
            </div>
            <div className="flex-1">
              <label htmlFor="lastName" className="block text-white font-bold mb-2">
                Last Name
              </label>
              <input
                type="text"
                id="lastName"
                name="lastName"
                value={formData.lastName}
                onChange={handleChange}
                placeholder="Enter Last Name"
                className="w-full bg-[#34354b] py-2 px-4 rounded-md focus:ring-2 focus:ring-lightBlue focus:outline-none text-white placeholder-gray-400"
              />
            </div>
          </div>

          {/* Contact Fields */}
          <div className="flex flex-col md:flex-row gap-6">
            <div className="flex-1">
              <label htmlFor="email" className="block text-white font-bold mb-2">
                Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Enter Email"
                className="w-full bg-[#34354b] py-2 px-4 rounded-md focus:ring-2 focus:ring-lightBlue focus:outline-none text-white placeholder-gray-400"
              />
            </div>
            <div className="flex-1">
              <label htmlFor="phone" className="block text-white font-bold mb-2">
                Phone Number
              </label>
              <input
                type="tel"
                id="phone"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                placeholder="Enter Phone Number"
                className="w-full bg-[#34354b] py-2 px-4 rounded-md focus:ring-2 focus:ring-lightBlue focus:outline-none text-white placeholder-gray-400"
              />
            </div>
          </div>

          {/* Message Field */}
          <div>
            <label htmlFor="userMessage" className="block text-white font-bold mb-2">
              Message
            </label>
            <textarea
              id="userMessage"
              name="userMessage"
              rows="4"
              value={formData.userMessage}
              onChange={handleChange}
              placeholder="Your message here"
              className="w-full bg-[#34354b] py-2 px-4 rounded-md focus:ring-2 focus:ring-lightBlue focus:outline-none text-white placeholder-gray-400"
            ></textarea>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-6 rounded-md transition duration-300 w-full"
          >
            Send Message
          </button>
        </form>
      </div>
      {/* Contact Details */}
      <div className="w-11/12 max-w-[800px] mx-auto mt-12">
        <div className="flex flex-col md:flex-row gap-12">
          {/* Phone */}
          <div className="flex-1 text-center text-white">
            <p className="flex items-center justify-center gap-2 opacity-70">
              Call us, we are always happy to help.
            </p>
            <a href="tel:8460818184" className="text-lightBlue block mt-1">
              <FontAwesomeIcon icon={faPhone} className="text-lightBlue" />
              &nbsp;8460818184
            </a>
            <a href="tel:9375152535" className="text-lightBlue">
              <FontAwesomeIcon icon={faPhone} className="text-lightBlue" />
              &nbsp;9375152535
            </a>
          </div>

          {/* Location */}
          <div className="flex-1 text-center text-white">
            <p className="flex items-center justify-center gap-2 opacity-70">
              HO: C-50, Shantinagar Township, Station Road, Bilimora(W) - 396321
            </p>
            <p className="flex items-center justify-center gap-2 opacity-70">
              <FontAwesomeIcon icon={faLocationDot} className="text-lightBlue" />
              Branch: Vapi | Surat
            </p>
          </div>

          {/* Email */}
          <div className="flex-1 text-center text-white">
            <p className="flex items-center justify-center gap-2 opacity-70">
              Email us for general queries.
            </p>
            <a href="mailto:nevil04@gmail.com" className="text-lightBlue block">
              <FontAwesomeIcon icon={faEnvelope} className="text-lightBlue" />
              &nbsp;nevil04@gmail.com
            </a>
            <a href="mailto:infinitygst04@gmail.com" className="text-lightBlue">
              <FontAwesomeIcon icon={faEnvelope} className="text-lightBlue" />
              &nbsp;infinitygst04@gmail.com
            </a>
          </div>
        </div>
      </div>


      {/* Toast Container */}
      <ToastContainer />
    </section>
  );
};

export default EnquirySection;
