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
import EmailVerify from './pages/EmailVerify';
import ResetPassword from './pages/ResetPassword';
import ProtectedRoute from './components/ProtectedRoute';
import ScrollToTop from './components/ScrollToTop';

function App() {
  return (
    <div className="font-sans antialiased text-gray-800">
      <Header />
      <ScrollToTop />
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/admin" element={<HospitalAdminApp />} />
        <Route path="/verify-email" element={<EmailVerify />} />
        <Route path="/reset-password" element={<ResetPassword />} />
        <Route path="/" element={
          <>
            <main>
              <Hero />
              <Services />
              <About />
              <Doctors />
              <Appointment />
              <Locations />
            </main>
            <Footer />
          </>
        } />
      </Routes>
    </div>
  );
}

export default App;
