import React, { useEffect, useState } from "react";
import { fetchCategoryById, createCategory, updateCategory } from "../utils/api";

const initialForm = {
  name: "",
  description: "",
};

const CategoryForm = ({ categoryId, onSave, onCancel }) => {
  const [form, setForm] = useState(initialForm);

  useEffect(() => {
    if (categoryId) {
      async function loadCategory() {
        try {
          const res = await fetchCategoryById(categoryId);
          setForm(res.data);
        } catch {
          alert("Failed to load category");
        }
      }
      loadCategory();
    } else {
      setForm(initialForm);
    }
  }, [categoryId]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((f) => ({ ...f, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (categoryId) {
        await updateCategory(categoryId, form);
        alert("Category updated successfully");
      } else {
        await createCategory(form);
        alert("Category created successfully");
      }
      onSave();
    } catch {
      alert("Failed to save category");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>{categoryId ? "Edit Category" : "Add Category"}</h2>
      <div>
        <label>Name:</label>
        <input name="name" value={form.name} onChange={handleChange} required />
      </div>
      <div>
        <label>Description:</label>
        <textarea name="description" value={form.description} onChange={handleChange} />
      </div>
      <button type="submit">Save</button>{" "}
      <button type="button" onClick={onCancel}>
        Cancel
      </button>
    </form>
  );
};

export default CategoryForm;
