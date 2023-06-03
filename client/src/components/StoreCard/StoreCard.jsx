import React from "react";
import { Link } from "react-router-dom";
import "./StoreCard.css";
function StoreCard({ store, viewMode }) {
  return (
    <div className={`store-card ${viewMode === "list" ? "list-view" : ""}`}>
      <div className="store-image">
        <img src={store.image} alt={store.name} />
      </div>
      <div className="store-description">
        <h3 className="store-title">{store.name}</h3>
        <span>{store.description}</span>
      </div>
      <div className="store-footer">
        <Link to={`/store/${store.storeId}`}>Store Details</Link>
      </div>
    </div>
  );
}
export default StoreCard;
