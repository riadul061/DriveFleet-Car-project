"use client";

import { Input } from "@heroui/react";
import Image from "next/image";
import Link from "next/link";
import { useState, useEffect } from "react";

export default function ExploreCarsPage() {
    const [cars, setCars] = useState([]);
    const [search, setSearch] = useState("");
    const [type, setType] = useState("");

    useEffect(() => {
        const fetchCars = async () => {
            const res = await fetch(
                `${process.env.NEXT_PUBLIC_API_URL}/explore?search=${search}&type=${type}`
            );
            const data = await res.json();
            setCars(data);
        };

        fetchCars();
    }, [search, type]);

    return (
        <div className="min-h-screen bg-slate-50 py-10 px-4">

            {/* Heading */}
            <div className="max-w-7xl mx-auto mb-10">
                <h1 className="text-4xl font-black text-slate-900">
                    Find a car that <br /> matches the trip
                </h1>

                <p className="text-slate-500 mt-2">
                    Showing {cars.length} available vehicles
                </p>
            </div>

            {/* Filters */}
            <div className="max-w-7xl mx-auto mb-8 flex gap-4 font-bold">
                <Input
                    placeholder="Search car..."
                    onChange={(e) => setSearch(e.target.value)}
                />
                <select
                    onChange={(e) => setType(e.target.value)}
                    className="border p-3 rounded-xl"
                >
                    <option value="">All Types</option>
                    <option value="SUV">SUV</option>
                    <option value="Sedan">Sedan</option>
                    <option value="Luxury">Luxury</option>
                </select>
            </div>

            {/* Cars Grid */}
            <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {cars.map((car) => (
                    <div
                        key={car._id}
                        className="bg-white rounded-3xl overflow-hidden border border-slate-200 shadow-sm hover:shadow-2xl transition-all duration-300"
                    >
                        {/* Image */}
                        <div className="relative">
                            <Image
                                src={car.image || "/placeholder.svg"}
                                alt={car.carName ?? "Car image"}
                                width={400}
                                height={300}
                                className="h-56 w-full object-cover"
                            />

                            {/* Availability Badge */}
                            <span
                                className={`absolute top-4 left-4 px-3 py-1 rounded-full text-xs font-bold text-white ${
                                    car.availability === "available"
                                        ? "bg-green-500"
                                        : "bg-red-500"
                                }`}
                            >
                                {car.availability}
                            </span>
                        </div>

                        {/* Content */}
                        <div className="p-5 space-y-4">

                            {/* Title */}
                            <div>
                                <h2 className="text-xl font-black text-slate-900">
                                    {car.carName}
                                </h2>
                                <p className="text-sm text-slate-500">
                                    {car.pickupLocation}
                                </p>
                            </div>

                            {/* Car Info */}
                            <div className="grid grid-cols-3 gap-4 text-center border-y py-4">
                                <div>
                                    <h3 className="font-black text-slate-900">
                                        {car.seatCapacity}
                                    </h3>
                                    <p className="text-xs text-slate-500">Seats</p>
                                </div>
                                <div>
                                    <h3 className="font-black text-slate-900">
                                        {car.carType}
                                    </h3>
                                    <p className="text-xs text-slate-500">Type</p>
                                </div>
                                <div>
                                    <h3 className="font-black text-slate-900">Auto</h3>
                                    <p className="text-xs text-slate-500">Gear</p>
                                </div>
                            </div>

                            {/* Footer */}
                            <div className="flex items-center justify-between">
                                <div>
                                    <h2 className="text-3xl font-black text-blue-600">
                                        ${car.dailyRentPrice}
                                    </h2>
                                    <p className="text-xs text-slate-400">per day</p>
                                </div>
                                <Link
                                    href={`/explore-cars/${car._id}`}
                                    className="text-blue-600 font-bold hover:underline"
                                >
                                    View Details →
                                </Link>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}