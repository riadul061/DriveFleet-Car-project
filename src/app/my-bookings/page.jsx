'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import { CalendarDays, MapPin, Car } from 'lucide-react';
import { authClient } from '@/lib/auth-client';
import toast from 'react-hot-toast';

export default function MyBookingsPage() {
    const [bookings, setBookings] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchBookings = async () => {
            try {
                const { data: jwtData } = await authClient.token();
                const token = jwtData?.token;

                const res = await fetch(
                    `${process.env.NEXT_PUBLIC_API_URL}/my-bookings`,
                    {
                        headers: {
                            Authorization: `Bearer ${token}`,
                        },
                    }
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

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-[#f7f4ed]">
                <p className="text-xl font-bold text-black">Loading bookings...</p>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-[#f7f4ed] py-10 px-4">

            {/* Heading */}
            <div className="max-w-4xl mx-auto mb-10">
                <p className="uppercase tracking-[5px] text-sm font-black text-lime-700">
                    Private Layout
                </p>
                <h1 className="text-5xl md:text-7xl font-black text-black mt-2">
                    My Bookings
                </h1>
            </div>

            {/* Empty State */}
            {bookings.length === 0 && (
                <div className="max-w-4xl mx-auto bg-white rounded-[2rem] p-10 text-center shadow-sm">
                    <h2 className="text-3xl font-black text-black">No Bookings Found</h2>
                    <p className="text-gray-500 mt-3">You haven't booked any cars yet.</p>
                </div>
            )}

            {/* Booking Cards */}
            <div className="max-w-4xl mx-auto flex flex-col gap-4">
                {bookings.map((booking) => (
                    <div
                        key={booking._id}
                        className="bg-white rounded-2xl overflow-hidden shadow-sm flex items-center gap-5 p-4"
                    >
                        {/* Car Image */}
                        <div className="relative w-32 h-24 rounded-xl overflow-hidden flex-shrink-0">
                            <Image
                                src={booking.carImage || '/placeholder.svg'}
                                alt={booking.carName ?? 'Car image'}
                                fill
                                className="object-cover"
                            />
                        </div>

                        {/* Info */}
                        <div className="flex-1 min-w-0">
                            <h2 className="text-xl font-black text-black truncate">
                                {booking.carName}
                            </h2>

                            <div className="flex items-center gap-1 mt-1">
                                <MapPin className="w-4 h-4 text-gray-500 flex-shrink-0" />
                                <p className="text-sm text-gray-500 truncate">
                                    {booking.pickupLocation || 'N/A'}
                                </p>
                            </div>

                            <div className="flex items-center gap-1 mt-1">
                                <CalendarDays className="w-4 h-4 text-gray-500 flex-shrink-0" />
                                <p className="text-sm text-gray-500">
                                    {new Date(booking.bookedAt || Date.now()).toLocaleString()}
                                </p>
                            </div>
                        </div>

                        {/* Price Badge */}
                        <div className="flex-shrink-0">
                            <div className="bg-black text-white font-black text-lg px-5 py-3 rounded-xl">
                                ${booking.price}
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}