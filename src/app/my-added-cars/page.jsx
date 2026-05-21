'use client';

import { useEffect, useState } from 'react';

import Image from 'next/image';

import {
    Button,
    Modal,
    ModalBody,
    ModalFooter,
    ModalHeader,
    Input,
    TextArea,
} from '@heroui/react';

import {
    MapPin,
    Users,
    Pencil,
    Trash2,
} from 'lucide-react';

import toast from 'react-hot-toast';

export default function MyAddedCarsPage() {

    const [cars, setCars] = useState([]);

    const [selectedCar, setSelectedCar] = useState(null);

    const [isUpdateOpen, setIsUpdateOpen] = useState(false);

    const [isDeleteOpen, setIsDeleteOpen] = useState(false);

    // Fetch Cars
    useEffect(() => {

        const fetchCars = async () => {

            try {

                const res = await fetch(
                    `${process.env.NEXT_PUBLIC_API_URL}/explore`
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

        setIsUpdateOpen(true);
    };

    // Open Delete Modal
    const handleOpenDelete = (car) => {

        setSelectedCar(car);

        setIsDeleteOpen(true);
    };

    // Update Car
    const handleUpdateCar = async (e) => {

        e.preventDefault();

        const formData = new FormData(e.currentTarget);

        const updatedData = Object.fromEntries(formData.entries());

        try {

            const res = await fetch(
                `${process.env.NEXT_PUBLIC_API_URL}/explore/${selectedCar._id}`,
                {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(updatedData),
                }
            );

            const data = await res.json();

            if (!res.ok) {
                toast.error(data.message || 'Update failed');
                return;
            }

            toast.success('Car updated successfully');

            // Update UI
            const updatedCars = cars.map((car) =>
                car._id === selectedCar._id
                    ? { ...car, ...updatedData }
                    : car
            );

            setCars(updatedCars);

            setIsUpdateOpen(false);

        } catch (error) {

            toast.error('Something went wrong');
        }
    };

    // Delete Car
    const handleDeleteCar = async () => {

        try {

            const res = await fetch(
                `${process.env.NEXT_PUBLIC_API_URL}/explore/${selectedCar._id}`,
                {
                    method: 'DELETE',
                }
            );

            const data = await res.json();

            if (!res.ok) {
                toast.error(data.message || 'Delete failed');
                return;
            }

            toast.success('Car deleted successfully');

            const remainingCars = cars.filter(
                (car) => car._id !== selectedCar._id
            );

            setCars(remainingCars);

            setIsDeleteOpen(false);

        } catch (error) {

            toast.error('Something went wrong');
        }
    };

    return (
        <div className="min-h-screen bg-[#f7f4ed] py-10 px-4">

            {/* Heading */}
            <div className="max-w-7xl mx-auto mb-10">

                <p className="uppercase tracking-[5px] text-sm font-black text-lime-700">
                    Dashboard
                </p>

                <h1 className="text-5xl md:text-7xl font-black text-black mt-3">
                    My Added Cars
                </h1>

                <p className="text-gray-500 mt-4 text-lg">
                    Manage your listed cars easily.
                </p>
            </div>

            {/* Cards */}
            <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">

                {cars.map((car) => (

                    <div
                        key={car._id}
                        className="bg-white rounded-[2rem] overflow-hidden shadow-sm"
                    >

                        {/* Image */}
                        <div className="relative h-64">

                            <Image
                                src={car.image || '/placeholder.svg'}
                                alt={car.carName ?? 'Car image'}
                                width={400}
                                height={300}
                                className="object-cover"
                            />
                        </div>

                        {/* Content */}
                        <div className="p-6">

                            <p className="uppercase tracking-[4px] text-xs font-black text-lime-700">
                                {car.carType}
                            </p>

                            <h2 className="text-3xl font-black text-black mt-2">
                                {car.carName}
                            </h2>

                            <div className="flex items-end gap-2 mt-4">

                                <h3 className="text-4xl font-black text-black">
                                    ${car.dailyRentPrice}
                                </h3>

                                <span className="text-gray-500 mb-1">
                                    / day
                                </span>
                            </div>

                            {/* Info */}
                            <div className="space-y-3 mt-6">

                                <div className="flex items-center gap-2 text-gray-700">

                                    <Users className="w-4 h-4" />

                                    <span>
                                        {car.seatCapacity} Seats
                                    </span>
                                </div>

                                <div className="flex items-center gap-2 text-gray-700">

                                    <MapPin className="w-4 h-4" />

                                    <span>
                                        {car.pickupLocation}
                                    </span>
                                </div>
                            </div>

                            {/* Status */}
                            <div className="mt-6">

                                <span className={`px-4 py-2 rounded-full text-sm font-bold ${
                                    car.availability === 'available'
                                        ? 'bg-lime-100 text-lime-700'
                                        : 'bg-red-100 text-red-600'
                                }`}>
                                    {car.availability}
                                </span>
                            </div>

                            {/* Buttons */}
                            <div className="flex gap-3 mt-8">

                                {/* Update */}
                                <Button
                                    onPress={() => handleOpenUpdate(car)}
                                    className="flex-1 h-12 rounded-2xl bg-black text-white font-bold"
                                >
                                    <Pencil className="w-4 h-4" />

                                    Update
                                </Button>

                                {/* Delete */}
                                <Button
                                    onPress={() => handleOpenDelete(car)}
                                    className="flex-1 h-12 rounded-2xl bg-red-500 text-white font-bold"
                                >
                                    <Trash2 className="w-4 h-4" />

                                    Delete
                                </Button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {/* Update Modal */}
            <Modal
                isOpen={isUpdateOpen}
                onOpenChange={setIsUpdateOpen}
                size="2xl"
            >

                <ModalHeader>
                    Update Car
                </ModalHeader>

                <form onSubmit={handleUpdateCar}>

                    <ModalBody className="space-y-4">

                        <Input
                            label="Price"
                            name="dailyRentPrice"
                            defaultValue={selectedCar?.dailyRentPrice?.toString()}
                        />

                        <Input
                            label="Image URL"
                            name="image"
                            defaultValue={selectedCar?.image}
                        />

                        <Input
                            label="Car Type"
                            name="carType"
                            defaultValue={selectedCar?.carType}
                        />

                        <Input
                            label="Pickup Location"
                            name="pickupLocation"
                            defaultValue={selectedCar?.pickupLocation}
                        />

                        <Input
                            label="Availability"
                            name="availability"
                            defaultValue={selectedCar?.availability}
                        />

                        <TextArea
                            label="Description"
                            name="description"
                            defaultValue={selectedCar?.description}
                            rows={5}
                        />

                    </ModalBody>

                    <ModalFooter>

                        <Button
                            variant="light"
                            onPress={() => setIsUpdateOpen(false)}
                        >
                            Cancel
                        </Button>

                        <Button
                            type="submit"
                            className="bg-black text-white"
                        >
                            Save Changes
                        </Button>

                    </ModalFooter>

                </form>

            </Modal>

            {/* Delete Modal */}
            <Modal
                isOpen={isDeleteOpen}
                onOpenChange={setIsDeleteOpen}
            >

                <ModalHeader>
                    Delete Car
                </ModalHeader>

                <ModalBody>

                    <p className="text-gray-600">
                        Are you sure you want to delete this car listing?
                    </p>

                </ModalBody>

                <ModalFooter>

                    <Button
                        variant="light"
                        onPress={() => setIsDeleteOpen(false)}
                    >
                        Cancel
                    </Button>

                    <Button
                        onPress={handleDeleteCar}
                        className="bg-red-500 text-white"
                    >
                        Delete
                    </Button>

                </ModalFooter>

            </Modal>
        </div>
    );
}