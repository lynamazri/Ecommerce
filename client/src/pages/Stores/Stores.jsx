import React from "react";

function Stores() {
  return;
  <div>
    <Navbar />
    <Path />
    <div className="stores-page">
      <div className="header">
        <div className="upper">
          <h2>{category}</h2>
          <div className="view">
            <span
              className={`view-mode ${viewMode === "grid" ? "active" : ""}`}
              onClick={() => toggleViewMode("grid")}
            >
              <BsGrid /> Grid view
            </span>
            <span
              className={`view-mode ${viewMode === "list" ? "active" : ""}`}
              onClick={() => toggleViewMode("list")}
            >
              {" "}
              <BsViewList /> List view
            </span>
          </div>
        </div>
      </div>
      <div className="body">
        <div className="left-container">
          <div className="sub-categories-filter">
            <h3>Sub category menu</h3>
            <ul className="body">
              {categories.slice(0, 4).map((category, index) => (
                <div key={index}>
                  <li
                    key={index}
                    onClick={() => handleCategorySelect(category.name)}
                  >
                    {category.name}
                  </li>
                  <span>100</span>
                </div>
              ))}
            </ul>
          </div>
        </div>
        <div
          className={`right-container ${
            viewMode === "list" ? "list-view" : ""
          }`}
        >
          {status === "succeeded" &&
            filteredItems.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                viewMode={viewMode}
              />
            ))}
        </div>
      </div>
    </div>
    <Footer />
  </div>;
}

export default Stores;
