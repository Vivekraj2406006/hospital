// src/components/About.jsx

const About = () => {
  return (
    <section
      id="about"
      className="py-16 md:py-24 bg-gradient-to-br from-[#3b8686]/30 via-[#0e9aa7]/20 to-[#66c2c2]/30"
    >
      <div className="container mx-auto px-6">
        <div className="flex flex-col lg:flex-row items-center gap-12">
          {/* Image */}
          <div className="lg:w-1/2 flex justify-center items-center">
            <img
              src="https://placehold.co/600x400/a5f3fc/0891b2?text=Our+State-of-the-Art+Facility"
              alt="Hospital Facility"
              className="w-full h-auto rounded-3xl shadow-2xl border-4 border-[#399fa8]/20"
              onError={(e) => {
                e.currentTarget.src =
                  'https://placehold.co/600x400/e0e0e0/b0b0b0?text=Image+Not+Available';
              }}
            />
          </div>

          {/* Text Content */}
          <div className="lg:w-1/2">
            <h2 className="text-3xl md:text-4xl font-extrabold text-[#399fa8] mb-4 tracking-tight">
              About SR EMERGENCY Hospital
            </h2>
            <p className="text-lg text-gray-600 mb-4">
              Founded with a mission to provide exceptional and accessible
              healthcare, SR EMERGENCY Hospital has been a cornerstone of the
              community for over 20 years. We combine advanced technology with a
              human touch to ensure the best possible outcomes for our patients.
            </p>
            <p className="text-lg text-gray-600 mb-8">
              Our team of dedicated professionals is committed to upholding our
              values of compassion, integrity, and excellence in everything we
              do.
            </p>
            <a
              href="#contact"
              className="bg-[#399fa8] text-white px-8 py-3 rounded-full text-lg font-semibold shadow-lg hover:bg-[#2b7a78] transition"
            >
              Learn More
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
