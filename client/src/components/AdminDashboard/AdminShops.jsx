import React, { useState, useEffect } from "react";
import { RiSearchLine } from "react-icons/ri";
import { AiOutlineDelete, AiOutlineCheckSquare } from "react-icons/ai";
import { useGetAllStoresQuery } from "../../redux/Slices/apiSlice";

function AdminShops() {
  // Initial shops
  const [shops, setShops] = useState([]);
  const { data: storesData, isLoading } = useGetAllStoresQuery();

  useEffect(() => {
    if (storesData) {
      setShops(storesData);
    }
  }, [storesData]);

  console.log(shops);

  // const [shops, setShops] = useState(initialShops);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState("");

  // Function to handle shop deletion
  const handleDeleteShop = (shopId) => {
    setShops((prevShops) =>
      prevShops.filter((shop) => shop.storeId !== shopId)
    );
  };

  // Function to handle shop approval
  const handleApproveShop = (shopId) => {
    setShops((prevShops) =>
      prevShops.map((shop) =>
        shop.storeId === shopId ? { ...shop, status: "Approved" } : shop
      )
    );
  };

  // Filter shops based on search term and status
  const filteredShops = shops.filter((shop) => {
    const matchesSearchTerm =
      shop.name && shop.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = filterStatus === "" || shop.approved === filterStatus;
    return matchesSearchTerm && matchesStatus;
  });

  return (
    <div className="admin-shops-page admin--page dashboard--page">
      <div className="header">
        <h3>Hello, Admin </h3>
        <p>View shop information and manage their states.</p>
      </div>
      <div className="main">
        <div className="upper">
          <h3>Shops List</h3>
          <div className="search-input">
            <input
              type="text"
              placeholder="Search by name"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <RiSearchLine size={18} />
          </div>
          <div className="filter">
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
            >
              <option value="">All</option>
              <option value="Approved">Approved</option>
              <option value="Pending">Pending</option>
            </select>
          </div>
        </div>
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Category</th>
              <th>Email</th>
              <th>Phone</th>
              <th>Opening Date</th>
              <th>Owner's Name</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {filteredShops.map((shop) => (
              <tr key={shop.storeId}>
                <td>{shop.name}</td>
                <td>{shop.mainCat.name}</td>
                <td>{shop.email}</td>
                <td>0{shop.phone}</td>
                <td>{shop.openingDate.slice(0, 10)}</td>
                <td>
                  {shop.user.firstName} {shop.user.lastName}
                </td>
                <td>{shop.approved ? "Approved" : "Pending"}</td>
                <td id="action">
                  {shop.approved === false && (
                    <button
                      className="icon-button"
                      onClick={() => handleApproveShop(shop.storeId)}
                    >
                      <AiOutlineCheckSquare size={18} />
                    </button>
                  )}

                  <button
                    className="icon-button"
                    onClick={() => handleDeleteShop(shop.storeId)}
                  >
                    <AiOutlineDelete size={18} color="red" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <p>Total Number ofShops: {filteredShops.length}</p>
      </div>
    </div>
  );
}

export default AdminShops;
