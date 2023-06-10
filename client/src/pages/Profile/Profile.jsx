import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import Navbar from "../../components/Navbar/Navbar";
import Path from "../../components/Path/Path";
import { Outlet } from "react-router-dom";
import { useUserHasStoreQuery } from "../../redux/Slices/apiSlice";
import "./Profile.css";

function Profile() {
  const location = useLocation();
  const isActive = (pathname) => location.pathname === pathname;
  const [hasStore, setHasStore] = useState(false);
  var user = localStorage.getItem("user")
    ? JSON.parse(localStorage.getItem("user"))
    : null;
  const { data, isLoading } = useUserHasStoreQuery(user.userId);
  useEffect(() => {
    if (data) {
      setHasStore(data.hasStore);
    }
  }, [data, isLoading]);
  return (
    <>
      <Navbar />
      <Path />
      <div className="profile-page">
        <div className="left-container">
          <ul className="sidebar">
            <li className="sidebar-item">Manage My Account</li>
            <ul className="subheadings">
              <li>
                <Link
                  to="/profile/my-profile"
                  className={isActive("/profile/my-profile") ? "active" : ""}
                >
                  My Profile
                </Link>
              </li>
              <li>
                <Link
                  to="/profile/address-book"
                  className={isActive("/profile/address-book") ? "active" : ""}
                >
                  Address Book
                </Link>
              </li>
              <li>
                <Link
                  to="/profile/manage-credit"
                  className={isActive("/profile/manage-credit") ? "active" : ""}
                >
                  Manage Credit
                </Link>
              </li>
              <li>
                <Link
                  to="/profile/orderhistory"
                  className={isActive("/profile/orderhistory") ? "active" : ""}
                >
                  Order History
                </Link>
              </li>
              {!hasStore && (
                <li>
                  <Link
                    to="/profile/open-shop"
                    className={isActive("/profile/open-shop") ? "active" : ""}
                  >
                    Open a Shop
                  </Link>
                </li>
              )}
            </ul>

            <li className="sidebar-item">My Settings</li>
            <ul className="subheadings">
              <li>
                <Link
                  to="/profile/security"
                  className={isActive("/profile/security") ? "active" : ""}
                >
                  Security
                </Link>
              </li>
              <li>
                <Link
                  to="/profile/language"
                  className={isActive("/profile/language") ? "active" : ""}
                >
                  Language
                </Link>
              </li>
            </ul>
            <li>
              <Link
                to="/help"
                className={` ${isActive("/help") ? "active" : ""} sidebar-item`}
              >
                Help & Feedback
              </Link>
            </li>
          </ul>
        </div>

        <Outlet />
      </div>
    </>
  );
}

export default Profile;
