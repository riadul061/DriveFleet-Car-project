'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import {
    Button,
    Modal,
    ModalBody,
    ModalFooter,
    ModalHeader,
} from '@heroui/react';
import { authClient, useSession } from '@/lib/auth-client';
import toast from 'react-hot-toast';

export default function MyAddedCarsPage() {
    const [cars, setCars] = useState([]);
    const [selectedCar, setSelectedCar] = useState(null);
    const [isUpdateOpen, setIsUpdateOpen] = useState(false);
    const [isDeleteOpen, setIsDeleteOpen] = useState(false);
    const [formData, setFormData] = useState({});
    const { data: session } = useSession();

    // ✅ Fetch only logged-in user's cars
    useEffect(() => {
        const fetchCars = async () => {
            try {
                const { data: jwtData } = await authClient.token();
                const token = jwtData?.token;

                const res = await fetch(
                    `${process.env.NEXT_PUBLIC_API_URL}/my-cars`,
                    {
                        headers: { Authorization: `Bearer ${token}` },
                    }
                );
                const data = await res.json();
                setCars(data);
            } catch (error) {
                toast.error('Failed to load cars');
            }
        };
        fetchCars();
    }, []);

    // Open Update Modal
    const handleOpenUpdate = (car) => {
        setSelectedCar(car);
        setFormData({
            dailyRentPrice: car.dailyRentPrice || '',
            image: car.image || '',
            carType: car.carType || '',
            pickupLocation: car.pickupLocation || '',
            availability: car.availability || '',
            description: car.description || '',
        });
        setIsUpdateOpen(true);
    };

    // Open Delete Modal
    const handleOpenDelete = (car) => {
        setSelectedCar(car);
        setIsDeleteOpen(true);
    };

    // Update Car
    const handleUpdateCar = async () => {
        try {
            const { data: jwtData } = await authClient.token();
            const token = jwtData?.token;

            const res = await fetch(
                `${process.env.NEXT_PUBLIC_API_URL}/explore/${selectedCar._id}`,
                {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: `Bearer ${token}`,
                    },
                    body: JSON.stringify(formData),
                }
            );

            const data = await res.json();

            if (!res.ok) {
                toast.error(data.message || 'Update failed');
                return;
            }

            toast.success('Car updated successfully');
            setCars(cars.map((car) =>
                car._id === selectedCar._id ? { ...car, ...formData } : car
            ));
            setIsUpdateOpen(false);
        } catch (error) {
            toast.error('Something went wrong');
        }
    };

    // Delete Car
    const handleDeleteCar = async () => {
        try {
            const { data: jwtData } = await authClient.token();
            const token = jwtData?.token;

            const res = await fetch(
                `${process.env.NEXT_PUBLIC_API_URL}/explore/${selectedCar._id}`,
                {
                    method: 'DELETE',
                    headers: { Authorization: `Bearer ${token}` },
                }
            );

            const data = await res.json();

            if (!res.ok) {
                toast.error(data.message || 'Delete failed');
                return;
            }

            toast.success('Car deleted successfully');
            setCars(cars.filter((car) => car._id !== selectedCar._id));
            setIsDeleteOpen(false);
        } catch (error) {
            toast.error('Something went wrong');
        }
    };

    return (
        <div className="min-h-screen bg-[#f7f4ed] py-10 px-4">

            {/* Heading */}
            <div className="max-w-4xl mx-auto mb-10 flex items-start justify-between">
                <div>
                    <p className="uppercase tracking-[5px] text-sm font-black text-lime-700">
                        Private Layout
                    </p>
                    <h1 className="text-5xl md:text-7xl font-black text-black mt-2">
                        My Listings
                    </h1>
                </div>
                <Link href="/add-car">
                    <button className="bg-lime-400 hover:bg-lime-500 transition-colors text-black font-black px-6 py-3 rounded-full text-sm mt-4">
                        Add Car
                    </button>
                </Link>
            </div>

            {/* Empty State */}
            {cars.length === 0 && (
                <div className="max-w-4xl mx-auto bg-white rounded-[2rem] p-10 text-center shadow-sm">
                    <h2 className="text-3xl font-black text-black">No Cars Found</h2>
                    <p className="text-gray-500 mt-3">You haven't added any cars yet.</p>
                </div>
            )}

            {/* Car Cards */}
            <div className="max-w-4xl mx-auto flex flex-col gap-4">
                {cars.map((car) => (
                    <div
                        key={car._id}
                        className="bg-white rounded-2xl overflow-hidden shadow-sm flex items-center gap-5 p-4"
                    >
                        {/* Car Image */}
                        <div className="relative w-32 h-24 rounded-xl overflow-hidden flex-shrink-0">
                            <Image
                                src={car.image || '/placeholder.svg'}
                                alt={car.carName ?? 'Car image'}
                                fill
                                className="object-cover"
                            />
                        </div>

                        {/* Info */}
                        <div className="flex-1 min-w-0">
                            <h2 className="text-xl font-black text-black truncate">
                                {car.carName}
                            </h2>
                            <p className="text-sm text-gray-500 mt-0.5">
                                {car.carType} · {car.pickupLocation} · ${car.dailyRentPrice}/day
                            </p>
                            <span className={`inline-block mt-2 text-sm font-bold ${
                                car.availability === 'available'
                                    ? 'text-lime-600'
                                    : 'text-red-500'
                            }`}>
                                {car.availability === 'available' ? 'Available' : 'Unavailable'}
                            </span>
                        </div>

                        {/* Action Buttons */}
                        <div className="flex items-center gap-2 flex-shrink-0">
                            <button
                                onClick={() => handleOpenUpdate(car)}
                                className="px-4 py-2 rounded-xl border border-gray-200 text-sm font-bold text-gray-700 hover:bg-gray-50 transition-colors"
                            >
                                Edit
                            </button>
                            <button
                                onClick={() => handleOpenDelete(car)}
                                className="px-4 py-2 rounded-xl border border-red-200 text-sm font-bold text-red-500 hover:bg-red-50 transition-colors"
                            >
                                Delete
                            </button>
                        </div>
                    </div>
                ))}
            </div>

            {/* Update Modal */}
            <Modal isOpen={isUpdateOpen} onOpenChange={setIsUpdateOpen} size="2xl">
                <ModalHeader>Update Car</ModalHeader>
                <ModalBody className="space-y-4">
                    {[
                        { label: 'Price', key: 'dailyRentPrice' },
                        { label: 'Image URL', key: 'image' },
                        { label: 'Car Type', key: 'carType' },
                        { label: 'Pickup Location', key: 'pickupLocation' },
                        { label: 'Availability', key: 'availability' },
                    ].map(({ label, key }) => (
                        <div key={key}>
                            <label className="text-sm font-bold text-gray-700 block mb-1">{label}</label>
                            <input
                                value={formData[key] || ''}
                                onChange={(e) => setFormData({ ...formData, [key]: e.target.value })}
                                className="w-full border-2 border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-black"
                            />
                        </div>
                    ))}
                    <div>
                        <label className="text-sm font-bold text-gray-700 block mb-1">Description</label>
                        <textarea
                            value={formData.description || ''}
                            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                            rows={4}
                            className="w-full border-2 border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-black resize-none"
                        />
                    </div>
                </ModalBody>
                <ModalFooter>
                    <Button variant="light" onPress={() => setIsUpdateOpen(false)}>
                        Cancel
                    </Button>
                    <Button onPress={handleUpdateCar} className="bg-black text-white">
                        Save Changes
                    </Button>
                </ModalFooter>
            </Modal>

            {/* Delete Modal */}
            <Modal isOpen={isDeleteOpen} onOpenChange={setIsDeleteOpen}>
                <ModalHeader>Delete Car</ModalHeader>
                <ModalBody>
                    <p className="text-gray-600">
                        Are you sure you want to delete{' '}
                        <span className="font-bold text-black">{selectedCar?.carName}</span>?
                    </p>
                </ModalBody>
                <ModalFooter>
                    <Button variant="light" onPress={() => setIsDeleteOpen(false)}>
                        Cancel
                    </Button>
                    <Button onPress={handleDeleteCar} className="bg-red-500 text-white">
                        Delete
                    </Button>
                </ModalFooter>
            </Modal>
        </div>
    );
}