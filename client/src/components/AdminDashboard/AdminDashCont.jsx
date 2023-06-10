import React from "react";
import { Link } from "react-router-dom";
import { Line } from "react-chartjs-2";
import Chart from "chart.js/auto";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, A11y } from "swiper/core";
import "swiper/css/bundle";

import {
  FaDollarSign,
  FaShoppingCart,
  FaChartLine,
  FaUser,
  FaStar,
  FaQuestionCircle,
  FaEdit,
} from "react-icons/fa";
import { MdKeyboardArrowRight } from "react-icons/md";

function AdminDashboardContent() {
  const salesSummaryData = {
    numberOfUsers: 1000, // Number of users
    numberOfStores: 20, // Number of stores
    numberOfProducts: 300, // Number of products
    numberOfOrders: 150, // Number of orders
    numberOfComplaints: 8, // Number of complaints
    numberOfReports: 5, // Number of reports
  };
  const topStoresData = [
    {
      id: 1,
      storeName: "Store A",
      totalRevenue: 500,
      totalProductsSold: 50,
      averageRating: 4.5,
    },
    {
      id: 2,
      storeName: "Store B",
      totalRevenue: 300,
      totalProductsSold: 30,
      averageRating: 4.0,
    },
    {
      id: 3,
      storeName: "Store C",
      totalRevenue: 200,
      totalProductsSold: 20,
      averageRating: 3.8,
    },
    {
      id: 3,
      storeName: "Store C",
      totalRevenue: 200,
      totalProductsSold: 20,
      averageRating: 3.8,
    },
    {
      id: 3,
      storeName: "Store C",
      totalRevenue: 200,
      totalProductsSold: 20,
      averageRating: 3.8,
    },
    {
      id: 3,
      storeName: "Store C",
      totalRevenue: 200,
      totalProductsSold: 20,
      averageRating: 3.8,
    },
  ];

  const productMetricsData = [
    {
      id: 1,
      name: "Product A",
      views: 100,
      purchases: 50,
      reviews: 10,
      rating: 4.5,
      price: 20,
    },
    {
      id: 2,
      name: "Product B",
      views: 80,
      purchases: 30,
      reviews: 5,
      rating: 3.8,
      price: 15,
    },
    {
      id: 3,
      name: "Product C",
      views: 120,
      purchases: 40,
      reviews: 8,
      rating: 4.2,
      price: 25,
    },
    {
      id: 4,
      name: "Product D",
      views: 120,
      purchases: 40,
      reviews: 8,
      rating: 4.2,
      price: 25,
    },
  ];

  const salesPerMonthData = {
    labels: ["January", "February", "March", "April", "May", "June"],
    datasets: [
      {
        label: "Sales per Month",
        data: [100, 200, 300, 100, 1000],
        backgroundColor: "rgba(54, 162, 235, 0.5)",
        borderColor: "rgba(54, 162, 235, 1)",
        borderWidth: 1,
        fill: "origin",
        tension: 0.4,
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    plugins: {
      title: {
        display: true,
        text: "Sales per Month",
      },
    },
    interaction: {
      intersect: false,
    },
    scales: {
      x: {
        display: true,
        title: {
          display: true,
        },
      },
      y: {
        display: true,
        title: {
          display: true,
          text: "Value",
        },
        suggestedMin: 0,
      },
    },
    cubicInterpolationMode: "monotone",
  };

  return (
    <div className="admin-content-page dashboard--page">
      <div className="header">
        <h3>Hello, Admin</h3>
        <p>
          Welcome to the admin dashboard! Stay organized and maximize your
          productivity.
        </p>
      </div>

      <div className="main">
        <h3>Dashboard Overview</h3>

        {/* Sales Summary */}
        <div className="top">
          <div className="left">
            <div className="sales-summary">
              <Swiper
                modules={[Navigation, A11y]}
                navigation
                spaceBetween={15}
                slidesPerView={3}
              >
                <SwiperSlide>
                  <div className="summary-item">
                    <div>
                      <FaUser className="icon" />
                      <h4>Number of Users</h4>
                    </div>
                    <p>{salesSummaryData.numberOfUsers}</p>
                  </div>
                </SwiperSlide>
                <SwiperSlide>
                  <div className="summary-item">
                    <div>
                      <FaShoppingCart className="icon" />
                      <h4>Number of Stores</h4>
                    </div>
                    <p>{salesSummaryData.numberOfStores}</p>
                  </div>
                </SwiperSlide>
                <SwiperSlide>
                  <div className="summary-item">
                    <div>
                      <FaChartLine className="icon" />
                      <h4>Number of Products</h4>
                    </div>
                    <p>{salesSummaryData.numberOfProducts}</p>
                  </div>
                </SwiperSlide>
                <SwiperSlide>
                  <div className="summary-item">
                    <div>
                      <FaShoppingCart className="icon" />
                      <h4>Number of Orders</h4>
                    </div>
                    <p>{salesSummaryData.numberOfOrders}</p>
                  </div>
                </SwiperSlide>
                <SwiperSlide>
                  <div className="summary-item">
                    <div>
                      <FaQuestionCircle className="icon" />
                      <h4>Number of Complaints</h4>
                    </div>
                    <p>{salesSummaryData.numberOfComplaints}</p>
                  </div>
                </SwiperSlide>
                <SwiperSlide>
                  <div className="summary-item">
                    <div>
                      <FaQuestionCircle className="icon" />
                      <h4>Number of Reports</h4>
                    </div>
                    <p>{salesSummaryData.numberOfReports}</p>
                  </div>
                </SwiperSlide>
              </Swiper>
            </div>
            <div className="sales-analytics">
              <div className="chart-container">
                <Line
                  width={600}
                  height={270}
                  data={salesPerMonthData}
                  options={chartOptions}
                />
              </div>
            </div>
          </div>
          <div className="right">
            <div className="top-shops">
              <div className="header">
                <h4>Top Shops</h4>
                <Link to={`/admin/shops`}>
                  More Shop <MdKeyboardArrowRight />
                </Link>
              </div>
              {topStoresData.map((store) => (
                <div className="topshops-card">
                  <div className="left">
                    <img src="" alt="banner" />
                    <h5>{store.storeName}</h5>
                  </div>
                  <div className="right">
                    <h6>Solds:{store.totalProductsSold}</h6>
                    <h6>Rating:{store.averageRating}</h6>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="lower">
          <div className="top-products product-metrics">
            <h4>Top Products</h4>

            <table>
              <thead>
                <tr>
                  <th id="th1">Product Name</th>
                  <th>Rating</th>
                  <th>Reviews</th>
                  <th>Views</th>
                  <th>Purchases</th>
                  <th id="th2">Income</th>
                </tr>
              </thead>
              <tbody>
                {productMetricsData.map((product) => (
                  <tr key={product.id}>
                    <td>{product.name}</td>
                    <td>{product.rating}</td>
                    <td>{product.reviews}</td>
                    <td>{product.views}</td>
                    <td>{product.purchases}</td>
                    <td>{product.purchases * product.price}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AdminDashboardContent;
