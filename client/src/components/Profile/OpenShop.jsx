import React, { useEffect, useState } from "react";
import { useCreateStoreMutation } from "../../redux/Slices/apiSlice";
import { useGetCategoriesQuery } from "../../redux/Slices/apiSlice";

function OpenShop() {
  const { data: categoriesData, isLoading, error } = useGetCategoriesQuery();
  const [createStore] = useCreateStoreMutation();
  var user = localStorage.getItem("user")
    ? JSON.parse(localStorage.getItem("user"))
    : null;

  const [selectedOption, setSelectedOption] = useState("");
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    email: "",
    phone: "",
    category: "",
    workingHours: "",
    banner: null, // Add a field to store the uploaded file

    agreeToTerms: false,
  });
  const [errorMessage, setErrorMessage] = useState("");
  const [categories, setCategories] = useState([]);
  const [isShopCreated, setShopCreated] = useState(false);
  useEffect(() => {
    if (categoriesData) {
      setCategories(categoriesData);
    }
  }, [categoriesData]);

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
  console.log(formData);
  const handleSubmit = (event) => {
    event.preventDefault();
    const fd = new FormData();
    fd.append("banner", formData.banner);
    fd.append("name", formData.name);
    fd.append("description", formData.description);
    fd.append("email", formData.email);
    fd.append("phone", formData.phone);
    fd.append("category", formData.category);
    fd.append("workingHours", formData.workingHours);
    fd.append("userId", user.userId);
    //Validate form fields
    if (!validateForm()) {
      return;
    }
    // createStore({
    //   name: formData.name,
    //   description: formData.description,
    //   email: formData.email,
    //   phone: formData.phone,
    //   category: formData.category,
    //   workingHours: formData.workingHours,
    //   userId: user.userId,
    //   banner: formData.banner,
    // })
    createStore(fd)
      .unwrap() // Extract the response data
      .then(() => {
        // Handle successful update
        setShopCreated(true);
        console.log("succeded");
      })
      .catch(() => {
        // Handle error
        setErrorMessage("Error");
        console.log("Eroooooor");
      });
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
  console.log(formData);
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
              <label htmlFor="name">Shop Name</label>
              <input
                type="text"
                name="name"
                id="name"
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
              <label htmlFor="phone">Phone Number</label>
              <input
                type="text"
                name="phone"
                id="phone"
                placeholder="Enter Phone Number"
                required
                onChange={handleChange}
                value={formData.phoneNumber}
              />
            </div>

            <div className="input-container">
              <label htmlFor="category">Select a Category</label>
              <select
                id="category"
                name="category"
                required
                value={formData.category}
                onChange={handleChange}
              >
                <option value="">Choose an option</option>
                {categories.length > 0 &&
                  categories.map((category) => (
                    <option value="Electronics">{category.name}</option>
                  ))}
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

            <div className="input-container">
              <button type="submit" onClick={handleSubmit}>
                Create Shop
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}

export default OpenShop;
