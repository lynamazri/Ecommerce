import React from "react";

import { useSelector, useDispatch } from "react-redux";
import RingLoader from "react-spinners/RingLoader";
import { add } from "../redux/Slices/CartSlice";

function Product() {
  const dispatch = useDispatch();

  const { items, status } = useSelector((state) => state.products); //9adra nbedelha tweli b RTK query
  const handleAdd = (product) => {
    dispatch(add(product));
  };
  return (
    <div className="container">
      {status === "success" ? (
        <>
          <div className="products">
            {items &&
              items?.map((product) => (
                <div key={product.id} className="product">
                  <h3>{product.title}</h3>
                  <img src={product.image} alt={product.title} />
                  <div className="details">
                    <span>{product.category}</span>
                    <span>{product.description}</span>
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

export default Product;
