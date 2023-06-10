import React, { useState } from "react";
import { RiSearchLine } from "react-icons/ri";
import { AiOutlineDelete } from "react-icons/ai";

function DashboardReviews() {
  const [reviewsData, setReviewsData] = useState([
    {
      reviewId: 1,
      username: "JohnDoe",
      productName: "Product A",
      content: "Great product!",
      stars: 4,
      date: "2023-06-05",
    },
    {
      reviewId: 2,
      username: "JaneSmith",
      productName: "Product B",
      content: "Amazing product!",
      stars: 5,
      date: "2023-06-05",
    },
    // Add more review objects as needed
  ]);

  const [filterStars, setFilterStars] = useState(0);
  const [searchTerm, setSearchTerm] = useState("");

  const filteredReviews = reviewsData.filter(
    (review) =>
      (filterStars === 0 || review.stars === filterStars) &&
      review.productName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleDeleteReview = (reviewId) => {
    setReviewsData((prevReviews) =>
      prevReviews.filter((review) => review.reviewId !== reviewId)
    );
  };

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
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {filteredReviews.map((review) => (
              <tr key={review.reviewId}>
                <td>{review.reviewId}</td>
                <td>{review.username}</td>
                <td>{review.productName}</td>
                <td>{review.content}</td>
                <td>{review.stars}</td>
                <td>{review.date}</td>
                <td id="action">
                  <button
                    className="icon-button"
                    onClick={() => handleDeleteReview(review.reviewId)}
                  >
                    <AiOutlineDelete size={18} color="red" />
                  </button>
                </td>
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
