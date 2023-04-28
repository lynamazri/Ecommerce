import React from "react";
import { Link } from "react-router-dom";

import Product from "../../components/Product/Product";
import UserNavbar from "../../components/UserNavbar/UserNavbar";
import { categories } from "../../components/UserNavbar/Menu";
import Footer from "../../components/Footer/Footer";
import "./Home.css";

function Home() {
  return (
    <div>
      <UserNavbar />
      <main>
        <div className="container">
          <section className="sectionFlex">
            <div className="sectionLeft">
              <h3>Category menu</h3>
              <ul className="sectionLeftItems">
                {categories.map((category, index) => (
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
                <li>Stores</li>
                <li>Electronics</li>
                <li>Cothing and Fashion</li>
                <li>Health and Beauty</li>
                <li>Home</li>
              </ul>
              <a className="sectionLeftButton">more Products</a>
            </div>
            <div className="productWrapper">
              <Product />
            </div>
          </section>
          {/* <section className="sectionFlex">
            <div className="sectionLeft">
              <h3>categoryTitle</h3>
              <ul className="sectionLeftItems">
                <li>Stores</li>
                <li>Electronics</li>
                <li>Cothing and Fashion</li>
                <li>Health and Beauty</li>
                <li>Home</li>
              </ul>
              <a className="sectionLeftButton">more Products</a>
            </div>
            <div className="productWrapper">
              <Product />
              <Product />
              <Product />
            </div>
          </section>
          <Product /> */}
        </div>
      </main>
      <Footer />
    </div>
  );
}

export default Home;
