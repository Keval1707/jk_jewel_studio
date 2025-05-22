import React, { useEffect, useState } from "react";
import { fetchOrderProducts, updateOrderProductStatus } from "../utils/api";
import OrderView from "./OrderView";

const OrderProductList = () => {
  const [orderProducts, setOrderProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [updatingId, setUpdatingId] = useState(null);
  const [viewingOrder, setViewingOrder] = useState(null);

  const loadOrderProducts = async () => {
    setLoading(true);
    try {
      const res = await fetchOrderProducts();
      setOrderProducts(res.data);
    } catch (err) {
      alert("Failed to load order products");
    }
    setLoading(false);
  };

  useEffect(() => {
    loadOrderProducts();

    // Random interval between 5 and 10 minutes (in milliseconds)
    const intervalDuration = Math.floor(Math.random() * (10 - 5 + 1) + 5) * 60 * 1000;

    const intervalId = setInterval(() => {
      loadOrderProducts();
    }, intervalDuration);

    // Cleanup on unmount
    return () => clearInterval(intervalId);
  }, []);

  const handleStatusChange = async (id, newStatus) => {
    if (!window.confirm(`Change status to "${newStatus}"?`)) return;

    try {
      setUpdatingId(id);
      await updateOrderProductStatus(id, newStatus);
      alert("Status updated successfully");
      loadOrderProducts();
    } catch (err) {
      alert("Failed to update status");
    } finally {
      setUpdatingId(null);
    }
  };

  if (loading)
    return <div className="admin-loading">Loading order products...</div>;
  if (orderProducts.length === 0)
    return <div className="admin-empty-state">No order products found.</div>;

  return (
    <div>
      <table className="admin-table">
        <thead>
          <tr>
            <th>Order ID</th>
            <th>User Name</th>
            <th>Address</th>
            <th>Status</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {orderProducts.map((op) => (
            <tr key={op._id}>
              <td>{op._id}</td>
              <td>{op.user.name}</td>
              <td>
                {`${op.user.address.street}, ${op.user.address.city}, ${op.user.address.country} - ${op.user.address.postalCode}`}
              </td>
              <td>
                <select
                  name="status"
                  value={op.status}
                  onChange={(e) => handleStatusChange(op._id, e.target.value)}
                  disabled={updatingId === op._id}
                >
                  <option value="pending">Pending</option>
                  <option value="confirmed">Confirmed</option>
                  <option value="shipped">Shipped</option>
                  <option value="delivered">Delivered</option>
                  <option value="cancelled">Cancelled</option>
                </select>
              </td>
              <td>
                <div className="admin-table-actions">
                  <button
                    className="admin-table-btn admin-table-btn-view"
                    onClick={() => setViewingOrder(op)}
                  >
                    View
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {viewingOrder && (
        <OrderView order={viewingOrder} onClose={() => setViewingOrder(null)} />
      )}
    </div>
  );
};

export default OrderProductList;
