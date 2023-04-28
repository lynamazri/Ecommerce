import React from "react";
import "./Product.css";

import { useSelector, useDispatch } from "react-redux";
import RingLoader from "react-spinners/RingLoader";
import { add } from "../../redux/Slices/CartSlice";

function Product() {
  const dispatch = useDispatch();

  const { items, status } = useSelector((state) => state.products); //9adra nbedelha tweli b RTK query
  const handleAdd = (product) => {
    dispatch(add(product));
  };
  return (
    <div>
      {status === "success" ? (
        <>
          <div className="productSlider">
            {items &&
              items?.map((product) => (
                <div key={product.id} className="productCard">
                  <img src={product.image} alt={product.title} />
                  <div className="productDescription">
                    <h3 className="productTitle">{product.title}</h3>
                    <span>{product.category}</span>
                    {/* <span>{product.description}</span> */}
                  </div>
                  <div className="priceCart">
                    <span className="productPrice">DZD{product.price}</span>
                    <button onClick={() => handleAdd(product)}>
                      Add To Cart
                    </button>
                  </div>
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
