import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Line } from "react-chartjs-2";

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

import Chart from "chart.js/auto";

function DashboardContent() {
  const [previousData, setPreviousData] = useState({});
  const [chartInstance, setChartInstance] = useState(null);

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

  const salesPerMonthData = {
    labels: ["January", "February", "March", "April", "May", "June"],
    datasets: [
      {
        label: "Sales per Month",
        data: [100, 200, 150, 300, 250, 400],
        backgroundColor: "rgba(54, 162, 235, 0.5)",
        borderColor: "rgba(54, 162, 235, 1)",
        borderWidth: 1,
        fill: "origin",
        tension: 0.4,
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
        fill: "origin",
        tension: 0.4,
      },
    ],
  };

  useEffect(() => {
    // Destroy the previous chart instance when the component unmounts
    return () => {
      if (chartInstance) {
        chartInstance.destroy();
      }
    };
  }, [chartInstance]);

  const renderChart = () => {
    if (chartInstance) {
      chartInstance.destroy();
    }

    const newChartInstance = new Chart(document.getElementById("chartCanvas"), {
      type: "line",
      data: salesPerMonthData,
      options: {
        // Chart options...
      },
    });

    setChartInstance(newChartInstance);
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
                <Line
                  width={400}
                  height={300}
                  data={salesPerMonthData}
                  options={{
                    responsive: true,
                    plugins: {
                      title: {
                        display: true,
                        text: "Sales per Month - Cubic interpolation mode",
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
                  }}
                />
              </div>
              <div className="chart-container">
                <h4>Revenue per Month</h4>
                <Line
                  width={400}
                  height={300}
                  data={revenuePerMonthData}
                  options={{
                    responsive: true,
                    plugins: {
                      title: {
                        display: true,
                        text: "Revenue per Month - Cubic interpolation mode",
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
                  }}
                />
              </div>
            </div>
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
                <FaEdit className="edit-icon" />
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

export default DashboardContent;
