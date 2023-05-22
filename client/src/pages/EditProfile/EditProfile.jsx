import React, { useState } from "react";
import axios from "axios";
import { AiFillEyeInvisible, AiFillEye, AiFillApple } from "react-icons/ai";
import UserNavbar from "../../components/UserNavbar/UserNavbar";
import Path from "../../components/Path/Path";
import "../EditProfile/EditProfile.css";

function EditProfile() {
  const [formData, setFormData] = React.useState({
    oldPass: "",
    newPass: "",
  });
  const [errorMessage, setErrorMessage] = useState("");
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
    console.log(formData);
  }
  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await axios.post(
        "http://localhost:3001/profile/edit/changepass",
        {
          curPassword: formData.oldPass,
          newPassword: formData.newPass,
        }
      );
      console.log(response);
      //navigate("/", { replace: true });
    } catch (error) {
      console.log(error);
      setErrorMessage(error.response.data);
    }
  };

  // const renderForm = (
  //   <div className="form">
  //     <form onSubmit={handleSubmit}>
  //       <div className="inputs">
  //         <div className="input-container">
  //           <input
  //             type="text"
  //             name="username"
  //             id="username"
  //             placeholder="Username"
  //             onChange={handleChange}
  //             value={formData.username}
  //           />
  //         </div>
  //         <div className="input-container">
  //           <input
  //             type="text"
  //             name="firstName"
  //             id="firstName"
  //             placeholder="First Name"
  //             onChange={handleChange}
  //             value={formData.firstName}
  //           />
  //         </div>
  //         <div className="input-container">
  //           <input
  //             type="text"
  //             name="lastName"
  //             id="lastName"
  //             placeholder="Last Name"
  //             onChange={handleChange}
  //             value={formData.lastName}
  //           />
  //         </div>

  //         <div className="input-container">
  //           <input
  //             type="email"
  //             name="email"
  //             id="email"
  //             placeholder="Email"
  //             onChange={handleChange}
  //             value={formData.email}
  //           />
  //         </div>
  //         <div className="input-container input-password">
  //           {/* <label htmlFor="pass">Password </label> */}
  //           <input
  //             type={passInputType}
  //             name="pass"
  //             id="pass"
  //             placeholder="Password"
  //             onChange={handleChange}
  //             value={formData.pass}
  //           />
  //           {formData.pass ? (
  //             <button
  //               className="passwordInputType"
  //               onClick={togglePasswordInputType}
  //             >
  //               {showPass ? <AiFillEye /> : <AiFillEyeInvisible />}
  //             </button>
  //           ) : null}
  //         </div>
  //       </div>

  //       <div className="input-container">
  //         <button className="login-button" type="submit" value="Submit">
  //           Save Changes
  //         </button>
  //       </div>
  //     </form>
  //   </div>
  // );

  const renderForm = (
    <div className="form">
      <form onSubmit={handleSubmit}>
        <div className="inputs">
          <div className="input-container input-password">
            {/* <label htmlFor="uemail">E-mail</label> */}
            <input
              type={passInputType}
              name="oldPass"
              id="oldPass"
              placeholder="Current Password"
              required
              onChange={handleChange}
              value={formData.oldPass}
            />
            {formData.oldPass ? (
              <button
                className="passwordInputType"
                onClick={togglePasswordInputType}
              >
                {showPass ? <AiFillEye /> : <AiFillEyeInvisible />}
              </button>
            ) : null}
          </div>
          <div className="input-container input-password">
            {/* <label htmlFor="pass">Password </label> */}
            <input
              type={passInputType}
              name="newPass"
              id="newPass"
              placeholder="New Password"
              required
              onChange={handleChange}
              value={formData.newPass}
            />
            {formData.newPass ? (
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
            Update Password
          </button>
          {errorMessage && <p className="error"> {errorMessage} </p>}
        </div>
      </form>
    </div>
  );

  return (
    <>
      <UserNavbar />
      <Path />
      <div className="profile-page">
        <div className="left-container">
          <ul className="sidebar">
            <li className="sidebar-item">Manage My Account</li>
            <ul className="subheadings">
              <li>My Profile </li>
              <li>Address Book</li>
              <li>Payment Methods</li>
            </ul>
            <li className="sidebar-item">Order History</li>
            <ul className="subheadings">
              <li>Orders</li>
              <li>Cancelations</li>
              <li>Returns</li>
            </ul>
            <li className="sidebar-item">My Settings</li>
            <ul className="subheadings">
              <li>Language</li>
              <li>Security (Password Change)</li>
              <li>Two-Factor Authentication</li>
            </ul>
            <li className="sidebar-item">Help & Feedback</li>
          </ul>
        </div>

        <div className="right-container">
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
        </div>
      </div>
    </>
  );
}

export default EditProfile;
