/**
 * Publish Page
 * Cart-like interface for publishing websites
 */

import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { motion, AnimatePresence } from "framer-motion";
import { useDispatch, useSelector } from "react-redux";
import Head from "next/head";
import {
  ShoppingCart,
  Globe,
  CreditCard,
  CheckCircle,
  ArrowRight,
  ArrowLeft,
  X,
  AlertCircle,
  Loader,
  ExternalLink,
  Settings,
  DollarSign,
  Palette,
  Plus,
  Minus,
} from "lucide-react";

// Redux imports
import {
  selectCurrentStep,
  selectSteps,
  selectCart,
  selectCartTotal,
  selectCanProceedToNext,
  selectCurrentStepIndex,
  selectSelectedTemplate,
  selectSelectedServices,
  selectSelectedDomain,
  selectDomainType,
  selectCustomDomain,
  selectDomainValidation,
  selectPaymentMethod,
  selectIsPublishing,
  selectPublishProgress,
  selectPublishStatus,
  selectPricing,
  goToStep,
  nextStep,
  previousStep,
  selectTemplate,
  addService,
  removeService,
  setDomainType,
  setCustomDomain,
  validateDomain,
  setPaymentMethod,
  finalizePublishing,
} from "../store/slices/publishSlice";

// Import website data
import { WEBSITES, EXTRA_SERVICES } from "../lib/saas/websites/websiteData";

import { useAuth } from "../contexts/AuthContext";

// ========================================
// COMPONENT
// ========================================

export default function PublishPage() {
  const router = useRouter();
  const dispatch = useDispatch();
  const { isAuthenticated, isAdmin, isRegularUser } = useAuth();

  // Redux state
  const currentStep = useSelector(selectCurrentStep);
  const steps = useSelector(selectSteps);
  const cart = useSelector(selectCart);
  const cartTotal = useSelector(selectCartTotal);
  const canProceedToNext = useSelector(selectCanProceedToNext);
  const currentStepIndex = useSelector(selectCurrentStepIndex);
  const selectedTemplate = useSelector(selectSelectedTemplate);
  const selectedServices = useSelector(selectSelectedServices);
  const selectedDomain = useSelector(selectSelectedDomain);
  const domainType = useSelector(selectDomainType);
  const customDomain = useSelector(selectCustomDomain);
  const domainValidation = useSelector(selectDomainValidation);
  const paymentMethod = useSelector(selectPaymentMethod);
  const isPublishing = useSelector(selectIsPublishing);
  const publishProgress = useSelector(selectPublishProgress);
  const publishStatus = useSelector(selectPublishStatus);
  const pricing = useSelector(selectPricing);

  // Local state
  const [domainInput, setDomainInput] = useState(customDomain);
  const [paymentDetails, setPaymentDetails] = useState({
    cardNumber: "",
    expiryDate: "",
    cvv: "",
    name: "",
  });

  // Redirect if not authenticated or if user is admin
  useEffect(() => {
    if (!isAuthenticated()) {
      router.push("/auth");
    } else if (isAdmin()) {
      // Redirect admin users to dashboard since they can't access publish
      router.push("/dashboard");
    }
  }, [isAuthenticated, isAdmin, router]);

  // Initialize cart if empty
  useEffect(() => {
    if (cart.length === 0 && router.query.websiteId) {
      // Find the website template
      const website = WEBSITES.find((w) => w.id === router.query.websiteId);
      if (website) {
        // Select the template and add to cart
        dispatch(selectTemplate(website));
      }
    }
  }, [cart.length, router.query.websiteId, dispatch]);

  // ========================================
  // HANDLERS
  // ========================================

  const handleNextStep = () => {
    if (canProceedToNext) {
      dispatch(nextStep());
    }
  };

  const handlePreviousStep = () => {
    dispatch(previousStep());
  };

  const handleDomainTypeChange = (type) => {
    dispatch(setDomainType(type));
  };

  const handleDomainInputChange = (value) => {
    setDomainInput(value);
    dispatch(setCustomDomain(value));
  };

  const handleValidateDomain = () => {
    if (domainInput.trim()) {
      dispatch(validateDomain(domainInput.trim()));
    }
  };

  const handlePaymentMethodSelect = (method) => {
    dispatch(setPaymentMethod(method));
  };

  const handleFinalizePublishing = () => {
    const publishData = {
      cart,
      domain: domainType === "custom" ? customDomain : selectedDomain,
      domainType,
      paymentMethod,
      paymentDetails,
    };

    dispatch(finalizePublishing(publishData));
  };

  // ========================================
  // RENDER HELPERS
  // ========================================

  const renderStepIndicator = () => (
    <div className="flex items-center justify-center mb-8">
      <div className="flex items-center space-x-4">
        {steps.map((step, index) => (
          <div key={step.id} className="flex items-center">
            <motion.div
              className={`w-10 h-10 rounded-full flex items-center justify-center font-semibold transition-all duration-300 ${
                index <= currentStepIndex
                  ? "bg-gradient-to-r from-purple-600 to-blue-600 text-white"
                  : "bg-gray-200 text-gray-500"
              }`}
              whileHover={{ scale: 1.05 }}
            >
              {step.completed ? <CheckCircle className="w-5 h-5" /> : index + 1}
            </motion.div>

            <div className="ml-3">
              <p
                className={`text-sm font-medium ${
                  index <= currentStepIndex ? "text-gray-900" : "text-gray-500"
                }`}
              >
                {step.title}
              </p>
            </div>

            {index < steps.length - 1 && (
              <ArrowRight className="w-5 h-5 text-gray-400 mx-4" />
            )}
          </div>
        ))}
      </div>
    </div>
  );

  const renderTemplateStep = () => (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      className="bg-white rounded-2xl shadow-lg p-8"
    >
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-gray-900">
          Select Your Template
        </h2>
        <Palette className="w-8 h-8 text-purple-600" />
      </div>

      <p className="text-gray-600 mb-8">
        Choose the perfect template for your website. All templates include
        hosting and support.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {WEBSITES.map((website) => (
          <motion.div
            key={website.id}
            className={`relative p-6 rounded-xl border-2 cursor-pointer transition-all duration-300 ${
              selectedTemplate?.id === website.id
                ? "border-purple-500 bg-purple-50"
                : "border-gray-200 hover:border-purple-300 hover:shadow-lg"
            }`}
            onClick={() => dispatch(selectTemplate(website))}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            {selectedTemplate?.id === website.id && (
              <div className="absolute top-3 right-3 w-6 h-6 bg-purple-500 rounded-full flex items-center justify-center">
                <CheckCircle className="w-4 h-4 text-white" />
              </div>
            )}

            <div className="aspect-video bg-gray-200 rounded-lg mb-4 overflow-hidden">
              <img
                src={website.preview}
                alt={website.name}
                className="w-full h-full object-cover"
              />
            </div>

            <h3 className="font-bold text-lg text-gray-900 mb-2">
              {website.name}
            </h3>
            <p className="text-gray-600 text-sm mb-4 line-clamp-2">
              {website.description}
            </p>

            <div className="flex items-center justify-between">
              <span className="text-2xl font-bold text-purple-600">€399</span>
              <span className="text-sm text-gray-500">One-time</span>
            </div>
          </motion.div>
        ))}
      </div>

      {selectedTemplate && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mt-8 p-6 bg-purple-50 rounded-xl border border-purple-200"
        >
          <h3 className="font-semibold text-purple-900 mb-2">
            Selected Template
          </h3>
          <p className="text-purple-700">{selectedTemplate.name}</p>
          <p className="text-sm text-purple-600 mt-1">
            {selectedTemplate.description}
          </p>
        </motion.div>
      )}
    </motion.div>
  );

  const renderCartStep = () => (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      className="bg-white rounded-2xl shadow-lg p-8"
    >
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-gray-900">Review & Customize</h2>
        <ShoppingCart className="w-8 h-8 text-purple-600" />
      </div>

      <div className="space-y-4 mb-6">
        {cart.map((item) => (
          <div
            key={item.id}
            className="flex items-center justify-between p-4 bg-gray-50 rounded-lg"
          >
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 bg-gradient-to-r from-purple-600 to-blue-600 rounded-lg flex items-center justify-center">
                {item.type === "template" ? (
                  <Palette className="w-6 h-6 text-white" />
                ) : (
                  <Settings className="w-6 h-6 text-white" />
                )}
              </div>
              <div>
                <h3 className="font-semibold text-gray-900">{item.name}</h3>
                <p className="text-sm text-gray-500">
                  {item.type === "template"
                    ? "Website Template"
                    : "Additional Service"}
                </p>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <div className="text-right">
                <p className="font-semibold text-gray-900">€{item.price}</p>
                <p className="text-sm text-gray-500">
                  {item.type === "template" ? "One-time" : "One-time"}
                </p>
              </div>
              {item.type !== "template" && (
                <button
                  onClick={() => dispatch(removeService(item.id))}
                  className="p-2 text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                >
                  <X className="w-4 h-4" />
                </button>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Additional Services Section */}
      <div className="mb-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">
          Add Additional Services
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {EXTRA_SERVICES.map((service) => {
            const isAdded = cart.some((item) => item.id === service.id);
            return (
              <div
                key={service.id}
                className={`p-4 rounded-lg border-2 transition-all duration-300 ${
                  isAdded
                    ? "border-purple-500 bg-purple-50"
                    : "border-gray-200 hover:border-purple-300"
                }`}
              >
                <div className="flex items-start justify-between mb-2">
                  <div>
                    <h4 className="font-semibold text-gray-900">
                      {service.name}
                    </h4>
                    {service.popular && (
                      <span className="inline-block px-2 py-1 text-xs font-medium bg-purple-100 text-purple-800 rounded-full">
                        Popular
                      </span>
                    )}
                  </div>
                  <span className="font-bold text-purple-600">
                    €{service.price}
                  </span>
                </div>
                <p className="text-sm text-gray-600 mb-3">
                  {service.description}
                </p>
                <button
                  onClick={() => {
                    if (isAdded) {
                      dispatch(removeService(service.id));
                    } else {
                      dispatch(
                        addService({
                          id: service.id,
                          name: service.name,
                          price: service.price,
                          type: "service",
                          data: service,
                          quantity: 1,
                        })
                      );
                    }
                  }}
                  className={`w-full py-2 px-4 rounded-lg font-medium transition-colors ${
                    isAdded
                      ? "bg-red-100 text-red-700 hover:bg-red-200"
                      : "bg-purple-100 text-purple-700 hover:bg-purple-200"
                  }`}
                >
                  {isAdded ? "Remove Service" : "Add Service"}
                </button>
              </div>
            );
          })}
        </div>
      </div>

      <div className="border-t pt-6">
        <div className="flex items-center justify-between mb-4">
          <span className="text-lg font-semibold text-gray-900">Total</span>
          <span className="text-2xl font-bold text-gray-900">€{cartTotal}</span>
        </div>
        <p className="text-sm text-gray-500">
          One-time payment + €39.99/month for hosting & support
        </p>
      </div>
    </motion.div>
  );

  const renderDomainStep = () => (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      className="bg-white rounded-2xl shadow-lg p-8"
    >
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-gray-900">Choose Your Domain</h2>
        <Globe className="w-8 h-8 text-purple-600" />
      </div>

      <div className="space-y-6">
        {/* Domain Type Selection */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <motion.button
            className={`p-6 rounded-xl border-2 transition-all duration-300 ${
              domainType === "subdomain"
                ? "border-purple-500 bg-purple-50"
                : "border-gray-200 hover:border-gray-300"
            }`}
            onClick={() => handleDomainTypeChange("subdomain")}
            whileHover={{ scale: 1.02 }}
          >
            <div className="text-center">
              <h3 className="font-semibold text-gray-900 mb-2">Subdomain</h3>
              <p className="text-sm text-gray-500 mb-4">yoursite.elevare.com</p>
              <p className="text-lg font-bold text-green-600">Free</p>
            </div>
          </motion.button>

          <motion.button
            className={`p-6 rounded-xl border-2 transition-all duration-300 ${
              domainType === "custom"
                ? "border-purple-500 bg-purple-50"
                : "border-gray-200 hover:border-gray-300"
            }`}
            onClick={() => handleDomainTypeChange("custom")}
            whileHover={{ scale: 1.02 }}
          >
            <div className="text-center">
              <h3 className="font-semibold text-gray-900 mb-2">
                Custom Domain
              </h3>
              <p className="text-sm text-gray-500 mb-4">yoursite.com</p>
              <p className="text-lg font-bold text-blue-600">€39.99/month</p>
            </div>
          </motion.button>
        </div>

        {/* Custom Domain Input */}
        {domainType === "custom" && (
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Enter your domain
              </label>
              <div className="flex space-x-3">
                <input
                  type="text"
                  value={domainInput}
                  onChange={(e) => handleDomainInputChange(e.target.value)}
                  placeholder="example.com"
                  className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                />
                <button
                  onClick={handleValidateDomain}
                  disabled={
                    domainValidation.isValidating || !domainInput.trim()
                  }
                  className="px-6 py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                >
                  {domainValidation.isValidating ? (
                    <Loader className="w-5 h-5 animate-spin" />
                  ) : (
                    "Check"
                  )}
                </button>
              </div>
            </div>

            {/* Domain Validation Result */}
            {domainValidation.isValid !== null && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className={`p-4 rounded-lg ${
                  domainValidation.isValid
                    ? "bg-green-50 border border-green-200"
                    : "bg-red-50 border border-red-200"
                }`}
              >
                <div className="flex items-center space-x-2">
                  {domainValidation.isValid ? (
                    <CheckCircle className="w-5 h-5 text-green-600" />
                  ) : (
                    <AlertCircle className="w-5 h-5 text-red-600" />
                  )}
                  <p
                    className={`text-sm font-medium ${
                      domainValidation.isValid
                        ? "text-green-800"
                        : "text-red-800"
                    }`}
                  >
                    {domainValidation.isValid
                      ? "Domain is available!"
                      : domainValidation.error || "Domain is not available"}
                  </p>
                </div>
              </motion.div>
            )}
          </div>
        )}
      </div>
    </motion.div>
  );

  const renderPaymentStep = () => (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      className="bg-white rounded-2xl shadow-lg p-8"
    >
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-gray-900">Payment</h2>
        <CreditCard className="w-8 h-8 text-purple-600" />
      </div>

      <div className="space-y-6">
        {/* Payment Method Selection */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <motion.button
            className={`p-6 rounded-xl border-2 transition-all duration-300 ${
              paymentMethod === "card"
                ? "border-purple-500 bg-purple-50"
                : "border-gray-200 hover:border-gray-300"
            }`}
            onClick={() => handlePaymentMethodSelect("card")}
            whileHover={{ scale: 1.02 }}
          >
            <div className="text-center">
              <CreditCard className="w-8 h-8 mx-auto mb-2 text-gray-600" />
              <h3 className="font-semibold text-gray-900">Credit Card</h3>
            </div>
          </motion.button>

          <motion.button
            className={`p-6 rounded-xl border-2 transition-all duration-300 ${
              paymentMethod === "paypal"
                ? "border-purple-500 bg-purple-50"
                : "border-gray-200 hover:border-gray-300"
            }`}
            onClick={() => handlePaymentMethodSelect("paypal")}
            whileHover={{ scale: 1.02 }}
          >
            <div className="text-center">
              <div className="w-8 h-8 mx-auto mb-2 bg-blue-600 rounded flex items-center justify-center">
                <span className="text-white font-bold text-sm">PP</span>
              </div>
              <h3 className="font-semibold text-gray-900">PayPal</h3>
            </div>
          </motion.button>
        </div>

        {/* Payment Details */}
        {paymentMethod === "card" && (
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Card Number
              </label>
              <input
                type="text"
                value={paymentDetails.cardNumber}
                onChange={(e) =>
                  setPaymentDetails({
                    ...paymentDetails,
                    cardNumber: e.target.value,
                  })
                }
                placeholder="1234 5678 9012 3456"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Expiry Date
                </label>
                <input
                  type="text"
                  value={paymentDetails.expiryDate}
                  onChange={(e) =>
                    setPaymentDetails({
                      ...paymentDetails,
                      expiryDate: e.target.value,
                    })
                  }
                  placeholder="MM/YY"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  CVV
                </label>
                <input
                  type="text"
                  value={paymentDetails.cvv}
                  onChange={(e) =>
                    setPaymentDetails({
                      ...paymentDetails,
                      cvv: e.target.value,
                    })
                  }
                  placeholder="123"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Cardholder Name
              </label>
              <input
                type="text"
                value={paymentDetails.name}
                onChange={(e) =>
                  setPaymentDetails({
                    ...paymentDetails,
                    name: e.target.value,
                  })
                }
                placeholder="John Doe"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              />
            </div>
          </div>
        )}
      </div>
    </motion.div>
  );

  const renderReviewStep = () => (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      className="bg-white rounded-2xl shadow-lg p-8"
    >
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-gray-900">Review & Confirm</h2>
        <CheckCircle className="w-8 h-8 text-purple-600" />
      </div>

      <div className="space-y-6">
        {/* Order Summary */}
        <div className="bg-gray-50 rounded-lg p-6">
          <h3 className="font-semibold text-gray-900 mb-4">Order Summary</h3>

          <div className="space-y-3">
            {cart.map((item) => (
              <div key={item.id} className="flex items-center justify-between">
                <span className="text-gray-600">{item.name}</span>
                <span className="font-semibold">€{item.price}</span>
              </div>
            ))}

            {domainType === "custom" && (
              <div className="flex items-center justify-between">
                <span className="text-gray-600">Custom Domain Setup</span>
                <span className="font-semibold">€49</span>
              </div>
            )}

            <div className="border-t pt-3">
              <div className="flex items-center justify-between">
                <span className="text-lg font-semibold text-gray-900">
                  Total
                </span>
                <span className="text-xl font-bold text-gray-900">
                  €{cartTotal + (domainType === "custom" ? 49 : 0)}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Domain Information */}
        <div className="bg-gray-50 rounded-lg p-6">
          <h3 className="font-semibold text-gray-900 mb-4">Domain</h3>
          <p className="text-gray-600">
            {domainType === "custom"
              ? `${customDomain} (Custom Domain)`
              : "yoursite.elevare.com (Subdomain)"}
          </p>
        </div>

        {/* Payment Information */}
        <div className="bg-gray-50 rounded-lg p-6">
          <h3 className="font-semibold text-gray-900 mb-4">Payment Method</h3>
          <p className="text-gray-600 capitalize">
            {paymentMethod} ending in ****
          </p>
        </div>
      </div>
    </motion.div>
  );

  const renderPublishingStep = () => (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      className="bg-white rounded-2xl shadow-lg p-8 text-center"
    >
      <div className="mb-6">
        <Loader className="w-16 h-16 mx-auto mb-4 text-purple-600 animate-spin" />
        <h2 className="text-2xl font-bold text-gray-900 mb-2">
          Publishing Your Website
        </h2>
        <p className="text-gray-600">
          {publishStatus === "preparing" && "Preparing your website..."}
          {publishStatus === "building" && "Building your website..."}
          {publishStatus === "deploying" && "Deploying to the web..."}
          {publishStatus === "completed" && "Your website is live!"}
          {publishStatus === "failed" && "Publishing failed. Please try again."}
        </p>
      </div>

      {/* Progress Bar */}
      <div className="w-full bg-gray-200 rounded-full h-3 mb-6">
        <motion.div
          className="bg-gradient-to-r from-purple-600 to-blue-600 h-3 rounded-full"
          initial={{ width: 0 }}
          animate={{ width: `${publishProgress}%` }}
          transition={{ duration: 0.5 }}
        />
      </div>

      <p className="text-sm text-gray-500">{publishProgress}% complete</p>

      {publishStatus === "completed" && (
        <motion.button
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mt-6 px-6 py-3 bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-lg hover:from-purple-700 hover:to-blue-700 transition-all duration-300 flex items-center space-x-2 mx-auto"
          onClick={() => router.push("/dashboard")}
        >
          <ExternalLink className="w-5 h-5" />
          <span>View Your Website</span>
        </motion.button>
      )}
    </motion.div>
  );

  const renderCurrentStep = () => {
    switch (currentStep) {
      case "template":
        return renderTemplateStep();
      case "cart":
        return renderCartStep();
      case "domain":
        return renderDomainStep();
      case "payment":
        return renderPaymentStep();
      case "review":
        return renderReviewStep();
      case "publishing":
        return renderPublishingStep();
      default:
        return renderTemplateStep();
    }
  };

  // ========================================
  // MAIN RENDER
  // ========================================

  if (!isAuthenticated) {
    return null; // Will redirect
  }

  return (
    <>
      <Head>
        <title>Publish Website - Monderna</title>
        <meta name="description" content="Publish your website with Monderna" />
      </Head>

      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
        <div className="container mx-auto px-4 py-8">
          {/* Header */}
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold text-white mb-4">
              Publish Your Website
            </h1>
            <p className="text-white/70 text-lg">
              Complete the setup to make your website live
            </p>
          </div>

          {/* Step Indicator */}
          {renderStepIndicator()}

          {/* Main Content */}
          <div className="max-w-4xl mx-auto">
            {renderCurrentStep()}

            {/* Navigation Buttons */}
            {currentStep !== "publishing" && (
              <div className="flex items-center justify-between mt-8">
                <motion.button
                  className="flex items-center space-x-2 px-6 py-3 bg-white/10 text-white border border-white/20 rounded-lg hover:bg-white/20 transition-all duration-300"
                  onClick={handlePreviousStep}
                  disabled={currentStepIndex === 0}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <ArrowLeft className="w-5 h-5" />
                  <span>Previous</span>
                </motion.button>

                <motion.button
                  className={`flex items-center space-x-2 px-6 py-3 rounded-lg transition-all duration-300 ${
                    canProceedToNext
                      ? "bg-gradient-to-r from-purple-600 to-blue-600 text-white hover:from-purple-700 hover:to-blue-700"
                      : "bg-gray-400 text-gray-200 cursor-not-allowed"
                  }`}
                  onClick={
                    currentStep === "review"
                      ? handleFinalizePublishing
                      : handleNextStep
                  }
                  disabled={!canProceedToNext || isPublishing}
                  whileHover={canProceedToNext ? { scale: 1.02 } : {}}
                  whileTap={canProceedToNext ? { scale: 0.98 } : {}}
                >
                  <span>
                    {currentStep === "review" ? "Publish Website" : "Next"}
                  </span>
                  <ArrowRight className="w-5 h-5" />
                </motion.button>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
