import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchStoresData } from "../../redux/Slices/storesSlice";
import { getWishlistData } from "../../redux/Slices/wishlistSlice";
import { Navigation, Pagination, A11y } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css/bundle";
import RingLoader from "react-spinners/RingLoader";
import ProductCard from "../ProductCard/ProductCard";
import StoreCard from "../ShopCard/ShopCard";

import "./Swiper.css";

function Swiperr({ sectionType, data, category, currentShopId, storeId }) {
  const dispatch = useDispatch();

  const { stores, storesStatus } = useSelector((state) => state.stores);
  const { items, productsStatus, error } = useSelector(
    (state) => state.products
  );
  // const wishlistItems = useSelector((state) => state.wishlist.items);
  const userId = useSelector((state) => state.auth.user?.userId);
  const wishlistItems = useSelector((state) => state.wishlist.items);

  useEffect(() => {
    dispatch(fetchStoresData());
    dispatch(getWishlistData({ userId }));
  }, [dispatch, userId]);

  console.log("wishlistItems", wishlistItems);

  const renderItems = () => {
    if (sectionType === "stores") {
      let filteredShops = stores;
      if (category) {
        filteredShops = stores.filter(
          (store) =>
            store.subCatId === category && store.storeId !== currentShopId
        );
      }

      return filteredShops.map((store) => (
        <SwiperSlide key={store.storeId}>
          <StoreCard key={store.storeId} store={store} />
        </SwiperSlide>
      ));
    } else if (sectionType === "products") {
      let filteredProducts = items;
      if (storeId) {
        filteredProducts = items.filter(
          (product) => product.storeId === storeId
        );
      }

      return filteredProducts.map((product) => (
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
    } else if (sectionType === "wishlist") {
      return wishlistItems?.map((product) => (
        <SwiperSlide key={product.productId}>
          <ProductCard key={product.productId} product={product} />
        </SwiperSlide>
      ));
    }

    return null;
  };

  const slidesPerView = sectionType === "stores" ? 3 : 4;

  const isLoading = storesStatus === "loading" || productsStatus === "loading";
  const isError = storesStatus === "failed" || productsStatus === "failed";

  return (
    <>
      {isLoading ? (
        <div className="loader-container">
          <RingLoader color="#1f2c4c" />
        </div>
      ) : isError ? (
        <p>{error}</p>
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
