import express from 'express'
import nodemailer from 'nodemailer'
import cors from 'cors'
import { config } from 'dotenv'

config();

const app = express();
const PORT = process.env.PORT || 5000;

// Trust the proxy (needed for accurate rate limiting on platforms like Vercel/Render)
app.set('trust proxy', 1);

// Security Middleware
app.use((req, res, next) => {
  res.setHeader('X-Content-Type-Options', 'nosniff');
  res.setHeader('X-Frame-Options', 'DENY');
  res.setHeader('X-XSS-Protection', '1; mode=block');
  res.setHeader('Strict-Transport-Security', 'max-age=31536000; includeSubDomains');
  // Removed Content-Security-Policy to prevent interference with cross-origin API calls
  next();
});

// Basic Rate Limiting (Simple In-Memory)
const requestCounts = new Map();
const RATE_LIMIT_WINDOW = 15 * 60 * 1000; // 15 minutes
const MAX_REQUESTS = 5; // Max 5 inquiries per window per IP

const rateLimiter = (req, res, next) => {
  const ip = req.ip || req.connection.remoteAddress;
  const now = Date.now();
  
  if (!requestCounts.has(ip)) {
    requestCounts.set(ip, { count: 1, resetTime: now + RATE_LIMIT_WINDOW });
    return next();
  }

  const rateData = requestCounts.get(ip);
  if (now > rateData.resetTime) {
    requestCounts.set(ip, { count: 1, resetTime: now + RATE_LIMIT_WINDOW });
    return next();
  }

  if (rateData.count >= MAX_REQUESTS) {
    return res.status(429).json({ 
      success: false, 
      message: "Too many requests. Please try again after 15 minutes." 
    });
  }

  rateData.count++;
  next();
};

// CORS configuration
const allowedOrigins = [
  process.env.FRONTEND_URL?.trim().replace(/\/$/, ""), 
  "https://infinity-consultancy-blm.vercel.app",
  "https://infinity-consultancy-fawn.vercel.app",
  "https://infinity-consultancy.vercel.app",
  "http://localhost:5173",
  "http://localhost:3000"
].filter(Boolean);

console.log("✅ Allowed Origins initialized:", allowedOrigins);

app.use(cors({
  origin: function (origin, callback) {
    if (!origin) return callback(null, true);
    
    const normalizedOrigin = origin.trim().replace(/\/$/, "");
    if (allowedOrigins.includes(normalizedOrigin)) {
      callback(null, true);
    } else {
      console.error(`🚫 CORS REJECTED: ${origin}`);
      console.log(`💡 Expected one of: ${allowedOrigins.join(", ")}`);
      callback(null, false); // Don't throw error, just deny access
    }
  },
  methods: ['GET', 'POST'],
  credentials: true
}));

app.use(express.json());

// Validation Helper Functions
const validateName = (name) => /^[a-zA-Z\s]+$/.test(name);
const validateEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
const validatePhone = (phone) => /^\d{10}$/.test(phone);

// Health Check
app.get("/health", (req, res) => {
  res.status(200).json({ status: "healthy", timestamp: new Date() });
});

// POST Route for Contact Form
app.post("/send-email", rateLimiter, (req, res) => {
  console.log(`📩 Inquiry attempt received from: ${req.body.email}`);
  const { firstName, lastName, email, phone, userMessage } = req.body;

  // Basic presence check
  if (!firstName || !lastName || !email || !phone || !userMessage) {
    return res.status(400).json({ success: false, message: "All fields are required." });
  }

  // Validations
  if (!validateName(firstName) || !validateName(lastName)) {
    return res.status(400).json({ success: false, message: "Invalid name format. Use letters only." });
  }

  if (!validateEmail(email)) {
    return res.status(400).json({ success: false, message: "Please provide a valid email address." });
  }

  if (!validatePhone(phone)) {
    return res.status(400).json({ success: false, message: "Phone number must be exactly 10 digits." });
  }

  if (userMessage.trim().length < 10) {
    return res.status(400).json({ success: false, message: "Message is too short (minimum 10 characters)." });
  }

  // Check for environment variables
  if (!process.env.EMAIL_USER || !process.env.EMAIL_PASS) {
    console.error("Missing email configuration in environment variables.");
    return res.status(500).json({ success: false, message: "Server configuration error." });
  }

  // Nodemailer Transporter
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS?.replace(/\s/g, ""),
    },
  });

  // Mail Options
  const mailOptions = {
    from: `"Infinity Web Portal" <${process.env.EMAIL_USER}>`,
    replyTo: email,
    to: [process.env.EMAIL_RECIPIENT_1, process.env.EMAIL_RECIPIENT_2].filter(Boolean),
    subject: `New Inquiry from ${firstName} ${lastName}`,
    text: `Name: ${firstName} ${lastName}\nEmail: ${email}\nPhone: ${phone}\nMessage: ${userMessage}`,
    html: `
      <div style="font-family: Arial, sans-serif; padding: 20px; color: #333;">
        <h2 style="color: #2b84ea;">New Business Inquiry</h2>
        <p><strong>Name:</strong> ${firstName} ${lastName}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Phone:</strong> ${phone}</p>
        <div style="margin-top: 20px; padding: 15px; background: #f4f4f4; border-radius: 8px;">
          <strong>Message:</strong><br/>
          ${userMessage.replace(/\n/g, '<br/>')}
        </div>
      </div>
    `,
  };

  // Send Email with async/await
  transporter.sendMail(mailOptions)
    .then(info => {
      console.log(`✅ Email sent successfully: ${info.response}`);
      res.status(200).json({ success: true, message: "Thank you! Your message has been sent successfully." });
    })
    .catch(error => {
      console.error("❌ Nodemailer Error:", error);
      res.status(500).json({ success: false, message: "Failed to send email. Please check server logs." });
    });
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ success: false, message: "Internal Server Error" });
});

// Start Server
app.listen(PORT, () => {
  console.log(`
  🚀 Server is running!
  📡 Port: ${PORT}
  🔗 URL: http://localhost:${PORT}
  `);
});
