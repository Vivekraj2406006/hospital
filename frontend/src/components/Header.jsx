import { useState } from "react";
import { Hospital, Menu } from "lucide-react";

const Header = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <header className="bg-white shadow-sm sticky top-0 z-1000 ">
      <nav className="container mx-auto px-6 py-4 flex justify-between items-center">
        {/* Logo */}
        <a
          href="#"
          className="text-3xl font-bold  flex items-center text-[#399fa8]"
        >
          <Hospital className="w-8 h-8 mr-2 " />
          MediCare
        </a>

        {/* Mobile Menu Button */}
        <button
          aria-expanded={isMobileMenuOpen}
          aria-controls="mobile-menu"
          id="mobile-menu-button"
          className="md:hidden text-muted focus:outline-none"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          <Menu className="w-6 h-6" />
        </button>

        {/* Desktop Navigation */}
        <ul className="hidden md:flex items-center space-x-6">
          {["Home", "Services", "Doctors", "About", "Locations", "Contact"].map(
            (item) => (
              <li key={item}>
                <a
                  href={`#${item.toLowerCase().replace(" ", "")}`}
                  className="text-muted hover:text-primary font-medium transition"
                >
                  {item}
                </a>
              </li>
            )
          )}
          <li>
            <a
              href="#appointment"
              className="bg-[#10b7c6] text-white px-5 py-2 rounded-full font-medium shadow-md hover:bg-primary/90 transition"
            >
              Book Appointment
            </a>
          </li>
        </ul>
      </nav>

      {/* Mobile Menu */}
      <div
        id="mobile-menu"
        className={`${isMobileMenuOpen ? "block" : "hidden"} md:hidden px-6 pb-4 space-y-2`}
      >
        {["Home", "Services", "Doctors", "About Us", "Locations", "Contact"].map(
          (item) => (
            <a
              key={item}
              href={`#${item.toLowerCase().replace(" ", "")}`}
              className="block text-muted hover:text-primary font-medium transition"
            >
              {item}
            </a>
          )
        )}
        <a
          href="#appointment"
          className="block bg-[#06a0ae] text-white text-center px-5 py-2 rounded-full font-medium shadow-md hover:bg-primary/90 transition mt-2"
        >
          Book Appointment
        </a>
      </div>
    </header>
  );
};

export default Header;
