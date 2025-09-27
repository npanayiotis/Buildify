import React, { useState, useEffect, memo } from "react";
import { motion, AnimatePresence } from "framer-motion";

const AdminProjects = memo(() => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [editingProject, setEditingProject] = useState(null);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    category: "Portfolio",
    images: [],
    isFeatured: false,
  });
  const [newImage, setNewImage] = useState("");

  useEffect(() => {
    fetchProjects();
  }, []);

  const fetchProjects = async () => {
    try {
      setLoading(true);
      const response = await fetch("/api/templates/photography-portfolio/projects");
      const data = await response.json();
      if (data.success) {
        setProjects(data.data);
      }
    } catch (error) {
      console.error("Error fetching projects:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const url = editingProject
        ? `/api/templates/photography-portfolio/projects/${editingProject.id}`
        : "/api/templates/photography-portfolio/projects";
      const method = editingProject ? "PUT" : "POST";

      const response = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();
      if (data.success) {
        fetchProjects();
        resetForm();
        setShowModal(false);
      }
    } catch (error) {
      console.error("Error saving project:", error);
    }
  };

  const handleEdit = (project) => {
    setEditingProject(project);
    setFormData({
      title: project.title,
      description: project.description,
      category: project.category,
      images: project.images || [],
      isFeatured: project.isFeatured,
    });
    setShowModal(true);
  };

  const handleDelete = async (id) => {
    if (confirm("Are you sure you want to delete this project?")) {
      try {
        const response = await fetch(`/api/templates/photography-portfolio/projects/${id}`, {
          method: "DELETE",
        });
        const data = await response.json();
        if (data.success) {
          fetchProjects();
        }
      } catch (error) {
        console.error("Error deleting project:", error);
      }
    }
  };

  const resetForm = () => {
    setFormData({
      title: "",
      description: "",
      category: "Portfolio",
      images: [],
      isFeatured: false,
    });
    setEditingProject(null);
    setNewImage("");
  };

  const addImage = () => {
    if (newImage.trim()) {
      setFormData({
        ...formData,
        images: [...formData.images, newImage.trim()],
      });
      setNewImage("");
    }
  };

  const removeImage = (index) => {
    setFormData({
      ...formData,
      images: formData.images.filter((_, i) => i !== index),
    });
  };

  const categories = [
    "Portfolio",
    "Portrait",
    "Landscape",
    "Architecture",
    "Street",
    "Wedding",
    "Event",
    "Commercial",
    "Fashion",
    "Nature",
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-gray-900">Portfolio Management</h2>
        <button
          onClick={() => {
            resetForm();
            setShowModal(true);
          }}
          className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-4 py-2 rounded-lg hover:from-blue-700 hover:to-purple-700 transition-all duration-300"
        >
          Add Project
        </button>
      </div>

      {loading ? (
        <div className="flex justify-center items-center py-12">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((project) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white rounded-lg shadow-md overflow-hidden border border-gray-200"
            >
              <div className="relative">
                <img
                  src={project.images[0] || "https://via.placeholder.com/400x250"}
                  alt={project.title}
                  className="w-full h-48 object-cover"
                />
                <div className="absolute top-2 left-2 flex space-x-1">
                  {project.isFeatured && (
                    <span className="bg-blue-500 text-white px-2 py-1 rounded text-xs font-semibold">
                      Featured
                    </span>
                  )}
                </div>
                <div className="absolute top-2 right-2 bg-black/50 text-white px-2 py-1 rounded text-xs">
                  {project.images.length} photos
                </div>
              </div>

              <div className="p-4">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="text-lg font-semibold text-gray-900">
                    {project.title}
                  </h3>
                  <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded text-xs">
                    {project.category}
                  </span>
                </div>

                <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                  {project.description}
                </p>

                <div className="flex space-x-2">
                  <button
                    onClick={() => handleEdit(project)}
                    className="flex-1 bg-blue-600 text-white px-3 py-2 rounded text-sm hover:bg-blue-700 transition-colors"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(project.id)}
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

      {/* Project Modal */}
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
                  {editingProject ? "Edit Project" : "Add Project"}
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
                    Description
                  </label>
                  <textarea
                    rows={3}
                    value={formData.description}
                    onChange={(e) =>
                      setFormData({ ...formData, description: e.target.value })
                    }
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
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
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
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
                    Images *
                  </label>
                  <div className="flex space-x-2 mb-2">
                    <input
                      type="url"
                      value={newImage}
                      onChange={(e) => setNewImage(e.target.value)}
                      onKeyPress={(e) => e.key === "Enter" && (e.preventDefault(), addImage())}
                      placeholder="Add image URL..."
                      className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    />
                    <button
                      type="button"
                      onClick={addImage}
                      className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
                    >
                      Add
                    </button>
                  </div>
                  <div className="space-y-2 max-h-32 overflow-y-auto">
                    {formData.images.map((image, index) => (
                      <div
                        key={index}
                        className="flex items-center space-x-2 p-2 bg-gray-50 rounded"
                      >
                        <img
                          src={image}
                          alt={`Preview ${index + 1}`}
                          className="w-12 h-12 object-cover rounded"
                          onError={(e) => {
                            e.target.style.display = "none";
                          }}
                        />
                        <span className="flex-1 text-sm text-gray-600 truncate">
                          {image}
                        </span>
                        <button
                          type="button"
                          onClick={() => removeImage(index)}
                          className="text-red-600 hover:text-red-800"
                        >
                          ×
                        </button>
                      </div>
                    ))}
                  </div>
                  {formData.images.length === 0 && (
                    <p className="text-sm text-red-600">
                      At least one image is required
                    </p>
                  )}
                </div>

                <div>
                  <label className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      checked={formData.isFeatured}
                      onChange={(e) =>
                        setFormData({ ...formData, isFeatured: e.target.checked })
                      }
                      className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                    />
                    <span className="text-sm font-medium text-gray-700">
                      Featured Project
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
                    disabled={formData.images.length === 0}
                    className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-2 rounded-lg hover:from-blue-700 hover:to-purple-700 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {editingProject ? "Update Project" : "Add Project"}
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

AdminProjects.displayName = "AdminProjects";

export default AdminProjects;
