import React from "react";
import { Link } from "react-router-dom";

import { GrFormClose } from "react-icons/gr";

import "./ProfileMenu.css";

function ProfileMenu({ closeMenu }) {
  // Handle menu item clicks or other actions

  return (
    <div className="profile-menu">
      <div className="pm-header">
        <h3>My Profile</h3>
        <button onClick={closeMenu}>
          Close <GrFormClose size={20} />
        </button>
      </div>
      <div className="pm-body">
        <Link to="/profile/edit" className="logo">
          Edit profile
        </Link>
        <Link to="/profile/wishlist" className="logo">
          Wishlist
        </Link>
      </div>
    </div>
  );
}

export default ProfileMenu;
