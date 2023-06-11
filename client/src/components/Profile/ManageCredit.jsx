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
          <p>Consult your credit</p>
        </div>
        <div className="body">
          <div className="display-credit">
            <h4>Your Credit:</h4>
            <p>100DA</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ManageCredit;
