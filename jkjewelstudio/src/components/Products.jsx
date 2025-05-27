import React, { useEffect, useState, useContext } from "react";
import { useParams, useNavigate } from "react-router-dom"; // <-- import useNavigate
import { CartContext } from "../context/CartContext";
import { fetchProductById } from "../utils/api";
import { useToast } from "../features/ToastContext";

const Products = () => {
  const { id } = useParams();
  const navigate = useNavigate(); // <-- initialize navigate
  const [product, setProduct] = useState(null);
  const [mainImage, setMainImage] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { addToCart } = useContext(CartContext);
  const { showToast } = useToast();

  const handleAddToCart = () => {
    if (product) {
      addToCart({ ...product, quantity: 1 });
      showToast(`${product.name} Added to cart!`, "success")
    }
  };

  // New function for Buy Now navigation
  const handleBuyNow = () => {
    if (product) {
      // Navigate to /placeorder with product info in state
      navigate("/placeorder", {
        state: { singleProduct: { ...product, quantity: 1 } },
      });
    }
  };

  useEffect(() => {
    setLoading(true);
    setError(null);

    fetchProductById(id)
      .then((res) => {
        const prod = res.data;
        setProduct(prod);
        setMainImage(prod.img && prod.img.length > 0 ? prod.img[0] : "");
      })
      .catch(() => {
        setError("Failed to load product data.");
        setProduct(null);
      })
      .finally(() => setLoading(false));
  }, [id]);

  if (loading) {
    return (
      <div className="container">
        <h2>Loading product details...</h2>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container">
        <h2>Error</h2>
        <p>{error}</p>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="container">
        <h1>Product Not Found</h1>
        <p>No product exists with ID: {id}</p>
      </div>
    );
  }

  const parseDiscount = (disc) => {
    if (!disc) return 0;
    if (typeof disc === "string") {
      return parseFloat(disc.replace("%", ""));
    }
    return parseFloat(disc);
  };

  const discountPercent = parseDiscount(product.discount);
  const discountedPrice = (product.price * (1 - discountPercent / 100)).toFixed(
    2
  );

  return (
    <div className="product-container container">
      <div className="product-left">
        <div className="main-image">
          {mainImage ? (
            <img src={mainImage} alt={product.name} />
          ) : (
            <div>No Image Available</div>
          )}
        </div>
        <div className="thumbnail-gallery">
          {product.img &&
            product.img.map((src, index) => (
              <img
                key={index}
                src={src}
                alt={`${product.name} ${index + 1}`}
                className={mainImage === src ? "active-thumb" : ""}
                onClick={() => setMainImage(src)}
                style={{ cursor: "pointer" }}
              />
            ))}
        </div>
      </div>

      <div className="product-right">
        <h2>{product.name}</h2>
        <p>
          <strong>SKU:</strong> {product.sku || "N/A"}
        </p>
        <p>
          <strong>Material:</strong> {product.material || "N/A"}
        </p>
        <p>
          <strong>Category:</strong>{" "}
          {product.category?.name || product.category || "N/A"}
        </p>
        <p>
          <strong>Stock Status:</strong>{" "}
          {product.stock ? (
            <span style={{ color: "green" }}>In Stock</span>
          ) : (
            <span style={{ color: "red" }}>Out of Stock</span>
          )}
        </p>
        <p>
          <strong>Rating:</strong> ⭐ {product.rating || "N/A"} (
          {product.reviews || 0} reviews)
        </p>
        <p>
          <strong>Price:</strong>{" "}
          {discountPercent > 0 ? (
            <span className="discount">
              <span className="discounted-price">₹{discountedPrice}</span>{" "}
              <span className="old-price">₹{product.price.toFixed(2)}</span>{" "}
              <span className="discount-tag">({product.discount} OFF)</span>
            </span>
          ) : (
            `₹${product.price.toFixed(2)}`
          )}
        </p>
        <p>
          <strong>Description:</strong> {product.desc}
        </p>

        <div className="product-actions">
          <button className="buy-btn Products-btn" onClick={handleBuyNow}>
            {" "}
            {/* <-- updated here */}
            Buy Now
          </button>
          <button className="cart-btn Products-btn" onClick={handleAddToCart}>
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
};

export default Products;
