import React, { useState, useEffect } from "react";
import { AiOutlineDelete } from "react-icons/ai";
import { RiSearchLine } from "react-icons/ri";
import {
  useGetAdminsQuery,
  useDeleteAdminMutation,
  useAddAdminMutation,
} from "../../redux/Slices/apiSlice";

function AdminsManage() {
  const [showAddForm, setShowAddForm] = useState(false);
  const [adminInfo, setAdminInfo] = useState({
    firstName: "",
    lastName: "",
    newUsername: "",
    password: "",
    confirmPassword: "",
  });

  const [adminInfoErrorMessage, setAdminInfoErrorMessage] = useState("");
  const [adminInfoConfirmationMessage, setAdminInfoConfirmationMessage] =
    useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [deleteAdmin] = useDeleteAdminMutation();
  const [addAdmin] = useAddAdminMutation();
  const [confirmationMessage, setConfirmationMessage] = useState("");
  const [filteredAdmins, setFilteredAdmins] = useState([]);
  const { data: adminsData, isLoading } = useGetAdminsQuery();

  useEffect(() => {
    if (adminsData) {
      setFilteredAdmins(adminsData);
    }
  }, [adminsData]);

  console.log(filteredAdmins);

  const handleDeleteAdmin = (adminId) => {
    setConfirmationMessage("");
    setFilteredAdmins((prevFilteredAdmins) =>
      prevFilteredAdmins.filter((admin) => admin.adminId !== adminId)
    );

    deleteAdmin(adminId);

    setConfirmationMessage("Admin deleted successfully.");
  };

  const handleSearch = (e) => {
    const searchTerm = e.target.value;
    setSearchTerm(searchTerm);

    const filtered = admins.filter((admin) =>
      admin.username.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredAdmins(filtered);
  };

  const handleAddAdmin = () => {
    setShowAddForm(true);
  };

  const handleAdminInfoChange = (event) => {
    const { name, value } = event.target;
    setAdminInfo((prevAdminInfo) => ({
      ...prevAdminInfo,
      [name]: value,
    }));
  };

  const handleSubmitAdminInfo = (event) => {
    event.preventDefault();
    if (adminInfo.password !== adminInfo.confirmPassword) {
      setAdminInfoErrorMessage("Passwords do not match");
      return;
    }
    // Perform the admin info submission logic
    // ...

    addAdmin({
      email,
      username: adminInfo.username,
      firstName: adminInfo.firstName,
      lastName: adminInfo.lastName,
      password: adminInfo.password,
    })
      .unwrap() // Extract the response data
      .then(() => {
        // Handle successful update
        setConfirmationMessage("Address added successfully");
        setAdminInfo({
          firstName: "",
          lastName: "",
          newUsername: "",
          password: "",
          confirmPassword: "",
        });

        setAdminInfoErrorMessage("");
        setAdminInfoConfirmationMessage("Admin added successfully");
      })
      .catch(() => {
        // Handle error
        console.log("Error");
        setErrorMessage("Error");
      });
  };

  return (
    <div className="admin-users-page admin--page dashboard--page">
      <div className="header">
        <h3>Hello, Admin</h3>
        <p>View admin information and manage admin accounts.</p>
      </div>
      <div className="main">
        {showAddForm ? (
          <div className="admin-info">
            <div className="header">
              <h4>Add Admin</h4>
              <p>Fill in the inputs below to add a new admin.</p>
            </div>

            <form className="admin-info-form" onSubmit={handleSubmitAdminInfo}>
              <div className="my-profile-inputs">
                <div className="input-container">
                  <label htmlFor="firstName">First Name</label>
                  <input
                    type="text"
                    name="firstName"
                    id="firstName"
                    placeholder="First Name"
                    required
                    onChange={handleAdminInfoChange}
                    value={adminInfo.firstName}
                  />
                </div>
                <div className="input-container">
                  <label htmlFor="lastName">Last Name</label>
                  <input
                    type="text"
                    name="lastName"
                    id="lastName"
                    placeholder="Last Name"
                    required
                    onChange={handleAdminInfoChange}
                    value={adminInfo.lastName}
                  />
                </div>
                <div className="input-container">
                  <label htmlFor="newUsername">Username</label>
                  <input
                    type="text"
                    name="newUsername"
                    id="newUsername"
                    placeholder="Username"
                    required
                    onChange={handleAdminInfoChange}
                    value={adminInfo.newUsername}
                  />
                </div>
                <div className="input-container">
                  <label htmlFor="password">Password</label>
                  <input
                    type="password"
                    name="password"
                    id="password"
                    placeholder="Password"
                    required
                    onChange={handleAdminInfoChange}
                    value={adminInfo.password}
                  />
                </div>
                <div className="input-container">
                  <label htmlFor="confirmPassword">Confirm Password</label>
                  <input
                    type="password"
                    name="confirmPassword"
                    id="confirmPassword"
                    placeholder="Confirm Password"
                    required
                    onChange={handleAdminInfoChange}
                    value={adminInfo.confirmPassword}
                  />
                </div>
              </div>

              {adminInfoErrorMessage && (
                <p className="error-message">{adminInfoErrorMessage}</p>
              )}
              {adminInfoConfirmationMessage && (
                <p className="confirmation-message">
                  {adminInfoConfirmationMessage}
                </p>
              )}

              <div className="input-container">
                <button type="submit">Add Admin</button>
              </div>
            </form>
          </div>
        ) : (
          <>
            <div className="upper">
              <h3>Admins List</h3>
              <div className="search-input">
                <input
                  type="text"
                  placeholder="Search by name"
                  value={searchTerm}
                  onChange={handleSearch}
                />
                <RiSearchLine size={18} />
              </div>
              <button className="table-add" onClick={handleAddAdmin}>
                Add Admin
              </button>
            </div>
            <table>
              <thead>
                <tr>
                  <th>Username</th>
                  <th>First Name</th>
                  <th>Last Name</th>
                  <th>Email</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {filteredAdmins.map((admin) => (
                  <tr key={admin.adminId}>
                    <td>{admin.username}</td>
                    <td>{admin.firstName}</td>
                    <td>{admin.lastName}</td>
                    <td>{admin.email}</td>
                    <td>
                      <button
                        className="icon-button"
                        onClick={() => handleDeleteAdmin(admin.adminId)}
                      >
                        <AiOutlineDelete size={18} color="red" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            {confirmationMessage && (
              <p className="confirmation-message">{confirmationMessage}</p>
            )}
            <p>Total Number of Admins: {filteredAdmins.length}</p>
          </>
        )}
      </div>
    </div>
  );
}

export default AdminsManage;
