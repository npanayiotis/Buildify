import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const AdminServices = ({ tenantId }) => {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingService, setEditingService] = useState(null);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    icon: '🚀',
    price: '',
    features: []
  });

  useEffect(() => {
    fetchServices();
  }, [tenantId]);

  const fetchServices = async () => {
    try {
      setLoading(true);
      const response = await fetch('/api/templates/tech-startup/services', {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      });
      const data = await response.json();
      if (data.success) {
        setServices(data.data);
      }
    } catch (error) {
      console.error('Error fetching services:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const url = editingService 
        ? `/api/templates/tech-startup/services/${editingService.id}`
        : '/api/templates/tech-startup/services';
      
      const method = editingService ? 'PUT' : 'POST';
      
      const response = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        },
        body: JSON.stringify(formData)
      });

      const data = await response.json();
      if (data.success) {
        fetchServices();
        resetForm();
      }
    } catch (error) {
      console.error('Error saving service:', error);
    }
  };

  const handleDelete = async (id) => {
    if (!confirm('Are you sure you want to delete this service?')) return;
    
    try {
      const response = await fetch(`/api/templates/tech-startup/services/${id}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      });

      const data = await response.json();
      if (data.success) {
        fetchServices();
      }
    } catch (error) {
      console.error('Error deleting service:', error);
    }
  };

  const resetForm = () => {
    setFormData({
      title: '',
      description: '',
      icon: '🚀',
      price: '',
      features: []
    });
    setEditingService(null);
    setShowForm(false);
  };

  const handleEdit = (service) => {
    setFormData({
      title: service.title,
      description: service.description,
      icon: service.icon,
      price: service.price?.toString() || '',
      features: service.features
    });
    setEditingService(service);
    setShowForm(true);
  };

  const addFeature = () => {
    setFormData(prev => ({
      ...prev,
      features: [...prev.features, '']
    }));
  };

  const updateFeature = (index, value) => {
    setFormData(prev => ({
      ...prev,
      features: prev.features.map((feature, i) => i === index ? value : feature)
    }));
  };

  const removeFeature = (index) => {
    setFormData(prev => ({
      ...prev,
      features: prev.features.filter((_, i) => i !== index)
    }));
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center p-8">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-gray-900">Services Management</h2>
        <button
          onClick={() => setShowForm(true)}
          className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
        >
          Add Service
        </button>
      </div>

      {/* Services Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {services.map((service) => (
          <motion.div
            key={service.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white rounded-lg shadow-md p-6 border border-gray-200"
          >
            <div className="flex items-start justify-between mb-4">
              <div className="text-3xl">{service.icon}</div>
              <div className="flex space-x-2">
                <button
                  onClick={() => handleEdit(service)}
                  className="text-blue-600 hover:text-blue-800 text-sm"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(service.id)}
                  className="text-red-600 hover:text-red-800 text-sm"
                >
                  Delete
                </button>
              </div>
            </div>
            
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              {service.title}
            </h3>
            
            <p className="text-gray-600 text-sm mb-3">
              {service.description}
            </p>
            
            {service.price && (
              <div className="text-lg font-bold text-green-600 mb-3">
                ${service.price}
              </div>
            )}
            
            {service.features.length > 0 && (
              <div className="space-y-1">
                <h4 className="text-sm font-medium text-gray-700">Features:</h4>
                <ul className="text-xs text-gray-600 space-y-1">
                  {service.features.map((feature, index) => (
                    <li key={index} className="flex items-center">
                      <span className="w-1 h-1 bg-blue-500 rounded-full mr-2"></span>
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </motion.div>
        ))}
      </div>

      {/* Add/Edit Form Modal */}
      <AnimatePresence>
        {showForm && (
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
              <h3 className="text-xl font-bold mb-4">
                {editingService ? 'Edit Service' : 'Add New Service'}
              </h3>
              
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Service Title
                    </label>
                    <input
                      type="text"
                      value={formData.title}
                      onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      required
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Icon
                    </label>
                    <input
                      type="text"
                      value={formData.icon}
                      onChange={(e) => setFormData(prev => ({ ...prev, icon: e.target.value }))}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      placeholder="🚀"
                    />
                  </div>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Description
                  </label>
                  <textarea
                    value={formData.description}
                    onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
                    rows={3}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    required
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Price (optional)
                  </label>
                  <input
                    type="number"
                    step="0.01"
                    value={formData.price}
                    onChange={(e) => setFormData(prev => ({ ...prev, price: e.target.value }))}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    placeholder="99.99"
                  />
                </div>
                
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <label className="block text-sm font-medium text-gray-700">
                      Features
                    </label>
                    <button
                      type="button"
                      onClick={addFeature}
                      className="text-blue-600 hover:text-blue-800 text-sm"
                    >
                      + Add Feature
                    </button>
                  </div>
                  
                  {formData.features.map((feature, index) => (
                    <div key={index} className="flex items-center space-x-2 mb-2">
                      <input
                        type="text"
                        value={feature}
                        onChange={(e) => updateFeature(index, e.target.value)}
                        className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        placeholder="Feature description"
                      />
                      <button
                        type="button"
                        onClick={() => removeFeature(index)}
                        className="text-red-600 hover:text-red-800 px-2 py-1"
                      >
                        ×
                      </button>
                    </div>
                  ))}
                </div>
                
                <div className="flex justify-end space-x-3 pt-4">
                  <button
                    type="button"
                    onClick={resetForm}
                    className="px-4 py-2 text-gray-600 hover:text-gray-800"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
                  >
                    {editingService ? 'Update Service' : 'Add Service'}
                  </button>
                </div>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default AdminServices;
