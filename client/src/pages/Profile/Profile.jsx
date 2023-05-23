import React from "react";
import { Link, useLocation } from "react-router-dom";
import UserNavbar from "../../components/UserNavbar/UserNavbar";
import Path from "../../components/Path/Path";
import "./Profile.css";
import { Outlet } from "react-router-dom";

function Profile() {
  const location = useLocation();

  const isActive = (pathname) => location.pathname === pathname;

  return (
    <>
      <UserNavbar />
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
                  to="/profile/payment-method"
                  className={
                    isActive("/profile/payment-method") ? "active" : ""
                  }
                >
                  Payment Method
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
              {/* {!userHasShop && ( */}
              <li>
                <Link
                  to="/profile/apply"
                  className={isActive("/profile/apply") ? "active" : ""}
                >
                  Apply for Shop
                </Link>
              </li>
              {/* )} */}
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
