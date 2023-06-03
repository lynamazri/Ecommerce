import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { BsGrid, BsViewList } from "react-icons/bs";
import Navbar from "../../components/Navbar/Navbar";
import Path from "../../components/Path/Path";
import StoreCard from "../../components/StoreCard/StoreCard";
import Footer from "../../components/Footer/Footer";
import { categories } from "../../components/Navbar/Menu";
import {
  fetchStoresData,
  updateFilteredStores,
} from "../../redux/Slices/storesSlice";

import "./Stores.css";

function Stores() {
  const dispatch = useDispatch();
  const { stores, filteredStores, status } = useSelector(
    (state) => state.stores
  );
  console.log(stores);
  console.log(filteredStores);
  console.log(status);

  const { category } = useParams();

  const [selectedCategory, setSelectedCategory] = useState(null);
  const [viewMode, setViewMode] = useState("grid"); // State variable to track the view mode

  const handleCategorySelect = (selectedCategory) => {
    setSelectedCategory(selectedCategory);
    let filteredStores = stores.filter((store) =>
      store.category.includes(selectedCategory)
    );
    dispatch(updateFilteredStores(filteredStores));
  };

  const toggleViewMode = (mode) => {
    setViewMode(mode);
  };

  useEffect(() => {
    dispatch(fetchStoresData());
  }, [dispatch]);

  return (
    <div>
      <Navbar />
      <Path />
      <div className="stores-page">
        <div className="header">
          <h2>Shops</h2>
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
        <div className="body">
          <div className="left-container">
            <div className="shops-categories-filter">
              <h3>Shops category menu</h3>
              <ul className="body">
                {categories.slice(0, 4).map((category, index) => (
                  <div key={index}>
                    <li
                      key={index}
                      onClick={() => handleCategorySelect(category.name)}
                    >
                      {category.name}
                    </li>
                    <span>100</span>
                  </div>
                ))}
              </ul>
            </div>
          </div>
          <div
            className={`right-container ${
              viewMode === "list" ? "list-view" : ""
            }`}
          >
            {status === "succeeded" &&
              filteredStores.map((store) => (
                <StoreCard
                  key={store.storeId}
                  store={store}
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

export default Stores;
