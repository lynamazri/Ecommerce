import React, { useState, useEffect } from "react";

function MyProfile() {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    bankAccountNumber: "",
  });
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    // Assuming you fetch the profile data from the backend and store it in the 'profileData' variable
    const profileData = {
      firstName: "John",
      lastName: "Doe",
      email: "johndoe@example.com",
      bankAccountNumber: "1234567890",
    };

    // Set the form data with the fetched profile data
    setFormData(profileData);
  }, []);

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
      !formData.firstName ||
      !formData.lastName ||
      !formData.email ||
      !formData.bankAccountNumber
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
      <div className="my-profile-page">
        <div className="header">
          <h3>My Profile</h3>
          <p>Update your personal information by changing the inputs below.</p>
        </div>
        <div className="my-profile-inputs">
          <div className="input-container">
            <label htmlFor="firstName">First Name</label>
            <input
              type="text"
              name="firstName"
              id="firstName"
              placeholder="First Name"
              required
              onChange={handleChange}
              value={formData.firstName}
            />
          </div>
          <div className="input-container">
            <label htmlFor="lastName">Last Name</label>
            <input
              type="text"
              name="lastName"
              id="lastName"
              placeholder="Last Name"
              required
              onChange={handleChange}
              value={formData.lastName}
            />
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
            <label htmlFor="bankAccountNumber">Bank Account Number</label>
            <input
              type="text"
              name="bankAccountNumber"
              id="bankAccountNumber"
              placeholder="Bank Account Number"
              required
              onChange={handleChange}
              value={formData.bankAccountNumber}
            />
          </div>
        </div>

        {errorMessage && <p className="error">{errorMessage}</p>}

        <div className="input-container">
          <button type="submit" value="Submit">
            Save Changes
          </button>
        </div>
      </div>
    </form>
  );
}

export default MyProfile;

/*
import axios from "axios";

// ...

const handleSubmit = async (event) => {
  event.preventDefault();

  // Collect the updated profile data from the form
  const updatedProfileData = {
    firstName: formData.firstName,
    lastName: formData.lastName,
    email: formData.email,
    phoneNumber: formData.phoneNumber,
  };

  try {
    // Make an HTTP request to the API endpoint with the updated profile data
    const response = await axios.put("/api/profile", updatedProfileData);

    // Handle the response as needed
    console.log(response);
    setSuccessMessage("Profile updated successfully");
    setErrorMessage("");
  } catch (error) {
    // Handle errors
    console.log(error);
    setErrorMessage("An error occurred while updating the profile");
    setSuccessMessage("");
  }
};


<input
  type="text"
  name="firstName"
  id="firstName"
  placeholder="First Name"
  required
  onChange={handleChange}
  value={formData.firstName}
/>

*/
