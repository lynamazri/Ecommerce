import React, { useState } from "react";
import { AiFillEyeInvisible, AiFillEye, AiFillApple } from "react-icons/ai";
import { FaFacebook } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";
import "./Register.css";
import { Link, Navigate, useNavigate } from "react-router-dom";
import axios from "axios";
import Stepper from "react-stepper-horizontal";
import { useSelector } from "react-redux";

function Register() {
  const [passInputType, setPassInputType] = React.useState("password");
  const [showPass, setShowPass] = React.useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();
  const user = useSelector((state) => state.auth.user);
  const [step, setStep] = useState(1);
  const [formData, setFormData] = React.useState({
    username: "",
    firstName: "",
    lastName: "",
    email: "",
    address: "",
    city: "",
    state: "",
    zip: "",
    gender: "",
    birthDate: "",
    password: "",
  });

  const date = new Date();
  let day = date.getDate();
  let month = date.getMonth() + 1;
  let year = date.getFullYear();
  let currentDate = `${year}-${month}-${day}`;

  console.log(formData);

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

  //errors here

  const handleSubmit = async (event) => {
    event.preventDefault();
    console.log(formData);
    try {
      const response = await axios.post(
        "http://localhost:3001/auth/register",
        {
          username: formData.username,
          email: formData.email,
          password: formData.password,
          firstName: formData.firstName,
          lastName: formData.lastName,
          birthDate: formData.birthDate,
          gender: formData.gender,
          adresses: [
            {
              street: formData.address,
              city: formData.city,
              state: formData.state,
              zip: 0,
            },
          ],
        },
        {
          headers: { "Content-Type": "application/json" },
          withCredentials: true,
        }
      );
      console.log(response);
      navigate("/login", { replace: true });
    } catch (error) {
      console.log(error);
      setErrorMessage(error.response.data);
    }
  };

  const handleNext = () => {
    if (step < steps.length) {
      setStep(step + 1);
    } else {
      handleSubmit();
    }
  };

  const handleBack = () => {
    if (step > 0) {
      setStep(step - 1);
    } else {
      handleSubmit();
    }
  };

  const steps = [
    {
      title: <span className="stepTitle">Account details</span>,
      content: (
        <div className="registerInputs">
          <div>
            <input
              type="username"
              name="username"
              id="username"
              placeholder="Username"
              required
              onChange={handleChange}
              value={formData.username}
            />
          </div>
          <div>
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
          <div className="input-container input-password">
            <input
              type={passInputType}
              name="password"
              id="password"
              placeholder="Password"
              required
              onChange={handleChange}
              value={formData.password}
            />
            {formData.password ? (
              <button
                className="passwordInputType"
                onClick={togglePasswordInputType}
              >
                {showPass ? <AiFillEye /> : <AiFillEyeInvisible />}
              </button>
            ) : null}
          </div>
        </div>
      ),
    },
    {
      title: <span className="stepTitle">Personal details</span>,
      content: (
        <div className="registerInputs">
          <div className="input-container">
            <input
              type="firstName"
              name="firstName"
              id="firstName"
              placeholder="First name"
              required
              onChange={handleChange}
              value={formData.firstName}
            />
          </div>
          <div className="input-container">
            <input
              type="lastName"
              name="lastName"
              id="lastName"
              placeholder="Last name"
              required
              onChange={handleChange}
              value={formData.lastName}
            />
          </div>

          <div className="input-container date-container">
            <label htmlFor="birthDate">Birthdate :</label>

            <input
              type="date"
              id="birthDate"
              name="birthDate"
              value={formData.birthDate}
              min="1900-01-01"
              max="2005-12-31"
              required
              onChange={handleChange}
            />
          </div>
          <div className="input-container radio-container">
            <span>Gender :</span>
            <input
              type="radio"
              id="Female"
              name="gender"
              value="Female"
              checked={formData.gender === "Female"}
              onChange={handleChange}
              className="radio-input"
            />
            <label htmlFor="Female" className="radio-label">
              Female
            </label>
            <input
              type="radio"
              id="Male"
              name="gender"
              value="Male"
              checked={formData.gender === "Male"}
              onChange={handleChange}
              className="radio-input"
            />
            <label htmlFor="Male" className="radio-label">
              Male
            </label>
          </div>
        </div>
      ),
    },
    {
      title: <span className="stepTitle">Address</span>,
      content: (
        <div className="registerInputs">
          <div className="input-container">
            <input
              type="address"
              name="address"
              id="address"
              placeholder="Address"
              required
              onChange={handleChange}
              value={formData.address}
            />
          </div>
          <div className="input-container">
            <input
              type="city"
              name="city"
              id="city"
              placeholder="City"
              required
              onChange={handleChange}
              value={formData.city}
            />
          </div>
          <div className="input-container">
            <input
              type="state"
              name="state"
              id="state"
              placeholder="State"
              required
              onChange={handleChange}
              value={formData.state}
            />
          </div>
          <div className="input-container">
            <input
              type="zip"
              name="zip"
              id="zip"
              placeholder="ZIP code"
              required
              onChange={handleChange}
              value={formData.zip}
            />
          </div>
        </div>
      ),
    },
  ];

  const renderForm = (
    <form onSubmit={handleSubmit}>
      <div className="stepperContainer">
        <Stepper steps={steps} activeStep={step - 1} />
        {steps[step - 1].content}
        <div className="navButtonContainer">
          {step !== 1 && (
            <button className="navButton" onClick={handleBack}>
              Back
            </button>
          )}
          {step !== 3 && (
            <button className="navButton" onClick={handleNext}>
              Next
            </button>
          )}
        </div>
      </div>
      {step === 3 && (
        <div className="input-container">
          {errorMessage && <p className="error-message"> {errorMessage} </p>}
          <button className="register-button" type="submit" value="Submit">
            Register
          </button>
        </div>
      )}
      <div className="sign-up">
        <p>Or continue with</p>
        <div className="sign-up-options">
          <div className="sign-up-option facebook">
            <FaFacebook />
          </div>
          <div className="sign-up-option apple">
            <AiFillApple />
          </div>
          <div className="sign-up-option google">
            <FcGoogle />
          </div>
        </div>
      </div>
    </form>
  );

  function togglePasswordInputType(e) {
    e.preventDefault();
    setPassInputType((prevPassInputType) =>
      prevPassInputType === "password" ? "text" : "password"
    );
    setShowPass((prevShowPass) => !prevShowPass);
  }
  if (user) {
    return <Navigate to="/" />;
  }
  return (
    <>
      <Link to="/">
        <h1 className="register-logo">magaza</h1>
      </Link>
      <div className="registerApp">
        <div className="heroSection">
          <>
            <h3>Sign up to</h3>
            <p>magaza</p>
          </>
          <span>
            If you already have an account <br />
            You can <a href="/login">Login here !</a>
          </span>
          <img id="saly" src="./public/images/Saly.svg" />
        </div>
        <div className="register-form">
          <div className="register--title">
            <p>Sign Up</p>
          </div>
          {renderForm}
        </div>
      </div>
    </>
  );
}

export default Register;
