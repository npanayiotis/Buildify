import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const AdminOrders = ({ tenantId }) => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [filters, setFilters] = useState({
    status: "",
    page: 1,
    limit: 10,
  });

  useEffect(() => {
    fetchOrders();
  }, [tenantId, filters]);

  const fetchOrders = async () => {
    try {
      setLoading(true);
      const queryParams = new URLSearchParams({
        page: filters.page.toString(),
        limit: filters.limit.toString(),
        ...(filters.status !== "" && { status: filters.status }),
      });

      const response = await fetch(
        `/api/templates/fashion-boutique/orders?${queryParams}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      const data = await response.json();
      if (data.success) {
        setOrders(data.data);
      }
    } catch (error) {
      console.error("Error fetching orders:", error);
    } finally {
      setLoading(false);
    }
  };

  const updateOrderStatus = async (orderId, status) => {
    try {
      const response = await fetch(
        `/api/templates/fashion-boutique/orders/${orderId}?action=status`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
          body: JSON.stringify({ status }),
        }
      );

      const data = await response.json();
      if (data.success) {
        fetchOrders();
      }
    } catch (error) {
      console.error("Error updating order status:", error);
    }
  };

  const openModal = (order) => {
    setSelectedOrder(order);
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setSelectedOrder(null);
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

  const getStatusColor = (status) => {
    const colors = {
      PENDING: "bg-yellow-100 text-yellow-800",
      PROCESSING: "bg-blue-100 text-blue-800",
      SHIPPED: "bg-purple-100 text-purple-800",
      DELIVERED: "bg-green-100 text-green-800",
      CANCELLED: "bg-red-100 text-red-800",
      REFUNDED: "bg-gray-100 text-gray-800",
    };
    return colors[status] || "bg-gray-100 text-gray-800";
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
        <h2 className="text-2xl font-bold text-gray-900">Orders Management</h2>
        <div className="flex items-center space-x-4">
          <select
            value={filters.status}
            onChange={(e) =>
              setFilters((prev) => ({ ...prev, status: e.target.value, page: 1 }))
            }
            className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-pink-500"
          >
            <option value="">All Orders</option>
            <option value="PENDING">Pending</option>
            <option value="PROCESSING">Processing</option>
            <option value="SHIPPED">Shipped</option>
            <option value="DELIVERED">Delivered</option>
            <option value="CANCELLED">Cancelled</option>
            <option value="REFUNDED">Refunded</option>
          </select>
        </div>
      </div>

      {/* Orders List */}
      <div className="space-y-4">
        {orders.length === 0 ? (
          <div className="text-center py-12">
            <div className="text-6xl mb-4">📦</div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">
              No orders yet
            </h3>
            <p className="text-gray-500">
              Orders placed by customers will appear here.
            </p>
          </div>
        ) : (
          orders.map((order) => (
            <motion.div
              key={order.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white rounded-lg border p-6 hover:shadow-md transition-shadow cursor-pointer"
              onClick={() => openModal(order)}
            >
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center space-x-3 mb-2">
                    <h3 className="text-lg font-semibold text-gray-900">
                      Order #{order.orderNumber}
                    </h3>
                    <span
                      className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(
                        order.status
                      )}`}
                    >
                      {order.status}
                    </span>
                  </div>

                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm text-gray-600 mb-4">
                    <div>
                      <p className="font-medium text-gray-900">Customer</p>
                      <p>{order.customerName}</p>
                    </div>
                    <div>
                      <p className="font-medium text-gray-900">Email</p>
                      <p>{order.customerEmail}</p>
                    </div>
                    <div>
                      <p className="font-medium text-gray-900">Total</p>
                      <p className="font-semibold text-green-600">
                        ${order.totalAmount.toFixed(2)}
                      </p>
                    </div>
                    <div>
                      <p className="font-medium text-gray-900">Date</p>
                      <p>{formatDate(order.createdAt)}</p>
                    </div>
                  </div>

                  <div className="flex items-center space-x-2">
                    <span className="text-sm text-gray-500">
                      {order.items?.length || 0} items
                    </span>
                    <span className="text-sm text-gray-500">•</span>
                    <span className="text-sm text-gray-500">
                      Payment: {order.paymentStatus}
                    </span>
                  </div>
                </div>

                <div className="flex items-center space-x-2">
                  <select
                    value={order.status}
                    onChange={(e) => {
                      e.stopPropagation();
                      updateOrderStatus(order.id, e.target.value);
                    }}
                    className="px-3 py-1 border border-gray-300 rounded text-sm focus:ring-2 focus:ring-pink-500 focus:border-pink-500"
                    onClick={(e) => e.stopPropagation()}
                  >
                    <option value="PENDING">Pending</option>
                    <option value="PROCESSING">Processing</option>
                    <option value="SHIPPED">Shipped</option>
                    <option value="DELIVERED">Delivered</option>
                    <option value="CANCELLED">Cancelled</option>
                    <option value="REFUNDED">Refunded</option>
                  </select>
                </div>
              </div>
            </motion.div>
          ))
        )}
      </div>

      {/* Order Details Modal */}
      <AnimatePresence>
        {showModal && selectedOrder && (
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
                  Order Details - #{selectedOrder.orderNumber}
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

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {/* Customer Information */}
                <div>
                  <h4 className="text-lg font-semibold text-gray-900 mb-4">
                    Customer Information
                  </h4>
                  <div className="space-y-2 text-sm">
                    <p>
                      <span className="font-medium">Name:</span>{" "}
                      {selectedOrder.customerName}
                    </p>
                    <p>
                      <span className="font-medium">Email:</span>{" "}
                      {selectedOrder.customerEmail}
                    </p>
                    {selectedOrder.customerPhone && (
                      <p>
                        <span className="font-medium">Phone:</span>{" "}
                        {selectedOrder.customerPhone}
                      </p>
                    )}
                  </div>

                  <h4 className="text-lg font-semibold text-gray-900 mb-4 mt-6">
                    Shipping Address
                  </h4>
                  <div className="space-y-1 text-sm text-gray-600">
                    <p>{selectedOrder.shippingAddress}</p>
                    <p>
                      {selectedOrder.shippingCity}, {selectedOrder.shippingState}{" "}
                      {selectedOrder.shippingZip}
                    </p>
                    <p>{selectedOrder.shippingCountry}</p>
                  </div>
                </div>

                {/* Order Summary */}
                <div>
                  <h4 className="text-lg font-semibold text-gray-900 mb-4">
                    Order Summary
                  </h4>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span>Subtotal:</span>
                      <span>${selectedOrder.subtotal.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Tax:</span>
                      <span>${selectedOrder.taxAmount.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Shipping:</span>
                      <span>${selectedOrder.shippingAmount.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between font-semibold border-t pt-2">
                      <span>Total:</span>
                      <span>${selectedOrder.totalAmount.toFixed(2)}</span>
                    </div>
                  </div>

                  <div className="mt-6">
                    <h4 className="text-lg font-semibold text-gray-900 mb-2">
                      Status
                    </h4>
                    <div className="flex items-center space-x-2">
                      <span
                        className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(
                          selectedOrder.status
                        )}`}
                      >
                        {selectedOrder.status}
                      </span>
                      <span
                        className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${
                          selectedOrder.paymentStatus === "COMPLETED"
                            ? "bg-green-100 text-green-800"
                            : "bg-yellow-100 text-yellow-800"
                        }`}
                      >
                        Payment: {selectedOrder.paymentStatus}
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Order Items */}
              <div className="mt-8">
                <h4 className="text-lg font-semibold text-gray-900 mb-4">
                  Order Items
                </h4>
                <div className="space-y-4">
                  {selectedOrder.items?.map((item) => (
                    <div
                      key={item.id}
                      className="flex items-center space-x-4 p-4 border border-gray-200 rounded-lg"
                    >
                      <img
                        src={
                          item.product?.images[0] ||
                          "https://via.placeholder.com/100x100"
                        }
                        alt={item.product?.name}
                        className="w-16 h-16 object-cover rounded-lg"
                      />
                      <div className="flex-1">
                        <h5 className="font-semibold text-gray-900">
                          {item.product?.name}
                        </h5>
                        <p className="text-gray-600 text-sm">
                          Quantity: {item.quantity}
                        </p>
                      </div>
                      <div className="text-lg font-bold text-gray-900">
                        ${item.price.toFixed(2)}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="flex justify-end space-x-3 pt-6 border-t border-gray-200">
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

export default AdminOrders;
