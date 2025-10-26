# 🏥 SR Emergency Hospital Website

<div align="center">

![Hospital Banner](https://img.shields.io/badge/Healthcare-Digital_Solution-0891b2?style=for-the-badge)
![React](https://img.shields.io/badge/React-19.1.1-61dafb?style=for-the-badge&logo=react)
![Vite](https://img.shields.io/badge/Vite-6.3.1-646cff?style=for-the-badge&logo=vite)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-4.1.4-38bdf8?style=for-the-badge&logo=tailwind-css)
![Node.js](https://img.shields.io/badge/Node.js-Backend-339933?style=for-the-badge&logo=node.js)
![Express](https://img.shields.io/badge/Express-5.1.0-000000?style=for-the-badge&logo=express)
![MongoDB](https://img.shields.io/badge/MongoDB-Database-47A248?style=for-the-badge&logo=mongodb)

**A modern, responsive website for SR Emergency Hospital providing comprehensive healthcare information and services**

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
- [Security Features](#security-features)
- [API Endpoints](#api-endpoints)
- [Project Structure](#project-structure)
- [Available Scripts](#available-scripts)
- [Key Components](#key-components)
- [Troubleshooting](#troubleshooting)
- [Customization](#customization)
- [Contributing](#contributing)
- [License](#license)
- [Contact](#contact)
- [Roadmap](#roadmap)

---

## 🏥 About

SR Emergency Hospital Website is a modern, fully responsive full-stack web application designed to provide patients and visitors with easy access to hospital information, services, and appointment booking functionality. Built with cutting-edge web technologies, the site offers a seamless user experience across all devices with secure user authentication and account management.

### Why SR Emergency Hospital Website?

- 🎯 **Patient-Centric Design**: Intuitive navigation and clear information hierarchy
- 📱 **Fully Responsive**: Optimized for desktop, tablet, and mobile devices
- ⚡ **Lightning Fast**: Built with Vite for optimal performance
- 🎨 **Modern UI/UX**: Clean, professional design using Tailwind CSS
- 🔐 **Secure Authentication**: User registration, login with JWT-based authentication
- ✉️ **Email Verification**: OTP-based email verification system
- ♿ **Accessible**: Following web accessibility best practices
- 🗺️ **Interactive Maps**: Location finder with Leaflet integration

---

## ✨ Features

### Core Functionality

- 🔐 **User Authentication**: Secure registration and login system
  - JWT-based token authentication
  - HTTP-only cookie storage for security
  - Protected routes requiring authentication
- ✉️ **Email Verification**: OTP-based account verification via email
- 🔑 **Password Reset**: Secure password reset with OTP verification
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
- 🔔 Toast notifications for user feedback (React Toastify & React Hot Toast)
- 🗺️ Interactive maps with React Leaflet
- 🎯 State management with Context API and Zustand
- 🌐 REST API integration with Axios
- 🔐 JWT authentication with HTTP-only cookies
- 📧 Email service integration with Nodemailer
- 💾 MongoDB database for user management
- 🛡️ Password hashing with bcryptjs
- 🔒 Secure authentication middleware

---

## 🛠️ Tech Stack

### Frontend

- **Framework**: [React](https://react.dev/) 19.1.1
- **Build Tool**: [Vite](https://vitejs.dev/) 6.3.1
- **Styling**: [Tailwind CSS](https://tailwindcss.com/) 4.1.4
- **Routing**: [React Router DOM](https://reactrouter.com/) 7.5.3
- **Icons**: [Lucide React](https://lucide.dev/) & [React Icons](https://react-icons.github.io/react-icons/)
- **Maps**: [React Leaflet](https://react-leaflet.js.org/) 5.0.0 & [Leaflet](https://leafletjs.com/) 1.9.4
- **HTTP Client**: [Axios](https://axios-http.com/) 1.10.0
- **State Management**: [Zustand](https://zustand-demo.pmnd.rs/) 5.0.6 & React Context API
- **Notifications**: [React Hot Toast](https://react-hot-toast.com/) 2.5.2 & [React Toastify](https://fkhadra.github.io/react-toastify/) 11.0.5

### Backend

- **Runtime**: [Node.js](https://nodejs.org/)
- **Framework**: [Express](https://expressjs.com/) 5.1.0
- **Database**: [MongoDB](https://www.mongodb.com/) with [Mongoose](https://mongoosejs.com/) 8.19.2
- **Authentication**: [JSON Web Token (JWT)](https://jwt.io/) 9.0.2
- **Password Hashing**: [bcryptjs](https://www.npmjs.com/package/bcryptjs) 3.0.2
- **Email Service**: [Nodemailer](https://nodemailer.com/) 7.0.10
- **Security**: Cookie-parser, CORS middleware
- **Environment Variables**: [dotenv](https://www.npmjs.com/package/dotenv) 17.2.3

### Development Tools

- **Frontend Linting**: ESLint 9.22.0
- **Code Quality**: React Hooks & React Refresh plugins
- **Hot Reload**: [Nodemon](https://nodemon.io/) 3.1.10 (Backend)

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

3. **Install backend dependencies**

   ```bash
   cd ../backend
   npm install
   ```

4. **Set up environment variables**

   **Frontend** - Create a `.env` file in the `frontend` directory:

   ```env
   VITE_BACKEND_URL=http://localhost:8080
   ```

   **Backend** - Create a `.env` file in the `backend` directory:

   ```env
   PORT=8080
   MONGODB_URI=your_mongodb_connection_string
   JWT_SECRET=your_jwt_secret_key
   
   # Email Configuration (Nodemailer)
   SENDER_EMAIL=your_email@gmail.com
   EMAIL_PASSWORD=your_app_specific_password
   
   # For production
   NODE_ENV=development
   ```

   **Note**: For Gmail, you'll need to generate an [App Password](https://support.google.com/accounts/answer/185833) for `EMAIL_PASSWORD`.

### Running the Application

#### Development Mode

1. **Start the backend development server**

   ```bash
   cd backend
   npm run dev
   ```

   The backend API will be available at `http://localhost:8080`
   
   Note: The server will run in mock mode if MongoDB connection fails, allowing you to continue development.

2. **Start the frontend development server** (in a new terminal)

   ```bash
   cd frontend
   npm run dev
   ```

   The application will be available at `http://localhost:5173`

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

3. **Start the backend in production mode**

   ```bash
   cd backend
   npm start
   ```

---

## 🔐 Security Features

- **JWT Authentication**: Secure token-based authentication system
- **HTTP-only Cookies**: Tokens stored in HTTP-only cookies to prevent XSS attacks
- **Password Hashing**: Passwords encrypted using bcryptjs before storage
- **CORS Protection**: Configured CORS middleware for secure cross-origin requests
- **OTP Verification**: Time-limited OTP codes for email verification and password reset
- **Protected Routes**: Frontend routes protected with authentication middleware
- **Environment Variables**: Sensitive data stored in environment variables
- **Mock Mode**: Backend runs in fallback mode if database is unavailable (dev only)

---

## 🌐 API Endpoints

### Authentication Routes (`/api/auth`)

- `POST /register` - Register a new user
- `POST /login` - Login existing user
- `POST /logout` - Logout user
- `POST /send-verify-otp` - Send OTP for email verification (requires auth)
- `POST /verify-account` - Verify email with OTP (requires auth)
- `GET /is-auth` - Check authentication status (requires auth)
- `POST /send-reset-otp` - Send OTP for password reset
- `POST /reset-password` - Reset password with OTP
- `GET /test-email` - Test email configuration

### User Routes (`/api/users`)

- `GET /get-user` - Get current user data (requires auth)

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
│   │   │   ├── Footer.jsx
│   │   │   └── ProtectedRoute.jsx
│   │   ├── pages/            # Page components
│   │   │   ├── Login.jsx
│   │   │   ├── EmailVerify.jsx
│   │   │   └── ResetPassword.jsx
│   │   ├── context/          # React Context
│   │   │   └── AppContext.jsx
│   │   ├── App.jsx           # Main App component
│   │   ├── main.jsx          # Entry point
│   │   └── index.css         # Global styles
│   ├── index.html            # HTML template
│   ├── package.json          # Dependencies and scripts
│   ├── vite.config.js        # Vite configuration
│   ├── eslint.config.js      # ESLint configuration
│   └── .gitignore
├── backend/                   # Node.js/Express backend
│   ├── config/               # Configuration files
│   │   ├── mongodb.js        # MongoDB connection
│   │   ├── nodemailer.js     # Email configuration
│   │   └── emailTemplate.js  # Email templates
│   ├── controllers/          # Route controllers
│   │   ├── authController.js # Authentication logic
│   │   └── userController.js # User management
│   ├── models/               # Mongoose models
│   │   └── userModels.js     # User schema
│   ├── routes/               # API routes
│   │   ├── authRoutes.js     # Auth endpoints
│   │   └── userRoutes.js     # User endpoints
│   ├── middleware/           # Custom middleware
│   │   └── userAuth.js       # JWT authentication
│   ├── server.js             # Server entry point
│   ├── package.json          # Backend dependencies
│   └── .gitignore
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

### Backend Scripts

```bash
# Start server in production mode
npm start

# Start server in development mode with auto-reload
npm run dev
```

---

## 🧩 Key Components

### Authentication Pages

#### Login/Register
- Dual-mode form for login and registration
- Password visibility toggle
- Form validation
- JWT token-based authentication
- Redirects to email verification after registration

#### Email Verification
- OTP input for account verification
- Email resend functionality
- Secure verification flow

#### Password Reset
- Two-step password reset process
- OTP sent via email
- Secure password update

### Frontend Components

#### Header
- Responsive navigation bar
- Smooth scroll links to sections
- Mobile-friendly hamburger menu
- User authentication status display

#### Hero
- Eye-catching banner with CTA buttons
- Responsive design
- Engaging call-to-action

#### Services
- Grid layout of medical services
- Icon-based visual representation
- Hover effects for interactivity

#### About
- Hospital information and history
- Mission and values
- Professional imagery

#### Doctors
- Showcase of medical staff
- Doctor profiles with specializations
- Responsive card layout

#### Appointment
- User-friendly booking form
- Form validation
- Success/error notifications

#### Locations
- Interactive maps using Leaflet
- Multiple hospital locations
- Address and contact details

#### Footer
- Contact information
- Social media links
- Quick navigation links
- Copyright information

### Backend Components

#### Authentication Controller
- User registration with password hashing
- Login with JWT token generation
- Email verification with OTP
- Password reset functionality
- Account security management

#### User Controller
- Get user profile data
- Update user information
- Authentication state management

#### Middleware
- JWT token verification
- Protected route authentication
- Cookie-based session management

#### Models
- User schema with Mongoose
- Account verification fields
- Password reset tracking

---

## 🔧 Troubleshooting

### Common Issues

#### MongoDB Connection Failed
If you see "DB connection not established — running in mock/fallback mode":
- Check your `MONGODB_URI` in the backend `.env` file
- Ensure MongoDB is running (local or cloud)
- Verify network connectivity to MongoDB Atlas (if using cloud)
- The server will still run in mock mode for development purposes

#### Email Not Sending
If OTP emails are not being sent:
- Verify `SENDER_EMAIL` and `EMAIL_PASSWORD` in backend `.env`
- For Gmail: Enable 2-factor authentication and generate an App Password
- Test email configuration: `GET http://localhost:8080/api/auth/test-email`
- Check spam/junk folder

#### CORS Errors
If you see CORS-related errors:
- Ensure backend is running on port 8080
- Verify frontend `VITE_BACKEND_URL` matches backend URL
- Check CORS origin configuration in `backend/server.js`

#### Port Already in Use
If port 8080 or 5173 is already in use:
- Change `PORT` in backend `.env` file
- Update `VITE_BACKEND_URL` in frontend `.env` accordingly
- Or kill the process using the port

#### Authentication Issues
If login/logout is not working:
- Clear browser cookies
- Check `JWT_SECRET` is set in backend `.env`
- Verify backend server is running
- Check browser console for errors

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

### Email Templates

Customize email templates in `backend/config/emailTemplate.js`:
- Welcome/verification emails
- Password reset emails
- Email styling and branding

### Adding New Pages

1. Create a new component in `frontend/src/pages/`
2. Import and add route to `App.jsx`
3. Update navigation in `Header.jsx`
4. Add authentication protection if needed with `ProtectedRoute`

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

- [x] Backend API implementation
- [x] User authentication system
- [ ] Online payment integration
- [ ] Patient portal with medical history
- [ ] Doctor dashboard for appointment management
- [ ] Medical records management
- [ ] Telemedicine integration
- [ ] Multi-language support
- [ ] Dark mode toggle
- [ ] Email notifications for appointments
- [ ] SMS reminders for appointments
- [ ] Admin panel for hospital management
- [ ] Prescription management system

---

<div align="center">

**Made with ❤️ for better healthcare access**

⭐ Star this repo if you find it helpful!

</div>
