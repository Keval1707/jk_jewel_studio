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
        <Link to="/shop" className="back-to-shop">
          Browse Products
        </Link>
      </div>
    );
  }

  return (
    <div className="container cart-page">
      <h2>Your Shopping Cart ({cartCount} items)</h2>
      <div className="cart-items">
        {cartItems.map((item) => {
          const hasDiscount = item.discountedPrice < item.price;
          const discountNum = hasDiscount
            ? Math.round(
                ((item.price - item.discountedPrice) / item.price) * 100
              )
            : 0;

          const subtotal = item.discountedPrice * item.quantity;

          return (
            <div key={item.id} className="cart-item">
              <img
                src={Array.isArray(item.img) ? item.img[0] : item.img}
                alt={item.name}
              />
              <div className="cart-item-details">
                <h4>{item.name}</h4>

                <p>
                  Price:{" "}
                  {hasDiscount ? (
                    <>
                      <span
                        style={{
                          textDecoration: "line-through",
                          color: "grey",
                        }}
                      >
                        ₹{item.price.toFixed(2)}
                      </span>{" "}
                      <span style={{ color: "green", fontWeight: "bold" }}>
                        ₹{item.discountedPrice.toFixed(2)}
                      </span>{" "}
                      <small style={{ color: "red" }}>
                        ({discountNum}% OFF)
                      </small>
                    </>
                  ) : (
                    <>₹{item.price.toFixed(2)}</>
                  )}
                </p>

                <div className="quantity-control">
                  <button
                    onClick={() => updateQuantity(item.id, item.quantity - 1)}
                    disabled={item.quantity <= 1}
                  >
                    -
                  </button>
                  <span>{item.quantity}</span>
                  <button onClick={() => updateQuantity(item.id, item.quantity + 1)}>
                    +
                  </button>
                </div>

                <p>Subtotal: ₹{subtotal.toFixed(2)}</p>

                <button
                  className="remove-btn"
                  onClick={() => removeFromCart(item.id)}
                >
                  Remove
                </button>
              </div>
            </div>
          );
        })}
      </div>

      <div className="cart-summary">
        <h3>Total: ₹{cartTotal.toFixed(2)}</h3>
        <div className="cart-actions">
          <button onClick={clearCart} className="clear-btn">
            Clear Cart
          </button>
          <Link to="/placeorder" className="checkout-btn">
            Proceed to Checkout
          </Link>
        </div>
      </div>
    </div>
  );
};

export default CartPage;
