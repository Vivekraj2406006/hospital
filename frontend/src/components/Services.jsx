import React, { useState } from "react";

const services = [
  {
    icon: <span className="text-3xl">👩‍⚕️</span>,
    title: "GYNECOLOGY",
    description:
      "Comprehensive women’s health services including prenatal care and gynecologic treatments.",
  },
  {
    icon: <span className="text-3xl">🦴</span>,
    title: "ORTHOPEDICS",
    description: "Diagnosis and treatment for bones, joints and musculoskeletal injuries.",
  },
  {
    icon: <span className="text-3xl">❤️‍🩹</span>,
    title: "CARDIOLOGY",
    description:
      "Expert heart care from diagnosis to treatment to protect cardiovascular health.",
  },
  {
    icon: <span className="text-3xl">💊</span>,
    title: "Pharmacy",
    description:
      "On-site pharmacy services for prescriptions and medication counseling.",
  },
  {
    icon: <span className="text-3xl">🔬</span>,
    title: "Pathology",
    description:
      "Accurate lab diagnostics and pathology services to support clinical decisions.",
  },
  {
    icon: <span className="text-3xl">🖥️</span>,
    title: "Ultrasound",
    description: "High-resolution ultrasound imaging for diagnosis and monitoring.",
  },
  {
    icon: <span className="text-3xl">📈</span>,
    title: "ECG",
    description:
      "Electrocardiography services for rapid cardiac rhythm and function assessment.",
  },
  {
    icon: <span className="text-3xl">🩻</span>,
    title: "X-ray",
    description:
      "Digital radiography for fast and reliable imaging of injuries and conditions.",
  },
  {
    icon: <span className="text-3xl">🐍</span>,
    title:
      "Snakebite envenomation and poisoning (or ingestion of a toxic substance)",
    description:
      "Specialised emergency treatment and antidote management for envenomation and poisoning cases.",
  },
];

const Services = () => {
  const [showAllMobile, setShowAllMobile] = useState(false);
  const hasExtra = services.length > 4;

  return (
    <section id="services" className="py-16 md:py-24 bg-surface">
      <div className="container mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-fg mb-4">
            Our Medical Services
          </h2>
          <p className="text-lg text-muted max-w-2xl mx-auto">
            We offer a wide range of specialized medical services to meet all
            your health needs.
          </p>
        </div>

        {/* Service Grid */}
        <div
          id="services-grid"
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8"
        >
          {services.map((service, i) => {
            const hideOnMobile = i >= 4 && !showAllMobile;
            return (
              <div
                key={service.title}
                className={`bg-surface-variant p-8 rounded-2xl shadow-md hover:shadow-lg hover:scale-105 transition duration-300 ${
                  hideOnMobile ? "hidden sm:block" : ""
                }`}
              >
                <div className="bg-[#3ad8e6] text-white w-16 h-16 rounded-full flex items-center justify-center mb-6 shadow-inner">
                  {service.icon}
                </div>
                <h3 className="text-2xl font-semibold mb-3 text-fg">
                  {service.title}
                </h3>
                <p className="text-muted">{service.description}</p>
              </div>
            );
          })}
        </div>

        {/* See more/less (mobile only) */}
        {hasExtra && (
          <div className="mt-8 text-center sm:hidden">
            <button
              type="button"
              onClick={() => setShowAllMobile((v) => !v)}
              className="inline-flex items-center px-4 py-2 rounded-full bg-[#3ad8e6] text-white font-medium shadow hover:shadow-md active:scale-95 transition"
              aria-expanded={showAllMobile}
              aria-controls="services-grid"
            >
              {showAllMobile ? "See less" : "See more"}
            </button>
          </div>
        )}
      </div>
    </section>
  );
};

export default Services;