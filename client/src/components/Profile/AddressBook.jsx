import React, { useState, useEffect } from "react";
import { useGetAdressesQuery } from "../../redux/Slices/apiSlice";
import { usePatchAddressMutation } from "../../redux/Slices/apiSlice";
import { useDeleteAddressMutation } from "../../redux/Slices/apiSlice";
import { useAddAddressMutation } from "../../redux/Slices/apiSlice";
function AddressBook() {
  const [addresses, setAddresses] = useState([]);
  const [newAddress, setNewAddress] = useState({
    street: "",
    city: "",
    state: "",
    zip: "",
  });
  const [editAddressId, setEditAddressId] = useState(null);
  const [errorMessage, setErrorMessage] = useState("");
  const [confirmationMessage, setConfirmationMessage] = useState("");
  var user = localStorage.getItem("user")
    ? JSON.parse(localStorage.getItem("user"))
    : null;
  const { data: addressesData, isLoading } = useGetAdressesQuery(user.userId);
  const [patchAddress, { isLoading: patchAddressLoading, error }] =
    usePatchAddressMutation();

  const [deleteAddress] = useDeleteAddressMutation();
  const [addAddress] = useAddAddressMutation();

  useEffect(() => {
    if (confirmationMessage) {
      const timer = setTimeout(() => {
        setConfirmationMessage("");
      }, 5000);

      return () => clearTimeout(timer);
    }
  }, [confirmationMessage]);

  useEffect(() => {
    if (addressesData) {
      setAddresses(addressesData);
    }
  }, [addressesData]);

  function handleChange(event) {
    const { name, value } = event.target;
    setNewAddress((prevNewAddress) => ({
      ...prevNewAddress,
      [name]: value,
    }));
  }

  const validateForm = () => {
    const { street, city, state, zip } = newAddress;

    if (!street || !city || !state || !zip) {
      return "Please fill in all the required fields.";
    }

    if (street.length < 5) {
      return "Address must be at least 5 characters long.";
    }

    if (city.length < 3) {
      return "City must be at least 3 characters long.";
    }

    if (state.length < 2) {
      return "State must be at least 2 characters long.";
    }

    if (!/^\d{5}$/.test(zip)) {
      return "Zip code must be a 5-digit number.";
    }

    return ""; // Return empty string if the form is valid
  };

  const handleUpdateAddress = (e) => {
    e.preventDefault();
    const validationError = validateForm();
    if (validationError) {
      setErrorMessage(validationError);
      setConfirmationMessage("");
      return;
    }
    patchAddress({
      street: newAddress.street,
      city: newAddress.city,
      state: newAddress.state,
      zip: newAddress.zip,
      editAddressId,
    })
      .unwrap() // Extract the response data
      .then(() => {
        // Handle successful update
        setConfirmationMessage("Changes saved successfully.");
        setNewAddress({
          street: "",
          city: "",
          state: "",
          zip: "",
        });
        setEditAddressId(null);
      })
      .catch(() => {
        // Handle error
        setErrorMessage("Error");
      });
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
    addAddress({
      street: newAddress.street,
      city: newAddress.city,
      state: newAddress.state,
      zip: newAddress.zip,
      userId: user.userId,
    })
      .unwrap() // Extract the response data
      .then(() => {
        // Handle successful update
        setConfirmationMessage("Address added successfully");
        setNewAddress({
          street: "",
          city: "",
          state: "",
          zip: "",
        });
        setEditAddressId(null);
      })
      .catch(() => {
        // Handle error
        setErrorMessage("Error");
      });

    // if (editAddressId) {
    //   // Editing existing address
    //   setAddresses((prevAddresses) =>
    //     prevAddresses.map((address) => {
    //       if (address.id === editAddressId) {
    //         return {
    //           id: address.id,
    //           ...newAddress,
    //         };
    //       }
    //       return address;
    //     })
    //   );
    //   setEditAddressId(null);
    //   setConfirmationMessage("Address updated successfully.");
    // } else {
    //   // Generate a unique ID for the new address
    //   const newId =
    //     addresses.length > 0 ? addresses[addresses.length - 1].id + 1 : 1;

    //   // Create a new address object with the entered data and the generated ID
    //   const newAddressData = {
    //     id: newId,
    //     ...newAddress,
    //   };

    //   // Add the new address to the addresses list
    //   setAddresses((prevAddresses) => [...prevAddresses, newAddressData]);
    //   setConfirmationMessage("Address added successfully.");
    // }

    // // Clear the new address form inputs
    // setNewAddress({
    //   street: "",
    //   city: "",
    //   state: "",
    //   zip: "",
    // });

    // // Clear the error message
    // setErrorMessage("");
  };

  const handleEditAddress = (event, addressId) => {
    event.preventDefault();
    // Find the address with the specified ID
    const addressToEdit = addresses.find((address) => address.id === addressId);

    if (addressToEdit) {
      // Set the new address form inputs with the selected address
      setNewAddress({
        street: addressToEdit.street,
        city: addressToEdit.city,
        state: addressToEdit.state,
        zip: addressToEdit.zip,
      });

      // Set the address ID to be edited
      setEditAddressId(addressId);
      setConfirmationMessage("");
    }
  };

  const handleDeleteAddress = (addressId) => {
    // Remove the address with the specified ID from the addresses list
    // setAddresses((prevAddresses) =>
    //   prevAddresses.filter((address) => address.id !== addressId)
    // );
    deleteAddress(addressId);

    setConfirmationMessage("Address deleted successfully.");
  };
  return (
    <form className="right-container">
      {isLoading ? (
        <div>Loading ...</div>
      ) : (
        <div className="addresses-page">
          <div className="header">
            <h3>My Address Book</h3>
            <p>
              Organize your addresses. Add, edit, or remove addresses below.
            </p>
          </div>
          <div className="body">
            <div className="old-addresses">
              {addresses.map((address) => (
                <div key={address.id} className="address-item">
                  <div className="inputs">
                    <p>{address.street}</p>
                    <p>{address.city}</p>
                    <p>{address.state}</p>
                    <p>{address.zip}</p>
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
                <label htmlFor="address">Street</label>
                <input
                  type="text"
                  name="street"
                  id="street"
                  placeholder="street"
                  required
                  onChange={handleChange}
                  value={newAddress.street}
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
                  name="zip"
                  id="zip"
                  placeholder="Zip Code"
                  required
                  onChange={handleChange}
                  value={newAddress.zip}
                />
              </div>
              {errorMessage && <p className="error-message">{errorMessage}</p>}
              {confirmationMessage && (
                <p className="confirmation-message">{confirmationMessage}</p>
              )}
              <div className="input-container">
                {editAddressId ? (
                  <button type="submit" onClick={handleUpdateAddress}>
                    Update Address
                  </button>
                ) : (
                  <button type="submit" onClick={handleAddAddress}>
                    Add Address
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </form>
  );
}

export default AddressBook;
