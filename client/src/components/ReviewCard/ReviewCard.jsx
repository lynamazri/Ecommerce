import React from "react";
import { FaStar, FaStarHalfAlt, FaRegStar } from "react-icons/fa";
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
        <img className="profile-picture" />
        <div className="head">
          <div className="username-container">
            <h6 className="username">{props.author}</h6>
            <h6 className="role countLabel">{props.role}</h6>
            <div className="review-rating-cointainer">
              {generateRatingStars(props.rating)}
            </div>
          </div>
          <small className="review-date">{props.date}</small>
        </div>
      </div>
      <p className="review-comment">
        Hi everyone, we have been working hard with the team bringing a new
        articles. It has passed a few months till we released it in case of
        traveling and shooting, hopefully you’ll love it.
      </p>
    </div>
  );
}
