# Ali Raffay — Portfolio

Personal portfolio website built with React, Three.js, GSAP, and Framer Motion.

## ✨ Features
- 3D interactive background with Three.js
- Smooth horizontal scroll project showcase
- 3D card tilt hover effects
- GSAP scroll animations
- Framer Motion page transitions
- Fully responsive (mobile-first)
- Contact form with EmailJS
- Custom cursor (desktop)
- Animated skill bars and timeline

## 🛠️ Tech Stack
React · Vite · Three.js · @react-three/fiber · GSAP · Framer Motion · Tailwind CSS · react-hook-form · EmailJS

## 🚀 Getting Started

### Prerequisites
- Node.js 18+
- npm 9+

### Installation
```bash
git clone https://github.com/Ali-Raffay/portfolio.git
cd portfolio
npm install
npm run dev
```

### Setup EmailJS (for contact form)
1. Create account at https://www.emailjs.com
2. Create a service (Gmail, Outlook, etc.)
3. Create an email template
4. Copy Service ID, Template ID, Public Key
5. Open `src/components/ContactForm.jsx` and replace:
   - `YOUR_EMAILJS_SERVICE_ID`
   - `YOUR_EMAILJS_TEMPLATE_ID`
   - `YOUR_EMAILJS_PUBLIC_KEY`

### Add Your Content
Edit `src/data/portfolioData.js` to update:
- Personal info, bio, contact details
- Skills and proficiency levels
- Education and work experience
- Projects with descriptions and links

## 📦 Build for Production
```bash
npm run build
```

## 🌐 Deploy

### Vercel (Recommended)
1. Push to GitHub
2. Go to vercel.com → New Project
3. Import your GitHub repo
4. Deploy (zero config needed)

### Netlify
1. Push to GitHub
2. Go to netlify.com → New site from Git
3. Build command: `npm run build`
4. Publish directory: `dist`

## 📄 License
MIT — feel free to use this as inspiration for your own portfolio.
