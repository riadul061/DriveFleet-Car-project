import { CheckCircle } from "lucide-react";

const PricingSection = async () => {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/Pricing`,
    { cache: "no-store" }
  );

  const plans = await res.json();

  return (
    <section className="py-24 bg-[#fff7f7]">
      <div className="max-w-7xl mx-auto px-6 lg:px-10">
        {/* Heading */}
        <div className="text-center max-w-3xl mx-auto">
          <p className="inline-block bg-red-100 text-red-500 px-4 py-1 rounded-full text-sm font-medium">
            Pricing
          </p>

          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mt-5">
            Choose The Plan That Fits You
          </h2>

          <p className="text-gray-500 text-lg mt-5">
            Flexible pricing plans designed to scale with your business needs.
          </p>
        </div>

        {/* Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-16">
          {plans.map((plan) => (
            <div
              key={plan.id}
              className={`rounded-3xl p-8 border transition duration-300 ${
                plan.active
                  ? "bg-[#1f2a44] text-white shadow-2xl scale-105"
                  : "bg-white"
              }`}
            >
              <h3 className="text-2xl font-bold">{plan.name}</h3>

              <div className="mt-6 flex items-end gap-1">
                <h2 className="text-5xl font-bold">${plan.price}</h2>
                <span
                  className={`mb-1 ${
                    plan.active ? "text-gray-300" : "text-gray-500"
                  }`}
                >
                  /Month
                </span>
              </div>

              <p
                className={`mt-4 ${
                  plan.active ? "text-gray-300" : "text-gray-500"
                }`}
              >
                {plan.description}
              </p>

              {/* Features */}
              <div className="space-y-4 mt-8">
                {plan.features.map((feature, index) => (
                  <div key={index} className="flex items-center gap-3">
                    <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0" />
                    <span
                      className={
                        plan.active ? "text-gray-200" : "text-gray-600"
                      }
                    >
                      {feature}
                    </span>
                  </div>
                ))}
              </div>

              {/* Button */}
              <button
                className={`w-full mt-10 py-4 rounded-2xl font-medium transition duration-300 ${
                  plan.active
                    ? "bg-white text-black hover:bg-gray-200"
                    : "bg-red-500 text-white hover:bg-red-600"
                }`}
              >
                Choose Plan
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PricingSection;
 