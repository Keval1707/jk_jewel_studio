import React, { useContext, useEffect, useState } from "react";
import { CartContext } from "../context/CartContext";
import { Link, useNavigate, useLocation } from "react-router-dom";
import DeliveryForm from "../components/DeliveryForm";
import { postPlaceOrder } from "../utils/api";

const PlaceOrder = () => {
  const { cartItems, cartTotal, cartCount, clearCart } = useContext(CartContext);
  const navigate = useNavigate();
  const location = useLocation();

  const [orderItems, setOrderItems] = useState(cartItems);
  const [orderTotal, setOrderTotal] = useState(cartTotal);
  const [orderCount, setOrderCount] = useState(cartCount);
  const [loading, setLoading] = useState(false); // <- loading state

  const deliveryFee = 50;
  const gstAmount = orderTotal * 0.18;
  const grandTotal = orderTotal + gstAmount + deliveryFee;

  useEffect(() => {
    if (location.state && location.state.singleProduct) {
      const singleProduct = location.state.singleProduct;
      setOrderItems([singleProduct]);
      setOrderTotal(singleProduct.price * singleProduct.quantity);
      setOrderCount(singleProduct.quantity);
    }
  }, [location.state]);

  const handleFormSubmit = async (deliveryDetails) => {
    setLoading(true); // Start loading
    try {
      const orderPayload = {
        user: {
          userId: "guest",
          name: deliveryDetails.fullName,
          email: deliveryDetails.email,
          phone: deliveryDetails.phone,
          address: {
            street: deliveryDetails.address,
            city: deliveryDetails.city,
            state: deliveryDetails.state,
            postalCode: deliveryDetails.postalCode,
            country: deliveryDetails.country,
          },
        },
        items: orderItems.map((item) => ({
          product: item.id,
          quantity: item.quantity,
          discountedPrice: item.discountedPrice,
        })),
        totalAmount: orderTotal,
        deliveryFee: deliveryFee,
        gstAmount: gstAmount,
        grandTotal: grandTotal,
      };

      await postPlaceOrder(orderPayload);

      alert("Order confirmed! Thank you.");
      clearCart();
      navigate("/");
    } catch (error) {
      console.error("Failed to place order:", error);
      alert("Failed to place order. Please try again later.");
    } finally {
      setLoading(false); // End loading
    }
  };

  if (orderCount === 0) {
    return (
      <div className="container cart-page empty-cart">
        <h2>No Order</h2>
        <Link to="/jewellery" className="back-to-shop">
          Browse Products
        </Link>
      </div>
    );
  }

  return (
    <div className="container place-order-page">
      <h2>Review Your Order</h2>

      <div className="order-items">
        {orderItems.map((item) => (
          <div key={item.id} className="order-item">
            <img
              src={Array.isArray(item.img) ? item.img[0] : item.img}
              alt={item.name}
            />
            <div className="order-item-details">
              <h4>{item.name}</h4>
              <p>Quantity: {item.quantity}</p>
              <p>
                Subtotal: ₹{(item.discountedPrice * item.quantity).toFixed(2)}
              </p>
            </div>
          </div>
        ))}
      </div>

      <DeliveryForm onSubmit={handleFormSubmit} isSubmitting={loading} />

      <div className="order-summary">
        <h3>Total Items: {orderCount}</h3>
        <h3>Order Total: ₹{orderTotal.toFixed(2)}</h3>
        <h3>Delivery Fee: ₹{deliveryFee.toFixed(2)}</h3>
        <h3>GST (18%): ₹{gstAmount.toFixed(2)}</h3>
        <h3>Grand Total: ₹{grandTotal.toFixed(2)}</h3>
      </div>
    </div>
  );
};

export default PlaceOrder;
