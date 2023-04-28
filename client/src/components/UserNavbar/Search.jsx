import React, { useEffect, useState } from "react";
import { RiSearchLine, RiShoppingCart2Line, RiUserLine } from "react-icons/ri";
import "./Navbar.css";
import axios from "axios";
import SearchRes from "./SearchRes";

function Search() {
  const [query, setQuery] = useState("");
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const res = await axios.get(`http://localhost:3001?q=${query}`);
      setData(res.data);
    };
    if (query.length === 0 || query.length > 2) fetchData();
  }, [query]);
  return (
    <>
      <div className="searchBar">
        <span className="categories">All Categories</span>
        <div className="searchInput">
          <input
            type="text"
            placeholder="Search products, categories ..."
            onChange={(e) => setQuery(e.target.value.toLowerCase())}
          />
        </div>
        <div className="searchIcon">
          <RiSearchLine size={18} />
        </div>
      </div>
      {/* <SearchRes data={data} /> */}
    </>
  );
}

export default Search;
