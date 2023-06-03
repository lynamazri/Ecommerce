import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { MdKeyboardArrowRight, MdKeyboardArrowDown } from "react-icons/md";
import { AiFillHeart, AiOutlineHeart } from "react-icons/ai";
import { TbListDetails } from "react-icons/tb";
import { FaStar, FaStarHalfAlt, FaRegStar } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import Navbar from "../../components/Navbar/Navbar";
import Path from "../../components/Path/Path";
import Swiperr from "../../components/Swiper/Swiper";
import Footer from "../../components/Footer/Footer";
import ReviewCard from "../../components/ReviewCard/ReviewCard";
import { useParams } from "react-router-dom";
import { add } from "../../redux/Slices/CartSlice";

import "./ProductDetails.css";
import axios from "axios";

export default function ProductDetails() {
  const [wishListIcon, setWishListIcon] = useState(false);
  const [pcsCount, setPcsCount] = useState(1);
  const [showQteDiv, setShowQteDiv] = useState(false);
  const [details, setDetails] = useState("description");
  const [product, setProduct] = useState({});
  const [images, setImages] = useState([]);
  const [reviews, setReviews] = useState([]);
  // const { items } = useSelector((state) => state.products); //9adra nbedelha tweli b RTK query
  // console.log(items);
  const params = useParams();
  // items.forEach((element) => {
  //   if (element.id == params.id) {
  //     product = element;
  //   }
  // });
  useEffect(() => {
    axios
      .get(`http://localhost:3001/productss/store/${params.id}`)
      .then((res) => {
        console.log(res.data);
        setProduct(res.data);
        setImages(res.data.images);
        setReviews(res.data.reviews);
      });
  }, []);

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
      <Navbar />
      <main>
        <Path />

        <div className="container">
          <div className="flexContainer">
            <section className="photos">
              <div className="photo">
                {images[0]?.url && <img src={images[0]?.url} />}
                <div className="countLabelContainer">
                  <span className="countLabel">- 36 %</span>
                  <span className="countLabel">Free shipping</span>
                </div>
              </div>
              <div>{/* <img className="photo" src={product.image} /> */}</div>
            </section>
            <section className="info">
              <div className="title">
                <h3>{product?.name}</h3>
                <div className="reviewStars">
                  <div className="starsContainer">
                    {generateRatingStars(reviews.length)}
                  </div>
                  <small>({reviews?.length} customer reviews)</small>
                </div>
              </div>
              <div className="description">
                <p>{product?.description}</p>
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
                      <li>{product?.subCat?.name}</li>
                      <li>Stock</li>
                      <li>{product?.store?.name}</li>
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
                    <p>DZD {product?.price}</p>
                    <small className="old-price">DZD {product?.price}</small>
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
                <button
                  className={`${
                    details === "description" ? "selected-button" : ""
                  }`}
                  onClick={() => {
                    setDetails("description");
                  }}
                >
                  Description
                </button>
                <button
                  className={`${
                    details === "reviews" ? "selected-button" : ""
                  }`}
                  onClick={() => {
                    setDetails("reviews");
                  }}
                >
                  Reviews <span className="countLabel">18</span>
                </button>
                <button
                  className={`${
                    details === "questions" ? "selected-button" : ""
                  }`}
                  onClick={() => setDetails("questions")}
                >
                  Questions <span className="countLabel">4</span>
                </button>
              </div>
              {details === "description" && (
                <motion.div
                  className="description-container"
                  initial={{ x: "50vw" }}
                  animate={{ x: 0 }}
                  transition={{
                    type: "spring",
                    stiffness: 30,
                    duration: 0.1,
                  }}
                >
                  <div className="description">
                    <h5>Origins</h5>
                    <p>
                      We work hard to ensure that the fruit and vegetables we
                      sell are fresh and high in quality. If we don’t grow them
                      ourselves, we source them from carefully chosen suppliers,
                      preferring to buy locally whenever possible.
                    </p>
                  </div>
                  <div className="features">
                    <h5>Features</h5>
                    <p>
                      Enumerate the product's key features in a bullet-point
                      format. Focus on the most important aspects that
                      differentiate it from other products.
                    </p>
                  </div>
                </motion.div>
              )}
              {details === "reviews" && (
                <motion.div
                  className="reviews-container"
                  initial={{ x: "50vw" }}
                  animate={{ x: 0 }}
                  transition={{
                    type: "spring",
                    stiffness: 30,
                    duration: 0.1,
                  }}
                >
                  <div className="comment-form-container">
                    <h3>Leave a comment</h3>
                    <div className="textarea-container">
                      <label htmlFor="comment">Comment</label>
                      <textarea
                        id="comment"
                        className="comment-input"
                        name="comment"
                        placeholder="Space for your comment"
                        rows="4"
                        cols="50"
                      ></textarea>
                    </div>

                    <button className="comment-button">Send a comment</button>
                  </div>
                  <ReviewCard
                    author="NapSTER"
                    role="Admin"
                    rating={3.5}
                    date="22. 4. 2023"
                  />
                  <ReviewCard
                    author="Cha3ban"
                    role="Admin"
                    rating={4.5}
                    date="25. 4. 2023"
                  />
                  <ReviewCard
                    author="Wahid"
                    role="Customer"
                    rating={1.5}
                    date="12. 5. 2023"
                  />
                  <ReviewCard
                    author="Wahid"
                    role="Customer"
                    rating={1.5}
                    date="12. 5. 2023"
                  />
                  <ReviewCard
                    author="Wahid"
                    role="Customer"
                    rating={1.5}
                    date="12. 5. 2023"
                  />
                  <ReviewCard
                    author="Wahid"
                    role="Customer"
                    rating={1.5}
                    date="12. 5. 2023"
                  />
                </motion.div>
              )}
              {details === "questions" && (
                <motion.div
                  className="questions-container"
                  initial={{ x: "50vw" }}
                  animate={{ x: 0 }}
                  transition={{
                    type: "spring",
                    stiffness: 30,
                    duration: 0.1,
                  }}
                ></motion.div>
              )}
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
            <Swiperr sectionType="products" />
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
