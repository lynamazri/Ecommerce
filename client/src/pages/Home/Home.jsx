import React from "react";
import Product from "../../components/Product";
import UserNavbar from "../../components/UserNavbar/UserNavbar";
import "./Home.css";

function Home() {
  return (
    <div>
      <UserNavbar />
      <h2>New Arrivals</h2>
      <div className="ads">Adverts</div>
      <div className="product-cards">
        <Product />
      </div>
    </div>
  );
}

export default Home;
