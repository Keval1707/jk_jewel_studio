import React from "react";

const AdminCard = ({ title, children }) => {
  return (
    <div style={{
      border: "1px solid #ccc",
      borderRadius: 8,
      padding: 20,
      marginBottom: 20,
      boxShadow: "0 2px 5px rgba(0,0,0,0.1)"
    }}>
      <h3>{title}</h3>
      <div>{children}</div>
    </div>
  );
};

export default AdminCard;
