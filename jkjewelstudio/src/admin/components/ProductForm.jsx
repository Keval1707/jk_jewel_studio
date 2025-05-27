import React, { useEffect, useState } from "react";
import {
  fetchProductById,
  createProduct,
  updateProduct,
  fetchCategories,
} from "../utils/api";

import { useToast } from "../../features/ToastContext";

const initialForm = {
  name: "",
  sku: "",
  desc: "",
  price: "",
  discount: "",
  material: "",
  stock: true,
  rating: "",
  reviews: "",
  category: "",
  img: null, // for new file uploads
};

const ProductForm = ({ productId, onSave, onCancel }) => {
  const [form, setForm] = useState(initialForm);
  const [categories, setCategories] = useState([]);
  const [existingImages, setExistingImages] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const { showToast } = useToast();

  useEffect(() => {
    const loadCategories = async () => {
      try {
        const res = await fetchCategories();
        setCategories(res.data);
      } catch {
        showToast("Failed to load categories", "error");
      }
    };
    loadCategories();
  }, []);

  useEffect(() => {
    if (productId) {
      const loadProduct = async () => {
        setIsLoading(true);
        try {
          const res = await fetchProductById(productId);
          const { img, category, ...rest } = res.data;
          setForm({
            ...rest,
            category: category?._id || "", // <-- set category to category._id or empty string
            img: null,
          });
          setExistingImages(img || []);
        } catch {
          showToast("Failed to load product", "error");
        } finally {
          setIsLoading(false);
        }
      };
      loadProduct();
    } else {
      setForm(initialForm);
      setExistingImages([]);
    }
  }, [productId]);

  const handleChange = (e) => {
    const { name, value, type, checked, files } = e.target;
    if (type === "checkbox") {
      setForm((prev) => ({ ...prev, [name]: checked }));
    } else if (type === "file") {
      setForm((prev) => ({ ...prev, [name]: files }));
    } else {
      setForm((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleRemoveExistingImage = (url) => {
    setExistingImages((prev) => prev.filter((img) => img !== url));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const formData = new FormData();

      for (const key in form) {
        if (key === "img" && form.img) {
          for (let i = 0; i < form.img.length; i++) {
            formData.append("img", form.img[i]);
          }
        } else {
          formData.append(key, form[key]);
        }
      }

      formData.append("existingImages", JSON.stringify(existingImages));

      if (productId) {
        await updateProduct(productId, formData);
        showToast("Product updated successfully", "success");
      } else {
        await createProduct(formData);
        showToast("Product created successfully", "success");
      }

      onSave();
    } catch (err) {
      console.error("Save error:", err);
      showToast("Failed to save product", "error");
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading && productId) {
    return <div className="admin-loading">Loading product data...</div>;
  }

  return (
    <form className="admin-form" onSubmit={handleSubmit}>
      <h2 className="admin-form-title">
        {productId ? "Edit Product" : "Add Product"}
      </h2>

      <div className="admin-form-group">
        <label className="admin-form-label">Name:</label>
        <input
          className="admin-form-input"
          name="name"
          value={form.name}
          onChange={handleChange}
          required
        />
      </div>

      <div className="admin-form-group">
        <label className="admin-form-label">SKU:</label>
        <input
          className="admin-form-input"
          name="sku"
          value={form.sku}
          onChange={handleChange}
          required
        />
      </div>

      <div className="admin-form-group">
        <label className="admin-form-label">Description:</label>
        <textarea
          className="admin-form-textarea"
          name="desc"
          value={form.desc}
          onChange={handleChange}
        />
      </div>

      <div className="admin-form-group">
        <label className="admin-form-label">Price:</label>
        <input
          className="admin-form-input"
          name="price"
          type="number"
          step="0.01"
          value={form.price}
          onChange={handleChange}
          required
        />
      </div>

      <div className="admin-form-group">
        <label className="admin-form-label">Discount:</label>
        <input
          className="admin-form-input"
          name="discount"
          value={form.discount}
          onChange={handleChange}
        />
      </div>

      <div className="admin-form-group">
        <label className="admin-form-label">Material:</label>
        <input
          className="admin-form-input"
          name="material"
          value={form.material}
          onChange={handleChange}
        />
      </div>

      <div className="admin-form-group admin-form-checkbox-group">
        <label className="admin-form-label">
          <input
            className="admin-form-checkbox"
            name="stock"
            type="checkbox"
            checked={form.stock}
            onChange={handleChange}
          />
          In Stock
        </label>
      </div>

      <div className="admin-form-group">
        <label className="admin-form-label">Rating:</label>
        <input
          className="admin-form-input"
          name="rating"
          type="number"
          step="0.1"
          min="0"
          max="5"
          value={form.rating}
          onChange={handleChange}
        />
      </div>

      <div className="admin-form-group">
        <label className="admin-form-label">Reviews:</label>
        <input
          className="admin-form-input"
          name="reviews"
          type="number"
          value={form.reviews}
          onChange={handleChange}
        />
      </div>

      <div className="admin-form-group">
        <label className="admin-form-label">Category:</label>
        <select
          className="admin-form-select"
          name="category"
          value={form.category}
          onChange={handleChange}
          required
        >
          <option value="">-- Select Category --</option>
          {categories.map((cat) => (
            <option key={cat._id} value={cat._id}>
              {cat.name}
            </option>
          ))}
        </select>
      </div>

      <div className="admin-form-group">
        <label className="admin-form-label">Existing Images:</label>
        {existingImages.length > 0 ? (
          <div className="admin-form-images-preview">
            {existingImages.map((url, idx) => (
              <div className="admin-form-image-item" key={idx}>
                <img src={url} alt="Product" />
                <button
                  type="button"
                  className="admin-form-remove-image"
                  onClick={() => handleRemoveExistingImage(url)}
                >
                  ×
                </button>
              </div>
            ))}
          </div>
        ) : (
          <p className="admin-form-no-images">No existing images</p>
        )}
      </div>

      <div className="admin-form-group">
        <label className="admin-form-label">New Images:</label>
        <input
          className="admin-form-file-input"
          name="img"
          type="file"
          multiple
          onChange={handleChange}
          accept="image/*"
        />
      </div>

      <div className="admin-form-buttons">
        <button
          type="submit"
          className="admin-form-submit"
          disabled={isLoading}
        >
          {isLoading ? "Processing..." : "Save"}
        </button>
        <button
          type="button"
          className="admin-form-cancel"
          onClick={onCancel}
          disabled={isLoading}
        >
          Cancel
        </button>
      </div>
    </form>
  );
};

export default ProductForm;
