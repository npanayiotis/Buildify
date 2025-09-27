import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const AdminProducts = ({ tenantId }) => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    price: "",
    comparePrice: "",
    sku: "",
    images: [],
    category: "",
    tags: [],
    inventory: "",
    isFeatured: false,
  });

  useEffect(() => {
    fetchProducts();
  }, [tenantId]);

  const fetchProducts = async () => {
    try {
      setLoading(true);
      const response = await fetch("/api/templates/fashion-boutique/products", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      const data = await response.json();
      if (data.success) {
        setProducts(data.data);
      }
    } catch (error) {
      console.error("Error fetching products:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const url = editingProduct
        ? `/api/templates/fashion-boutique/products/${editingProduct.id}`
        : "/api/templates/fashion-boutique/products";

      const method = editingProduct ? "PUT" : "POST";

      const response = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();
      if (data.success) {
        fetchProducts();
        resetForm();
      }
    } catch (error) {
      console.error("Error saving product:", error);
    }
  };

  const handleDelete = async (id) => {
    if (!confirm("Are you sure you want to delete this product?")) return;

    try {
      const response = await fetch(`/api/templates/fashion-boutique/products/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

      const data = await response.json();
      if (data.success) {
        fetchProducts();
      }
    } catch (error) {
      console.error("Error deleting product:", error);
    }
  };

  const resetForm = () => {
    setFormData({
      name: "",
      description: "",
      price: "",
      comparePrice: "",
      sku: "",
      images: [],
      category: "",
      tags: [],
      inventory: "",
      isFeatured: false,
    });
    setEditingProduct(null);
    setShowForm(false);
  };

  const handleEdit = (product) => {
    setFormData({
      name: product.name,
      description: product.description,
      price: product.price?.toString() || "",
      comparePrice: product.comparePrice?.toString() || "",
      sku: product.sku || "",
      images: product.images || [],
      category: product.category || "",
      tags: product.tags || [],
      inventory: product.inventory?.toString() || "",
      isFeatured: product.isFeatured || false,
    });
    setEditingProduct(product);
    setShowForm(true);
  };

  const addImage = () => {
    setFormData((prev) => ({
      ...prev,
      images: [...prev.images, ""],
    }));
  };

  const updateImage = (index, value) => {
    setFormData((prev) => ({
      ...prev,
      images: prev.images.map((image, i) => (i === index ? value : image)),
    }));
  };

  const removeImage = (index) => {
    setFormData((prev) => ({
      ...prev,
      images: prev.images.filter((_, i) => i !== index),
    }));
  };

  const addTag = () => {
    setFormData((prev) => ({
      ...prev,
      tags: [...prev.tags, ""],
    }));
  };

  const updateTag = (index, value) => {
    setFormData((prev) => ({
      ...prev,
      tags: prev.tags.map((tag, i) => (i === index ? value : tag)),
    }));
  };

  const removeTag = (index) => {
    setFormData((prev) => ({
      ...prev,
      tags: prev.tags.filter((_, i) => i !== index),
    }));
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center p-8">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-pink-600"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-gray-900">Products Management</h2>
        <button
          onClick={() => setShowForm(true)}
          className="bg-gradient-to-r from-pink-600 to-purple-600 text-white px-4 py-2 rounded-lg hover:from-pink-700 hover:to-purple-700 transition-colors"
        >
          Add Product
        </button>
      </div>

      {/* Products Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {products.map((product) => (
          <motion.div
            key={product.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white rounded-lg shadow-md overflow-hidden border border-gray-200"
          >
            <div className="relative">
              <img
                src={product.images[0] || "https://via.placeholder.com/400x300"}
                alt={product.name}
                className="w-full h-48 object-cover"
              />
              {product.isFeatured && (
                <div className="absolute top-2 right-2 bg-pink-500 text-white px-2 py-1 rounded-full text-xs font-semibold">
                  Featured
                </div>
              )}
            </div>

            <div className="p-4">
              <div className="flex items-start justify-between mb-2">
                <h3 className="text-lg font-semibold text-gray-900 line-clamp-2">
                  {product.name}
                </h3>
                <div className="flex space-x-2 ml-2">
                  <button
                    onClick={() => handleEdit(product)}
                    className="text-pink-600 hover:text-pink-800 text-sm"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(product.id)}
                    className="text-red-600 hover:text-red-800 text-sm"
                  >
                    Delete
                  </button>
                </div>
              </div>

              <p className="text-gray-600 text-sm mb-3 line-clamp-2">
                {product.description}
              </p>

              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center space-x-2">
                  <span className="text-lg font-bold text-pink-600">
                    ${product.price}
                  </span>
                  {product.comparePrice && (
                    <span className="text-sm text-gray-500 line-through">
                      ${product.comparePrice}
                    </span>
                  )}
                </div>
                <span className="text-sm text-gray-500">
                  Stock: {product.inventory}
                </span>
              </div>

              <div className="flex items-center justify-between text-sm">
                <span className="text-gray-500">{product.category}</span>
                <span className="text-gray-500">{product.sku}</span>
              </div>
            </div>
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
              className="bg-white rounded-lg p-6 w-full max-w-4xl max-h-[90vh] overflow-y-auto"
            >
              <h3 className="text-xl font-bold mb-4">
                {editingProduct ? "Edit Product" : "Add New Product"}
              </h3>

              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Product Name
                    </label>
                    <input
                      type="text"
                      value={formData.name}
                      onChange={(e) =>
                        setFormData((prev) => ({ ...prev, name: e.target.value }))
                      }
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-pink-500"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Category
                    </label>
                    <input
                      type="text"
                      value={formData.category}
                      onChange={(e) =>
                        setFormData((prev) => ({
                          ...prev,
                          category: e.target.value,
                        }))
                      }
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-pink-500"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Description
                  </label>
                  <textarea
                    value={formData.description}
                    onChange={(e) =>
                      setFormData((prev) => ({
                        ...prev,
                        description: e.target.value,
                      }))
                    }
                    rows={3}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-pink-500"
                    required
                  />
                </div>

                <div className="grid grid-cols-3 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Price
                    </label>
                    <input
                      type="number"
                      step="0.01"
                      value={formData.price}
                      onChange={(e) =>
                        setFormData((prev) => ({ ...prev, price: e.target.value }))
                      }
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-pink-500"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Compare Price
                    </label>
                    <input
                      type="number"
                      step="0.01"
                      value={formData.comparePrice}
                      onChange={(e) =>
                        setFormData((prev) => ({
                          ...prev,
                          comparePrice: e.target.value,
                        }))
                      }
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-pink-500"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Inventory
                    </label>
                    <input
                      type="number"
                      value={formData.inventory}
                      onChange={(e) =>
                        setFormData((prev) => ({
                          ...prev,
                          inventory: e.target.value,
                        }))
                      }
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-pink-500"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      SKU
                    </label>
                    <input
                      type="text"
                      value={formData.sku}
                      onChange={(e) =>
                        setFormData((prev) => ({ ...prev, sku: e.target.value }))
                      }
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-pink-500"
                    />
                  </div>

                  <div className="flex items-center">
                    <input
                      type="checkbox"
                      id="isFeatured"
                      checked={formData.isFeatured}
                      onChange={(e) =>
                        setFormData((prev) => ({
                          ...prev,
                          isFeatured: e.target.checked,
                        }))
                      }
                      className="mr-2"
                    />
                    <label htmlFor="isFeatured" className="text-sm font-medium text-gray-700">
                      Featured Product
                    </label>
                  </div>
                </div>

                <div>
                  <div className="flex items-center justify-between mb-2">
                    <label className="block text-sm font-medium text-gray-700">
                      Product Images
                    </label>
                    <button
                      type="button"
                      onClick={addImage}
                      className="text-pink-600 hover:text-pink-800 text-sm"
                    >
                      + Add Image
                    </button>
                  </div>

                  {formData.images.map((image, index) => (
                    <div key={index} className="flex items-center space-x-2 mb-2">
                      <input
                        type="url"
                        value={image}
                        onChange={(e) => updateImage(index, e.target.value)}
                        className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-pink-500"
                        placeholder="Image URL"
                      />
                      <button
                        type="button"
                        onClick={() => removeImage(index)}
                        className="text-red-600 hover:text-red-800 px-2 py-1"
                      >
                        ×
                      </button>
                    </div>
                  ))}
                </div>

                <div>
                  <div className="flex items-center justify-between mb-2">
                    <label className="block text-sm font-medium text-gray-700">
                      Tags
                    </label>
                    <button
                      type="button"
                      onClick={addTag}
                      className="text-pink-600 hover:text-pink-800 text-sm"
                    >
                      + Add Tag
                    </button>
                  </div>

                  {formData.tags.map((tag, index) => (
                    <div key={index} className="flex items-center space-x-2 mb-2">
                      <input
                        type="text"
                        value={tag}
                        onChange={(e) => updateTag(index, e.target.value)}
                        className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-pink-500"
                        placeholder="Tag name"
                      />
                      <button
                        type="button"
                        onClick={() => removeTag(index)}
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
                    className="bg-gradient-to-r from-pink-600 to-purple-600 text-white px-4 py-2 rounded-lg hover:from-pink-700 hover:to-purple-700 transition-colors"
                  >
                    {editingProduct ? "Update Product" : "Add Product"}
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

export default AdminProducts;
