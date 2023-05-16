import React from "react";
import "./Path.css";

export default function Path(props) {
  return (
    <div className="path">
      <small>
        Homepage / {props.product.category} /{" "}
        <span className="productName">{props.product.title}</span>
      </small>
    </div>
  );
}
