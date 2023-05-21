import React from "react";
import { Link, useLocation } from "react-router-dom";
import { GrFormClose } from "react-icons/gr";
import {
  RiUserLine,
  RiShoppingBagLine,
  RiHistoryLine,
  RiHeartLine,
  RiSettingsLine,
  RiLogoutBoxLine,
} from "react-icons/ri";
import "./ProfileMenu.css";

function ProfileMenu({ closeMenu }) {
  const location = useLocation();

  const isActive = (pathname) => {
    return location.pathname === pathname;
  };

  return (
    <div className="profile-menu">
      <div className="pm-header">
        <div>
          <h3>Akram chaabnia</h3>
          <p>User</p>
        </div>
        <button className="close-button" onClick={closeMenu}>
          Close <GrFormClose size={20} />
        </button>
      </div>
      <div className="pm-body">
        <div className="section-heading">My Account</div>
        <Link
          to="/profile/edit"
          className={isActive("/profile/edit") ? "active" : ""}
        >
          <RiUserLine size={18} /> User Profile
        </Link>
        <Link
          to="/profile/orderhistory"
          className={isActive("/profile/orderhistory") ? "active" : ""}
        >
          <RiHistoryLine size={18} /> Order History
        </Link>
        <Link
          to="/profile/wishlist"
          className={isActive("/profile/wishlist") ? "active" : ""}
        >
          <RiHeartLine size={18} /> Wishlist
        </Link>
        <Link
          to="/profile/settings"
          className={isActive("/profile/settings") ? "active" : ""}
        >
          <RiSettingsLine size={18} /> Settings
        </Link>
        <div className="section-heading">Shops</div>
        <Link to="/shops" className={isActive("/shops") ? "active" : ""}>
          <RiShoppingBagLine size={18} /> Manage Shops
        </Link>
      </div>
      <div className="pm-footer">
        <Link>
          <RiLogoutBoxLine size={18} /> Log out
        </Link>
      </div>
    </div>
  );
}

export default ProfileMenu;
