import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faMagnifyingGlass,
  faCartShopping,
} from "@fortawesome/free-solid-svg-icons";
import { faBell } from "@fortawesome/free-regular-svg-icons";
import { Link } from "react-router-dom";
import "./Navbar.css";

function UserNavbar() {
  return (
    <header>
      <div className="upperBar">
        <div className="logo">MAGAZA</div>
        <div className="searchBar">
          <div className="categoriesBtn">ALL</div>
          <input id="searchBar" placeholder="Search" />
          <FontAwesomeIcon
            icon={faMagnifyingGlass}
            style={{ color: "#8b8b8b" }}
          />
        </div>
        <div className="slidder">
          <FontAwesomeIcon className="bellIcon" icon={faBell} />
          <Link to="/cart/:id">
            <FontAwesomeIcon
              className="cartIcon"
              icon={faCartShopping}
              style={{ color: "#1F2C4C" }}
            />
            <span className="bag-quantity">3</span>
          </Link>
        </div>
        <div className="profil">
          <div className="profilPicture">
            <img
              className="profilPicture"
              src="data:image/jpeg;base64,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"
            />
          </div>
          <div>
            <span className="welcomeMessage">Hi, Welcome!</span> <br />
            <span className="userName">AKRAM</span>
          </div>
        </div>
      </div>
      <div className="lowerBar">
        <ul>
          <li>
            <Link to="/">
              <h3>Home</h3>
            </Link>
          </li>
          <li>
            <Link>
              <h3>Categories</h3>
            </Link>
          </li>
          <li>
            <Link>
              <h3>Today's Deals</h3>
            </Link>
          </li>
          <li>
            <Link>
              <h3>Sell</h3>
            </Link>
          </li>
          <li>
            <Link>
              <h3>Shops</h3>
            </Link>
          </li>
        </ul>
      </div>
    </header>
  );
}

export default UserNavbar;
