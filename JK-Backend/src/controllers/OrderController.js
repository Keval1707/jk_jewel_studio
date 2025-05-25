const PlaceOrder = require("../models/PlaceOrder");
const Product = require("../models/Product");
const { sendMail } = require("../services/mailService"); // ✅ Import mail service


exports.placeOrder = async (req, res) => {
  try {
    const { user, items, totalAmount, deliveryFee, gstAmount, grandTotal } =
      req.body;

    // Check required fields
    if (
      !user ||
      !user.name ||
      !user.phone ||
      !user.address ||
      !items ||
      items.length === 0
    ) {
      return res
        .status(400)
        .json({ error: "Missing required fields or empty cart." });
    }

    // Enrich items with priceAtPurchase
    const enrichedItems = await Promise.all(
      items.map(async (item) => {
        const product = await Product.findById(item.product);
        if (!product) {
          throw new Error(`Product with id ₹${item.product} not found`);
        }
        return {
          product: product._id,
          quantity: item.quantity,
          priceAtPurchase: product.price,
          discountedPrice: item.discountedPrice,
        };
      })
    );

    const order = new PlaceOrder({
      user,
      items: enrichedItems,
      totalAmount,
      status: "pending",
      deliveryFee,
      gstAmount,
      grandTotal,
    });

    await order.save();

    await sendMail({
      to: user.email,
      subject: "Your Order Confirmation",
      html: `
        <h2>Thank you for your order, ${user.name}!</h2>
        <p>We’ve received your order and are currently processing it.</p>
        <p><strong>Order ID:</strong> ${order._id}</p>
        <p><strong>Total:</strong> ₹${grandTotal.toFixed(2)}</p>
        <p>We’ll notify you once it’s shipped!</p>
      `,
    });

    res.status(201).json({ message: "Order placed successfully", order });
  } catch (error) {
    console.error("Error placing order:", error.message || error);
    res.status(500).json({ error: error.message || "Internal server error" });
  }
};

exports.getAllOrders = async (req, res) => {
  try {
    const orders = await PlaceOrder.find()
      .populate("items.product")
      .sort({ createdAt: -1 });

    res.json(orders);
  } catch (error) {
    console.error("Failed to fetch orders:", error.message || error);
    res.status(500).json({ error: "Failed to fetch orders" });
  }
};

exports.getOrderById = async (req, res) => {
  try {
    const order = await PlaceOrder.findById(req.params.id).populate(
      "items.product"
    );
    if (!order) {
      return res.status(404).json({ error: "Order not found" });
    }
    res.json(order);
  } catch (error) {
    console.error("Failed to fetch order:", error.message || error);
    res.status(500).json({ error: "Failed to fetch order" });
  }
};
exports.updatestauts = async (req, res) => {
  try {
    const { status } = req.body;
    const allowedStatuses = [
      "pending",
      "confirmed",
      "shipped",
      "delivered",
      "cancelled",
    ];

    // Validate status
    if (!status || !allowedStatuses.includes(status)) {
      return res.status(400).json({ error: "Invalid or missing status value" });
    }

    // Update order status
    const order = await PlaceOrder.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true } // return updated document
    ).populate("items.product");

    if (!order) {
      return res.status(404).json({ error: "Order not found" });
    }

    if (order.user?.email) {
      await sendMail({
        to: order.user.email,
        subject: `Your order is now ${status}`,
        html: `
          <h2>Hi ${order.user.name},</h2>
          <p>Your order <strong>₹${order._id}</strong> status has been updated to: <strong>${status}</strong>.</p>
          <p>Thank you for shopping with us.</p>
        `,
      });
    }

    res.json({ message: "Order status updated successfully", order });
  } catch (error) {
    console.error("Failed to update order status:", error.message || error);
    res.status(500).json({ error: "Failed to update order status" });
  }
};
