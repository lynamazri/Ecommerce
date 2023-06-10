import React, { useState, useEffect } from "react";
import { useGetStoreOrdersQuery } from "../../redux/Slices/apiSlice";

function Orders() {
  const [orderItems, setOrderItems] = useState([]);
  var user = localStorage.getItem("user")
    ? JSON.parse(localStorage.getItem("user"))
    : null;

  const { data: orderData, isLoading } = useGetStoreOrdersQuery(
    "3c0d9716-c949-42d2-a274-e93f5d0af4a5"
  );

  useEffect(() => {
    if (orderData) {
      setOrderItems(orderData);
    }
  }, [orderData]);

  console.log(orderItems);

  const [filterstate, setFilterstate] = useState("");
  const [sortingOption, setSortingOption] = useState("");

  const handlestateFilterChange = (event) => {
    setFilterstate(event.target.value);
  };

  const handleSortingOptionChange = (event) => {
    setSortingOption(event.target.value);
  };

  const filterAndSortOrders = () => {
    let filteredItems = orderItems;

    if (filterstate) {
      filteredItems = filteredItems.filter(
        (item) => item.state === filterstate
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
        filteredItems.sort((a, b) =>
          a.order.orderDate.localeCompare(b.order.orderDate)
        );
        break;
      case "dateDesc":
        filteredItems.sort((a, b) =>
          b.order.orderDate.localeCompare(a.order.orderDate)
        );
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
        <p>View and handle your customer's orders.</p>
      </div>
      <div className="main">
        <h3>Order items</h3>

        <div className="filters">
          <div className="filter">
            <label htmlFor="state-filter">Filter by state:</label>
            <select
              id="state-filter"
              value={filterstate}
              onChange={handlestateFilterChange}
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
                <p>
                  <strong>Order ID:</strong> {item.itemId}
                </p>
                <p>
                  <strong>Customer Name:</strong> {item.order.user.firstName}{" "}
                  {item.order.user.lastName}
                </p>
                <p>
                  <strong>Order Date:</strong>{" "}
                  {item.order.orderDate.slice(0, 10)}
                </p>
                <p>
                  <strong>state:</strong> {item.state}
                </p>
                <p>
                  <strong>Product Name:</strong> {item.product.name}
                </p>
                <p>
                  <strong>Quantity:</strong> {item.quantity}
                </p>
                <p>
                  <strong>Address:</strong> {item.order.address.street}{" "}
                  {item.order.address.city} {item.order.address.state}{" "}
                  {item.order.address.zip}
                </p>

                <select
                  value={item.state}
                  onChange={(event) => {
                    const updatedItems = orderItems.map((order) => {
                      if (order.id === item.id) {
                        return { ...order, state: event.target.value };
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
