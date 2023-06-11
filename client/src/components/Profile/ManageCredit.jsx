import React, { useState } from "react";

function ManageCredit() {
  const [addCreditInfo, setAddCreditInfo] = useState({
    amount: "",
    bankAccount: "",
  });
  const [setCreditInfo, setSetCreditInfo] = useState({
    amount: "",
    bankAccount: "",
  });
  const [addCreditErrorMessage, setAddCreditErrorMessage] = useState("");
  const [setCreditErrorMessage, setSetCreditErrorMessage] = useState("");
  const [addCreditSuccessMessage, setAddCreditSuccessMessage] = useState("");
  const [setCreditSuccessMessage, setSetCreditSuccessMessage] = useState("");

  const handleAddCreditInfoChange = (e) => {
    const { name, value } = e.target;
    setAddCreditInfo((prevCreditInfo) => ({
      ...prevCreditInfo,
      [name]: value,
    }));
  };

  const handleSetCreditInfoChange = (e) => {
    const { name, value } = e.target;
    setSetCreditInfo((prevCreditInfo) => ({
      ...prevCreditInfo,
      [name]: value,
    }));
  };

  const validateInputs = (creditInfo) => {
    const amountRegex = /^\d+(\.\d{1,2})?$/;
    const bankAccountRegex = /^\d{10}$/;

    if (!creditInfo.amount || !creditInfo.bankAccount) {
      return false;
    }

    if (!amountRegex.test(creditInfo.amount)) {
      return false;
    }

    if (!bankAccountRegex.test(creditInfo.bankAccount)) {
      return false;
    }

    return true;
  };

  const handleAddCreditSubmit = (e) => {
    e.preventDefault();

    if (!validateInputs(addCreditInfo)) {
      setAddCreditErrorMessage("Please enter valid credit information.");
      setAddCreditSuccessMessage("");
      return;
    }

    // Perform the credit info submission logic for "Add Credit"
    // ...

    // Clear the input fields after submission
    setAddCreditInfo({
      amount: "",
      bankAccount: "",
    });

    // Set success message
    setAddCreditSuccessMessage("Credit information submitted successfully.");
    setAddCreditErrorMessage("");
  };

  const handleSetCreditSubmit = (e) => {
    e.preventDefault();

    if (!validateInputs(setCreditInfo)) {
      setSetCreditErrorMessage("Please enter valid credit information.");
      setSetCreditSuccessMessage("");
      return;
    }

    // Perform the credit info submission logic for "Set Credit"
    // ...

    // Clear the input fields after submission
    setSetCreditInfo({
      amount: "",
      bankAccount: "",
    });

    // Set success message
    setSetCreditSuccessMessage("Credit information submitted successfully.");
    setSetCreditErrorMessage("");
  };

  return (
    <div className="right-container">
      <div className="payment-page">
        <div className="header">
          <h3>Payment Method</h3>
          <p>...</p>
        </div>
        <div className="body">
          <div className="display-credit">
            <h4>You have:</h4>
            <p>100DA</p>
          </div>
          <form className="add-credit" onSubmit={handleAddCreditSubmit}>
            <div className="credit-input-container">
              <label htmlFor="amount">Amount</label>
              <input
                type="text"
                name="amount"
                id="amount"
                placeholder="Enter amount"
                value={addCreditInfo.amount}
                onChange={handleAddCreditInfoChange}
              />
            </div>
            <div className="credit-input-container">
              <label htmlFor="bankAccount">Bank Account</label>
              <input
                type="text"
                name="bankAccount"
                id="bankAccount"
                placeholder="Enter bank account"
                value={addCreditInfo.bankAccount}
                onChange={handleAddCreditInfoChange}
              />
            </div>
            {addCreditSuccessMessage && (
              <p className="success-message">{addCreditSuccessMessage}</p>
            )}
            {addCreditErrorMessage && (
              <p className="error-message">{addCreditErrorMessage}</p>
            )}

            <div className="credit-submit-container">
              <button type="submit">Add Credit</button>
            </div>
          </form>
          <form className="set-credit" onSubmit={handleSetCreditSubmit}>
            <div className="credit-input-container">
              <label htmlFor="setAmount">Set amount</label>
              <input
                type="text"
                name="amount"
                id="setAmount"
                placeholder="Enter amount"
                value={setCreditInfo.amount}
                onChange={handleSetCreditInfoChange}
              />
            </div>
            <div className="credit-input-container">
              <label htmlFor="setBankAccount">Bank Account</label>
              <input
                type="text"
                name="bankAccount"
                id="setBankAccount"
                placeholder="Enter bank account"
                value={setCreditInfo.bankAccount}
                onChange={handleSetCreditInfoChange}
              />
            </div>
            {setCreditSuccessMessage && (
              <p className="success-message">{setCreditSuccessMessage}</p>
            )}
            {setCreditErrorMessage && (
              <p className="error-message">{setCreditErrorMessage}</p>
            )}

            <div className="credit-submit-container">
              <button type="submit">Set Credit</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default ManageCredit;
