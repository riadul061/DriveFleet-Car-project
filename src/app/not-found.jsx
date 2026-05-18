import Link from "next/link";

const NotFound = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-6">
      <div className="text-center">
        <h1 className="text-8xl font-bold text-green-500">
          404
        </h1>

        <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mt-4">
          Oops! Page Not Found
        </h2>

        <p className="text-gray-500 text-lg mt-4 max-w-xl mx-auto">
          The page you are looking for might have been removed,
          renamed, or is temporarily unavailable.
        </p>

        <Link
          href="/"
          className="inline-block mt-8 bg-green-500 hover:bg-green-600 text-white px-8 py-4 rounded-full font-medium transition duration-300"
        >
          Back to Home
        </Link>
      </div>
    </div>
  );
};

export default NotFound;