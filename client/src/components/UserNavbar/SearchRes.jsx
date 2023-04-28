import React from "react";

function SearchRes({ data }) {
  return (
    <div className="products">
      {data.map((product) => (
        <div key={product.id} className="product">
          <h3>{product.title}</h3>
          <img src={product.image} alt={product.title} />
          <div className="details">
            <span>{product.category}</span>
            <span>{product.description}</span>
            <span className="price">DZD{product.price}</span>
          </div>
          <button onClick={() => handleAdd(product)}>Add To Cart</button>
        </div>
      ))}
    </div>
  );
}

export default SearchRes;
