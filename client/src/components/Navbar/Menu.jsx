import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./Menu.css";
import { useGetCategoriesQuery } from "../../redux/Slices/apiSlice";

export const categorie = [
  { name: "Shops" },
  { name: "Electronics" },
  { name: "Clothing and Fashion" },
  { name: "Health and Beauty" },
  { name: "Home" },
  { name: "Sports" },
  { name: "Books and Media" },
  { name: "Toys and Games" },
];

const Menu = () => {
  const [categories, setCategories] = useState([]);
  const { data, isLoading, error } = useGetCategoriesQuery();

  useEffect(() => {
    if (data) {
      setCategories(data);
    }
  }, [data]);
  return (
    <ul className="menu-list">
      <li>
        <Link to={`/Shops`}>Shops</Link>
      </li>
      {categories.map((category, index) => {
        return (
          <li key={index}>
            <Link to={`/products/${category.name}`}>{category.name}</Link>
          </li>
        );
      })}
    </ul>
  );
};

export default Menu;
