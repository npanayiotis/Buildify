import React from "react";
import DashboardLayout from "../components/Layout/DashboardLayout";
import IntegrationCard from "../components/Publish/IntegrationCard";
import PublishOption from "../components/Publish/PublishOption";

const Publish = () => {
  const integrations = [
    {
      id: 1,
      name: "Stripe",
      description: "Accept payments online.",
      icon: "S",
      bgColor: "bg-green-600",
      isEnabled: true,
      needsSetup: false,
    },
    {
      id: 2,
      name: "PayPal",
      description: "Offer another way to pay.",
      icon: "P",
      bgColor: "bg-blue-600",
      isEnabled: false,
      needsSetup: true,
    },
    {
      id: 3,
      name: "SendGrid",
      description: "Power your email marketing.",
      icon: "SG",
      bgColor: "bg-green-500",
      isEnabled: false,
      needsSetup: false,
    },
    {
      id: 4,
      name: "Google Calendar",
      description: "Manage your appointments.",
      icon: "GC",
      bgColor: "bg-blue-500",
      isEnabled: true,
      needsSetup: false,
    },
  ];

  const publishOptions = [
    {
      id: 1,
      title: "Connect a Custom Domain",
      description: "Use a domain you already own.",
      isConnected: true,
      isPrimary: true,
      inputField: true,
      placeholder: "mysite.com",
      value: "mysite.com",
      buttonText: "Connect",
    },
    {
      id: 2,
      title: "Use a Temporary Domain",
      description: "We'll host your site on a free domain.",
      isConnected: false,
      isPrimary: false,
      displayField: true,
      displayValue: "my-awesome-site.sitecraft.io",
      buttonText: "Use This Domain",
    },
    {
      id: 3,
      title: "Export Code",
      description: "Download the code for self-hosting.",
      isConnected: false,
      isPrimary: false,
      buttonText: "Export",
    },
  ];

  return (
    <DashboardLayout>
      <div className="space-y-8">
        {/* Page Header */}
        <div className="text-center">
          <h1 className="text-3xl font-bold text-gray-900">
            Connect & Publish
          </h1>
          <p className="mt-2 text-gray-600">
            Almost there! Connect your favorite tools to supercharge your site
            and then publish it to the world.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Connect Integrations */}
          <div>
            <h2 className="text-xl font-semibold text-gray-900 mb-6">
              Connect Integrations
            </h2>
            <div className="space-y-4">
              {integrations.map((integration) => (
                <IntegrationCard
                  key={integration.id}
                  integration={integration}
                />
              ))}
            </div>
          </div>

          {/* Publish Your Site */}
          <div>
            <h2 className="text-xl font-semibold text-gray-900 mb-6">
              Publish Your Site
            </h2>
            <div className="space-y-4">
              {publishOptions.map((option) => (
                <PublishOption key={option.id} option={option} />
              ))}
            </div>
          </div>
        </div>

        {/* Publish Button */}
        <div className="text-center">
          <button className="bg-blue-600 text-white px-8 py-3 rounded-lg text-lg font-medium hover:bg-blue-700 transition-colors">
            Publish Site
          </button>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Publish;
