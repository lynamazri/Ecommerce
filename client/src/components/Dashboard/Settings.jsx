import React from "react";
import { Outlet } from "react-router-dom";

function Settings() {
  // ...
  return (
    <div>
      <h2>Settings</h2>
      <ul className="settings-menu">
        <li>General</li>
        <li>Shipping</li>
        <li>Payment</li>
        <li>Discount Codes</li>
        <li>Store Info</li> {/* Add this option */}
      </ul>
      <div className="settings-content">
        <Outlet />
      </div>
    </div>
  );
}

export default Settings;
