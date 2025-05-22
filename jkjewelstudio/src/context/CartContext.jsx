import React, { createContext, useState, useEffect } from "react";

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
  // Helper to parse discount string or number
  const parseDiscount = (discount) => {
    if (!discount) return 0;
    if (typeof discount === "string") {
      return parseFloat(discount.replace("%", "").trim()) || 0;
    }
    return discount;
  };

  // Calculate discounted price
  const getDiscountedPrice = (price, discount) => {
    const discountNum = parseDiscount(discount);
    if (discountNum > 0) {
      return price * (1 - discountNum / 100);
    }
    return price;
  };

  // Initialize cart from localStorage
  const [cartItems, setCartItems] = useState(() => {
    if (typeof window !== "undefined") {
      const savedCart = localStorage.getItem("cart");
      return savedCart ? JSON.parse(savedCart) : [];
    }
    return [];
  });

  // Save cart to localStorage whenever cartItems change
  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cartItems));
  }, [cartItems]);

  // Add to cart: calculate and store discountedPrice
  const addToCart = (product) => {
    setCartItems((prevItems) => {
      const discountedPrice = getDiscountedPrice(product.price, product.discount);
      const existingItem = prevItems.find((item) => item.id === product.id);
      if (existingItem) {
        return prevItems.map((item) =>
          item.id === product.id
            ? { 
                ...item, 
                quantity: item.quantity + (product.quantity || 1),
                discountedPrice, // Update discountedPrice in case discount changed
              }
            : item
        );
      }
      return [
        ...prevItems,
        { 
          ...product, 
          quantity: product.quantity || 1,
          discountedPrice,
        },
      ];
    });
  };

  // Remove item from cart
  const removeFromCart = (id) => {
    setCartItems((prevItems) => prevItems.filter((item) => item.id !== id));
  };

  // Clear all items
  const clearCart = () => setCartItems([]);

  // Update quantity of an item
  const updateQuantity = (id, newQuantity) => {
    if (newQuantity < 1) return;
    setCartItems((prevItems) =>
      prevItems.map((item) =>
        item.id === id ? { ...item, quantity: newQuantity } : item
      )
    );
  };

  // Total item count
  const cartCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  // Total price using discountedPrice
  const cartTotal = cartItems.reduce(
    (sum, item) => sum + (item.discountedPrice || item.price) * item.quantity,
    0
  );

  return (
    <CartContext.Provider
      value={{
        cartItems,
        addToCart,
        removeFromCart,
        clearCart,
        updateQuantity,
        cartCount,
        cartTotal,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};
