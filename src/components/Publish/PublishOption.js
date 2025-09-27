import React from 'react';

const PublishOption = ({ option }) => {
  return (
    <div className="bg-white rounded-lg border border-gray-200 p-6">
      <div className="flex items-start justify-between mb-4">
        <div>
          <h3 className="text-lg font-semibold text-gray-900">{option.title}</h3>
          <p className="text-gray-600 mt-1">{option.description}</p>
        </div>
        <div className="flex items-center">
          {option.isConnected ? (
            <span className="text-green-600 text-xl">✓</span>
          ) : (
            <div className="w-4 h-4 border-2 border-gray-300 rounded-full"></div>
          )}
        </div>
      </div>
      
      {option.inputField && (
        <div className="mb-4">
          <input
            type="text"
            placeholder={option.placeholder}
            value={option.value}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
          />
        </div>
      )}
      
      {option.displayField && (
        <div className="mb-4">
          <div className="flex items-center space-x-2">
            <input
              type="text"
              value={option.displayValue}
              readOnly
              className="flex-1 px-3 py-2 border border-gray-300 rounded-lg bg-gray-50"
            />
            <button className="px-3 py-2 text-gray-600 hover:text-gray-800">
              📋
            </button>
          </div>
        </div>
      )}
      
      <button className={`w-full py-2 px-4 rounded-lg font-medium transition-colors ${
        option.isConnected
          ? 'bg-green-100 text-green-700'
          : option.isPrimary
          ? 'bg-blue-600 text-white hover:bg-blue-700'
          : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
      }`}>
        {option.buttonText}
      </button>
    </div>
  );
};

export default PublishOption;
