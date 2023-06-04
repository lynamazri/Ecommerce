import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { MdKeyboardArrowRight } from "react-icons/md";
import { AiFillHeart, AiOutlineHeart } from "react-icons/ai";
import { FaStar, FaRegStar } from "react-icons/fa";
import { TbListDetails } from "react-icons/tb";
import { useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { add } from "../../redux/Slices/CartSlice";
import { getStars, calculateAvg } from "../../utils";
import { useGetProductQuery } from "../../redux/Slices/apiSlice";
import Navbar from "../../components/Navbar/Navbar";
import Path from "../../components/Path/Path";
import Swiperr from "../../components/Swiper/Swiper";
import Footer from "../../components/Footer/Footer";
import ReviewCard from "../../components/ReviewCard/ReviewCard";
import "./ProductDetails.css";
import { useCreateReviewMutation } from "../../redux/Slices/apiSlice";

export default function ProductDetails() {
  const [wishListIcon, setWishListIcon] = useState(false);
  const [pcsCount, setPcsCount] = useState(1);
  const [showQteDiv, setShowQteDiv] = useState(false);
  const [details, setDetails] = useState("description");
  const [product, setProduct] = useState({});
  const [images, setImages] = useState([]);
  const [reviews, setReviews] = useState([]);
  const [errorMessage, setErrorMessage] = useState("");
  const [confirmationMessage, setConfirmationMessage] = useState("");
  const [rating, setRating] = useState(null);
  const [hover, setHover] = useState(null);
  const params = useParams();
  const user = localStorage.getItem("user")
    ? JSON.parse(localStorage.getItem("user"))
    : null;
  const [createReview] = useCreateReviewMutation();
  const [reviewComment, setReviewComment] = useState({
    content: "",
    stars: rating,
    userId: user.userId,
    productId: params.id,
  });
  const { data } = useGetProductQuery(params.id);
  const processedData = {
    ...data,
    reviewsCount: data?.reviews.length,
    reviewsAvg: data && calculateAvg(data.reviews),
  };
  useEffect(() => {
    data && setProduct(processedData);
    data && setImages(processedData.images);
    data && setReviews(processedData.reviews);
    data && console.log(product);
  }, [data]);
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

  function handleChange() {
    const { name, value } = event.target;
    setReviewComment((prevReviewComment) => ({
      ...prevReviewComment,
      [name]: value,
    }));
  }

  function handleSubmit(event) {
    event.preventDefault();

    createReview({
      content: reviewComment.content,
      stars: reviewComment.stars,
      productId: reviewComment.productId,
    })
      .unwrap()
      .then(() => {
        setConfirmationMessage("Comment posted.");
      })
      .catch(() => {
        setErrorMessage("Error.");
      });
  }
  console.log(reviewComment);
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
                  {product.discount?.percentage &&
                  product.discount?.percentage !== 0 ? (
                    <span className="countLabel">
                      - {product.discount.percentage} %
                    </span>
                  ) : null}
                  <span className="countLabel">Free shipping</span>
                </div>
              </div>
              <div>{/* <img className="photo" src={product.image} /> */}</div>
            </section>
            <section className="info">
              <div className="title">
                <h3>{product?.name}</h3>
                {product.reviewsCount !== 0 ? (
                  <div className="reviewStars">
                    <div className="starsContainer">
                      {product?.reviewsAvg && getStars(product.reviewsAvg, 14)}
                    </div>
                    <small>({product.reviewsCount} customer reviews)</small>
                  </div>
                ) : (
                  <div>No review posted yet</div>
                )}
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
                  <>
                    <div className="price">
                      <>
                        {product.discount &&
                        product.discount.percentage !== 0 ? (
                          <p>
                            DZD{" "}
                            {product.price -
                              (product.price * product.discount.percentage) /
                                100}
                          </p>
                        ) : (
                          <p>DZD {product.price}</p>
                        )}
                        {product.discount &&
                          product.discount.percentage !== 0 && (
                            <small className="old-price">
                              DZD {product.price}
                            </small>
                          )}
                      </>
                    </div>
                  </>
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
                  Reviews{" "}
                  {product.reviewsCount !== 0 && (
                    <span className="countLabel">{product.reviewsCount}</span>
                  )}
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
                  <form
                    className="comment-form-container"
                    onSubmit={handleSubmit}
                  >
                    <h3>Leave a comment</h3>
                    <div className="textarea-container">
                      <label htmlFor="comment">Comment</label>
                      <textarea
                        id="content"
                        className="content-input"
                        value={reviewComment.content}
                        name="content"
                        placeholder="Space for your comment"
                        onChange={handleChange}
                        rows="4"
                        cols="50"
                      ></textarea>
                    </div>
                    <div className="star-rating-container">
                      {[...Array(5)].map((star, i) => {
                        const ratingValue = i + 1;

                        return (
                          <label onChange={handleChange}>
                            <input
                              type="radio"
                              className="starRadioInput"
                              name="stars"
                              value={ratingValue}
                              onClick={() => setRating(ratingValue)}
                            />
                            {ratingValue <= (hover || rating) ? (
                              <FaStar
                                className="star"
                                color="#fdbc15"
                                size={20}
                                onMouseEnter={() => setHover(ratingValue)}
                                onMouseLeave={() => setHover(null)}
                              />
                            ) : (
                              <FaRegStar
                                className="star"
                                color="#fdbc15"
                                size={20}
                                onMouseEnter={() => setHover(ratingValue)}
                                onMouseLeave={() => setHover(null)}
                              />
                            )}
                          </label>
                        );
                      })}
                    </div>
                    <button className="comment-button">Send a comment</button>
                  </form>

                  {reviews.map((review) => (
                    <ReviewCard
                      author={review.userId}
                      role="Customer"
                      rating={review.stars}
                      date={review.posted.slice(0, 10)}
                      content={review.content}
                    />
                  ))}
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
