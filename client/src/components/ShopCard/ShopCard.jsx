import React from "react";
import { Link } from "react-router-dom";
import "./ShopCard.css";
import { useGetStoreBannerQuery } from "../../redux/Slices/apiSlice";

function ShopCard({ store, viewMode }) {
  const { data: storeBanner, isLoading } = useGetStoreBannerQuery(
    store.storeId
  );

  if (isLoading) {
    return <div>Loading...</div>;
  }
  return (
    <div className={`shop-card ${viewMode === "list" ? "list-view" : ""}`}>
      <div className="shop-image">
        <img src={storeBanner?.url} alt={store.name} />
      </div>
      <div className="shop-description">
        <h3 className="store-title">{store.name}</h3>

        {store.description.length < 107 ? (
          <span>{store.description}</span>
        ) : (
          <span>{store.description.substring(0, 107)} ...</span>
        )}
      </div>
      <div className="shop-footer">
        <Link to={`/shop/${store.storeId}`}>Shop Details</Link>
      </div>
    </div>
  );
}
export default ShopCard;
