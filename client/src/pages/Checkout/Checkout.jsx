import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { useCreateOrderMutation } from "../../redux/Slices/apiSlice";
import { useGetAdressesQuery } from "../../redux/Slices/apiSlice";
import Navbar from "../../components/Navbar/Navbar";
import Path from "../../components/Path/Path";
import Cart from "../../components/Cart/Cart";
import Footer from "../../components/Footer/Footer";
import "./Checkout.css";

function Checkout() {
  const [displayExistingAddress, setDisplayExistingAddress] = useState(false);
  const [selectedAddress, setSelectedAddress] = useState("");
  const [street, setStreet] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [zipCode, setZipCode] = useState("");
  const [addressError, setAddressError] = useState("");
  const [streetError, setStreetError] = useState("");
  const [cityError, setCityError] = useState("");
  const [stateError, setStateError] = useState("");
  const [zipCodeError, setZipCodeError] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("");
  const [paymentError, setPaymentError] = useState("");
  const [termsAgreed, setTermsAgreed] = useState(false);
  const [checkoutError, setCheckoutError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [orderPlaced, setOrderPlaced] = useState(false);
  const [coupon, setCoupon] = useState("");
  const [createOrder] = useCreateOrderMutation();
  const [existingAddresses, setAddresses] = useState([]);

  var user = localStorage.getItem("user")
    ? JSON.parse(localStorage.getItem("user"))
    : null;
  const { data: addressesData, isLoading } = useGetAdressesQuery(user.userId);

  var total = localStorage.getItem("totalAmount")
    ? JSON.parse(localStorage.getItem("totalAmount"))
    : null;

  const cart = useSelector((state) => state.cart);
  const newCart = [];

  cart.cartItems.map((item) => {
    let line = {
      productId: item.productId,
      quantity: item.quantity,
      storeId: item.storeId,
    };

    newCart.push(line);

    console.log(item.productId);
    console.log(item.quantity);
    console.log(item.storeId);
  });

  useEffect(() => {
    if (addressesData) {
      setAddresses(addressesData);
    }
  }, [addressesData]);

  const handleExistingAddress = (event) => {
    setDisplayExistingAddress(event.target.checked);
    setStreet(""),
      setState(""),
      setCity(""),
      setZipCode(""),
      setSelectedAddress("");
    setAddressError("");
  };

  const handleAddressSelection = (event) => {
    setSelectedAddress(event.target.value);
    console.log(selectedAddress);
  };
  const handleStreetChange = (event) => {
    const street = event.target.value;
    setStreet(street);
    validateStreet(street, city, state, zipCode);
  };

  const handleCityChange = (event) => {
    const city = event.target.value;
    setCity(city);
    validateCity(city);
  };

  const handleStateChange = (event) => {
    const state = event.target.value;
    setState(state);
    validateState(state);
  };

  const handleZipCodeChange = (event) => {
    const zipCode = event.target.value;
    setZipCode(zipCode);
    validateZipCode(zipCode);
  };

  const validateStreet = (street) => {
    if (street.trim() === "") {
      setStreetError("Street is required.");
      return false;
    } else if (street.length < 5) {
      setStreetError("Address must be at least 5 characters long.");
      return false;
    } else {
      setStreetError("");
      return true;
    }
  };

  const validateCity = (city) => {
    if (city.trim() === "") {
      setCityError("City is required.");
      return false;
    } else if (city.length < 3) {
      setCityError("City must be at least 3 characters long.");
      return false;
    } else {
      setCityError("");
      return true;
    }
  };

  const validateState = (state) => {
    if (state.trim() === "") {
      setStateError("State is required.");
      return false;
    } else if (state.length < 2) {
      setStateError("State must be at least 2 characters long.");
      return false;
    } else {
      setStateError("");
      return true;
    }
  };

  const validateZipCode = (zipCode) => {
    if (zipCode.trim() === "") {
      setZipCodeError("ZIP Code is required.");
      return false;
    } else if (!/^\d{5}$/.test(zipCode)) {
      setZipCodeError("Zip code must be a 5-digit number.");
      return false;
    } else {
      setZipCodeError("");
      return true;
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

  const handleCouponChange = (event) => {
    setCoupon(event.target.value);
  };

  const handleCheckout = (event) => {
    event.preventDefault();

    if (!isFormValid()) {
      setCheckoutError("Please complete all required fields.");
      return;
    } else {
      createOrder({
        total: total,
        method: paymentMethod,
        cart: newCart,
        address: selectedAddress,
        coupon: coupon,
        street: street,
        city: city,
        state: state,
        zip: zipCode,
        user: user.userId,
      })
        .unwrap() // Extract the response data
        .then(() => {
          // Handle successful update
          setSuccessMessage("Your order has been placed successfully!");

          setStreet(""), setState(""), setCity(""), setZipCode("");
        })
        .catch((error) => {
          // Handle error
          setCheckoutError("Failed to complete order. Please try again.");
        });
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
        street.trim() !== "" &&
        city.trim() !== "" &&
        state.trim() !== "" &&
        zipCode.trim() !== "" &&
        paymentMethod !== "" &&
        termsAgreed &&
        !addressError &&
        !paymentError
      );
    }
  };

  return (
    <div>
      <Navbar />
      <Path />
      <div className="checkout-page">
        <form className="left-container" onSubmit={handleCheckout}>
          <div className="shipping-info">
            <div className="header">
              <h3>Shipping Address</h3>
              <div className="lower-part">
                <p>Please choose a shipping address</p>
                <p>Step 1 of 3</p>
              </div>
            </div>
            <div className="body">
              {(!existingAddresses.length || !displayExistingAddress) && (
                <>
                  <label className="label-checkout" htmlFor="entered-address">
                    Enter your new address
                  </label>
                  <input
                    id="street"
                    className="input-checkout"
                    type="text"
                    placeholder="Street"
                    value={street}
                    onChange={handleStreetChange}
                  />
                  {streetError && (
                    <p className="error-message">{streetError}</p>
                  )}

                  <input
                    id="city"
                    className="input-checkout"
                    type="text"
                    placeholder="City"
                    value={city}
                    onChange={handleCityChange}
                  />
                  {cityError && <p className="error-message">{cityError}</p>}

                  <input
                    id="state"
                    className="input-checkout"
                    type="text"
                    placeholder="State"
                    value={state}
                    onChange={handleStateChange}
                  />
                  {stateError && <p className="error-message">{stateError}</p>}

                  <input
                    id="zipCode"
                    className="input-checkout"
                    type="text"
                    placeholder="ZIP code"
                    value={zipCode}
                    onChange={handleZipCodeChange}
                  />
                  {zipCodeError && (
                    <p className="error-message">{zipCodeError}</p>
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
                        <label className="label-checkout" key={address.id}>
                          <input
                            type="radio"
                            name="selected-address"
                            value={address.id}
                            checked={selectedAddress === address.id}
                            onChange={handleAddressSelection}
                          />
                          <label>
                            <span>{address.street} </span>
                            <span>{address.city} </span>
                            <span>{address.state} </span>
                            <span>{address.zip}</span>
                          </label>
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
                <p>Please choose a payment method.</p>
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

              <input
                className="input-checkout"
                id="coupon"
                type="text"
                value={coupon}
                placeholder="Enter Coupon"
                onChange={handleCouponChange}
              />
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
