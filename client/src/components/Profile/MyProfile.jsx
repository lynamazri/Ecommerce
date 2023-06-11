import React, { useState, useEffect } from "react";
import { usePatchProfileMutation } from "../../redux/Slices/apiSlice";
import { useSelector, useDispatch } from "react-redux";
import { updateUser } from "../../redux/Slices/authSlice";
import { useNavigate } from "react-router-dom";

function MyProfile() {
  const navigate = useNavigate();
  const [patchProfile, { isLoading, error }] = usePatchProfileMutation();
  const authState = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  var user = localStorage.getItem("user")
    ? JSON.parse(localStorage.getItem("user"))
    : null;
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    newUsername: "",
    bankAccountNumber: "",
  });
  const [errorMessage, setErrorMessage] = useState("");
  const [confirmationMessage, setConfirmationMessage] = useState("");
  useEffect(() => {
    if (user === null) {
      navigate("/login");
    }
  });
  useEffect(() => {
    // Assuming you fetch the profile data from the backend and store it in the 'profileData' variable
    const profileData = {
      firstName: user.firstName,
      lastName: user.lastName,
      newUsername: user.username,
      bankAccountNumber: user.bankAccount,
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

  const validateForm = () => {
    if (
      !formData.firstName ||
      !formData.lastName ||
      !formData.newUsername ||
      !formData.bankAccountNumber
    ) {
      setErrorMessage("Please fill in all the required fields.");
      setConfirmationMessage("");
      return false;
    }

    // Validate newUsername format
    const newUsernameRegex = /^[a-zA-Z0-9]{3,}$/;
    if (!newUsernameRegex.test(formData.newUsername)) {
      setErrorMessage(
        "Please enter a valid username. It should contain at least 3 alphanumeric characters."
      );
      setConfirmationMessage("");
      return false;
    }

    // Validate bank account number format
    const bankAccountRegex = /^\d{10}$/;
    if (!bankAccountRegex.test(formData.bankAccountNumber)) {
      setErrorMessage("Please enter a valid bank account number.");
      setConfirmationMessage("");
      return false;
    }

    return true;
  };

  const handleSubmit = (e) => {
    // Add your validation logic here
    e.preventDefault();
    if (!validateForm()) {
      return;
    }
    patchProfile({
      user: user.userId,
      newUsername: formData.newUsername,
      firstName: formData.firstName,
      lastName: formData.lastName,
      bankAccount: formData.bankAccountNumber,
    })
      .unwrap() // Extract the response data
      .then(() => {
        // Handle successful update
        setConfirmationMessage("Changes saved successfully.");
        dispatch(
          updateUser({
            user: {
              ...user,
              username: formData.newUsername,
              firstName: formData.firstName,
              lastName: formData.lastName,
              bankAccount: formData.bankAccountNumber,
            },
          })
        );
        const updatedUser = authState.user;
      });
    // .catch(() => {
    //   // Handle error
    //   setErrorMessage("Error");
    //   console.log(errorMessage);
    // });

    // Add your logic here to handle form submission
    // For now, just log the form data
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
            <label htmlFor="email">Username</label>
            <input
              type="text"
              name="newUsername"
              id="newUsername"
              placeholder="Username"
              required
              onChange={handleChange}
              value={formData.newUsername}
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

        {errorMessage && <p className="error-message">{errorMessage}</p>}
        {confirmationMessage && (
          <p className="confirmation-message">{confirmationMessage}</p>
        )}

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
