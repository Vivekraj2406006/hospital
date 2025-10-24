// src/App.jsx

import Header from './components/Header';
import Hero from './components/Hero';
import Services from './components/Services';
import About from './components/About';
import Doctors from './components/Doctors';
import Appointment from './components/Appointment';
import Locations from './components/Locations';
import Footer from './components/Footer';

function App() {
  return (
    <div className="font-sans antialiased text-gray-800">
      <Header />
      <main>
        <Hero />
        <Services />
        <About />
        <Doctors />
        <Appointment />
        <Locations />
      </main>
      <Footer />
    </div>
  );
}

export default App;