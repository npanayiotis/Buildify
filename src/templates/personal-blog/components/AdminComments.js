import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const AdminComments = ({ tenantId }) => {
  const [comments, setComments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedComment, setSelectedComment] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [filters, setFilters] = useState({
    approved: "",
    page: 1,
    limit: 20,
  });
  const [stats, setStats] = useState({ total: 0, pending: 0, approved: 0 });

  useEffect(() => {
    fetchComments();
    fetchStats();
  }, [tenantId, filters]);

  const fetchComments = async () => {
    try {
      setLoading(true);
      const queryParams = new URLSearchParams({
        page: filters.page.toString(),
        limit: filters.limit.toString(),
        ...(filters.approved !== "" && { approved: filters.approved }),
      });

      const response = await fetch(
        `/api/templates/personal-blog/comments?${queryParams}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      const data = await response.json();
      if (data.success) {
        setComments(data.data);
      }
    } catch (error) {
      console.error("Error fetching comments:", error);
    } finally {
      setLoading(false);
    }
  };

  const fetchStats = async () => {
    try {
      const response = await fetch(
        "/api/templates/personal-blog/comments/stats",
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      const data = await response.json();
      if (data.success) {
        setStats(data.data);
      }
    } catch (error) {
      console.error("Error fetching comment stats:", error);
    }
  };

  const approveComment = async (id) => {
    try {
      const response = await fetch(
        `/api/templates/personal-blog/comments/${id}?action=approve`,
        {
          method: "PUT",
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      const data = await response.json();
      if (data.success) {
        fetchComments();
        fetchStats();
      }
    } catch (error) {
      console.error("Error approving comment:", error);
    }
  };

  const deleteComment = async (id) => {
    if (!confirm("Are you sure you want to delete this comment?")) return;

    try {
      const response = await fetch(`/api/templates/personal-blog/comments/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

      const data = await response.json();
      if (data.success) {
        fetchComments();
        fetchStats();
      }
    } catch (error) {
      console.error("Error deleting comment:", error);
    }
  };

  const openModal = (comment) => {
    setSelectedComment(comment);
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setSelectedComment(null);
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
        <h2 className="text-2xl font-bold text-gray-900">Comments Management</h2>
        <div className="flex items-center space-x-4">
          <select
            value={filters.approved}
            onChange={(e) =>
              setFilters((prev) => ({ ...prev, approved: e.target.value, page: 1 }))
            }
            className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          >
            <option value="">All Comments</option>
            <option value="false">Pending Approval</option>
            <option value="true">Approved</option>
          </select>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white rounded-lg shadow-md p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-2">
            Total Comments
          </h3>
          <p className="text-3xl font-bold text-blue-600">{stats.total}</p>
        </div>
        <div className="bg-white rounded-lg shadow-md p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-2">
            Pending Approval
          </h3>
          <p className="text-3xl font-bold text-yellow-600">{stats.pending}</p>
        </div>
        <div className="bg-white rounded-lg shadow-md p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-2">
            Approved
          </h3>
          <p className="text-3xl font-bold text-green-600">{stats.approved}</p>
        </div>
      </div>

      {/* Comments List */}
      <div className="space-y-4">
        {comments.length === 0 ? (
          <div className="text-center py-12">
            <div className="text-6xl mb-4">💬</div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">
              No comments yet
            </h3>
            <p className="text-gray-500">
              Comments from your blog posts will appear here.
            </p>
          </div>
        ) : (
          comments.map((comment) => (
            <motion.div
              key={comment.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white rounded-lg border p-6 hover:shadow-md transition-shadow"
            >
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center space-x-3 mb-2">
                    <h4 className="font-semibold text-gray-900">
                      {comment.author}
                    </h4>
                    <span className="text-sm text-gray-500">
                      {comment.email}
                    </span>
                    <span
                      className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
                        comment.isApproved
                          ? "bg-green-100 text-green-800"
                          : "bg-yellow-100 text-yellow-800"
                      }`}
                    >
                      {comment.isApproved ? "Approved" : "Pending"}
                    </span>
                  </div>

                  <p className="text-gray-700 mb-3 line-clamp-3">
                    {comment.content}
                  </p>

                  <div className="flex items-center space-x-4 text-sm text-gray-500">
                    <span>{formatDate(comment.createdAt)}</span>
                    <span>•</span>
                    <span className="text-blue-600 hover:text-blue-800 cursor-pointer">
                      {comment.post?.title}
                    </span>
                  </div>
                </div>

                <div className="flex items-center space-x-2 ml-4">
                  {!comment.isApproved && (
                    <button
                      onClick={() => approveComment(comment.id)}
                      className="text-green-600 hover:text-green-800 text-sm"
                    >
                      Approve
                    </button>
                  )}
                  <button
                    onClick={() => openModal(comment)}
                    className="text-blue-600 hover:text-blue-800 text-sm"
                  >
                    View
                  </button>
                  <button
                    onClick={() => deleteComment(comment.id)}
                    className="text-red-600 hover:text-red-800 text-sm"
                  >
                    Delete
                  </button>
                </div>
              </div>
            </motion.div>
          ))
        )}
      </div>

      {/* Comment Details Modal */}
      <AnimatePresence>
        {showModal && selectedComment && (
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
                  Comment Details
                </h3>
                <button
                  onClick={closeModal}
                  className="text-gray-400 hover:text-gray-600"
                >
                  <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>

              <div className="space-y-4">
                <div>
                  <h4 className="font-semibold text-gray-900 mb-2">Author</h4>
                  <p className="text-gray-700">{selectedComment.author}</p>
                  <p className="text-sm text-gray-500">{selectedComment.email}</p>
                </div>

                <div>
                  <h4 className="font-semibold text-gray-900 mb-2">Comment</h4>
                  <p className="text-gray-700 bg-gray-50 p-4 rounded-lg">
                    {selectedComment.content}
                  </p>
                </div>

                <div>
                  <h4 className="font-semibold text-gray-900 mb-2">Post</h4>
                  <p className="text-blue-600 hover:text-blue-800">
                    {selectedComment.post?.title}
                  </p>
                </div>

                <div>
                  <h4 className="font-semibold text-gray-900 mb-2">Date</h4>
                  <p className="text-gray-700">{formatDate(selectedComment.createdAt)}</p>
                </div>

                <div>
                  <h4 className="font-semibold text-gray-900 mb-2">Status</h4>
                  <span
                    className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${
                      selectedComment.isApproved
                        ? "bg-green-100 text-green-800"
                        : "bg-yellow-100 text-yellow-800"
                    }`}
                  >
                    {selectedComment.isApproved ? "Approved" : "Pending Approval"}
                  </span>
                </div>
              </div>

              <div className="flex justify-end space-x-3 pt-6 border-t border-gray-200">
                {!selectedComment.isApproved && (
                  <button
                    onClick={() => {
                      approveComment(selectedComment.id);
                      closeModal();
                    }}
                    className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors"
                  >
                    Approve Comment
                  </button>
                )}
                <button
                  onClick={() => {
                    deleteComment(selectedComment.id);
                    closeModal();
                  }}
                  className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition-colors"
                >
                  Delete Comment
                </button>
                <button
                  onClick={closeModal}
                  className="px-4 py-2 text-gray-600 hover:text-gray-800"
                >
                  Close
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default AdminComments;
