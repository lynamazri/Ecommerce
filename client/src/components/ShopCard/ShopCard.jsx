import React from "react";
import { Link } from "react-router-dom";
import "./ShopCard.css";

function ShopCard({ store, viewMode }) {
  return (
    <div className={`shop-card ${viewMode === "list" ? "list-view" : ""}`}>
      <div className="shop-image">
        <img src={store.image} alt={store.name} />
      </div>
      <div className="shop-description">
        <h3 className="store-title">{store.name}</h3>
        <span>{store.description}</span>
      </div>
      <div className="shop-footer">
        <Link to={`/shop/${store.storeId}`}>Shop Details</Link>
      </div>
    </div>
  );
}
export default ShopCard;
