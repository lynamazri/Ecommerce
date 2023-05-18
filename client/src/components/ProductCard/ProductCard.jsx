import React from "react";
import { Navigation, Pagination, Scrollbar, A11y } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css/bundle";
// import { StarOutlined, StarFilled, FaRegStar } from "@ant-design/icons";
import { FaStar, FaStarHalfAlt, FaRegStar } from "react-icons/fa";
import "./ProductCard.css";
import { useSelector, useDispatch } from "react-redux";
import RingLoader from "react-spinners/RingLoader";
import { add } from "../../redux/Slices/CartSlice";
import { getStars } from "../../utils";

import { Link } from "react-router-dom";

function ProductCard(props) {
  const dispatch = useDispatch();
  const { items, status } = useSelector((state) => state.products); //9adra nbedelha tweli b RTK query
  const handleAdd = (product) => {
    dispatch(add(product));
  };

  return (
    <>
      <div className="product-card">
        <div className="product-image">
          <img src={props.image} alt={props.title} />
          {/* {product.isOnSale ? <span>${product.promo}%</span> : null} */}
          <span>-10%</span>
        </div>
        <div className="product-description">
          <Link
            to={`/product/${props.category}/${props.id}`}
            className="product-title"
          >
            {props.title}
          </Link>
          <span>{props.category}</span>
          <div>{getStars(props.rating.rate, 14)}</div>
          {/* <span>{product.description}</span> */}
        </div>
        <div className="product-pay">
          <div className="product-price">
            {/* {props.isOnSale ? ( */}
            <>
              <span>$10</span>
              <span className="old-price">DZD{props.price}</span>
            </>
            {/* ) : null} */}
            {/* <span>DZD{props.price}</span> */}
          </div>
          <button onClick={() => handleAdd(props)}>Add To Cart</button>
        </div>
      </div>
    </>
  );
}

export default ProductCard;
