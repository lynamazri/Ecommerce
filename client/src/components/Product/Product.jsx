import React, { useEffect } from "react";
import { Navigation, Pagination, Scrollbar, A11y } from "swiper";
import ProductCard from "../ProductCard/ProductCard";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css/bundle";
import { useSelector, useDispatch } from "react-redux";
import RingLoader from "react-spinners/RingLoader";
import { add } from "../../redux/Slices/CartSlice";

function Product() {
  const dispatch = useDispatch();
  const { items, filteredItems, status } = useSelector(
    (state) => state.products
  );
  console.log(items);
  console.log(filteredItems);
  console.log(status);
  const handleAdd = (product) => {
    dispatch(add(product));
  };

  return (
    <>
      {status === "succeeded" ? (
        <Swiper
          modules={[Navigation, Pagination, Scrollbar, A11y]}
          spaceBetween={20}
          slidesPerView={4}
          init={false}
          navigation
          scrollbar={{ draggable: true }}
          effect="cube"
          cubeEffect={{
            shadow: true,
            slideShadows: true,
            shadowOffset: 20,
            shadowScale: 0.94,
          }}
        >
          <div class="swiper-wrapper">
            {items &&
              items?.map((product) => (
                <SwiperSlide key={product.productId}>
                  <ProductCard key={product?.productId} product={product} />
                </SwiperSlide>
              ))}
          </div>
          <div class="swiper-pagination"></div>
          <div class="swiper-scrollbar"></div>
          <div class="swiper-button-prev"></div>
          <div class="swiper-button-next"></div>
        </Swiper>
      ) : status === "loading" ? (
        <div className="loader-container">
          <RingLoader color="#1f2c4c" />
        </div>
      ) : (
        <p>Error.</p>
      )}
    </>
  );
}

export default Product;

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
