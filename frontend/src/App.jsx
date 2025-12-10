// src/App.jsx

import { Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Hero from './components/Hero';
import Services from './components/Services';
import About from './components/About';
import Doctors from './components/Doctors';
import Appointment from './components/Appointment';
import Locations from './components/Locations';
import Footer from './components/Footer';
import Login from './pages/Login';
import HospitalAdminApp from './components/HospitalAdminApp';
import ProtectedRoute from './components/ProtectedRoute';
import ScrollToTop from './components/ScrollToTop';
import RevealOnScroll from './components/RevealOnScroll';

function App() {
  return (
    <div className="font-sans antialiased text-gray-800">
      <Header />
      <ScrollToTop />
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/admin" element={<HospitalAdminApp />} />
        <Route path="/" element={
          <>
            <main>
              <Hero />
              <RevealOnScroll>
                <Services />
              </RevealOnScroll>
              <RevealOnScroll>
                <About />
              </RevealOnScroll>
              <RevealOnScroll>
                <Doctors />
              </RevealOnScroll>
              <RevealOnScroll>
                <Appointment />
              </RevealOnScroll>
              <RevealOnScroll>
                <Locations />
              </RevealOnScroll>
            </main>
            <Footer />
          </>
        } />
      </Routes>
    </div>
  );
}

export default App;
