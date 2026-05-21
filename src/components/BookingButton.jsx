"use client";

import { useState } from "react";
import {
    Button,
    Modal,
    ModalBody,
    ModalFooter,
    ModalHeader,
} from "@heroui/react";
import { useSession, authClient } from "@/lib/auth-client";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

export default function BookingButton({ car }) {
    const [isOpen, setIsOpen] = useState(false);
    const [driverNeeded, setDriverNeeded] = useState("Yes");
    const [specialNote, setSpecialNote] = useState("");
    const { data: session } = useSession();
    const router = useRouter();

    const handleBooking = async () => {
        const { data: jwtData } = await authClient.token();
        const token = jwtData?.token;

        if (!token) {
            toast.error("Authentication failed. Booking could not be placed.");
            return;
        }

        const finalBooking = {
            driverNeeded,
            specialNote,
            userId: session?.user?.id,
            userName: session?.user?.name,
            userEmail: session?.user?.email,
            carName: car?.carName,
            carImage: car?.image,
            price: car?.dailyRentPrice,
        };

        try {
            // ✅ PATCH /explore/:exploreId — backend এর route এর সাথে মিলছে
            const res = await fetch(
                `${process.env.NEXT_PUBLIC_API_URL}/explore/${car?._id}`,
                {
                    method: "PATCH",
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${token}`,
                    },
                    body: JSON.stringify(finalBooking),
                }
            );

            const data = await res.json();

            if (!res.ok) {
                toast.error(data.message || "Booking failed");
                return;
            }

            toast.success("Car booked successfully!");
            setIsOpen(false);
            router.push("/my-bookings");
        } catch {
            toast.error("Something went wrong");
        }
    };

    return (
        <>
            <Button
                onPress={() => setIsOpen(true)}
                className="w-full mt-6 h-14 rounded-2xl bg-lime-400 text-black text-lg font-black"
            >
                Book Now
            </Button>

            <Modal isOpen={isOpen} onOpenChange={setIsOpen} size="2xl">
                <ModalHeader>Book Car</ModalHeader>
                <ModalBody>
                    <div>
                        <label className="font-bold mb-2 block">Driver Needed?</label>
                        <select
                            value={driverNeeded}
                            onChange={(e) => setDriverNeeded(e.target.value)}
                            className="w-full border-2 border-gray-200 rounded-2xl px-4 py-3"
                        >
                            <option value="Yes">Yes</option>
                            <option value="No">No</option>
                        </select>
                    </div>
                    <div className="mt-4">
                        <label className="font-bold mb-2 block">Special Note</label>
                        <textarea
                            value={specialNote}
                            onChange={(e) => setSpecialNote(e.target.value)}
                            placeholder="Write your note..."
                            rows={5}
                            className="w-full border-2 border-gray-200 rounded-2xl px-4 py-3 resize-none focus:outline-none focus:border-lime-400"
                        />
                    </div>
                </ModalBody>
                <ModalFooter>
                    <Button variant="light" onPress={() => setIsOpen(false)}>
                        Cancel
                    </Button>
                    <Button onPress={handleBooking} className="bg-black text-white">
                        Book Now
                    </Button>
                </ModalFooter>
            </Modal>
        </>
    );
}