import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { BsGrid, BsViewList } from "react-icons/bs";
import Navbar from "../../components/Navbar/Navbar";
import Path from "../../components/Path/Path";
import ProductCard from "../../components/ProductCard/ProductCard";
import Footer from "../../components/Footer/Footer";
import { getStars } from "../../utils";
import {
  productsFetch,
  updateFilteredItems,
  setSortingCriteria,
} from "../../redux/Slices/productsSlice";
import { useGetCategoriesQuery } from "../../redux/Slices/apiSlice";

import "./Products.css";

function Products() {
  const dispatch = useDispatch();
  const { items, filteredItems, status } = useSelector(
    (state) => state.products
  );
  const [categories, setCategories] = useState([]);
  const { data, isLoading, error } = useGetCategoriesQuery();

  useEffect(() => {
    // Fetch products data when the component mounts
    dispatch(productsFetch());
  }, [dispatch]);

  useEffect(() => {
    setCategories(data);
  }, [data]);
  const numStars = 5; // Number of stars
  const { category } = useParams();

  const [selectedCategory, setSelectedCategory] = useState(null);
  const [selectedRating, setSelectedRating] = useState(null);
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");
  const [viewMode, setViewMode] = useState("grid"); // State variable to track the view mode

  const handleSortChange = (event) => {
    const sortingCriteria = event.target.value;
    let sortedItems = [...filteredItems];

    if (sortingCriteria === "price") {
      sortedItems.sort((a, b) => a.price - b.price);
    } else if (sortingCriteria === "rating") {
      sortedItems.sort((a, b) => b.reviewsAvg - a.reviewsAvg);
    } else if (sortingCriteria === "date") {
      sortedItems.sort((a, b) => new Date(b.dateAdded) - new Date(a.dateAdded));
    } else if (sortingCriteria === "discount") {
      sortedItems.sort((a, b) => b.discount.percentage - a.discount.percentage);
    } else if (sortingCriteria === "availability") {
      sortedItems.sort((a, b) =>
        a.quantity === b.quantity ? 0 : a.quantity ? -1 : 1
      );
    }

    dispatch(updateFilteredItems(sortedItems));
    dispatch(setSortingCriteria(sortingCriteria)); // Dispatch action to store the sorting criteria
  };

  const handleCategorySelect = (selectedCategory) => {
    setSelectedCategory(selectedCategory);
    let filteredItems = items.filter((item) =>
      item.category.includes(selectedCategory)
    );
    dispatch(updateFilteredItems(filteredItems));
  };
  console.log(filteredItems);

  const handleRatingSelect = (selectedRating) => {
    if (selectedRating === selectedRating) {
      setSelectedRating(null);
    } else {
      setSelectedRating(selectedRating);
    }

    let filteredItems = items.filter(
      (item) => item.reviewsAvg === selectedRating
    );
    dispatch(updateFilteredItems(filteredItems));
  };

  const handlePriceFilter = () => {
    let filteredItems = items.filter((item) => {
      if (minPrice && maxPrice) {
        return (
          item.price >= parseInt(minPrice, 10) &&
          item.price <= parseInt(maxPrice, 10)
        );
      } else if (minPrice) {
        return item.price >= parseInt(minPrice, 10);
      } else if (maxPrice) {
        return item.price <= parseInt(maxPrice, 10);
      }
      return true;
    });
    dispatch(updateFilteredItems(filteredItems));
  };
  if (isLoading) {
    return <div>Loading ...</div>;
  }
  const handleResetPriceFilter = () => {
    setMinPrice("");
    setMaxPrice("");
    dispatch(updateFilteredItems(items));
  };

  const toggleViewMode = (mode) => {
    setViewMode(mode);
  };

  console.log(items);
  return (
    <div>
      <Navbar />
      <Path />
      <div className="products-page">
        <div className="header">
          <div className="upper">
            <h2>{category}</h2>
            <div className="view">
              <span
                className={`view-mode ${viewMode === "grid" ? "active" : ""}`}
                onClick={() => toggleViewMode("grid")}
              >
                <BsGrid /> Grid view
              </span>
              <span
                className={`view-mode ${viewMode === "list" ? "active" : ""}`}
                onClick={() => toggleViewMode("list")}
              >
                {" "}
                <BsViewList /> List view
              </span>
            </div>
          </div>
          <div className="lower">
            <div className="sort">
              <label htmlFor="sort">Sort by:</label>
              <select id="sort" onChange={handleSortChange}>
                <option value="">None</option>
                <option value="price">Price</option>
                <option value="rating">Rating</option>
                <option value="date">Date Added</option>
                <option value="discount">Discount</option>
                <option value="availability">Availability</option>
              </select>
            </div>
          </div>
        </div>
        <div className="body">
          <div className="left-container">
            <div className="sub-categories-filter">
              <h3>Sub category menu</h3>
              <ul className="body">
                {categories &&
                  categories.slice(0, 4).map((category, index) => (
                    <div key={`${category.name}-${index}`}>
                      <li onClick={() => handleCategorySelect(category.name)}>
                        {category.name}
                      </li>
                      <span>100</span>
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
                      <input
                        type="radio"
                        name="rating"
                        value={rating}
                        checked={selectedRating === rating}
                        onChange={() => handleRatingSelect(rating)}
                      />

                      {getStars(rating, 15)}
                    </label>
                  );
                })}
              </div>
            </div>
            <div className="price-filter">
              <h3>Price</h3>
              <div className="body">
                <div className="inputs">
                  <input
                    type="number"
                    min="0"
                    placeholder="Min Price"
                    value={minPrice}
                    onChange={(e) => setMinPrice(e.target.value)}
                  />
                  <input
                    type="number"
                    min="0"
                    placeholder="Max Price"
                    value={maxPrice}
                    onChange={(e) => setMaxPrice(e.target.value)}
                  />
                </div>
                <div className="buttons">
                  <button className="apply" onClick={handlePriceFilter}>
                    Apply
                  </button>
                  <button onClick={handleResetPriceFilter}>Reset</button>
                </div>
              </div>
            </div>{" "}
          </div>
          <div
            className={`right-container ${
              viewMode === "list" ? "list-view" : ""
            }`}
          >
            {status === "succeeded" &&
              filteredItems.map((product) => (
                <ProductCard
                  key={product.id}
                  product={product}
                  viewMode={viewMode}
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
