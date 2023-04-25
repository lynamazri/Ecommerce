import React from "react";
import { RiSearchLine, RiShoppingCart2Line, RiUserLine } from "react-icons/ri";
import "./Navbar.css";

function Search() {
  return (
    <div className="searchBar">
      <span className="categories">All Categories</span>
      <div className="searchInput">
        <input
          type="text"
          placeholder="Search products, categories ..."
          //onChange={handleSearch}
        />
      </div>
      <div className="searchIcon">
        <RiSearchLine size={18} />
      </div>
    </div>
  );
}

export default Search;
