import React from "react";
import { Outlet } from "react-router-dom";

function Settings() {
  // ...
  return (
    <div className="dashboard-settings-page dashboard--page">
      <div className="header">
        <h3>Hello Tassy Omah,</h3>
        <p>
          Welcome to your dashboard! Stay organized and maximize your
          productivity.
        </p>
      </div>
      <div className="main">
        <h3>Settings</h3>
        <div>
          <h4>General</h4>
          <h4>Shipping</h4>
          <h4>Payment</h4>
          <h4>Discount Codes</h4>
          <h4>Store Info</h4> {/* Add this option */}
        </div>
      </div>{" "}
    </div>
  );
}

export default Settings;
