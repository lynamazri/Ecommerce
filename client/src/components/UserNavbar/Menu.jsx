import React from "react";
import { Link } from "react-router-dom";
import "./Menu.css";

export const categories = [
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
  return (
    <ul className="menu-list">
      {categories.map((category, index) => (
        <li key={index}>
          <Link to={`/products/${category.name}`}>{category.name}</Link>
        </li>
      ))}
    </ul>
  );
};

export default Menu;
