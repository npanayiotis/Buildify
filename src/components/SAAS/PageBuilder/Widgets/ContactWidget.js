import React from "react";

const ContactWidget = ({ data, isSelected, onUpdate }) => {
  const handleUpdate = (field, value) => {
    onUpdate({ [field]: value });
  };

  return (
    <div className="py-12">
      <div className="max-w-4xl mx-auto px-4">
        {isSelected ? (
          <div className="space-y-4 p-6 border-2 border-dashed border-gray-300 rounded-lg">
            <h3 className="text-lg font-semibold text-gray-900">Contact Form Widget</h3>
            <div className="grid grid-cols-2 gap-4">
              <input
                type="text"
                value={data.title || ""}
                onChange={(e) => handleUpdate("title", e.target.value)}
                className="px-3 py-2 border border-gray-300 rounded-lg text-sm"
                placeholder="Section title"
              />
              <input
                type="email"
                value={data.email || ""}
                onChange={(e) => handleUpdate("email", e.target.value)}
                className="px-3 py-2 border border-gray-300 rounded-lg text-sm"
                placeholder="Contact email"
              />
            </div>
          </div>
        ) : (
          <div className="text-center">
            <h2 className="text-3xl font-bold text-gray-900 mb-8">
              {data.title || "Get In Touch"}
            </h2>
            <div className="max-w-md mx-auto">
              <form className="space-y-4">
                <input
                  type="text"
                  placeholder="Your Name"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
                <input
                  type="email"
                  placeholder="Your Email"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
                <textarea
                  placeholder="Your Message"
                  rows="4"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
                ></textarea>
                <button
                  type="submit"
                  className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition-colors font-medium"
                >
                  Send Message
                </button>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ContactWidget;
