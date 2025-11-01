// src/components/Hero.jsx

import { useState, useEffect } from 'react';

const slides = [
  {
    src: "https://placehold.co/1600x900/3b8686/ffffff?text=Modern+Hospital+Lobby",
    alt: "Modern Hospital Lobby",
    fallback: "https://placehold.co/1600x900/e0e0e0/b0b0b0?text=Image+1"
  },
  {
    src: "https://placehold.co/1600x900/0e9aa7/ffffff?text=Expert+Surgical+Team",
    alt: "Expert Surgical Team",
    fallback: "https://placehold.co/1600x900/e0e0e0/b0b0b0?text=Image+2"
  },
  {
    src: "https://placehold.co/1600x900/66c2c2/0f3b3b?text=SR+EMERGENCY+HOSPITAL",
    alt: "SR EMERGENCY HOSPITAL",
    fallback: "https://placehold.co/1600x900/e0e0e0/b0b0b0?text=Image+3"
  }
];

const Hero = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide(prev => (prev + 1) % slides.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section
      id="home"
      className="relative overflow-hidden w-full"
      style={{ minHeight: '300px' }}
    >
      {/* Background Image Slider */}
      <div id="hero-slider" className="absolute inset-0 w-full h-full">
        {slides.map((slide, index) => (
          <img
            key={index}
            src={slide.src}
            alt={slide.alt}
            className={`hero-slide absolute inset-0 w-full h-full object-cover transition-opacity duration-1000 ${
              index === currentSlide ? 'opacity-100' : 'opacity-0'
            }`}
            style={{
              width: '100%',
              height: '100%',
              objectFit: 'cover',
              maxWidth: '100vw',
              maxHeight: '100vh',
              minHeight: '300px',
            }}
            onError={(e) => { e.currentTarget.src = slide.fallback; }}
          />
        ))}
      </div>

      {/* Colorful Overlay */}
      <div className="absolute inset-0 bg-linear-to-r from-[#3b8686]/90 via-[#0e9aa7]/85 to-[#66c2c2]/80 z-10 w-full h-full"></div>

      {/* Content */}
      <div className="absolute inset-0 w-full h-full flex flex-col justify-center items-start px-4 sm:px-6 text-white z-20">
        <h1 className="text-2xl sm:text-4xl md:text-6xl font-extrabold mb-4 leading-tight drop-shadow-lg text-left">
          Your Health, Our Priority.
        </h1>
        <p className="text-base sm:text-lg md:text-2xl mb-8 max-w-2xl text-white/90 text-left">
          Providing compassionate, world-class care right in your community.
        </p>
        <a
          href="#appointment"
          className="bg-[#399fa8] hover:bg-[#11999e] text-white w-fit px-6 sm:px-8 py-2 sm:py-3 rounded-full text-base sm:text-lg font-semibold shadow-lg hover:shadow-xl transition duration-300"
        >
          Book an Appointment
        </a>
      </div>

      {/* Decorative Text (Optional) */}
      <h2 className="absolute bottom-6 sm:bottom-12 right-2 sm:right-6 text-[2.5rem] sm:text-[6rem] font-extrabold text-white/10 z-0 hidden md:block">
        Compassionate Care
      </h2>
      {/* Responsive height using Tailwind breakpoints */}
      <style>{`
        @media (max-width: 640px) {
          #home { min-height: 300px; height: 50vh; }
        }
        @media (min-width: 641px) and (max-width: 1024px) {
          #home { min-height: 400px; height: 60vh; }
        }
        @media (min-width: 1025px) {
          #home { min-height: 500px; height: 70vh; }
        }
      `}</style>
    </section>
  );
};

export default Hero;
