import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { add } from "../../redux/Slices/CartSlice";
import {
  addProductToWishlist,
  deleteProductFromWishlist,
} from "../../redux/Slices/wishlistSlice";
import { getStars } from "../../utils";
import { FaHeart, FaRegHeart } from "react-icons/fa";
import "./ProductCard.css";

function ProductCard({ product, viewMode }) {
  const dispatch = useDispatch();
  let processedProduct = {};
  // if (product.discount.percentage !== 0) {
  //   processedProduct = {
  //     ...product,
  //     price:
  //       product.price - (product.price * product.discount.percentage) / 100,
  //   };
  // } else {
  //   processedProduct = { ...product };
  // }
  const handleAddToCart = () => {
    dispatch(add(processedProduct));
  };
  const userId = useSelector((state) => state.auth.user?.userId);
  const wishlistItems = useSelector((state) => state.wishlist.items);

  const isProductInWishlist = wishlistItems.some(
    (item) => item.productId === product.productId
  );

  const [isProductInWishlistState, setIsProductInWishlistState] =
    useState(isProductInWishlist);

  const handleAddToWishlist = () => {
    if (isProductInWishlistState) {
      dispatch(
        deleteProductFromWishlist({ userId, productId: product.productId })
      )
        .then(() => {
          setIsProductInWishlistState(false);
        })
        .catch((error) => {
          console.error("Error removing product from wishlist:", error);
        });
    } else {
      dispatch(addProductToWishlist({ userId, productId: product.productId }))
        .then(() => {
          setIsProductInWishlistState(true);
        })
        .catch((error) => {
          console.error("Error adding product to wishlist:", error);
        });
    }
  };

  return (
    <div className={`product-card ${viewMode === "list" ? "list-view" : ""}`}>
      <div className="product-image">
        {product.images.length > 0 && (
          <img src={product.images[0].url} alt={product.name} />
        )}
        {/* {product.discount.percentage !== 0 && (
          <span>-{product.discount.percentage}%</span>
        )} */}
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
          <>
            {/* {product.discount.percentage !== 0 ? (
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
            )} */}
          </>
        </div>
        <button onClick={handleAddToCart}>Add To Cart</button>
        {viewMode === "list" &&
          (isProductInWishlistState ? (
            <button className="wishlist-button" onClick={handleAddToWishlist}>
              <FaHeart style={{ fontSize: "12px", fontWeight: "bold" }} />{" "}
              Remove from wishlist
            </button>
          ) : (
            <button className="wishlist-button" onClick={handleAddToWishlist}>
              <FaRegHeart style={{ fontSize: "12px", fontWeight: "bold" }} />{" "}
              Add to wishlist
            </button>
          ))}
      </div>
    </div>
  );
}

export default ProductCard;
