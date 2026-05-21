import { auth } from '@/lib/auth';
import { headers } from 'next/headers';
import Image from 'next/image';
import { Calendar, MapPin, Users, User } from 'lucide-react';
import BookingButton from '@/components/BookingButton';

const fetchCar = async (id, token) => {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/explore/${id}`, {
        headers: {
            authorization: `Bearer ${token}` || '',
        },
    });
    const data = await res.json();
    return data || {};
};

export default async function CarDetailsPage({ params }) {
    const { id } = await params;

    const { token } = await auth.api.getToken({
        headers: await headers(),
    });

    const car = await fetchCar(id, token);

    const { carName, carType, image, dailyRentPrice, description, seatCapacity, pickupLocation, availability, bookingCount, ownerName, ownerEmail } = car;

    const featuredItems = [
        { icon: Calendar, label: `Booked by ${bookingCount || 0} users` },
        { icon: Users, label: `${seatCapacity} Seats` },
        { icon: MapPin, label: pickupLocation || 'N/A' },
        
        { icon: User, label: `Owner: ${ownerName || 'DriveFleet'} (${ownerEmail || 'fleet@drivefleet.local'})` },
    ];

    return (
        <div className="min-h-screen bg-[#f7f4ed] py-10 px-4">
            <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-8">

                {/* Left */}
                <div className="bg-white rounded-[2rem] p-4 shadow-sm">
                    <div className="relative h-[500px] rounded-[2rem] overflow-hidden">
                        <Image
                            src={image || '/placeholder.jpg'}
                            alt={carName ?? 'Car image'}
                            fill
                            className="object-cover"
                        />
                    </div>
                </div>

                {/* Right */}
                <div className="bg-white rounded-[2rem] p-8 shadow-sm">

                    <p className="uppercase tracking-[5px] text-xs font-black text-lime-700">
                        {carType}
                    </p>

                    <h1 className="text-5xl font-black text-black mt-3">
                        {carName}
                    </h1>

                    <div className="mt-4 flex items-end gap-2">
                        <h2 className="text-5xl font-black text-black">${dailyRentPrice}</h2>
                        <span className="text-gray-500 font-semibold mb-1">/ day</span>
                    </div>

                    <p className="text-gray-500 mt-6 leading-relaxed">
                        {description}
                    </p>

                    <div className="space-y-4 mt-8">
                        {featuredItems.map((item, i) => (
                            <div
                                key={i}
                                className="bg-gray-100 rounded-2xl px-5 py-4 flex items-center gap-3"
                            >
                                <item.icon className="w-5 h-5 text-black" />
                                <span className="font-semibold text-black">{item.label}</span>
                            </div>
                        ))}
                    </div>

                    <div className="bg-black rounded-[2rem] p-6 mt-8">
                        <p className="uppercase tracking-[5px] text-xs font-black text-lime-400">
                            Status
                        </p>
                        <h2 className="text-4xl font-black text-white mt-2 capitalize">
                            {availability}
                        </h2>
                    </div>

                    {/* ✅ token prop নেই — BookingButton নিজেই authClient.token() দিয়ে নেয় */}
                    <BookingButton car={car} />
                </div>
            </div>
        </div>
    );
}