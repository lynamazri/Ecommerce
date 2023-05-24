import React, { useState } from "react";

function OpenShop() {
  const [formData, setFormData] = useState({
    shopName: "",
    shopDescription: "",
    email: "",
    phoneNumber: "",
  });
  const [errorMessage, setErrorMessage] = useState("");

  function handleChange(event) {
    const { name, value } = event.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  }

  const handleSubmit = (event) => {
    event.preventDefault();

    // Add your validation logic here
    if (
      !formData.shopName ||
      !formData.shopDescription ||
      !formData.email ||
      !formData.phoneNumber
    ) {
      setErrorMessage("Please fill in all the required fields.");
      return;
    }

    // Add your logic here to handle form submission
    // For now, just log the form data
    console.log(formData);
    setErrorMessage("");
  };

  return (
    <form className="right-container" onSubmit={handleSubmit}>
      <div className="open-shop-page">
        <div className="header">
          <h3>Open Your Shop</h3>
          <p>Enter the details of your shop below.</p>
        </div>
        <div className="open-shop-inputs">
          <div className="input-container">
            <label htmlFor="shopName">Shop Name</label>
            <input
              type="text"
              name="shopName"
              id="shopName"
              placeholder="Shop Name"
              required
              onChange={handleChange}
              value={formData.shopName}
            />
          </div>
          <div className="input-container">
            <label htmlFor="shopDescription">Shop Description</label>
            <textarea
              name="shopDescription"
              id="shopDescription"
              placeholder="Shop Description"
              required
              onChange={handleChange}
              value={formData.shopDescription}
            ></textarea>
          </div>
          <div className="input-container">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              name="email"
              id="email"
              placeholder="Email"
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
              placeholder="Phone Number"
              required
              onChange={handleChange}
              value={formData.phoneNumber}
            />
          </div>
        </div>

        {errorMessage && <p className="error">{errorMessage}</p>}

        <div className="input-container">
          <button type="submit" value="Submit">
            Create Shop
          </button>
        </div>
      </div>
    </form>
  );
}

export default OpenShop;
