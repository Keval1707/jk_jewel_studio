const mongoose = require("mongoose");

const orderItemSchema = new mongoose.Schema({
  product: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Product",
    required: true,
  },
  quantity: { type: Number, required: true },
  priceAtPurchase: { type: Number, required: true },
  discountedPrice: { type: Number },
});

const placeOrderSchema = new mongoose.Schema(
  {
    user: {
      userId: { type: String, required: true },
      name: { type: String, required: true },
      email: { type: String, required: true },
      phone: { type: String },
      address: {
        street: { type: String, required: true },
        city: { type: String, required: true },
        state: { type: String, required: true },
        postalCode: { type: String, required: true },
        country: { type: String, required: true },
      },
    },
    items: [orderItemSchema],
    totalAmount: { type: Number, required: true },
    deliveryFee: { type: Number, required: true },
    gstAmount: { type: Number, required: true },
    grandTotal: { type: Number, required: true },
    status: {
      type: String,
      enum: ["pending", "confirmed", "shipped", "delivered", "cancelled"],
      default: "pending",
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("PlaceOrder", placeOrderSchema);
