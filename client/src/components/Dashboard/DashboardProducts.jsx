import React, { useState } from "react";

function ProductTable({ onEditProduct }) {
  const products = [
    {
      id: 1,
      name: "Product 1",
      price: 10.99,
      category: "Category 1",
      quantity: 5,
      discount: 0,
      isVerified: true,
    },
    // Other products
  ];

  return (
    <table>
      <thead>
        <tr>
          <th>ID</th>
          <th>Name</th>
          <th>Price</th>
          <th>Category</th>
          <th>Quantity</th>
          <th>Discount</th>
          <th>Verified</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        {products.map((product) => (
          <tr key={product.id}>
            <td>{product.id}</td>
            <td>{product.name}</td>
            <td>{product.price}</td>
            <td>{product.category}</td>
            <td>{product.quantity}</td>
            <td>{product.discount}</td>
            <td>{product.isVerified ? "Yes" : "No"}</td>
            <td>
              <button onClick={() => onEditProduct(product)}>Edit</button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

function ProductForm({ product, onSubmit }) {
  const [name, setName] = useState(product ? product.name : "");
  const [description, setDescription] = useState(
    product ? product.description : ""
  );
  const [category, setCategory] = useState(product ? product.category : "");
  const [price, setPrice] = useState(product ? product.price : "");
  const [quantity, setQuantity] = useState(product ? product.quantity : "");

  const handleSubmit = (event) => {
    event.preventDefault();
    const formData = {
      name,
      description,
      category,
      price,
      quantity,
    };
    onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit}>
      <label htmlFor="name">Name:</label>
      <input
        type="text"
        id="name"
        name="name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />

      <label htmlFor="description">Description:</label>
      <textarea
        id="description"
        name="description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />

      <label htmlFor="category">Category:</label>
      <input
        type="text"
        id="category"
        name="category"
        value={category}
        onChange={(e) => setCategory(e.target.value)}
      />

      <label htmlFor="price">Price:</label>
      <input
        type="number"
        id="price"
        name="price"
        value={price}
        onChange={(e) => setPrice(e.target.value)}
      />

      <label htmlFor="quantity">Quantity:</label>
      <input
        type="number"
        id="quantity"
        name="quantity"
        value={quantity}
        onChange={(e) => setQuantity(e.target.value)}
      />

      <button type="submit">{product ? "Edit" : "Add"} Product</button>
    </form>
  );
}

function DashboardProducts() {
  const [isFormVisible, setIsFormVisible] = useState(false);
  const [editedProduct, setEditedProduct] = useState(null);

  const handleEditProduct = (product) => {
    setEditedProduct(product);
    setIsFormVisible(true);
  };

  const handleAddProduct = () => {
    setEditedProduct(null);
    setIsFormVisible(true);
  };

  const handleFormSubmit = (formData) => {
    // Handle form submission
    console.log("Form submitted with data:", formData);

    // Hide the form
    setIsFormVisible(false);
  };

  return (
    <div className="dashboard-products-page dashboard--page">
      <div className="header">
        <h3>Hello Tassy Omah,</h3>
        <p>
          Welcome to your dashboard! Stay organized and maximize your
          productivity.
        </p>
      </div>
      <div className="main">
        {isFormVisible ? (
          <ProductForm product={editedProduct} onSubmit={handleFormSubmit} />
        ) : (
          <>
            <h3>Products</h3>
            <button onClick={handleAddProduct}>Add Product</button>
            <ProductTable onEditProduct={handleEditProduct} />
          </>
        )}
      </div>
    </div>
  );
}

export default DashboardProducts;
