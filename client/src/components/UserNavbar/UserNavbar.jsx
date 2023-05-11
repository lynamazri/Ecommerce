import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { RiUserLine } from "react-icons/ri";
import "./Navbar.css";
import Menu from "./Menu";
import CartIcon from "./CartIcon";
import Search from "./Search";
import Cart from "../../components/Cart/Cart";

function UserNavbar(props) {
  const { cartItems } = useSelector((state) => state.cart);

  const [isOpen, setIsOpen] = useState(false);
  function toggle() {
    setIsOpen((isOpen) => !isOpen);
  }

  //toggle={toggle} open={isOpen}
  {
    /* <div className="cart">{isOpen && <Cart />}</div>; */
  }

  return (
    <>
      <header>
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
            <Link to="/profil" className="profil">
              <RiUserLine size={21} color="#ffffff" />
            </Link>
            <div onClick={toggle} className="cartIconContainer">
              <CartIcon count={cartItems.length} open={isOpen} />
            </div>
          </div>
        </div>
        <Menu />
      </header>
      <div className="cart">{isOpen && <Cart />}</div>
    </>
  );
}

export default UserNavbar;
