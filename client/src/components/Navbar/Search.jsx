import React, { useEffect, useState } from "react";
import { RiSearchLine, RiDeleteBack2Line } from "react-icons/ri";
import { Link } from "react-router-dom";
import "./Navbar.css";
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useGetSubCategoriesQuery } from "../../redux/Slices/apiSlice";
import { searchedProducts } from "../../redux/Slices/productsSlice";
function Search() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [query, setQuery] = useState("");
  const [data, setData] = useState([]);
  const [showOptions, setShowOptions] = useState(false);
  const [showSearchResult, setShowSearchResult] = useState(false);
  const [subCatValue, setSubCatValue] = useState("All Categories");

  const [input, setInput] = useState("");
  const [productsSearched, setProductsSearched] = useState("");
  const { data: subCategories, isLoading } = useGetSubCategoriesQuery();

  const fetchData = () => {
    axios
      .get(
        subCatValue === "All Categories"
          ? `http://localhost:3001/productss/search/${input}`
          : `http://localhost:3001/productss/search/${input}/category/${subCatValue}`
      )
      // .get(`http://localhost:3001/productss/allProducts/${value}`)
      .then((response) => {
        // Handle the response data
        setProductsSearched(response.data);
      })
      .catch((error) => {
        // Handle any errors that occurred during the request
        if (error.response.data === "No products found.") {
          setProductsSearched([]);
        }
      });
  };
  useEffect(() => {
    fetchData();
    if (input === "") {
      setShowSearchResult(false);
    } else {
      setShowSearchResult(true);
    }
  }, [input]);

  const handleOptionsClick = () => {
    setShowOptions(!showOptions);
  };

  if (isLoading) {
    return null;
  }
  const subCategoryNames = subCategories.map((subcategory) => {
    return subcategory.name;
  });

  const handleOptionClick = (optionValue) => {
    setSubCatValue(optionValue);
    setShowOptions(!showOptions);
  };

  const handleClick = () => {
    dispatch(searchedProducts(productsSearched));
    // navigate("/products/Electronics");
    setInput("");
  };
  return (
    <>
      <div className="searchBar">
        <div
          className={
            showOptions ? "categories-constainer categories" : "categories"
          }
          onClick={handleOptionsClick}
        >
          <span className="categories">{subCatValue}</span>
          <div
            className={
              showOptions
                ? "subcategories-list-options show"
                : "subcategories-list-options"
            }
          >
            {showOptions && (
              <ul className="options-list">
                <li
                  className="options"
                  onClick={() => handleOptionClick("All Categories")}
                >
                  All Categories
                </li>
                {subCategoryNames
                  ? subCategoryNames?.map((subCategoryName) => {
                      return (
                        <>
                          <li
                            className="options"
                            onClick={() => handleOptionClick(subCategoryName)}
                          >
                            {subCategoryName}
                          </li>
                        </>
                      );
                    })
                  : null}
              </ul>
            )}
          </div>
        </div>
        <div className="searchInput">
          <input
            type="search"
            placeholder="Search products, categories..."
            value={input}
            onChange={(e) => {
              setInput(e.target.value);
            }}
          />
          <div
            className={
              showSearchResult ? "search-result search-show" : "search-result"
            }
          >
            <div className="product-list">
              {productsSearched &&
                productsSearched.map((productSearched) => (
                  <Link
                    to={`/product/${productSearched.subCat.name}/${productSearched.productId}`}
                  >
                    <div className="product">{productSearched.name}</div>
                  </Link>
                ))}
            </div>
          </div>
        </div>
        <div className="searchIcon" onClick={handleClick}>
          {query.length === 0 ? (
            <RiSearchLine size={18} />
          ) : (
            <RiDeleteBack2Line size={18} onClick={clearInput} />
          )}
        </div>
      </div>
    </>
  );
}

export default Search;
