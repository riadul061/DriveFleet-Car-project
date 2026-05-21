'use client';

import { useEffect, useState } from 'react';

import Image from 'next/image';

import {
    CalendarDays,
    MapPin,
    BadgeDollarSign,
    Car,
} from 'lucide-react';

import toast from 'react-hot-toast';

export default function MyBookingsPage() {

    const [bookings, setBookings] = useState([]);

    const [loading, setLoading] = useState(true);

    // Fetch Bookings
    useEffect(() => {

        const fetchBookings = async () => {

            try {

                const res = await fetch(
                    `${process.env.NEXT_PUBLIC_API_URL}/explore`
                );

                const data = await res.json();

                setBookings(data);

            } catch (error) {

                toast.error('Failed to load bookings');
            } finally {

                setLoading(false);
            }
        };

        fetchBookings();

    }, []);

    // Loading
    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-[#f7f4ed]">
                <p className="text-xl font-bold text-black">
                    Loading bookings...
                </p>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-[#f7f4ed] py-10 px-4">

            {/* Heading */}
            <div className="max-w-7xl mx-auto mb-10">

                <p className="uppercase tracking-[5px] text-sm font-black text-lime-700">
                    Dashboard
                </p>

                <h1 className="text-5xl md:text-7xl font-black text-black mt-3">
                    My Bookings
                </h1>

                <p className="text-gray-600 mt-4 text-lg">
                    See all your booked cars here.
                </p>
            </div>

            {/* Empty State */}
            {bookings.length === 0 && (

                <div className="max-w-4xl mx-auto bg-white rounded-[2rem] p-10 text-center shadow-sm">

                    <h2 className="text-3xl font-black text-black">
                        No Bookings Found
                    </h2>

                    <p className="text-gray-500 mt-3">
                        You haven't booked any cars yet.
                    </p>
                </div>
            )}

            {/* Booking Cards */}
            <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">

                {bookings.map((booking) => (

                    <div
                        key={booking._id}
                        className="bg-white rounded-[2rem] overflow-hidden shadow-sm"
                    >

                        {/* Car Image */}
                        <div className="relative h-64">

                            <Image
                                src={booking.carImage || '/placeholder.svg'}
                                alt={booking.carName ?? 'Car image'}
                                width={400}
                                height={300}
                                
                                className="object-cover"
                            />
                        </div>

                        {/* Content */}
                        <div className="p-6">

                            {/* Car Name */}
                            <div className="flex items-center gap-2">

                                <Car className="w-5 h-5 text-lime-700" />

                                <h2 className="text-3xl font-black text-black">
                                    {booking.carName}
                                </h2>
                            </div>

                            {/* Price */}
                            <div className="flex items-center gap-2 mt-5">

                                <BadgeDollarSign className="w-5 h-5 text-black" />

                                <p className="text-lg font-bold text-black">
                                    Total Price:
                                    <span className="ml-2 text-lime-700">
                                        ${booking.price}
                                    </span>
                                </p>
                            </div>

                            {/* Driver */}
                            <div className="flex items-center gap-2 mt-4">

                                <MapPin className="w-5 h-5 text-black" />

                                <p className="text-black font-semibold">
                                    Driver Needed:
                                    <span className="ml-2 text-gray-600">
                                        {booking.driverNeeded}
                                    </span>
                                </p>
                            </div>

                            {/* Booking Date */}
                            <div className="flex items-center gap-2 mt-4">

                                <CalendarDays className="w-5 h-5 text-black" />

                                <p className="text-black font-semibold">
                                    Booking Date:
                                    <span className="ml-2 text-gray-600">
                                        {
                                            new Date(
                                                booking.createdAt || Date.now()
                                            ).toLocaleDateString()
                                        }
                                    </span>
                                </p>
                            </div>

                            {/* Note */}
                            <div className="mt-5">

                                <p className="text-sm font-bold text-black">
                                    Special Note
                                </p>

                                <p className="text-gray-600 mt-2 leading-relaxed">
                                    {
                                        booking.specialNote ||
                                        'No special note added.'
                                    }
                                </p>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}