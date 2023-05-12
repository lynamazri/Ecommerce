import React from "react";
import { Navigation, Pagination, Scrollbar, A11y } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css/bundle";
// import { StarOutlined, StarFilled, FaRegStar } from "@ant-design/icons";
import { FaStar, FaStarHalfAlt, FaRegStar } from "react-icons/fa";

import "./Product.css";

import { useSelector, useDispatch } from "react-redux";
import RingLoader from "react-spinners/RingLoader";
import { add } from "../../redux/Slices/CartSlice";

function Product() {
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
      {status === "success" ? (
        <Swiper
          modules={[Navigation, Pagination, Scrollbar, A11y]}
          spaceBetween={20}
          slidesPerView={4}
          //           breakpoints: {
          //   '@0.75': {
          //     slidesPerView: 2,
          //     spaceBetween: 20,
          //   },
          //   '@1.00': {
          //     slidesPerView: 3,
          //     spaceBetween: 40,
          //   },
          //   '@1.50': {
          //     slidesPerView: 4,
          //     spaceBetween: 50,
          //   },
          // }
          init="false"
          navigation
          scrollbar={{ draggable: true }}
          onSlideChange={() => console.log("slide change")}
          onSwiper={(swiper) => console.log(swiper)}
          effect={"cube"}
          cubeEffect={{
            shadow: true,
            slideShadows: true,
            shadowOffset: 20,
            shadowScale: 0.94,
          }}
        >
          {items &&
            items?.map((product) => (
              <div class="swiper-wrapper">
                <SwiperSlide key={product.id} className="product-card">
                  <div className="product-image">
                    <img src={product.image} alt={product.title} />
                    {/* {product.isOnSale ? <span>${product.promo}%</span> : null} */}
                    <span>10%</span>
                  </div>
                  <div className="product-description">
                    <h3 className="product-title">{product.title}</h3>
                    <span>{product.category}</span>
                    <div className="rating">
                      {generateRatingStars(product.rating.rate)}
                    </div>
                    {/* <span>{product.description}</span> */}
                  </div>
                  <div className="product-pay">
                    <div className="product-price">
                      {/* {product.isOnSale ? ( */}
                      <>
                        <span>$10</span>
                        <span className="old-price">DZD{product.price}</span>
                      </>
                      {/* ) : null} */}
                      {/* <span>DZD{product.price}</span> */}
                    </div>
                    <button onClick={() => handleAdd(product)}>
                      Add To Cart
                    </button>
                  </div>
                </SwiperSlide>
              </div>
            ))}
          {/* <div class="swiper-pagination"></div>
          <div class="swiper-scrollbar"></div>

          <div class="swiper-button-prev"></div>
          <div class="swiper-button-next"></div> */}
        </Swiper>
      ) : status === "loading" ? (
        <div className="loader-container">
          <RingLoader color="#1f2c4c" />
        </div>
      ) : (
        <p>Error</p>
      )}
    </>
  );
}

export default Product;
