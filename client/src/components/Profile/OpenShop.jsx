import React, { useState } from "react";

function OpenShop() {
  const [formData, setFormData] = useState({
    shopName: "",
    description: "",
    email: "",
    phoneNumber: "",
    address: "",
    city: "",
    state: "",
    zipCode: "",
    banner: null, // Add a field to store the uploaded file
    logo: null, // Add a field to store the uploaded file

    agreeToTerms: false,
  });
  const [errorMessage, setErrorMessage] = useState("");
  const [isShopCreated, setShopCreated] = useState(false);

  function handleChange(event) {
    const { name, value, type, checked } = event.target;
    const fieldValue = type === "checkbox" ? checked : value;

    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: fieldValue,
    }));
  }

  const handleFileChange = (event) => {
    const { name, files } = event.target;
    // Set the selected file in the form data state
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: files[0],
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    // Validate form fields
    if (!validateForm()) {
      return;
    }

    // Add your logic here to handle shop creation
    // For now, just log the form data and set the shop created state to true
    console.log(formData);
    setErrorMessage("");
    setShopCreated(true);
  };

  const validateForm = () => {
    // Shop Name validation: Minimum 2 characters
    if (formData.shopName.length < 2) {
      setErrorMessage("Shop Name must be at least 2 characters long.");
      return false;
    }

    // Description validation: Maximum 500 characters
    if (formData.description.length > 500) {
      setErrorMessage("Description must be less than 500 characters.");
      return false;
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      setErrorMessage("Please enter a valid email address.");
      return false;
    }

    // Phone Number validation: 10-digit number
    const phoneNumberRegex = /^\d{10}$/;
    if (!phoneNumberRegex.test(formData.phoneNumber)) {
      setErrorMessage("Please enter a 10-digit phone number.");
      return false;
    }

    // Address validation
    if (formData.address.trim() === "") {
      setErrorMessage("Please enter a valid address.");
      return false;
    }

    // City validation
    if (formData.city.trim() === "") {
      setErrorMessage("Please enter a valid city.");
      return false;
    }

    // State validation
    if (formData.state.trim() === "") {
      setErrorMessage("Please enter a valid state.");
      return false;
    }

    // ZIP Code validation: 5-digit number
    const zipCodeRegex = /^\d{5}$/;
    if (!zipCodeRegex.test(formData.zipCode)) {
      setErrorMessage("Please enter a 5-digit ZIP Code.");
      return false;
    }

    // Agree to Terms validation
    if (!formData.agreeToTerms) {
      setErrorMessage("Please agree to the terms and conditions.");
      return false;
    }

    return true;
  };

  return (
    <div className="right-container">
      <div className="open-shop-page">
        <div className="header">
          <h3>Open a Shop</h3>
          <p>Create your own shop and start selling!</p>
        </div>

        {isShopCreated ? (
          <div className="success-message">
            <p>Your shop has been successfully created!</p>
            <p>Start adding your products and managing your shop.</p>
          </div>
        ) : (
          <form className="shop-form" onSubmit={handleSubmit}>
            <div className="input-container">
              <label htmlFor="shopName">Shop Name</label>
              <input
                type="text"
                name="shopName"
                id="shopName"
                placeholder="Enter Shop Name"
                required
                onChange={handleChange}
                value={formData.shopName}
              />
            </div>
            <div className="input-container">
              <label htmlFor="description">Description</label>
              <textarea
                name="description"
                id="description"
                placeholder="Enter Shop Description"
                required
                onChange={handleChange}
                value={formData.description}
              ></textarea>
            </div>
            <div className="input-container">
              <label htmlFor="email">Email</label>
              <input
                type="email"
                name="email"
                id="email"
                placeholder="Enter Email"
                required
                onChange={handleChange}
                value={formData.email}
              />
            </div>
            <div className="input-container">
              <label htmlFor="phoneNumber">Phone Number</label>
              <input
                type="text"
                name="phoneNumber"
                id="phoneNumber"
                placeholder="Enter Phone Number"
                required
                onChange={handleChange}
                value={formData.phoneNumber}
              />
            </div>
            <div className="input-container">
              <label htmlFor="address">Address</label>
              <input
                type="text"
                name="address"
                id="address"
                placeholder="Enter Address"
                required
                onChange={handleChange}
                value={formData.address}
              />
            </div>
            <div className="input-container">
              <label htmlFor="city">City</label>
              <input
                type="text"
                name="city"
                id="city"
                placeholder="Enter City"
                required
                onChange={handleChange}
                value={formData.city}
              />
            </div>
            <div className="input-container">
              <label htmlFor="state">State</label>
              <input
                type="text"
                name="state"
                id="state"
                placeholder="Enter State"
                required
                onChange={handleChange}
                value={formData.state}
              />
            </div>
            <div className="input-container">
              <label htmlFor="zipCode">ZIP Code</label>
              <input
                type="text"
                name="zipCode"
                id="zipCode"
                placeholder="Enter ZIP Code"
                required
                onChange={handleChange}
                value={formData.zipCode}
              />
            </div>
            {/* File upload for banner */}
            <div className="input-container">
              <label htmlFor="banner">Banner</label>
              <input
                type="file"
                name="banner"
                id="banner"
                accept="image/*"
                onChange={handleFileChange}
              />
            </div>

            {/* File upload for logo */}
            <div className="input-container">
              <label htmlFor="logo">Logo</label>
              <input
                type="file"
                name="logo"
                id="logo"
                accept="image/*"
                onChange={handleFileChange}
              />
            </div>
            <div className="input-container">
              <label>
                <input
                  type="checkbox"
                  name="agreeToTerms"
                  required
                  onChange={handleChange}
                  checked={formData.agreeToTerms}
                />
                I agree to the terms and conditions
              </label>
            </div>

            {errorMessage && <p className="error-message">{errorMessage}</p>}

            <div className="input-container">
              <button type="submit">Create Shop</button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}

export default OpenShop;
