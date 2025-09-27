import React, { useState, useEffect, memo } from "react";
import { motion, AnimatePresence } from "framer-motion";

const AdminCaseStudies = memo(() => {
  const [caseStudies, setCaseStudies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [editingCaseStudy, setEditingCaseStudy] = useState(null);
  const [formData, setFormData] = useState({
    title: "",
    slug: "",
    description: "",
    content: "",
    imageUrl: "",
    client: "",
    industry: "",
  });

  useEffect(() => {
    fetchCaseStudies();
  }, []);

  const fetchCaseStudies = async () => {
    try {
      setLoading(true);
      const response = await fetch("/api/templates/consulting-firm/case-studies");
      const data = await response.json();
      if (data.success) {
        setCaseStudies(data.data);
      }
    } catch (error) {
      console.error("Error fetching case studies:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const url = editingCaseStudy
        ? `/api/templates/consulting-firm/case-studies/${editingCaseStudy.id}`
        : "/api/templates/consulting-firm/case-studies";
      const method = editingCaseStudy ? "PUT" : "POST";

      const response = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();
      if (data.success) {
        fetchCaseStudies();
        resetForm();
        setShowModal(false);
      }
    } catch (error) {
      console.error("Error saving case study:", error);
    }
  };

  const handleEdit = (caseStudy) => {
    setEditingCaseStudy(caseStudy);
    setFormData({
      title: caseStudy.title,
      slug: caseStudy.slug,
      description: caseStudy.description,
      content: caseStudy.content,
      imageUrl: caseStudy.imageUrl || "",
      client: caseStudy.client || "",
      industry: caseStudy.industry || "",
    });
    setShowModal(true);
  };

  const handleDelete = async (id) => {
    if (confirm("Are you sure you want to delete this case study?")) {
      try {
        const response = await fetch(`/api/templates/consulting-firm/case-studies/${id}`, {
          method: "DELETE",
        });
        const data = await response.json();
        if (data.success) {
          fetchCaseStudies();
        }
      } catch (error) {
        console.error("Error deleting case study:", error);
      }
    }
  };

  const resetForm = () => {
    setFormData({
      title: "",
      slug: "",
      description: "",
      content: "",
      imageUrl: "",
      client: "",
      industry: "",
    });
    setEditingCaseStudy(null);
  };

  const generateSlug = (title) => {
    return title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/(^-|-$)/g, "");
  };

  const handleTitleChange = (title) => {
    setFormData({
      ...formData,
      title,
      slug: generateSlug(title),
    });
  };

  const industries = [
    "Technology",
    "Healthcare",
    "Finance",
    "Manufacturing",
    "Retail",
    "Education",
    "Energy",
    "Transportation",
    "Real Estate",
    "Government",
    "Non-Profit",
    "Other",
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-gray-900">Case Studies Management</h2>
        <button
          onClick={() => {
            resetForm();
            setShowModal(true);
          }}
          className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-4 py-2 rounded-lg hover:from-blue-700 hover:to-indigo-700 transition-all duration-300"
        >
          Add Case Study
        </button>
      </div>

      {loading ? (
        <div className="flex justify-center items-center py-12">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {caseStudies.map((caseStudy) => (
            <motion.div
              key={caseStudy.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white rounded-lg shadow-md overflow-hidden border border-gray-200"
            >
              <div className="relative">
                <img
                  src={caseStudy.imageUrl || "https://via.placeholder.com/400x250"}
                  alt={caseStudy.title}
                  className="w-full h-48 object-cover"
                />
                <div className="absolute top-2 left-2 flex space-x-1">
                  <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded text-xs">
                    {caseStudy.industry}
                  </span>
                </div>
              </div>

              <div className="p-4">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="text-lg font-semibold text-gray-900">
                    {caseStudy.title}
                  </h3>
                </div>

                <p className="text-gray-600 text-sm mb-2 line-clamp-2">
                  {caseStudy.description}
                </p>

                <p className="text-gray-500 text-xs mb-4">
                  Client: {caseStudy.client || "N/A"}
                </p>

                <div className="flex space-x-2">
                  <button
                    onClick={() => handleEdit(caseStudy)}
                    className="flex-1 bg-blue-600 text-white px-3 py-2 rounded text-sm hover:bg-blue-700 transition-colors"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(caseStudy.id)}
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

      {/* Case Study Modal */}
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
              className="bg-white rounded-lg p-6 w-full max-w-4xl max-h-[90vh] overflow-y-auto"
            >
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-bold text-gray-900">
                  {editingCaseStudy ? "Edit Case Study" : "Add Case Study"}
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
                      Title *
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.title}
                      onChange={(e) => handleTitleChange(e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Slug *
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.slug}
                      onChange={(e) =>
                        setFormData({ ...formData, slug: e.target.value })
                      }
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Description *
                  </label>
                  <textarea
                    rows={3}
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
                    Content *
                  </label>
                  <textarea
                    rows={8}
                    required
                    value={formData.content}
                    onChange={(e) =>
                      setFormData({ ...formData, content: e.target.value })
                    }
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    placeholder="Detailed case study content..."
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
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Client
                    </label>
                    <input
                      type="text"
                      value={formData.client}
                      onChange={(e) =>
                        setFormData({ ...formData, client: e.target.value })
                      }
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Industry
                    </label>
                    <select
                      value={formData.industry}
                      onChange={(e) =>
                        setFormData({ ...formData, industry: e.target.value })
                      }
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    >
                      <option value="">Select Industry</option>
                      {industries.map((industry) => (
                        <option key={industry} value={industry}>
                          {industry}
                        </option>
                      ))}
                    </select>
                  </div>
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
                    {editingCaseStudy ? "Update Case Study" : "Add Case Study"}
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

AdminCaseStudies.displayName = "AdminCaseStudies";

export default AdminCaseStudies;
