import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  build: {
    rollupOptions: {
      external: [
        "react", // React core module
        "react-dom", // React DOM
        "react-toastify", // For toast notifications
        "react-lottie", // For lottie animations
        "swiper", // For swiper carousel
        "@fortawesome/react-fontawesome", // FontAwesome icons
        "@fortawesome/free-solid-svg-icons", // Solid icons from FontAwesome
        "react-typed", // Typed animations
      ],
    },
  },
});
