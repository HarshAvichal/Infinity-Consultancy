import express from 'express'
import cors from 'cors'
import { config } from 'dotenv'

config();

const app = express();
const PORT = process.env.PORT || 5000;

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

app.get("/health", (req, res) => {
  res.status(200).json({ status: "healthy", timestamp: new Date() });
});

app.use((err, req, res, next) => {
  res.status(500).json({ success: false, message: "Internal Server Error" });
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
