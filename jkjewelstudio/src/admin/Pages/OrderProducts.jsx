import React from "react";
import OrderProductList from "../components/OrderProductList";

const OrderProducts = () => {
  return (
    <div className="admin-page-container">
      <h1>User Order Products</h1>
      <OrderProductList />
    </div>
  );
};

export default OrderProducts;
