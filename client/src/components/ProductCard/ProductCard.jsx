import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { add } from "../../redux/Slices/CartSlice";
import { getStars } from "../../utils";
import { Link } from "react-router-dom";
import "./ProductCard.css";

function ProductCard({
  id,
  title,
  price,
  description,
  category,
  image,
  rating,
  viewMode,
}) {
  const dispatch = useDispatch();
  // const { items, status } = useSelector((state) => state.products); //9adra nbedelha tweli b RTK query
  const handleAdd = () => {
    dispatch(add({ id, image, title, category, rating, price }));
  };

  return (
    <div className={`product-card ${viewMode === "list" ? "list-view" : ""}`}>
      <div className="product-image">
        <img src={image} alt={title} />
        {/* {product.isOnSale ? <span>${product.promo}%</span> : null} */}
        <span>-10%</span>
      </div>
      <div className="product-description">
        <Link to={`/product/${category}/${id}`} className="product-title">
          {title}
        </Link>
        <span>{category}</span>
        <div>{getStars(rating, 14)}</div>
      </div>
      <div className="product-pay">
        <div className="product-price">
          {/* {isOnSale ? ( */}
          <>
            <span>$10</span>
            <span className="old-price">DZD{price}</span>
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
