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

function ProductCard(props) {
  const dispatch = useDispatch();
  const { items, status } = useSelector((state) => state.products); //9adra nbedelha tweli b RTK query
  const handleAdd = (product) => {
    dispatch(add(product));
  };

  function generateRatingStars(rate) {
    const stars = [];

    const floorRating = Math.floor(rate);
    for (let i = 0; i < floorRating; i++) {
      stars.push(<FaStar key={i} />);
    }
    if (rate - floorRating >= 0.5) {
      stars.push(<FaStarHalfAlt key={floorRating} />);
    }
    const remaining = 5 - stars.length;
    for (let i = 0; i < remaining; i++) {
      stars.push(<FaRegStar key={i + floorRating} />);
    }
    return stars;
  }

  return (
    <>
      <div className="product-card">
        <div className="product-image">
          <img src={props.image} alt={props.title} />
          {/* {product.isOnSale ? <span>${product.promo}%</span> : null} */}
          <span>10%</span>
        </div>
        <div className="product-description">
          <h3 className="product-title">{props.title}</h3>
          <span>{props.category}</span>
          <div className="rating">{generateRatingStars(props.rating.rate)}</div>
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
