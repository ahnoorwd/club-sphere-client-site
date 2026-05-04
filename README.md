# 🌐 ClubSphere – Frontend

Welcome to **ClubSphere**, a modern and scalable community platform where users can explore, join, and interact with local clubs seamlessly.

Built with **React + Tailwind + Firebase + JWT + Stripe**, this platform delivers a smooth, secure, and premium user experience.

---

## 🚀 Live Website

🔗 [https://clubsphereee.netlify.app/](#)  


## 🔐 Test Credentials (For Evaluation)

## 👤 Admin Access

Email: admin@gmail.com
Password: adminADMIN!@#

##  🧑‍💼 Club Manager

Email: manager@gmail.com
Password: MANAGERmanager!@#

##  For Free Stripe Payment Check
card Number : 4242 4242 4242 4242 
MM/YY : 02/44 etc 
CVC : 123
ZIP : 12345

---


## Project Structure  
club-sphere-client-site/
├── public/
│   ├── _redirects
│   └── reviews.json
├── src/
│   ├── api/
│   │   ├── analytics.js
│   │   ├── baseURL.js
│   │   ├── clubs.js
│   │   ├── dashboard.js
│   │   ├── events.js
│   │   ├── memberships.js
│   │   ├── payments.js
│   │   └── users.js
│   ├── assets/
│   ├── Authprovider/
│   │   └── AuthProvider.jsx
│   ├── components/
│   │   ├── HeroSlider.jsx
│   │   └── home/
│   │       └── UpcomingEvents.jsx
│   ├── firebase/
│   │   └── firebase.config.js
│   ├── layouts/
│   │   ├── DashboardLayout.jsx
│   │   └── MainLayout.jsx
│   ├── pages/
│   │   ├── AboutUs.jsx
│   │   ├── AddClub.jsx
│   │   ├── Analytics.jsx
│   │   ├── Categories.jsx
│   │   ├── ClubDetails.jsx
│   │   ├── Clubs.jsx
│   │   ├── CommunityLeaders.jsx
│   │   ├── DashboardHome.jsx
│   │   ├── EventDetails.jsx
│   │   ├── EventPaymentPage.jsx
│   │   ├── Events.jsx
│   │   ├── FeaturedClubs.jsx
│   │   ├── Home.jsx
│   │   ├── Login.jsx
│   │   ├── ManageClubs.jsx
│   │   ├── ManageEvents.jsx
│   │   ├── ManageUsers.jsx
│   │   ├── MyClubs.jsx
│   │   ├── MyEvents.jsx
│   │   ├── PaymentHistory.jsx
│   │   ├── PlatformStats.jsx
│   │   ├── Profile.jsx
│   │   ├── Register.jsx
│   │   └── Reviews/
│   │       ├── Reviews.jsx
│   │       └── ReviewsCard.jsx
│   ├── Routes/
│   │   └── Routes.jsx
│   ├── shared/
│   │   ├── Footer.jsx
│   │   └── Navbar.jsx
│   ├── App.jsx
│   ├── main.jsx
│   └── index.css
├── .env.local
├── index.html
├── package.json
└── vite.config.js

---
## 🎯 Project Purpose

ClubSphere is designed to:

- 🌍 Connect people through shared interests  
- 🏢 Help users discover and join local communities  
- 🎯 Provide structured club management system  
- 💳 Enable secure paid membership using Stripe  
- 🔐 Ensure safe and role-based access using JWT  

---

## ✨ Key Features

### 🔹 Public Features
- 🏠 Premium Home Page with Hero Slider  
- ⭐ Featured Clubs (latest approved clubs)  
- 📚 All Clubs Page with search & filtering  
- 🔍 Detailed Club Information Page  
- 🧭 “ClubSphere Journey” section (user flow visualization)

---

### 🔹 Authentication & Security
- 🔐 Firebase Authentication (Email/Password + Google Login)  
- 🛡️ JWT Token-based secure API communication  
- 🔒 Protected Routes (Private & Role-based)  
- 👤 User data stored securely in MongoDB  

---

### 🔹 Membership System
- ✅ Join free clubs with modal form (formal process UI)  
- 💳 Paid club membership with Stripe Payment Integration  
- 🚫 Prevent duplicate joining  
- 📊 Membership tracking system  

---

### 🔹 Dashboard Features

#### 👤 User Dashboard
- 📌 Joined Clubs  
- 📅 My Events  
- 💰 Payment History  

#### 🧑‍💼 Club Manager
- ➕ Add Club  
- 📊 Manage Own Clubs  
- 📍 Track approval status  

#### 🛠️ Admin Panel
- 📋 Manage All Clubs  
- ✅ Approve / Reject Clubs  
- 📊 Full system control  

---

### 🔹 Payment Integration
- 💳 Stripe Payment Gateway  
- 🔐 Secure transaction handling  
- 📜 Payment history tracking  

---

### 🔹 UI/UX Highlights
- 🎨 Fully responsive design  
- 🌈 Modern gradient-based UI  
- 💎 Premium card & layout system  
- ⚡ Smooth animations & transitions  
- 🔔 Toast + SweetAlert feedback system  

---

## 🛠️ Technologies Used

### Frontend
- ⚛️ React  
- 🔀 React Router  
- 📡 TanStack Query  
- 🌐 Axios  

### Styling
- 🎨 Tailwind CSS  
- 💎 DaisyUI  

### Authentication
- 🔐 Firebase  

### Backend (Connected)
- 🧠 Node.js + Express  
- 🍃 MongoDB  
- 🔑 JWT Authentication  
- 💳 Stripe API  

### UI Libraries
- 🔔 React Toastify  
- ⚡ SweetAlert2  
- 🎯 React Icons  

---

## 📦 NPM Packages

```bash
react
react-router
@tanstack/react-query
axios
firebase
react-toastify
sweetalert2
react-icons
tailwindcss
daisyui