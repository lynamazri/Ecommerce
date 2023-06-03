import React, { useEffect } from "react";
import { Navigation, Pagination, A11y } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css/bundle";
import { useDispatch, useSelector } from "react-redux";
import { fetchStoresData } from "../../redux/Slices/storesSlice";
import RingLoader from "react-spinners/RingLoader";
import ProductCard from "../ProductCard/ProductCard";
import StoreCard from "../StoreCard/StoreCard";

import "./Swiper.css";

function Swiperr({ sectionType, data }) {
  const dispatch = useDispatch();
  const { stores, storesStatus } = useSelector((state) => state.stores);
  const { items, productsStatus } = useSelector((state) => state.products);
  // const wishlists = data.filter((item) => item.type === "wishlist");

  console.log(items);
  console.log(productsStatus);
  console.log(stores);
  console.log(storesStatus);

  useEffect(() => {
    dispatch(fetchStoresData());
  }, [dispatch]);

  const renderItems = () => {
    if (sectionType === "store") {
      return stores?.map((store) => (
        <SwiperSlide key={store.storeId}>
          <StoreCard key={store.storeId} store={store} />
        </SwiperSlide>
      ));
    } else if (sectionType === "products") {
      return items?.map((product) => (
        <SwiperSlide key={product.productId}>
          <ProductCard key={product.productId} product={product} />
        </SwiperSlide>
      ));
    } else if (sectionType === "testimonials") {
      return data.map((testimonial) => (
        <SwiperSlide key={testimonial.id}>
          <div className="testimonial-card">
            <p className="testimonial-description">{testimonial.description}</p>
            <h3 className="testimonial-title">{testimonial.name}</h3>
          </div>
        </SwiperSlide>
      ));
    }
    // } else if (sectionType === "wishlist") {
    //   return wishlists.map((wishlist) => (
    //     <SwiperSlide key={wishlist.productId}>
    //       <ProductCard
    //         key={wishlist?.productId}
    //         product={wishlist}
    //         viewMode="list"
    //       />
    //     </SwiperSlide>
    //   ));
    // }
    return null;
  };

  const slidesPerView = sectionType === "store" ? 3 : 4;

  const isLoading = storesStatus === "loading" || productsStatus === "loading";
  const isError = storesStatus === "failed" || productsStatus === "failed";

  return (
    <>
      {isLoading ? (
        <div className="loader-container">
          <RingLoader color="#1f2c4c" />
        </div>
      ) : isError ? (
        <p>Error.</p>
      ) : (
        <Swiper
          modules={[Navigation, Pagination, A11y]}
          spaceBetween={25}
          slidesPerView={slidesPerView}
          navigation
          pagination={{ clickable: true }}
          effect="cube"
          cubeEffect={{
            shadow: true,
            slideShadows: true,
            shadowOffset: 20,
            shadowScale: 0.94,
          }}
          className={`${sectionType}-swiper`}
        >
          {renderItems()}
        </Swiper>
      )}
    </>
  );
}

export default Swiperr;
