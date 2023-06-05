import React from "react";
import { Link, useLocation } from "react-router-dom";
import Path from "../../components/Path/Path";
import { Outlet } from "react-router-dom";
import "./Dashboard.css";

function Dashboard() {
  const location = useLocation();
  const isActive = (pathname) => location.pathname === pathname;

  return (
    <div className="dashboard-page">
      <ul className="menu">
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
            to="/dashboard/statistics"
            className={isActive("/dashboard/statistics") ? "active" : ""}
          >
            Statistics
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
        <li>
          <button>Exit</button>
        </li>
      </ul>
      <div className="main">
        <Path />
        <div>
          <h2>Dashboard overview</h2>
          <div className="salutation">
            <h3>Hello Tassy Omah,</h3>
            <p>
              Welcome to your dashboard, kindly sort through the menu to get
              started.
            </p>
          </div>
        </div>
        <Outlet />
      </div>
    </div>
  );
}

export default Dashboard;
