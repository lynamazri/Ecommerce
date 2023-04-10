import React, { useState } from "react";

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

  const renderForm = (
    <div className="form">
      <form onSubmit={handleSubmit}>
        <div className="input-container">
          <label htmlFor="uemail">E-mail</label>
          <input
            type="email"
            name="uemail"
            id="uemail"
            placeholder="your-email@gmail.com"
            required
            onChange={handleChange}
            value={formData.uemail}
          />
          {renderErrorMessage("uemail")}
        </div>
        <div className="input-container">
          <label htmlFor="pass">Password </label>
          <input
            type="password"
            name="pass"
            id="pass"
            placeholder="Your password"
            required
            onChange={handleChange}
            value={formData.pass}
          />
          {renderErrorMessage("pass")}
        </div>
        <input
          type="checkbox"
          id="rememberMe"
          checked={formData.rememberMe}
          onChange={handleChange}
          name="rememberMe"
          value={formData.rememberMe}
        />
        <label htmlFor="rememberMe">Remember Me?</label>
        <a href="">Forgot Password</a>
        <div className="input-container">
          <button className="login-button" type="submit" value="Submit">
            Login
          </button>
        </div>
      </form>

      <div className="sign-up">
        <p>or</p>
        <a href="">Sign Up</a>
      </div>
    </div>
  );

  return (
    <div className="app">
      <div className="bg--image">
        <img src="/" alt="Login Image." />
      </div>

      <div className="login-form">
        <div className="login--title">Login to magaza</div>
        {renderForm}
      </div>
    </div>
  );
}

export default Login;
