import React from "react";

const ProductCard = ({ product }) => {
  const getStatusColor = (status) => {
    const colors = {
      active: "bg-green-100 text-green-800",
      inactive: "bg-gray-100 text-gray-800",
      draft: "bg-yellow-100 text-yellow-800"
    };
    return colors[status.toLowerCase()] || "bg-gray-100 text-gray-800";
  };

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow">
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center space-x-3">
          <div className="w-12 h-12 bg-gray-200 rounded-lg flex items-center justify-center">
            <span className="text-lg">{product.icon}</span>
          </div>
          <div>
            <h3 className="font-semibold text-gray-900">{product.name}</h3>
            <p className="text-sm text-gray-500">{product.category}</p>
          </div>
        </div>
        <span className={`px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(product.status)}`}>
          {product.status}
        </span>
      </div>
      
      <div className="mb-4">
        <p className="text-gray-600 text-sm line-clamp-2">{product.description}</p>
      </div>
      
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-4 text-sm text-gray-500">
          <span>💰 ${product.price}</span>
          <span>📦 {product.stock} in stock</span>
          <span>👀 {product.views} views</span>
        </div>
      </div>
      
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <button className="px-3 py-1 text-sm text-blue-600 hover:text-blue-800 hover:bg-blue-50 rounded">
            Edit
          </button>
          <button className="px-3 py-1 text-sm text-gray-600 hover:text-gray-800 hover:bg-gray-50 rounded">
            View
          </button>
        </div>
        <div className="flex items-center space-x-2">
          <button className="px-3 py-1 text-sm text-green-600 hover:text-green-800 hover:bg-green-50 rounded">
            {product.status === 'active' ? 'Deactivate' : 'Activate'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
