"use client";

import Link from "next/link";
import { useState } from "react";
import { Mail, Phone } from "lucide-react";

const Footer = () => {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = () => {
    if (!email || !email.includes("@")) return;
    console.log("Newsletter email submitted:", email);
    setSubmitted(true);
    setEmail("");
  };

  return (
    <footer className="bg-[#f8eeee] pt-20 pb-8">
      <div className="max-w-7xl mx-auto px-6 lg:px-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-14">
          {/* Left Section */}
          <div>
            <Link href="/" className="text-4xl font-bold text-gray-900">
              DriveFleet
            </Link>

            <p className="text-gray-500 text-lg leading-relaxed mt-6 max-w-md">
              DriveFleet helps you explore, book, and manage premium rental
              cars easily for smarter and more comfortable travel experiences.
            </p>

            {/* Social Icons — using inline SVGs to avoid lucide version issues */}
            <div className="flex items-center gap-5 mt-10">
              {/* Instagram */}
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-11 h-11 rounded-full border border-gray-300 flex items-center justify-center hover:bg-green-500 hover:text-white hover:border-green-500 duration-300"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <rect width="20" height="20" x="2" y="2" rx="5" ry="5"/>
                  <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/>
                  <line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/>
                </svg>
              </a>

              {/* LinkedIn */}
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-11 h-11 rounded-full border border-gray-300 flex items-center justify-center hover:bg-green-500 hover:text-white hover:border-green-500 duration-300"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/>
                  <rect width="4" height="12" x="2" y="9"/>
                  <circle cx="4" cy="4" r="2"/>
                </svg>
              </a>

              {/* Facebook */}
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-11 h-11 rounded-full border border-gray-300 flex items-center justify-center hover:bg-green-500 hover:text-white hover:border-green-500 duration-300"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/>
                </svg>
              </a>

              {/* X (Twitter) */}
              <a
                href="https://x.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-11 h-11 rounded-full border border-gray-300 flex items-center justify-center hover:bg-green-500 hover:text-white hover:border-green-500 duration-300"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                </svg>
              </a>
            </div>
          </div>

          {/* Useful Links */}
          <div>
            <h3 className="text-2xl font-semibold text-gray-900 mb-6">
              Useful Links
            </h3>

            <ul className="space-y-4 text-gray-600 text-lg">
              <li>
                <Link href="/" className="hover:text-green-500 duration-200">Home</Link>
              </li>
              <li>
                <Link href="/explore-cars" className="hover:text-green-500 duration-200">Explore Cars</Link>
              </li>
              <li>
                <Link href="/add-car" className="hover:text-green-500 duration-200">Add Car</Link>
              </li>
              <li>
                <Link href="/my-bookings" className="hover:text-green-500 duration-200">My Bookings</Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-green-500 duration-200">Contact Us</Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-2xl font-semibold text-gray-900 mb-6">
              Contact Information
            </h3>

            <div className="space-y-5 text-gray-600 text-lg">
              <div className="flex items-center gap-4">
                <Phone className="w-5 h-5 text-green-500" />
                <p>+880 1234-567890</p>
              </div>
              <div className="flex items-center gap-4">
                <Mail className="w-5 h-5 text-green-500" />
                <p>support@drivefleet.com</p>
              </div>
            </div>

            {/* Newsletter */}
            {submitted ? (
              <p className="mt-8 text-green-600 font-medium text-lg">
                ✅ Thank you for subscribing!
              </p>
            ) : (
              <div className="flex flex-col sm:flex-row items-stretch mt-8">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && handleSubmit()}
                  placeholder="Enter your email"
                  className="w-full px-5 py-4 rounded-t-xl sm:rounded-l-xl sm:rounded-tr-none border border-gray-300 outline-none focus:border-green-400"
                />
                <button
                  onClick={handleSubmit}
                  className="bg-green-500 hover:bg-green-600 text-white px-6 py-4 rounded-b-xl sm:rounded-r-xl sm:rounded-bl-none font-medium duration-300"
                >
                  Submit
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Bottom */}
        <div className="border-t mt-16 pt-8 text-center text-gray-500">
          <p>© {new Date().getFullYear()} DriveFleet. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;