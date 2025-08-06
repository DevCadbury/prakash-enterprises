# PRAKASH ENTERPRISES - Setup Guide

## Project Overview

PRAKASH ENTERPRISES is a professional landing page for a financial company offering loan and insurance services. The project uses React.js with Tailwind CSS for the frontend and Node.js + Express + Nodemailer for the contact form backend.

## Features

- ✅ Modern, responsive design with Tailwind CSS
- ✅ Smooth animations with Framer Motion
- ✅ Contact form with email backend
- ✅ Loan Services section (Home, Mortgage, Student, Car loans)
- ✅ Insurance Services section (Two Wheeler, Four Wheeler, Health, Life insurance)
- ✅ Professional branding and UI

## Quick Start

### 1. Install Dependencies

```bash
# Install server dependencies
npm install

# Install client dependencies
cd client && npm install
```

### 2. Environment Setup

Create a `.env` file in the root directory:

```env
# Email Configuration
EMAIL_USER=your-email@gmail.com
EMAIL_PASS=your-app-password
COMPANY_EMAIL=prakash@enterprises.com

# Server Configuration
PORT=5000
```

### 3. Run Development Server

```bash
# Run both frontend and backend
npm run dev

# Or run separately:
npm run server  # Backend on port 5000
npm run client  # Frontend on port 3000
```

### 4. Build for Production

```bash
npm run build
```

## Email Configuration

To enable the contact form email functionality:

1. Use a Gmail account
2. Enable 2-factor authentication
3. Generate an App Password
4. Update the `.env` file with your credentials

## Project Structure

```
landing/
├── client/                 # React frontend
│   ├── src/
│   │   ├── components/    # React components
│   │   └── App.js        # Main app component
├── server.js              # Express backend
├── package.json           # Server dependencies
└── README.md             # Project documentation
```

## Technologies Used

- **Frontend**: React.js, Tailwind CSS, Framer Motion
- **Backend**: Node.js, Express, Nodemailer
- **Styling**: Tailwind CSS with custom components
- **Animations**: Framer Motion
- **Icons**: Lucide React

## Contact Form

The contact form sends emails to the configured email address with the following fields:

- Name (required)
- Email (required)
- Message (required)

## Deployment

The project is ready for deployment on platforms like:

- Heroku
- Vercel
- Netlify
- Railway

Make sure to set the environment variables in your deployment platform.
