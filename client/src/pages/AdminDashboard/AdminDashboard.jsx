import React, { useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Outlet } from "react-router-dom";
import { RiLogoutBoxLine } from "react-icons/ri";
import { useSendLogoutMutation } from "../../redux/Slices/authApiSlice";

import "./AdminDashboard.css";

function AdminDashboard() {
  const navigate = useNavigate();
  const location = useLocation();
  const isActive = (pathname) => location.pathname === pathname;
  const [sendLogout] = useSendLogoutMutation();
  var user = localStorage.getItem("user")
    ? JSON.parse(localStorage.getItem("user"))
    : { userId: 1 };
  useEffect(() => {
    if (user.userId === 1) {
      navigate("/login");
    }
  }, [user.username, navigate]);
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
              Admins
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
        <button
          className="exit"
          onClick={() => {
            sendLogout();
          }}
        >
          {" "}
          <RiLogoutBoxLine size={18} /> Log out
        </button>
      </div>
      <Outlet />
    </div>
  );
}

export default AdminDashboard;
