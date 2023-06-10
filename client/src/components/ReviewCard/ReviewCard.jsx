import React, { useState } from "react";
import { FaStar, FaStarHalfAlt, FaRegStar } from "react-icons/fa";
import { TbMessageReport } from "react-icons/tb";
import { useCreateReportMutation } from "../../redux/Slices/apiSlice";
import "./ReviewCard.css";

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

export default function ReviewCard(props) {
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [createReport] = useCreateReportMutation();

  var user = localStorage.getItem("user")
    ? JSON.parse(localStorage.getItem("user"))
    : null;

  function handleReport(event) {
    setSuccessMessage(""), setErrorMessage("");

    const rev = props.reviewId;
    console.log("reported" + rev);

    createReport({
      type: "User Review Report",
      review: rev,
      user: user.userId,
    })
      .unwrap()
      .then(() => {
        setSuccessMessage("Review reported.");
      })
      .catch(() => {
        setErrorMessage("Done.");
      });
  }

  return (
    <div className="review-card">
      <div className="review-header">
        <div className="username-container">
          <div className="bzbz">
            <h6 className="username">{props.author}</h6>
            <h6 className="role countLabel">{props.role}</h6>
            <div className="review-rating-cointainer">
              {generateRatingStars(props.rating)}
            </div>
          </div>
          <button className="report-button" onClick={handleReport}>
            <TbMessageReport />
          </button>
        </div>
        <small className="review-date">{props.date}</small>
      </div>
      <p className="review-comment">{props.content}</p>
      {errorMessage && <p className="error-message">{errorMessage}</p>}
      {successMessage && <p className="success-message">{successMessage}</p>}
    </div>
  );
}
