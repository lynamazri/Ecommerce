import { FaStar, FaStarHalfAlt, FaRegStar } from "react-icons/fa";

function getStars(rate) {
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

export { getStars };
