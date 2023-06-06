import React from "react";
import Path from "../../components/Path/Path";

function DashboardContent() {
  return (
    <div className="main">
      <div className="left">
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
          <div className="cards">
            <div className="card">Reviews</div>
            <div className="card">Orders</div>
            <div className="card">Questions</div>
          </div>
        </div>
      </div>
      <div className="right">
        <div className="store-info">
          <img src="path_to_banner_image" alt="Store Banner" />
          <h3>Store Name</h3>
          <p>Phone: xxx-xxx-xxxx</p>
          <button>Edit Store Info</button>
        </div>
      </div>
    </div>
  );
}

export default DashboardContent;
