import React, { useState, useEffect, memo } from "react";
import { motion, AnimatePresence } from "framer-motion";

const AdminMenu = memo(() => {
  const [menuItems, setMenuItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [editingItem, setEditingItem] = useState(null);
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    price: "",
    imageUrl: "",
    category: "Main Course",
    ingredients: [],
    allergens: [],
    isFeatured: false,
    isAvailable: true,
  });
  const [newIngredient, setNewIngredient] = useState("");
  const [newAllergen, setNewAllergen] = useState("");

  useEffect(() => {
    fetchMenuItems();
  }, []);

  const fetchMenuItems = async () => {
    try {
      setLoading(true);
      const response = await fetch("/api/templates/restaurant/menu");
      const data = await response.json();
      if (data.success) {
        setMenuItems(data.data);
      }
    } catch (error) {
      console.error("Error fetching menu items:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const url = editingItem
        ? `/api/templates/restaurant/menu/${editingItem.id}`
        : "/api/templates/restaurant/menu";
      const method = editingItem ? "PUT" : "POST";

      const response = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();
      if (data.success) {
        fetchMenuItems();
        resetForm();
        setShowModal(false);
      }
    } catch (error) {
      console.error("Error saving menu item:", error);
    }
  };

  const handleEdit = (item) => {
    setEditingItem(item);
    setFormData({
      name: item.name,
      description: item.description,
      price: item.price.toString(),
      imageUrl: item.imageUrl || "",
      category: item.category,
      ingredients: item.ingredients || [],
      allergens: item.allergens || [],
      isFeatured: item.isFeatured,
      isAvailable: item.isAvailable,
    });
    setShowModal(true);
  };

  const handleDelete = async (id) => {
    if (confirm("Are you sure you want to delete this menu item?")) {
      try {
        const response = await fetch(`/api/templates/restaurant/menu/${id}`, {
          method: "DELETE",
        });
        const data = await response.json();
        if (data.success) {
          fetchMenuItems();
        }
      } catch (error) {
        console.error("Error deleting menu item:", error);
      }
    }
  };

  const resetForm = () => {
    setFormData({
      name: "",
      description: "",
      price: "",
      imageUrl: "",
      category: "Main Course",
      ingredients: [],
      allergens: [],
      isFeatured: false,
      isAvailable: true,
    });
    setEditingItem(null);
  };

  const addIngredient = () => {
    if (newIngredient.trim()) {
      setFormData({
        ...formData,
        ingredients: [...formData.ingredients, newIngredient.trim()],
      });
      setNewIngredient("");
    }
  };

  const removeIngredient = (index) => {
    setFormData({
      ...formData,
      ingredients: formData.ingredients.filter((_, i) => i !== index),
    });
  };

  const addAllergen = () => {
    if (newAllergen.trim()) {
      setFormData({
        ...formData,
        allergens: [...formData.allergens, newAllergen.trim()],
      });
      setNewAllergen("");
    }
  };

  const removeAllergen = (index) => {
    setFormData({
      ...formData,
      allergens: formData.allergens.filter((_, i) => i !== index),
    });
  };

  const categories = [
    "Appetizer",
    "Main Course",
    "Dessert",
    "Beverage",
    "Soup",
    "Salad",
    "Side Dish",
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-gray-900">Menu Management</h2>
        <button
          onClick={() => {
            resetForm();
            setShowModal(true);
          }}
          className="bg-gradient-to-r from-orange-600 to-red-600 text-white px-4 py-2 rounded-lg hover:from-orange-700 hover:to-red-700 transition-all duration-300"
        >
          Add Menu Item
        </button>
      </div>

      {loading ? (
        <div className="flex justify-center items-center py-12">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-orange-600"></div>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {menuItems.map((item) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white rounded-lg shadow-md overflow-hidden border border-gray-200"
            >
              <div className="relative">
                <img
                  src={item.imageUrl || "https://via.placeholder.com/400x250"}
                  alt={item.name}
                  className="w-full h-48 object-cover"
                />
                <div className="absolute top-2 left-2 flex space-x-1">
                  {item.isFeatured && (
                    <span className="bg-orange-500 text-white px-2 py-1 rounded text-xs font-semibold">
                      Featured
                    </span>
                  )}
                  <span
                    className={`px-2 py-1 rounded text-xs font-semibold ${
                      item.isAvailable
                        ? "bg-green-500 text-white"
                        : "bg-red-500 text-white"
                    }`}
                  >
                    {item.isAvailable ? "Available" : "Unavailable"}
                  </span>
                </div>
              </div>

              <div className="p-4">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="text-lg font-semibold text-gray-900">
                    {item.name}
                  </h3>
                  <span className="text-lg font-bold text-orange-600">
                    ${item.price}
                  </span>
                </div>

                <p className="text-gray-600 text-sm mb-2 line-clamp-2">
                  {item.description}
                </p>

                <div className="flex items-center justify-between mb-2">
                  <span className="bg-orange-100 text-orange-800 px-2 py-1 rounded text-xs">
                    {item.category}
                  </span>
                </div>

                <div className="flex space-x-2">
                  <button
                    onClick={() => handleEdit(item)}
                    className="flex-1 bg-blue-600 text-white px-3 py-2 rounded text-sm hover:bg-blue-700 transition-colors"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(item.id)}
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

      {/* Menu Item Modal */}
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
                  {editingItem ? "Edit Menu Item" : "Add Menu Item"}
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
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Name *
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.name}
                      onChange={(e) =>
                        setFormData({ ...formData, name: e.target.value })
                      }
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
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
                      onChange={(e) =>
                        setFormData({ ...formData, price: e.target.value })
                      }
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Description
                  </label>
                  <textarea
                    rows={3}
                    value={formData.description}
                    onChange={(e) =>
                      setFormData({ ...formData, description: e.target.value })
                    }
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Image URL
                  </label>
                  <input
                    type="url"
                    value={formData.imageUrl}
                    onChange={(e) =>
                      setFormData({ ...formData, imageUrl: e.target.value })
                    }
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Category
                  </label>
                  <select
                    value={formData.category}
                    onChange={(e) =>
                      setFormData({ ...formData, category: e.target.value })
                    }
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                  >
                    {categories.map((category) => (
                      <option key={category} value={category}>
                        {category}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Ingredients
                  </label>
                  <div className="flex space-x-2 mb-2">
                    <input
                      type="text"
                      value={newIngredient}
                      onChange={(e) => setNewIngredient(e.target.value)}
                      onKeyPress={(e) => e.key === "Enter" && (e.preventDefault(), addIngredient())}
                      placeholder="Add ingredient..."
                      className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                    />
                    <button
                      type="button"
                      onClick={addIngredient}
                      className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
                    >
                      Add
                    </button>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {formData.ingredients.map((ingredient, index) => (
                      <span
                        key={index}
                        className="bg-blue-100 text-blue-800 px-2 py-1 rounded text-sm flex items-center space-x-1"
                      >
                        <span>{ingredient}</span>
                        <button
                          type="button"
                          onClick={() => removeIngredient(index)}
                          className="text-blue-600 hover:text-blue-800"
                        >
                          ×
                        </button>
                      </span>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Allergens
                  </label>
                  <div className="flex space-x-2 mb-2">
                    <input
                      type="text"
                      value={newAllergen}
                      onChange={(e) => setNewAllergen(e.target.value)}
                      onKeyPress={(e) => e.key === "Enter" && (e.preventDefault(), addAllergen())}
                      placeholder="Add allergen..."
                      className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                    />
                    <button
                      type="button"
                      onClick={addAllergen}
                      className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition-colors"
                    >
                      Add
                    </button>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {formData.allergens.map((allergen, index) => (
                      <span
                        key={index}
                        className="bg-red-100 text-red-800 px-2 py-1 rounded text-sm flex items-center space-x-1"
                      >
                        <span>{allergen}</span>
                        <button
                          type="button"
                          onClick={() => removeAllergen(index)}
                          className="text-red-600 hover:text-red-800"
                        >
                          ×
                        </button>
                      </span>
                    ))}
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <label className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      checked={formData.isFeatured}
                      onChange={(e) =>
                        setFormData({ ...formData, isFeatured: e.target.checked })
                      }
                      className="rounded border-gray-300 text-orange-600 focus:ring-orange-500"
                    />
                    <span className="text-sm font-medium text-gray-700">
                      Featured Item
                    </span>
                  </label>

                  <label className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      checked={formData.isAvailable}
                      onChange={(e) =>
                        setFormData({ ...formData, isAvailable: e.target.checked })
                      }
                      className="rounded border-gray-300 text-orange-600 focus:ring-orange-500"
                    />
                    <span className="text-sm font-medium text-gray-700">
                      Available
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
                    className="bg-gradient-to-r from-orange-600 to-red-600 text-white px-6 py-2 rounded-lg hover:from-orange-700 hover:to-red-700 transition-all duration-300"
                  >
                    {editingItem ? "Update Item" : "Add Item"}
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

AdminMenu.displayName = "AdminMenu";

export default AdminMenu;
