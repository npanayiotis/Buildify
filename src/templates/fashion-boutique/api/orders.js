import { prisma } from "../../../shared/database/connection.js";
import {
  authenticateToken,
  requireTenant,
} from "../../../shared/auth/middleware.js";

// POST /api/fashion-boutique/orders - Create new order
export const createOrder = async (req, res) => {
  try {
    const { tenantId } = req;
    const {
      cartItems,
      customerInfo,
      shippingInfo,
      paymentMethod,
    } = req.body;

    // Validate required fields
    if (!cartItems || cartItems.length === 0) {
      return res.status(400).json({ error: "Cart is empty" });
    }

    // Calculate totals
    let subtotal = 0;
    const orderItems = [];

    for (const item of cartItems) {
      const product = await prisma.product.findFirst({
        where: {
          id: item.productId,
          tenantId,
          isActive: true,
        },
      });

      if (!product) {
        return res.status(400).json({ error: `Product ${item.productId} not found` });
      }

      if (product.inventory < item.quantity) {
        return res.status(400).json({ 
          error: `Insufficient inventory for ${product.name}` 
        });
      }

      const itemTotal = product.price * item.quantity;
      subtotal += itemTotal;

      orderItems.push({
        productId: product.id,
        quantity: item.quantity,
        price: product.price,
      });
    }

    // Calculate tax (8.5% example)
    const taxRate = 0.085;
    const taxAmount = subtotal * taxRate;

    // Calculate shipping (free over $100, otherwise $10)
    const shippingAmount = subtotal >= 100 ? 0 : 10;

    const totalAmount = subtotal + taxAmount + shippingAmount;

    // Generate order number
    const orderNumber = `FB-${Date.now()}-${Math.random().toString(36).substr(2, 9).toUpperCase()}`;

    // Create order
    const order = await prisma.order.create({
      data: {
        tenantId,
        orderNumber,
        status: "PENDING",
        customerName: customerInfo.name,
        customerEmail: customerInfo.email,
        customerPhone: customerInfo.phone,
        shippingAddress: shippingInfo.address,
        shippingCity: shippingInfo.city,
        shippingState: shippingInfo.state,
        shippingZip: shippingInfo.zip,
        shippingCountry: shippingInfo.country || "US",
        subtotal,
        taxAmount,
        shippingAmount,
        totalAmount,
        paymentMethod,
        paymentStatus: "PENDING",
      },
    });

    // Create order items
    await Promise.all(
      orderItems.map((item) =>
        prisma.orderItem.create({
          data: {
            orderId: order.id,
            ...item,
          },
        })
      )
    );

    // Update product inventory
    await Promise.all(
      orderItems.map((item) =>
        prisma.product.update({
          where: { id: item.productId },
          data: {
            inventory: {
              decrement: item.quantity,
            },
          },
        })
      )
    );

    // Clear cart
    if (req.body.sessionId) {
      await prisma.cart.deleteMany({
        where: {
          tenantId,
          sessionId: req.body.sessionId,
        },
      });
    }

    res.status(201).json({ 
      success: true, 
      data: { 
        orderId: order.id, 
        orderNumber: order.orderNumber,
        totalAmount: order.totalAmount 
      } 
    });
  } catch (error) {
    console.error("Error creating order:", error);
    res.status(500).json({ error: "Failed to create order" });
  }
};

// GET /api/fashion-boutique/orders - Get orders (Admin)
export const getOrders = async (req, res) => {
  try {
    const { tenantId } = req;
    const { page = 1, limit = 20, status } = req.query;

    const where = { tenantId };
    if (status && status !== "all") {
      where.status = status;
    }

    const skip = (parseInt(page) - 1) * parseInt(limit);

    const [orders, total] = await Promise.all([
      prisma.order.findMany({
        where,
        include: {
          items: {
            include: {
              product: true,
            },
          },
        },
        orderBy: { createdAt: "desc" },
        skip,
        take: parseInt(limit),
      }),
      prisma.order.count({ where }),
    ]);

    res.json({
      success: true,
      data: orders,
      pagination: {
        page: parseInt(page),
        limit: parseInt(limit),
        total,
        pages: Math.ceil(total / parseInt(limit)),
      },
    });
  } catch (error) {
    console.error("Error fetching orders:", error);
    res.status(500).json({ error: "Failed to fetch orders" });
  }
};

// GET /api/fashion-boutique/orders/:id - Get single order
export const getOrder = async (req, res) => {
  try {
    const { tenantId } = req;
    const { id } = req.params;

    const order = await prisma.order.findFirst({
      where: {
        id,
        tenantId,
      },
      include: {
        items: {
          include: {
            product: true,
          },
        },
      },
    });

    if (!order) {
      return res.status(404).json({ error: "Order not found" });
    }

    res.json({ success: true, data: order });
  } catch (error) {
    console.error("Error fetching order:", error);
    res.status(500).json({ error: "Failed to fetch order" });
  }
};

// PUT /api/fashion-boutique/orders/:id/status - Update order status (Admin)
export const updateOrderStatus = async (req, res) => {
  try {
    const { tenantId } = req;
    const { id } = req.params;
    const { status } = req.body;

    const validStatuses = ["PENDING", "PROCESSING", "SHIPPED", "DELIVERED", "CANCELLED", "REFUNDED"];
    if (!validStatuses.includes(status)) {
      return res.status(400).json({ error: "Invalid status" });
    }

    const order = await prisma.order.update({
      where: {
        id,
        tenantId,
      },
      data: { status },
    });

    res.json({ success: true, data: order });
  } catch (error) {
    console.error("Error updating order status:", error);
    res.status(500).json({ error: "Failed to update order status" });
  }
};

// PUT /api/fashion-boutique/orders/:id/payment - Update payment status (Admin)
export const updatePaymentStatus = async (req, res) => {
  try {
    const { tenantId } = req;
    const { id } = req.params;
    const { paymentStatus, transactionId } = req.body;

    const validStatuses = ["PENDING", "COMPLETED", "FAILED", "REFUNDED"];
    if (!validStatuses.includes(paymentStatus)) {
      return res.status(400).json({ error: "Invalid payment status" });
    }

    const order = await prisma.order.update({
      where: {
        id,
        tenantId,
      },
      data: { 
        paymentStatus,
        transactionId,
      },
    });

    res.json({ success: true, data: order });
  } catch (error) {
    console.error("Error updating payment status:", error);
    res.status(500).json({ error: "Failed to update payment status" });
  }
};

// GET /api/fashion-boutique/orders/customer/:email - Get customer orders
export const getCustomerOrders = async (req, res) => {
  try {
    const { tenantId } = req;
    const { email } = req.params;

    const orders = await prisma.order.findMany({
      where: {
        tenantId,
        customerEmail: email,
      },
      include: {
        items: {
          include: {
            product: true,
          },
        },
      },
      orderBy: { createdAt: "desc" },
    });

    res.json({ success: true, data: orders });
  } catch (error) {
    console.error("Error fetching customer orders:", error);
    res.status(500).json({ error: "Failed to fetch customer orders" });
  }
};
