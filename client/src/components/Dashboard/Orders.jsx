import React, { useState } from "react";

function Orders() {
  const [orderItems, setOrderItems] = useState([
    {
      id: 1,
      customerName: "John Doe",
      orderId: "ORD-001",
      date: "2023-05-30",
      status: "Pending",
    },
    {
      id: 2,
      customerName: "Jane Smith",
      orderId: "ORD-002",
      date: "2023-05-29",
      status: "Processing",
    },
    {
      id: 3,
      customerName: "Bob Johnson",
      orderId: "ORD-003",
      date: "2023-05-28",
      status: "Shipped",
    },
    {
      id: 4,
      customerName: "Alice Williams",
      orderId: "ORD-004",
      date: "2023-05-27",
      status: "Completed",
    },
    {
      id: 5,
      customerName: "Eve Davis",
      orderId: "ORD-005",
      date: "2023-05-26",
      status: "Returned",
    },
  ]);

  const [filterStatus, setFilterStatus] = useState("");
  const [filterDateRange, setFilterDateRange] = useState("");

  const handleStatusFilterChange = (event) => {
    setFilterStatus(event.target.value);
  };

  const handleDateRangeFilterChange = (event) => {
    setFilterDateRange(event.target.value);
  };

  const filterOrders = () => {
    let filteredItems = orderItems;

    if (filterStatus) {
      filteredItems = filteredItems.filter(
        (item) => item.status === filterStatus
      );
    }

    if (filterDateRange) {
      const currentDate = new Date();
      const dateRange = parseInt(filterDateRange);

      filteredItems = filteredItems.filter((item) => {
        const orderDate = new Date(item.date);
        const differenceInDays =
          (currentDate - orderDate) / (1000 * 60 * 60 * 24);
        return differenceInDays <= dateRange;
      });
    }

    return filteredItems;
  };

  const filteredItems = filterOrders();

  return (
    <div className="dashboard-orders-page dashboard--page">
      <div className="header">
        <h3>Hello Tassy Omah,</h3>
        <p>
          Welcome to your dashboard! Stay organized and maximize your
          productivity.
        </p>
      </div>
      <div className="main">
        <h3>Order items</h3>

        <div className="filters">
          <div className="filter">
            <label htmlFor="status-filter">Filter by Status:</label>
            <select
              id="status-filter"
              value={filterStatus}
              onChange={handleStatusFilterChange}
            >
              <option value="">All</option>
              <option value="Pending">Pending</option>
              <option value="Processing">Processing</option>
              <option value="Shipped">Shipped</option>
              <option value="Completed">Completed</option>
              <option value="Returned">Returned</option>
            </select>
          </div>
          <div className="filter">
            <label htmlFor="date-range-filter">
              Filter by Date Range (in days):
            </label>
            <select
              id="date-range-filter"
              value={filterDateRange}
              onChange={handleDateRangeFilterChange}
            >
              <option value="">All</option>
              <option value="1">1 day</option>
              <option value="7">7 days</option>
              <option value="30">30 days</option>
              <option value="90">90 days</option>
            </select>
          </div>
        </div>

        <div className="order-items">
          {filteredItems.map((item) => (
            <div key={item.id} className="order-item">
              <div className="order-info">
                <p>Order ID: {item.orderId}</p>
                <p>Customer Name: {item.customerName}</p>
                <p>Order Date: {item.date}</p>
                <p>Status: {item.status}</p>
                <select
                  value={item.status}
                  onChange={(event) => {
                    const updatedItems = orderItems.map((order) => {
                      if (order.id === item.id) {
                        return { ...order, status: event.target.value };
                      }
                      return order;
                    });
                    setOrderItems(updatedItems);
                  }}
                >
                  <option value="Pending">Pending</option>
                  <option value="Processing">Processing</option>
                  <option value="Shipped">Shipped</option>
                  <option value="Completed">Completed</option>
                  <option value="Returned">Returned</option>
                </select>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Orders;
