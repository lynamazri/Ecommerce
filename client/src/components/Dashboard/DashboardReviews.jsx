import React, { useState, useEffect } from "react";
import { RiSearchLine } from "react-icons/ri";
import { AiOutlineDelete } from "react-icons/ai";
import { useGetReviewsQuery } from "../../redux/Slices/apiSlice";

function DashboardReviews() {
  const [reviewsData, setReviewsData] = useState([]);
  let mystore = localStorage.getItem("mystore");
  const { data: revsData, isLoading } = useGetReviewsQuery(mystore);

  useEffect(() => {
    if (revsData) {
      setReviewsData(revsData);
    }
  }, [revsData]);

  console.log(reviewsData);

  const [filterStars, setFilterStars] = useState(0);
  const [searchTerm, setSearchTerm] = useState("");

  const filteredReviews = reviewsData.filter(
    (review) =>
      (filterStars === 0 || review.reviews.stars === filterStars) &&
      review.reviews.content.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="admin-products-page admin--page dashboard--page">
      <div className="header">
        <h3>Hello, Admin </h3>
        <p>View product information and manage product listings.</p>
      </div>
      <div className="main">
        <div className="upper">
          <h3>Reviews List</h3>
          <div className="search-input">
            <input
              type="text"
              placeholder="Search by product name"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <RiSearchLine size={18} />
          </div>
          <div className="filter">
            <select
              value={filterStars}
              onChange={(e) => setFilterStars(Number(e.target.value))}
            >
              <option value={0}>All</option>
              <option value={1}>1 Star</option>
              <option value={2}>2 Stars</option>
              <option value={3}>3 Stars</option>
              <option value={4}>4 Stars</option>
              <option value={5}>5 Stars</option>
            </select>
          </div>
        </div>
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Username</th>
              <th>Product Name</th>
              <th>Content</th>
              <th>Stars</th>
              <th>Date</th>
            </tr>
          </thead>
          <tbody>
            {filteredReviews.map((review) => (
              <tr key={review.reviews.reviewId}>
                <td>{review.reviews.reviewId}</td>
                <td>{review.reviews.user.username}</td>
                <td>{review.reviews.product.name}</td>
                <td>{review.reviews.content}</td>
                <td>{review.reviews.stars}</td>
                <td>{review.reviews.posted.slice(0, 10)}</td>
              </tr>
            ))}
          </tbody>
        </table>
        <p>Total Number of Reviews: {filteredReviews.length}</p>
      </div>
    </div>
  );
}

export default DashboardReviews;
