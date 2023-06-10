import React, { useState } from "react";

function AdminSettings() {
  const [adminInfo, setAdminInfo] = useState({
    firstName: "",
    lastName: "",
    newUsername: "",
    bankAccountNumber: "",
  });
  const [passwordInfo, setPasswordInfo] = useState({
    oldPass: "",
    newPass: "",
    confirmNewPass: "",
  });
  const [adminInfoErrorMessage, setAdminInfoErrorMessage] = useState("");
  const [passwordErrorMessage, setPasswordErrorMessage] = useState("");
  const [adminInfoConfirmationMessage, setAdminInfoConfirmationMessage] =
    useState("");
  const [passwordConfirmationMessage, setPasswordConfirmationMessage] =
    useState("");
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

  const handleAdminInfoChange = (e) => {
    setAdminInfo({ ...adminInfo, [e.target.name]: e.target.value });
  };

  const handlePasswordChange = (e) => {
    setPasswordInfo({ ...passwordInfo, [e.target.name]: e.target.value });
  };

  const handleSubmitAdminInfo = (e) => {
    e.preventDefault();

    // Admin info validation
    if (adminInfo.firstName.length < 2) {
      setAdminInfoErrorMessage(
        "First Name must be at least 2 characters long."
      );
      return;
    }

    if (adminInfo.lastName.length < 2) {
      setAdminInfoErrorMessage("Last Name must be at least 2 characters long.");
      return;
    }

    if (adminInfo.newUsername.length < 2) {
      setAdminInfoErrorMessage("Username must be at least 2 characters long.");
      return;
    }

    if (adminInfo.bankAccountNumber.length < 2) {
      setAdminInfoErrorMessage(
        "Bank Account Number must be at least 2 characters long."
      );
      return;
    }

    // Handle admin info submission
    // ...

    setAdminInfoConfirmationMessage("Changes saved successfully.");
  };

  const handleSubmitPassword = (e) => {
    e.preventDefault();

    // Password validation
    if (passwordInfo.newPass !== passwordInfo.confirmNewPass) {
      setPasswordErrorMessage("Passwords do not match.");
      return;
    }

    // Handle password submission
    // ...

    setPasswordConfirmationMessage("Password updated successfully.");
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

  return (
    <div className="admin-settings-page admin--page dashboard--page">
      <div className="header">
        <h3>
          Hello, {adminInfo.firstName} {adminInfo.lastName}
        </h3>
        <p>Update your personal information by changing the inputs below.</p>
      </div>
      <div className="main">
        <h3 className="upper">Settings</h3>

        {/* Admin Info */}
        <div className="content">
          <div className="header">
            <h4>Edit Admin Info</h4>
            <p>Fill in the inputs below to update your admin information.</p>
          </div>

          <form className="admin-info-form" onSubmit={handleSubmitAdminInfo}>
            <div className="my-profile-inputs">
              <div className="input-container">
                <label htmlFor="firstName">First Name</label>
                <input
                  type="text"
                  name="firstName"
                  id="firstName"
                  placeholder="First Name"
                  required
                  onChange={handleAdminInfoChange}
                  value={adminInfo.firstName}
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
                  onChange={handleAdminInfoChange}
                  value={adminInfo.lastName}
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
                  onChange={handleAdminInfoChange}
                  value={adminInfo.newUsername}
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
                  onChange={handleAdminInfoChange}
                  value={adminInfo.bankAccountNumber}
                />
              </div>
            </div>

            {adminInfoErrorMessage && (
              <p className="error-message">{adminInfoErrorMessage}</p>
            )}
            {adminInfoConfirmationMessage && (
              <p className="confirmation-message">
                {adminInfoConfirmationMessage}
              </p>
            )}

            <div className="input-container">
              <button type="submit">Save Changes</button>
            </div>
          </form>
        </div>

        {/* Password */}
        <div className="password">
          <div className="header">
            <h4>Security</h4>
            <p>Fill in the inputs below to change your password.</p>
          </div>
          <div className="security-inputs">
            <form onSubmit={handleSubmitPassword}>
              <div className="input-container">
                <label htmlFor="oldPass">Current Password</label>
                <div className="input-password">
                  <input
                    type={passInputType.oldPass}
                    name="oldPass"
                    id="oldPass"
                    placeholder="Current Password"
                    required
                    onChange={handlePasswordChange}
                    value={passwordInfo.oldPass}
                  />
                  {passwordInfo.oldPass && (
                    <button
                      className="show-password"
                      onClick={(e) => {
                        e.preventDefault();
                        togglePasswordInputType("oldPass");
                      }}
                    >
                      {showPass.oldPass ? "Hide" : "Show"}
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
                    onChange={handlePasswordChange}
                    value={passwordInfo.newPass}
                  />
                  {passwordInfo.newPass && (
                    <button
                      className="show-password"
                      onClick={(e) => {
                        e.preventDefault();
                        togglePasswordInputType("newPass");
                      }}
                    >
                      {showPass.newPass ? "Hide" : "Show"}
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
                    onChange={handlePasswordChange}
                    value={passwordInfo.confirmNewPass}
                  />
                  {passwordInfo.confirmNewPass && (
                    <button
                      className="show-password"
                      onClick={(e) => {
                        e.preventDefault();
                        togglePasswordInputType("confirmNewPass");
                      }}
                    >
                      {showPass.confirmNewPass ? "Hide" : "Show"}
                    </button>
                  )}
                </div>
              </div>

              {passwordErrorMessage && (
                <p className="error-message">{passwordErrorMessage}</p>
              )}
              {passwordConfirmationMessage && (
                <p className="confirmation-message">
                  {passwordConfirmationMessage}
                </p>
              )}

              <div className="input-container">
                <button type="submit">Save Changes</button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AdminSettings;
