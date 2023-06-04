import React from "react";
import { Link } from "react-router-dom";
import { MdKeyboardArrowRight } from "react-icons/md";

import Navbar from "../../components/Navbar/Navbar";
import Path from "../../components/Path/Path";
import Swiperr from "../../components/Swiper/Swiper";
import Footer from "../../components/Footer/Footer";
import "./Shop.css";

function Shop() {
  return (
    <div>
      <Navbar />
      <Path />
      <div className="shop-page">
        <section className="product-container">
          <div className="header">
            <h3>Our Products</h3>
          </div>

          <Swiperr sectionType="products" />
        </section>

        <section className="product-container">
          <div className="header">
            <h3>Similar Shops</h3>
            <Link to={`/Shops`}>
              More Shops <MdKeyboardArrowRight />
            </Link>
          </div>
          <Swiperr sectionType="stores" />
        </section>
      </div>

      <Footer />
    </div>
  );
}

export default Shop;
