import React from "react";

const OrderView = ({ order, onClose }) => {
  if (!order) return null;

  const getStatusColor = (status) => {
    switch (status.toLowerCase()) {
      case "delivered":
        return "green";
      case "pending":
        return "#f39c12";
      case "confirmed":
        return "#2980b9";
      case "shipped":
        return "#8e44ad";
      case "cancelled":
        return "#e74c3c";
      default:
        return "#7f8c8d";
    }
  };

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
    }).format(amount);
  };

  // const Order_Total= ;

  return (
    <div className="admin-modal-overlay">
      <div className="admin-modal">
        <div className="admin-modal-header">
          <h3>Order Details for {order.user?.name}</h3>
          <button className="admin-modal-close" onClick={onClose}>
            &times;
          </button>
        </div>

        <div className="admin-modal-content">
          <p>
            <strong>Order ID:</strong> {order._id}
            {console.log(order)
            }
          </p>

          <p>
            <strong>Address:</strong>{" "}
            {`${order.user?.address?.street}, ${order.user?.address?.city}, ${order.user?.address?.country} - ${order.user?.address?.postalCode}`}
          </p>
          <p>
            <strong>Status:</strong>{" "}
            <span style={{ color: getStatusColor(order.status) }}>
              {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
            </span>
          </p>

          {/* <h4 style={{ marginTop: "20px" }}>Items</h4> */}
          <table
            className="admin-table"
            style={{ width: "100%", marginTop: "10px" }}
          >
            <thead>
              <tr>
                <th>Product Name</th>
                <th>SKU</th>
                <th>Quantity</th>
                <th>Price at Purchase</th>
              </tr>
            </thead>
            <tbody>
              {order.items.map((item) => (
                <tr key={item._id}>
                  <td>{item.product?.name || "Product Deleted"}</td>
                  <td>{item.product?.sku || "N/A"}</td>
                  <td>{item.quantity}</td>
                  <td>{formatCurrency(item.discountedPrice)}</td>
                </tr>
              ))}
            </tbody>
          </table>
          <div className="order-view-summary">
            <p>
              <strong>Order Total : </strong> {formatCurrency(order.totalAmount)}
            </p>
            <p>
              <strong>Delivery Fee : </strong> {formatCurrency(order.deliveryFee)}
            </p>
            <p>
              <strong>GST (18%) : </strong> {formatCurrency(order.gstAmount)}
            </p>
            <p>
              <strong>Grand Total  : </strong> {formatCurrency(order.grandTotal)}
            </p>
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

export default OrderView;
