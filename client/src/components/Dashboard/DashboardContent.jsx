import React from "react";
import { Link } from "react-router-dom";
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
            <div className="card">Total Revenue</div>
            <div className="card">Average Order Value</div>
            <div className="card">Questions</div>
          </div>
          <div className="product-metrics">
            <h2>Product Metrics</h2>
            {/* Display key metrics for individual products */}
          </div>
          <div className="sales-analytics">
            <h2>Sales Analytics</h2>
            {/* Display visual charts and graphs for sales over time, top-selling products, revenue breakdown */}
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
