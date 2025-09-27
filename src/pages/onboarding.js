import React, { useState } from "react";
import Link from "next/link";

const Onboarding = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    businessName: "",
    businessEmail: "",
    businessPhone: "",
  });

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleNext = () => {
    if (currentStep < 3) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Logo */}
            <div className="flex items-center">
              <div className="flex-shrink-0 flex items-center">
                <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
                  <span className="text-white font-bold text-sm">SC</span>
                </div>
                <span className="ml-2 text-xl font-bold text-gray-900">
                  SiteCraft
                </span>
              </div>
            </div>

            {/* Navigation */}
            <nav className="hidden md:flex space-x-8">
              <Link
                href="/templates"
                className="text-gray-500 hover:text-gray-700 px-3 py-2 rounded-md text-sm font-medium transition-colors"
              >
                Templates
              </Link>
              <Link
                href="/help"
                className="text-gray-500 hover:text-gray-700 px-3 py-2 rounded-md text-sm font-medium transition-colors"
              >
                Help
              </Link>
              <a
                href="/login"
                className="bg-gray-100 text-gray-700 px-4 py-2 rounded-lg text-sm font-medium hover:bg-gray-200 transition-colors"
              >
                Log in
              </a>
            </nav>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8">
          {/* Progress Indicator */}
          <div className="mb-8">
            <div className="flex items-center justify-between mb-4">
              <span className="text-sm font-medium text-gray-600">
                Step {currentStep} of 3
              </span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div
                className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                style={{ width: `${(currentStep / 3) * 100}%` }}
              ></div>
            </div>
          </div>

          {/* Form Content */}
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-4">
              Tell us about your business
            </h1>
          </div>

          {/* Form Fields */}
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Business name
              </label>
              <input
                type="text"
                name="businessName"
                value={formData.businessName}
                onChange={handleInputChange}
                placeholder="e.g., PixelPerfect Designs"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Business email
              </label>
              <input
                type="email"
                name="businessEmail"
                value={formData.businessEmail}
                onChange={handleInputChange}
                placeholder="you@example.com"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Business phone
              </label>
              <input
                type="tel"
                name="businessPhone"
                value={formData.businessPhone}
                onChange={handleInputChange}
                placeholder="(123) 456-7890"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex justify-end mt-8">
            <button
              onClick={handleNext}
              className="bg-blue-600 text-white px-6 py-2 rounded-lg text-sm font-medium hover:bg-blue-700 transition-colors"
            >
              Next
            </button>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Onboarding;
