import React from "react";
import "./ProfileMenu.css";

function ProfileMenu({ closeMenu }) {
  // Handle menu item clicks or other actions

  return (
    <div className="profile-menu">
      <button onClick={closeMenu}>Close Menu</button>
    </div>
  );
}

export default ProfileMenu;
