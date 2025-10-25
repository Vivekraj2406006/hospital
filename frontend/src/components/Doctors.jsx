
import DrVidyanandImg from "../assets/Dr.Vidyanand.jpg";

const doctorsList = [
  {
    img: "",
    name: "Dr.Sunil Kumar ",
    specialty: "Cardiologist",
    bio: `MBBS(PMCH Patna) ,MD (Medicine)\nCertified cource in Diabetologist \n Ex-Resident Safadargang Hospital New Delhi\nEx-Senior-Regident Jawahar lal Nehru Medical College and Hospital Bhagalpur \n Cardiologist & Diabetologist\n Reg-No:43985`
  },
  {
    img: "https://placehold.co/400x400/cffafe/0e7490?text=Dr.+Mark+Chen",
    name: "Dr. Mark Chen",
    specialty: "Pediatrician",
    bio: "Dedicated to the health and well-being of children from birth to young adulthood."
  },
  {
    img: "https://placehold.co/400x400/cffafe/0e7490?text=Dr.+Sarah+Jenkins",
    name: "Dr. Sarah Jenkins",
    specialty: "Neurologist",
    bio: "Specializes in complex neurological disorders and innovative treatments."
  },
  {
    img: DrVidyanandImg,
    name: "Dr. Vidyanand Kumar",
    specialty: "Orthopedic Surgeon",
  bio: `MBBS , D.ORTHO DNB\nEx-Senior Resident Diamond Harbour Government Medical College\nFellowship in spine (Mumbai)\nSpecialist in Bone joint, spine and Ligament surgery`
  }
];

const Doctors = () => {
  return (
    <section id="doctors" className="py-16 md:py-24 bg-white">
      <div className="container mx-auto px-6">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Meet Our Expert Doctors</h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Our specialists are leaders in their fields, dedicated to providing you with personalized care.
          </p>
        </div>

        {/* Doctors Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {doctorsList.map((doc) => (
            <div key={doc.name} className="bg-white border border-gray-200 rounded-2xl shadow-lg overflow-hidden text-center">
              <img
                src={doc.img}
                alt={doc.name}
                className="w-full h-56 object-cover"
                onError={(e) => { e.currentTarget.src = 'https://placehold.co/400x400/e0e0e0/b0b0b0?text=Doctor+Photo'; }}
              />
              <div className="p-6">
                <h3 className="text-2xl font-bold mb-2 text-[#399fa8]">{doc.name}</h3>
                <p className="text-primary-dark font-semibold text-lg mb-2">{doc.specialty}</p>
                <div className="text-gray-700 mt-3 text-left space-y-1">
                  {doc.bio.split('\n').map((line, idx) => (
                    <div key={idx} className={idx === 0 ? "font-semibold" : ""}>{line}</div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Doctors;
