import React, { useState } from "react";
import CategoryList from "../components/CategoryList";
import CategoryForm from "../components/CategoryForm";

const Categories = () => {
  const [editingId, setEditingId] = useState(null);
  const [refreshKey, setRefreshKey] = useState(0);

  const handleEdit = (id) => setEditingId(id);
  const handleSave = () => {
    setEditingId(null);
    setRefreshKey((k) => k + 1); // reload list
  };
  const handleCancel = () => setEditingId(null);

  return (
    // Categories.jsx
    <div className="admin-page-container">
      {editingId ? (
        <CategoryForm
          categoryId={editingId === "new" ? null : editingId}
          onSave={handleSave}
          onCancel={handleCancel}
        />
      ) : (
        <>
          <button className="admin-add-btn" onClick={() => setEditingId("new")}>
            Add Category
          </button>
          <CategoryList key={refreshKey} onEdit={handleEdit} />
        </>
      )}
    </div>
  );
};

export default Categories;
