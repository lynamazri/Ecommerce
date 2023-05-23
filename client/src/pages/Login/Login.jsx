import React, { useState } from "react";
import { Link, useNavigate, Routes, Route, Navigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setCredentials } from "../../redux/Slices/authSlice";
import { useLoginMutation } from "../../redux/Slices/authApiSlice";
import { AiFillEyeInvisible, AiFillEye, AiFillApple } from "react-icons/ai";
import { FaFacebook } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";
import usePersist from "../../hooks/usePersist";
import "./Login.css";

function Login() {
  const [errorMessage, setErrorMessage] = useState("");
  const user = useSelector((state) => state.auth.user);
  const navigate = useNavigate();
  const [login, { isLoading }] = useLoginMutation();
  const dispatch = useDispatch();
  //const [persist, setPersist] = usePersist();

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

  //const handleToggle = () => setPersist((prev) => !prev);

  const handleSubmit = async (event) => {
    event.preventDefault();
    console.log(formData);

    try {
      const { accessToken, user } = await login({
        email: formData.uemail,
        password: formData.pass,
      }).unwrap();
      dispatch(setCredentials({ accessToken, user }));
      setFormData({
        uemail: "",
        pass: "",
      });
      navigate("/", { replace: true });
    } catch (error) {
      console.log(error);
      setErrorMessage(error.data);
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

  const renderForm = isLoading ? (
    <h1>Loading...</h1>
  ) : (
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
              id="persist"
              //checked={persist}
              //onChange={handleToggle}
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
  if (user) {
    return <Navigate to="/" />;
  }
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
