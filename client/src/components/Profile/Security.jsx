import React, { useState, useEffect } from "react";
import axios from "axios";
import { AiFillEyeInvisible, AiFillEye } from "react-icons/ai";
import { usePatchPasswordMutation } from "../../redux/Slices/apiSlice";

function Security() {
  const [formData, setFormData] = useState({
    oldPass: "",
    newPass: "",
    confirmNewPass: "",
  });
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
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
  var user = localStorage.getItem("user")
    ? JSON.parse(localStorage.getItem("user"))
    : null;
  function togglePasswordInputType(name) {
    setPassInputType((prevPassInputType) => ({
      ...prevPassInputType,
      [name]: prevPassInputType[name] === "password" ? "text" : "password",
    }));
    setShowPass((prevShowPass) => ({
      ...prevShowPass,
      [name]: !prevShowPass[name],
    }));
  }

  function handleChange(event) {
    const { name, value } = event.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  }

  const validateForm = () => {
    if (!formData.oldPass || !formData.newPass || !formData.confirmNewPass) {
      setErrorMessage("Please fill in all the required fields.");
      setSuccessMessage("");
      return false;
    }
    if (formData.newPass !== formData.confirmNewPass) {
      setErrorMessage("Passwords do not match.");
      setSuccessMessage("");
      return false;
    }

    return true;
  };
  useEffect(() => {
    if (successMessage || errorMessage) {
      const timer = setTimeout(() => {
        setSuccessMessage("");
        setErrorMessage("");
      }, 5000);

      return () => clearTimeout(timer);
    }
  }, [successMessage, errorMessage]);

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!validateForm()) {
      return;
    }
    updatePassword({
      curPassword: formData.oldPass,
      newPassword: formData.newPass,
      userId: user.userId,
    })
      .unwrap() // Extract the response data
      .then(() => {
        // Handle successful update
        setSuccessMessage("Changes saved successfully.");
        setFormData({
          oldPass: "",
          newPass: "",
          confirmNewPass: "",
        });
      })
      .catch(() => {
        // Handle error
        setErrorMessage("Error");
      });
  };

  return (
    <form className="right-container" onSubmit={handleSubmit}>
      <div className="security-page">
        <div className="header">
          <h3>Security</h3>
          <p>Fill in the inputs below to change your password</p>
        </div>
        {/* Input fields */}
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
                  {showPass.oldPass ? <AiFillEye /> : <AiFillEyeInvisible />}
                </button>
              )}
            </div>
          </div>
          <div className="input-container ">
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
                  {showPass.newPass ? <AiFillEye /> : <AiFillEyeInvisible />}
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

        {/* Error and success messages */}
        {errorMessage && <p className="error-message">{errorMessage}</p>}
        {successMessage && <p className="success-message">{successMessage}</p>}

        {/* Submit button */}
        <div className="input-container">
          <button type="submit" value="Submit">
            Update Password
          </button>
        </div>

        {/* Two-Factor Authentication */}
        {/* <div className="input-container tfa-container">
          <label htmlFor="twoFactorCode">Two-Factor Authentication Code</label>
          <input
            type="text"
            name="twoFactorCode"
            id="twoFactorCode"
            placeholder="Enter your code"
            onChange={handleChange}
          />
        </div> */}
      </div>
    </form>
  );
}

export default Security;
