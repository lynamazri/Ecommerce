import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Line } from "react-chartjs-2";
import Chart from "chart.js/auto";
import { useGetCategoryQuery } from "../../redux/Slices/apiSlice";

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

import { useGetStoreFromUserQuery } from "../../redux/Slices/apiSlice";

function DashboardContent() {
  const [previousData, setPreviousData] = useState({});
  const [chartInstance, setChartInstance] = useState(null);

  var user = localStorage.getItem("user")
    ? JSON.parse(localStorage.getItem("user"))
    : null;

  const { data: storeData, isLoading } = useGetStoreFromUserQuery(user.userId);
  const [store, setStore] = useState({});

  useEffect(() => {
    if (storeData) {
      setStore(storeData);
    }
  }, [storeData, isLoading]);

  useEffect(() => {
    // Update the previous data when the component mounts
    setPreviousData(salesSummaryData);
  }, []);

  //temporary
  const mystore = localStorage.setItem("mystore", store.storeId);

  // Simulated data for the current sales summary
  const salesSummaryData = {
    totalRevenue: 1000,
    totalProductsSold: 50,
    averageOrderValue: 25,
    totalCustomers: 200,
    reviewsCount: 10,
    questionsCount: 5,
  };

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

  if (isLoading) {
    return <div>Loading...</div>;
  }
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
                <SwiperSlide>
                  <div className="summary-item">
                    <div>
                      <FaDollarSign className="icon" />
                      <h4>Total Revenue</h4>
                    </div>
                    <p>{salesSummaryData.totalRevenue}</p>
                  </div>
                </SwiperSlide>
                <SwiperSlide>
                  <div className="summary-item">
                    <div>
                      <FaShoppingCart className="icon" />
                      <h4>Total Products Sold</h4>
                    </div>
                    <p>{salesSummaryData.totalProductsSold}</p>
                  </div>
                </SwiperSlide>
                <SwiperSlide>
                  {" "}
                  <div className="summary-item">
                    <div>
                      <FaChartLine className="icon" />
                      <h4>Average Order Value</h4>
                    </div>
                    <p>{salesSummaryData.averageOrderValue}</p>
                  </div>
                </SwiperSlide>
                <SwiperSlide>
                  {" "}
                  <div className="summary-item">
                    <div>
                      <FaUser className="icon" />
                      <h4>Total Customers</h4>
                    </div>
                    <p>{salesSummaryData.totalCustomers}</p>
                  </div>
                </SwiperSlide>{" "}
                <SwiperSlide>
                  {" "}
                  <div className="summary-item">
                    <div>
                      <FaStar className="icon" />
                      <h4>Reviews</h4>
                    </div>
                    <p>{salesSummaryData.reviewsCount}</p>
                  </div>
                </SwiperSlide>
                <SwiperSlide>
                  {" "}
                  <div className="summary-item">
                    <div>
                      <FaQuestionCircle className="icon" />
                      <h4>Questions</h4>
                    </div>
                    <p>{salesSummaryData.questionsCount}</p>
                  </div>
                </SwiperSlide>{" "}
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
            <div className="store-info">
              <img src={storeData.banner.url} alt="Store Banner" />
              <h3>{store.name}</h3>
              <div className="information">
                <ul className="detail">
                  <li>Category:</li>
                  <li>Working Hours:</li>
                  <li>Phone :</li>
                  <li>Email:</li>
                </ul>
                <ul className="detail-value">
                  {store.mainCat && <li>{store.mainCat.name}</li>}
                  <li>{store.workingHours}</li>
                  <li>{store.phone}</li>
                  <li>{store.email}</li>
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
            <div className="header">
              <h4>Top Products</h4>
              <Link to={`/dashboard/products`}>
                All Products <MdKeyboardArrowRight />
              </Link>
            </div>

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
