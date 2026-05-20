import { Button } from "@heroui/react";
import Image from "next/image";
import Link from "next/link";

const CarSection = async () => {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/cars`,
    { cache: "no-store" }
  );

  const cars = await res.json();
  const topCars = cars.slice(0, 6);

  return (
    <section className="py-12 px-6">
      <h2 className="text-3xl font-bold text-center mb-8">
               Available Cars Section
                {/* ✅ Fix #1: matches actual data */}
      </h2>

      <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-6">
        {topCars.map((car) => (
          <div
            key={car._id} // ✅ Fix #2: MongoDB uses _id
            className="border rounded-xl shadow hover:shadow-lg transition overflow-hidden"
          >
            <Image
              src={car.image}
              alt={car.name}
              width={400}
              height={300}
              className="h-48 w-full object-cover"
            />

            <div className="p-4">
              <h3 className="font-bold text-lg">{car.name}</h3>

              {/* ✅ Fix #4: use actual fields from your data */}
              <p className="text-sm text-gray-500">{car.fuel} · {car.seats} seats</p>
              <p className="text-sm text-gray-400">{car.speed}</p>

              <p className="text-green-700 font-semibold mt-2">
                $ {car.price} / day
              </p>

              {/* ✅ Fix #2: use _id for MongoDB */}
              <Link href={`/explore-cars/${car._id}`}>
                <Button className="mt-3 w-full bg-green-700 text-white hover:bg-green-800">
                  View Details
                </Button>
              </Link>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default CarSection;