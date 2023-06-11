import React, { useState, useEffect } from "react";
import {
  useGetProductsFromStoreQuery,
  useUpdateProductMutation,
  useCreateProductMutation,
} from "../../redux/Slices/apiSlice";
import { AiOutlineEdit } from "react-icons/ai";

function EditProductForm({ product, onSubmit }) {
  const [updateProduct, { isLoading: updateProductLoading, error }] =
    useUpdateProductMutation();
  const [formData, setFormData] = useState({
    name: product.name,
    price: product.price,
    description: product.description,
    subCat: product.subCat,
    discount: product.discount ? product.discount.percentage : "",
    quantity: product.quantity,
    // Add other form fields here...
  });

  const handleChange = (event) => {
    setFormData((prevData) => ({
      ...prevData,
      [event.target.name]: event.target.value,
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    updateProduct({ ...product, ...formData })
      .unwrap()
      .then((data) => {
        console.log("Product updated:", data);
        onSubmit(data);
      })
      .catch((error) => {
        console.error("Error updating product:", error);
      });
  };

  return (
    <form className="product-form" onSubmit={handleSubmit}>
      <div className="input-container">
        <label htmlFor="name">Name:</label>
        <input
          type="text"
          id="name"
          name="name"
          placeholder="Enter product name"
          value={formData.name}
          onChange={handleChange}
        />
      </div>
      <div className="input-container">
        <label htmlFor="description">Description:</label>
        <textarea
          id="description"
          name="description"
          placeholder="Enter product description"
          value={formData.description}
          onChange={handleChange}
        />
      </div>
      <div className="input-container">
        <label htmlFor="subCat">Category:</label>
        <select
          id="subCat"
          name="subCat"
          placeholder="Enter product category"
          value={formData.subCat}
          required
          onChange={handleChange}
        >
          <option value="">Choose an option</option>
          <option value="Electronics">Electronics</option>
          <option value="Clothing and Fashion">Clothing and Fashion</option>
          <option value="Health and Beauty">Health and Beauty</option>
          <option value="Home">Home</option>
          <option value="Sports">Sports</option>
          <option value="Books and Media">Books and Media</option>
          <option value="Toys and Games">Toys and Games</option>
        </select>
      </div>
      <div className="input-container">
        <label htmlFor="price">Price:</label>
        <input
          type="number"
          id="price"
          name="price"
          min="0"
          placeholder="Enter product price"
          value={formData.price}
          onChange={handleChange}
        />
      </div>
      <div className="input-container">
        <label htmlFor="discount">Discount:</label>
        <input
          type="number"
          id="discount"
          name="discount"
          min="0"
          max="100"
          placeholder="Enter product discount"
          value={formData.discount}
          onChange={handleChange}
        />
      </div>
      <div className="input-container">
        <label htmlFor="quantity">Quantity:</label>
        <input
          type="number"
          id="quantity"
          name="quantity"
          min="0"
          placeholder="Enter product quantity"
          value={formData.quantity}
          onChange={handleChange}
        />
      </div>
      {/* Add other form fields here... */}
      <div className="button-container">
        <button type="submit" disabled={updateProductLoading}>
          {updateProductLoading ? "Updating..." : "Update"}
        </button>
      </div>
      {error && <div className="error">{error.message}</div>}
    </form>
  );
}

function AddProductForm({ onSubmit }) {
  const [createProduct, { isLoading: createProductLoading, error }] =
    useCreateProductMutation();
  const [formData, setFormData] = useState({
    name: "",
    price: "",
    description: "",
    subCat: "",
    discount: "",
    quantity: "",
    // Add other form fields here...
  });

  const handleChange = (event) => {
    setFormData((prevData) => ({
      ...prevData,
      [event.target.name]: event.target.value,
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    createProduct(formData)
      .unwrap()
      .then((data) => {
        console.log("Product created:", data);
        onSubmit(data);
      })
      .catch((error) => {
        console.error("Error creating product:", error);
      });
  };

  return (
    <form className="product-form" onSubmit={handleSubmit}>
      <div className="input-container">
        <label htmlFor="name">Name:</label>
        <input
          type="text"
          id="name"
          name="name"
          placeholder="Enter product name"
          value={formData.name}
          onChange={handleChange}
        />
      </div>
      <div className="input-container">
        <label htmlFor="description">Description:</label>
        <textarea
          id="description"
          name="description"
          placeholder="Enter product description"
          value={formData.description}
          onChange={handleChange}
        />
      </div>
      <div className="input-container">
        <label htmlFor="subCat">Category:</label>
        <select
          id="subCat"
          name="subCat"
          placeholder="Enter product category"
          value={formData.subCat}
          required
          onChange={handleChange}
        >
          <option value="">Choose an option</option>
          <option value="Electronics">Electronics</option>
          <option value="Clothing and Fashion">Clothing and Fashion</option>
          <option value="Health and Beauty">Health and Beauty</option>
          <option value="Home">Home</option>
          <option value="Sports">Sports</option>
          <option value="Books and Media">Books and Media</option>
          <option value="Toys and Games">Toys and Games</option>
        </select>
      </div>
      <div className="input-container">
        <label htmlFor="price">Price:</label>
        <input
          type="number"
          id="price"
          name="price"
          min="0"
          placeholder="Enter product price"
          value={formData.price}
          onChange={handleChange}
        />
      </div>
      <div className="input-container">
        <label htmlFor="discount">Discount:</label>
        <input
          type="number"
          id="discount"
          name="discount"
          min="0"
          max="100"
          placeholder="Enter product discount"
          value={formData.discount}
          onChange={handleChange}
        />
      </div>
      <div className="input-container">
        <label htmlFor="quantity">Quantity:</label>
        <input
          type="number"
          id="quantity"
          name="quantity"
          min="0"
          placeholder="Enter product quantity"
          value={formData.quantity}
          onChange={handleChange}
        />
      </div>
      {/* Add other form fields here... */}
      <div className="button-container">
        <button type="submit" disabled={createProductLoading}>
          {createProductLoading ? "Creating..." : "Create"}
        </button>
      </div>
      {error && <div className="error">{error.message}</div>}
    </form>
  );
}

function DashboardProducts() {
  const [isFormVisible, setIsFormVisible] = useState(false);
  const [editedProduct, setEditedProduct] = useState(null);
  const [products, setProducts] = useState([]);

  const mystore = localStorage.getItem("mystore");

  const { data: productData, isLoading: productDataLoading } =
    useGetProductsFromStoreQuery(mystore);

  const [updateProduct, { isLoading: updateProductLoading, error }] =
    useUpdateProductMutation();

  useEffect(() => {
    if (productData) {
      setProducts(productData);
    }
  }, [productData]);

  const handleAddFormSubmit = (formData) => {
    // Handle form submission for add form
    console.log("Add form submitted with data:", formData);
    setEditedProduct(null);

    // Hide the form
    setIsFormVisible(false);
  };

  const handleEditFormSubmit = (formData) => {
    // Handle form submission for edit form
    console.log("Edit form submitted with data:", formData);
    setEditedProduct(product);

    // Hide the form
    setIsFormVisible(false);
  };

  const onEditProduct = (product) => {
    setEditedProduct(product);
    setIsFormVisible(true);
  };

  return (
    <div className="dashboard-products-page dashboard--page">
      <div className="main">
        {isFormVisible ? (
          <>
            {editedProduct ? (
              <EditProductForm
                product={editedProduct}
                onSubmit={handleEditFormSubmit}
              />
            ) : (
              <AddProductForm onSubmit={handleAddFormSubmit} />
            )}
          </>
        ) : (
          <div className="product-table">
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
                  <tr key={product.productId}>
                    <td>{product.productId}</td>
                    <td>{product.name}</td>
                    <td>{product.price}</td>
                    <td>{product.subCat.name}</td>
                    <td>{product.quantity}</td>
                    <td>
                      {product.discount
                        ? product.discount.percentage + "%"
                        : "None"}
                    </td>
                    <td>{product.verified ? "Yes" : "No"}</td>
                    <td>
                      <button
                        className="icon-button"
                        onClick={() => onEditProduct(product)}
                      >
                        <AiOutlineEdit size={18} />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}

export default DashboardProducts;
