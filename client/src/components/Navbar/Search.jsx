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

  useEffect(() => {
    const fetchData = async () => {
      const res = await axios.get(`http://localhost:3001?q=${query}`);
      setData(res.data);
    };
    if (query.length > 2) fetchData();
  }, [query]);

  const clearInput = () => {
    setData([]);
    setQuery("");
  };

  const handleFilter = (event) => {
    const searchWord = event.target.value.toLowerCase();
    setQuery(searchWord);
    if (searchWord === "") {
      setData([]);
    }
  };
  const handleOptionsClick = () => {
    setShowOptions(!showOptions);
  };
  const { data: subCategories, isLoading } = useGetSubCategoriesQuery();

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
            type="text"
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
