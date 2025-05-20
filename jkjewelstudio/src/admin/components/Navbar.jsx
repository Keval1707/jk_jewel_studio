import React, { useEffect } from "react";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const navigate = useNavigate();
  const username = Cookies.get("admin-username");

  useEffect(() => {
    if (!username) {
      navigate("/admin/login");
    }
  }, [username, navigate]);

  return (
    <header className="admin-navbar">
      <div className="admin-navbar-actions">
        <span className="admin-navbar-username">{username || "Guest"}</span>
        {/* <button 
          className="admin-navbar-btn"
          onClick={() => alert("Profile clicked")}
        >
          Profile
        </button> */}
        <button 
          className="admin-navbar-btn admin-navbar-btn-logout"
          onClick={() => {
            Cookies.remove("admin-username");
            navigate("/admin/login");
          }}
        >
          Logout
        </button>
      </div>
    </header>
  );
};

export default Navbar;
