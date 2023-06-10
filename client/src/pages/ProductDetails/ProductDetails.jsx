import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { MdKeyboardArrowRight } from "react-icons/md";
import { AiFillHeart, AiOutlineHeart } from "react-icons/ai";
import { FaStar, FaRegStar } from "react-icons/fa";
import { TbListDetails } from "react-icons/tb";
import { useDispatch } from "react-redux";
import { Link, useParams } from "react-router-dom";
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
  const { data: productData } = useGetProductQuery(params.id);
  const processedData = {
    ...productData,
    reviewsCount: productData?.reviews.length,
    reviewsAvg: productData && calculateAvg(productData.reviews),
  };
  useEffect(() => {
    productData && setProduct(processedData);
    productData && setImages(processedData.images);
    productData && setReviews(processedData.reviews);
  }, [productData]);

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
    setConfirmationMessage(""), setErrorMessage("");

    createReview({
      content: reviewComment.content,
      stars: reviewComment.stars,
      productId: reviewComment.productId,
      userId: reviewComment.userId,
    })
      .unwrap()
      .then(() => {
        setConfirmationMessage("Comment posted.");
      })
      .catch(() => {
        setErrorMessage("Failed to post review. Please try again.");
      });
  }
  console.log(images.length);

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
                </div>
              </div>

              <div className="secondary-photo-container">
                {images.length > 1
                  ? images.slice(1).map((image) => (
                      <div className="secondary-photo">
                        <img src={image.url} />
                      </div>
                    ))
                  : null}
              </div>
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
                      <li>Store:</li>
                      <li>SKU:</li>
                      <li>Category:</li>
                      <li>Stock:</li>
                    </ul>
                  </div>
                  <div className="detailsValue">
                    <ul className="detailValueList">
                      <Link to={`/shop/${product?.store?.storeId}`}>
                        {product?.store?.name}
                      </Link>
                      <li>{product.productId}</li>
                      <li>{product?.subCat?.name}</li>
                      {product.quantity > 0 ? (
                        <li>In Stock</li>
                      ) : (
                        <li color="red">Out of Stock</li>
                      )}
                    </ul>
                  </div>
                </div>
                <div className="information">
                  <div className="detailsTitle">
                    <ul className="detailTitleList">
                      <li>Available since:</li>
                      <li>Delivery:</li>
                    </ul>
                  </div>
                  <div className="detailsValue">
                    <ul className="detailValueList">
                      <li>{product?.dateAdded}</li>
                      <li>2 to 5 business days</li>
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
                  {product.quantity > 0 ? (
                    <div className="addToCartButton">
                      <button onClick={() => handleAdd()}>+ Add To Cart</button>
                    </div>
                  ) : (
                    <div className="addToCartButtonDesactivated">
                      <button>Out of Stock</button>
                    </div>
                  )}
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
                    <h5>About This Product</h5>
                    <p>{product?.description}</p>
                  </div>
                  <div className="features">
                    <h5>Before You Buy</h5>
                    <p>
                      To ensure a comfortable shopping experience, please make
                      sure to properly check the product details above as well
                      as the customer reviews before making a purchase. Feel
                      free to contact us or the concerned store for more
                      information.
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
                    <h3>Leave a review</h3>
                    <div className="textarea-container">
                      <label htmlFor="comment">New Review</label>
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
                    <button className="comment-button">Send a review</button>
                    {errorMessage && (
                      <p className="error-message">{errorMessage}</p>
                    )}
                    {confirmationMessage && (
                      <p className="success-message">{confirmationMessage}</p>
                    )}
                  </form>

                  {reviews.map((review, index) => (
                    <ReviewCard
                      key={index}
                      author={review.user.username}
                      role="Customer"
                      rating={review.stars}
                      date={review.posted.slice(0, 10)}
                      content={review.content}
                      reviewId={review.reviewId}
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
          <section className="product-container">
            <div className="header">
              <h3>Related products</h3>
              <Link to={`/products/All Categories`}>
                More products <MdKeyboardArrowRight />
              </Link>
            </div>
            <Swiperr sectionType="products" prodCat={product?.subCatId} />
          </section>
        </div>
      </main>
      <Footer />
    </>
  );
}
