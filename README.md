# ♾️ Infinity Consultancy

Infinity Consultancy is a modern, high-end web platform designed for a professional tax and financial advisory firm. It features a sleek, mobile-responsive UI with advanced animations and a secure backend for handling business inquiries.

---

## 🚀 Features

### **Frontend**
*   **Modern Glassmorphism UI**: High-end navigation with backdrop-blur and scroll transitions.
*   **Dynamic Hero Section**: Featuring a typewriter effect and interactive Lottie animations.
*   **Industry-Standard Carousel**: A custom-built, "Creative Effect" biography section for leadership.
*   **Mobile-First Optimization**: Compact grids, prioritized form layouts, and thumb-friendly navigation.
*   **Interactive Services**: Modern cards with hover scaling and smooth shadow depth.
*   **Custom Notifications**: Polished dark-themed toast notifications for form feedback.

### **Backend**
*   **Secure API**: Built with Node.js and Express with essential security headers (HSTS, CSP, XSS-Protection).
*   **Spam Protection**: Custom rate-limiting implementation (5 inquiries per 15 mins per IP).
*   **Professional Emailing**: Automated inquiry handling via Nodemailer with high-quality HTML templates.
*   **Robust Validation**: Multi-layer data validation for names, emails, and Indian mobile numbers.

---

## 🛠️ Tech Stack

**Frontend:**
*   React (Vite)
*   Tailwind CSS
*   Framer Motion & Swiper.js (Animations)
*   React-Lottie (Interactive Graphics)
*   Axios (API Communication)

**Backend:**
*   Node.js & Express
*   Nodemailer (Email Service)
*   Dotenv (Environment Management)
*   Cors & Security Middlewares

---

## 📦 Installation & Setup

### **1. Clone the repository**
```bash
git clone https://github.com/HarshAvichal/Infinity-Consultancy.git
cd Infinity-Consultancy
```

### **2. Setup Backend**
```bash
cd Backend
npm install
```
Create a `.env` file in the `/Backend` directory:
```env
PORT=5000
EMAIL_HOST=smtp.gmail.com
EMAIL_PORT=587
EMAIL_USER=your-email@gmail.com
EMAIL_PASS=your-app-password
EMAIL_RECIPIENT_1=recipient1@gmail.com
EMAIL_RECIPIENT_2=recipient2@gmail.com
```
Run the server:
```bash
npm start
```

### **3. Setup Frontend**
```bash
cd ../Frontend
npm install
```
Create a `.env` file in the `/Frontend` directory:
```env
VITE_BACKEND_URL=http://localhost:5000
```
Run the dev server:
```bash
npm run dev
```

---

## 📁 Project Structure

```text
Infinity-Consultancy/
├── Backend/
│   ├── server.js          # Express API & Email Logic
│   └── package.json
├── Frontend/
│   ├── src/
│   │   ├── components/    # Reusable UI Components
│   │   ├── assets/        # Lottie Animations & Images
│   │   ├── App.jsx        # Root Layout
│   │   └── main.jsx       # Entry Point
│   ├── tailwind.config.js
│   └── vite.config.js
└── README.md
```

---

## 👨‍💼 Leadership

**Nevil Gandhi**  
*Director & Financial Advisor*  
Infinity Consultancy provides strategic clarity and financial growth through personalized advisory and technical expertise.

---

## 📄 License

© 2026 **Infinity Consultancy**. All rights reserved. Built for professional financial excellence.
