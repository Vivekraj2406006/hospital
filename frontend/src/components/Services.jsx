import { HeartPulse, Baby, Brain, Activity } from "lucide-react";

const services = [
  {
    icon: <HeartPulse className="w-8 h-8" />,
    title: "Cardiology",
    description:
      "Expert heart care from diagnosis to treatment, ensuring your cardiovascular health.",
  },
  {
    icon: <Baby className="w-8 h-8" />,
    title: "Pediatrics",
    description:
      "Compassionate and comprehensive care for infants, children, and adolescents.",
  },
  {
    icon: <Brain className="w-8 h-8" />,
    title: "Neurology",
    description:
      "Advanced diagnostics and treatment for disorders of the nervous system.",
  },
  {
    icon: <Activity className="w-8 h-8" />,
    title: "Emergency Care",
    description:
      "24/7 state-of-the-art emergency department ready for any medical crisis.",
  },
];

const Services = () => {
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
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {services.map((service, i) => (
            <div
              key={i}
              className="bg-surface-variant p-8 rounded-2xl shadow-md hover:shadow-lg hover:scale-105 transition duration-300"
            >
              <div className="bg-[#3ad8e6] text-white w-16 h-16 rounded-full flex items-center justify-center mb-6 shadow-inner">
                {service.icon}
              </div>
              <h3 className="text-2xl font-semibold mb-3 text-fg">
                {service.title}
              </h3>
              <p className="text-muted">{service.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;
