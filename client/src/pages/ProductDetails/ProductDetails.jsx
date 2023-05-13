import React, { useState } from "react";
import { MdKeyboardArrowRight, MdKeyboardArrowDown } from "react-icons/md";
import { AiFillHeart, AiOutlineHeart } from "react-icons/ai";
import { TbListDetails } from "react-icons/tb";
import { BsStarFill, BsStarHalf, BsStar } from "react-icons/bs";
import UserNavbar from "../../components/UserNavbar/UserNavbar";
import Footer from "../../components/Footer/Footer";
import Product from "../../components/Product/Product";

import "./ProductDetails.css";

export default function ProductDetails() {
  const [wishListIcon, setWishListIcon] = useState(false);
  const [pcsCount, setPcsCount] = useState(1);
  const [showQteDiv, setShowQteDiv] = useState(false);
  const handleAdd = () => {};
  const handleAddToWishList = () => {
    setWishListIcon((prevWishListIcon) => !prevWishListIcon);
  };
  const toogleQteDiv = () => {
    setShowQteDiv((prevShowQteDiv) => !prevShowQteDiv);
  };
  const handlePcsIncrement = () => {
    setPcsCount((prevPcsCount) => prevPcsCount + 1);
  };
  const handlePcsDecrement = () => {
    if (pcsCount > 1) {
      setPcsCount((prevPcsCount) => prevPcsCount - 1);
    }
  };
  return (
    <>
      <UserNavbar />
      <main>
        <div className="container">
          <div className="path">
            <small>
              Homepage / Electronics /{" "}
              <span className="productName">iPhone 14 pro max</span>
            </small>
          </div>
          <div className="flexContainer">
            <section className="photos">
              <div className="photo">
                <img></img>
                <div className="countLabelContainer">
                  <span className="countLabel">- 36 %</span>
                  <span className="countLabel">Free shipping</span>
                </div>
              </div>
              <div className="photo">
                <img></img>
              </div>
              <div className="photo">
                <img></img>
              </div>
            </section>
            <section className="info">
              <div className="title">
                <h3>iPhone 14 pro max</h3>
                <div className="reviewStars">
                  <div className="starsContainer">
                    <BsStarFill />
                    <BsStarFill />
                    <BsStarFill />
                    <BsStarHalf />
                    <BsStar />
                  </div>
                  <small>(12 customer review)</small>
                </div>
              </div>
              <div className="description">
                <p>
                  Carrots from Tomissy Farm are one of the best on the market.
                  Tomisso and his family are giving a full love to his Bio
                  products. Tomisso’s carrots are growing on the fields
                  naturally.
                </p>
              </div>
              <div className="informationContainer">
                <div className="information">
                  <div className="detailsTitle">
                    <ul className="detailTitleList">
                      <li>SKU:</li>
                      <li>Category:</li>
                      <li>Stock:</li>
                      <li>Store:</li>
                    </ul>
                  </div>
                  <div className="detailsValue">
                    <ul className="detailValueList">
                      <li>76645</li>
                      <li>Electronics</li>
                      <li>Stock</li>
                      <li>Apple dz</li>
                    </ul>
                  </div>
                </div>
                <div className="information">
                  <div className="detailsTitle">
                    <ul className="detailTitleList">
                      <li>Freshness:</li>
                      <li>Delivery:</li>
                    </ul>
                  </div>
                  <div className="detailsValue">
                    <ul className="detailValueList">
                      <li>1 day old</li>
                      <li>in 2 days</li>
                    </ul>
                  </div>
                </div>
              </div>
              <div className="addToCart">
                <div className="price">
                  <p>1,329 USD</p>
                  <small>1500 USD</small>
                </div>

                <div className="buttons">
                  <div className="qte">
                    <div className="pcsContainer" onClick={toogleQteDiv}>
                      <div className="pcsCount">{pcsCount}</div>
                      <div className="pcsSeparator">|</div>
                      <div className="pcs">
                        <span>pcs</span>
                        <span className="arrowDown">
                          <MdKeyboardArrowDown />
                        </span>
                      </div>
                    </div>
                    {showQteDiv && (
                      <div className="handlePcs">
                        <button onClick={handlePcsDecrement}>-</button>
                        <button onClick={handlePcsIncrement}>+</button>
                      </div>
                    )}
                  </div>
                  <div className="addToCartButton">
                    <button onClick={() => handleAdd()}>+ Add To Cart</button>
                  </div>
                </div>
              </div>
              <div className="wishCompareContainer">
                <span>
                  <button
                    className="wishCompareBtn"
                    onClick={handleAddToWishList}
                  >
                    {wishListIcon ? <AiFillHeart /> : <AiOutlineHeart />}
                  </button>{" "}
                  {wishListIcon ? "Remove from " : "Add to "}
                  my wish list
                </span>
                <span>
                  <button className="wishCompareBtn">
                    <TbListDetails />
                  </button>{" "}
                  Compare
                </span>
              </div>
              <div className="buttonsContainer">
                <button>Description</button>
                <button>
                  Reviews <span className="countLabel">18</span>
                </button>
                <button>
                  Questions <span className="countLabel">4</span>
                </button>
              </div>
            </section>
          </div>
          <div className="relatedProducts">
            <div className="h3Container">
              <h3>Related products</h3>
              <h3>
                More products{" "}
                <span>
                  <MdKeyboardArrowRight />
                </span>
              </h3>
            </div>
            <div className="productWrapper"></div>
            <Product />
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
