import { NavLink } from "react-router-dom";

const Sidebar = () => {
  return (
    <aside className="admin-sidebar">
      <h2 className="admin-sidebar-title">Admin Panel</h2>
      <nav>
        <ul className="admin-sidebar-nav">
          <li>
            <NavLink
              to="/admin"
              className={({ isActive }) => 
                `admin-sidebar-link ${isActive ? 'active' : ''}`
              }
              end
            >
              Dashboard
            </NavLink>
          </li>
          {/* <li>
            <NavLink
              to="/admin/users"
              className={({ isActive }) => 
                `admin-sidebar-link ${isActive ? 'active' : ''}`
              }
            >
              Users
            </NavLink>
          </li> */}
          <li>
            <NavLink
              to="/admin/products"
              className={({ isActive }) => 
                `admin-sidebar-link ${isActive ? 'active' : ''}`
              }
            >
              Products
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/admin/categories"
              className={({ isActive }) => 
                `admin-sidebar-link ${isActive ? 'active' : ''}`
              }
            >
              Categories
            </NavLink>
          </li>
        </ul>
      </nav>
    </aside>
  );
};

export default Sidebar;