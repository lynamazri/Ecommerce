import React, { useEffect, useState } from "react";
import { RiSearchLine, RiDeleteBack2Line } from "react-icons/ri";
import "./Navbar.css";
import axios from "axios";
import { useGetSubCategoriesQuery } from "../../redux/Slices/apiSlice";
function Search() {
  const [query, setQuery] = useState("");
  const [data, setData] = useState([]);
  const [showOptions, setShowOptions] = useState(false);
  const [subCatValue, setSubCatValue] = useState("All Categories");

  const [input, setInput] = useState("");
  const [productSearched, setProductSearched] = useState("");
  const { data: subCategories, isLoading } = useGetSubCategoriesQuery();

  const fetchData = (value) => {
    axios
      .get(
        `http://localhost:3001/productss/search?fsearch=${value}&category=${categoryVlue}`
      )
      // .get(`http://localhost:3001/productss/allProducts/${value}`)
      .then((response) => {
        // Handle the response data
        console.log(response.data);
        setProductSearched(response.data);
      })
      .catch((error) => {
        // Handle any errors that occurred during the request
        console.error(error);
      });
  };
  const handleChange = (value) => {
    setInput(value);
    fetchData(value);
  };

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
            value={query}
            onChange={(e) => handleFilter(e)}
          />
        </div>
        <div className="searchIcon">
          {query.length === 0 ? (
            <RiSearchLine size={18} />
          ) : (
            <RiDeleteBack2Line size={18} onClick={clearInput} />
          )}
        </div>
      </div>
      <div className="dataRes">
        {data.slice(0, 7).map((value, key) => {
          return (
            <div>
              <h3>{value.title}</h3>
              <span>{value.price}</span>
            </div>
          );
        })}
      </div>
    </>
  );
}

export default Search;
