"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import {
  Search,
  Bell,
  ChevronDown,
  Menu,
  X,
  Car,
  Calendar,
  PlusCircle,
  LogOut,
} from "lucide-react";

const Navbar = () => {
  // Change to false to test logged out state
  const [isLoggedIn, setIsLoggedIn] = useState(true);

  const [mobileMenu, setMobileMenu] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);

  return (
    <nav className="bg-white border-b shadow-sm">
      <div className="max-w-7xl mx-auto px-5 lg:px-10">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link href="/" className="text-3xl font-bold text-gray-900">
           <div className="flex gap-2 items-center">
          <Image
            src="https://i.postimg.cc/L6Xk5qNY/djvalo-car-headlight-5021830-1920.jpg"
            alt="logo"
            loading="eager"
            width={30}
            height={30}
            className="object-cover h-auto w-auto"
          />
            <h3 className="font-black text-lg">DriveFleet </h3>
        </div>
          </Link>

          {/* Desktop Menu */}
          <ul className="hidden lg:flex items-center gap-10 text-sm font-medium text-gray-600">
            <li>
              <Link
                href="/"
                className="text-green-500 border-b-2 border-green-500 pb-1"
              >
                Home
              </Link>
            </li>

            <li>
              <Link
                href="/explore-cars"
                className="hover:text-black duration-200"
              >
                Explore Cars
              </Link>
            </li>

            <li>
              <Link
                href="/add-car"
                className="hover:text-black duration-200"
              >
                Add Car
              </Link>
            </li>

            <li>
              <Link
                href="/my-bookings"
                className="hover:text-black duration-200"
              >
                My Bookings
              </Link>
            </li>
          </ul>

          {/* Right Side */}
          <div className="hidden lg:flex items-center gap-5">
            <Search className="w-5 h-5 text-gray-500 cursor-pointer" />

            <Bell className="w-5 h-5 text-gray-500 cursor-pointer" />

            {/* If Logged In */}
            {isLoggedIn ? (
              <div className="relative">
                <button
                  onClick={() => setProfileOpen(!profileOpen)}
                  className="flex items-center gap-2"
                >
                  <Image
                    src="https://i.postimg.cc/L6KYKnGB/avatar.png"
                    alt="profile"
                    width={40}
                    height={40}
                    className="rounded-full border object-cover"
                  />

                  <span className="text-sm font-medium text-gray-700">
                    James Carter
                  </span>

                  <ChevronDown className="w-4 h-4 text-gray-500" />
                </button>

                {/* Dropdown */}
                {profileOpen && (
                  <div className="absolute right-0 top-14 w-56 bg-white border rounded-2xl shadow-xl p-3 z-50">
                    <div className="space-y-1">
                      <Link
                        href="/add-car"
                        className="flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-gray-100 text-gray-700"
                      >
                        <PlusCircle className="w-4 h-4" />
                        Add Car
                      </Link>

                      <Link
                        href="/my-bookings"
                        className="flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-gray-100 text-gray-700"
                      >
                        <Calendar className="w-4 h-4" />
                        My Bookings
                      </Link>

                      <Link
                        href="/my-added-cars"
                        className="flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-gray-100 text-gray-700"
                      >
                        <Car className="w-4 h-4" />
                        My Added Cars
                      </Link>

                      <button
                        onClick={() => setIsLoggedIn(false)}
                        className="w-full flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-red-50 text-red-500"
                      >
                        <LogOut className="w-4 h-4" />
                        Logout
                      </button>
                    </div>
                  </div>
                )}
              </div>
            ) : (
              /* If Not Logged In */
              <div className="flex items-center gap-3">
                <Link
                  href="/login"
                  className="px-5 py-2 rounded-full border border-green-500 text-green-500 hover:bg-green-500 hover:text-white duration-300"
                >
                  Login
                </Link>

                <Link
                  href="/register"
                  className="px-5 py-2 rounded-full bg-green-500 text-white hover:bg-green-600 duration-300"
                >
                  Register
                </Link>
              </div>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenu(!mobileMenu)}
            className="lg:hidden"
          >
            {mobileMenu ? (
              <X className="w-7 h-7 text-gray-700" />
            ) : (
              <Menu className="w-7 h-7 text-gray-700" />
            )}
          </button>
        </div>

        {/* Mobile Menu */}
        {mobileMenu && (
          <div className="lg:hidden pb-6">
            <div className="flex flex-col gap-4 text-gray-700 font-medium">
              <Link href="/">Home</Link>

              <Link href="/explore-cars">Explore Cars</Link>

              <Link href="/add-car">Add Car</Link>

              <Link href="/my-bookings">My Bookings</Link>

              <div className="border-t pt-4">
                {isLoggedIn ? (
                  <div className="space-y-3">
                    <Link
                      href="/my-added-cars"
                      className="block text-gray-700"
                    >
                      My Added Cars
                    </Link>

                    <button
                      onClick={() => setIsLoggedIn(false)}
                      className="text-red-500"
                    >
                      Logout
                    </button>
                  </div>
                ) : (
                  <div className="flex gap-3">
                    <Link
                      href="/login"
                      className="px-4 py-2 rounded-full border border-green-500 text-green-500"
                    >
                      Login
                    </Link>

                    <Link
                      href="/register"
                      className="px-4 py-2 rounded-full bg-green-500 text-white"
                    >
                      Register
                    </Link>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;