import React, { useState } from "react";
import { RiSearchLine } from "react-icons/ri";
import { AiOutlineDelete } from "react-icons/ai";

function AdminUsers() {
  // Initial users
  const initialUsers = [
    {
      id: 1,
      firstName: "John",
      lastName: "Doe",
      email: "john.doe@example.com",
      birthdate: "1990-01-01",
      gender: "Male",
      credit: 100,
      role: "Admin",
    },
    {
      id: 2,
      firstName: "Jane",
      lastName: "Smith",
      email: "jane.smith@example.com",
      birthdate: "1992-05-15",
      gender: "Female",
      credit: 50,
      role: "User",
    },
    // Add more user objects as needed
  ];

  const [users, setUsers] = useState(initialUsers);
  const [searchTerm, setSearchTerm] = useState("");

  // Function to handle user deletion
  const handleDeleteUser = (userId) => {
    setUsers((prevUsers) => prevUsers.filter((user) => user.id !== userId));
  };

  // Filter users based on search term
  const filteredUsers = users.filter((user) => {
    const matchesSearchTerm =
      user.firstName &&
      user.firstName.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesSearchTerm;
  });

  return (
    <div className="admin-users-page dashboard--page">
      <div className="header">
        <h3>Hello, Admin</h3>
        <p>View user information and manage user accounts.</p>
      </div>
      <div className="main">
        <div className="upper">
          <h3>Users List</h3>
          <div className="search-input">
            <input
              type="text"
              placeholder="Search by name"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />{" "}
            <RiSearchLine size={18} />
          </div>
        </div>
        <table>
          <thead>
            <tr>
              <th>First Name</th>
              <th>Last Name</th>
              <th>Email</th>
              <th>Birthdate</th>
              <th>Gender</th>
              <th>Credit</th>
              <th>Role</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {filteredUsers.map((user) => (
              <tr key={user.id}>
                <td>{user.firstName}</td>
                <td>{user.lastName}</td>
                <td>{user.email}</td>
                <td>{user.birthdate}</td>
                <td>{user.gender}</td>
                <td>{user.credit}</td>
                <td>{user.role}</td>
                <td>
                  <button
                    className="icon-button"
                    onClick={() => handleDeleteUser(user.id)}
                  >
                    <AiOutlineDelete size={18} color="red" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <p>Total Users: {filteredUsers.length}</p>
      </div>
    </div>
  );
}

export default AdminUsers;
