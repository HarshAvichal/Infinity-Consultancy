import express from 'express'
import nodemailer from 'nodemailer'
import cors from 'cors'
import { config } from 'dotenv'

config();

const app = express();
const PORT = process.env.PORT || 5000;

let transporter;
if (process.env.EMAIL_HOST && process.env.EMAIL_USER && process.env.EMAIL_PASS) {
  const emailPort = parseInt(process.env.EMAIL_PORT || '587');
  const isSecure = emailPort === 465;
  
  transporter = nodemailer.createTransport({
    host: process.env.EMAIL_HOST,
    port: emailPort,
    secure: isSecure,
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
    connectionTimeout: 60000,
    socketTimeout: 60000,
    greetingTimeout: 30000,
    requireTLS: !isSecure,
    tls: {
      rejectUnauthorized: false
    }
  });
}

app.set('trust proxy', 1);

app.use((req, res, next) => {
  res.setHeader('X-Content-Type-Options', 'nosniff');
  res.setHeader('X-Frame-Options', 'DENY');
  res.setHeader('X-XSS-Protection', '1; mode=block');
  res.setHeader('Strict-Transport-Security', 'max-age=31536000; includeSubDomains');
  next();
});

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

const allowedOrigins = [
  process.env.FRONTEND_URL?.trim().replace(/\/$/, ""), 
  "https://infinity-consultancy-blm.vercel.app",
  "https://infinity-consultancy-blm.vercel.app/",
  "http://localhost:5173",
  "http://localhost:3000"
].filter(Boolean);

app.use(cors({
  origin: function (origin, callback) {
    if (!origin) {
      return callback(null, true);
    }
    
    const normalizedOrigin = origin.trim().replace(/\/$/, "");
    const isAllowed = allowedOrigins.some(allowed => {
      const normalizedAllowed = allowed.trim().replace(/\/$/, "");
      return normalizedOrigin === normalizedAllowed;
    });
    
    if (isAllowed) {
      callback(null, true);
    } else {
      callback(null, true);
    }
  },
  methods: ['GET', 'POST', 'OPTIONS'],
  credentials: true,
  allowedHeaders: ['Content-Type', 'Authorization'],
  exposedHeaders: ['Content-Type']
}));

app.use(express.json());

const validateName = (name) => /^[a-zA-Z\s]+$/.test(name);
const validateEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
const validatePhone = (phone) => /^\d{10}$/.test(phone);

app.get("/health", (req, res) => {
  res.status(200).json({ status: "healthy", timestamp: new Date() });
});

app.options("/send-email", (req, res) => {
  res.header("Access-Control-Allow-Origin", req.headers.origin || "*");
  res.header("Access-Control-Allow-Methods", "POST, OPTIONS");
  res.header("Access-Control-Allow-Headers", "Content-Type, Authorization");
  res.header("Access-Control-Allow-Credentials", "true");
  res.status(200).end();
});

app.post("/send-email", rateLimiter, async (req, res) => {
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

  if (!transporter) {
    return res.status(500).json({ 
      success: false, 
      message: "Server configuration error: Email service not configured." 
    });
  }

  const recipients = [process.env.EMAIL_RECIPIENT_1, process.env.EMAIL_RECIPIENT_2].filter(Boolean);
  if (recipients.length === 0) {
    return res.status(500).json({ 
      success: false, 
      message: "Server configuration error: No recipients configured." 
    });
  }

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

  const safeFirstName = escapeHtml(firstName.trim());
  const safeLastName = escapeHtml(lastName.trim());
  const safeEmail = escapeHtml(email.trim());
  const safePhone = escapeHtml(phone.trim());
  const safeMessage = escapeHtml(userMessage.trim());

  try {
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

    try {
      const sendEmailPromise = transporter.sendMail(mailOptions);
      const timeoutPromise = new Promise((_, reject) => 
        setTimeout(() => reject(new Error("Email sending timeout after 60 seconds")), 60000)
      );
      
      const info = await Promise.race([sendEmailPromise, timeoutPromise]);
      
      if (!res.headersSent) {
        res.status(200).json({ 
          success: true, 
          message: "Thank you! Your message has been sent successfully." 
        });
      }
    } catch (emailError) {
      throw emailError;
    }

  } catch (err) {
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
    
    if (!res.headersSent) {
      res.status(500).json({ 
        success: false, 
        message: errorMessage
      });
    }
  }
});

app.use((err, req, res, next) => {
  res.status(500).json({ success: false, message: "Internal Server Error" });
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
