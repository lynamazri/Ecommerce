import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faMagnifyingGlass,
  faCartShopping,
} from "@fortawesome/free-solid-svg-icons";
import { faBell } from "@fortawesome/free-regular-svg-icons";
import { Link } from "react-router-dom";
import "./Navbar.css";
import Menu from "./Menu";

export default function UserNavbar() {
  return (
    <header>
      <div className="navBar">
        <div className="upperBar">
          <Link to="/" className="logo">
            <h1>MAGAZA</h1>
          </Link>
          <div className="searchBar">
            <div className="categoriesBtn">ALL</div>
            <input id="searchBar" placeholder="Search" />
            <FontAwesomeIcon
              icon={faMagnifyingGlass}
              style={{ color: "#8b8b8b" }}
            />
          </div>
          <div>
            <div className="Cart">
              <Link to="/cart">
                <FontAwesomeIcon
                  className="cartIcon"
                  icon={faCartShopping}
                  style={{ color: "#1F2C4C" }}
                />
                <span className="bag-quantity">3</span>
              </Link>
            </div>
            <div className="profilPicture"></div>
          </div>
        </div>

        <Menu />
      </div>
    </header>
  );
}
