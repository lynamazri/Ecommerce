import React, { useEffect, useState } from "react";
import { RiSearchLine, RiDeleteBack2Line } from "react-icons/ri";
import "./Navbar.css";
import axios from "axios";

function Search() {
  const [query, setQuery] = useState("");
  const [data, setData] = useState([]);

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

  return (
    <>
      <div className="searchBar">
        <span className="categories">All Categories</span>
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
