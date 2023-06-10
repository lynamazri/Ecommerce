import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link, useParams } from "react-router-dom";
import { MdKeyboardArrowRight } from "react-icons/md";

import Navbar from "../../components/Navbar/Navbar";
import Path from "../../components/Path/Path";
import Swiperr from "../../components/Swiper/Swiper";
import Footer from "../../components/Footer/Footer";
import "./Shop.css";
import { useGetStoreByIdQuery } from "../../redux/Slices/apiSlice";
import { fetchStoresData } from "../../redux/Slices/storesSlice";

function Shop() {
  const dispatch = useDispatch();
  const { storeId } = useParams();

  const { data, isLoading } = useGetStoreByIdQuery(storeId);
  useEffect(() => {
    dispatch(fetchStoresData());
  }, [dispatch]);
  if (isLoading) {
    return <div>Loading...</div>;
  }
  return (
    <div>
      <Navbar />
      <Path />
      <div className="shop-page">
        <div className="upper">
          <div className="banner">
            <img src={data.banner?.url} alt={data.name} />
          </div>
          <div className="info">
            <h2>{data.name}</h2>
            <p>{data.description}</p>
            <div className="information">
              <ul className="detail">
                <li>Main Category:</li>
                <li>Working Hours:</li>
                <li>Phone Number:</li>
                <li>Email:</li>
              </ul>
              <ul className="detail-value">
                <li>{data.mainCat.name}</li>
                <li>{data.workingHours}</li>
                <li>{data.phone}</li>
                <li>{data.email}</li>
              </ul>
            </div>
          </div>
        </div>
        <div className="lower">
          <section className="product-container">
            <div className="header">
              <h3>Our Products</h3>
            </div>
            <Swiperr sectionType="products" storeId={storeId} />
          </section>
          <section className="product-container">
            <div className="header">
              <h3>Similar Shops</h3>
              <Link to={`/Shops`}>
                More Shops <MdKeyboardArrowRight />
              </Link>
            </div>
            <Swiperr
              sectionType="stores"
              storeCat={data?.mainCat.catId}
              currentShopId={data?.storeId}
            />
          </section>
        </div>
      </div>

      <Footer />
    </div>
  );
}

export default Shop;
