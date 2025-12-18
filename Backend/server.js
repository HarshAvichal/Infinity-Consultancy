import express from 'express'
import { Resend } from 'resend'
import cors from 'cors'
import { config } from 'dotenv'

config();

const app = express();
const PORT = process.env.PORT || 5000;
const resend = new Resend(process.env.RESEND_API_KEY);

// Trust the proxy (needed for accurate rate limiting on platforms like Vercel/Render)
app.set('trust proxy', 1);

// Security Middleware
app.use((req, res, next) => {
  res.setHeader('X-Content-Type-Options', 'nosniff');
  res.setHeader('X-Frame-Options', 'DENY');
  res.setHeader('X-XSS-Protection', '1; mode=block');
  res.setHeader('Strict-Transport-Security', 'max-age=31536000; includeSubDomains');
  next();
});

// Basic Rate Limiting
const requestCounts = new Map();
const RATE_LIMIT_WINDOW = 15 * 60 * 1000; 
const MAX_REQUESTS = 5; 

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
      callback(null, false);
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
app.post("/send-email", rateLimiter, async (req, res) => {
  console.log(`📩 Inquiry attempt received from: ${req.body.email}`);
  const { firstName, lastName, email, phone, userMessage } = req.body;

  if (!firstName || !lastName || !email || !phone || !userMessage) {
    return res.status(400).json({ success: false, message: "All fields are required." });
  }

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

  if (!process.env.RESEND_API_KEY) {
    console.error("❌ Missing RESEND_API_KEY in environment variables.");
    return res.status(500).json({ success: false, message: "Server configuration error." });
  }

  try {
    const recipients = [process.env.EMAIL_RECIPIENT_1, process.env.EMAIL_RECIPIENT_2].filter(Boolean);
    
    const { data, error } = await resend.emails.send({
      from: 'Infinity Web Portal <onboarding@resend.dev>', // Resend free tier requirement
      to: recipients,
      reply_to: email,
      subject: `New Inquiry from ${firstName} ${lastName}`,
      html: `
        <div style="font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; background-color: #f8fafc; padding: 40px 20px; color: #1e293b; line-height: 1.6;">
          <div style="max-width: 600px; margin: 0 auto; background: white; border-radius: 20px; overflow: hidden; box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1);">
            <div style="background: #0a0c2e; padding: 30px; text-align: center;">
              <h1 style="color: #ffffff; margin: 0; font-size: 24px; letter-spacing: 2px;">INFINITY CONSULTANCY</h1>
              <p style="color: #3b82f6; margin: 5px 0 0 0; font-size: 12px; font-weight: bold; text-transform: uppercase;">Inquiry Management Portal</p>
            </div>
            <div style="padding: 40px 30px;">
              <h2 style="color: #0a0c2e; margin-top: 0; font-size: 20px; border-bottom: 2px solid #f1f5f9; padding-bottom: 15px;">New Business Inquiry Received</h2>
              <div style="margin-top: 25px;">
                <table style="width: 100%; border-collapse: collapse;">
                  <tr>
                    <td style="padding: 10px 0; color: #64748b; font-weight: bold; width: 30%;">Client Name:</td>
                    <td style="padding: 10px 0; color: #1e293b; font-weight: 900;">${firstName} ${lastName}</td>
                  </tr>
                  <tr>
                    <td style="padding: 10px 0; color: #64748b; font-weight: bold;">Email:</td>
                    <td style="padding: 10px 0; color: #3b82f6; font-weight: bold;">${email}</td>
                  </tr>
                  <tr>
                    <td style="padding: 10px 0; color: #64748b; font-weight: bold;">Phone:</td>
                    <td style="padding: 10px 0; color: #1e293b;">${phone}</td>
                  </tr>
                </table>
              </div>
              <div style="margin-top: 30px; background: #f8fafc; border-radius: 12px; padding: 25px; border-left: 4px solid #3b82f6;">
                <p style="margin: 0 0 10px 0; color: #64748b; font-size: 12px; font-weight: bold; text-transform: uppercase;">Client Message:</p>
                <p style="margin: 0; color: #334155; font-style: italic; white-space: pre-line;">"${userMessage}"</p>
              </div>
              <div style="margin-top: 40px; text-align: center;">
                <a href="mailto:${email}" style="background: #3b82f6; color: white; padding: 15px 30px; text-decoration: none; border-radius: 10px; font-weight: bold; display: inline-block;">Reply to Client</a>
              </div>
            </div>
            <div style="background: #f1f5f9; padding: 20px; text-align: center; font-size: 11px; color: #94a3b8;">
              <p style="margin: 0;">This is an automated notification from the <strong>Infinity Web Portal</strong>.</p>
              <p style="margin: 5px 0 0 0;">© 2026 Infinity Consultancy. Confidential Business Inquiry.</p>
            </div>
          </div>
        </div>
      `
    });

    if (error) {
      console.error("❌ Resend API Error:", error);
      return res.status(500).json({ success: false, message: "Failed to send email via API." });
    }

    console.log(`✅ Email dispatched via Resend: ${data.id}`);
    res.status(200).json({ success: true, message: "Thank you! Your message has been sent successfully." });

  } catch (err) {
    console.error("❌ Server Error:", err);
    res.status(500).json({ success: false, message: "Internal server error." });
  }
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ success: false, message: "Internal Server Error" });
});

// Start Server
app.listen(PORT, () => {
  console.log(`
  🚀 Infinity API is Live!
  📡 Port: ${PORT}
  🔗 Status: Ready to receive inquiries
  `);
});
