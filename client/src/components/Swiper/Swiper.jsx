import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchStoresData } from "../../redux/Slices/storesSlice";
import { wishlistFetch } from "../../redux/Slices/wishlistSlice";
import { Navigation, Pagination, A11y } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css/bundle";
import RingLoader from "react-spinners/RingLoader";
import ProductCard from "../ProductCard/ProductCard";
import StoreCard from "../ShopCard/ShopCard";

import "./Swiper.css";

function Swiperr({
  sectionType,
  data,
  prodCat,
  storeCat,
  currentShopId,
  storeId,
  slidesPerView = 4,
}) {
  const dispatch = useDispatch();

  const {
    items,
    status: productsStatus,
    error: productError,
  } = useSelector((state) => state.products);
  const {
    stores,
    status: storesStatus,
    error: storeError,
  } = useSelector((state) => state.stores);
  const {
    items: wishlistItems,
    status: wishlistStatus,
    error: wishError,
  } = useSelector((state) => state.wishlist);

  useEffect(() => {
    dispatch(fetchStoresData());
    dispatch(wishlistFetch());
  }, []);

  console.log("wishlistItems", wishlistItems);

  const renderItems = () => {
    if (sectionType === "stores") {
      let filteredShops = stores;
      if (storeCat) {
        filteredShops = stores.filter(
          (store) => store.catId === storeCat && store.storeId !== currentShopId
        );
      }
      return filteredShops.map((store) => (
        <SwiperSlide key={store.storeId}>
          <StoreCard key={`store-${store.storeId}`} store={store} />
        </SwiperSlide>
      ));
    } else if (sectionType === "products") {
      let filteredProducts = items;
      if (storeId) {
        filteredProducts = items.filter(
          (product) => product.storeId === storeId
        );
      }
      if (prodCat) {
        filteredProducts = items.filter(
          (product) => product.subCatId === prodCat
        );
      }
      return filteredProducts.map((product, index) => (
        <SwiperSlide key={product.productId}>
          <ProductCard
            key={`product-${product.productId}-${index}`}
            product={product}
          />
        </SwiperSlide>
      ));
    } else if (sectionType === "wishlist") {
      return wishlistItems?.map((wishlistItem) => (
        <SwiperSlide key={wishlistItem.wishlistId}>
          <ProductCard
            key={`wishlist-${wishlistItem.wishlistId}`}
            product={wishlistItem.product}
          />
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
    return null;
  };

  const renderErrorMessage = () => {
    if (sectionType === "stores") {
      return storeError;
    } else if (sectionType === "products") {
      return productError;
    } else if (sectionType === "wishlist") {
      return wishError;
    }

    return null;
  };

  const isLoading = (() => {
    if (sectionType === "stores") {
      return storesStatus === "loading";
    } else if (sectionType === "products") {
      return productsStatus === "loading";
    } else if (sectionType === "wishlist") {
      return wishlistStatus === "loading";
    }
  })();

  const isError = (() => {
    if (sectionType === "stores") {
      return storesStatus === "failed";
    } else if (sectionType === "products") {
      return productsStatus === "failed";
    } else if (sectionType === "wishlist") {
      return wishlistStatus === "failed";
    }
  })();

  return (
    <>
      {isLoading ? (
        <div className="loader-container">
          <RingLoader color="#1f2c4c" />
        </div>
      ) : isError ? (
        <p>{renderErrorMessage()}</p>
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
