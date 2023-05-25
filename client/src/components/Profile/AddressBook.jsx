import React, { useState, useEffect } from "react";

function AddressBook() {
  const [addresses, setAddresses] = useState([]);
  const [newAddress, setNewAddress] = useState({
    address: "",
    city: "",
    state: "",
    zipCode: "",
  });
  const [editAddressId, setEditAddressId] = useState(null);
  const [errorMessage, setErrorMessage] = useState("");
  const [confirmationMessage, setConfirmationMessage] = useState("");

  useEffect(() => {
    // Assuming you fetch the addresses from the backend and store them in the 'fetchedAddresses' variable
    const fetchedAddresses = [
      {
        id: 1,
        address: "123 Main St",
        city: "Cityville",
        state: "Stateville",
        zipCode: "12345",
      },
      {
        id: 2,
        address: "456 Elm St",
        city: "Townsville",
        state: "Stateville",
        zipCode: "67890",
      },
    ];

    // Set the addresses with the fetched data
    setAddresses(fetchedAddresses);
  }, []);

  function handleChange(event) {
    const { name, value } = event.target;
    setNewAddress((prevNewAddress) => ({
      ...prevNewAddress,
      [name]: value,
    }));
  }

  const validateForm = () => {
    const { address, city, state, zipCode } = newAddress;

    if (!address || !city || !state || !zipCode) {
      return "Please fill in all the required fields.";
    }

    if (address.length < 5) {
      return "Address must be at least 5 characters long.";
    }

    if (city.length < 3) {
      return "City must be at least 3 characters long.";
    }

    if (state.length < 2) {
      return "State must be at least 2 characters long.";
    }

    if (!/^\d{5}$/.test(zipCode)) {
      return "Zip code must be a 5-digit number.";
    }

    return ""; // Return empty string if the form is valid
  };

  const handleAddAddress = (event) => {
    event.preventDefault();

    // Validate the form
    const validationError = validateForm();
    if (validationError) {
      setErrorMessage(validationError);
      setConfirmationMessage("");
      return;
    }

    if (editAddressId) {
      // Editing existing address
      setAddresses((prevAddresses) =>
        prevAddresses.map((address) => {
          if (address.id === editAddressId) {
            return {
              id: address.id,
              ...newAddress,
            };
          }
          return address;
        })
      );
      setEditAddressId(null);
      setConfirmationMessage("Address updated successfully.");
    } else {
      // Generate a unique ID for the new address
      const newId =
        addresses.length > 0 ? addresses[addresses.length - 1].id + 1 : 1;

      // Create a new address object with the entered data and the generated ID
      const newAddressData = {
        id: newId,
        ...newAddress,
      };

      // Add the new address to the addresses list
      setAddresses((prevAddresses) => [...prevAddresses, newAddressData]);
      setConfirmationMessage("Address added successfully.");
    }

    // Clear the new address form inputs
    setNewAddress({
      address: "",
      city: "",
      state: "",
      zipCode: "",
    });

    // Clear the error message
    setErrorMessage("");
  };

  const handleEditAddress = (event, addressId) => {
    event.preventDefault();
    // Find the address with the specified ID
    const addressToEdit = addresses.find((address) => address.id === addressId);

    if (addressToEdit) {
      // Set the new address form inputs with the selected address
      setNewAddress({
        address: addressToEdit.address,
        city: addressToEdit.city,
        state: addressToEdit.state,
        zipCode: addressToEdit.zipCode,
      });

      // Set the address ID to be edited
      setEditAddressId(addressId);
      setConfirmationMessage("");
    }
  };

  const handleDeleteAddress = (addressId) => {
    // Remove the address with the specified ID from the addresses list
    setAddresses((prevAddresses) =>
      prevAddresses.filter((address) => address.id !== addressId)
    );
    setConfirmationMessage("Address deleted successfully.");
  };

  return (
    <form className="right-container">
      <div className="addresses-page">
        <div className="header">
          <h3>My Address Book</h3>
          <p>Organize your addresses. Add, edit, or remove addresses below.</p>
        </div>
        <div className="body">
          <div className="old-addresses">
            {addresses.map((address) => (
              <div key={address.id} className="address-item">
                <div className="inputs">
                  <p>{address.address}</p>
                  <p>{address.city}</p>
                  <p>{address.state}</p>
                  <p>{address.zipCode}</p>
                </div>
                <div className="buttons">
                  <button
                    className="edit"
                    onClick={(event) => handleEditAddress(event, address.id)}
                  >
                    Edit
                  </button>

                  <button
                    className="delete"
                    onClick={() => handleDeleteAddress(address.id)}
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
          <div className="add-addresses">
            <div className="input-container">
              <label htmlFor="address">Address</label>
              <input
                type="text"
                name="address"
                id="address"
                placeholder="Address"
                required
                onChange={handleChange}
                value={newAddress.address}
              />
            </div>
            <div className="input-container">
              <label htmlFor="city">City</label>
              <input
                type="text"
                name="city"
                id="city"
                placeholder="City"
                required
                onChange={handleChange}
                value={newAddress.city}
              />
            </div>
            <div className="input-container">
              <label htmlFor="state">State</label>
              <input
                type="text"
                name="state"
                id="state"
                placeholder="State"
                required
                onChange={handleChange}
                value={newAddress.state}
              />
            </div>
            <div className="input-container">
              <label htmlFor="zipCode">Zip Code</label>
              <input
                type="text"
                name="zipCode"
                id="zipCode"
                placeholder="Zip Code"
                required
                onChange={handleChange}
                value={newAddress.zipCode}
              />
            </div>
            {errorMessage && <p className="error-message">{errorMessage}</p>}
            {confirmationMessage && (
              <p className="confirmation-message">{confirmationMessage}</p>
            )}
            <div className="input-container">
              <button type="submit" onClick={handleAddAddress}>
                {editAddressId ? "Update Address" : "Add Address"}
              </button>
            </div>
          </div>
        </div>
      </div>
    </form>
  );
}

export default AddressBook;
