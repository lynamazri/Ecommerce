import React, { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import "chart.js";
import { Bar } from "react-chartjs-2";
import Chart from "chart.js/auto";
import "chartjs-adapter-moment";
import "chartjs-adapter-date-fns";
import "chartjs-adapter-luxon";
import "chartjs-adapter-moment-timezone";

import { Swiper, SwiperSlide } from "swiper/react";
import SwiperCore, { A11y } from "swiper/core";
import "swiper/css/bundle";

import {
  FaDollarSign,
  FaShoppingCart,
  FaChartLine,
  FaUser,
  FaStar,
  FaQuestionCircle,
  FaArrowUp,
  FaArrowDown,
  FaEdit,
} from "react-icons/fa";

function DashboardContent() {
  const [previousData, setPreviousData] = useState({});

  // Simulated data for the current sales summary
  const salesSummaryData = {
    totalRevenue: 1000,
    totalProductsSold: 50,
    averageOrderValue: 25,
    totalCustomers: 200,
    reviewsCount: 10,
    questionsCount: 5,
  };

  const [storeName, setStoreName] = useState("My Store");
  const [mainCategory, setMainCategory] = useState("Electronics");
  const [workingHours, setWorkingHours] = useState("9 AM - 6 PM");
  const [phoneNumber, setPhoneNumber] = useState("xxx-xxx-xxxx");
  const [email, setEmail] = useState("example@store.com");

  useEffect(() => {
    // Update the previous data when the component mounts
    setPreviousData(salesSummaryData);
  }, []);

  function getIcon(key, currentValue, previousValue) {
    if (currentValue > previousValue) {
      return <FaArrowUp className="trend-icon positive" />;
    } else if (currentValue < previousValue) {
      return <FaArrowDown className="trend-icon negative" />;
    } else {
      return null;
    }
  }

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
  ];

  const chartRef = useRef(null);

  useEffect(() => {
    // Destroy the previous chart instance before rendering a new one
    if (chartRef.current) {
      chartRef.current.chartInstance.destroy();
    }
  }, []);

  const salesPerMonthData = {
    labels: ["January", "February", "March", "April", "May", "June"],
    datasets: [
      {
        label: "Sales per Month",
        data: [100, 200, 150, 300, 250, 400],
        backgroundColor: "rgba(54, 162, 235, 0.5)",
        borderColor: "rgba(54, 162, 235, 1)",
        borderWidth: 1,
      },
    ],
  };

  const revenuePerMonthData = {
    labels: ["January", "February", "March", "April", "May", "June"],
    datasets: [
      {
        label: "Revenue per Month",
        data: [5000, 7000, 6000, 8000, 7500, 9000],
        backgroundColor: "rgba(75, 192, 192, 0.5)",
        borderColor: "rgba(75, 192, 192, 1)",
        borderWidth: 1,
      },
    ],
  };

  const chartOptions = {
    scales: {
      y: {
        beginAtZero: true,
      },
    },
  };

  return (
    <div className="dashboard-content-page">
      <div className="header">
        <h3>Hello Tassy Omah,</h3>
        <p>
          Welcome to your dashboard! Stay organized and maximize your
          productivity.
        </p>
      </div>

      <h3>Dashboard Overview</h3>
      <div className="main">
        {/* Sales Summary */}
        <div className="top">
          <div className="left">
            <div className="sales-summary">
              <h3>Sales Summary</h3>
              <Swiper modules={[A11y]} spaceBetween={15} slidesPerView={3}>
                {Object.entries(salesSummaryData).map(([key, value]) => (
                  <SwiperSlide key={key}>
                    <div className="summary-item">
                      <h4>{key.charAt(0).toUpperCase() + key.slice(1)}</h4>
                      <p>{value}</p>
                      {getIcon(key, value, previousData[key])}
                    </div>
                  </SwiperSlide>
                ))}
              </Swiper>
            </div>
            <div className="sales-analytics">
              <h3>Sales Analytics</h3>
              <div className="chart-container">
                <h4>Sales per Month</h4>
                <Bar ref={chartRef} data={salesPerMonthData} />
              </div>
              <div className="chart-container">
                <h4>Revenue per Month</h4>
                <Bar ref={chartRef} data={revenuePerMonthData} />
              </div>
            </div>{" "}
          </div>

          <div className="right">
            <div className="store-info">
              <img src="path_to_banner_image" alt="Store Banner" />
              <h3>{storeName}</h3>
              <div className="information">
                <ul className="detail">
                  <li>Main Category:</li>
                  <li>Working Hours:</li>
                  <li>Phone Number:</li>
                  <li>Email:</li>
                </ul>
                <ul className="detail-value">
                  <li>{mainCategory}</li>
                  <li>{workingHours}</li>
                  <li>{phoneNumber}</li>
                  <li>{email}</li>
                </ul>
              </div>
              <Link to="/dashboard/settings">
                <FaEdit />
                Edit Store Info
              </Link>
            </div>
          </div>
        </div>

        <div className="lower">
          <div className="product-metrics">
            <h3>Product Metrics</h3>
            <table>
              <thead>
                <tr>
                  <th>Product Name</th>
                  <th>Rating</th>
                  <th>Reviews</th>
                  <th>Views</th>
                  <th>Purchases</th>
                  <th>Income</th>
                </tr>
              </thead>
              <tbody>
                {productMetricsData.map((product) => (
                  <tr key={product.id}>
                    <td>{product.rating}</td>
                    <td>{product.reviews}</td>
                    <td>{product.name}</td>
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

export default DashboardContent;
