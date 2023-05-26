import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { add } from "../../redux/Slices/CartSlice";
import { getStars } from "../../utils";
import { Link } from "react-router-dom";
import "./ProductCard.css";

function ProductCard({
  productId,
  imageUrl,
  name,
  subCatName,
  rating,
  price,
  storeName,
  viewMode,
}) {
  const dispatch = useDispatch();
  // const { items, status } = useSelector((state) => state.products); //9adra nbedelha tweli b RTK query
  const handleAdd = () => {
    dispatch(
      add({ productId, imageUrl, name, subCatName, rating, price, storeName })
    );
  };

  return (
    <div className={`product-card ${viewMode === "list" ? "list-view" : ""}`}>
      <div className="product-image">
        <img src={imageUrl} alt={name} />
        {/* {product.isOnSale ? <span>${product.promo}%</span> : null} */}
        <span>-10%</span>
      </div>
      <div className="product-description">
        <Link
          to={`/product/${subCatName}/${productId}`}
          className="product-title"
        >
          {name}
        </Link>
        <span>{subCatName}</span>
        <div>{getStars(rating, 14)}</div>
      </div>
      <div className="product-pay">
        <div className="product-price">
          {/* {isOnSale ? ( */}
          <>
            <span>DZD{price}</span>
            <span className="old-price">DZD 2100</span>
          </>
          {/* ) : null} */}
          {/* <span>DZD{price}</span> */}
        </div>
        <button onClick={handleAdd}>Add To Cart</button>
      </div>
    </div>
  );
}

export default ProductCard;
