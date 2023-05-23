import React, { useState, useEffect } from "react";

function MyProfile() {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phoneNumber: "",
  });
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    // Assuming you fetch the profile data from the backend and store it in the 'profileData' variable
    const profileData = {
      firstName: "John",
      lastName: "Doe",
      email: "johndoe@example.com",
      phoneNumber: "1234567890",
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
            Save Changes
          </button>
        </div>
      </div>
    </form>
  );
}

export default MyProfile;
