import React, { useState } from "react";
import { AiOutlineDelete } from "react-icons/ai";

function AdminSubCat() {
  const [categoriesData, setCategoriesData] = useState([
    {
      id: 1,
      name: "Category A",
      description: "Description A",
    },
    {
      id: 2,
      name: "Category B",
      description: "Description B",
    },
    // Add more category objects as needed
  ]);

  const [showAddForm, setShowAddForm] = useState(false);
  const [subCategoryInfo, setSubCategoryInfo] = useState({
    parentCategory: "",
    name: "",
  });
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const handleAddSubCategory = () => {
    setShowAddForm(true);
    setErrorMessage("");
    setSuccessMessage("");
  };

  const handleSubCategoryInfoChange = (e) => {
    const { name, value } = e.target;
    setSubCategoryInfo((prevInfo) => ({ ...prevInfo, [name]: value }));
  };

  const handleSubmitSubCategoryInfo = (e) => {
    e.preventDefault();
    if (
      subCategoryInfo.parentCategory.trim() === "" ||
      subCategoryInfo.name.trim() === ""
    ) {
      setErrorMessage("Please fill in all the fields.");
    } else {
      // Logic to add the subcategory to the selected parent category
      const { parentCategory, name } = subCategoryInfo;
      const newSubCategory = {
        id: categoriesData.length + 1,
        parentCategory,
        name,
      };
      setCategoriesData((prevCategories) => [
        ...prevCategories,
        newSubCategory,
      ]);
      setSubCategoryInfo({ parentCategory: "", name: "" });
      setShowAddForm(false);
      setErrorMessage("");
      setSuccessMessage("Subcategory added successfully.");
    }
  };

  const handleDeleteSubCategory = (subCategoryId) => {
    setCategoriesData((prevCategories) =>
      prevCategories.filter((category) => category.id !== subCategoryId)
    );
  };

  return (
    <div className="admin-sub-cat-page admin--page dashboard--page">
      <div className="header">
        <h3>Hello, Admin</h3>
        <p>View and manage subcategories within categories.</p>
      </div>
      <div className="main">
        {showAddForm ? (
          <div className="admin-info">
            <div className="header">
              <h4>Add Subcategory</h4>
              <p>Fill in the inputs below to add a new subcategory.</p>
            </div>

            <form
              className="my-profile-inputs admin-sub-cat-form admin--form"
              onSubmit={handleSubmitSubCategoryInfo}
            >
              <div className="input-container">
                <label htmlFor="parentCategory">Parent Category</label>
                <select
                  name="parentCategory"
                  id="parentCategory"
                  required
                  onChange={handleSubCategoryInfoChange}
                  value={subCategoryInfo.parentCategory}
                >
                  <option value="">Select Parent Category</option>
                  {categoriesData.map((category) => (
                    <option key={category.id} value={category.name}>
                      {category.name}
                    </option>
                  ))}
                </select>
              </div>
              <div className="input-container">
                <label htmlFor="subCategoryName">Subcategory Name</label>
                <input
                  type="text"
                  name="name"
                  id="subCategoryName"
                  placeholder="Subcategory Name"
                  required
                  onChange={handleSubCategoryInfoChange}
                  value={subCategoryInfo.name}
                />
              </div>

              {errorMessage && <p className="error-message">{errorMessage}</p>}
              {successMessage && (
                <p className="success-message">{successMessage}</p>
              )}

              <div className="input-container">
                <button type="submit">Add Subcategory</button>
              </div>
            </form>
          </div>
        ) : (
          <>
            <div className="upper">
              <h3>Subcategories List</h3>
              <button className="table-add" onClick={handleAddSubCategory}>
                Add Subcategory
              </button>
            </div>
            <table>
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Parent Category</th>
                  <th>Name</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {categoriesData.map((subcategory) => (
                  <tr key={subcategory.id}>
                    <td>{subcategory.id}</td>
                    <td>{subcategory.parentCategory}</td>
                    <td>{subcategory.name}</td>
                    <td>
                      <button
                        className="icon-button"
                        onClick={() => handleDeleteSubCategory(subcategory.id)}
                      >
                        <AiOutlineDelete size={18} color="red" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            <p>Total Number of Subcategories: {categoriesData.length}</p>
          </>
        )}
      </div>
    </div>
  );
}

export default AdminSubCat;
