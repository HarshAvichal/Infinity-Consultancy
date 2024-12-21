import express from 'express'
import nodemailer from 'nodemailer'
import cors from 'cors'


import {config} from 'dotenv'
config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Validation Helper Functions
const validateName = (name) => /^[a-zA-Z]+$/.test(name); // Only letters
const validateEmail = (email) => /^[^\s@]+@gmail\.com$/.test(email); // Must end with gmail.com
const validatePhone = (phone) => /^\d{10}$/.test(phone); // Exactly 10 digits, no letters or special characters

// POST Route for Contact Form
app.post("/send-email", (req, res) => {
  const { firstName, lastName, email, phone, userMessage } = req.body;

  if(!firstName || !lastName || !email || !phone){
    return res.status(400).json({success:false, message:"Please enter your details"});
  } 

  // Validations
  if (!validateName(firstName)) {
    return res.status(400).json({ success: false, message: "Invalid First Name. Only letters are allowed." });
  }

  if (!validateName(lastName)) {
    return res.status(400).json({ success: false, message: "Invalid Last Name. Only letters are allowed." });
  }

  if (!validateEmail(email)) {
    return res.status(400).json({ success: false, message: "Invalid Email. Only Gmail addresses are allowed." });
  }

  if (!validatePhone(phone)) {
    return res.status(400).json({ success: false, message: "Invalid Phone Number. Only 10-digit numbers are allowed." });
  }

  if (!userMessage || userMessage.trim() === "") {
    return res.status(400).json({ success: false, message: "Message field cannot be empty." });
  }

  // Nodemailer Transporter
  const transporter = nodemailer.createTransport({
    host: process.env.EMAIL_HOST,
    port: process.env.EMAIL_PORT,
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  // Mail Options
  const mailOptions = {
    from: `${email}`,
    to: [process.env.EMAIL_RECIPIENT_1, process.env.EMAIL_RECIPIENT_2],
    subject: `New Inquiry from ${firstName} ${lastName}`,
    html:`
      <p><b>Name:</b> ${firstName} ${lastName} </p>
      <p><b>Email:</b> ${email}  </p>
      <p><b>Phone:</b> ${phone}</p>
      <p><b>Message:</b> ${userMessage}</p>
    `,
  };

  // Send Email
  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.error("Error sending email:", error);
      return res.status(500).json({ success: false, message: "Failed to send the email. Please try again later." });
    }
    console.log("Email sent:", info.response);
    res.status(200).json({ success: true, message: "Your message has been sent successfully!" });
  });
});

// Start Server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
