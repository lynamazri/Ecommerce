import React, { useState, useEffect } from "react";
import { AiOutlineDelete } from "react-icons/ai";
import {
  useGetCategoriesQuery,
  useDeleteCatgoryMutation,
  useCreateCatgoryMutation,
} from "../../redux/Slices/apiSlice";

function AdminCat() {
  const [categoriesData, setCategoriesData] = useState([]);
  const [confirmationMessage, setConfirmationMessage] = useState("");

  const [deleteCat] = useDeleteCatgoryMutation();
  const { data: catData, isLoading } = useGetCategoriesQuery();
  const [addCat] = useCreateCatgoryMutation();

  useEffect(() => {
    if (catData) {
      setCategoriesData(catData);
    }
  }, [catData]);

  console.log(categoriesData);

  const [showAddForm, setShowAddForm] = useState(false);
  const [categoryInfo, setCategoryInfo] = useState({
    name: "",
    description: "",
  });
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const handleAddCategory = () => {
    setShowAddForm(true);
    setErrorMessage("");
    setSuccessMessage("");
  };

  const handleCategoryInfoChange = (e) => {
    const { name, value } = e.target;
    setCategoryInfo((prevInfo) => ({ ...prevInfo, [name]: value }));
    console.log(categoryInfo);
  };

  const handleSubmitCategoryInfo = (e) => {
    setErrorMessage(""), setSuccessMessage("");

    e.preventDefault();
    if (
      categoryInfo.name.trim() === "" ||
      categoryInfo.description.trim() === ""
    ) {
      setErrorMessage("Please fill in all the fields.");
    } /*else {
      const newCategory = {
        catId: categoriesData.length + 1,
        name: categoryInfo.name,
        description: categoryInfo.description,
      };
      setCategoriesData((prevCategories) => [...prevCategories, newCategory]);
      setCategoryInfo({ name: "", description: "" });
      setShowAddForm(false);
      setErrorMessage("");
      setSuccessMessage("Category added successfully.");
    } */

    //console.log(categoryInfo.name, categoryInfo.description);

    addCat({
      name: categoryInfo.name,
      description: categoryInfo.description,
    })
      .unwrap() // Extract the response data
      .then(() => {
        // Handle successful update
        setSuccessMessage("Category added successfully.");
        setCategoryInfo({ name: "", description: "" });
      })
      .catch(() => {
        // Handle error
        console.log("Error");
        setErrorMessage("Error");
      });
  };

  const handleDeleteCategory = (categoryId) => {
    setConfirmationMessage("");

    setCategoriesData((prevCategories) =>
      prevCategories.filter((category) => category.catId !== categoryId)
    );

    deleteCat(categoryId);

    setConfirmationMessage("Category deleted successfully.");
  };

  return (
    <div className="admin-cat-page admin--page dashboard--page">
      <div className="header">
        <h3>Hello, Admin</h3>
        <p>View and manage the website's categories.</p>
      </div>
      <div className="main">
        {showAddForm ? (
          <div className="admin-info">
            <div className="header">
              <h4>Add Category</h4>
              <p>Fill in the inputs below to add a new category.</p>
            </div>

            <form
              className="my-profile-inputs admin-cat-form admin--form"
              onSubmit={handleSubmitCategoryInfo}
            >
              <div className="input-container">
                <label htmlFor="categoryName">Category Name</label>
                <input
                  type="text"
                  name="name"
                  id="categoryName"
                  placeholder="Category Name"
                  required
                  onChange={handleCategoryInfoChange}
                  value={categoryInfo.name}
                />
              </div>
              <div className="input-container">
                <label htmlFor="categoryDescription">
                  Category Description
                </label>
                <input
                  type="text"
                  name="description"
                  id="categoryDescription"
                  placeholder="Category Description"
                  required
                  onChange={handleCategoryInfoChange}
                  value={categoryInfo.description}
                />
              </div>

              {errorMessage && <p className="error-message">{errorMessage}</p>}
              {successMessage && (
                <p className="success-message">{successMessage}</p>
              )}

              <div className="input-container">
                <button type="submit">Add Category</button>
              </div>
            </form>
          </div>
        ) : (
          <>
            <div className="upper">
              <h3>Categories List</h3>
              <button className="table-add" onClick={handleAddCategory}>
                Add Category
              </button>
            </div>
            <table>
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Name</th>
                  <th>Description</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {categoriesData.map((category) => (
                  <tr key={category.catId}>
                    <td>{category.catId}</td>
                    <td>{category.name}</td>
                    <td>{category.description}</td>
                    <td>
                      <button
                        className="icon-button"
                        onClick={() => handleDeleteCategory(category.catId)}
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
            <p>Total Number of Categories: {categoriesData.length}</p>
          </>
        )}
      </div>
    </div>
  );
}

export default AdminCat;
