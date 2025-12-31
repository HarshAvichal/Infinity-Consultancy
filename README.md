# 🚀 Infinity Consultancy

A modern, responsive website for Infinity Consultancy - a trusted financial services provider since 1989. Built with React and Express.js, featuring a beautiful UI, contact form integration, and comprehensive service showcase.

![Infinity Consultancy](https://img.shields.io/badge/Status-Live-success)
![React](https://img.shields.io/badge/React-18.3.1-blue)
![Express](https://img.shields.io/badge/Express-4.21.2-green)
![License](https://img.shields.io/badge/License-Private-red)

## ✨ Features

- 🎨 **Modern UI/UX** - Beautiful, responsive design with smooth animations
- 📱 **Fully Responsive** - Works seamlessly on desktop, tablet, and mobile devices
- 📧 **Contact Form** - Integrated EmailJS for reliable form submissions
- 🏢 **Service Showcase** - Comprehensive display of all services offered
- 📍 **Branch Locations** - Timeline view of company growth across multiple cities
- 🖼️ **Gallery Section** - Image gallery with modal view functionality
- ⚡ **Fast Performance** - Optimized with Vite and modern React practices
- 🎭 **Animations** - Lottie animations and smooth transitions throughout

## 🛠️ Tech Stack

### Frontend
- **React 18.3.1** - UI library
- **Vite** - Build tool and dev server
- **Tailwind CSS** - Utility-first CSS framework
- **React Router** - Navigation
- **Swiper** - Touch slider component
- **React Lottie** - Animation library
- **EmailJS** - Email service integration
- **React Toastify** - Toast notifications
- **Font Awesome** - Icon library

### Backend
- **Express.js** - Web framework
- **CORS** - Cross-origin resource sharing
- **dotenv** - Environment variable management

## 📁 Project Structure

```
Infinity-Consultancy/
├── Frontend/
│   ├── src/
│   │   ├── components/
│   │   │   ├── AboutSection.jsx
│   │   │   ├── BranchesSection.jsx
│   │   │   ├── EnquirySection.jsx
│   │   │   ├── GallerySection.jsx
│   │   │   ├── HeroSection.jsx
│   │   │   ├── MarqueeSection.jsx
│   │   │   ├── NavBar.jsx
│   │   │   └── ServicesSection.jsx
│   │   ├── assets/
│   │   │   └── lottieAnimations/
│   │   ├── images/
│   │   ├── App.jsx
│   │   └── main.jsx
│   ├── package.json
│   └── vite.config.js
├── Backend/
│   ├── server.js
│   └── package.json
└── README.md
```

## 🚀 Getting Started

### Prerequisites

- Node.js (v18 or higher)
- npm or yarn
- Git

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/Infinity-Consultancy.git
   cd Infinity-Consultancy
   ```

2. **Install Frontend Dependencies**
   ```bash
   cd Frontend
   npm install
   ```

3. **Install Backend Dependencies**
   ```bash
   cd ../Backend
   npm install
   ```

### Environment Variables

#### Frontend (.env)
Create a `.env` file in the `Frontend` directory:

```env
VITE_EMAILJS_SERVICE_ID=your_service_id
VITE_EMAILJS_TEMPLATE_ID=your_template_id
VITE_EMAILJS_PUBLIC_KEY=your_public_key
```

#### Backend (.env)
Create a `.env` file in the `Backend` directory:

```env
PORT=5000
FRONTEND_URL=https://your-frontend-url.vercel.app
```

### Running Locally

1. **Start Backend Server**
   ```bash
   cd Backend
   npm start
   ```
   Server runs on `http://localhost:5000`

2. **Start Frontend Development Server**
   ```bash
   cd Frontend
   npm run dev
   ```
   Frontend runs on `http://localhost:5173`

3. **Build for Production**
   ```bash
   cd Frontend
   npm run build
   ```

## 📧 EmailJS Setup

1. Sign up at [EmailJS](https://www.emailjs.com/)
2. Create an email service (Gmail recommended)
3. Create an email template
4. Get your Service ID, Template ID, and Public Key
5. Add them to your `.env` file

## 🌐 Deployment

### Frontend (Vercel)
1. Push code to GitHub
2. Import project in Vercel
3. Add environment variables in Vercel dashboard
4. Deploy automatically on push

### Backend (Render)
1. Connect GitHub repository to Render
2. Create new Web Service
3. Set build command: `cd Backend && npm install`
4. Set start command: `node server.js`
5. Add environment variables in Render dashboard

## 📱 Sections

- **Hero Section** - Eye-catching introduction with animated statistics
- **Services** - Comprehensive service offerings with modal view
- **About** - Company history, vision, and mission
- **Branches** - Timeline view of branch locations
- **Gallery** - Image gallery with modal functionality
- **Enquiry** - Contact form with EmailJS integration

## 🎨 Design Features

- Modern gradient backgrounds
- Smooth scroll animations
- Interactive hover effects
- Mobile-first responsive design
- Dark theme with accent colors
- Professional typography

## 📊 Statistics

- **36+ Years** of experience
- **1000+** Happy clients
- **5+** Branch locations
- **100%** Compliance rate

## 🤝 Contributing

This is a private project. For contributions or inquiries, please contact the repository owner.

## 📝 License

This project is private and proprietary. All rights reserved.

## 👤 Contact

**Infinity Consultancy**
- 📧 Email: nevil04@gmail.com | infinitygst04@gmail.com
- 📞 Phone: 8460818184 | 9375152535
- 📍 Address: C-50, Shantinagar Township, Bilimora(W) - 396321
- 🌐 Website: [Live Site](https://infinity-consultancy-blm.vercel.app)

## 🙏 Acknowledgments

- Lottie animations from [LottieFiles](https://lottiefiles.com/)
- Icons from [Font Awesome](https://fontawesome.com/)
- UI inspiration from modern web design trends

---

**Built with ❤️ for Infinity Consultancy**

*Since 1989 - Your Trusted Financial Partner*
