import React, { useState, useEffect } from "react";
import {
  useGetProductsFromStoreQuery,
  useUpdateProductMutation,
  useCreateProductMutation,
} from "../../redux/Slices/apiSlice";

function ProductTable({ onEditProduct }) {
  const [products, setProducts] = useState([]);
  const [updateProduct, { isLoading: updateProductLoading, error }] =
    useUpdateProductMutation();

  let mystore = localStorage.getItem("mystore");

  const { data: productData, isLoading } =
    useGetProductsFromStoreQuery(mystore);

  useEffect(() => {
    if (productData) {
      setProducts(productData);
    }
  }, [productData]);

  console.log(products);

  return (
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
                {product.discount ? product.discount.percentage + "%" : "None"}
              </td>
              <td>{product.verified ? "Yes" : "No"}</td>
              <td>
                <button
                  className="product-table-edit"
                  onClick={() => onEditProduct(product)}
                >
                  Edit
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function ProductForm({ product, onSubmit }) {
  const [createProduct] = useCreateProductMutation();
  const [name, setName] = useState(product ? product.name : "");
  const [description, setDescription] = useState(
    product ? product.description : ""
  );
  const [subCat, setSubCat] = useState(product ? product.subCat : "");
  const [price, setPrice] = useState(product ? product.price : "");
  const [discount, setDiscount] = useState(product ? product.discount : 0);
  const [quantity, setQuantity] = useState(product ? product.quantity : "");
  const [images, setImages] = useState(product ? product.images : {});

  const [errorMessage, setErrorMessage] = useState("");
  const mystore = localStorage.getItem("mystore");
  const handleFileChange = (event) => {
    const { name, files } = event.target;
    // Set the selected file in the form data state
    setImages((prevImages) => ({
      ...prevImages,
      [name]: files[0],
    }));
  };
  const handleSubmit = (event) => {
    event.preventDefault();

    // Validate form fields
    if (!validateForm()) {
      return;
    }

    const formData = new FormData();

    formData.append("name", name);
    formData.append("description", description);
    formData.append("subCat", "Laptops");
    formData.append("price", price);
    formData.append("discount", discount);
    formData.append("quantity", quantity);
    formData.append("storeId", mystore);

    for (const name in images) {
      formData.append(name, images[name]);
    }

    createProduct(formData)
      .unwrap() // Extract the response data
      .then(() => {
        // Handle successful update
        setConfirmationMessage("Changes saved successfully.");
      })
      .catch((e) => {
        // Handle error
        setErrorMessage(e.errorMessage);
      });
    onSubmit(formData);
  };

  const validateForm = () => {
    // Name validation: Minimum 2 characters
    if (name.length < 2) {
      setErrorMessage("Name must be at least 2 characters long.");
      return false;
    }

    // Description validation: Maximum 500 characters
    if (description.length > 500) {
      setErrorMessage("Description must be less than 500 characters.");
      return false;
    }

    // Category validation
    if (!subCat) {
      setErrorMessage("Please select a subCategory.");
      return false;
    }

    // Price validation: Must be a positive number
    const parsedPrice = parseInt(price);
    if (isNaN(parsedPrice) || parsedPrice < 0) {
      setErrorMessage("Price must be a positive number.");
      return false;
    }

    // Discount validation: Must be a number between 0 and 100
    const parsedDiscount = parseFloat(discount);
    if (isNaN(parsedDiscount) || parsedDiscount < 0 || parsedDiscount > 100) {
      setErrorMessage("Discount must be a number between 0 and 100.");
      return false;
    }
    // Banner file validation
    // const bannerFile = images[0];
    // if (!bannerFile) {
    //   setErrorMessage("Please upload a banner image.");
    //   return false;
    // }
    // if (bannerFile.name !== "banner.png") {
    //   setErrorMessage("The uploaded file must be named 'banner'.");
    //   return false;
    // }
    // if (!bannerFile.type.startsWith("image/")) {
    //   setErrorMessage("The uploaded file must be an image.");
    //   return false;
    // }

    // Quantity validation: Must be a positive integer
    const parsedQuantity = parseInt(quantity);
    if (
      isNaN(parsedQuantity) ||
      parsedQuantity <= 0 ||
      parsedQuantity % 1 !== 0
    ) {
      setErrorMessage("Quantity must be a positive integer.");
      return false;
    }

    setErrorMessage("");
    return true;
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
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </div>
      <div className="input-container">
        <label htmlFor="description">Description:</label>
        <textarea
          id="description"
          name="description"
          placeholder="Enter product description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
      </div>
      <div className="input-container">
        <label htmlFor="subCat">Category:</label>
        <select
          type="text"
          id="subCat"
          name="subCat"
          placeholder="Enter product category"
          value={subCat}
          required
          onChange={(e) => setSubCat(e.target.value)}
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
          min="0" // Restrict input to non-negative numbers
          placeholder="Enter product price"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
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
          value={discount}
          onChange={(e) => setDiscount(e.target.value)}
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
          value={quantity}
          onChange={(e) => setQuantity(e.target.value)}
        />
      </div>
      <div className="input-container">
        <label htmlFor="image1">image1</label>
        <input
          type="file"
          name="img1"
          id="image1"
          accept="image/*"
          onChange={handleFileChange}
        />
      </div>
      <div className="input-container">
        <label htmlFor="image2">image2</label>
        <input
          type="file"
          name="img2"
          id="image2"
          accept="image/*"
          onChange={handleFileChange}
        />
      </div>
      <div className="input-container">
        <label htmlFor="image3">image3</label>
        <input
          type="file"
          name="img3"
          id="image3"
          accept="image/*"
          onChange={handleFileChange}
        />
      </div>
      <div className="input-container">
        <label htmlFor="image4">image4</label>
        <input
          type="file"
          name="img4"
          id="image4"
          accept="image/*"
          onChange={handleFileChange}
        />
      </div>

      {errorMessage && <p className="error-message">{errorMessage}</p>}

      <button className="blue-button" type="submit">
        {product ? "Edit" : "Add"} Product
      </button>
    </form>
  );
}

function DashboardProducts() {
  var user = localStorage.getItem("user")
    ? JSON.parse(localStorage.getItem("user"))
    : null;

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
        <h3>
          Hello, {user.firstName} {user.lastName}
        </h3>
        <p>View and edit your products.</p>
      </div>
      <div className="main">
        {isFormVisible ? (
          <ProductForm product={editedProduct} onSubmit={handleFormSubmit} />
        ) : (
          <>
            <div className="upper">
              <h3>Products</h3>
              <button className="table-add" onClick={handleAddProduct}>
                Add Product
              </button>
            </div>
            <ProductTable onEditProduct={handleEditProduct} />
          </>
        )}
      </div>
    </div>
  );
}

export default DashboardProducts;
