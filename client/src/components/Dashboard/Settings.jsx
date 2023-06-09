import React, { useState } from "react";

function Settings() {
  const [errorMessage, setErrorMessage] = useState("");
  const [discount, setDiscount] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();
    setErrorMessage(""); // Clear previous error message

    const isValid = validateForm();

    if (isValid) {
      try {
        // Perform update shop logic using the updateShop mutation and formData
      } catch (error) {
        setErrorMessage(error.message);
      }
    }
  };

  const validateForm = () => {
    // Shop Name validation: Minimum 2 characters
    if (formData.name.length < 2) {
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
    if (!phoneNumberRegex.test(formData.phone)) {
      setErrorMessage("Please enter a 10-digit phone number.");
      return false;
    }

    // Category validation
    if (!formData.category) {
      setErrorMessage("Please select a category.");
      return false;
    }

    // Working Hours validation
    const workingHoursRegex =
      /^(\w+ to \w+) - (\d{1,2}:\d{2}) to (\d{1,2}:\d{2})$/;
    if (!workingHoursRegex.test(formData.workingHours)) {
      setErrorMessage(
        "Working hours should be in the format: 'WeekDay to WeekDay - h:mm to h:mm'."
      );
      return false;
    }

    // Banner file validation
    const bannerFile = formData.banner;
    if (!bannerFile) {
      setErrorMessage("Please upload a banner image.");
      return false;
    }
    // if (bannerFile.name !== "banner.png") {
    //   setErrorMessage("The uploaded file must be named 'banner'.");
    //   return false;
    // }
    if (!bannerFile.type.startsWith("image/")) {
      setErrorMessage("The uploaded file must be an image.");
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
    <div className="dashboard-settings-page dashboard--page">
      <div className="header">
        <h3>Hello Tassy Omah,</h3>
        <p>
          Welcome to your dashboard! Stay organized and maximize your
          productivity.
        </p>
      </div>
      <div className="main">
        <h3>Settings</h3>
        <div className="content">
          <div className="shop">
            <h4>Edit Shop Info</h4>
            <form className="shop-form" onSubmit={handleSubmit}>
              <div className="input-container">
                <label htmlFor="name">Shop Name</label>
                <input
                  type="text"
                  name="name"
                  id="name"
                  placeholder="Enter Shop Name"
                  required
                  // onChange={handleChange}
                  // value={formData.shopName}
                />
              </div>
              <div className="input-container">
                <label htmlFor="description">Description</label>
                <textarea
                  name="description"
                  id="description"
                  placeholder="Enter Shop Description"
                  required
                  // onChange={handleChange}
                  // value={formData.description}
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
                  // onChange={handleChange}
                  // value={formData.email}
                />
              </div>
              <div className="input-container">
                <label htmlFor="phone">Phone Number</label>
                <input
                  type="text"
                  name="phone"
                  id="phone"
                  placeholder="Enter Phone Number"
                  required
                  // onChange={handleChange}
                  // value={formData.phoneNumber}
                />
              </div>

              <div className="input-container">
                <label htmlFor="category">Select a Category</label>
                <select
                  id="category"
                  name="category"
                  required
                  // value={formData.category}
                  // onChange={handleChange}
                >
                  <option value="">Choose an option</option>
                  <option value="Electronics">Electronics</option>
                  <option value="Clothing and Fashion">
                    Clothing and Fashion
                  </option>
                  <option value="Health and Beauty">Health and Beauty</option>
                  <option value="Home">Home</option>
                  <option value="Sports">Sports</option>
                  <option value="Books and Media">Books and Media</option>
                  <option value="Toys and Games">Toys and Games</option>
                </select>
              </div>
              <div className="input-container">
                <label htmlFor="workingHours">Working Hours</label>
                <input
                  type="text"
                  name="workingHours"
                  id="workingHours"
                  placeholder="Enter Your Working Hours"
                  required
                  // onChange={handleChange}
                  // value={formData.workingHours}
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
                  // onChange={handleFileChange}
                />
              </div>
              <div className="input-container">
                <label>
                  <input
                    type="checkbox"
                    name="agreeToTerms"
                    required
                    // onChange={handleChange}
                    // checked={formData.agreeToTerms}
                  />
                  I agree to the terms and conditions
                </label>
              </div>

              {errorMessage && <p className="error-message">{errorMessage}</p>}

              <div className="input-container">
                <button type="submit">Create Shop</button>
              </div>
            </form>
          </div>
          <div className="discount">
            <h4>Discount Codes</h4>
            <div className="create-discount">
              <h5>Create Discount Code</h5>
              <div className="input-container">
                <label htmlFor="discount">Discount</label>
                <input
                  type="text"
                  name="discount"
                  id="discount"
                  placeholder="Enter Discount"
                  value={discount}
                  onChange={(event) => setDiscount(event.target.value)}
                />
              </div>
              <div className="input-container">
                <button type="submit">Submit Discount</button>
              </div>
            </div>{" "}
            <h5>Manage Discount Codes</h5>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Settings;
