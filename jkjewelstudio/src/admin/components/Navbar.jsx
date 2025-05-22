import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { fetchAdminInfo, logout } from "../utils/api";

const Navbar = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState(null);

  useEffect(() => {
    fetchAdminInfo()
      .then((res) => {
        setUsername(res.data.email);
      })
      .catch(() => {
        navigate("/admin/login");
      });
  }, [navigate]);

  const handleLogout = async () => {
    try {
      await logout();
    } catch (err) {
      console.error("Logout error:", err);
    }
    navigate("/admin/login");
  };

  return (
    <header className="admin-navbar">
      <div className="admin-navbar-actions">
        <span className="admin-navbar-username">{username || "Guest"}</span>
        <button className="admin-navbar-btn admin-navbar-btn-logout" onClick={handleLogout}>
          Logout
        </button>
      </div>
    </header>
  );
};

export default Navbar;
