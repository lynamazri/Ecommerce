import React, { useState, useEffect } from "react";
import { useGetUserOrdersQuery } from "../../redux/Slices/apiSlice";

function OrderHistory() {
  const [sortCriteria, setSortCriteria] = useState(null);
  const [filterStatus, setFilterStatus] = useState(null);

  var user = localStorage.getItem("user")
    ? JSON.parse(localStorage.getItem("user"))
    : null;

  const { data: orderData, isLoading } = useGetUserOrdersQuery(user.userId);
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    if (orderData) {
      setOrders(orderData);
    }
  }, [orderData, isLoading]);
  console.log(orderData);

  const cancelOrder = (orderId) => {
    const confirmed = window.confirm(
      "Are you sure you want to cancel this order?"
    );
    if (confirmed) {
      // Update the orders list to reflect the canceled order
      const updatedOrders = orders.map((order) => {
        if (order.id === orderId) {
          return { ...order, status: "Canceled" };
        }
        return order;
      });
      setOrders(updatedOrders);
    }
  };
  const sortOrders = (criteria) => {
    setSortCriteria(criteria);
  };

  const filterOrdersByStatus = (status) => {
    setFilterStatus(status);
  };

  // Apply sorting and filtering
  let sortedOrders = [...orders];
  if (sortCriteria) {
    sortedOrders.sort((a, b) => {
      if (a[sortCriteria] < b[sortCriteria]) return -1;
      if (a[sortCriteria] > b[sortCriteria]) return 1;
      return 0;
    });
  }
  if (filterStatus) {
    sortedOrders = sortedOrders.filter(
      (order) => order.status === filterStatus
    );
  }

  return (
    <div className="right-container">
      <div className="order-history-page">
        <div className="header">
          <h3>Order history</h3>
          <p>
            Discover your past orders, their comprehensive information, and
            easily manage order statuses.
          </p>

          <div className="filter-sort">
            <div className="sort">
              <label htmlFor="sort">Sort by:</label>
              <select
                id="sort"
                onChange={(e) => sortOrders(e.target.value)}
                value={sortCriteria || ""}
              >
                <option value="">None</option>
                <option value="id">Order Number</option>
                <option value="date">Order Date</option>
                <option value="status">Order Status</option>
              </select>
            </div>
            <div className="filter">
              <label htmlFor="filter">Filter by status:</label>
              <select
                id="filter"
                onChange={(e) => filterOrdersByStatus(e.target.value)}
                value={filterStatus || ""}
              >
                <option value="">All</option>
                <option value="Pending">Pending</option>
                <option value="Delivered">Delivered</option>
                <option value="Canceled">Canceled</option>
              </select>
            </div>
          </div>
        </div>

        <div className="body">
          {sortedOrders.length === 0 ? (
            <p>No orders match the selected criteria.</p>
          ) : (
            <div className="order-cards">
              {sortedOrders &&
                sortedOrders.map((order) => (
                  <div key={order.id} className="order-card">
                    <h3>Order #{order.id}</h3>
                    <p>Date: {order.date}</p>
                    <p>Status: {order.status}</p>
                    <ul>
                      {order.products &&
                        order.products.map((product) => (
                          <li key={product.id}>
                            {product.name} - {product.price}
                          </li>
                        ))}
                    </ul>
                    {order.status === "Pending" && (
                      <button onClick={() => cancelOrder(order.id)}>
                        Cancel Order
                      </button>
                    )}
                  </div>
                ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default OrderHistory;

/*

import React, { useState, useEffect } from "react";
import axios from "axios";

function OrderHistory() {
  const [orders, setOrders] = useState([]);
  const [filteredOrders, setFilteredOrders] = useState([]);
  const [sortOption, setSortOption] = useState("default");

  useEffect(() => {
    // Fetch the user's orders
    fetchUserOrders();
  }, []);

//   useEffect(() => {
//   const fetchOrderHistory = async () => {
//     try {
//       const response = await axios.get("/api/orders");
//       setOrders(response.data);
//     } catch (error) {
//       console.log(error);
//     }
//   };

//   fetchOrderHistory();
// }, []);


  useEffect(() => {
    // Apply filter and sort when orders or sort option change
    applyFilterAndSort();
  }, [orders, sortOption]);

  const fetchUserOrders = async () => {
    try {
      const response = await axios.get("/api/user/orders"); // Adjust the URL if needed
      const { data } = response;
      setOrders(data);
    } catch (error) {
      console.error("Error fetching user orders:", error);
      // Handle error case
    }
  };

  const cancelOrder = async (orderId) => {
    try {
      const response = await axios.put(`/api/orders/${orderId}/cancel`); // Adjust the URL if needed
      // Update the orders list to reflect the canceled order
      const updatedOrders = orders.map((order) => {
        if (order.id === orderId) {
          return { ...order, status: "Canceled" };
        }
        return order;
      });
      setOrders(updatedOrders);
    } catch (error) {
      console.error("Error canceling order:", error);
      // Handle error case
    }
  };

  const applyFilterAndSort = () => {
    // Filter orders based on status
    let filtered = [...orders];
    filtered = filtered.filter((order) => {
      if (sortOption === "pending") {
        return order.status === "Pending";
      } else if (sortOption === "delivered") {
        return order.status === "Delivered";
      }
      return true; // Display all orders for the default option
    });

    // Sort orders based on selected option
    if (sortOption === "dateAsc") {
      filtered.sort((a, b) => new Date(a.date) - new Date(b.date));
    } else if (sortOption === "dateDesc") {
      filtered.sort((a, b) => new Date(b.date) - new Date(a.date));
    }

    setFilteredOrders(filtered);
  };

  const handleSortChange = (event) => {
    setSortOption(event.target.value);
  };

  return (
    <div className="right-container">
      <div className="order-history-page">
        <div className="header">
          <h3>Order history</h3>
          <p></p>
          <select value={sortOption} onChange={handleSortChange}>
            <option value="default">Sort by</option>
            <option value="dateAsc">Date (Oldest first)</option>
            <option value="dateDesc">Date (Newest first)</option>
            <option value="pending">Pending Orders</option>
            <option value="delivered">Delivered Orders</option>
          </select>
        </div>

        <div className="body">
          {filteredOrders.length === 0 ? (
            <p>No orders matching the selected criteria.</p>
          ) : (
            <div className="order-cards">
              {filteredOrders.map((order) => (
                <div key={order.id} className="order-card">
                  <h3>Order #{order.id}</h3>
                  <p>Status: {order.status}</p>
                  <ul>
                    {order.products.map((product) => (
                      <li key={product.id}>
                        {product.name} - {product.price}
                      </li>
                    ))}
                  </ul>
                  {order.status === "Pending" && (
                    <button onClick={() => cancelOrder(order.id)}>
                      Cancel Order
                    </button>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default OrderHistory;
*/
