import React, { useState } from "react";
import {
  useAddCreditMutation,
  useSetCreditMutation,
} from "../../redux/Slices/apiSlice";

function AdminCredit() {
  const [addCredit] = useAddCreditMutation();
  const [setCredit] = useSetCreditMutation();
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
    //const bankAccountRegex = /^\d{10}$/;

    if (!creditInfo.amount || !creditInfo.bankAccount) {
      return false;
    }

    if (!amountRegex.test(creditInfo.amount)) {
      return false;
    }
    /* 
    if (!bankAccountRegex.test(creditInfo.bankAccount)) {
      return false;
    } */

    return true;
  };

  const handleAddCreditSubmit = (e) => {
    e.preventDefault();
    setAddCreditSuccessMessage("");
    setAddCreditErrorMessage("");

    if (!validateInputs(addCreditInfo)) {
      setAddCreditErrorMessage("Please enter valid credit information.");
      setAddCreditSuccessMessage("");
      return;
    }

    console.log(addCreditInfo.amount, addCreditInfo.bankAccount);

    addCredit({
      amount: addCreditInfo.amount,
      bankAccount: addCreditInfo.bankAccount,
    })
      .unwrap() // Extract the response data
      .then(() => {
        // Handle successful update
        setAddCreditSuccessMessage(
          "Credit information submitted successfully."
        );
        setAddCreditErrorMessage("");
      })
      .catch(() => {
        // Handle error
        console.log("Error");
        setAddCreditErrorMessage("Error");
      });

    // Clear the input fields after submission

    // Set success message
    // setAddCreditSuccessMessage("Credit information submitted successfully.");
    // setAddCreditErrorMessage("");
  };

  const handleSetCreditSubmit = (e) => {
    e.preventDefault();

    setSetCreditErrorMessage("");
    setSetCreditSuccessMessage("");

    if (!validateInputs(setCreditInfo)) {
      setSetCreditErrorMessage("Please enter valid credit information.");
      setSetCreditSuccessMessage("");
      return;
    }

    setCredit({
      amount: setCreditInfo.amount,
      bankAccount: setCreditInfo.bankAccount,
    })
      .unwrap() // Extract the response data
      .then(() => {
        // Handle successful update
        //setConfirmationMessage("Address added successfully");
        setSetCreditSuccessMessage(
          "Credit information submitted successfully."
        );
        setSetCreditErrorMessage("");
        setSetCreditInfo({
          amount: "",
          bankAccount: "",
        });
      })
      .catch(() => {
        // Handle error
        setSetCreditErrorMessage("Error");
      });

    // Set success message
    //setSetCreditSuccessMessage("Credit information submitted successfully.");
    //setSetCreditErrorMessage("");
  };
  return (
    <div className="admin-cat-page admin--page dashboard--page">
      <div className="header">
        <h3>Hello, Admin</h3>
        <p>View and manage the website's categories.</p>
      </div>
      <div className="main">
        <div className="admin-credit">
          <form className="add-credit" onSubmit={handleAddCreditSubmit}>
            <h4>Add Credit</h4>
            <div className="input-container">
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
            <div className="input-container">
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

            <div className="input-container">
              <button type="submit">Add Credit</button>
            </div>
          </form>

          <form className="add-credit" onSubmit={handleSetCreditSubmit}>
            <h4>Set Credit</h4>
            <div className="input-container">
              <label htmlFor="setAmount">Amount</label>
              <input
                type="text"
                name="amount"
                id="setAmount"
                placeholder="Enter amount"
                value={setCreditInfo.amount}
                onChange={handleSetCreditInfoChange}
              />
            </div>
            <div className="input-container">
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

            <div className="input-container">
              <button type="submit">Set Credit</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default AdminCredit;
