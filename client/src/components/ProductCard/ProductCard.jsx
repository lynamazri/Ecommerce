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
        <img src={product.images[0].url} alt={product.name} />
        {product.discount.percentage !== 0 && (
          <span>-{product.discount.percentage}%</span>
        )}
      </div>
      <div className="product-description">
        <Link
          to={`/product/${product.subCat.name}/${product.productId}`}
          className="product-title"
        >
          {product.name}
        </Link>
        <span>{product.subCat.name}</span>
        <div>{getStars(product.reviewsAvg, 14)}</div>
      </div>
      <div className="product-pay">
        <div className="product-price">
          {/* {isOnSale ? ( */}
          <>
            {product.discount.percentage !== 0 ? (
              <span>
                DZD{" "}
                {product.price -
                  (product.price * product.discount.percentage) / 100}
              </span>
            ) : (
              <span>DZD {product.price}</span>
            )}
            {product.discount.percentage !== 0 && (
              <span className="old-price">DZD {product.price}</span>
            )}
          </>
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
