import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { BsGrid, BsViewList } from "react-icons/bs";
import Navbar from "../../components/Navbar/Navbar";
import Path from "../../components/Path/Path";
import StoreCard from "../../components/ShopCard/ShopCard";
import Footer from "../../components/Footer/Footer";
import {
  fetchStoresData,
  updateFilteredStores,
} from "../../redux/Slices/storesSlice";
import { useGetCategoriesQuery } from "../../redux/Slices/apiSlice";
import { useGetStoresQuery } from "../../redux/Slices/apiSlice";
import "./Shops.css";

function Shops() {
  const dispatch = useDispatch();
  // const { stores, status } = useSelector((state) => state.stores);
  const { data: storesData, isLoading: storesLoading } = useGetStoresQuery();
  const { data: categoriesData, isLoading, error } = useGetCategoriesQuery();
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [viewMode, setViewMode] = useState("grid"); // State variable to track the view mode
  const [stores, setStores] = useState([]);
  const [filteredStores, setFilteredStores] = useState([]);
  const [showCatName, setShowCatName] = useState(false);
  const { category } = useParams();
  useEffect(() => {
    dispatch(fetchStoresData());
  }, [dispatch]);
  useEffect(() => {
    if (categoriesData) {
      setCategories(categoriesData);
    }
    if (storesData) {
      setStores(storesData);
      setFilteredStores(stores);
    }
  }, [categoriesData, storesData]);

  const handleCategorySelect = (selectedCategory) => {
    setShowCatName(true);
    setSelectedCategory(selectedCategory.name);
    console.log(selectedCategory);
    setFilteredStores(
      stores.filter((store) => store.catId === selectedCategory.catId)
    );
    console.log(filteredStores);
    // dispatch(updateFilteredStores(filteredStores));
  };

  const toggleViewMode = (mode) => {
    setViewMode(mode);
  };

  return (
    <div>
      <Navbar />
      <Path />
      <div className="shops-page">
        <div className="header">
          <h2>{showCatName ? selectedCategory : "Shops"}</h2>
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
                <div
                  onClick={() => {
                    setFilteredStores(stores);
                    setShowCatName(false);
                  }}
                >
                  <li>All Categories</li>
                  {stores && <span>{stores.length}</span>}
                </div>
                {categories.length > 0 &&
                  categories.map((category, index) => {
                    const filteredStores = stores.filter(
                      (store) => store.catId === category.catId
                    );
                    return (
                      <div key={index}>
                        <li
                          key={index}
                          onClick={() => {
                            handleCategorySelect(category);
                          }}
                        >
                          {category.name}
                        </li>
                        <span>{filteredStores.length}</span>
                      </div>
                    );
                  })}
              </ul>
            </div>
          </div>
          <div
            className={`right-container ${
              viewMode === "list" ? "list-view" : ""
            }`}
          >
            {filteredStores.map((store) => (
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

export default Shops;
