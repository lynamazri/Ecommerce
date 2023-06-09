import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Line } from "react-chartjs-2";
import { useGetStoreFromUserQuery } from "../../redux/Slices/apiSlice";

import { Swiper, SwiperSlide } from "swiper/react";

import SwiperCore, { Navigation, A11y } from "swiper/core";
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

  var user = localStorage.getItem("user")
    ? JSON.parse(localStorage.getItem("user"))
    : null;

  const { data: storeData, isLoading } = useGetStoreFromUserQuery(user.userId);
  const [store, setStore] = useState();

  useEffect(() => {
    if (storeData) {
      setStore(storeData);
    }
  }, [storeData]);

  console.log(storeData);

  // Simulated data for the current sales summary
  const salesSummaryData = {
    totalRevenue: 1000,
    totalProductsSold: 50,
    averageOrderValue: 25,
    totalCustomers: 200,
    reviewsCount: 10,
    questionsCount: 5,
  };

  const [storeName, setStoreName] = useState(storeData.name);
  const [openingDate, setOpeningDate] = useState(storeData.openingDate);
  const [mainCategory, setMainCategory] = useState(storeData.catId);
  const [workingHours, setWorkingHours] = useState(storeData.workingHours);
  const [phoneNumber, setPhoneNumber] = useState(storeData.phone);
  const [email, setEmail] = useState(storeData.email);

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
    {
      id: 4,
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
  };
  return (
    <div className="dashboard-content-page dashboard--page">
      <div className="header">
        <h3>
          Hello, {user.firstName} {user.lastName}
        </h3>
        <p>
          Welcome to your dashboard! Stay organized and maximize your
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
              <div className="chart-container">
                <Line
                  width={600}
                  height={300}
                  data={salesPerMonthData}
                  options={chartOptions}
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
                  <li>Opening Date:</li>
                </ul>
                <ul className="detail-value">
                  <li>{mainCategory}</li>
                  <li>{workingHours}</li>
                  <li>{phoneNumber}</li>
                  <li>{email}</li>
                  <li>{openingDate}</li>
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
