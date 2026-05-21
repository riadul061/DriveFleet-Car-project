'use client';

import { Button } from '@heroui/react';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { authClient } from '@/lib/auth-client';
import toast from 'react-hot-toast';

export default function AddCarPage() {
    const router = useRouter();
    const [loading, setLoading] = useState(false);

    const handleAddCar = async (e) => {
        e.preventDefault();
        setLoading(true);

        // ✅ FormData আগেই নেওয়া — async call এর আগে
        const formData = new FormData(e.currentTarget);
        const carData = Object.fromEntries(formData.entries());
        carData.dailyRentPrice = Number(carData.dailyRentPrice);
        carData.seatCapacity = Number(carData.seatCapacity);

        // Token নেওয়া
        const { data: jwtData } = await authClient.token();
        const token = jwtData?.token;

        if (!token) {
            toast.error("Authentication failed. Please login.");
            setLoading(false);
            return;
        }

        try {
            const res = await fetch(
                `${process.env.NEXT_PUBLIC_API_URL}/explore`,
                {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: `Bearer ${token}`, // ✅ Token যোগ
                    },
                    body: JSON.stringify(carData),
                }
            );

            const data = await res.json();

            if (!res.ok) {
                toast.error(data.message || 'Failed to add car');
                return;
            }

            toast.success('Car added successfully');
            e.target.reset();
            router.push('/explore-cars');

        } catch (error) {
            toast.error('Something went wrong');
        } finally {
            setLoading(false);
        }
    };

    const inputClass =
        'w-full h-14 rounded-2xl border-2 border-gray-200 px-4 outline-none focus:border-black bg-white text-black placeholder-gray-400';

    return (
        <div className="min-h-screen bg-[#f7f4ed]">
            <div className="h-10"></div>
            <div className="max-w-3xl mx-auto px-4 py-10">

                <p className="uppercase tracking-[6px] text-sm font-bold text-lime-700 mb-4">
                    Private Layout
                </p>

                <h1 className="text-5xl md:text-7xl font-black text-black leading-none">
                    Add a car listing.
                </h1>

                <p className="text-gray-500 text-lg mt-6 max-w-2xl leading-relaxed">
                    Create a MongoDB-backed listing with availability,
                    pickup location, image, and rental details.
                </p>

                <div className="bg-white mt-12 rounded-[2rem] shadow-sm border border-gray-200 p-6 md:p-10">
                    <form onSubmit={handleAddCar} className="space-y-6">

                        <div>
                            <label className="text-sm font-bold text-black mb-2 block">Car Name</label>
                            <input name="carName" placeholder="BMW X5" required className={inputClass} />
                        </div>

                        <div>
                            <label className="text-sm font-bold text-black mb-2 block">Daily Rent Price</label>
                            <input type="number" name="dailyRentPrice" placeholder="399" required className={inputClass} />
                        </div>

                        <div>
                            <label className="text-sm font-bold text-black mb-2 block">Car Type</label>
                            <select name="carType" required className="w-full h-14 rounded-2xl border-2 border-gray-200 px-4 outline-none focus:border-black bg-[#f7f4ed]">
                                <option value="SUV">SUV</option>
                                <option value="Sedan">Sedan</option>
                                <option value="Luxury">Luxury</option>
                                <option value="Hatchback">Hatchback</option>
                                <option value="Sports">Sports</option>
                            </select>
                        </div>

                        <div>
                            <label className="text-sm font-bold text-black mb-2 block">Image URL</label>
                            <input type="url" name="image" placeholder="https://example.com/car.jpg" required className={inputClass} />
                        </div>

                        <div>
                            <label className="text-sm font-bold text-black mb-2 block">Seat Capacity</label>
                            <input type="number" name="seatCapacity" placeholder="5" required className={inputClass} />
                        </div>

                        <div>
                            <label className="text-sm font-bold text-black mb-2 block">Pickup Location</label>
                            <input name="pickupLocation" placeholder="Dhaka" required className={inputClass} />
                        </div>

                        <div>
                            <label className="text-sm font-bold text-black mb-2 block">Availability Status</label>
                            <select name="availability" required className="w-full h-14 rounded-2xl border-2 border-gray-200 px-4 outline-none focus:border-black bg-[#f7f4ed]">
                                <option value="available">Available</option>
                                <option value="unavailable">Unavailable</option>
                            </select>
                        </div>

                        <div>
                            <label className="text-sm font-bold text-black mb-2 block">Description</label>
                            <textarea
                                name="description"
                                placeholder="Write car details..."
                                rows={5}
                                required
                                className="w-full rounded-2xl border-2 border-gray-200 px-4 py-3 outline-none focus:border-black bg-white text-black placeholder-gray-400 resize-none"
                            />
                        </div>

                        <Button
                            type="submit"
                            isLoading={loading}
                            className="w-full h-14 rounded-2xl bg-black text-white text-lg font-bold hover:opacity-90"
                        >
                            {loading ? 'Adding Car...' : 'Add Car Listing'}
                        </Button>
                    </form>
                </div>
            </div>
        </div>
    );
}