import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { add } from "../../redux/Slices/CartSlice";
import { getStars } from "../../utils";
import { Link } from "react-router-dom";
import "./ProductCard.css";

function ProductCard({ product, viewMode }) {
  const dispatch = useDispatch();
  const handleAddToCart = () => {
    dispatch(add(product));
  };
  const handleAddToWishlist = () => {
    // Add logic to handle adding to wishlist
  };

  return (
    <div className={`product-card ${viewMode === "list" ? "list-view" : ""}`}>
      <div className="product-image">
        <img src={product.imageUrl} alt={product.name} />
        {/* {product.isOnSale ? <span>${product.promo}%</span> : null} */}
        <span>-10%</span>
      </div>
      <div className="product-description">
        <Link
          to={`/product/${product.subCatName}/${product.productId}`}
          className="product-title"
        >
          {product.name}
        </Link>
        <span>{product.subCatName}</span>
        <div>{getStars(product.rating, 14)}</div>
      </div>
      <div className="product-pay">
        <div className="product-price">
          {/* {isOnSale ? ( */}
          <>
            <span>DZD{product.price}</span>
            <span className="old-price">DZD 2100</span>
          </>
          {/* ) : null} */}
          {/* <span>DZD{price}</span> */}
        </div>
        <button onClick={handleAddToCart}>Add To Cart</button>
        {viewMode === "list" && (
          <button className="wishlist-button" onClick={handleAddToWishlist}>
            Add To Wishlist
          </button>
        )}
      </div>
    </div>
  );
}

export default ProductCard;
