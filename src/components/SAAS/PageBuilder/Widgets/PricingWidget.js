import React from "react";

const PricingWidget = ({ data, isSelected, onUpdate }) => {
  const handleUpdate = (field, value) => {
    onUpdate({ [field]: value });
  };

  return (
    <div className="py-12 bg-gray-50">
      <div className="max-w-6xl mx-auto px-4">
        {isSelected ? (
          <div className="space-y-4 p-6 border-2 border-dashed border-gray-300 rounded-lg bg-white">
            <h3 className="text-lg font-semibold text-gray-900">Pricing Table Widget</h3>
            <input
              type="text"
              value={data.title || ""}
              onChange={(e) => handleUpdate("title", e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm"
              placeholder="Section title"
            />
          </div>
        ) : (
          <div className="text-center">
            <h2 className="text-3xl font-bold text-gray-900 mb-8">
              {data.title || "Choose Your Plan"}
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                { name: "Basic", price: "$9", features: ["Feature 1", "Feature 2"] },
                { name: "Pro", price: "$19", features: ["Feature 1", "Feature 2", "Feature 3"], popular: true },
                { name: "Enterprise", price: "$49", features: ["All Features", "Priority Support"] }
              ].map((plan, index) => (
                <div
                  key={index}
                  className={`bg-white p-8 rounded-lg shadow-sm ${
                    plan.popular ? "ring-2 ring-blue-500 relative" : ""
                  }`}
                >
                  {plan.popular && (
                    <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                      <span className="bg-blue-500 text-white px-4 py-1 rounded-full text-sm font-medium">
                        Popular
                      </span>
                    </div>
                  )}
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">{plan.name}</h3>
                  <div className="text-4xl font-bold text-gray-900 mb-4">{plan.price}</div>
                  <ul className="space-y-2 mb-6">
                    {plan.features.map((feature, i) => (
                      <li key={i} className="flex items-center text-gray-600">
                        <span className="text-green-500 mr-2">✓</span>
                        {feature}
                      </li>
                    ))}
                  </ul>
                  <button
                    className={`w-full py-3 rounded-lg font-medium transition-colors ${
                      plan.popular
                        ? "bg-blue-600 text-white hover:bg-blue-700"
                        : "bg-gray-100 text-gray-900 hover:bg-gray-200"
                    }`}
                  >
                    Get Started
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default PricingWidget;
