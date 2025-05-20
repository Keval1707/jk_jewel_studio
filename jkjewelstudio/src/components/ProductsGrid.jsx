import React, { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { CartContext } from "../context/CartContext";
import FadeIn from "./FadeIn";

const ProductsGrid = ({ data, categories }) => {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const { addToCart } = useContext(CartContext);
  const navigate = useNavigate();

  const filteredData =
    selectedCategory === "All"
      ? data
      : data.filter((item) => item.category === selectedCategory);

  return (
    <div className="products-container">
      <div className="category-filters">
        {["All", ...categories].map((category) => (
          <button
            key={category}
            onClick={() => setSelectedCategory(category)}
            className={`filter-btn ${selectedCategory === category ? "active" : ""}`}
          >
            {category}
          </button>
        ))}
      </div>

      <div className="products-grid">
        {filteredData.map((item) => {
          const discountPercent = parseFloat(item.discount);
          const hasDiscount = item.discount && discountPercent > 0;
          const discountedPrice = hasDiscount
            ? (item.price * (1 - discountPercent / 100)).toFixed(2)
            : null;

          return (
            <div key={item.id} className="product-card">
              <FadeIn>
                <img
                  src={Array.isArray(item.img) ? item.img[0] : item.img}
                  alt={item.name}
                  onClick={() => navigate(`/products/${item.id}`)}
                  style={{ cursor: "pointer" }}
                />
                <h3>{item.name}</h3>

                <p className="product-price">
                  {hasDiscount ? (
                    <>
                      <span className="discounted-price">₹{discountedPrice}</span>{" "}
                      <span className="old-price">₹{item.price}</span>{" "}
                      <span className="discount-tag">({item.discount} OFF)</span>
                    </>
                  ) : (
                    `$${item.price}`
                  )}
                </p>

                <div className="product-btn-group">
                  <Link to={`/products/${item.id}`} className="Products-btn">
                    View Details
                  </Link>
                  <button
                    className="Products-btn"
                    onClick={() => addToCart({ ...item, quantity: 1 })}
                  >
                    Add to Cart
                  </button>
                </div>
              </FadeIn>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ProductsGrid;
