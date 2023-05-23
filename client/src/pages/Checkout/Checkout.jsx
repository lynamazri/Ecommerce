import React, { useState } from "react";
import UserNavbar from "../../components/UserNavbar/UserNavbar";
import Path from "../../components/Path/Path";
import Cart from "../../components/Cart/Cart";
import Footer from "../../components/Footer/Footer";
import "./Checkout.css";

function Checkout() {
  const [displayExistingAddress, setDisplayExistingAddress] = useState(false);
  const [enteredAddress, setEnteredAddress] = useState("");
  const [addressError, setAddressError] = useState("");
  const [selectedAddress, setSelectedAddress] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("");
  const [paymentError, setPaymentError] = useState("");
  const [termsAgreed, setTermsAgreed] = useState(false);
  const [checkoutError, setCheckoutError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [orderPlaced, setOrderPlaced] = useState(false);

  const existingAddresses = ["Address 1", "Address 2", "Address 3"];

  const handleExistingAddress = (event) => {
    setDisplayExistingAddress(event.target.checked);
    setSelectedAddress("");
    setAddressError("");
  };

  const handleAddressSelection = (event) => {
    setSelectedAddress(event.target.value);
  };

  const handleEnteredAddress = (event) => {
    const address = event.target.value;
    setEnteredAddress(address);
    validateAddress(address);
  };

  const validateAddress = (address) => {
    if (address.trim() === "") {
      setAddressError("Address is required.");
    } else if (address.trim() === "") {
      setAddressError("Address is required.");
    } else {
      setAddressError("");
    }
  };

  const handlePaymentMethod = (event) => {
    const method = event.target.value;
    setPaymentMethod(method);
    validatePaymentMethod(method);
  };

  const validatePaymentMethod = (method) => {
    if (method === "") {
      setPaymentError("Please select a payment method.");
    } else {
      setPaymentError("");
    }
  };

  const handleTermsAgreement = (event) => {
    setTermsAgreed(event.target.checked);
  };

  const handleCheckout = (event) => {
    event.preventDefault();

    if (!isFormValid()) {
      setCheckoutError("Please complete all required fields.");
      return;
    } else {
      setSuccessMessage("Your order has been placed successfully!");
      setCheckoutError("");
    }

    // Simulating order placement with a timeout
    // Replace this with your actual order placement logic
    setOrderPlaced(true);
    setTimeout(() => {
      setOrderPlaced(false);
      // Reset the form or navigate to the success page
    }, 3000);
  };

  const isFormValid = () => {
    if (displayExistingAddress) {
      return (
        selectedAddress !== "" &&
        paymentMethod !== "" &&
        termsAgreed &&
        !addressError &&
        !paymentError
      );
    } else {
      return (
        enteredAddress.trim() !== "" &&
        paymentMethod !== "" &&
        termsAgreed &&
        !addressError &&
        !paymentError
      );
    }
  };

  return (
    <div>
      <UserNavbar />
      <Path />
      <div className="checkout-page">
        <form className="left-container" onSubmit={handleCheckout}>
          <div className="shipping-info">
            <div className="header">
              <h3>Shipping Address</h3>
              <div className="lower-part">
                <p>Please enter your billing info</p>
                <p>Step 1 of 3</p>
              </div>
            </div>
            <div className="body">
              {(!existingAddresses.length || !displayExistingAddress) && (
                <>
                  <label className="label-checkout" htmlFor="entered-address">
                    Enter your address:
                  </label>
                  <input
                    id="entered-address"
                    className="input-checkout"
                    type="text"
                    placeholder="Enter your address"
                    value={enteredAddress}
                    onChange={handleEnteredAddress}
                  />
                  {addressError && (
                    <p className="error-message">{addressError}</p>
                  )}
                </>
              )}
              {existingAddresses.length ? (
                <>
                  <label className="label-checkout">
                    <input
                      type="checkbox"
                      name="existing-address"
                      id="existing-address"
                      onChange={handleExistingAddress}
                    />
                    Use existing address
                  </label>
                  {displayExistingAddress && (
                    <div role="group" aria-labelledby="existing-address">
                      {existingAddresses.map((address) => (
                        <label className="label-checkout" key={address}>
                          <input
                            type="radio"
                            name="selected-address"
                            value={address}
                            checked={selectedAddress === address}
                            onChange={handleAddressSelection}
                          />
                          {address}
                        </label>
                      ))}
                      {addressError && (
                        <p className="error-message">{addressError}</p>
                      )}
                    </div>
                  )}
                </>
              ) : (
                <>
                  <p>No existing addresses available.</p>
                </>
              )}
            </div>
          </div>

          <div className="payment-method">
            <div className="header">
              <h3>Payment method</h3>
              <div className="lower-part">
                <p>Please enter your payment method</p>
                <p>Step 2 of 3</p>
              </div>
            </div>
            <div className="body">
              <label className="payment-option" htmlFor="magaza-coin">
                <input
                  type="radio"
                  id="magaza-coin"
                  name="payment-option"
                  value="MagazaCoin"
                  onChange={handlePaymentMethod}
                />
                MagazaCoin
              </label>
              <label className="payment-option" htmlFor="on-delivery">
                <input
                  type="radio"
                  id="on-delivery"
                  name="payment-option"
                  value="on-delivery"
                  onChange={handlePaymentMethod}
                />
                Payment on delivery
              </label>
              {paymentError && (
                <p className="error-message" role="alert">
                  {paymentError}
                </p>
              )}
            </div>
          </div>

          <div className="confirmation">
            <div className="header">
              <h3>Confirmation</h3>
              <div className="lower-part">
                <p>We're almost done. Just a few more clicks!</p>
                <p>Step 3 of 3</p>
              </div>
            </div>
            <div className="body">
              <label className="label-checkout">
                <input
                  type="checkbox"
                  name="privacy-policy"
                  onChange={handleTermsAgreement}
                />
                I agree to the terms and conditions and privacy policy.
              </label>
              {orderPlaced ? (
                <button className="order-button" disabled>
                  Complete order
                </button>
              ) : (
                <button className="order-button" type="submit">
                  Complete order
                </button>
              )}

              {checkoutError && (
                <p className="error-message">{checkoutError}</p>
              )}
              {orderPlaced && (
                <p className="success-message">{successMessage}</p>
              )}
            </div>
          </div>
        </form>

        <div className="right-container">
          <Cart isCheckoutPage={true} />
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default Checkout;
