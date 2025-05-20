import React, { useEffect, useState } from "react";
import { fetchCategories, deleteCategory } from "../utils/api";

const CategoryList = ({ onEdit }) => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(false);

  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const categoriesPerPage = 5;

  const loadCategories = async () => {
    setLoading(true);
    try {
      const res = await fetchCategories();
      setCategories(res.data);
    } catch {
      alert("Failed to load categories");
    }
    setLoading(false);
  };

  useEffect(() => {
    loadCategories();
  }, []);

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure to delete this category?")) return;
    try {
      await deleteCategory(id);
      loadCategories();
    } catch {
      alert("Failed to delete category");
    }
  };

  // Calculate displayed categories for current page
  const indexOfLastCategory = currentPage * categoriesPerPage;
  const indexOfFirstCategory = indexOfLastCategory - categoriesPerPage;
  const currentCategories = categories.slice(indexOfFirstCategory, indexOfLastCategory);

  // Calculate total pages
  const totalPages = Math.ceil(categories.length / categoriesPerPage);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  if (loading) return <div className="admin-loading">Loading categories...</div>;
  if (categories.length === 0) return <div className="admin-empty-state">No categories found.</div>;

  return (
    <>
      <table className="admin-table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Description</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {currentCategories.map(({ _id, name, description }) => (
            <tr key={_id}>
              <td>{name}</td>
              <td>{description || '-'}</td>
              <td>
                <div className="admin-table-actions">
                  <button
                    className="admin-table-btn admin-table-btn-edit"
                    onClick={() => onEdit(_id)}
                  >
                    Edit
                  </button>
                  <button
                    className="admin-table-btn admin-table-btn-delete"
                    onClick={() => handleDelete(_id)}
                  >
                    Delete
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Pagination Controls */}
      <div className="pagination">
        <button
          disabled={currentPage === 1}
          onClick={() => handlePageChange(currentPage - 1)}
          className="pagination-btn"
        >
          Prev
        </button>

        {[...Array(totalPages)].map((_, i) => {
          const pageNum = i + 1;
          return (
            <button
              key={pageNum}
              onClick={() => handlePageChange(pageNum)}
              className={`pagination-btn ${currentPage === pageNum ? "active" : ""}`}
            >
              {pageNum}
            </button>
          );
        })}

        <button
          disabled={currentPage === totalPages}
          onClick={() => handlePageChange(currentPage + 1)}
          className="pagination-btn"
        >
          Next
        </button>
      </div>
    </>
  );
};

export default CategoryList;
