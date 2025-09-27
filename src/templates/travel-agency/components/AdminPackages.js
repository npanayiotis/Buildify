import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Plus, Edit, Trash2, MapPin, Search, Filter } from "lucide-react";

const AdminPackages = () => {
  const [packages, setPackages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedDestination, setSelectedDestination] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [editingPackage, setEditingPackage] = useState(null);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    destination: "",
    duration: "",
    price: "",
    originalPrice: "",
    features: "",
    itinerary: "",
    includes: "",
    excludes: "",
    maxTravelers: "",
    isActive: true,
    isFeatured: false,
    images: "",
  });

  useEffect(() => {
    fetchPackages();
  }, []);

  const fetchPackages = async () => {
    try {
      const response = await fetch("/api/templates/travel-agency/packages");
      const data = await response.json();
      if (data.success) {
        setPackages(data.data);
      }
    } catch (error) {
      console.error("Error fetching packages:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const packageData = {
        ...formData,
        duration: parseInt(formData.duration),
        price: parseFloat(formData.price),
        originalPrice: formData.originalPrice ? parseFloat(formData.originalPrice) : null,
        maxTravelers: parseInt(formData.maxTravelers),
        features: formData.features.split(",").map(f => f.trim()).filter(Boolean),
        includes: formData.includes.split(",").map(i => i.trim()).filter(Boolean),
        excludes: formData.excludes.split(",").map(e => e.trim()).filter(Boolean),
        images: formData.images.split(",").map(img => img.trim()).filter(Boolean),
      };

      const url = editingPackage 
        ? `/api/templates/travel-agency/packages/${editingPackage.id}`
        : "/api/templates/travel-agency/packages";
      
      const method = editingPackage ? "PUT" : "POST";
      
      const response = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(packageData),
      });

      if (response.ok) {
        setShowModal(false);
        setEditingPackage(null);
        setFormData({
          title: "",
          description: "",
          destination: "",
          duration: "",
          price: "",
          originalPrice: "",
          features: "",
          itinerary: "",
          includes: "",
          excludes: "",
          maxTravelers: "",
          isActive: true,
          isFeatured: false,
          images: "",
        });
        fetchPackages();
      }
    } catch (error) {
      console.error("Error saving package:", error);
    }
  };

  const handleEdit = (packageItem) => {
    setEditingPackage(packageItem);
    setFormData({
      title: packageItem.title,
      description: packageItem.description,
      destination: packageItem.destination,
      duration: packageItem.duration.toString(),
      price: packageItem.price.toString(),
      originalPrice: packageItem.originalPrice?.toString() || "",
      features: packageItem.features?.join(", ") || "",
      itinerary: packageItem.itinerary || "",
      includes: packageItem.includes?.join(", ") || "",
      excludes: packageItem.excludes?.join(", ") || "",
      maxTravelers: packageItem.maxTravelers.toString(),
      isActive: packageItem.isActive,
      isFeatured: packageItem.isFeatured,
      images: packageItem.images?.join(", ") || "",
    });
    setShowModal(true);
  };

  const handleDelete = async (packageId) => {
    if (window.confirm("Are you sure you want to delete this package?")) {
      try {
        const response = await fetch(`/api/templates/travel-agency/packages/${packageId}`, {
          method: "DELETE",
        });
        
        if (response.ok) {
          fetchPackages();
        }
      } catch (error) {
        console.error("Error deleting package:", error);
      }
    }
  };

  const filteredPackages = packages.filter((packageItem) => {
    const matchesSearch = packageItem.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         packageItem.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         packageItem.destination.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesDestination = !selectedDestination || packageItem.destination === selectedDestination;
    return matchesSearch && matchesDestination;
  });

  const destinations = [...new Set(packages.map(pkg => pkg.destination).filter(Boolean))];

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Travel Packages</h2>
          <p className="text-gray-600">Manage your travel packages and destinations</p>
        </div>
        <button
          onClick={() => setShowModal(true)}
          className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center space-x-2"
        >
          <Plus className="w-4 h-4" />
          <span>Add Package</span>
        </button>
      </div>

      {/* Filters */}
      <div className="bg-white p-4 rounded-lg shadow-sm border">
        <div className="flex flex-wrap items-center gap-4">
          <div className="flex-1 min-w-64">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <input
                type="text"
                placeholder="Search packages..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 pr-4 py-2 w-full border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
          </div>
          
          <select
            value={selectedDestination}
            onChange={(e) => setSelectedDestination(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="">All Destinations</option>
            {destinations.map((destination) => (
              <option key={destination} value={destination}>
                {destination}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Packages Table */}
      <div className="bg-white rounded-lg shadow-sm border overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Package
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Destination
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Duration
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Price
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredPackages.map((packageItem) => (
                <motion.tr
                  key={packageItem.id}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="hover:bg-gray-50"
                >
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="flex-shrink-0 h-12 w-12">
                        <img
                          className="h-12 w-12 rounded-lg object-cover"
                          src={packageItem.images?.[0] || "/placeholder-travel.jpg"}
                          alt={packageItem.title}
                        />
                      </div>
                      <div className="ml-4">
                        <div className="text-sm font-medium text-gray-900">
                          {packageItem.title}
                        </div>
                        <div className="text-sm text-gray-500 line-clamp-1">
                          {packageItem.description}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <MapPin className="w-4 h-4 text-gray-400 mr-1" />
                      <span className="text-sm text-gray-900">{packageItem.destination}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="text-sm text-gray-900">{packageItem.duration} days</span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">${packageItem.price}</div>
                    {packageItem.originalPrice && (
                      <div className="text-sm text-gray-500 line-through">
                        ${packageItem.originalPrice}
                      </div>
                    )}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex space-x-2">
                      {packageItem.isActive && (
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                          Active
                        </span>
                      )}
                      {packageItem.isFeatured && (
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">
                          Featured
                        </span>
                      )}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <div className="flex space-x-2">
                      <button
                        onClick={() => handleEdit(packageItem)}
                        className="text-blue-600 hover:text-blue-900"
                        title="Edit Package"
                      >
                        <Edit className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => handleDelete(packageItem.id)}
                        className="text-red-600 hover:text-red-900"
                        title="Delete Package"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Empty State */}
      {filteredPackages.length === 0 && (
        <div className="text-center py-12">
          <div className="w-16 h-16 bg-gray-200 rounded-full flex items-center justify-center mx-auto mb-4">
            <Search className="w-8 h-8 text-gray-400" />
          </div>
          <h3 className="text-lg font-medium text-gray-900 mb-2">No packages found</h3>
          <p className="text-gray-500 mb-4">
            {searchTerm || selectedDestination 
              ? "Try adjusting your search or filter criteria."
              : "Get started by adding your first travel package."
            }
          </p>
          {!searchTerm && !selectedDestination && (
            <button
              onClick={() => setShowModal(true)}
              className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
            >
              Add Package
            </button>
          )}
        </div>
      )}

      {/* Package Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white rounded-lg p-6 w-full max-w-4xl max-h-[90vh] overflow-y-auto"
          >
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
              {editingPackage ? "Edit Package" : "Add New Package"}
            </h3>
            
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Package Title *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.title}
                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Destination *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.destination}
                    onChange={(e) => setFormData({ ...formData, destination: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Description *
                </label>
                <textarea
                  required
                  rows={3}
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Duration (days) *
                  </label>
                  <input
                    type="number"
                    required
                    value={formData.duration}
                    onChange={(e) => setFormData({ ...formData, duration: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Price *
                  </label>
                  <input
                    type="number"
                    step="0.01"
                    required
                    value={formData.price}
                    onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Original Price
                  </label>
                  <input
                    type="number"
                    step="0.01"
                    value={formData.originalPrice}
                    onChange={(e) => setFormData({ ...formData, originalPrice: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Max Travelers
                </label>
                <input
                  type="number"
                  value={formData.maxTravelers}
                  onChange={(e) => setFormData({ ...formData, maxTravelers: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Features (comma-separated)
                </label>
                <input
                  type="text"
                  value={formData.features}
                  onChange={(e) => setFormData({ ...formData, features: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="feature1, feature2, feature3"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Itinerary (JSON format)
                </label>
                <textarea
                  rows={3}
                  value={formData.itinerary}
                  onChange={(e) => setFormData({ ...formData, itinerary: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder='{"Day 1": "Arrival and city tour", "Day 2": "Museum visits"}'
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Includes (comma-separated)
                  </label>
                  <input
                    type="text"
                    value={formData.includes}
                    onChange={(e) => setFormData({ ...formData, includes: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="include1, include2, include3"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Excludes (comma-separated)
                  </label>
                  <input
                    type="text"
                    value={formData.excludes}
                    onChange={(e) => setFormData({ ...formData, excludes: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="exclude1, exclude2, exclude3"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Image URLs (comma-separated)
                </label>
                <input
                  type="text"
                  value={formData.images}
                  onChange={(e) => setFormData({ ...formData, images: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="https://example.com/image1.jpg, https://example.com/image2.jpg"
                />
              </div>

              <div className="flex items-center space-x-4">
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    checked={formData.isActive}
                    onChange={(e) => setFormData({ ...formData, isActive: e.target.checked })}
                    className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                  />
                  <span className="ml-2 text-sm text-gray-700">Active</span>
                </label>
                
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    checked={formData.isFeatured}
                    onChange={(e) => setFormData({ ...formData, isFeatured: e.target.checked })}
                    className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                  />
                  <span className="ml-2 text-sm text-gray-700">Featured</span>
                </label>
              </div>

              <div className="flex justify-end space-x-3 pt-4">
                <button
                  type="button"
                  onClick={() => {
                    setShowModal(false);
                    setEditingPackage(null);
                    setFormData({
                      title: "",
                      description: "",
                      destination: "",
                      duration: "",
                      price: "",
                      originalPrice: "",
                      features: "",
                      itinerary: "",
                      includes: "",
                      excludes: "",
                      maxTravelers: "",
                      isActive: true,
                      isFeatured: false,
                      images: "",
                    });
                  }}
                  className="px-4 py-2 text-gray-700 bg-gray-200 rounded-lg hover:bg-gray-300 transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                >
                  {editingPackage ? "Update Package" : "Create Package"}
                </button>
              </div>
            </form>
          </motion.div>
        </div>
      )}
    </div>
  );
};

export default AdminPackages;
