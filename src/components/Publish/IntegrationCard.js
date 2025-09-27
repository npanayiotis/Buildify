import React from 'react';

const IntegrationCard = ({ integration }) => {
  return (
    <div className="bg-white rounded-lg border border-gray-200 p-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${integration.bgColor}`}>
            <span className="text-white font-bold">{integration.icon}</span>
          </div>
          <div>
            <h3 className="font-semibold text-gray-900">{integration.name}</h3>
            <p className="text-sm text-gray-500">{integration.description}</p>
          </div>
        </div>
        <div>
          {integration.isEnabled ? (
            <div className="flex items-center">
              <div className="w-12 h-6 bg-blue-600 rounded-full relative">
                <div className="w-5 h-5 bg-white rounded-full absolute right-0.5 top-0.5"></div>
              </div>
            </div>
          ) : integration.needsSetup ? (
            <button className="px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-lg hover:bg-blue-700 transition-colors">
              Setup
            </button>
          ) : (
            <div className="flex items-center">
              <div className="w-12 h-6 bg-gray-300 rounded-full relative">
                <div className="w-5 h-5 bg-white rounded-full absolute left-0.5 top-0.5"></div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default IntegrationCard;
