import React from "react";
import { useParams } from "react-router-dom";
import "./Products.css";
import UserNavbar from "../../components/UserNavbar/UserNavbar";
import Path from "../../components/Path/Path";
import ProductCard from "../../components/ProductCard/ProductCard";
import Footer from "../../components/Footer/Footer";
import { categories } from "../../components/UserNavbar/Menu";
import { getStars } from "../../utils";

import { useSelector, useDispatch } from "react-redux";

function Products() {
  const dispatch = useDispatch();
  const { items, status } = useSelector((state) => state.products); //9adra nbedelha tweli b RTK query
  const numStars = 5; // Number of stars
  const { category } = useParams();
  return (
    <div>
      <UserNavbar />
      <Path />
      <div className="products-page">
        <div className="header">
          <div className="upper">
            <h2>{category}</h2>
            <div>
              <span>Grid view</span>
              <span>List view</span>
              <span>Products</span>
            </div>
          </div>
          <div className="lower"></div>
        </div>
        <div className="body">
          <div className="left-container">
            <div className="categories-filter">
              <h3>Category menu</h3>
              <ul className="body">
                {categories.slice(0, 4).map((category, index) => (
                  <div>
                    <li key={index}>{category.name}</li>
                    <span>-10%</span>
                  </div>
                ))}
              </ul>
            </div>
            <div className="rating-filter">
              <h3>Rating</h3>
              <div className="body">
                {Array.from({ length: numStars }, (_, index) => {
                  const rating = index + 1;
                  return (
                    <label key={rating}>
                      <input type="checkbox" name="rating" value={rating} />
                      {getStars(rating, 15)}
                    </label>
                  );
                })}
              </div>
            </div>
            <div className="price-filter">
              <h3>Price</h3>
            </div>
          </div>
          <div className="right-container">
            {items &&
              items?.map((product) => (
                <ProductCard
                  key={product.id}
                  id={product.id}
                  title={product.title}
                  price={product.price}
                  description={product.description}
                  category={product.category}
                  image={product.image}
                  rating={product.rating}
                />
              ))}
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default Products;
