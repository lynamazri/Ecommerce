import React from "react";
import Navbar from "../../components/Navbar/Navbar";
import Path from "../../components/Path/Path";
import Swiperr from "../../components/Swiper/Swiper";
import Footer from "../../components/Footer/Footer";

function Wishlist() {
  return (
    <>
      <Navbar />
      <Path />
      <div className="wishlist-page">
        <section className="product-container">
          <h3>My Wishlist</h3>
          <Swiperr sectionType="products" />
        </section>
      </div>
      <Footer />
    </>
  );
}

export default Wishlist;
