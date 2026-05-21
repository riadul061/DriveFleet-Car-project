DriveFleet — Car Rental Platform
A modern full-stack car rental web application where users can explore, book, and manage car listings with ease.


🌐 Live Site
👉 https://driveflet.vercel.app

 Features:

Secure Authentication — Users can register, login, and logout securely using Better Auth with JWT token verification. Protected routes ensure only logged-in users can access private pages.

Explore & Search Cars — Browse all available cars with real-time search by name and filter by car type (SUV, Sedan, Luxury, etc.). Each car shows seat capacity, pickup location, availability, and daily rent price.

Car Booking System — Logged-in users can book any available car with driver preference and special notes. Each booking updates the car's booking count and saves the booking history to the database.

Manage Your Listings — Car owners can add new car listings, update details (price, image, type, location, availability, description), and delete their own listings with a confirmation modal.

 My Bookings & My Listings Dashboard — Users have a personal dashboard to view all their past bookings and manage their own added cars — all filtered by their account.


Tech Stack

Frontend: Next.js 16, Tailwind CSS, HeroUI, Better Auth (client)
Backend: Node.js, Express.js, MongoDB, Jose (JWT verification)
Deployment: Vercel (frontend), Render (backend)


This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.js`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
