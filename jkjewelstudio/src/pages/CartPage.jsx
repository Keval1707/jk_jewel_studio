import React, { useContext } from "react";
import { CartContext } from "../context/CartContext";
import { Link } from "react-router-dom";

const CartPage = () => {
  const {
    cartItems,
    removeFromCart,
    clearCart,
    updateQuantity,
    cartCount,
    cartTotal,
  } = useContext(CartContext);

  if (cartCount === 0) {
    return (
      <div className="container cart-page empty-cart">
        <h2>Your Cart is Empty</h2>
        <Link to="/jewellery" className="back-to-shop">
          Browse Products
        </Link>
      </div>
    );
  }

  return (
    <div className="container cart-page">
      <h2>Your Shopping Cart ({cartCount} items)</h2>
      <div className="cart-items">
        {cartItems.map((item) => (
          <div key={item.id} className="cart-item">
            <img
              src={Array.isArray(item.img) ? item.img[0] : item.img}
              alt={item.name}
            />
            <div className="cart-item-details">
              <h4>{item.name}</h4>
              <p>Price: ${item.price}</p>
              <div className="quantity-control">
                <button onClick={() => updateQuantity(item.id, item.quantity - 1)}>
                  -
                </button>
                <span>{item.quantity}</span>
                <button onClick={() => updateQuantity(item.id, item.quantity + 1)}>
                  +
                </button>
              </div>
              <p>Subtotal: ${(item.price * item.quantity)}</p>
              <button
                className="remove-btn"
                onClick={() => removeFromCart(item.id)}
              >
                Remove
              </button>
            </div>
          </div>
        ))}
      </div>

      <div className="cart-summary">
        <h3>Total: ${cartTotal}</h3>
        <div className="cart-actions">
          <button onClick={clearCart} className="clear-btn">
            Clear Cart
          </button>
          <button className="checkout-btn">Proceed to Checkout</button>
        </div>
      </div>
    </div>
  );
};

export default CartPage;