import React from "react";
import { Link } from "react-router-dom";
import "./Menu.css";

const categories = [
  { name: "Shops", link: "/shops" },
  { name: "Electronics", link: "/electronics" },
  { name: "Clothing and Fashion", link: "/clothing" },
  { name: "Health and Beauty", link: "/health" },
  { name: "Home", link: "/home" },
  { name: "Sports", link: "/sports" },
  { name: "Books and Media", link: "/books" },
  { name: "Toys and Games", link: "/toys" },
];

const Menu = () => {
  return (
    <ul className="menu-list">
      {categories.map((category, index) => (
        <li key={index}>
          <Link to={category.link}>{category.name}</Link>
        </li>
      ))}
    </ul>
  );
};

export default Menu;
