import React, { useState } from "react";
import ProductList from "../components/ProductList";
import ProductForm from "../components/ProductForm";

const Products = () => {
  const [editingId, setEditingId] = useState(null);
  const [refreshKey, setRefreshKey] = useState(0);

  const handleEdit = (id) => setEditingId(id);
  const handleSave = () => {
    setEditingId(null);
    setRefreshKey((k) => k + 1); // reload list
  };
  const handleCancel = () => setEditingId(null);

  return (
    // Products.jsx
<div className="admin-page-container">
  {editingId ? (
    <ProductForm
      productId={editingId === "new" ? null : editingId}
      onSave={handleSave}
      onCancel={handleCancel}
    />
  ) : (
    <>
      <button className="admin-add-btn" onClick={() => setEditingId("new")}>
        Add Product
      </button>
      <ProductList key={refreshKey} onEdit={handleEdit} />
    </>
  )}
</div>

  );
};

export default Products;
