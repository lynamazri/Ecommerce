import React, { useState, useEffect } from "react";
import { AiOutlineDelete } from "react-icons/ai";

import {
  useGetSubCategoriesQuery,
  useDeleteSubCatMutation,
  useCreateSubCatMutation,
} from "../../redux/Slices/apiSlice";

function AdminSubCat() {
  const [categoriesData, setCategoriesData] = useState([]);
  const [addSubCat] = useCreateSubCatMutation();
  const [confirmationMessage, setConfirmationMessage] = useState("");
  const [showAddForm, setShowAddForm] = useState(false);
  const [subCategoryInfo, setSubCategoryInfo] = useState({
    parentCategory: "",
    name: "",
  });
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const [deleteSubCat] = useDeleteSubCatMutation();
  const { data: subcatData, isLoading } = useGetSubCategoriesQuery();

  useEffect(() => {
    if (subcatData) {
      setCategoriesData(subcatData);
    }
  }, [subcatData]);

  console.log(categoriesData);

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
      addSubCat({
        name: subCategoryInfo.name,
        parentCat: subCategoryInfo.parentCategory,
      })
        .unwrap()
        .then(() => {
          setSubCategoryInfo({ parentCategory: "", name: "" });
          setShowAddForm(false);
          setErrorMessage("");
          setSuccessMessage("Subcategory added successfully.");
        })
        .catch((error) => {
          console.log(error);
        });

      // Logic to add the subcategory to the selected parent category
      const { parentCategory, name } = subCategoryInfo;
      const newSubCategory = {
        subCatId: categoriesData.length + 1,
        parentCategory,
        name,
      };
      setCategoriesData((prevCategories) => [
        ...prevCategories,
        newSubCategory,
      ]);
    }
  };

  const handleDeleteSubCategory = (subCategoryId) => {
    setConfirmationMessage("");

    setCategoriesData((prevCategories) =>
      prevCategories.filter((category) => category.subCatId !== subCategoryId)
    );

    deleteSubCat(subCategoryId);

    setConfirmationMessage("Sub category deleted successfully.");
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
                    <option key={category.subCatId} value={category.name}>
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
                  <tr key={subcategory.subCatId}>
                    <td>{subcategory.subCatId}</td>
                    <td>{subcategory.category.name}</td>
                    <td>{subcategory.name}</td>
                    <td>
                      <button
                        className="icon-button"
                        onClick={() =>
                          handleDeleteSubCategory(subcategory.subCatId)
                        }
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
            <p>Total Number of Subcategories: {categoriesData.length}</p>
          </>
        )}
      </div>
    </div>
  );
}

export default AdminSubCat;
