import { useState, useContext } from "react";
import { AppContext } from "../context/AppContext";
import { Menu, X } from "lucide-react";
import Logo from "../assets/logo.png";
import { useNavigate, Link } from "react-router-dom";

const Header = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const { isLoggedIn, logout } = useContext(AppContext);
  const navigate = useNavigate();

  const handleNavigation = (item) => {
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
  };

  return (
    <header className="bg-white shadow-sm sticky top-0 z-[1000]">
      <nav className="container mx-auto px-4 sm:px-6 lg:px-8 py-3 sm:py-4 flex justify-between items-center">
        {/* Logo - Responsive sizing */}
        <a
          href="#"
          className="text-xl sm:text-2xl lg:text-3xl font-bold flex items-center text-[#399fa8]"
        >
          <img
            src={Logo}
            alt="SR Emergency Logo"
            className="w-10 h-10 sm:w-12 sm:h-12 lg:w-14 lg:h-14 mr-2"
          />
          <span className="hidden xs:inline sm:inline">SR EMERGENCY</span>
          <span className="inline xs:hidden sm:hidden">SR EMERGENCY</span>
        </a>

        {/* Tablet/Mobile Menu Button */}
        <button
          aria-expanded={isMobileMenuOpen}
          aria-controls="mobile-menu"
          aria-label="Toggle menu"
          id="mobile-menu-button"
          className="lg:hidden text-muted focus:outline-none hover:text-primary transition"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          {isMobileMenuOpen ? (
            <X className="w-6 h-6 sm:w-7 sm:h-7" />
          ) : (
            <Menu className="w-6 h-6 sm:w-7 sm:h-7" />
          )}
        </button>

        {/* Desktop Navigation - Hidden on tablet and mobile */}
        <ul className="hidden lg:flex items-center space-x-4 xl:space-x-6">
          {["Home", "Services", "Doctors", "About", "Locations", "Contact"].map(
            (item) => (
              <li key={item}>
                <button
                  className="text-muted hover:text-primary font-medium transition bg-transparent border-none cursor-pointer text-sm xl:text-base"
                  onClick={() => handleNavigation(item)}
                >
                  {item}
                </button>
              </li>
            )
          )}
          <li>
            <button
              className="bg-[#10b7c6] text-white px-4 xl:px-5 py-2 rounded-full font-medium shadow-md hover:bg-primary/90 transition hover:cursor-pointer text-sm xl:text-base whitespace-nowrap"
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
                className="ml-2 xl:ml-4 px-4 xl:px-5 py-2 rounded-full bg-gradient-to-r from-[#399fa8] to-[#0e9aa7] text-white font-medium shadow-md hover:from-[#0e9aa7] hover:to-[#399fa8] transition text-sm xl:text-base"
              >
                Login
              </Link>
            </li>
          )}
          {isLoggedIn && (
            <li>
              <button
                onClick={logout}
                className="ml-2 xl:ml-4 px-4 xl:px-5 py-2 rounded-full bg-gradient-to-r from-[#399fa8] to-[#0e9aa7] text-white font-medium shadow-md hover:from-[#0e9aa7] hover:to-[#399fa8] transition hover:cursor-pointer text-sm xl:text-base"
              >
                Logout
              </button>
            </li>
          )}
        </ul>
      </nav>

      {/* Mobile/Tablet Menu - Smooth dropdown */}
      <div
        id="mobile-menu"
        className={`${
          isMobileMenuOpen
            ? "max-h-screen opacity-100"
            : "max-h-0 opacity-0"
        } lg:hidden overflow-hidden transition-all duration-300 ease-in-out`}
      >
        <div className="px-4 sm:px-6 pb-4 pt-2 space-y-2 bg-white border-t border-gray-100">
          {["Home", "Services", "Doctors", "About", "Locations", "Contact"].map(
            (item) => (
              <button
                key={item}
                className="block text-muted hover:text-primary hover:bg-gray-50 font-medium transition bg-transparent border-none cursor-pointer w-full text-left px-4 py-2 rounded-lg text-sm sm:text-base"
                onClick={() => {
                  handleNavigation(item);
                  setIsMobileMenuOpen(false);
                }}
              >
                {item}
              </button>
            )
          )}

          {/* Action Buttons Container */}
          <div className="pt-2 space-y-2 flex flex-col sm:flex-row sm:space-y-0 sm:space-x-3">
            <button
              className="bg-[#06a0ae] text-white text-center px-5 py-2.5 rounded-full font-medium shadow-md hover:bg-primary/90 transition w-full sm:flex-1 text-sm sm:text-base"
              onClick={() => {
                navigate("/");
                setTimeout(() => {
                  const el = document.getElementById("appointment");
                  if (el) el.scrollIntoView({ behavior: "smooth" });
                }, 100);
                setIsMobileMenuOpen(false);
              }}
            >
              Book Appointment
            </button>

            {/* Mobile/Tablet Login/Logout */}
            {!isLoggedIn && (
              <button
                className="w-full sm:flex-1 px-5 py-2.5 rounded-full bg-gradient-to-r from-[#399fa8] to-[#0e9aa7] text-white font-medium shadow-md hover:from-[#0e9aa7] hover:to-[#399fa8] transition text-sm sm:text-base"
                onClick={() => {
                  setIsMobileMenuOpen(false);
                  navigate('/login');
                }}
              >
                Login
              </button>
            )}
            {isLoggedIn && (
              <button
                className="w-full sm:flex-1 px-5 py-2.5 rounded-full bg-gradient-to-r from-[#399fa8] to-[#0e9aa7] text-white font-medium shadow-md hover:from-[#0e9aa7] hover:to-[#399fa8] transition text-sm sm:text-base"
                onClick={() => {
                  logout();
                  setIsMobileMenuOpen(false);
                }}
              >
                Logout
              </button>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
