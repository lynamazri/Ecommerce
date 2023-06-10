import React, { useState } from "react";
import { RiSearchLine } from "react-icons/ri";
import { AiOutlineCheckSquare, AiOutlineDelete } from "react-icons/ai";

function AdminProducts() {
  // Initial products
  const initialProducts = [
    {
      id: 1,
      name: "Product 1",
      category: "Category 1",
      storeName: "Store 1",
      price: 10.99,
      status: "Approved",
      quantity: 5,
    },
    {
      id: 2,
      name: "Product 2",
      category: "Category 2",
      storeName: "Store 2",
      price: 19.99,
      status: "Pending",
      quantity: 10,
    },
    // Add more product objects as needed
  ];

  const [products, setProducts] = useState(initialProducts);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState("");

  // Function to handle product deletion
  const handleDeleteProduct = (productId) => {
    setProducts((prevProducts) =>
      prevProducts.filter((product) => product.id !== productId)
    );
  };

  // Function to handle product approval
  const handleApproveProduct = (productId) => {
    setProducts((prevProducts) =>
      prevProducts.map((product) =>
        product.id === productId ? { ...product, status: "Approved" } : product
      )
    );
  };

  // Filter products based on search term and status
  const filteredProducts = products.filter((product) => {
    const matchesSearchTerm =
      product.name &&
      product.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus =
      filterStatus === "" || product.status === filterStatus;
    return matchesSearchTerm && matchesStatus;
  });

  return (
    <div className="admin-products-page admin--page dashboard--page">
      <div className="header">
        <h3>Hello, Admin </h3>
        <p>View product information and manage product listings.</p>
      </div>
      <div className="main">
        <div className="upper">
          <h3>Products List</h3>
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
              <th>ID</th>
              <th>Name</th>
              <th>Category</th>
              <th>Store Name</th>
              <th>Price</th>
              <th>Quantity</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {filteredProducts.map((product) => (
              <tr key={product.id}>
                <td>{product.id}</td>
                <td>{product.name}</td>
                <td>{product.category}</td>
                <td>{product.storeName}</td>
                <td>{product.price}</td>
                <td>{product.quantity}</td>
                <td>{product.status}</td>
                <td id="action">
                  {product.status === "Pending" && (
                    <button
                      className="icon-button"
                      onClick={() => handleApproveProduct(product.id)}
                    >
                      <AiOutlineCheckSquare size={18} />
                    </button>
                  )}
                  <button
                    className="icon-button"
                    onClick={() => handleDeleteProduct(product.id)}
                  >
                    <AiOutlineDelete size={18} color="red" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <p>Total Products: {filteredProducts.length}</p>
      </div>
    </div>
  );
}

export default AdminProducts;
