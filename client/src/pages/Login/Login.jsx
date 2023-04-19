import React, { useState } from "react";
import "./Login.css";

function Login() {
  const [errorMessages, setErrorMessages] = useState({});

  const [formData, setFormData] = React.useState({
    uemail: "",
    pass: "",
    rememberMe: false,
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

  const errors = {
    uemail: "invalid email",
    pass: "invalid password",
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    //rest of logic
  };

  const renderErrorMessage = (name) =>
    name === errorMessages.name && (
      <div className="error">{errorMessages.message}</div>
  );

      const [passInputType, setPassInputType] = React.useState("password")
      const [showPass, setShowPass] = React.useState("show")

      function togglePasswordInputType(e){
        e.preventDefault()
        setPassInputType(prevPassInputType => prevPassInputType === "password" ? "text" : "password")
        setShowPass(prevShowPass => prevShowPass === "show" ? "hide" : "show")
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
            {renderErrorMessage("uemail")}
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
            {formData.pass ? <button 
            className="passwordInputType"
            onClick={togglePasswordInputType}
            >
              {showPass}
            </button> : null}
            {renderErrorMessage("pass")}
          </div>
        </div>
        <label htmlFor="rememberMe" className="checkContainer">Remember Me?
          <input
            type="checkbox"
            id="rememberMe"
            checked={formData.rememberMe}
            onChange={handleChange}
            name="rememberMe"
            value={formData.rememberMe}
          />
          <span className="checkmark"></span>
        </label> <br />
        <span className="forgetPass"><a href="">Forgot Password</a></span>
        <div className="input-container">
          <button className="login-button" type="submit" value="Submit">
            Login
          </button>
        </div>
      </form>

      <div className="sign-up">
        <p>- Or login in with -</p>
        <div className="sign-up-options">
          <div className="sign-up-option"></div>
          <div className="sign-up-option"></div>
          <div className="sign-up-option"></div>
        </div>
        <p>Don't have an account? <a href="">Sign Up</a></p>
      </div>
    </div>
  );

  return (
    <div className="bzbz">
      <div className="app">
      {/* <div className="bg--image">
        <img src="/" alt="Login Image." />
      </div> */}

      <div className="login-card">
        <div className="login-form">
          <div className="login--title">
            <h2>Agent Login</h2>
            <p>Hey, enter your details to sign into your account</p>
            </div>
          {renderForm}
        </div>
      </div>
    </div>
    </div>
  );
}

export default Login;
