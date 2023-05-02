import React, { useState } from "react";
import { Link } from "react-router-dom";

import Product from "../../components/Product/Product";
import UserNavbar from "../../components/UserNavbar/UserNavbar";
import { categories } from "../../components/UserNavbar/Menu";
import Cart from "../../components/Cart/Cart";
import Footer from "../../components/Footer/Footer";
import "./Home.css";

function Home() {
  const [isOpen, setIsOpen] = useState(false);
  function toggle() {
    setIsOpen((isOpen) => !isOpen);
  }

  return (
    <div>
      <UserNavbar toggle={toggle} open={isOpen} />
      <main>
        <div className="cart">{isOpen && <Cart />}</div>
        <div className="container">
          <section className="sectionFlex">
            <div className="sectionLeft">
              <h3>Category menu</h3>
              <ul className="sectionLeftItems">
                {categories.slice(0, 4).map((category, index) => (
                  <li key={index}>
                    <Link to={category.link}>{category.name}</Link>
                  </li>
                ))}
              </ul>
              <a className="sectionLeftButton">more categories</a>
            </div>
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
              <h3>Best selling products</h3>
              <ul className="sectionLeftItems">
                {categories.slice(0, 4).map((category, index) => (
                  <li key={index}>
                    <Link to={category.link}>{category.name}</Link>
                  </li>
                ))}
              </ul>
              <a className="sectionLeftButton">more Products</a>
            </div>
            <div className="productWrapper">
              <Product />
            </div>
          </section>
          <section className="sectionFlex">
            <div className="sectionLeft">
              <h3>categoryTitle</h3>
              <ul className="sectionLeftItems">
                {categories.slice(0, 4).map((category, index) => (
                  <li key={index}>
                    <Link to={category.link}>{category.name}</Link>
                  </li>
                ))}
              </ul>
              <a className="sectionLeftButton">more Products</a>
            </div>
            <div className="productWrapper">{/* <Product /> */}</div>
          </section>
        </div>
      </main>
      <Footer />
    </div>
  );
}

export default Home;
