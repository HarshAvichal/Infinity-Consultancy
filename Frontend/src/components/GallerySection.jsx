import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes, faChevronLeft, faChevronRight } from "@fortawesome/free-solid-svg-icons";
import galleryImage1 from "../gallery/infinity-gallery.jpeg";

const GallerySection = () => {
  const [selectedImage, setSelectedImage] = useState(null);
  const [lightboxIndex, setLightboxIndex] = useState(0);

  // Gallery images array
  const galleryImages = [
    { id: 1, src: galleryImage1, title: "Infinity Consultancy", alt: "Infinity Consultancy Office" },
  ];

  const openLightbox = (index) => {
    setSelectedImage(index);
    setLightboxIndex(index);
  };

  const closeLightbox = () => {
    setSelectedImage(null);
  };

  const navigateLightbox = (direction) => {
    if (direction === "next") {
      setLightboxIndex((prev) => (prev + 1) % galleryImages.length);
    } else {
      setLightboxIndex((prev) => (prev - 1 + galleryImages.length) % galleryImages.length);
    }
  };

  // Handle keyboard navigation
  React.useEffect(() => {
    const handleKeyPress = (e) => {
      if (selectedImage !== null) {
        if (e.key === "Escape") closeLightbox();
        if (e.key === "ArrowRight") navigateLightbox("next");
        if (e.key === "ArrowLeft") navigateLightbox("prev");
      }
    };
    window.addEventListener("keydown", handleKeyPress);
    return () => window.removeEventListener("keydown", handleKeyPress);
  }, [selectedImage, lightboxIndex]);

  return (
    <section id="Gallery" className="bg-[#f8fafc] py-24 overflow-hidden">
      <div className="container mx-auto px-6">
        {/* Section Header */}
        <div className="text-center mb-16 space-y-4">
          <div className="inline-block px-4 py-1 rounded-full bg-lightBlue/10 text-lightBlue text-sm font-bold tracking-wider uppercase mb-2">
            Visual Showcase
          </div>
          <h1 className="text-4xl md:text-6xl font-extrabold text-deepBlueHead tracking-tight">
            Our <span className="text-lightBlue">Gallery</span>
          </h1>
          <div className="w-20 h-1.5 bg-lightBlue mx-auto rounded-full"></div>
          <p className="text-grayText text-lg max-w-2xl mx-auto mt-4">
            Take a glimpse into our workspace, team, and the professional environment we've created
          </p>
        </div>

        {/* Gallery Grid */}
        {galleryImages.length > 0 ? (
          <div className="max-w-3xl mx-auto">
            {galleryImages.length === 1 ? (
              // Featured single image layout
              <div className="relative group">
                <div 
                  className="relative overflow-hidden rounded-3xl cursor-pointer transform transition-all duration-500 hover:scale-[1.02] shadow-2xl hover:shadow-3xl"
                  onClick={() => openLightbox(0)}
                >
                  {/* Gradient border effect */}
                  <div className="absolute -inset-1 bg-gradient-to-r from-lightBlue via-greenLight to-purple-500 rounded-3xl opacity-20 group-hover:opacity-40 blur-lg transition-opacity duration-500"></div>
                  
                  {/* Image container */}
                  <div className="relative bg-white p-2 rounded-3xl">
                    <img
                      src={galleryImages[0].src}
                      alt={galleryImages[0].alt || galleryImages[0].title || "Gallery image"}
                      className="w-full h-auto max-h-[500px] object-contain rounded-2xl transition-transform duration-500 group-hover:scale-[1.01]"
                      loading="eager"
                    />
                    
                    {/* Overlay on hover */}
                    <div className="absolute inset-2 bg-deepBlue/0 group-hover:bg-deepBlue/40 transition-all duration-500 flex items-center justify-center rounded-2xl">
                      <div className="opacity-0 group-hover:opacity-100 transition-all duration-500 transform scale-75 group-hover:scale-100">
                        <div className="bg-white/20 backdrop-blur-md px-8 py-4 rounded-full border border-white/30">
                          <p className="text-white font-bold text-lg flex items-center gap-3">
                            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7" />
                            </svg>
                            View Full Image
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                
                {/* Title below image */}
                {galleryImages[0].title && (
                  <div className="text-center mt-8">
                    <h3 className="text-2xl md:text-3xl font-bold text-deepBlueHead">{galleryImages[0].title}</h3>
                    <div className="w-16 h-1 bg-lightBlue mx-auto mt-4 rounded-full"></div>
                  </div>
                )}
              </div>
            ) : (
              // Grid layout for multiple images
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-6">
                {galleryImages.map((image, index) => (
                  <div
                    key={image.id}
                    className="group relative overflow-hidden rounded-2xl cursor-pointer transform transition-all duration-300 hover:scale-105 hover:shadow-2xl"
                    onClick={() => openLightbox(index)}
                  >
                    <div className="aspect-square bg-gray-200 flex items-center justify-center">
                      <img
                        src={image.src}
                        alt={image.alt || image.title || `Gallery image ${image.id}`}
                        className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                        loading="lazy"
                      />
                    </div>
                    {/* Overlay on hover */}
                    <div className="absolute inset-0 bg-deepBlue/0 group-hover:bg-deepBlue/60 transition-all duration-300 flex items-center justify-center">
                      <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        <div className="bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full">
                          <p className="text-white font-bold text-sm">View Image</p>
                        </div>
                      </div>
                    </div>
                    {/* Title overlay (if provided) */}
                    {image.title && (
                      <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-4">
                        <p className="text-white font-semibold text-sm">{image.title}</p>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>
        ) : (
          // Placeholder when no images
          <div className="text-center py-20">
            <div className="inline-block p-8 bg-gray-100 rounded-full mb-6">
              <svg
                className="w-16 h-16 text-gray-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                />
              </svg>
            </div>
            <p className="text-grayText text-lg font-medium">
              Gallery images will appear here
            </p>
            <p className="text-gray-400 text-sm mt-2">
              Add images to the galleryImages array in GallerySection.jsx
            </p>
          </div>
        )}

        {/* Lightbox Modal */}
        {selectedImage !== null && galleryImages.length > 0 && (
          <div
            className="fixed inset-0 bg-black/95 z-[100] flex items-center justify-center p-4"
            onClick={closeLightbox}
          >
            {/* Close Button */}
            <button
              onClick={closeLightbox}
              className="absolute top-4 right-4 md:top-8 md:right-8 text-white hover:text-lightBlue transition-colors z-10 bg-black/50 rounded-full p-3 hover:bg-black/70"
              aria-label="Close lightbox"
            >
              <FontAwesomeIcon icon={faTimes} className="text-2xl" />
            </button>

            {/* Navigation Buttons */}
            {galleryImages.length > 1 && (
              <>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    navigateLightbox("prev");
                  }}
                  className="absolute left-4 md:left-8 top-1/2 -translate-y-1/2 text-white hover:text-lightBlue transition-colors z-10 bg-black/50 rounded-full p-4 hover:bg-black/70"
                  aria-label="Previous image"
                >
                  <FontAwesomeIcon icon={faChevronLeft} className="text-xl" />
                </button>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    navigateLightbox("next");
                  }}
                  className="absolute right-4 md:right-8 top-1/2 -translate-y-1/2 text-white hover:text-lightBlue transition-colors z-10 bg-black/50 rounded-full p-4 hover:bg-black/70"
                  aria-label="Next image"
                >
                  <FontAwesomeIcon icon={faChevronRight} className="text-xl" />
                </button>
              </>
            )}

            {/* Image Container */}
            <div
              className="max-w-7xl max-h-[90vh] w-full flex items-center justify-center"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="relative">
                <img
                  src={galleryImages[lightboxIndex].src}
                  alt={galleryImages[lightboxIndex].alt || galleryImages[lightboxIndex].title || "Gallery image"}
                  className="max-w-full max-h-[90vh] object-contain rounded-lg"
                />
                {/* Image Info */}
                {galleryImages[lightboxIndex].title && (
                  <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-6 rounded-b-lg">
                    <p className="text-white font-semibold text-lg md:text-xl">
                      {galleryImages[lightboxIndex].title}
                    </p>
                  </div>
                )}
                {/* Image Counter */}
                {galleryImages.length > 1 && (
                  <div className="absolute top-4 left-4 bg-black/50 text-white px-4 py-2 rounded-full text-sm font-medium">
                    {lightboxIndex + 1} / {galleryImages.length}
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default GallerySection;

