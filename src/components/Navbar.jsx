"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { authClient, useSession } from "@/lib/auth-client";
const signOut = () => authClient.signOut();
import {
  Search,
  Bell,
  Menu,
  X,
  Car,
  Calendar,
  PlusCircle,
  LogOut,
  ChevronDown,
} from "lucide-react";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const router = useRouter();
  const { data: session, isPending } = useSession();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleLogOut = async () => {
    await signOut();
    router.push("/");
  };

  return (
    <nav
      className={`sticky top-0 w-full z-50 transition-all duration-300 ${
        scrolled
          ? "bg-white/70 backdrop-blur-md shadow-sm py-2"
          : "bg-white border-b shadow-sm py-0"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">

          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 group">
            <Image
              src="https://i.postimg.cc/L6Xk5qNY/djvalo-car-headlight-5021830-1920.jpg"
              alt="DriveFleet logo"
              loading="eager"
              width={36}
              height={36}
              className="rounded-lg object-cover group-hover:scale-110 transition-transform"
            />
            <span className="font-black text-xl text-slate-900">DriveFleet</span>
          </Link>

          {/* Desktop Nav Links */}
          <ul className="hidden lg:flex items-center gap-8 text-sm font-medium text-gray-600">
            <li>
              <Link href="/" className="hover:text-green-500 transition-colors">
                Home
              </Link>
            </li>
            <li>
              <Link href="/explore-cars" className="hover:text-green-500 transition-colors">
                Explore Cars
              </Link>
            </li>
            <li>
              <Link href="/add-car" className="hover:text-green-500 transition-colors">
                Add Car
              </Link>
            </li>
            <li>
              <Link href="/my-bookings" className="hover:text-green-500 transition-colors">
                My Bookings
              </Link>
            </li>
          </ul>

          {/* Desktop Right Side */}
          <div className="hidden lg:flex items-center gap-5">
            <Search className="w-5 h-5 text-gray-500 cursor-pointer hover:text-green-500 transition-colors" />
            <Bell className="w-5 h-5 text-gray-500 cursor-pointer hover:text-green-500 transition-colors" />

            {!isPending && !session ? (
              <div className="flex items-center gap-3">
                <Link
                  href="/login"
                  className="px-5 py-2 rounded-full border border-green-500 text-green-500 hover:bg-green-500 hover:text-white transition-colors duration-300"
                >
                  Login
                </Link>
                <Link
                  href="/register"
                  className="px-5 py-2 rounded-full bg-green-500 text-white hover:bg-green-600 transition-colors duration-300"
                >
                  Register
                </Link>
              </div>
            ) : (
              <div className="relative group">
                <button className="flex items-center gap-3 p-1 rounded-full hover:bg-slate-100 transition-colors border border-transparent hover:border-slate-200">
                  <Image
                    src={
                      session?.user?.image ||
                      "https://i.postimg.cc/L6KYKnGB/avatar.png"
                    }
                    alt="avatar"
                    width={40}
                    height={40}
                    className="w-10 h-10 rounded-full object-cover ring-2 ring-green-500/20"
                  />
                  <div className="text-left hidden xl:block">
                    <p className="text-sm font-bold truncate max-w-[100px]">
                      {session?.user?.name}
                    </p>
                    <p className="text-[10px] text-slate-500">Member</p>
                  </div>
                  <ChevronDown className="w-4 h-4 text-gray-500" />
                </button>

                {/* Dropdown */}
                <div className="absolute right-0 top-14 w-56 bg-white border border-slate-200 rounded-2xl shadow-2xl hidden group-hover:flex flex-col py-2 z-50 animate-in fade-in slide-in-from-top-2 duration-200">
                  <div className="px-4 py-3 border-b border-slate-100">
                    <p className="font-bold text-sm">Welcome back!</p>
                    <p className="text-xs truncate text-slate-500">
                      {session?.user?.email}
                    </p>
                  </div>

                  <Link
                    href="/add-car"
                    className="px-4 py-3 text-sm hover:bg-slate-50 flex items-center gap-3 transition-colors text-gray-700"
                  >
                    <PlusCircle className="w-4 h-4" /> Add Car
                  </Link>

                  <Link
                    href="/my-bookings"
                    className="px-4 py-3 text-sm hover:bg-slate-50 flex items-center gap-3 transition-colors text-gray-700"
                  >
                    <Calendar className="w-4 h-4" /> My Bookings
                  </Link>

                  <Link
                    href="/my-added-cars"
                    className="px-4 py-3 text-sm hover:bg-slate-50 flex items-center gap-3 transition-colors text-gray-700"
                  >
                    <Car className="w-4 h-4" /> My Added Cars
                  </Link>

                  <button
                    onClick={handleLogOut}
                    className="px-4 py-3 text-sm text-red-500 hover:bg-red-50 flex items-center gap-3 transition-colors text-left"
                  >
                    <LogOut className="w-4 h-4" /> Log Out
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Mobile Menu Toggle */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="lg:hidden p-2 rounded-lg hover:bg-slate-100 transition-colors"
          >
            {isMenuOpen ? (
              <X className="w-6 h-6 text-gray-700" />
            ) : (
              <Menu className="w-6 h-6 text-gray-700" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="lg:hidden px-4 pt-2 pb-6 space-y-2 bg-white border-t border-slate-200 animate-in slide-in-from-top duration-300">
          <Link href="/" className="block px-4 py-3 text-base font-medium text-slate-900 hover:bg-slate-50 rounded-xl">
            Home
          </Link>
          <Link href="/explore-cars" className="block px-4 py-3 text-base font-medium text-slate-900 hover:bg-slate-50 rounded-xl">
            Explore Cars
          </Link>
          <Link href="/add-car" className="block px-4 py-3 text-base font-medium text-slate-900 hover:bg-slate-50 rounded-xl">
            Add Car
          </Link>
          <Link href="/my-bookings" className="block px-4 py-3 text-base font-medium text-slate-900 hover:bg-slate-50 rounded-xl">
            My Bookings
          </Link>

          <div className="pt-4 border-t border-slate-200 mt-2">
            {!isPending && !session ? (
              <div className="grid grid-cols-2 gap-3">
                <Link
                  href="/login"
                  className="text-center px-4 py-2 rounded-full border border-green-500 text-green-500 hover:bg-green-500 hover:text-white transition-colors"
                >
                  Login
                </Link>
                <Link
                  href="/register"
                  className="text-center px-4 py-2 rounded-full bg-green-500 text-white hover:bg-green-600 transition-colors"
                >
                  Register
                </Link>
              </div>
            ) : (
              <div className="flex flex-col gap-2">
                <div className="flex items-center gap-3 px-4 py-3">
                  <Image
                    src={
                      session?.user?.image ||
                      "https://i.postimg.cc/L6KYKnGB/avatar.png"
                    }
                    alt="avatar"
                    width={36}
                    height={36}
                    className="rounded-full object-cover ring-2 ring-green-500/20"
                  />
                  <div>
                    <p className="text-sm font-bold">{session?.user?.name}</p>
                    <p className="text-xs text-slate-500">{session?.user?.email}</p>
                  </div>
                </div>

                <Link href="/my-added-cars" className="block px-4 py-3 text-base font-medium text-slate-900 hover:bg-slate-50 rounded-xl">
                  My Added Cars
                </Link>

                <button
                  onClick={handleLogOut}
                  className="w-full text-left px-4 py-3 text-base font-medium text-red-500 hover:bg-red-50 rounded-xl"
                >
                  Log Out
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;