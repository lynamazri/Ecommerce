import { FaStar, FaStarHalfAlt, FaRegStar } from "react-icons/fa";

function getStars(rate, size) {
  const stars = [];
  const color = "#ffc107";

  const floorRating = Math.floor(rate);
  for (let i = 0; i < floorRating; i++) {
    stars.push(<FaStar key={i} style={{ fontSize: size, color: color }} />);
  }
  if (rate - floorRating >= 0.5) {
    stars.push(
      <FaStarHalfAlt
        key={floorRating}
        style={{ fontSize: size, color: color }}
      />
    );
  }
  const remaining = 5 - stars.length;
  for (let i = 0; i < remaining; i++) {
    stars.push(
      <FaRegStar
        key={i + floorRating}
        style={{ fontSize: size, color: color }}
      />
    );
  }
  return stars;
}

function calculateAvg(revs) {
  let result = 0;
  for (let i = 0; i < revs.length; i++) {
    result += revs[i].stars / revs.length;
  }
  return result;
}

export { getStars, calculateAvg };
