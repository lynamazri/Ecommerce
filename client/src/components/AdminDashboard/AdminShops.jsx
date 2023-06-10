import React, { useState } from "react";
import { RiSearchLine } from "react-icons/ri";
import { AiOutlineDelete, AiOutlineCheckSquare } from "react-icons/ai";

function AdminShops() {
  // Initial shops
  const initialShops = [
    {
      id: 1,
      name: "Shop 1",
      category: "Category 1",
      email: "shop1@example.com",
      phone: "1234567890",
      ownerName: "Owner 1",
      status: "Approved",
    },
    {
      id: 2,
      name: "Shop 2",
      category: "Category 2",
      email: "shop2@example.com",
      phone: "9876543210",
      ownerName: "Owner 2",
      status: "Pending",
    },
    // Add more shop objects as needed
  ];

  const [shops, setShops] = useState(initialShops);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState("");

  // Function to handle shop deletion
  const handleDeleteShop = (shopId) => {
    setShops((prevShops) => prevShops.filter((shop) => shop.id !== shopId));
  };

  // Function to handle shop approval
  const handleApproveShop = (shopId) => {
    setShops((prevShops) =>
      prevShops.map((shop) =>
        shop.id === shopId ? { ...shop, status: "Approved" } : shop
      )
    );
  };

  // Filter shops based on search term and status
  const filteredShops = shops.filter((shop) => {
    const matchesSearchTerm =
      shop.name && shop.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = filterStatus === "" || shop.status === filterStatus;
    return matchesSearchTerm && matchesStatus;
  });

  return (
    <div className="admin-shops-page dashboard--page">
      <div className="header">
        <h3>Hello, Admin </h3>
        <p>View shop information and manage shop accounts.</p>
      </div>
      <div className="main">
        <div className="upper">
          <h3>Shops List</h3>
          <div className="search-input">
            <input
              type="text"
              placeholder="Search by name"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <RiSearchLine size={18} />
          </div>
          <div className="filter">
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
            >
              <option value="">All</option>
              <option value="Approved">Approved</option>
              <option value="Pending">Pending</option>
            </select>
          </div>
        </div>
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Category</th>
              <th>Email</th>
              <th>Phone</th>
              <th>Owner's Name</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {filteredShops.map((shop) => (
              <tr key={shop.id}>
                <td>{shop.name}</td>
                <td>{shop.category}</td>
                <td>{shop.email}</td>
                <td>{shop.phone}</td>
                <td>{shop.ownerName}</td>
                <td>{shop.status}</td>
                <td id="action">
                  {shop.status === "Pending" && (
                    <button
                      className="icon-button"
                      onClick={() => handleApproveShop(shop.id)}
                    >
                      <AiOutlineCheckSquare size={18} />
                    </button>
                  )}

                  <button
                    className="icon-button"
                    onClick={() => handleDeleteShop(shop.id)}
                  >
                    <AiOutlineDelete size={18} color="red" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <p>Total Shops: {filteredShops.length}</p>
      </div>
    </div>
  );
}

export default AdminShops;
