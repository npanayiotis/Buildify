import React, { useState, useEffect, memo } from "react";
import { motion, AnimatePresence } from "framer-motion";

const AdminServices = memo(() => {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [editingService, setEditingService] = useState(null);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    icon: "💼",
    isActive: true,
  });

  useEffect(() => {
    fetchServices();
  }, []);

  const fetchServices = async () => {
    try {
      setLoading(true);
      const response = await fetch("/api/templates/consulting-firm/services");
      const data = await response.json();
      if (data.success) {
        setServices(data.data);
      }
    } catch (error) {
      console.error("Error fetching services:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const url = editingService
        ? `/api/templates/consulting-firm/services/${editingService.id}`
        : "/api/templates/consulting-firm/services";
      const method = editingService ? "PUT" : "POST";

      const response = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();
      if (data.success) {
        fetchServices();
        resetForm();
        setShowModal(false);
      }
    } catch (error) {
      console.error("Error saving service:", error);
    }
  };

  const handleEdit = (service) => {
    setEditingService(service);
    setFormData({
      title: service.title,
      description: service.description,
      icon: service.icon,
      isActive: service.isActive,
    });
    setShowModal(true);
  };

  const handleDelete = async (id) => {
    if (confirm("Are you sure you want to delete this service?")) {
      try {
        const response = await fetch(`/api/templates/consulting-firm/services/${id}`, {
          method: "DELETE",
        });
        const data = await response.json();
        if (data.success) {
          fetchServices();
        }
      } catch (error) {
        console.error("Error deleting service:", error);
      }
    }
  };

  const resetForm = () => {
    setFormData({
      title: "",
      description: "",
      icon: "💼",
      isActive: true,
    });
    setEditingService(null);
  };

  const icons = [
    "💼", "📊", "🚀", "⚡", "🔄", "🎯", "📈", "💡", "🔧", "🌟",
    "📋", "🎨", "💻", "🌐", "📱", "🏆", "🎪", "🔍", "⚙️", "📌"
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-gray-900">Services Management</h2>
        <button
          onClick={() => {
            resetForm();
            setShowModal(true);
          }}
          className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-4 py-2 rounded-lg hover:from-blue-700 hover:to-indigo-700 transition-all duration-300"
        >
          Add Service
        </button>
      </div>

      {loading ? (
        <div className="flex justify-center items-center py-12">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service) => (
            <motion.div
              key={service.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white rounded-lg shadow-md overflow-hidden border border-gray-200"
            >
              <div className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className="text-3xl">{service.icon}</div>
                  <span
                    className={`px-2 py-1 rounded text-xs font-semibold ${
                      service.isActive
                        ? "bg-green-100 text-green-800"
                        : "bg-red-100 text-red-800"
                    }`}
                  >
                    {service.isActive ? "Active" : "Inactive"}
                  </span>
                </div>

                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  {service.title}
                </h3>

                <p className="text-gray-600 text-sm mb-4 line-clamp-3">
                  {service.description}
                </p>

                <div className="flex space-x-2">
                  <button
                    onClick={() => handleEdit(service)}
                    className="flex-1 bg-blue-600 text-white px-3 py-2 rounded text-sm hover:bg-blue-700 transition-colors"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(service.id)}
                    className="flex-1 bg-red-600 text-white px-3 py-2 rounded text-sm hover:bg-red-700 transition-colors"
                  >
                    Delete
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      )}

      {/* Service Modal */}
      <AnimatePresence>
        {showModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50"
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-white rounded-lg p-6 w-full max-w-2xl max-h-[90vh] overflow-y-auto"
            >
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-bold text-gray-900">
                  {editingService ? "Edit Service" : "Add Service"}
                </h3>
                <button
                  onClick={() => {
                    setShowModal(false);
                    resetForm();
                  }}
                  className="text-gray-400 hover:text-gray-600"
                >
                  <svg
                    className="h-6 w-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </button>
              </div>

              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Title *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.title}
                    onChange={(e) =>
                      setFormData({ ...formData, title: e.target.value })
                    }
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Description *
                  </label>
                  <textarea
                    rows={4}
                    required
                    value={formData.description}
                    onChange={(e) =>
                      setFormData({ ...formData, description: e.target.value })
                    }
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Icon
                  </label>
                  <div className="grid grid-cols-10 gap-2 mb-2">
                    {icons.map((icon) => (
                      <button
                        key={icon}
                        type="button"
                        onClick={() => setFormData({ ...formData, icon })}
                        className={`p-2 rounded border-2 text-lg hover:bg-gray-50 ${
                          formData.icon === icon
                            ? "border-blue-500 bg-blue-50"
                            : "border-gray-200"
                        }`}
                      >
                        {icon}
                      </button>
                    ))}
                  </div>
                  <input
                    type="text"
                    value={formData.icon}
                    onChange={(e) =>
                      setFormData({ ...formData, icon: e.target.value })
                    }
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    placeholder="Or enter custom emoji"
                  />
                </div>

                <div>
                  <label className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      checked={formData.isActive}
                      onChange={(e) =>
                        setFormData({ ...formData, isActive: e.target.checked })
                      }
                      className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                    />
                    <span className="text-sm font-medium text-gray-700">
                      Active Service
                    </span>
                  </label>
                </div>

                <div className="flex justify-end space-x-3 pt-4">
                  <button
                    type="button"
                    onClick={() => {
                      setShowModal(false);
                      resetForm();
                    }}
                    className="px-4 py-2 text-gray-600 hover:text-gray-800"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-6 py-2 rounded-lg hover:from-blue-700 hover:to-indigo-700 transition-all duration-300"
                  >
                    {editingService ? "Update Service" : "Add Service"}
                  </button>
                </div>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
});

AdminServices.displayName = "AdminServices";

export default AdminServices;
