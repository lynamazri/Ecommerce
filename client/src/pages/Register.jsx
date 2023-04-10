import React, { useState } from "react";

function Register() {
  //const [errorMessages, setErrorMessages] = useState({});

  const [formData, setFormData] = React.useState({
    username: "",
    firstName: "",
    lastName: "",
    phoneNumber: "",
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
  }

  //errors here

  const handleSubmit = (event) => {
    event.preventDefault();
    //rest of logic
  };

  const renderErrorMessage = (name) =>
    name === errorMessages.name && (
      <div className="error">{errorMessages.message}</div>
    );

  const renderForm = (
    <div>
      <form onSubmit={handleSubmit}>
        <h2>Personal information</h2>
        <div>
          <div>
            <label htmlFor="firstName">First Name</label>
            <input
              type="firstName"
              name="firstName"
              id="firstName"
              required
              onChange={handleChange}
              value={formData.firstName}
            />
          </div>
          <div>
            <label htmlFor="lastName">Last Name</label>
            <input
              type="lastName"
              name="lastName"
              id="lastName"
              required
              onChange={handleChange}
              value={formData.lastName}
            />
          </div>

          <div>
            <label for="birthDate">Birthate</label>

            <input
              type="date"
              id="birthDate"
              name="birthDate"
              value={formData.birthDate}
              min="1900-01-01"
              max="2005-12-31"
              required
              onChange={handleChange}
            ></input>
          </div>
          <fieldset>
            <legend>Gender</legend>

            <input
              type="radio"
              id="Female"
              name="gender"
              value="Female"
              checked={formData.gender === "Female"}
              onChange={handleChange}
            />
            <label htmlFor="Female">Female</label>
            <br />

            <input
              type="radio"
              id="Male"
              name="gender"
              value="Male"
              checked={formData.gender === "Male"}
              onChange={handleChange}
            />
            <label htmlFor="Male">Male</label>
            <br />
          </fieldset>
        </div>
        <h2>Login information</h2>
        <div>
          <div>
            <label htmlFor="username">Username</label>
            <input
              type="username"
              name="username"
              id="username"
              required
              onChange={handleChange}
              value={formData.username}
            />
          </div>
          <div>
            <label htmlFor="email">E-mail</label>
            <input
              type="email"
              name="email"
              id="email"
              required
              onChange={handleChange}
              value={formData.email}
            />
          </div>
          <div>
            <label htmlFor="password">Password</label>
            <input
              type="password"
              name="password"
              id="password"
              required
              onChange={handleChange}
              value={formData.password}
            />
          </div>
        </div>
        <h2>Mailing information</h2>
        <div>
          <div>
            <label htmlFor="address">Address</label>
            <input
              type="address"
              name="address"
              id="address"
              required
              onChange={handleChange}
              value={formData.address}
            />
          </div>
          <div>
            {<label htmlFor="city">City</label>}
            <input
              type="city"
              name="city"
              id="city"
              required
              onChange={handleChange}
              value={formData.city}
            />
          </div>
          <div>
            {<label htmlFor="state">State</label>}
            <input
              type="state"
              name="state"
              id="state"
              required
              onChange={handleChange}
              value={formData.state}
            />
          </div>
          <div>
            {<label htmlFor="zip">Zip Code</label>}
            <input
              type="zip"
              name="zip"
              id="zip"
              required
              onChange={handleChange}
              value={formData.zip}
            />
          </div>
        </div>
        <button type="submit" value="Submit">
          Sign-up
        </button>
      </form>
    </div>
  );

  return (
    <div>
      <h1>Sign-up</h1>
      {renderForm}
    </div>
  );
}

export default Register;
