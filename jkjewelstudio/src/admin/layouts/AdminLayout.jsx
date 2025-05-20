import React from "react";
import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";

const AdminLayout = ({ children }) => {
  return (
    <div className="admin-layout">
      <Sidebar />
      <div className="admin-main-content">
        <Navbar />
        <main className="admin-content-area">{children}</main>
      </div>
    </div>
  );
};

export default AdminLayout;
