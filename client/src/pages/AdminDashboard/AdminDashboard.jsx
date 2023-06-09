import React from "react";
import { Link, useLocation } from "react-router-dom";
import { Outlet } from "react-router-dom";
import "./AdminDashboard.css";

function AdminDashboard() {
  const location = useLocation();
  const isActive = (pathname) => location.pathname === pathname;

  return (
    <div className="admin-dashboard-page dashboard-page">
      <div className="menu">
        <Link to="/" className="logo">
          <h1>magaza</h1>
        </Link>

        <ul className="menu-items">
          <li>
            <Link
              to="/admin/dashboard"
              className={isActive("/admin/dashboard") ? "active" : ""}
            >
              Dashboard
            </Link>
          </li>
          <li>
            <Link
              to="/admin/users"
              className={isActive("/admin/users") ? "active" : ""}
            >
              Users
            </Link>
          </li>
          <li>
            <Link
              to="/admin/shops"
              className={isActive("/admin/shops") ? "active" : ""}
            >
              Shops
            </Link>
          </li>
          <li>
            <Link
              to="/admin/products"
              className={isActive("/admin/products") ? "active" : ""}
            >
              Products
            </Link>
          </li>
          <li>
            <Link
              to="/admin/admins"
              className={isActive("/admin/admins") ? "active" : ""}
            >
              Orders
            </Link>
          </li>
          <li>
            <Link
              to="/admin/settings"
              className={isActive("/admin/settings") ? "active" : ""}
            >
              Settings
            </Link>
          </li>
        </ul>
        <button>Log out</button>
      </div>
      <Outlet />
    </div>
  );
}

export default AdminDashboard;
