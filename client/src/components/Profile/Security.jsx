import React, { useState } from "react";
import axios from "axios";
import { AiFillEyeInvisible, AiFillEye } from "react-icons/ai";

function Security() {
  const [formData, setFormData] = useState({
    oldPass: "",
    newPass: "",
    confirmNewPass: "",
  });
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [passInputType, setPassInputType] = React.useState({
    oldPass: "password",
    newPass: "password",
    confirmNewPass: "password",
  });
  const [showPass, setShowPass] = React.useState({
    oldPass: false,
    newPass: false,
    confirmNewPass: false,
  });
  const [isTwoFactorEnabled, setTwoFactorEnabled] = useState(false);

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

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (formData.newPass !== formData.confirmNewPass) {
      setErrorMessage("Passwords do not match");
      return;
    }

    try {
      const response = await axios.post(
        "http://localhost:3001/profile/edit/changepass",
        {
          curPassword: formData.oldPass,
          newPassword: formData.newPass,
        }
      );
      console.log(response);
      setSuccessMessage("Password updated successfully");
      setErrorMessage("");
      //navigate("/", { replace: true });
    } catch (error) {
      console.log(error);
      setErrorMessage(error.response.data);
      setSuccessMessage("");
    }
  };

  return (
    <form className="right-container" onSubmit={handleSubmit}>
      <div className="security-page">
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
                  onClick={() => togglePasswordInputType("oldPass")}
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
                  onClick={() => togglePasswordInputType("newPass")}
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
                  onClick={() => togglePasswordInputType("confirmNewPass")}
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
        {errorMessage && <p className="error">{errorMessage}</p>}
        {successMessage && <p className="success">{successMessage}</p>}

        {/* Submit button */}
        <div className="input-container">
          <button type="submit" value="Submit">
            Update Password
          </button>
        </div>

        {/* Two-Factor Authentication */}
        <div className="input-container tfa-container">
          <label htmlFor="twoFactorCode">Two-Factor Authentication Code</label>
          <input
            type="text"
            name="twoFactorCode"
            id="twoFactorCode"
            placeholder="Enter your code"
            // required
            onChange={handleChange}
            // value={formData.twoFactorCode}
          />
        </div>
      </div>
    </form>
  );
}

export default Security;
