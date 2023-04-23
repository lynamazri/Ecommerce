import React from "react";
import UserNavbar from "../../components/UserNavbar/UserNavbar";
import { useSelector, useDispatch } from "react-redux";
import RingLoader from "react-spinners/RingLoader";
import "./Home.css";

import { add } from "../../redux/Slices/CartSlice";

function Home() {
  const dispatch = useDispatch();

  const { items, status } = useSelector((state) => state.products); //9adra nbedelha tweli b RTK query
  const handleAdd = (product) => {
    dispatch(add(product));
  };

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
                    <span className="price">DZD{product.price}</span>
                  </div>
                  <button onClick={() => handleAdd(product)}>
                    Add To Cart
                  </button>
                </div>
              ))}
          </div>
        </>
      ) : status === "loading" ? (
        <div className="loader-container">
          <RingLoader color="#1f2c4c" />
        </div>
      ) : (
        <p>Error</p>
      )}
    </div>
  );
}

export default Home;
