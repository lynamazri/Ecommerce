import React from "react";
import UserNavbar from "../../components/UserNavbar/UserNavbar";
import { useSelector } from "react-redux";
import "./Home.css";

function Home() {
  const { items, status } = useSelector((state) => state.products); //9adra nbedelha tweli b RTK query
  return (
    <div className="container">
      {status === "success" ? (
        <>
          <UserNavbar />
          <h2>New Arrivals</h2>

          <div className="ads">Adverts</div>
          <div className="products">
            {items &&
              items?.map((product) => (
                <div key={product.id} className="product">
                  <h3>{product.name}</h3>
                  <img src={product.image} alt={product.name} />
                  <div className="details">
                    <span>{product.desc}</span>
                    <span className="price">${product.price}</span>
                  </div>
                  <button>Add To Cart</button>
                </div>
              ))}
          </div>
        </>
      ) : status === "pending" ? (
        <p>Loading...</p>
      ) : (
        <p>Error</p>
      )}
    </div>
  );
}

export default Home;
