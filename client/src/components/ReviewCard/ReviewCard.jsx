import React from "react";
import { FaStar, FaStarHalfAlt, FaRegStar } from "react-icons/fa";
import { TbMessageReport } from "react-icons/tb";
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
          <button className="report-button">
            <TbMessageReport />
          </button>
        </div>
        <small className="review-date">{props.date}</small>
      </div>
      <p className="review-comment">{props.content}</p>
    </div>
  );
}
