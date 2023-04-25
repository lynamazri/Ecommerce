import React from "react";
import Product from "../../components/Product";
import UserNavbar from "../../components/UserNavbar/UserNavbar";
import Footer from "../../components/Footer";
//import "./Home.css";

function Home() {
  return (
    <div>
      <UserNavbar />
      <main>
        <div className="container">
          {/*           <section className="sectionFlex">
            <div className="sectionLeft">
              <h3>categoryTitle</h3>
              <ul className="sectionLeftItems">
                <li>Stores</li>
                <li>Electronics</li>
                <li>Cothing and Fashion</li>
                <li>Health and Beauty</li>
                <li>Home</li>
              </ul>
              <a className="sectionLeftButton">
                more categories 
              </a>
            </div>
            <div className="adsWrapper">
              <div className="ads">
                <small>Banner sub focus</small>
                <h3>Space for heading</h3>
                <a className="adsButton">Read recepies</a>
              </div>
              <div className="ads">
                <small>Banner sub focus</small>
                <h3>Space for heading</h3>
                <a className="adsButton">Read recepies</a>
              </div> 
            </div>
          </section>
          <section className="sectionFlex">
            <div className="sectionLeft">
              <h3>categoryTitle</h3>
              <ul className="sectionLeftItems">
                <li>Stores</li>
                <li>Electronics</li>
                <li>Cothing and Fashion</li>
                <li>Health and Beauty</li>
                <li>Home</li>
              </ul>
              <a className="sectionLeftButton">
                more Products 
              </a>
            </div>
            <div className="productWrapper">
              <Product />
              <Product />
              <Product />
            </div>
          </section>
          <section className="sectionFlex">
            <div className="sectionLeft">
              <h3>categoryTitle</h3>
              <ul className="sectionLeftItems">
                <li>Stores</li>
                <li>Electronics</li>
                <li>Cothing and Fashion</li>
                <li>Health and Beauty</li>
                <li>Home</li>
              </ul>
              <a className="sectionLeftButton">
                more Products 
              </a>
            </div>
            <div className="productWrapper">
              <Product />
              <Product />
              <Product />
            </div>
          </section> */}
          <Product />
        </div>
        <Footer />
      </main>
    </div>
  );
}

export default Home;
