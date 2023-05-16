import React, { useState } from "react";
import { MdKeyboardArrowRight, MdKeyboardArrowDown } from "react-icons/md";
import { AiFillHeart, AiOutlineHeart } from "react-icons/ai";
import { TbListDetails } from "react-icons/tb";
import { BsStarFill, BsStarHalf, BsStar } from "react-icons/bs";
import { FaStar, FaStarHalfAlt, FaRegStar } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import UserNavbar from "../../components/UserNavbar/UserNavbar";
import Footer from "../../components/Footer/Footer";
import Product from "../../components/Product/Product";
import Path from "../../components/Path/Path";
import { useParams } from "react-router-dom";
import { add } from "../../redux/Slices/CartSlice";

import "./ProductDetails.css";

export default function ProductDetails() {
  const [wishListIcon, setWishListIcon] = useState(false);
  const [pcsCount, setPcsCount] = useState(1);
  const [showQteDiv, setShowQteDiv] = useState(false);
  const { items } = useSelector((state) => state.products); //9adra nbedelha tweli b RTK query
  const params = useParams();
  let product;
  items.forEach((element) => {
    if (element.id == params.id) {
      product = element;
    }
  });
  const dispatch = useDispatch();
  const handleAdd = () => {
    dispatch(add(product));
  };
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
  function generateRatingStars(rate) {
    const stars = [];

    const floorRating = Math.floor(rate);
    for (let i = 0; i < floorRating; i++) {
      stars.push(<FaStar key={i} />);
    }
    if (rate - floorRating >= 0.5) {
      stars.push(<FaStarHalfAlt key={floorRating} />);
    }
    const remaining = 5 - stars.length;
    for (let i = 0; i < remaining; i++) {
      stars.push(<FaRegStar key={i + floorRating} />);
    }
    return stars;
  }
  return (
    <>
      <UserNavbar />
      <main>
        <div className="container">
          <Path product={product} />
          <div className="flexContainer">
            <section className="photos">
              <div className="photo">
                <img src={product.image} />
                <div className="countLabelContainer">
                  <span className="countLabel">- 36 %</span>
                  <span className="countLabel">Free shipping</span>
                </div>
              </div>
            </section>
            <section className="info">
              <div className="title">
                <h3>{product.title}</h3>
                <div className="reviewStars">
                  <div className="starsContainer">
                    {generateRatingStars(product.rating.rate)}
                  </div>
                  <small>({product.rating.count} customer review)</small>
                </div>
              </div>
              <div className="description">
                <p>{product.description}</p>
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
                      <li>{product.category}</li>
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
                  {/* {props.isOnSale ? ( */}
                  <>
                    <p>DZD {product.price - 20}</p>
                    <small className="old-price">DZD {product.price}</small>
                  </>
                  {/* ) : null} */}
                  {/* <span>DZD{props.price}</span> */}
                </div>

                <div className="buttons">
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
