import dotenv from "dotenv";
dotenv.config();
// Removed debug console.log for SMTP credentials for production
// Custom object with all environment variables
export const processEnv = { ...process.env };
import express from "express";
import cors from "cors";
import session from "express-session";
import connectMongoDBSession from 'connect-mongodb-session'
import cookieParser from "cookie-parser";
import connectDB, { isConnected as isDbConnected } from "./config/mongodb.js";
import authRouter from "./routes/authRoutes.js";
import userRouter from "./routes/userRoutes.js";
import appointmentRouter from "./routes/appointmentRoutes.js";

// NEW: patients & staff
import patientRouter from "./routes/patientRoutes.js";
import staffRouter from "./routes/staffRoutes.js";

const app = express();
const PORT = process.env.PORT || 8080;

// Middleware

app.use(cors({
  origin: process.env.FRONTEND_URL || "http://localhost:5173",
  credentials: true,
}));


app.use(express.json());
app.use(cookieParser());

// Session store (must be registered before routes)
// Use connect-mongodb-session which expects `uri` for the connection string
const MongoDBStore = connectMongoDBSession(session);
const store = new MongoDBStore({
  uri: process.env.MONGODB_URI,
  collection: 'sessions'
});

store.on('error', function(error) {
  console.log(error.message);
  console.error('Session store error:', error);
});

app.use(
  session({
    name: "sid",
    secret: process.env.JWT_SECRET,
    resave: false,
    saveUninitialized: false,
    store: store,
    cookie: {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: process.env.NODE_ENV === "production" ? "none" : "strict",
      maxAge: 1000 * 60 * 60 * 24 * 7,
    }
  })
);

// Routes
app.use("/api/auth", authRouter);
app.use("/api/users", userRouter);
app.use("/api/appointments", appointmentRouter);

// NEW: patients & staff
app.use("/api/patients", patientRouter);
app.use("/api/staff", staffRouter);

// Backwards-compatible redirect routes for Google OAuth
// Some Google Console configurations use /auth/google or /auth/google/callback
// while our router mounts at /api/auth. Redirect legacy paths to the API routes
app.get('/auth/google', (req, res) => {
  const qs = new URLSearchParams(req.query).toString();
  return res.redirect(`/api/auth/google${qs ? '?' + qs : ''}`);
});
app.get('/auth/google/callback', (req, res) => {
  const qs = new URLSearchParams(req.query).toString();
  return res.redirect(`/api/auth/google/callback${qs ? '?' + qs : ''}`);
});

// Try to connect to DB, but start server regardless so dev flows can continue.
(async () => {
  const ok = await connectDB();
  if (ok) {
    console.log("DB connection established");
  } else {
    console.warn("DB connection not established — running in mock/fallback mode");
  }

  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
    // console.log(`FRONTEND_URL=${process.env.FRONTEND_URL || 'http://localhost:5173'}`);
    // console.log(`GOOGLE_REDIRECT_URI=${process.env.GOOGLE_REDIRECT_URI || '<not set>'}`);
  });
})();
