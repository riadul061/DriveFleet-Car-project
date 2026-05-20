'use client';

import { use, useEffect, useState } from 'react';

import Image from 'next/image';

import {
    Calendar,
    MapPin,
    Users,
    User,
} from 'lucide-react';

import {
    Button,
    Modal,
    ModalBody,
    ModalFooter,
    ModalHeader,
    TextArea,
} from '@heroui/react';

import toast from 'react-hot-toast';

export default function CarDetailsPage({ params: paramsPromise }) {

    const params = use(paramsPromise);


    const [car, setCar] = useState(null);

    const [isOpen, setIsOpen] = useState(false);

    // Fetch Car
    useEffect(() => {

        const fetchCar = async () => {

            try {

                const res = await fetch(
                    `${process.env.NEXT_PUBLIC_API_URL}/explore/${params.id}`
                );

                const data = await res.json();

                setCar(data);

            } catch (error) {

                toast.error('Failed to load car');
            }
        };

        fetchCar();

    }, [params.id]);

    // Loading
    if (!car) {
        return (
            <div className="min-h-screen bg-[#f7f4ed] flex items-center justify-center">
                <p className="text-lg font-semibold text-gray-500">
                    Loading car details...
                </p>
            </div>
        );
    }

    // Booking
    const handleBooking = async (e) => {

        e.preventDefault();

        const formData = new FormData(e.currentTarget);

        const bookingData = Object.fromEntries(formData.entries());

        const finalBooking = {
            ...bookingData,
            carId: car._id,
            carName: car.carName,
            carImage: car.image,
            price: car.dailyRentPrice,
        };

        try {

            const res = await fetch(
                `${process.env.NEXT_PUBLIC_API_URL}/explore`,
                {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(finalBooking),
                }
            );

            const data = await res.json();

            if (!res.ok) {
                toast.error(data.message || 'Booking failed');
                return;
            }

            toast.success('Car booked successfully');

            setIsOpen(false);

        } catch (error) {

            toast.error('Something went wrong');
        }
    };

    return (
        <div className="min-h-screen bg-[#f7f4ed] py-10 px-4">

            <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-8">

                {/* Left */}
                <div className="bg-white rounded-[2rem] p-4 shadow-sm">

                    <div className="relative h-[500px] rounded-[2rem] overflow-hidden">

                        <Image
                            src={car.image || '/placeholder.jpg'}
                            alt={car.carName ?? 'Car image'}
                            width={400}
                            height={300}
                            className="object-cover"
                        />
                    </div>
                </div>

                {/* Right */}
                <div className="bg-white rounded-[2rem] p-8 shadow-sm">

                    <p className="uppercase tracking-[5px] text-xs font-black text-lime-700">
                        {car.carType}
                    </p>

                    <h1 className="text-5xl font-black text-black mt-3">
                        {car.carName}
                    </h1>

                    <div className="mt-4 flex items-end gap-2">

                        <h2 className="text-5xl font-black text-black">
                            ${car.dailyRentPrice}
                        </h2>

                        <span className="text-gray-500 font-semibold mb-1">
                            / day
                        </span>
                    </div>

                    <p className="text-gray-500 mt-6 leading-relaxed">
                        {car.description}
                    </p>

                    <div className="space-y-4 mt-8">

                        <div className="bg-gray-100 rounded-2xl px-5 py-4 flex items-center gap-3">

                            <Calendar className="w-5 h-5 text-black" />

                            <span className="font-semibold text-black">
                                Not booked yet
                            </span>
                        </div>

                        <div className="bg-gray-100 rounded-2xl px-5 py-4 flex items-center gap-3">

                            <Users className="w-5 h-5 text-black" />

                            <span className="font-semibold text-black">
                                {car.seatCapacity} Seats
                            </span>
                        </div>

                        <div className="bg-gray-100 rounded-2xl px-5 py-4 flex items-center gap-3">

                            <MapPin className="w-5 h-5 text-black" />

                            <span className="font-semibold text-black">
                                {car.pickupLocation}
                            </span>
                        </div>

                        <div className="bg-gray-100 rounded-2xl px-5 py-4 flex items-center gap-3">

                            <User className="w-5 h-5 text-black" />

                            <span className="font-semibold text-black">
                                Owner: admin@gmail.com
                            </span>
                        </div>
                    </div>

                    <div className="bg-black rounded-[2rem] p-6 mt-8">

                        <p className="uppercase tracking-[5px] text-xs font-black text-lime-400">
                            Status
                        </p>

                        <h2 className="text-4xl font-black text-white mt-2 capitalize">
                            {car.availability}
                        </h2>
                    </div>

                    <Button
                        onPress={() => setIsOpen(true)}
                        className="w-full mt-6 h-14 rounded-2xl bg-lime-400 text-black text-lg font-black"
                    >
                        Book Now
                    </Button>
                </div>
            </div>

            {/* Modal */}
            <Modal
                isOpen={isOpen}
                onOpenChange={setIsOpen}
                size="2xl"
            >
                <form onSubmit={handleBooking}>

                    <ModalHeader>
                        Book Car
                    </ModalHeader>

                    <ModalBody>

                        <div>

                            <label className="font-bold mb-2 block">
                                Driver Needed?
                            </label>

                            <select
                                name="driverNeeded"
                                className="w-full border-2 border-gray-200 rounded-2xl px-4 py-3"
                            >
                                <option value="Yes">
                                    Yes
                                </option>

                                <option value="No">
                                    No
                                </option>
                            </select>
                        </div>

                        <div className="mt-4">

                            <label className="font-bold mb-2 block">
                                Special Note
                            </label>

                            <TextArea
                                name="specialNote"
                                placeholder="Write your note..."
                                rows={5}
                            />
                        </div>

                    </ModalBody>

                    <ModalFooter>

                        <Button
                            variant="light"
                            onPress={() => setIsOpen(false)}
                        >
                            Cancel
                        </Button>

                        <Button
                            type="submit"
                            className="bg-black text-white"
                        >
                            Book Now
                        </Button>

                    </ModalFooter>

                </form>
            </Modal>
        </div>
    );
}