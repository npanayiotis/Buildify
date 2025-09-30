import React, { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Check, Crown, Zap, Star } from "lucide-react";
import {
  PRICING_PLANS,
  EXTRA_SERVICES,
} from "../lib/saas/websites/websiteData";

const PricingPage = () => {
  const [billingCycle, setBillingCycle] = useState("monthly");
  const [isAnnual, setIsAnnual] = useState(false);

  const handleBillingToggle = () => {
    setIsAnnual(!isAnnual);
    setBillingCycle(isAnnual ? "monthly" : "annual");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-purple-50">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-md shadow-lg border-b border-blue-200/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Logo */}
            <div className="flex items-center">
              <div className="flex-shrink-0 flex items-center">
                <div className="w-8 h-8 gradient-primary rounded-lg flex items-center justify-center glow-blue">
                  <span className="text-white font-bold text-sm">SC</span>
                </div>
                <span className="ml-2 text-xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                  Buildify
                </span>
              </div>
            </div>

            {/* Navigation */}
            <nav className="hidden md:flex space-x-8">
              <Link
                href="/dashboard"
                className="text-gray-500 hover:text-blue-600 hover:bg-blue-50/50 px-3 py-2 rounded-md text-sm font-medium transition-all duration-300 hover:shadow-md"
              >
                Dashboard
              </Link>
              <Link
                href="/templates"
                className="text-gray-500 hover:text-blue-600 hover:bg-blue-50/50 px-3 py-2 rounded-md text-sm font-medium transition-all duration-300 hover:shadow-md"
              >
                Templates
              </Link>
              <Link
                href="/pricing"
                className="gradient-primary text-white px-3 py-2 rounded-md text-sm font-medium shadow-lg glow-blue"
              >
                Pricing
              </Link>
              <Link
                href="/help"
                className="text-gray-500 hover:text-blue-600 hover:bg-blue-50/50 px-3 py-2 rounded-md text-sm font-medium transition-all duration-300 hover:shadow-md"
              >
                Help
              </Link>
            </nav>

            {/* User Actions */}
            <div className="flex items-center space-x-4">
              <button className="gradient-primary text-white px-4 py-2 rounded-lg text-sm font-medium hover:shadow-lg glow-blue transition-all duration-300 hover:scale-105">
                Start Building
              </button>
              <div className="w-8 h-8 gradient-secondary rounded-full flex items-center justify-center glow-purple">
                <span className="text-sm font-medium text-white">👤</span>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="space-y-16">
          {/* Page Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center"
          >
            <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-6">
              Simple, Transparent Pricing
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
              One-time payment for your website + monthly hosting & support. No
              hidden fees, no surprises.
            </p>

            {/* Pricing Notice */}
            <div className="bg-gradient-to-r from-green-50 to-blue-50 border border-green-200 rounded-lg p-6 mb-8 max-w-2xl mx-auto">
              <div className="flex items-center justify-center mb-2">
                <Star className="w-5 h-5 text-green-600 mr-2" />
                <span className="text-lg font-semibold text-green-800">
                  Competitive Pricing
                </span>
              </div>
              <p className="text-green-700 text-center">
                Pay once for your website, then just €39.99/month for hosting,
                support, and updates.
              </p>
            </div>
          </motion.div>

          {/* Pricing Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {PRICING_PLANS.map((plan, index) => (
              <motion.div
                key={plan.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className={`relative bg-white rounded-2xl shadow-lg border-2 transition-all duration-300 hover:shadow-xl ${
                  plan.popular
                    ? "border-blue-500 scale-105"
                    : "border-gray-200 hover:border-gray-300"
                }`}
              >
                {plan.popular && (
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                    <span className="inline-flex items-center px-4 py-1 rounded-full text-sm font-medium bg-gradient-to-r from-blue-500 to-purple-500 text-white">
                      <Star className="w-4 h-4 mr-1" />
                      Most Popular
                    </span>
                  </div>
                )}

                <div className="p-8">
                  {/* Plan Header */}
                  <div className="text-center mb-8">
                    <div className="flex items-center justify-center mb-4">
                      {plan.id === "starter" && (
                        <Zap className="w-8 h-8 text-yellow-500" />
                      )}
                      {plan.id === "professional" && (
                        <Star className="w-8 h-8 text-blue-500" />
                      )}
                      {plan.id === "business" && (
                        <Crown className="w-8 h-8 text-purple-500" />
                      )}
                      {plan.id === "enterprise" && (
                        <Crown className="w-8 h-8 text-yellow-600" />
                      )}
                    </div>
                    <h3 className="text-2xl font-bold text-gray-900 mb-2">
                      {plan.name}
                    </h3>
                    <p className="text-gray-600 text-sm mb-4">
                      {plan.description}
                    </p>
                    <div className="mb-4">
                      <div className="flex items-baseline justify-center">
                        <span className="text-4xl font-bold text-gray-900">
                          €{plan.price}
                        </span>
                        <span className="text-gray-600 ml-1">one-time</span>
                      </div>
                      <div className="mt-2">
                        <span className="text-lg font-semibold text-blue-600">
                          + €{plan.monthlySupport}/month
                        </span>
                        <span className="text-gray-600 text-sm block">
                          hosting & support
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Features */}
                  <div className="space-y-4 mb-8">
                    {plan.features.map((feature, featureIndex) => (
                      <div key={featureIndex} className="flex items-start">
                        <Check className="w-5 h-5 text-green-500 mt-0.5 mr-3 flex-shrink-0" />
                        <span className="text-gray-700 text-sm">
                          {typeof feature === "string"
                            ? feature
                            : feature.title || feature}
                        </span>
                      </div>
                    ))}
                  </div>

                  {/* CTA Button */}
                  <button
                    className={`w-full py-3 px-6 rounded-lg font-medium transition-all duration-300 ${
                      plan.popular
                        ? "bg-gradient-to-r from-blue-600 to-purple-600 text-white hover:shadow-lg hover:scale-105"
                        : "bg-blue-600 text-white hover:bg-blue-700"
                    }`}
                  >
                    Choose {plan.name}
                  </button>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Extra Services Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="text-center"
          >
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Extra Services
            </h2>
            <p className="text-xl text-gray-600 mb-12 max-w-3xl mx-auto">
              Add professional services to enhance your website and save time
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {EXTRA_SERVICES.map((service, index) => (
                <motion.div
                  key={service.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className={`relative bg-white rounded-xl shadow-lg border-2 transition-all duration-300 hover:shadow-xl ${
                    service.popular
                      ? "border-blue-500"
                      : "border-gray-200 hover:border-gray-300"
                  }`}
                >
                  {service.popular && (
                    <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                      <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-blue-500 text-white">
                        Popular
                      </span>
                    </div>
                  )}

                  <div className="p-6">
                    {/* Service Header */}
                    <div className="text-center mb-6">
                      <h3 className="text-xl font-bold text-gray-900 mb-2">
                        {service.name}
                      </h3>
                      <p className="text-gray-600 text-sm mb-4">
                        {service.description}
                      </p>
                      <div className="mb-4">
                        <span className="text-3xl font-bold text-gray-900">
                          €{service.price}
                        </span>
                        {service.period && (
                          <span className="text-gray-600">
                            /{service.period}
                          </span>
                        )}
                      </div>
                      <div className="text-sm text-blue-600 font-medium">
                        {service.estimatedTime}
                      </div>
                    </div>

                    {/* Features */}
                    <div className="space-y-3 mb-6">
                      {service.features
                        .slice(0, 4)
                        .map((feature, featureIndex) => (
                          <div key={featureIndex} className="flex items-start">
                            <Check className="w-4 h-4 text-green-500 mt-0.5 mr-2 flex-shrink-0" />
                            <span className="text-gray-700 text-sm">
                              {feature}
                            </span>
                          </div>
                        ))}
                      {service.features.length > 4 && (
                        <div className="text-sm text-gray-500 text-center">
                          +{service.features.length - 4} more features
                        </div>
                      )}
                    </div>

                    {/* CTA Button */}
                    <button
                      className={`w-full py-2 px-4 rounded-lg font-medium transition-all duration-300 ${
                        service.popular
                          ? "bg-gradient-to-r from-blue-600 to-purple-600 text-white hover:shadow-lg"
                          : "bg-gray-100 text-gray-900 hover:bg-gray-200"
                      }`}
                    >
                      Add to Cart
                    </button>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* FAQ Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="text-center"
          >
            <h2 className="text-3xl font-bold text-gray-900 mb-8">
              Frequently Asked Questions
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
              <div className="text-left">
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  What&apos;s included in the monthly fee?
                </h3>
                <p className="text-gray-600">
                  The €39.99/month includes hosting, SSL certificates, regular
                  backups, security updates, and email support. No hidden fees.
                </p>
              </div>
              <div className="text-left">
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  Can I cancel the monthly support?
                </h3>
                <p className="text-gray-600">
                  Yes, you can cancel anytime. Your website will remain live,
                  but you&apos;ll lose hosting, updates, and support services.
                </p>
              </div>
              <div className="text-left">
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  Do you set up my custom domain?
                </h3>
                <p className="text-gray-600">
                  Yes! Our domain setup service (€49) includes DNS
                  configuration, SSL setup, and email forwarding. We handle
                  everything.
                </p>
              </div>
              <div className="text-left">
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  What payment methods do you accept?
                </h3>
                <p className="text-gray-600">
                  We accept all major credit cards, PayPal, SEPA bank transfers,
                  and cryptocurrency for the one-time payment.
                </p>
              </div>
              <div className="text-left">
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  How long does it take to get my website?
                </h3>
                <p className="text-gray-600">
                  Your website is ready in 24-48 hours after payment. Custom
                  domains and extra services may take 3-7 business days.
                </p>
              </div>
              <div className="text-left">
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  Do you offer refunds?
                </h3>
                <p className="text-gray-600">
                  Yes, we offer a 30-day money-back guarantee. If you&apos;re
                  not satisfied, we&apos;ll refund your one-time payment.
                </p>
              </div>
            </div>
          </motion.div>

          {/* CTA Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7 }}
            className="text-center bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl p-12 text-white"
          >
            <h2 className="text-3xl font-bold mb-4">
              Ready to Get Your Professional Website?
            </h2>
            <p className="text-xl mb-8 opacity-90">
              Join hundreds of businesses who chose our competitive pricing and
              professional service
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/templates"
                className="inline-flex items-center px-8 py-3 bg-white text-blue-600 font-medium rounded-lg hover:bg-gray-100 transition-colors"
              >
                Browse Templates
              </Link>
              <Link
                href="/dashboard"
                className="inline-flex items-center px-8 py-3 bg-white/20 text-white font-medium rounded-lg hover:bg-white/30 transition-colors border border-white/30"
              >
                Start Building
              </Link>
            </div>
          </motion.div>
        </div>
      </main>
    </div>
  );
};

export default PricingPage;
