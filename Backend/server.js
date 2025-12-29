import express from 'express'
import nodemailer from 'nodemailer'
import cors from 'cors'
import { config } from 'dotenv'

config();

const app = express();
const PORT = process.env.PORT || 5000;

// Initialize Nodemailer transporter
let transporter;
if (process.env.EMAIL_HOST && process.env.EMAIL_USER && process.env.EMAIL_PASS) {
  transporter = nodemailer.createTransport({
    host: process.env.EMAIL_HOST,
    port: parseInt(process.env.EMAIL_PORT || '587'),
    secure: false, // true for 465, false for other ports
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
    connectionTimeout: 10000, // 10 seconds to establish connection
    socketTimeout: 30000, // 30 seconds for socket operations
    greetingTimeout: 10000, // 10 seconds for greeting
  });
  console.log("✅ Nodemailer initialized with Gmail SMTP");
} else {
  console.error("❌ Email configuration missing (EMAIL_HOST, EMAIL_USER, EMAIL_PASS)");
}

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
  "http://localhost:5173",
  "http://localhost:3000"
].filter(Boolean);

console.log("✅ Allowed Origins initialized:", allowedOrigins);

app.use(cors({
  origin: function (origin, callback) {
    // Allow requests with no origin (like mobile apps or curl requests)
    if (!origin) {
      console.log("✅ CORS: Allowing request with no origin");
      return callback(null, true);
    }
    
    const normalizedOrigin = origin.trim().replace(/\/$/, "");
    console.log(`🔍 CORS check: ${normalizedOrigin}`);
    console.log(`📋 Allowed origins:`, allowedOrigins);
    
    if (allowedOrigins.includes(normalizedOrigin)) {
      console.log(`✅ CORS: Allowing ${normalizedOrigin}`);
      callback(null, true);
    } else {
      console.error(`🚫 CORS REJECTED: ${origin} (not in allowed list)`);
      // Still allow for now to debug, but log the issue
      callback(null, true); // Temporarily allow to debug
    }
  },
  methods: ['GET', 'POST', 'OPTIONS'],
  credentials: true,
  allowedHeaders: ['Content-Type', 'Authorization']
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
  console.log(`📩 Inquiry attempt received`);
  console.log(`📍 Origin: ${req.headers.origin || 'No origin header'}`);
  console.log(`📦 Request body:`, JSON.stringify(req.body, null, 2));
  console.log(`📧 Email from: ${req.body?.email || 'No email in body'}`);
  
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

  // Validate email configuration
  if (!transporter) {
    console.error("❌ Email transporter not initialized. Check EMAIL_HOST, EMAIL_USER, EMAIL_PASS.");
    return res.status(500).json({ success: false, message: "Server configuration error." });
  }

  // Validate recipients
  const recipients = [process.env.EMAIL_RECIPIENT_1, process.env.EMAIL_RECIPIENT_2].filter(Boolean);
  if (recipients.length === 0) {
    console.error("❌ No valid email recipients configured.");
    return res.status(500).json({ success: false, message: "Server configuration error: No recipients configured." });
  }

  // HTML escape function to prevent XSS
  const escapeHtml = (text) => {
    const map = {
      '&': '&amp;',
      '<': '&lt;',
      '>': '&gt;',
      '"': '&quot;',
      "'": '&#039;'
    };
    return text.replace(/[&<>"']/g, m => map[m]);
  };

  // Escape user inputs
  const safeFirstName = escapeHtml(firstName.trim());
  const safeLastName = escapeHtml(lastName.trim());
  const safeEmail = escapeHtml(email.trim());
  const safePhone = escapeHtml(phone.trim());
  const safeMessage = escapeHtml(userMessage.trim());

  try {
    console.log(`📧 Attempting to send email to: ${recipients.join(', ')}`);
    console.log(`📧 From: ${process.env.EMAIL_USER}`);
    console.log(`📧 Reply-To: ${email}`);
    
    // Verify transporter is ready
    if (!transporter) {
      throw new Error("Email transporter not initialized");
    }
    
    const mailOptions = {
      from: `"Infinity Consultancy" <${process.env.EMAIL_USER}>`,
      to: recipients.join(', '),
      replyTo: email,
      subject: `New Inquiry from ${safeFirstName} ${safeLastName}`,
      html: `
        <!DOCTYPE html>
        <html>
        <head>
          <meta charset="UTF-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
        </head>
        <body style="font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; background-color: #f8fafc; padding: 40px 20px; color: #1e293b; line-height: 1.6; margin: 0;">
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
                    <td style="padding: 10px 0; color: #1e293b; font-weight: 900;">${safeFirstName} ${safeLastName}</td>
                  </tr>
                  <tr>
                    <td style="padding: 10px 0; color: #64748b; font-weight: bold;">Email:</td>
                    <td style="padding: 10px 0; color: #3b82f6; font-weight: bold;">
                      <a href="mailto:${safeEmail}" style="color: #3b82f6; text-decoration: none;">${safeEmail}</a>
                    </td>
                  </tr>
                  <tr>
                    <td style="padding: 10px 0; color: #64748b; font-weight: bold;">Phone:</td>
                    <td style="padding: 10px 0; color: #1e293b;">
                      <a href="tel:${safePhone}" style="color: #1e293b; text-decoration: none;">${safePhone}</a>
                    </td>
                  </tr>
                </table>
              </div>
              <div style="margin-top: 30px; background: #f8fafc; border-radius: 12px; padding: 25px; border-left: 4px solid #3b82f6;">
                <p style="margin: 0 0 10px 0; color: #64748b; font-size: 12px; font-weight: bold; text-transform: uppercase;">Client Message:</p>
                <p style="margin: 0; color: #334155; font-style: italic; white-space: pre-line; word-wrap: break-word;">"${safeMessage}"</p>
              </div>
              <div style="margin-top: 40px; text-align: center;">
                <a href="mailto:${safeEmail}?subject=Re: Inquiry from ${safeFirstName} ${safeLastName}" style="background: #3b82f6; color: white; padding: 15px 30px; text-decoration: none; border-radius: 10px; font-weight: bold; display: inline-block;">Reply to Client</a>
              </div>
            </div>
            <div style="background: #f1f5f9; padding: 20px; text-align: center; font-size: 11px; color: #94a3b8;">
              <p style="margin: 0;">This is an automated notification from the <strong>Infinity Web Portal</strong>.</p>
              <p style="margin: 5px 0 0 0;">© 2026 Infinity Consultancy. Confidential Business Inquiry.</p>
            </div>
          </div>
        </body>
        </html>
      `
    };

    // Send email with timeout wrapper
    const sendEmailPromise = transporter.sendMail(mailOptions);
    const timeoutPromise = new Promise((_, reject) => 
      setTimeout(() => reject(new Error("Email sending timeout after 25 seconds")), 25000)
    );
    
    const info = await Promise.race([sendEmailPromise, timeoutPromise]);
    
    console.log(`✅ Email sent successfully via Nodemailer`);
    console.log(`📬 Message ID: ${info.messageId}`);
    console.log(`📬 Recipients: ${recipients.join(', ')}`);
    console.log(`📬 Response: ${info.response}`);
    
    res.status(200).json({ 
      success: true, 
      message: "Thank you! Your message has been sent successfully." 
    });

  } catch (err) {
    console.error("❌ Email sending error:");
    console.error("Error:", err);
    console.error("Error Message:", err.message);
    console.error("Error Code:", err.code);
    console.error("Error Stack:", err.stack);
    
    // More specific error messages
    let errorMessage = "Failed to send email. Please try again later.";
    if (err.code === 'EAUTH') {
      errorMessage = "Email authentication failed. Please check email credentials.";
    } else if (err.code === 'ECONNECTION') {
      errorMessage = "Could not connect to email server. Please try again later.";
    } else if (err.code === 'ETIMEDOUT') {
      errorMessage = "Email server connection timed out. Please try again.";
    } else if (err.message) {
      errorMessage = err.message;
    }
    
    // Make sure we always send a response
    if (!res.headersSent) {
      res.status(500).json({ 
        success: false, 
        message: errorMessage
      });
    }
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
  
  // Configuration check
  console.log(`
  📋 Configuration Check:
  ${process.env.EMAIL_HOST ? `✅ EMAIL_HOST: ${process.env.EMAIL_HOST}` : '❌ EMAIL_HOST: Missing'}
  ${process.env.EMAIL_USER ? `✅ EMAIL_USER: ${process.env.EMAIL_USER}` : '❌ EMAIL_USER: Missing'}
  ${process.env.EMAIL_PASS ? '✅ EMAIL_PASS: Configured' : '❌ EMAIL_PASS: Missing'}
  ${process.env.EMAIL_RECIPIENT_1 ? `✅ EMAIL_RECIPIENT_1: ${process.env.EMAIL_RECIPIENT_1}` : '❌ EMAIL_RECIPIENT_1: Missing'}
  ${process.env.EMAIL_RECIPIENT_2 ? `✅ EMAIL_RECIPIENT_2: ${process.env.EMAIL_RECIPIENT_2}` : '⚠️  EMAIL_RECIPIENT_2: Not set (optional)'}
  `);
});
