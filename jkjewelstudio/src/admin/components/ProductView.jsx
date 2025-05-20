import React, { useState } from "react";

const ProductView = ({ product, onClose }) => {
  const [mainImage, setMainImage] = useState(product.img?.[0] || "");

  // Calculate discounted price if discount present
  const discountPercent = product.discount ? parseFloat(product.discount) : 0;
  const discountedPrice = discountPercent
    ? (product.price * (1 - discountPercent / 100)).toFixed(2)
    : null;

  return (
    <div className="admin-modal-overlay">
      <div className="admin-modal">
        <div className="admin-modal-header">
          <h3>Product Details</h3>
          <button className="admin-modal-close" onClick={onClose}>
            &times;
          </button>
        </div>

        <div className="admin-modal-content">
          <div
            className="admin-product-view-grid"
            style={{ display: "flex", gap: "20px" }}
          >
            <div className="admin-product-view-images" style={{ flex: "1" }}>
              {mainImage ? (
                <div
                  className="admin-product-image-main"
                  style={{ marginBottom: "10px" }}
                >
                  <img
                    src={mainImage}
                    alt={product.name}
                    style={{
                      width: "100%",
                      maxHeight: "300px",
                      objectFit: "contain",
                    }}
                  />
                </div>
              ) : (
                <div className="admin-product-image-placeholder">
                  No images available
                </div>
              )}
              <div
                className="admin-product-image-thumbnails"
                style={{ display: "flex", gap: "10px", flexWrap: "wrap" }}
              >
                {product.img?.map((src, idx) => (
                  <img
                    key={idx}
                    src={src}
                    alt={`${product.name} thumbnail ${idx + 1}`}
                    onClick={() => setMainImage(src)}
                    style={{
                      cursor: "pointer",
                      border:
                        mainImage === src
                          ? "2px solid #3498db"
                          : "1px solid #ccc",
                      borderRadius: "4px",
                      width: "60px",
                      height: "60px",
                      objectFit: "cover",
                    }}
                  />
                ))}
              </div>
            </div>

            <div className="admin-product-view-details" style={{ flex: "1" }}>
              <h2>{product.name}</h2>
              <p className="admin-product-sku">
                <strong>SKU:</strong> {product.sku}
              </p>

              <div className="admin-product-price" style={{ margin: "10px 0" }}>
                {discountedPrice ? (
                  <>
                    <span
                      style={{
                        fontWeight: "bold",
                        fontSize: "1.2rem",
                        color: "#e74c3c",
                      }}
                    >
                      ${discountedPrice}
                    </span>{" "}
                    <span
                      style={{
                        textDecoration: "line-through",
                        color: "#7f8c8d",
                        marginLeft: "8px",
                      }}
                    >
                      ${product.price.toFixed(2)}
                    </span>{" "}
                    <span
                      className="admin-product-discount"
                      style={{ color: "#27ae60", marginLeft: "8px" }}
                    >
                      ({discountPercent}% OFF)
                    </span>
                  </>
                ) : (
                  <span style={{ fontWeight: "bold", fontSize: "1.2rem" }}>
                    ${product.price.toFixed(2)}
                  </span>
                )}
              </div>

              <div
                className="admin-product-stock"
                style={{ marginBottom: "10px" }}
              >
                <strong>Status:</strong>{" "}
                {product.stock ? (
                  <span className="admin-stock-in" style={{ color: "green" }}>
                    In Stock
                  </span>
                ) : (
                  <span className="admin-stock-out" style={{ color: "red" }}>
                    Out of Stock
                  </span>
                )}
              </div>

              <div
                className="admin-product-rating"
                style={{ marginBottom: "10px" }}
              >
                <strong>Rating:</strong>{" "}
                {product.rating
                  ? `${product.rating} ⭐ (${product.reviews} reviews)`
                  : "Not rated"}
              </div>

              <div
                className="admin-product-description"
                style={{ marginBottom: "10px" }}
              >
                <h4>Description</h4>
                <p>{product.desc || "No description available"}</p>
              </div>

              <div className="admin-product-meta" style={{ marginTop: "20px" }}>
                <div>
                  <strong>Material:</strong>{" "}
                  {product.material || "Not specified"}
                </div>
                <div>
                  <strong>Category:</strong>{" "}
                  {product.category.name || "Not categorized"}
                </div>
              </div>
            </div>
          </div>
        </div>

        <div
          className="admin-modal-footer"
          style={{ marginTop: "20px", textAlign: "right" }}
        >
          <button
            className="admin-modal-btn admin-modal-btn-close"
            onClick={onClose}
            style={{
              backgroundColor: "#3498db",
              color: "white",
              border: "none",
              padding: "8px 16px",
              borderRadius: "4px",
              cursor: "pointer",
            }}
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductView;
