# 🚗 DriveFleet — Car Rental Platform

A modern full-stack car rental web application where users can explore, book, and manage car listings with ease.

[![Live Demo](https://img.shields.io/badge/Live%20Demo-Visit%20Site-22d3ee?style=for-the-badge)](https://driveflet.vercel.app)
[![Client Repo](https://img.shields.io/badge/Client-GitHub-181717?style=for-the-badge&logo=github)](https://github.com/riadul061/DriveFleet-Car-project)
[![Server Repo](https://img.shields.io/badge/Server-GitHub-181717?style=for-the-badge&logo=github)](https://github.com/riadul061/drivefleet-server)

---

## 📌 Overview

DriveFleet solves the problem of managing and booking rental cars online. Users can browse available cars, book with driver preferences and special notes, and car owners can manage their own listings — all with secure JWT-based authentication.

---

## 🖼️ Screenshots

### 🏠 Home Page
![DriveFleet Home Page](./Screenshot%202026-06-03%20200056.png)

### 🚘 Car Listings
![DriveFleet Car Listings](./Screenshot%202026-06-03%20200202.png)

---

## ⚙️ Tech Stack

| Layer | Technology |
|-------|-----------|
| Frontend | Next.js 16, Tailwind CSS, HeroUI |
| Backend | Node.js, Express.js |
| Database | MongoDB |
| Authentication | Better Auth (client + server), Jose (JWT verification) |
| Deployment | Vercel (frontend), Render (backend) |

---

## ✨ Features

### 🔍 Explore & Search Cars
- Browse all available cars with real-time search by name
- Filter by car type: SUV, Sedan, Luxury, Sports, Hatchback, etc.
- Each listing shows seat capacity, pickup location, availability status (available/unavailable badge), and daily rent price

### 📅 Car Booking System
- Logged-in users can book any available car
- Driver preference and special notes supported per booking
- Each booking updates the car's live booking count in MongoDB
- Full booking history saved per user

### 🛠️ Manage Listings
- Car owners can add new listings with full details
- Update price, image, type, location, availability, and description
- Delete listings with a confirmation modal to prevent accidental removal

### 🔐 Secure Authentication
- User registration, login, and logout via Better Auth
- JWT token verification using Jose on the backend
- Protected routes — only authenticated users can access private pages

---

## 🚀 Getting Started

### Prerequisites
- Node.js v18+
- MongoDB Atlas account
- Vercel account (for frontend deployment)
- Render account (for backend deployment)

### Client Setup

```bash
git clone https://github.com/riadul061/DriveFleet-Car-project
cd DriveFleet-Car-project
npm install
npm run dev
```

### Server Setup

```bash
git clone https://github.com/riadul061/drivefleet-server
cd drivefleet-server
npm install
npm run dev
```

---

## 🔐 Environment Variables

### Client `.env.local`

```env
NEXT_PUBLIC_API_URL=your_backend_url
BETTER_AUTH_SECRET=your_better_auth_secret
BETTER_AUTH_URL=your_frontend_url
```

### Server `.env`

```env
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
PORT=5000
```

> ⚠️ Never commit `.env` files. Add them to `.gitignore`.

---

## 🧪 Manual Test Cases

| Test | Steps | Expected Result |
|------|-------|-----------------|
| User Registration | Go to /register, fill form, submit | Account created, redirected to home |
| User Login | Go to /login, enter credentials | JWT token set, dashboard accessible |
| Browse Cars | Visit home page | All available cars displayed with search/filter |
| Search by Name | Type car name in search bar | Matching cars shown in real time |
| Filter by Type | Select SUV/Sedan/Luxury from filter | Only matching cars displayed |
| Book a Car | Login → select car → fill booking form → submit | Booking saved, car booking count updated |
| Add Listing | Login → go to add listing → fill form → submit | New car appears in listings |
| Edit Listing | Go to my listings → click edit → update → save | Listing updated in database |
| Delete Listing | Click delete → confirm in modal | Listing removed from database |
| Protected Route | Try accessing dashboard without login | Redirected to login page |

---

## ⚠️ Known Limitations

- No payment gateway integrated — bookings are confirmed without payment
- No admin panel to manage all users or listings globally
- No email notification system for booking confirmations
- Image upload uses URL input — no direct file upload support yet

---

## 🔮 Future Improvements

- [ ] Add payment integration (SSLCommerz or Stripe)
- [ ] Admin dashboard for managing users and all listings
- [ ] Email notifications for booking confirmation and cancellation
- [ ] Direct image upload with Cloudinary or similar
- [ ] Add review and rating system for cars
- [ ] Implement pagination for large car listings

---

## 👤 Author

**Riadul Islam**
- 🌐 Portfolio: [my-portfolio-sigma-seven-79.vercel.app](https://my-portfolio-sigma-seven-79.vercel.app/)
- 💼 LinkedIn: [linkedin.com/in/riadul-islam061](https://www.linkedin.com/in/riadul-islam061)
- 🐙 GitHub: [github.com/riadul061](https://github.com/riadul061)
- 📧 riadulislam061@gmail.com

---

## 📄 License

This project is open source and available under the [MIT License](LICENSE).
