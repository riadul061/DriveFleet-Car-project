import Image from "next/image";
import Link from "next/link";

const Banner = () => {
  return (
    <section className="relative bg-black overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0">
        <Image
          src="https://images.unsplash.com/photo-1503376780353-7e6692767b70?q=80&w=2070&auto=format&fit=crop"
          alt="Luxury Car"
          fill
          priority
          className="object-cover opacity-50"
        />
      </div>

      {/* Overlay */}
      <div className="absolute inset-0 bg-black/60"></div>

      {/* Content */}
      <div className="relative max-w-7xl mx-auto px-6 lg:px-10 py-28 lg:py-40">
        <div className="max-w-2xl">
          <p className="text-green-400 font-semibold uppercase tracking-widest mb-4">
            Drive with Confidence
          </p>

          <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-white leading-tight">
            DriveFleet Car<br/> Rental Platform
          </h1>

          <p className="text-gray-300 text-lg mt-6 leading-relaxed">
            DriveFleet is a modern car rental platform that helps users easily explore,
            book, and manage premium vehicles for comfortable and reliable travel anytime, anywhere.
          </p>

          <Link
            href="/explore-cars"
            className="inline-block mt-10 bg-green-500 hover:bg-green-600 text-white font-medium px-8 py-4 rounded-full transition duration-300"
          >
            Explore Cars
          </Link>
        </div>
      </div>
    </section>
  );
};

export default Banner;