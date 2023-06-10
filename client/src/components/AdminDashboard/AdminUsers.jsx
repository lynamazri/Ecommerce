import React, { useState, useEffect } from "react";
import { RiSearchLine } from "react-icons/ri";
import { AiOutlineDelete } from "react-icons/ai";
import { useGetUsersQuery } from "../../redux/Slices/apiSlice";

function AdminUsers() {
  // Initial users

  const [users, setUsers] = useState([]);
  const { data: usersData, isLoading } = useGetUsersQuery();

  useEffect(() => {
    if (usersData) {
      setUsers(usersData);
    }
  }, [usersData]);

  console.log(users);

  // const [users, setUsers] = useState(initialUsers);
  const [searchTerm, setSearchTerm] = useState("");

  // Function to handle user deletion
  const handleDeleteUser = (userId) => {
    setUsers((prevUsers) => prevUsers.filter((user) => user.userId !== userId));
  };

  // Filter users based on search term
  const filteredUsers = users.filter((user) => {
    const matchesSearchTerm =
      user.firstName &&
      user.firstName.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesSearchTerm;
  });

  return (
    <div className="admin-users-page admin--page dashboard--page">
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
              <th>Username</th>
              <th>First Name</th>
              <th>Last Name</th>
              <th>Email</th>
              <th>Birth Date</th>
              <th>Gender</th>
              <th>Credit</th>
              <th>Bank Account</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {filteredUsers.map((user) => (
              <tr key={user.userId}>
                <td>{user.username}</td>
                <td>{user.firstName}</td>
                <td>{user.lastName}</td>
                <td>{user.email}</td>
                <td>{user.birthDate.slice(0, 10)}</td>
                <td>{user.gender}</td>
                <td>{user.credit}</td>
                <td>{user.bankAccount ? user.bankAccount : "/"}</td>

                <td>
                  <button
                    className="icon-button"
                    onClick={() => handleDeleteUser(user.userId)}
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
