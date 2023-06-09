import React, { useState } from "react";

function Orders() {
  var user = localStorage.getItem("user")
    ? JSON.parse(localStorage.getItem("user"))
    : null;

  const [orderItems, setOrderItems] = useState([
    {
      id: 1,
      customerName: "John Doe",
      orderId: "ORD-001",
      date: "2023-05-30",
      status: "Pending",
      productName: "Product 1",
      quantity: 2,
      price: 10.99,
    },
    {
      id: 2,
      customerName: "Jane Smith",
      orderId: "ORD-002",
      date: "2023-05-29",
      status: "Processing",
      productName: "Product 2",
      quantity: 2,
      price: 10.99,
    },
    {
      id: 3,
      customerName: "Bob Johnson",
      orderId: "ORD-003",
      date: "2023-05-28",
      status: "Shipped",
      productName: "Product 1",
      quantity: 2,
      price: 10.99,
    },
    {
      id: 4,
      customerName: "Alice Williams",
      orderId: "ORD-004",
      date: "2023-05-27",
      status: "Completed",
      productName: "Product 1",
      quantity: 2,
      price: 10.99,
    },
    {
      id: 5,
      customerName: "Eve Davis",
      orderId: "ORD-005",
      date: "2023-05-26",
      status: "Returned",
      productName: "Product 1",
      quantity: 2,
      price: 10.99,
    },
    {
      id: 4,
      customerName: "Alice Williams",
      orderId: "ORD-004",
      date: "2023-05-27",
      status: "Completed",
      productName: "Product 1",
      quantity: 2,
      price: 10.99,
    },
    {
      id: 5,
      customerName: "Eve Davis",
      orderId: "ORD-005",
      date: "2023-05-26",
      status: "Returned",
      productName: "Product 1",
      quantity: 2,
      price: 10.99,
    },
  ]);

  const [filterStatus, setFilterStatus] = useState("");
  const [sortingOption, setSortingOption] = useState("");

  const handleStatusFilterChange = (event) => {
    setFilterStatus(event.target.value);
  };

  const handleSortingOptionChange = (event) => {
    setSortingOption(event.target.value);
  };

  const filterAndSortOrders = () => {
    let filteredItems = orderItems;

    if (filterStatus) {
      filteredItems = filteredItems.filter(
        (item) => item.status === filterStatus
      );
    }

    switch (sortingOption) {
      case "orderIdAsc":
        filteredItems.sort((a, b) => a.orderId.localeCompare(b.orderId));
        break;
      case "orderIdDesc":
        filteredItems.sort((a, b) => b.orderId.localeCompare(a.orderId));
        break;
      case "dateAsc":
        filteredItems.sort((a, b) => a.date.localeCompare(b.date));
        break;
      case "dateDesc":
        filteredItems.sort((a, b) => b.date.localeCompare(a.date));
        break;
      default:
        // No sorting option selected
        break;
    }

    return filteredItems;
  };

  const filteredAndSortedItems = filterAndSortOrders();

  return (
    <div className="dashboard-orders-page dashboard--page">
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
            <label htmlFor="sorting-option">Sort by:</label>
            <select
              id="sorting-option"
              value={sortingOption}
              onChange={handleSortingOptionChange}
            >
              <option value="">None</option>
              <option value="orderIdAsc">Order ID (Ascending)</option>
              <option value="orderIdDesc">Order ID (Descending)</option>
              <option value="dateAsc">Date (Ascending)</option>
              <option value="dateDesc">Date (Descending)</option>
            </select>
          </div>
        </div>

        <div className="order-items">
          {filteredAndSortedItems.map((item) => (
            <div key={item.id} className="order-item">
              <div className="order-info">
                <p>Order ID: {item.orderId}</p>
                <p>Customer Name: {item.customerName}</p>
                <p>Order Date: {item.date}</p>
                <p>Status: {item.status}</p>
                <p>Product Name: {item.productName}</p>
                <p>Quantity: {item.quantity}</p>
                <p>Price: {item.price}</p>
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
