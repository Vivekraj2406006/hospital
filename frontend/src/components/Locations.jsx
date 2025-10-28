const Locations = () => {

  return (
    <section id="locations" className="py-16 md:py-24 bg-surface">
      {/* Title Section */}
      <div className="text-center mb-12">
        <h2 className="text-3xl md:text-4xl font-bold text-fg mb-4">
          Find Our Locations
        </h2>
        <p className="text-lg text-muted max-w-2xl mx-auto">
          Our facility is conveniently located. See the map below.
        </p>
      </div>

      <div className="container mx-auto px-6 max-w-7xl flex justify-center">
        <div className="w-full max-w-5xl">
          <h3 className="text-2xl font-semibold mb-4 text-fg text-center">
            Map View
          </h3>
          <div className="w-full relative rounded-2xl shadow-md border border-outline overflow-hidden">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3592.1225521781766!2d85.90584671041329!3d25.799530677233598!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39ed93d3dca5d6cf%3A0x965c58a87a5d45c8!2sSR%20EMERGENCY%20HOSPITAL!5e0!3m2!1sen!2sin!4v1761585996901!5m2!1sen!2sin"
              className="w-full h-[500px]" // Use Tailwind for responsive size
              style={{ border: 0 }}
              allowFullScreen=""
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            ></iframe>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Locations;
