import React, { useState } from "react";
import { Link } from "react-router-dom";
import { RiSearchLine, RiShoppingCart2Line, RiUserLine } from "react-icons/ri";
import "./Navbar.css";
import Menu from "./Menu";
import CartIcon from "./CartIcon";

function UserNavbar() {
  // const { quantity } = useSelector((state) => state.cart);
  const [cartCount, setCartCount] = useState(1);

  return (
    <header>
      <div className="upperBar">
        <div className="siteInfo">
          <p>+213-555-065-685</p>
          <p>info@magaza.com</p>
        </div>
        <nav className="links">
          <ul>
            <li>
              <Link to="FAQ" className="link">
                FAQ
              </Link>
            </li>
            <li>
              <Link to="About Us" className="link">
                About Us
              </Link>
            </li>
          </ul>
        </nav>
      </div>

      <div className="lowerBar">
        <Link to="/" className="logo">
          <img src="" />
          <h1>magaza</h1>
        </Link>
        <div className="searchBar">
          <span className="categories">All Categories</span>
          <div className="searchInput">
            <input type="text" placeholder="Search products, categories ..." />
          </div>
          <div className="searchIcon">
            <RiSearchLine size={18} />
          </div>
        </div>
        <div className="profil--cart">
          <Link to="/profil" className="profil">
            <RiUserLine size={26} color="#ffffff" />
          </Link>
          <CartIcon count={cartCount} />
        </div>
      </div>
      <Menu />
    </header>
  );
}

export default UserNavbar;
