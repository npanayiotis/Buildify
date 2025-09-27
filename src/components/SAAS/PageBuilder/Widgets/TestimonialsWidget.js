import React from "react";

const TestimonialsWidget = ({ data, isSelected, onUpdate }) => {
  const handleUpdate = (field, value) => {
    onUpdate({ [field]: value });
  };

  return (
    <div className="py-12 bg-gray-50">
      <div className="max-w-6xl mx-auto px-4">
        {isSelected ? (
          <div className="space-y-4 p-6 border-2 border-dashed border-gray-300 rounded-lg bg-white">
            <h3 className="text-lg font-semibold text-gray-900">Testimonials Widget</h3>
            <p className="text-sm text-gray-600">Configure your testimonials section</p>
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
              {data.title || "What Our Customers Say"}
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[1, 2, 3].map((i) => (
                <div key={i} className="bg-white p-6 rounded-lg shadow-sm">
                  <p className="text-gray-600 mb-4">
                    &quot;This is a placeholder testimonial. Replace with real customer feedback.&quot;
                  </p>
                  <div className="flex items-center">
                    <div className="w-12 h-12 bg-gray-300 rounded-full mr-4"></div>
                    <div>
                      <p className="font-semibold text-gray-900">Customer {i}</p>
                      <p className="text-sm text-gray-600">Role</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default TestimonialsWidget;
