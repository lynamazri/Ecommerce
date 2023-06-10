import React, { useState, useEffect } from "react";
import { AiFillEyeInvisible, AiFillEye } from "react-icons/ai";
import {
  useUpdateAdminPasswordMutation,
  useUpdateAdminProfileMutation,
  useGetCouponsQuery,
  useCreateCouponMutation,
} from "../../redux/Slices/apiSlice";
import { updateUser } from "../../redux/Slices/authSlice";
import { useDispatch } from "react-redux";
// import { useNavigate } from "react-router-dom";
// import { logOut } from "../../redux/Slices/authSlice";

function AdminSettings() {
  const dispatch = useDispatch();
  // const navigate = useNavigate();
  const [adminInfo, setAdminInfo] = useState({
    firstName: "",
    lastName: "",
    newUsername: "",
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
  const [coupon, setCoupon] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [successPasswordMessage, setPasswordSuccessMessage] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [percentage, setPercentage] = useState("");
  const [couponError, setCouponError] = useState("");
  const [percentageError, setPercentageError] = useState("");
  const [updatePassword] = useUpdateAdminPasswordMutation();
  const [patchProfile] = useUpdateAdminProfileMutation();
  const [createCoupon] = useCreateCouponMutation();
  var user = localStorage.getItem("user")
    ? JSON.parse(localStorage.getItem("user"))
    : null;

  const handleAdminInfoChange = (e) => {
    setAdminInfo({ ...adminInfo, [e.target.name]: e.target.value });
    console.log(adminInfo);
  };

  const handlePasswordChange = (e) => {
    setPasswordInfo({ ...passwordInfo, [e.target.name]: e.target.value });
    console.log(passwordInfo);
  };

  const handleSubmitAdminInfo = (e) => {
    e.preventDefault();
    setAdminInfoConfirmationMessage("");
    // Admin info validation
    if (adminInfo.firstName && adminInfo.firstName.length < 2) {
      setAdminInfoErrorMessage(
        "First Name must be at least 2 characters long."
      );
      return;
    }

    if (adminInfo.lastName && adminInfo.lastName.length < 2) {
      setAdminInfoErrorMessage("Last Name must be at least 2 characters long.");
      return;
    }

    if (adminInfo.newUsername && adminInfo.newUsername.length < 2) {
      setAdminInfoErrorMessage("Username must be at least 2 characters long.");
      return;
    }

    patchProfile({
      newUsername: adminInfo.newUsername,
      firstName: adminInfo.firstName,
      lastName: adminInfo.lastName,
      user: user.adminId,
    })
      .unwrap() // Extract the response data
      .then(() => {
        // Handle successful update
        setAdminInfoConfirmationMessage("Changes saved successfully.");
        /*  dispatch(
          updateUser({
            user: {
              ...user,
              username: adminInfo.newUsername,
              firstName: adminInfo.firstName,
              lastName: adminInfo.lastName,
            },
          })
        );
        const updatedUser = authState.user; */
      });
  };

  const handleSubmitPassword = (e) => {
    e.preventDefault();
    setPasswordConfirmationMessage("");
    // Password validation
    if (passwordInfo.newPass !== passwordInfo.confirmNewPass) {
      setPasswordErrorMessage("Passwords do not match.");
      return;
    }

    console.log(passwordInfo.oldPass, passwordInfo.newPass);

    updatePassword({
      curPassword: passwordInfo.oldPass,
      newPassword: passwordInfo.newPass,
      user: user.adminId,
    })
      .unwrap() // Extract the response data
      .then(() => {
        // Handle successful update
        setPasswordConfirmationMessage("Password updated successfully.");
        setPasswordInfo({
          oldPass: "",
          newPass: "",
          confirmNewPass: "",
        });
        //dispatch(logOut());
        //navigate("/login");
      })
      .catch((error) => {
        // Handle error
        console.log(error);
      });
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

  const [coupons, setCoupons] = useState([]);
  const { data: couponsData, isLoading } = useGetCouponsQuery();

  useEffect(() => {
    if (couponsData) {
      setCoupons(couponsData);
    }
  }, [couponsData]);

  console.log(coupons);

  const handleCreateCoupon = () => {
    // Clear previous error messages
    setCouponError("");
    setPercentageError("");
    setSuccessMessage("");

    // Validate coupon code
    if (coupon.trim() === "") {
      setCouponError("Coupon code is required");
      return;
    }

    const couponPattern = /^[A-Za-z]{4}-[A-Za-z]{4}-[A-Za-z]{4}$/;
    if (!coupon.match(couponPattern)) {
      setCouponError("Coupon code should be in the format XXXX-XXXX-XXXX");
      return;
    }

    // Validate percentage
    const parsedPercentage = parseInt(percentage);
    if (isNaN(parsedPercentage)) {
      setPercentageError("Percentage must be a number");
      return;
    }

    if (parsedPercentage < 0 || parsedPercentage > 100) {
      setPercentageError("Percentage must be between 0 and 100");
      return;
    }

    createCoupon({
      percentage: percentage,
      end: endDate,
      code: coupon,
    })
      .unwrap() // Extract the response data
      .then(() => {
        // Handle successful update
        setSuccessMessage("Coupon success!");
        setCoupon("");
        setStartDate("");
        setEndDate("");
        setPercentage("");
      })
      .catch((error) => {
        // Handle error
        //setCheckoutError("Failed to complete order. Please try again.");
      });

    //setSuccessMessage("Coupon success!");
  };
  return (
    <div className="admin-settings-page admin--page dashboard--page">
      <div className="header">
        <h2>Hello, Admin</h2>
        <p>Update your personal information by changing the inputs below.</p>
      </div>
      <div className="main">
        <h3 className="upper">Settings</h3>

        {/* Admin Info */}
        <div className="content">
          <div className="admin-info">
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
                    onChange={handleAdminInfoChange}
                    value={adminInfo.newUsername}
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
          <div className="admin-password">
            <div className="header">
              <h4>Edit Password</h4>
              <p>Fill in the inputs below to change your password.</p>
            </div>
            <form
              className="admin-security-inputs"
              onSubmit={handleSubmitPassword}
            >
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
          <div className="coupon">
            <h4>Manage Coupon Codes</h4>
            <div className="create-coupon">
              <div className="header">
                <h4>Add Coupon Code</h4>
                <p>Fill in the inputs below to create a coupon.</p>
              </div>
              <div className="input-container">
                <label htmlFor="coupon">Coupon</label>
                <input
                  type="text"
                  name="coupon"
                  id="coupon"
                  placeholder="XXXX-XXXX-XXXX"
                  value={coupon}
                  onChange={(event) => setCoupon(event.target.value)}
                />
                {couponError && (
                  <span className="error-message">{couponError}</span>
                )}
              </div>

              <div className="input-container">
                <label htmlFor="endDate">End Date</label>
                <input
                  type="date"
                  name="endDate"
                  id="endDate"
                  value={endDate}
                  onChange={(event) => setEndDate(event.target.value)}
                />
              </div>
              <div className="input-container">
                <label htmlFor="percentage">Percentage</label>
                <input
                  type="number"
                  name="percentage"
                  id="percentage"
                  placeholder="Enter percentage"
                  value={percentage}
                  onChange={(event) => setPercentage(event.target.value)}
                />
                {percentageError && (
                  <span className="error-message">{percentageError}</span>
                )}
              </div>
              <div className="input-container">
                <button type="submit" onClick={handleCreateCoupon}>
                  Create Coupon
                </button>
                {successMessage && (
                  <p className="success-message">{successMessage}</p>
                )}
              </div>
            </div>
            <div className="display-coupons">
              <h4>Existing Coupons</h4>
              <div className="coupon-cards">
                {coupons.map((coupon) => (
                  <div key={coupon.code} className="coupon-card">
                    <h5>{coupon.code}</h5>
                    <p>
                      <strong>Start Date:</strong>{" "}
                      {coupon.dateStart.slice(0, 10)}
                    </p>
                    <p>
                      <strong>End Date:</strong> {coupon.dataEnd.slice(0, 10)}
                    </p>
                    <p>
                      <strong>Percentage:</strong> {coupon.percentage}%
                    </p>
                  </div>
                ))}
              </div>
            </div>{" "}
          </div>{" "}
        </div>
      </div>
    </div>
  );
}

export default AdminSettings;
