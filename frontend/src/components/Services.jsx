import React from "react";
import gyne from "../assets/GYNECOLOGY.jpg";
import ortho from "../assets/ORTHOPEDICS.jpg";
import cardio from "../assets/CARDIOLOGY.jpg";
import pharmacy from "../assets/Pharmacy.jpg";
import pathology from "../assets/Pathology.jpg";
import ultrasound from "../assets/Ultrasound.jpg";
import ecg from "../assets/ECG.jpg";
import xray from "../assets/x-ray.jpg";
import img5 from "../assets/img5.jpg";

const services = [
  {
    image: gyne,
    title: "GYNECOLOGY",
    description:
      "Comprehensive women’s health services including prenatal care and gynecologic treatments.",
    about:
      "Our gynecology team provides routine care, pregnancy support and advanced treatments with compassion and expertise.",
  },
  {
    image: ortho,
    title: "ORTHOPEDICS",
    description: "Diagnosis and treatment for bones, joints and musculoskeletal injuries.",
    about:
      "From fractures to joint replacements, our orthopedic specialists use modern techniques to restore mobility.",
  },
  {
    image: cardio,
    title: "CARDIOLOGY",
    description:
      "Expert heart care from diagnosis to treatment to protect cardiovascular health.",
    about:
      "Cardiology services include preventive care, diagnostics and interventions guided by experienced cardiologists.",
  },
  {
    image: pharmacy,
    title: "Pharmacy",
    description: "On-site pharmacy services for prescriptions and medication counseling.",
    about:
      "Our pharmacy team ensures correct medication dispensing and offers counseling to improve adherence and safety.",
  },
  {
    image: pathology,
    title: "Pathology",
    description: "Accurate lab diagnostics and pathology services to support clinical decisions.",
    about:
      "State-of-the-art laboratory testing and rapid reporting help clinicians make timely, informed decisions.",
  },
  // reuse images for remaining services if needed
  {
    image: ultrasound,
    title: "Ultrasound",
    description: "High-resolution ultrasound imaging for diagnosis and monitoring.",
    about: "Ultrasound imaging for obstetrics, abdominal, vascular and musculoskeletal examinations.",
  },
  {
    image: ecg,
    title: "ECG",
    description: "Electrocardiography services for rapid cardiac rhythm and function assessment.",
    about: "Quick ECG recording and expert interpretation to detect arrhythmias and ischemic changes.",
  },
  {
    image: xray,
    title: "X-ray",
    description: "Digital radiography for fast and reliable imaging of injuries and conditions.",
    about: "Digital X-ray provides clear images for fracture diagnosis and follow-up with low radiation exposure.",
  },
  {
    image: img5,
    title: "Emergency Toxicology",
    description:
      "Specialised emergency treatment and antidote management for envenomation and poisoning cases.",
    about: "Our emergency team is trained in rapid assessment and treatment of poisoning and envenomation.",
  },
];

const Services = () => {
  return (
    <section id="services" className="py-16 md:py-24 bg-surface">
      <div className="container mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-fg mb-4">Our Medical Services</h2>
          <p className="text-lg text-muted max-w-2xl mx-auto">We offer a wide range of specialized medical services to meet all your health needs.</p>
        </div>

        {/* Service Grid: each card contains an image, title, short description and an about paragraph */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, i) => (
            <article key={i} className="bg-surface-variant overflow-hidden rounded-2xl shadow-md hover:shadow-lg hover:scale-101 transition duration-300">
              <div className="relative h-48 md:h-40 lg:h-44 w-full">
                <img src={service.image} alt={service.title} className="w-full h-full object-cover" />
              </div>

              <div className="p-6">
                <h3 className="text-xl md:text-2xl font-semibold mb-2 text-fg">{service.title}</h3>
                <p className="text-sm text-muted mb-3">{service.description}</p>
                <p className="text-sm text-muted/90">{service.about}</p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;
import React from "react";
import gyne from "../assets/GYNECOLOGY.jpg";
import ortho from "../assets/ORTHOPEDICS.jpg";
import cardio from "../assets/CARDIOLOGY.jpg";
import pharmacy from "../assets/Pharmacy.jpg";
import pathology from "../assets/Pathology.jpg";
import ultrasound from "../assets/Ultrasound.jpg";
import ecg from "../assets/ECG.jpg";
import xray from "../assets/x-ray.jpg";
import img5 from "../assets/img5.jpg";

const services = [
  {
    image: gyne,
    title: "GYNECOLOGY",
    description:
      "Comprehensive women’s health services including prenatal care and gynecologic treatments.",
    about:
      "Our gynecology team provides routine care, pregnancy support and advanced treatments with compassion and expertise.",
  },
  {
    image: ortho,
    title: "ORTHOPEDICS",
    description: "Diagnosis and treatment for bones, joints and musculoskeletal injuries.",
    about:
      "From fractures to joint replacements, our orthopedic specialists use modern techniques to restore mobility.",
  },
  {
    image: cardio,
    title: "CARDIOLOGY",
    description:
      "Expert heart care from diagnosis to treatment to protect cardiovascular health.",
    about:
      "Cardiology services include preventive care, diagnostics and interventions guided by experienced cardiologists.",
  },
  {
    image: pharmacy,
    title: "Pharmacy",
    description: "On-site pharmacy services for prescriptions and medication counseling.",
    about:
      "Our pharmacy team ensures correct medication dispensing and offers counseling to improve adherence and safety.",
  },
  {
    image: pathology,
    title: "Pathology",
    description: "Accurate lab diagnostics and pathology services to support clinical decisions.",
    about:
      "State-of-the-art laboratory testing and rapid reporting help clinicians make timely, informed decisions.",
  },
  // reuse images for remaining services if needed
  {
    image: ultrasound,
    title: "Ultrasound",
    description: "High-resolution ultrasound imaging for diagnosis and monitoring.",
    about: "Ultrasound imaging for obstetrics, abdominal, vascular and musculoskeletal examinations.",
  },
  {
    image: ecg,
    title: "ECG",
    description: "Electrocardiography services for rapid cardiac rhythm and function assessment.",
    about: "Quick ECG recording and expert interpretation to detect arrhythmias and ischemic changes.",
  },
  {
    image: xray,
    title: "X-ray",
    description: "Digital radiography for fast and reliable imaging of injuries and conditions.",
    about: "Digital X-ray provides clear images for fracture diagnosis and follow-up with low radiation exposure.",
  },
  {
    image: img5,
    title: "Emergency Toxicology",
    description:
      "Specialised emergency treatment and antidote management for envenomation and poisoning cases.",
    about: "Our emergency team is trained in rapid assessment and treatment of poisoning and envenomation.",
  },
];

const Services = () => {
  const [showAllMobile, setShowAllMobile] = useState(false);
  const hasExtra = services.length > 4;

  return (
    <section id="services" className="py-16 md:py-24 bg-surface">
      <div className="container mx-auto px-6">
        {/* Header */}
        const Services = () => {
          return (
            <section id="services" className="py-16 md:py-24 bg-surface">
              <div className="container mx-auto px-6">
                {/* Header */}
                <div className="text-center mb-12">
                  <h2 className="text-3xl md:text-4xl font-bold text-fg mb-4">Our Medical Services</h2>
                  <p className="text-lg text-muted max-w-2xl mx-auto">We offer a wide range of specialized medical services to meet all your health needs.</p>
                </div>

                {/* Service Grid: each card contains an image, title, short description and an about paragraph */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                  {services.map((service, i) => (
                    <article key={i} className="bg-surface-variant overflow-hidden rounded-2xl shadow-md hover:shadow-lg hover:scale-101 transition duration-300">
                      <div className="relative h-48 md:h-40 lg:h-44 w-full">
                        <img src={service.image} alt={service.title} className="w-full h-full object-cover" />
                      </div>

                      <div className="p-6">
                        <h3 className="text-xl md:text-2xl font-semibold mb-2 text-fg">{service.title}</h3>
                        <p className="text-sm text-muted mb-3">{service.description}</p>
                        <p className="text-sm text-muted/90">{service.about}</p>
                      </div>
                    </article>
                  ))}
                </div>
              </div>
            </section>
          );
        };