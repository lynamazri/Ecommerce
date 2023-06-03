import React from "react";
import { Link } from "react-router-dom";
import { MdKeyboardArrowRight } from "react-icons/md";

import Swiperr from "../../components/Swiper/Swiper";
import Navbar from "../../components/Navbar/Navbar";
import { categories } from "../../components/Navbar/Menu";
import Footer from "../../components/Footer/Footer";
import "./Home.css";

function Home() {
  const testimonialsData = [
    {
      id: 1,
      name: "John Doe",
      description:
        "“I love shopping at your store. The products are amazing and the customer service is top-notch!“",
    },
    {
      id: 2,
      name: "Jane Smith",
      description:
        "“I've had a great experience with your website. The ordering process was smooth and the delivery was fast.“",
    },
    {
      id: 3,
      name: "David Johnson",
      description:
        "“Your products are of excellent quality. I'm a satisfied customer and will definitely shop again.“",
    },
    {
      id: 1,
      name: "John Doe",
      description:
        "“I love shopping at your store. The products are amazing and the customer service is top-notch!“",
    },
    {
      id: 2,
      name: "Jane Smith",
      description:
        "“I've had a great experience with your website. The ordering process was smooth and the delivery was fast.“",
    },
    {
      id: 3,
      name: "David Johnson",
      description:
        "“Your products are of excellent quality. I'm a satisfied customer and will definitely shop again.“",
    },
  ];

  return (
    <div>
      <Navbar />
      <main>
        <div className="container">
          <section className="sectionFlex">
            <div className="adsWrapper">
              <div className="ads">
                <div>
                  <small>Banner sub focus</small>
                  <h3>Space for heading</h3>
                </div>
                <a className="adsButton">More info</a>
              </div>
              <div className="ads">
                <div>
                  <small>Banner sub focus</small>
                  <h3>Space for heading</h3>
                </div>
                <a className="adsButton">More info</a>
              </div>
            </div>
          </section>
          <section className="sectionFlex">
            <div className="sectionLeft">
              <h3>Best Selling Shops</h3>
              <ul className="sectionLeftItems">
                {categories.slice(1, 5).map((category, index) => (
                  <li key={index}>
                    <Link to={category.link}>{category.name}</Link>
                  </li>
                ))}
              </ul>
              <Link className="sectionLeftButton" to={`/Shops`}>
                More Shops
              </Link>
            </div>
            <div className="store-wrapper">
              <Swiperr sectionType="stores" />
            </div>
          </section>

          <section className="product-container">
            <div className="header">
              <h3>Best Selling Products</h3>
              <Link to={`/products/All Categories`}>
                More Products <MdKeyboardArrowRight />
              </Link>
            </div>
            <Swiperr sectionType="products" />
          </section>

          <section className="testimonials-container">
            <h3>Our customers says</h3>

            <Swiperr sectionType="testimonials" data={testimonialsData} />
          </section>
        </div>
      </main>
      <Footer />
    </div>
  );
}

export default Home;
