# 🏥 MediCare Hospital Website

<div align="center">

![Hospital Banner](https://img.shields.io/badge/Healthcare-Digital_Solution-0891b2?style=for-the-badge)
![React](https://img.shields.io/badge/React-19.1.1-61dafb?style=for-the-badge&logo=react)
![Vite](https://img.shields.io/badge/Vite-6.3.1-646cff?style=for-the-badge&logo=vite)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-4.1.4-38bdf8?style=for-the-badge&logo=tailwind-css)

**A modern, responsive website for MediCare Hospital providing comprehensive healthcare information and services**

[Live Demo](#) • [Report Bug](#) • [Request Feature](#)

</div>

---

## 📋 Table of Contents

- [About](#about)
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
  - [Running the Application](#running-the-application)
- [Project Structure](#project-structure)
- [Available Scripts](#available-scripts)
- [Key Components](#key-components)
- [Customization](#customization)
- [Contributing](#contributing)
- [License](#license)
- [Contact](#contact)

---

## 🏥 About

MediCare Hospital Website is a modern, fully responsive web application designed to provide patients and visitors with easy access to hospital information, services, and appointment booking functionality. Built with cutting-edge web technologies, the site offers a seamless user experience across all devices.

### Why MediCare Hospital Website?

- 🎯 **Patient-Centric Design**: Intuitive navigation and clear information hierarchy
- 📱 **Fully Responsive**: Optimized for desktop, tablet, and mobile devices
- ⚡ **Lightning Fast**: Built with Vite for optimal performance
- 🎨 **Modern UI/UX**: Clean, professional design using Tailwind CSS
- ♿ **Accessible**: Following web accessibility best practices
- 🗺️ **Interactive Maps**: Location finder with Leaflet integration

---

## ✨ Features

### Core Functionality

- 🏠 **Hero Section**: Engaging landing page with call-to-action buttons
- 🏥 **Services Overview**: Comprehensive list of medical services offered
  - Cardiology
  - Pediatrics
  - Neurology
  - Emergency Care (24/7)
- 👨‍⚕️ **Meet Our Doctors**: Showcase of medical professionals
- 📅 **Appointment Booking**: Easy-to-use appointment scheduling system
- ℹ️ **About Us**: Hospital history, mission, and values
- 📍 **Location Finder**: Interactive maps showing hospital locations
- 📞 **Contact Information**: Multiple ways to reach the hospital

### Technical Features

- ⚡ Hot Module Replacement (HMR) with Vite
- 🎨 Utility-first styling with Tailwind CSS
- 🧭 Smooth scroll navigation
- 📱 Mobile-first responsive design
- 🔔 Toast notifications for user feedback
- 🗺️ Interactive maps with React Leaflet
- 🎯 State management with Zustand
- 🌐 API integration ready with Axios

---

## 🛠️ Tech Stack

### Frontend

- **Framework**: [React](https://react.dev/) 19.1.1
- **Build Tool**: [Vite](https://vitejs.dev/) 6.3.1
- **Styling**: [Tailwind CSS](https://tailwindcss.com/) 4.1.4
- **Routing**: [React Router DOM](https://reactrouter.com/) 7.5.3
- **Icons**: [Lucide React](https://lucide.dev/) & [React Icons](https://react-icons.github.io/react-icons/)
- **Maps**: [React Leaflet](https://react-leaflet.js.org/) 5.0.0
- **HTTP Client**: [Axios](https://axios-http.com/) 1.10.0
- **State Management**: [Zustand](https://zustand-demo.pmnd.rs/) 5.0.6
- **Notifications**: [React Hot Toast](https://react-hot-toast.com/) 2.5.2

### Development Tools

- **Linting**: ESLint 9.22.0
- **Code Quality**: React Hooks & React Refresh plugins
- **Environment Variables**: dotenv

### Backend (Planned)

- **Server**: Node.js with Express (to be implemented in `backend/server.js`)

---

## 🚀 Getting Started

### Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js**: Version 18.0 or higher ([Download](https://nodejs.org/))
- **npm**: Version 9.0 or higher (comes with Node.js)
- **Git**: For cloning the repository ([Download](https://git-scm.com/))

### Installation

1. **Clone the repository**

   ```bash
   git clone https://github.com/Vivekraj2406006/hospital.git
   cd hospital
   ```

2. **Install frontend dependencies**

   ```bash
   cd frontend
   npm install
   ```

3. **Set up environment variables (optional)**

   Create a `.env` file in the `frontend` directory:

   ```env
   VITE_API_URL=http://localhost:3000
   ```

### Running the Application

#### Development Mode

1. **Start the frontend development server**

   ```bash
   cd frontend
   npm run dev
   ```

   The application will be available at `http://localhost:5173`

2. **Start the backend server (when implemented)**

   ```bash
   cd backend
   node server.js
   ```

#### Production Build

1. **Build the frontend**

   ```bash
   cd frontend
   npm run build
   ```

   The optimized build will be created in the `frontend/dist` directory.

2. **Preview the production build**

   ```bash
   npm run preview
   ```

---

## 📁 Project Structure

```
hospital/
├── frontend/                  # React frontend application
│   ├── public/               # Static assets
│   │   └── vite.svg
│   ├── src/                  # Source files
│   │   ├── assets/           # Images, fonts, etc.
│   │   ├── components/       # React components
│   │   │   ├── Header.jsx
│   │   │   ├── Hero.jsx
│   │   │   ├── Services.jsx
│   │   │   ├── About.jsx
│   │   │   ├── Doctors.jsx
│   │   │   ├── Appointment.jsx
│   │   │   ├── Locations.jsx
│   │   │   └── Footer.jsx
│   │   ├── App.jsx           # Main App component
│   │   ├── main.jsx          # Entry point
│   │   └── index.css         # Global styles
│   ├── index.html            # HTML template
│   ├── package.json          # Dependencies and scripts
│   ├── vite.config.js        # Vite configuration
│   ├── eslint.config.js      # ESLint configuration
│   └── .gitignore
├── backend/                   # Backend server (to be implemented)
│   └── server.js
└── README.md                  # This file
```

---

## 📜 Available Scripts

### Frontend Scripts

```bash
# Start development server with HMR
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview

# Run ESLint for code quality
npm run lint
```

---

## 🧩 Key Components

### Header
- Responsive navigation bar
- Smooth scroll links to sections
- Mobile-friendly hamburger menu

### Hero
- Eye-catching banner with CTA buttons
- Responsive design
- Engaging call-to-action

### Services
- Grid layout of medical services
- Icon-based visual representation
- Hover effects for interactivity

### About
- Hospital information and history
- Mission and values
- Professional imagery

### Doctors
- Showcase of medical staff
- Doctor profiles with specializations
- Responsive card layout

### Appointment
- User-friendly booking form
- Form validation
- Success/error notifications

### Locations
- Interactive maps using Leaflet
- Multiple hospital locations
- Address and contact details

### Footer
- Contact information
- Social media links
- Quick navigation links
- Copyright information

---

## 🎨 Customization

### Colors

The project uses Tailwind CSS with custom color schemes. You can modify colors in the `index.css` or Tailwind configuration.

### Content

To customize hospital information:

1. **Services**: Edit `frontend/src/components/Services.jsx`
2. **Doctors**: Edit `frontend/src/components/Doctors.jsx`
3. **About**: Edit `frontend/src/components/About.jsx`
4. **Contact**: Edit `frontend/src/components/Footer.jsx`

### Adding New Pages

1. Create a new component in `src/components/`
2. Import and add to `App.jsx`
3. Update navigation in `Header.jsx`

---

## 🤝 Contributing

Contributions are what make the open-source community such an amazing place to learn, inspire, and create. Any contributions you make are **greatly appreciated**.

### How to Contribute

1. **Fork the Project**
2. **Create your Feature Branch**
   ```bash
   git checkout -b feature/AmazingFeature
   ```
3. **Commit your Changes**
   ```bash
   git commit -m 'Add some AmazingFeature'
   ```
4. **Push to the Branch**
   ```bash
   git push origin feature/AmazingFeature
   ```
5. **Open a Pull Request**

### Contribution Guidelines

- Follow the existing code style
- Write clear, descriptive commit messages
- Update documentation as needed
- Test your changes thoroughly
- Ensure ESLint passes without errors

---

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

## 📞 Contact

**Project Maintainer**: Vivekraj

**Project Repository**: [https://github.com/Vivekraj2406006/hospital](https://github.com/Vivekraj2406006/hospital)

---

## 🙏 Acknowledgments

- [React Documentation](https://react.dev/)
- [Vite Documentation](https://vitejs.dev/)
- [Tailwind CSS](https://tailwindcss.com/)
- [Lucide Icons](https://lucide.dev/)
- [React Leaflet](https://react-leaflet.js.org/)
- [Unsplash](https://unsplash.com/) for placeholder images

---

## 🗺️ Roadmap

- [ ] Backend API implementation
- [ ] User authentication system
- [ ] Online payment integration
- [ ] Patient portal
- [ ] Medical records management
- [ ] Telemedicine integration
- [ ] Multi-language support
- [ ] Dark mode toggle
- [ ] Email notifications
- [ ] SMS reminders for appointments

---

<div align="center">

**Made with ❤️ for better healthcare access**

⭐ Star this repo if you find it helpful!

</div>
