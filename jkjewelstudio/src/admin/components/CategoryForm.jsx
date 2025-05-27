import React, { useEffect, useState } from "react";
import { fetchCategoryById, createCategory, updateCategory } from "../utils/api";
import { useToast } from "../../features/ToastContext";


const initialForm = {
  name: "",
  description: "",
};

const CategoryForm = ({ categoryId, onSave, onCancel }) => {
  const [form, setForm] = useState(initialForm);
  const { showToast } = useToast();


  useEffect(() => {
    if (categoryId) {
      async function loadCategory() {
        try {
          const res = await fetchCategoryById(categoryId);
          setForm(res.data);
        } catch {
          showToast("Failed to load category", "error");
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
        showToast("Category updated successfully" ,"success");
      } else {
        await createCategory(form);
        showToast("Category created successfully","success");
      }
      onSave();
    } catch {
      showToast("Failed to save category" , "error");
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
      <button type="submit" className="admin-form-submit">Save</button>{" "}
      <button type="button" className="admin-form-cancel" onClick={onCancel}>
        Cancel
      </button>
    </form>
  );
};

export default CategoryForm;
