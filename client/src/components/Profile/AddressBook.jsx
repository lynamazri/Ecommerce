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

  const handleAddAddress = (event) => {
    event.preventDefault();

    // Add your validation logic here
    if (
      !newAddress.address ||
      !newAddress.city ||
      !newAddress.state ||
      !newAddress.zipCode
    ) {
      setErrorMessage("Please fill in all the required fields.");
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
    }
  };

  const handleDeleteAddress = (addressId) => {
    // Remove the address with the specified ID from the addresses list
    setAddresses((prevAddresses) =>
      prevAddresses.filter((address) => address.id !== addressId)
    );
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
            {errorMessage && <p className="error">{errorMessage}</p>}
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

/*
import React, { useState, useEffect } from "react";
import axios from "axios";

function AddressBook() {
  const [addresses, setAddresses] = useState([]);

  useEffect(() => {
    const fetchAddresses = async () => {
      try {
        const response = await axios.get("/api/addresses");
        setAddresses(response.data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchAddresses();
  }, []);

  // Rest of the code...
}

const handleEditAddress = async (addressId, updatedAddress) => {
  try {
    const response = await axios.put(`/api/addresses/${addressId}`, updatedAddress);
    // Handle the response as needed
    console.log(response);
  } catch (error) {
    // Handle errors
    console.log(error);
  }
};

const handleDeleteAddress = async (addressId) => {
  try {
    const response = await axios.delete(`/api/addresses/${addressId}`);
    // Handle the response as needed
    console.log(response);
  } catch (error) {
    // Handle errors
    console.log(error);
  }
};


const handleAddAddress = async (newAddress) => {
  try {
    const response = await axios.post("/api/addresses", newAddress);
    // Handle the response as needed
    console.log(response);
  } catch (error) {
    // Handle errors
    console.log(error);
  }
};

*/
