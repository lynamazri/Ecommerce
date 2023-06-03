import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import Menu from "./Menu";
import CartIcon from "./CartIcon";
import Search from "./Search";
import Cart from "../Cart/Cart";
import ProfileMenu from "../ProfileMenu/ProfileMenu";
import { useSelector } from "react-redux";
import { RiUserLine } from "react-icons/ri";

import "./Navbar.css";

function Navbar(props) {
  const { cartItems } = useSelector((state) => state.cart);
  const [isCartOpen, setCartOpen] = useState(false);
  const [isProfileMenuOpen, setProfileMenuOpen] = useState(false);
  const navbarRef = useRef(null);

  const handleCartIconClick = () => {
    setCartOpen(!isCartOpen);
    setProfileMenuOpen(false);
  };

  const handleProfileIconClick = () => {
    setProfileMenuOpen(!isProfileMenuOpen);
    setCartOpen(false);
  };

  const closeMenus = () => {
    setCartOpen(false);
    setProfileMenuOpen(false);
  };

  useEffect(() => {
    const handleOutsideClick = (event) => {
      if (
        navbarRef.current &&
        !navbarRef.current.contains(event.target) &&
        (isCartOpen || isProfileMenuOpen)
      ) {
        closeMenus();
      }
    };

    document.addEventListener("mousedown", handleOutsideClick);
    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, [isCartOpen, isProfileMenuOpen]);

  return (
    <>
      <header ref={navbarRef}>
        <div className="upperBar">
          <div className="siteInfo">
            <p>+213-555-065-685</p>
            <p>info@magaza.com</p>
          </div>
          <nav className="links">
            <ul>
              <li>
                <Link to="help" className="link">
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
          <Search />
          <div className="profil--cart">
            <div onClick={handleProfileIconClick} className="profilIcon">
              <RiUserLine size={21} color="#ffffff" />
            </div>
            <div onClick={handleCartIconClick} className="cartIconContainer">
              <CartIcon count={cartItems.length} open={isCartOpen} />
            </div>
          </div>
        </div>
        <Menu />
        {isProfileMenuOpen && (
          <ProfileMenu
            closeMenu={closeMenus}
            userHasShop={false}
            style={{ zIndex: 3 }}
          />
        )}
        {isCartOpen && (
          <Cart
            isCheckoutPage={false}
            closeMenu={closeMenus}
            style={{ zIndex: 3 }}
          />
        )}
      </header>
      {isCartOpen || isProfileMenuOpen ? (
        <div className="overlay-wrapper">
          <div className="overlay" onClick={closeMenus} />
        </div>
      ) : null}
    </>
  );
}

export default Navbar;
