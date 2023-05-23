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
import { useSelector } from "react-redux";
import { useSendLogoutMutation } from "../../redux/Slices/authApiSlice";
import "./ProfileMenu.css";

function ProfileMenu({ closeMenu, userHasShop }) {
  const location = useLocation();
  const [sendLogout, { isLoading }] = useSendLogoutMutation();
  const isActive = (pathname) => {
    return location.pathname === pathname;
  };
  const user = useSelector((state) => state.auth.user);
  return (
    <div className="profile-menu">
      <div className="pm-header">
        <div>
          <h3>{user ? user.username : "Login first"}</h3>
          <p>User</p>
        </div>
        <button className="close-button" onClick={closeMenu}>
          Close <GrFormClose size={20} />
        </button>
      </div>
      <div className="pm-body">
        <div className="section-heading">My Account</div>
        <Link
          to="/profile/my-profile"
          className={isActive("/profile/my-profile") ? "active" : ""}
        >
          <RiUserLine size={18} /> User Profile
        </Link>
        <Link
          to="/profile/orderhistory"
          className={isActive("/profile/orderhistory") ? "active" : ""}
        >
          <RiHistoryLine size={18} /> Order History
        </Link>
        <Link to="/wishlist" className={isActive("/wishlist") ? "active" : ""}>
          <RiHeartLine size={18} /> Wishlist
        </Link>
        <Link
          to="/profile/security"
          className={isActive("/profile/security") ? "active" : ""}
        >
          <RiSettingsLine size={18} /> Settings
        </Link>
        <div className="section-heading">Shop</div>
        {userHasShop ? (
          <Link to="/shops" className={isActive("/shops") ? "active" : ""}>
            <RiShoppingBagLine size={18} /> Manage Shop
          </Link>
        ) : (
          <Link
            to="/profile/apply"
            className={isActive("/profile/apply") ? "active" : ""}
          >
            <RiShoppingBagLine size={18} /> Open a Shop
          </Link>
        )}
      </div>
      <div className="pm-footer">
        <button
          onClick={() => {
            sendLogout();
          }}
        >
          <RiLogoutBoxLine size={18} /> Log out
        </button>
      </div>
    </div>
  );
}

export default ProfileMenu;
