import { useState, useContext } from "react";
import { AppContext } from "../context/AppContext";
import { Menu } from "lucide-react";
import Logo from "../assets/logo.png";
import { useNavigate, Link } from "react-router-dom";

const Header = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const { isLoggedIn, logout } = useContext(AppContext);
  const navigate = useNavigate();

  return (
    <header className="bg-white shadow-sm sticky top-0 z-1000 ">
      <nav className="container mx-auto px-6 py-4 flex justify-between items-center">
        {/* Logo */}
        <a
          href="#"
          className="text-3xl font-bold  flex items-center text-[#399fa8]"
        >
          <img src={Logo} alt="SR Emergency Logo" className="w-14 h-14 mr-2" />
          SR EMERGENCY
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
                <button
                  className="text-muted hover:text-primary hover:text-gray-400 font-medium transition bg-transparent border-none cursor-pointer"
                  onClick={() => {
                    if (item === "Home") {
                      navigate("/");
                      setTimeout(() => {
                        window.scrollTo({ top: 0, behavior: "smooth" });
                      }, 100);
                    } else {
                      navigate("/");
                      setTimeout(() => {
                        const el = document.getElementById(item.toLowerCase().replace(" ", ""));
                        if (el) el.scrollIntoView({ behavior: "smooth" });
                      }, 100);
                    }
                  }}
                >
                  {item}
                </button>
              </li>
            )
          )}
          <li>
            <button
              className="bg-[#10b7c6] text-white px-5 py-2 rounded-full font-medium shadow-md hover:bg-primary/90 transition cursor-pointer hover:bg-[hsl(185,85%,32%)]"
              onClick={() => {
                navigate("/");
                setTimeout(() => {
                  const el = document.getElementById("appointment");
                  if (el) el.scrollIntoView({ behavior: "smooth" });
                }, 100);
              }}
            >
              Book Appointment
            </button>
          </li>
          {!isLoggedIn && (
            <li>
              <Link
                to="/login"
                className="ml-4 px-5 py-2 rounded-full bg-gradient-to-r from-[#399fa8] to-[#0e9aa7] text-white font-medium shadow-md hover:from-[#0e9aa7] hover:to-[hsl(185,49%,30%)] transition"
              >
                Login
              </Link>
            </li>
          )}
          {isLoggedIn && (
            <li>
              <button
                onClick={logout}
                className="ml-4 px-5 py-2 rounded-full bg-gradient-to-r from-[#399fa8] to-[#0e9aa7] text-white font-medium shadow-md hover:from-[#0e9aa7] hover:to-[#399fa8] transition"
              >
                Logout
              </button>
            </li>
          )}
        </ul>
      </nav>

      {/* Mobile Menu */}
      <div
        id="mobile-menu"
        className={`${isMobileMenuOpen ? "block" : "hidden"} md:hidden px-6 pb-4 space-y-2`}
      >
        {["Home", "Services", "Doctors", "About Us", "Locations", "Contact"].map(
          (item) => (
            <button
              key={item}
              className="block text-muted hover:text-primary font-medium transition bg-transparent border-none cursor-pointer w-full text-left"
              onClick={() => {
                if (item === "Home") {
                  navigate("/");
                  setTimeout(() => {
                    window.scrollTo({ top: 0, behavior: "smooth" });
                  }, 100);
                } else {
                  navigate("/");
                  setTimeout(() => {
                    const el = document.getElementById(item.toLowerCase().replace(" ", ""));
                    if (el) el.scrollIntoView({ behavior: "smooth" });
                  }, 100);
                }
              }}
            >
              {item}
            </button>
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
