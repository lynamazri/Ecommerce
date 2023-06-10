import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

function AdminSettings() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    newUsername: "",
    bankAccountNumber: "",
    oldPass: "",
    newPass: "",
    confirmNewPass: "",
  });
  const [errorMessage, setErrorMessage] = useState("");
  const [confirmationMessage, setConfirmationMessage] = useState("");
  const [passInputType, setPassInputType] = useState({
    oldPass: "password",
    newPass: "password",
    confirmNewPass: "password",
  });
  const [showPass, setShowPass] = useState({
    oldPass: false,
    newPass: false,
    confirmNewPass: false,
  });
  const [updatePassword] = usePatchPasswordMutation();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Shop Name validation: Minimum 2 characters
    if (formData.firstName.length < 2) {
      setErrorMessage("First Name must be at least 2 characters long.");
      return false;
    }

    // Last Name validation: Minimum 2 characters
    if (formData.lastName.length < 2) {
      setErrorMessage("Last Name must be at least 2 characters long.");
      return false;
    }

    // Username validation: Minimum 2 characters
    if (formData.newUsername.length < 2) {
      setErrorMessage("Username must be at least 2 characters long.");
      return false;
    }

    // Bank Account Number validation: Minimum 2 characters
    if (formData.bankAccountNumber.length < 2) {
      setErrorMessage(
        "Bank Account Number must be at least 2 characters long."
      );
      return false;
    }

    // Add your logic here to handle form submission and updating admin's information

    // Example logic to display confirmation message
    setConfirmationMessage("Changes saved successfully.");
  };

  const togglePasswordInputType = (name) => {
    setPassInputType((prevPassInputType) => ({
      ...prevPassInputType,
      [name]: prevPassInputType[name] === "password" ? "text" : "password",
    }));
    setShowPass((prevShowPass) => ({
      ...prevShowPass,
      [name]: !prevShowPass[name],
    }));
  };

  const validateForm = () => {
    if (formData.newPass !== formData.confirmNewPass) {
      setErrorMessage("Passwords do not match.");
      return false;
    }
    return true;
  };

  useEffect(() => {
    if (confirmationMessage || errorMessage) {
      const timer = setTimeout(() => {
        setConfirmationMessage("");
        setErrorMessage("");
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [confirmationMessage, errorMessage]);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    // Handle form submission and updating admin's information

    // Example logic to display confirmation message
    setConfirmationMessage("Changes saved successfully.");

    // Update password
    updatePassword({
      curPassword: formData.oldPass,
      newPassword: formData.newPass,
      userId: formData.userId,
    })
      .unwrap() // Extract the response data
      .then(() => {
        // Handle successful update
        setConfirmationMessage("Password updated successfully.");
        setFormData({
          ...formData,
          oldPass: "",
          newPass: "",
          confirmNewPass: "",
        });
      })
      .catch(() => {
        // Handle error
        setErrorMessage("Error updating password.");
      });
  };

  return (
    <div className="admin-settings-page admin--page dashboard--page">
      <div className="header">
        <h3>
          Hello, {formData.firstName} {formData.lastName}
        </h3>
        <p>Update your personal information by changing the inputs below.</p>
      </div>
      <div className="main">
        <h3 className="upper">Settings</h3>
        <div className="content">
          <div className="header">
            <h4>Edit Shop Info</h4>
            <p>Fill in the inputs below to change your password</p>
          </div>

          <form className="admin-info-form" onSubmit={handleSubmit}>
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
            <label htmlFor="newUsername">Username</label>
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
                  </form>

        </div>

          <div className="password">
            <div className="header">
              <h4>Security</h4>
              <p>Fill in the inputs below to change your password</p>
            </div>
            <div className="security-inputs">
              <div className="input-container">
                <label htmlFor="oldPass">Current Password</label>
                <div className="input-password">
                  <input
                    type={passInputType.oldPass}
                    name="oldPass"
                    id="oldPass"
                    placeholder="Current Password"
                    required
                    onChange={handleChange}
                    value={formData.oldPass}
                  />
                  {formData.oldPass && (
                    <button
                      className="show-password"
                      onClick={(e) => {
                        e.preventDefault();
                        togglePasswordInputType("oldPass");
                      }}
                    >
                      {showPass.oldPass ? (
                        <AiFillEye />
                      ) : (
                        <AiFillEyeInvisible />
                      )}
                    </button>
                  )}
                </div>
              </div>
              <div className="input-container">
                <label htmlFor="newPass">New Password</label>
                <div className="input-password">
                  <input
                    type={passInputType.newPass}
                    name="newPass"
                    id="newPass"
                    placeholder="New Password"
                    required
                    onChange={handleChange}
                    value={formData.newPass}
                  />
                  {formData.newPass && (
                    <button
                      className="show-password"
                      onClick={(e) => {
                        e.preventDefault();
                        togglePasswordInputType("newPass");
                      }}
                    >
                      {showPass.newPass ? (
                        <AiFillEye />
                      ) : (
                        <AiFillEyeInvisible />
                      )}
                    </button>
                  )}
                </div>
              </div>
              <div className="input-container">
                <label htmlFor="confirmNewPass">Confirm New Password</label>
                <div className="input-password">
                  <input
                    type={passInputType.confirmNewPass}
                    name="confirmNewPass"
                    id="confirmNewPass"
                    placeholder="Confirm New Password"
                    required
                    onChange={handleChange}
                    value={formData.confirmNewPass}
                  />
                  {formData.confirmNewPass && (
                    <button
                      className="show-password"
                      onClick={(e) => {
                        e.preventDefault();
                        togglePasswordInputType("confirmNewPass");
                      }}
                    >
                      {showPass.confirmNewPass ? (
                        <AiFillEye />
                      ) : (
                        <AiFillEyeInvisible />
                      )}
                    </button>
                  )}
                </div>
              </div>
            </div>
            {errorMessage && <p className="error-message">{errorMessage}</p>}
            {confirmationMessage && (
              <p className="confirmation-message">{confirmationMessage}</p>
            )}
            <div className="button-container">
              <button type="submit" value="Submit">
                Update Password
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AdminSettings;
