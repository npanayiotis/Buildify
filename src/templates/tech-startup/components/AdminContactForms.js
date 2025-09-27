import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const AdminContactForms = ({ tenantId }) => {
  const [contactForms, setContactForms] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedForm, setSelectedForm] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [filters, setFilters] = useState({
    isRead: "",
    page: 1,
    limit: 10,
  });

  useEffect(() => {
    fetchContactForms();
  }, [tenantId, filters.page, filters.limit, filters.isRead]);

  const fetchContactForms = async () => {
    try {
      setLoading(true);
      const queryParams = new URLSearchParams({
        page: filters.page.toString(),
        limit: filters.limit.toString(),
        ...(filters.isRead !== "" && { isRead: filters.isRead }),
      });

      const response = await fetch(
        `/api/templates/tech-startup/contact?${queryParams}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      const data = await response.json();
      if (data.success) {
        setContactForms(data.data);
      }
    } catch (error) {
      console.error("Error fetching contact forms:", error);
    } finally {
      setLoading(false);
    }
  };

  const markAsRead = async (id) => {
    try {
      const response = await fetch(
        `/api/templates/tech-startup/contact/${id}?action=read`,
        {
          method: "PUT",
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      const data = await response.json();
      if (data.success) {
        fetchContactForms();
      }
    } catch (error) {
      console.error("Error marking as read:", error);
    }
  };

  const deleteForm = async (id) => {
    if (!confirm("Are you sure you want to delete this contact form?")) return;

    try {
      const response = await fetch(
        `/api/templates/tech-startup/contact/${id}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      const data = await response.json();
      if (data.success) {
        fetchContactForms();
      }
    } catch (error) {
      console.error("Error deleting contact form:", error);
    }
  };

  const openModal = (form) => {
    setSelectedForm(form);
    setShowModal(true);
    if (!form.isRead) {
      markAsRead(form.id);
    }
  };

  const closeModal = () => {
    setShowModal(false);
    setSelectedForm(null);
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
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
        <h2 className="text-2xl font-bold text-gray-900">Contact Forms</h2>
        <div className="flex items-center space-x-4">
          <select
            value={filters.isRead}
            onChange={(e) =>
              setFilters((prev) => ({
                ...prev,
                isRead: e.target.value,
                page: 1,
              }))
            }
            className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          >
            <option value="">All Messages</option>
            <option value="false">Unread</option>
            <option value="true">Read</option>
          </select>
        </div>
      </div>

      {/* Contact Forms List */}
      <div className="space-y-4">
        {contactForms.length === 0 ? (
          <div className="text-center py-12">
            <div className="text-6xl mb-4">📧</div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">
              No contact forms yet
            </h3>
            <p className="text-gray-500">
              Contact forms submitted through your website will appear here.
            </p>
          </div>
        ) : (
          contactForms.map((form) => (
            <motion.div
              key={form.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className={`bg-white rounded-lg border p-6 hover:shadow-md transition-shadow cursor-pointer ${
                !form.isRead ? "border-blue-200 bg-blue-50" : "border-gray-200"
              }`}
              onClick={() => openModal(form)}
            >
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center space-x-3 mb-2">
                    <h3 className="text-lg font-semibold text-gray-900">
                      {form.name}
                    </h3>
                    <span className="text-sm text-gray-500">•</span>
                    <span className="text-sm text-gray-500">{form.email}</span>
                    {!form.isRead && (
                      <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                        New
                      </span>
                    )}
                  </div>

                  <h4 className="text-md font-medium text-gray-800 mb-2">
                    {form.subject}
                  </h4>

                  <p className="text-gray-600 text-sm line-clamp-2">
                    {form.message}
                  </p>

                  <div className="flex items-center justify-between mt-4">
                    <span className="text-xs text-gray-500">
                      {formatDate(form.createdAt)}
                    </span>

                    <div className="flex items-center space-x-2">
                      {!form.isRead && (
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            markAsRead(form.id);
                          }}
                          className="text-xs text-blue-600 hover:text-blue-800"
                        >
                          Mark as read
                        </button>
                      )}
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          deleteForm(form.id);
                        }}
                        className="text-xs text-red-600 hover:text-red-800"
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          ))
        )}
      </div>

      {/* Contact Form Modal */}
      <AnimatePresence>
        {showModal && selectedForm && (
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
                  Contact Form Details
                </h3>
                <button
                  onClick={closeModal}
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

              <div className="space-y-6">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Name
                    </label>
                    <p className="text-gray-900">{selectedForm.name}</p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Email
                    </label>
                    <p className="text-gray-900">{selectedForm.email}</p>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Subject
                  </label>
                  <p className="text-gray-900">{selectedForm.subject}</p>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Message
                  </label>
                  <div className="bg-gray-50 rounded-lg p-4">
                    <p className="text-gray-900 whitespace-pre-wrap">
                      {selectedForm.message}
                    </p>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Received
                  </label>
                  <p className="text-gray-900">
                    {formatDate(selectedForm.createdAt)}
                  </p>
                </div>

                <div className="flex justify-end space-x-3 pt-4 border-t border-gray-200">
                  <a
                    href={`mailto:${selectedForm.email}?subject=Re: ${selectedForm.subject}`}
                    className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
                  >
                    Reply via Email
                  </a>
                  <button
                    onClick={closeModal}
                    className="px-4 py-2 text-gray-600 hover:text-gray-800"
                  >
                    Close
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default AdminContactForms;
