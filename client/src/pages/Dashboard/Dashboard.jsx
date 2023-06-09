import React from "react";
import { Link, useLocation } from "react-router-dom";
import { Outlet } from "react-router-dom";
import "./Dashboard.css";

function Dashboard() {
  const location = useLocation();
  const isActive = (pathname) => location.pathname === pathname;

  return (
    <div className="dashboard-page">
      <div className="menu">
        <Link to="/" className="logo">
          <h1>magaza</h1>
        </Link>

        <ul className="menu-items">
          <li>
            <Link
              to="/dashboard"
              className={isActive("/dashboard") ? "active" : ""}
            >
              Dashboard
            </Link>
          </li>
          <li>
            <Link
              to="/dashboard/products"
              className={isActive("/dashboard/products") ? "active" : ""}
            >
              Products
            </Link>
          </li>
          <li>
            <Link
              to="/dashboard/orders"
              className={isActive("/dashboard/orders") ? "active" : ""}
            >
              Orders
            </Link>
          </li>
          <li>
            <Link
              to="/dashboard/settings"
              className={isActive("/dashboard/settings") ? "active" : ""}
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

export default Dashboard;
