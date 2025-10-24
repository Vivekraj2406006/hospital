// src/components/Footer.jsx

import { Hospital, MapPin, Phone, Mail, Facebook, Twitter, Instagram, Linkedin } from 'lucide-react';

const Footer = () => {
  return (
    <footer id="contact" className="bg-gray-800 text-gray-300 py-16">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
          {/* About */}
          <div className="md:col-span-2">
            <a href="#" className="text-3xl font-bold text-white flex items-center mb-4">
              <Hospital className="w-8 h-8 mr-2" />
              MediCare
            </a>
            <p className="max-w-md">
              Dedicated to providing the highest quality of healthcare in a compassionate and comfortable environment.
            </p>
          </div>
          
          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-semibold text-white mb-4">Quick Links</h4>
            <ul className="space-y-2">
              <li><a href="#about" className="hover:text-primary-light transition">About Us</a></li>
              <li><a href="#services" className="hover:text-primary-light transition">Services</a></li>
              <li><a href="#doctors" className="hover:text-primary-light transition">Find a Doctor</a></li>
              <li><a href="#appointment" className="hover:text-primary-light transition">Appointments</a></li>
            </ul>
          </div>
          
          {/* Contact Info */}
          <div>
            <h4 className="text-lg font-semibold text-white mb-4">Contact Us</h4>
            <ul className="space-y-3">
              <li className="flex items-start">
                <MapPin className="w-5 h-5 mr-3 mt-1 text-primary-light shrink-0" />
                <span>123 Health St, Wellness City, 12345</span>
              </li>
              <li className="flex items-center">
                <Phone className="w-5 h-5 mr-3 text-primary-light shrink-0" />
                <span>(123) 456-7890</span>
              </li>
              <li className="flex items-center">
                <Mail className="w-5 h-5 mr-3 text-primary-light shrink-0" />
                <span>info@medicare.com</span>
              </li>
            </ul>
          </div>
        </div>
        
        {/* Copyright & Socials */}
        <div className="mt-12 pt-8 border-t border-gray-700 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-400">&copy; 2025 MediCare Hospital. All rights reserved.</p>
          
          {/* Social Media Icons */}
          <div className="flex space-x-4 mt-4 md:mt-0">
            <a href="#" className="text-gray-400 hover:text-primary-light"><Facebook className="w-6 h-6" /></a>
            <a href="#" className="text-gray-400 hover:text-primary-light"><Twitter className="w-6 h-6" /></a>
            <a href="#" className="text-gray-400 hover:text-primary-light"><Instagram className="w-6 h-6" /></a>
            <a href="#" className="text-gray-400 hover:text-primary-light"><Linkedin className="w-6 h-6" /></a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;