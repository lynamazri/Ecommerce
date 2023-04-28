import React from "react";
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination } from "swiper";
import 'swiper/css';
import "swiper/css/pagination";
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
    <div>
      {status === "success" ? (
        <>
          <Swiper 
          slidesPerView={3}
          spaceBetween={30}
          pagination={{
            clickable: true,
          }}
          modules={[Pagination]}
          className="productSlider"
          >
            {items &&
              items?.map((product) => (
                <>
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
                </>
              ))}
          </Swiper>
        </>
      ) : status === "loading" ? (
        <div className="loader-container">
          <RingLoader color="#1f2c4c" />
        </div>
      ) : (
        <p>Error</p>
      )}
    </div>
  );
}

export default Product;
