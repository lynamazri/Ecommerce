import React from "react";
import { Navigation, Pagination, Scrollbar, A11y } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css/bundle";

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
                <SwiperSlide key={product.id} className="productCard">
                  <img src={product.image} alt={product.title} />
                  <div className="productDescription">
                    <h3 className="productTitle">{product.title}</h3>
                    <span>{product.category}</span>
                    {/* <span>{product.description}</span> */}
                  </div>
                  <div className="priceCart">
                    <span className="productPrice">DZD{product.price}</span>
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
