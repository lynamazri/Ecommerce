import React from "react";
import UserNavbar from "../components/UserNavbar/UserNavbar";
import { useSelector } from "react-redux";

function Home() {
  const { items, status } = useSelector((state) => state.products); //9adra nbedelha tweli b RTK query
  return (
    <>
      <UserNavbar />
      {/* <div className="products">
        {data &&
          data?.map((product) => (
            <div key={product.id} className="product">
              <h3>{product.name}</h3>
              <img src={product.image} alt={product.name} />
              <div className="details">
                <span>{product.desc}</span>
                <span className="price">${product.price}</span>
              </div>
              <button onClick={() => handleAddToCart(product)}>
                Add To Cart
              </button>
            </div>
          ))}
      </div> */}
      <div>Home</div>
    </>
  );
}

export default Home;
