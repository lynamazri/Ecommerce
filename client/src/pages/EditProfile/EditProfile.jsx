import React, { useState } from "react";
import UserNavbar from "../../components/UserNavbar/UserNavbar";
import "../Register/Register.css";
import { AiFillEyeInvisible, AiFillEye, AiFillApple } from "react-icons/ai";
import axios from "axios";

function EditProfile() {
  const [formData, setFormData] = React.useState({
    username: "",
    firstName: "",
    lastName: "",
    email: "",
    address: "",
    city: "",
    state: "",
    zip: "",
    pass: "",
  });
  const [passInputType, setPassInputType] = React.useState("password");
  const [showPass, setShowPass] = React.useState(false);

  function togglePasswordInputType(e) {
    e.preventDefault();
    setPassInputType((prevPassInputType) =>
      prevPassInputType === "password" ? "text" : "password"
    );
    setShowPass((prevShowPass) => !prevShowPass);
  }

  function handleChange(event) {
    const { name, value, type, checked } = event.target;
    setFormData((prevFormData) => {
      return {
        ...prevFormData,
        [name]: type === "checkbox" ? checked : value,
      };
    });
  }
  const handleSubmit = (event) => {};

  const renderForm = (
    <div className="form">
      <form onSubmit={handleSubmit}>
        <div className="inputs">
          <div className="input-container">
            <input
              type="text"
              name="username"
              id="username"
              placeholder="Username"
              onChange={handleChange}
              value={formData.username}
            />
          </div>
          <div className="input-container">
            <input
              type="text"
              name="firstName"
              id="firstName"
              placeholder="First Name"
              onChange={handleChange}
              value={formData.firstName}
            />
          </div>
          <div className="input-container">
            <input
              type="text"
              name="lastName"
              id="lastName"
              placeholder="Last Name"
              onChange={handleChange}
              value={formData.lastName}
            />
          </div>

          <div className="input-container">
            <input
              type="email"
              name="email"
              id="email"
              placeholder="Email"
              onChange={handleChange}
              value={formData.email}
            />
          </div>
          <div className="input-container input-password">
            {/* <label htmlFor="pass">Password </label> */}
            <input
              type={passInputType}
              name="pass"
              id="pass"
              placeholder="Password"
              onChange={handleChange}
              value={formData.pass}
            />
            {formData.pass ? (
              <button
                className="passwordInputType"
                onClick={togglePasswordInputType}
              >
                {showPass ? <AiFillEye /> : <AiFillEyeInvisible />}
              </button>
            ) : null}
          </div>
        </div>

        <div className="input-container">
          <button className="login-button" type="submit" value="Submit">
            Save Changes
          </button>
        </div>
      </form>
    </div>
  );

  return (
    <>
      <UserNavbar></UserNavbar>
      <div className="vertical-menu">
        <h2 className="menu-item">User Info</h2>
        <h2 className="menu-item">Shipping Addresses</h2>
        <h2 className="menu-item">Account Settings</h2>
        <h2 className="menu-item">Email Notifications</h2>
        <h2 className="menu-item">Help & Feedback</h2>
        <div className="logout">
          <button>logout</button>
        </div>
      </div>
      <div className="edit-user-info">
        <h1 className="menu-cur-title">User Info</h1>
        <img
          src="https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png"
          className="profile-pic"
          width={140}
        ></img>
        <span className="edit-pic">•••</span>
        {renderForm}
      </div>
    </>
  );
}

export default EditProfile;
