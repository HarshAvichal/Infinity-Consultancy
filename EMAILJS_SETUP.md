# EmailJS Setup Guide

## Step 1: Install the Package
```bash
cd Frontend
npm install @emailjs/browser
```

## Step 2: Create EmailJS Account
1. Go to https://www.emailjs.com/
2. Sign up for a free account (200 emails/month free)

## Step 3: Create an Email Service
1. In EmailJS dashboard, go to **Email Services**
2. Click **Add New Service**
3. Choose **Gmail** (or your preferred email provider)
4. Connect your Gmail account
5. **Copy the Service ID** (e.g., `service_xxxxx`)

## Step 4: Create an Email Template
1. Go to **Email Templates**
2. Click **Create New Template**
3. Use this template structure:

**Subject:** `New Inquiry from {{from_name}}`

**Content:**
```
New Business Inquiry Received

Client Name: {{from_name}}
Email: {{from_email}}
Phone: {{phone}}

Message:
{{message}}

---
This is an automated notification from Infinity Consultancy.
```

4. **Copy the Template ID** (e.g., `template_xxxxx`)

## Step 5: Get Your Public Key
1. Go to **Account** → **General**
2. **Copy your Public Key** (e.g., `xxxxxxxxxxxxx`)

## Step 6: Add Environment Variables to Vercel
1. Go to your Vercel project dashboard
2. Go to **Settings** → **Environment Variables**
3. Add these three variables:

```
VITE_EMAILJS_SERVICE_ID=your_service_id_here
VITE_EMAILJS_TEMPLATE_ID=your_template_id_here
VITE_EMAILJS_PUBLIC_KEY=your_public_key_here
```

4. **Redeploy** your site after adding the variables

## Step 7: Test
Submit the contact form and check if the email arrives!

---

**Note:** The form will send emails directly from the frontend - no backend needed! 🎉

