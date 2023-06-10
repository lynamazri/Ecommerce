import React, { useState, useEffect } from "react";
import {
  useEditStoreMutation,
  useEditBannerMutation,
  useGetStoreFromUserQuery,
} from "../../redux/Slices/apiSlice";
import { useNavigate } from "react-router-dom";

function Settings() {
  const [errorMessage, setErrorMessage] = useState("");
  //const [discount, setDiscount] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const navigate = useNavigate();
  const [storeUpdated, setStoreUpdated] = useState(false);
  const [editStore, { isLoading: editStoreLoading, error }] =
    useEditStoreMutation();
  const [editBanner, { isLoading: editBannerLoading, error2 }] =
    useEditBannerMutation();

  var user = localStorage.getItem("user")
    ? JSON.parse(localStorage.getItem("user"))
    : null;

  let mystore = localStorage.getItem("mystore");
  console.log(mystore);

  const [formData, setFormData] = React.useState({
    name: "",
    description: "",
    email: "",
    phoneNumber: "",
    workingHours: "",
    banner: null,
    agreeToTerms: false,
  });

  function handleChange(event) {
    const { name, value, type, checked } = event.target;
    setFormData((prevFormData) => {
      return {
        ...prevFormData,
        [name]: type === "checkbox" ? checked : value,
      };
    });

    console.log(formData);
  }

  const validateForm = () => {
    // Shop Name validation: Minimum 2 characters

    if (formData.name && formData.name.length < 2) {
      setErrorMessage("Shop Name must be at least 2 characters long.");
      return false;
    }

    // Description validation: Maximum 500 characters
    if (formData.description && formData.description.length > 500) {
      setErrorMessage("Description must be less than 500 characters.");
      return false;
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (formData.email && !emailRegex.test(formData.email)) {
      setErrorMessage("Please enter a valid email address.");
      return false;
    }

    // Phone Number validation: 10-digit number
    const phoneNumberRegex = /^\d{10}$/;
    if (formData.phone && !phoneNumberRegex.test(formData.phone)) {
      setErrorMessage("Please enter a 10-digit phone number.");
      return false;
    }

    // Category validation
    /*   if (!formData.category) {
      setErrorMessage("Please select a category.");
      return false;
    } */

    // Working Hours validation
    const workingHoursRegex =
      /^(\w+ to \w+) - (\d{1,2}:\d{2}) to (\d{1,2}:\d{2})$/;
    if (
      formData.workingHours &&
      !workingHoursRegex.test(formData.workingHours)
    ) {
      setErrorMessage(
        "Working hours should be in the format: 'WeekDay to WeekDay - h:mm to h:mm'."
      );
      return false;
    }

    // Banner file validation
    const bannerFile = formData.banner;
    /*  if (!bannerFile) {
      setErrorMessage("Please upload a banner image.");
      return false;
    } */
    // if (bannerFile.name !== "banner.png") {
    //   setErrorMessage("The uploaded file must be named 'banner'.");
    //   return false;
    // }
    if (bannerFile && !bannerFile.type.startsWith("image/")) {
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
    //setErrorMessage(""); // Clear previous error message
    const isValid = validateForm();

    if (isValid) {
      editStore({
        name: formData.name,
        email: formData.email,
        description: formData.description,
        phone: formData.phone,
        workingHours: formData.workingHours,
        store: mystore,
      })
        .unwrap() // Extract the response data
        .then(() => {
          // Handle successful update
          setSuccessMessage("Your store has been updated successfully!");
          setErrorMessage("");
          setFormData({
            name: "",
            description: "",
            email: "",
            phoneNumber: "",
            workingHours: "",
            banner: null,
          });

          setStoreUpdated(true);
          setTimeout(() => {
            setStoreUpdated(false);
            navigate("/dashboard");
          }, 1200);
        })
        .catch((error) => {
          // Handle error
          setErrorMessage("Failed to update. Please try again.");
        });
    }

    if (bannerFile) {
      editBanner({
        banner: bannerFile,
        store: storeData.storeId,
      })
        .unwrap()
        .then(() => {
          setSuccessMessage("Your store has been updated successfully!");
          setErrorMessage("");
          setFormData({
            name: "",
            description: "",
            email: "",
            phoneNumber: "",
            workingHours: "",
            banner: null,
          });
          setStoreUpdated(true);
          setTimeout(() => {
            setStoreUpdated(false);
            navigate("/dashboard");
          }, 1200);
        })
        .catch((error) => {
          // Handle error
          setErrorMessage("Failed to update. Please try again.");
        });
    }
  };

  return (
    <div className="dashboard-settings-page dashboard--page">
      <div className="header">
        <h3>
          Hello, {user.firstName} {user.lastName}
        </h3>
        <p>
          Edit your store information to help your customers know more about
          your shop.
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
                  onChange={handleChange}
                  value={formData.name}
                />
              </div>
              <div className="input-container">
                <label htmlFor="description">Description</label>
                <textarea
                  name="description"
                  id="description"
                  placeholder="Enter Shop Description"
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
                  onChange={handleChange}
                  value={formData.email}
                />
              </div>
              <div className="input-container">
                <label htmlFor="phone">Phone Number</label>
                <input
                  type="text"
                  name="phone"
                  id="phone"
                  placeholder="Enter Phone Number"
                  onChange={handleChange}
                  value={formData.phone}
                />
              </div>

              {/*   <div className="input-container">
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
              </div> */}
              <div className="input-container">
                <label htmlFor="workingHours">Working Hours</label>
                <input
                  type="text"
                  name="workingHours"
                  id="workingHours"
                  placeholder="Enter Your Working Hours"
                  onChange={handleChange}
                  value={formData.workingHours}
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
              {successMessage && (
                <p className="error-message">{successMessage}</p>
              )}

              <div className="input-container">
                <button type="submit">Update Shop</button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Settings;
