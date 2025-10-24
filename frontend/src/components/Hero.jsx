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
    src: "https://placehold.co/1600x900/66c2c2/0f3b3b?text=Compassionate+Care",
    alt: "Compassionate Care",
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
      className="relative overflow-hidden"
      style={{ height: '70vh', minHeight: '400px' }}
    >
      {/* Background Image Slider */}
      <div id="hero-slider" className="absolute inset-0">
        {slides.map((slide, index) => (
          <img
            key={index}
            src={slide.src}
            alt={slide.alt}
            className={`hero-slide absolute inset-0 w-full h-full object-cover transition-opacity duration-1000 ${
              index === currentSlide ? 'opacity-100' : 'opacity-0'
            }`}
            onError={(e) => { e.currentTarget.src = slide.fallback; }}
          />
        ))}
      </div>

      {/* Colorful Overlay */}
      <div className="absolute inset-0 bg-linear-to-r from-[#3b8686]/90 via-[#0e9aa7]/85 to-[#66c2c2]/80 z-10"></div>

      {/* Content */}
      <div className="absolute inset-0 container mx-auto px-6 flex flex-col justify-center text-white z-20">
        <h1 className="text-4xl md:text-6xl font-extrabold mb-4 leading-tight drop-shadow-lg">
          Your Health, Our Priority.
        </h1>
        <p className="text-lg md:text-2xl mb-8 max-w-2xl text-white/90">
          Providing compassionate, world-class care right in your community.
        </p>
        <a
          href="#appointment"
          className="bg-[#399fa8] hover:bg-[#11999e] text-white w-fit px-8 py-3 rounded-full text-lg font-semibold shadow-lg hover:shadow-xl transition duration-300"
        >
          Book an Appointment
        </a>
      </div>

      {/* Decorative Text (Optional) */}
      <h2 className="absolute bottom-12 right-6 text-[6rem] font-extrabold text-white/10 z-0 hidden md:block">
        Compassionate Care
      </h2>
    </section>
  );
};

export default Hero;
