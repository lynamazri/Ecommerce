import React, { useState } from "react";
import { Link, useNavigate, Routes, Route } from "react-router-dom";
import { AiFillEyeInvisible, AiFillEye, AiFillApple } from "react-icons/ai";
import { FaFacebook } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";
import axios from "axios";
import "./Login.css";

function Login() {
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();

  const [formData, setFormData] = React.useState({
    uemail: "",
    pass: "",
    //rememberMe: false,
  });

  console.log(formData);

  function handleChange(event) {
    const { name, value, type, checked } = event.target;
    setFormData((prevFormData) => {
      return {
        ...prevFormData,
        [name]: type === "checkbox" ? checked : value,
      };
    });
  }

  const handleSubmit = async (event) => {
    event.preventDefault();
    console.log(formData);
    try {
      const response = await axios.post("http://localhost:3001/login", {
        email: formData.uemail,
        password: formData.pass,
      });
      console.log(response);
      navigate("/", { replace: true });
    } catch (error) {
      console.log(error);
      setErrorMessage(error.response.data);
    }
  };

  const [passInputType, setPassInputType] = React.useState("password");
  const [showPass, setShowPass] = React.useState(false);

  function togglePasswordInputType(e) {
    e.preventDefault();
    setPassInputType((prevPassInputType) =>
      prevPassInputType === "password" ? "text" : "password"
    );
    setShowPass((prevShowPass) => !prevShowPass);
  }

  const renderForm = (
    <div className="form">
      <form onSubmit={handleSubmit}>
        <div className="inputs">
          <div className="input-container">
            {/* <label htmlFor="uemail">E-mail</label> */}
            <input
              type="email"
              name="uemail"
              id="uemail"
              placeholder="Email"
              required
              onChange={handleChange}
              value={formData.uemail}
            />
          </div>
          <div className="input-container input-password">
            {/* <label htmlFor="pass">Password </label> */}
            <input
              type={passInputType}
              name="pass"
              id="pass"
              placeholder="Password"
              required
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
        <div className="rememberMe-forgetPass">
          <div className="rememberMeContainer">
            <input
              type="checkbox"
              id="rememberMe"
              //checked={formData.rememberMe}
              //onChange={handleChange}
              name="rememberMe"
              //value={formData.rememberMe}
            />
            <label htmlFor="rememberMe" className="checkContainer">
              Remember Me?
            </label>
          </div>
          <span className="forgetPass">
            <a href="">Forgot Password ?</a>
          </span>
        </div>
        <div className="input-container">
          <button className="login-button" type="submit" value="Submit">
            Login
          </button>
        </div>
        {errorMessage && <p className="error"> {errorMessage} </p>}
      </form>

      <div className="sign-up">
        <p>Or login in with</p>
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
    </div>
  );

  return (
    <>
      <Link to="/">
        <h1 className="login-logo">magaza</h1>
      </Link>

      <div className="app">
        <div className="heroSection">
          <>
            <h3>Sign in to</h3>
            <p>magaza</p>
          </>
          <span>
            If you don’t have an account register <br />
            You can <a href="/register">Register here !</a>
          </span>
          <img id="saly" src="./public/images/Saly.svg" />
        </div>
        <div className="login-form">
          <div className="login--title">
            <p>Sign In</p>
          </div>
          {renderForm}
        </div>
      </div>
    </>
  );
}

export default Login;
