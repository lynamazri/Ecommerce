import React, { useState } from "react";
import "./Checkout.css";
import UserNavbar from "../../components/UserNavbar/UserNavbar";
import Path from "../../components/Path/Path";
import Cart from "../../components/Cart/Cart";
import Footer from "../../components/Footer/Footer";

function Checkout() {
  const [displayExistingAddress, setDisplayExistingAddress] = useState(false);

  const handleExistingAddress = (event) => {
    setDisplayExistingAddress(event.target.checked);
  };

  return (
    <div>
      <UserNavbar />
      <Path />
      <div className="checkout">
        <div className="left-container">
          <div className="shipping-info">
            <div className="header">
              <h3>Shipping Address</h3>
              <div className="lower-part">
                <p>Please enter your billing info</p>
                <p>Step 1 of 5</p>
              </div>
            </div>
            <div className="body">
              <input
                className="input"
                type="text"
                placeholder="Enter your address"
              />
              <label className="checkout">
                <input
                  type="checkbox"
                  name="existing-address"
                  onChange={handleExistingAddress}
                />
                Use existing address
              </label>
              {displayExistingAddress && (
                <input
                  className="input"
                  type="text"
                  placeholder="Enter your address"
                />
              )}
            </div>
          </div>

          <div className="payment-method">
            <div className="header">
              <h3>Payment method</h3>
              <div className="lower-part">
                <p>Please enter your payment method</p>
                <p>Step 2 of 5</p>
              </div>
            </div>
            <div className="body"></div>
          </div>

          <div className="confirmation"></div>
          <div className="header">
            <h3>Confirmation</h3>
            <div className="lower-part">
              <p>
                We are getting to the end. Just few clicks and your order si
                ready!
              </p>
              <p>Step 3 of 5</p>
            </div>
          </div>

          <div className="body">
            <label>
              <input
                type="checkbox"
                name="existing-address"
                onChange={handleExistingAddress}
              />
              I agree with our terms and conditions and privacy policy.
            </label>
            <button className="order-button">Complete order</button>
          </div>
        </div>

        <div className="right-container">
          <Cart isCheckoutPage />
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default Checkout;
